import type { RagChunk, ResumeContent } from '../content/types';

/**
 * Flattens the canonical ResumeContent into the flat RagChunk[] corpus used by
 * the retriever. Content is already authored at chunk granularity, so this is
 * a straight collection walk with de-duplication by id (project entries reuse
 * the same chunk objects as their source experience bullets).
 */
export function flattenToChunks(content: ResumeContent): RagChunk[] {
  const seen = new Map<string, RagChunk>();
  const add = (chunk: RagChunk) => {
    if (!seen.has(chunk.id)) seen.set(chunk.id, chunk);
  };

  add(content.person.summary);
  content.skills.forEach((s) => add(s.chunk));
  content.experience.forEach((e) => e.bullets.forEach(add));
  content.projects.forEach((p) => {
    add(p.summaryChunk);
    p.detailChunks.forEach(add);
  });
  content.education.forEach((e) => add(e.chunk));
  content.certifications.forEach((c) => add(c.chunk));
  content.leadership.forEach((l) => add(l.chunk));

  return Array.from(seen.values());
}
