import type { RagChunk } from '../content/types';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is',
  'are', 'was', 'were', 'be', 'been', 'his', 'her', 'he', 'she', 'it', 'this',
  'that', 'as', 'at', 'by', 'from', 'do', 'does', 'did', 'has', 'have', 'had',
  'i', 'you', 'we', 'they', 'them', 'what', 'which', 'who', 'how', 'about',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

interface Bm25Doc {
  id: string;
  termCounts: Map<string, number>;
  length: number;
}

const K1 = 1.5;
const B = 0.75;

export class Bm25Index {
  private docs: Bm25Doc[] = [];
  private docFreq = new Map<string, number>();
  private avgDocLength = 0;
  private idToDoc = new Map<string, Bm25Doc>();

  constructor(chunks: RagChunk[]) {
    for (const chunk of chunks) {
      const corpusText = [chunk.title, chunk.text, ...(chunk.tags ?? [])].join(' ');
      const tokens = tokenize(corpusText);
      const termCounts = new Map<string, number>();
      for (const tok of tokens) termCounts.set(tok, (termCounts.get(tok) ?? 0) + 1);
      const doc: Bm25Doc = { id: chunk.id, termCounts, length: tokens.length };
      this.docs.push(doc);
      this.idToDoc.set(chunk.id, doc);
      for (const term of termCounts.keys()) {
        this.docFreq.set(term, (this.docFreq.get(term) ?? 0) + 1);
      }
    }
    this.avgDocLength = this.docs.length
      ? this.docs.reduce((sum, d) => sum + d.length, 0) / this.docs.length
      : 0;
  }

  /** Returns chunk ids ranked by BM25 score, descending. */
  search(query: string): string[] {
    const queryTerms = tokenize(query);
    if (queryTerms.length === 0 || this.docs.length === 0) return [];

    const n = this.docs.length;
    const scores = new Map<string, number>();

    for (const doc of this.docs) {
      let score = 0;
      for (const term of queryTerms) {
        const tf = doc.termCounts.get(term) ?? 0;
        if (tf === 0) continue;
        const df = this.docFreq.get(term) ?? 0;
        const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
        const denom = tf + K1 * (1 - B + (B * doc.length) / (this.avgDocLength || 1));
        score += idf * ((tf * (K1 + 1)) / (denom || 1));
      }
      if (score > 0) scores.set(doc.id, score);
    }

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);
  }
}
