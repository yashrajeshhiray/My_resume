/**
 * All guardrails here are deterministic (regex/threshold-based) — there is no
 * LLM in this system, so there is no prompt to inject into, but the query
 * still flows through a UI and gets rendered, so we defend in depth anyway:
 * a blocked query short-circuits BEFORE retrieval runs (saves the model load
 * for obviously off-topic input, and means retrieval-quality signals never
 * even get computed for these).
 */

const BLOCK_PATTERNS: RegExp[] = [
  /ignore (all|the|any)?\s*(previous|prior|above)\s*instructions?/i,
  /disregard (all|the)?\s*(previous|prior)\s*(instructions|prompt)/i,
  /system\s*prompt/i,
  /reveal (your|the)\s*(instructions|prompt|source)/i,
  /how (were|was|is|did) (you|this|it) (built|made|created|coded|developed)/i,
  /what (model|llm|api) (are you|is this|do you use|powers)/i,
  /are you (chatgpt|gpt|claude|an? llm|an? ai model|a bot)/i,
  /\bjailbreak\b/i,
  /\bDAN\b/,
  /act as (if you|a|an)/i,
  /pretend (you|to be)/i,
  /<\s*script/i,
  /\{\{.*\}\}/,
  /\b(base64|atob\(|eval\()/i,
];

export function isBlocked(query: string): boolean {
  return BLOCK_PATTERNS.some((pattern) => pattern.test(query));
}

export const REFUSAL_MESSAGES = {
  meta: "I can only answer questions about Yash's professional background, skills, and projects based on his resume. I can't share implementation details or perform other tasks.",
  noMatch: "I don't have that information in Yash's profile. Try asking about his experience, projects, or specific skills.",
  empty: 'Ask me anything about Yash\'s experience, projects, skills, or whether he\'s a fit for a role.',
} as const;

/**
 * Reciprocal Rank Fusion scores are rank-based, not magnitude-based — the
 * *top* result of any query always gets roughly the same fused score
 * (~1/(k+1)) whether or not it's actually relevant, since RRF only sees
 * positions, never how weak the underlying match was. So the "is this even
 * relevant" gate has to look at the raw signals instead: BM25 finding any
 * lexical hit at all is a strong signal on its own; with zero BM25 hits, we
 * fall back to the raw (non-fused) semantic cosine similarity of the top
 * match. Thresholds tuned empirically against this ~26-chunk corpus with
 * all-MiniLM-L6-v2: relevant queries land at cosine >= ~0.30, off-topic
 * queries with no BM25 hits land at ~0.11-0.19.
 */
export const SEMANTIC_SIMILARITY_FLOOR = 0.25;

export function passesRelevanceFloor(bm25HitCount: number, topSemanticScore: number): boolean {
  return bm25HitCount > 0 || topSemanticScore >= SEMANTIC_SIMILARITY_FLOOR;
}

/** Query/answer text renders only as React JSX text children elsewhere — never dangerouslySetInnerHTML/eval. */
export function sanitizeForDisplay(text: string): string {
  return text.replace(/[<>]/g, '');
}
