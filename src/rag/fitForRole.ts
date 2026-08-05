import { findTaxonomyMatches } from '../content/skillTaxonomy';
import type { RagChunk } from '../content/types';
import type { FitForRoleResult } from './types';

const DISCLAIMER =
  "This comparison lists only what's explicitly documented in Yash's profile — it does not represent a hiring recommendation or a claim about skills beyond what's shown as evidence above.";

/**
 * Structured requirement-vs-evidence comparator, not a generated verdict:
 * (1) match the query against the skill taxonomy's synonym lists,
 * (2) for each match, gather chunks whose skillTaxonomy includes that id,
 * (3) anything requested but never seen in the corpus goes to notFound —
 *     explicitly, never silently dropped or fabricated as a negative claim.
 */
export function runFitForRoleComparator(query: string, chunks: RagChunk[]): FitForRoleResult {
  const requestedNodes = findTaxonomyMatches(query);

  const matched: FitForRoleResult['matched'] = [];
  const notFound: FitForRoleResult['notFound'] = [];

  for (const node of requestedNodes) {
    const evidence = chunks
      .filter((c) => c.skillTaxonomy.includes(node.id))
      .map((c) => ({ chunkId: c.id, text: c.text, company: c.company, role: c.role }));

    if (evidence.length > 0) {
      matched.push({ taxonomyId: node.id, label: node.label, evidence });
    } else {
      notFound.push({ taxonomyId: node.id, label: node.label });
    }
  }

  return {
    kind: 'fit-for-role',
    requested: requestedNodes.map((n) => ({ taxonomyId: n.id, label: n.label })),
    matched,
    notFound,
    disclaimer: DISCLAIMER,
  };
}
