const EXAMPLE_PROMPTS = [
  'Is he a good fit for a role requiring AWS, PySpark, and RAG experience?',
  'Tell me about the Insurance Buddy project',
  'What has he done with LLM fine-tuning?',
  "What's his biggest measurable impact?",
];

export function PromptChips({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {EXAMPLE_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-surface-line bg-surface/60 px-3 py-1.5 text-left text-xs text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
