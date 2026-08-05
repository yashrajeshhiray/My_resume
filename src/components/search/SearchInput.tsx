import { useState, type FormEvent } from 'react';

const MAX_LENGTH = 300;

export function SearchInput({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: (query: string) => void;
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        placeholder="Ask about Yash's experience, projects, or fit for a role…"
        maxLength={MAX_LENGTH}
        className="flex-1 rounded-full border border-surface-line bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-surface transition-opacity disabled:opacity-40"
      >
        Ask
      </button>
    </form>
  );
}
