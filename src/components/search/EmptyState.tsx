import { PromptChips } from './PromptChips';

export function EmptyState({ message, onSelectPrompt }: { message: string; onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="space-y-4 py-2">
      <p className="text-sm leading-relaxed text-text-secondary">{message}</p>
      <PromptChips onSelect={onSelectPrompt} />
    </div>
  );
}
