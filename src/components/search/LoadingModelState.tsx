export function LoadingModelState({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.max(0, Math.round(progress)));
  return (
    <div className="space-y-2 rounded-2xl border border-surface-line/60 bg-surface-raised/40 p-5">
      <p className="text-sm text-text-secondary">
        Loading the on-device search model… one-time download, then answers are instant.
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-line/60">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
