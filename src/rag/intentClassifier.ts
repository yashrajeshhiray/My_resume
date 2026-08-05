import type { Intent } from './types';

const FIT_FOR_ROLE_PATTERNS: RegExp[] = [
  /\bfit for\b/i,
  /\bgood fit\b/i,
  /\bqualified for\b/i,
  /\bwould (he|she|they|yash) (be )?(a )?(good |great )?fit\b/i,
  /\bshould (we|i) hire\b/i,
  /\bsuitable for\b/i,
  /\brequirements?\b.*\?/i,
  /\blooking for someone with\b/i,
];

const PROJECT_PATTERNS: RegExp[] = [
  /\bproject\b/i,
  /\btell me about\b/i,
  /\binsurance buddy\b/i,
  /\blegal ai\b/i,
  /\bdocument tagging\b/i,
  /\binjection detection\b/i,
];

const EXPERIENCE_PATTERNS: RegExp[] = [
  /\bexperience\b/i,
  /\bwork(ed)? at\b/i,
  /\bmckinsey\b/i,
  /\brole\b/i,
  /\bintern(ship)?\b/i,
];

const SKILLS_PATTERNS: RegExp[] = [
  /\bskills?\b/i,
  /\btech(nolog(y|ies))?\b/i,
  /\bdo (he|she|they|you) know\b/i,
  /\bexperience with\b/i,
  /\bfamiliar with\b/i,
];

export function classifyIntent(query: string): Intent {
  if (FIT_FOR_ROLE_PATTERNS.some((p) => p.test(query))) return 'fit-for-role';
  if (PROJECT_PATTERNS.some((p) => p.test(query))) return 'project-detail';
  if (EXPERIENCE_PATTERNS.some((p) => p.test(query))) return 'experience-detail';
  if (SKILLS_PATTERNS.some((p) => p.test(query))) return 'skills-overview';
  return 'generic';
}
