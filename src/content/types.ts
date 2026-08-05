export type ChunkSection =
  | 'summary'
  | 'experience'
  | 'project'
  | 'education'
  | 'certification'
  | 'leadership'
  | 'skill';

export type MetricKind = 'volume' | 'multiplier' | 'percentage' | 'score' | 'count';

export interface Metric {
  raw: string;
  value: number;
  label: string;
  kind: MetricKind;
}

export interface DateRange {
  start: string;
  end: string | 'present';
}

/** A RagChunk.text is the ONLY text ever surfaced verbatim as a search answer — never rewritten at render time. */
export interface RagChunk {
  id: string;
  section: ChunkSection;
  title: string;
  company?: string;
  role?: string;
  dateRange?: DateRange;
  text: string;
  tags: string[];
  skillTaxonomy: string[];
  metrics?: Metric[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  dateRange: DateRange;
  bullets: RagChunk[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  context?: string;
  summaryChunk: RagChunk;
  detailChunks: RagChunk[];
  tags: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  dateRange: DateRange;
  cgpa?: string;
  honors?: string[];
  chunk: RagChunk;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  chunk: RagChunk;
}

export interface LeadershipEntry {
  id: string;
  org: string;
  chunk: RagChunk;
}

export interface SkillGroup {
  category: string;
  items: string[];
  chunk: RagChunk;
}

export interface PersonInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  links: { label: string; url: string }[];
  summary: RagChunk;
}

export interface ResumeContent {
  person: PersonInfo;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  leadership: LeadershipEntry[];
  metrics: Metric[];
}
