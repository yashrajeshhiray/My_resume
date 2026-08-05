import { useState } from 'react';
import { formatChunkByline } from '../../rag/answerTemplates';
import type { ScoredChunk } from '../../rag/types';

export function SourceDisclosure({ chunks }: { chunks: ScoredChunk[] }) {
  const [open, setOpen] = useState(false);
  if (chunks.length === 0) return null;

  return (
    <div className="mt-3 border-t border-surface-line/60 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs font-medium text-accent hover:underline"
      >
        {open ? 'Hide sources' : `Sources used (${chunks.length})`}
      </button>
      {open && (
        <ul className="mt-2 space-y-2">
          {chunks.map(({ chunk }) => (
            <li key={chunk.id} className="text-xs text-text-muted">
              <span className="font-medium text-text-secondary">{chunk.title}</span>
              {formatChunkByline(chunk) && <span> — {formatChunkByline(chunk)}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
