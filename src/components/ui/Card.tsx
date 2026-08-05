import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-surface-line/60 bg-surface-raised/60 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 ${className}`}
    >
      {children}
    </div>
  );
}
