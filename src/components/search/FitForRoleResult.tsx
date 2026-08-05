import type { FitForRoleResult as FitForRoleResultType } from '../../rag/types';

export function FitForRoleResult({ result }: { result: FitForRoleResultType }) {
  return (
    <div className="rounded-2xl border border-surface-line/60 bg-surface-raised/60 p-5">
      {result.matched.length > 0 && (
        <div className="space-y-4">
          {result.matched.map((match) => (
            <div key={match.taxonomyId}>
              <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <span className="text-accent">✓</span> {match.label}
              </p>
              <ul className="mt-1.5 space-y-1.5 pl-6">
                {match.evidence.slice(0, 2).map((ev) => (
                  <li key={ev.chunkId} className="text-xs leading-relaxed text-text-secondary">
                    {ev.text}
                    {ev.company && <span className="text-text-muted"> — {ev.company}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {result.notFound.length > 0 && (
        <div className={result.matched.length > 0 ? 'mt-5 border-t border-surface-line/60 pt-4' : ''}>
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Not documented in profile</p>
          <ul className="mt-2 space-y-1">
            {result.notFound.map((gap) => (
              <li key={gap.taxonomyId} className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="text-text-muted">–</span> {gap.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 border-t border-surface-line/60 pt-3 text-xs italic text-text-muted">{result.disclaimer}</p>
    </div>
  );
}
