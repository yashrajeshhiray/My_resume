import { formatChunkByline } from '../../rag/answerTemplates';
import type { AnswerResult } from '../../rag/types';
import { SourceDisclosure } from './SourceDisclosure';

export function AnswerCard({ result }: { result: AnswerResult }) {
  const [top, ...rest] = result.chunks;
  if (!top) return null;

  return (
    <div className="rounded-2xl border border-surface-line/60 bg-surface-raised/60 p-5">
      <p className="text-xs uppercase tracking-wide text-text-muted">{formatChunkByline(top.chunk) || top.chunk.section}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">{top.chunk.text}</p>

      {rest.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-surface-line/60 pt-4">
          {rest.slice(0, 2).map(({ chunk }) => (
            <div key={chunk.id}>
              <p className="text-xs uppercase tracking-wide text-text-muted">{formatChunkByline(chunk) || chunk.section}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{chunk.text}</p>
            </div>
          ))}
        </div>
      )}

      <SourceDisclosure chunks={result.chunks} />
    </div>
  );
}
