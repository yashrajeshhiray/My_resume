export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-surface-line bg-surface/80 px-3 py-1 text-xs font-medium text-text-secondary">
      {children}
    </span>
  );
}
