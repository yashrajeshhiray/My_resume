/**
 * Reciprocal Rank Fusion — combines multiple rankings (e.g. BM25 lexical +
 * cosine semantic) into one score per id, without needing to normalize
 * across incompatible score scales (BM25 is unbounded, cosine is [-1,1]).
 */
export function reciprocalRankFusion(rankings: string[][], k = 60): Map<string, number> {
  const scores = new Map<string, number>();
  for (const ranking of rankings) {
    ranking.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + index + 1));
    });
  }
  return scores;
}

export function sortByScoreDesc(scores: Map<string, number>): { id: string; score: number }[] {
  return Array.from(scores.entries())
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}
