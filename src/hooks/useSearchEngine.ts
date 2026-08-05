import { useCallback, useRef, useState } from 'react';
import type { RetrievalResult } from '../rag/types';
import type { ModelProgress } from '../rag/embeddings/embedModel';

export type ModelState = 'idle' | 'loading' | 'ready';

interface HistoryEntry {
  query: string;
  result: RetrievalResult;
}

export function useSearchEngine() {
  const [modelState, setModelState] = useState<ModelState>('idle');
  const [modelProgress, setModelProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const hasStartedLoading = useRef(false);

  const onModelProgress = useCallback((p: ModelProgress) => {
    if (p.status === 'progress' && typeof p.progress === 'number') {
      setModelProgress(p.progress);
    }
  }, []);

  const search = useCallback(
    async (query: string) => {
      if (!hasStartedLoading.current) {
        hasStartedLoading.current = true;
        setModelState('loading');
      }
      setIsSearching(true);
      try {
        const { retrieve } = await import('../rag/retriever');
        const result = await retrieve(query, { onModelProgress });
        setModelState('ready');
        setHistory((prev) => [...prev, { query, result }]);
      } finally {
        setIsSearching(false);
      }
    },
    [onModelProgress],
  );

  return { modelState, modelProgress, isSearching, history, search };
}
