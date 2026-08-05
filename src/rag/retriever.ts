import { resumeContent } from '../content/resume-content';
import { flattenToChunks } from './chunker';
import { Bm25Index } from './bm25';
import { embedQuery, EMBEDDING_DIM, type ModelProgress } from './embeddings/embedModel';
import { cosineSimilarity } from './embeddings/cosine';
import { reciprocalRankFusion, sortByScoreDesc } from './fusion';
import { classifyIntent } from './intentClassifier';
import { runFitForRoleComparator } from './fitForRole';
import { isBlocked, REFUSAL_MESSAGES, passesRelevanceFloor } from './guardrails';
import type { RetrievalResult, ScoredChunk } from './types';
import type { RagChunk } from '../content/types';

const TOP_K = 5;

const allChunks: RagChunk[] = flattenToChunks(resumeContent);
const chunkById = new Map(allChunks.map((c) => [c.id, c]));
const bm25 = new Bm25Index(allChunks);

let chunkEmbeddings: Map<string, Float32Array> | null = null;

async function loadChunkEmbeddings(): Promise<Map<string, Float32Array>> {
  if (chunkEmbeddings) return chunkEmbeddings;
  const res = await fetch(`${import.meta.env.BASE_URL}data/chunk-embeddings.json`);
  if (!res.ok) throw new Error(`Failed to load chunk embeddings: ${res.status}`);
  const raw: { id: string; vector: number[] }[] = await res.json();
  const map = new Map<string, Float32Array>();
  for (const entry of raw) {
    if (entry.vector.length !== EMBEDDING_DIM) continue;
    map.set(entry.id, Float32Array.from(entry.vector));
  }
  chunkEmbeddings = map;
  return map;
}

function semanticSearch(queryVec: Float32Array, embeddings: Map<string, Float32Array>): { id: string; score: number }[] {
  const scored = Array.from(embeddings.entries()).map(([id, vec]) => ({
    id,
    score: cosineSimilarity(queryVec, vec),
  }));
  return scored.sort((a, b) => b.score - a.score);
}

export interface RetrieveOptions {
  onModelProgress?: (p: ModelProgress) => void;
}

/**
 * Pipeline: trim -> empty check -> block-list (no model load if blocked) ->
 * intent classify -> ensure model loaded -> parallel BM25 + semantic search ->
 * relevance-floor check on the raw signals (BM25 hit count / top semantic
 * cosine — NOT the fused score, which is rank-based and can't tell a strong
 * match from a weak one) -> fit-for-role comparator or RRF-fused ranked answer.
 */
export async function retrieve(rawQuery: string, options: RetrieveOptions = {}): Promise<RetrievalResult> {
  const query = rawQuery.trim();

  if (query.length === 0) {
    return { kind: 'empty', message: REFUSAL_MESSAGES.empty };
  }

  if (isBlocked(query)) {
    return { kind: 'refusal-meta', message: REFUSAL_MESSAGES.meta };
  }

  const intent = classifyIntent(query);

  const bm25Ranking = bm25.search(query);
  const embeddings = await loadChunkEmbeddings();
  const queryVec = await embedQuery(query, options.onModelProgress);
  const semanticScored = semanticSearch(queryVec, embeddings);
  const semanticRanking = semanticScored.map((s) => s.id);

  const topSemanticScore = semanticScored[0]?.score ?? 0;
  if (!passesRelevanceFloor(bm25Ranking.length, topSemanticScore)) {
    return { kind: 'refusal-no-match', message: REFUSAL_MESSAGES.noMatch };
  }

  if (intent === 'fit-for-role') {
    const result = runFitForRoleComparator(query, allChunks);
    if (result.requested.length > 0) {
      return result;
    }
    // No recognizable skill/requirement terms in the query — fall through to a generic grounded answer.
  }

  const fused = reciprocalRankFusion([bm25Ranking, semanticRanking]);
  const ranked = sortByScoreDesc(fused);

  const scoredChunks: ScoredChunk[] = ranked
    .slice(0, TOP_K)
    .map(({ id, score }) => ({ chunk: chunkById.get(id)!, score }))
    .filter((sc) => sc.chunk);

  return { kind: 'answer', chunks: scoredChunks };
}
