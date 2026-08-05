import type { RagChunk } from '../content/types';

/**
 * Deterministic string interpolation of chunk fields only — never free
 * generation — so hallucination is structurally impossible. The chunk's
 * `text` is always shown verbatim; this only adds a factual byline.
 */
export function formatChunkByline(chunk: RagChunk): string {
  const parts: string[] = [];
  if (chunk.company) parts.push(chunk.company);
  if (chunk.role) parts.push(chunk.role);
  if (chunk.dateRange) {
    const end = chunk.dateRange.end === 'present' ? 'Present' : chunk.dateRange.end;
    parts.push(`${chunk.dateRange.start} – ${end}`);
  }
  return parts.join(' · ');
}
