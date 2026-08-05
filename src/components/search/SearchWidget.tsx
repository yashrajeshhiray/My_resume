import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchEngine } from '../../hooks/useSearchEngine';
import { SearchInput } from './SearchInput';
import { PromptChips } from './PromptChips';
import { AnswerCard } from './AnswerCard';
import { FitForRoleResult } from './FitForRoleResult';
import { RefusalMessage } from './RefusalMessage';
import { EmptyState } from './EmptyState';
import { LoadingModelState } from './LoadingModelState';
import { REFUSAL_MESSAGES } from '../../rag/guardrails';

export function SearchWidget({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { modelState, modelProgress, isSearching, history, search } = useSearchEngine();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-surface-line bg-surface p-6 shadow-2xl focus:outline-none md:p-8">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-xl text-text-primary">Ask about Yash</Dialog.Title>
            <Dialog.Close className="text-text-muted hover:text-text-primary" aria-label="Close">
              ✕
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-1 text-sm text-text-secondary">
            Answers are retrieved directly from his resume — nothing is generated or invented.
          </Dialog.Description>

          <div className="mt-5 max-h-[50vh] space-y-5 overflow-y-auto pr-1">
            {history.length === 0 && modelState !== 'loading' && (
              <EmptyState message={REFUSAL_MESSAGES.empty} onSelectPrompt={search} />
            )}

            <AnimatePresence initial={false}>
              {history.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm font-medium text-text-primary">{entry.query}</p>
                  {entry.result.kind === 'fit-for-role' && <FitForRoleResult result={entry.result} />}
                  {entry.result.kind === 'answer' && <AnswerCard result={entry.result} />}
                  {(entry.result.kind === 'refusal-meta' ||
                    entry.result.kind === 'refusal-no-match' ||
                    entry.result.kind === 'empty') && <RefusalMessage message={entry.result.message} />}
                </motion.div>
              ))}
            </AnimatePresence>

            {isSearching && modelState === 'loading' && <LoadingModelState progress={modelProgress} />}
            {isSearching && modelState === 'ready' && (
              <p className="text-sm text-text-muted">Searching…</p>
            )}
          </div>

          <div className="mt-5 space-y-3">
            {history.length > 0 && <PromptChips onSelect={search} />}
            <SearchInput disabled={isSearching} onSubmit={search} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
