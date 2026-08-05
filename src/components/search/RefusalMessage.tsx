export function RefusalMessage({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-surface-line/60 bg-surface-raised/40 p-5">
      <p className="text-sm leading-relaxed text-text-secondary">{message}</p>
    </div>
  );
}
