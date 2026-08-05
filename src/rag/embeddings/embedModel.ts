import { pipeline, env, type FeatureExtractionPipeline } from '@huggingface/transformers';

export const MODEL_ID = 'all-MiniLM-L6-v2';
export const EMBEDDING_DIM = 384;

export type ModelProgress = { status: string; progress?: number; file?: string };

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

/**
 * Lazily loads the quantized sentence-embedding model, self-hosted under
 * public/models/ so GitHub Pages serves it directly — no external CDN
 * dependency at runtime. Only invoked when the visitor opens the search
 * widget (see useSearchEngine.ts), so initial page load is unaffected.
 */
export function getExtractor(onProgress?: (p: ModelProgress) => void): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = `${import.meta.env.BASE_URL}models/`;

    extractorPromise = pipeline('feature-extraction', MODEL_ID, {
      dtype: 'q8',
      progress_callback: onProgress as never,
    });
  }
  return extractorPromise;
}

export async function embedQuery(query: string, onProgress?: (p: ModelProgress) => void): Promise<Float32Array> {
  const extractor = await getExtractor(onProgress);
  const output = await extractor(query, { pooling: 'mean', normalize: true });
  return Float32Array.from(output.data as Float32Array);
}
