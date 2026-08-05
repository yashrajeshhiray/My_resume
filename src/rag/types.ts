import type { RagChunk } from '../content/types';

export interface ScoredChunk {
  chunk: RagChunk;
  score: number;
}

export type Intent = 'fit-for-role' | 'project-detail' | 'experience-detail' | 'skills-overview' | 'generic';

export interface FitForRoleMatch {
  taxonomyId: string;
  label: string;
  evidence: { chunkId: string; text: string; company?: string; role?: string }[];
}

export interface FitForRoleGap {
  taxonomyId: string;
  label: string;
}

export interface FitForRoleResult {
  kind: 'fit-for-role';
  requested: { taxonomyId: string; label: string }[];
  matched: FitForRoleMatch[];
  notFound: FitForRoleGap[];
  disclaimer: string;
}

export interface AnswerResult {
  kind: 'answer';
  chunks: ScoredChunk[];
}

export interface RefusalResult {
  kind: 'refusal-meta' | 'refusal-no-match' | 'empty';
  message: string;
}

export type RetrievalResult = FitForRoleResult | AnswerResult | RefusalResult;
