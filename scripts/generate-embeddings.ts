import { env, pipeline } from '@huggingface/transformers';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resumeContent } from '../src/content/resume-content';
import { flattenToChunks } from '../src/rag/chunker';
import { MODEL_ID, EMBEDDING_DIM } from '../src/rag/embeddings/embedModel';

/**
 * Build-time precompute: embeds every RagChunk with the SAME self-hosted
 * model files that ship to the browser (public/models/), so build-time chunk
 * vectors and runtime query vectors live in the same vector space. Run via
 * "npm run generate:embeddings" (wired as a prebuild hook) whenever
 * resume-content.ts changes.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const publicModelsDir = path.join(repoRoot, 'public', 'models');
const publicDataDir = path.join(repoRoot, 'public', 'data');

async function main() {
  const modelDir = path.join(publicModelsDir, MODEL_ID);
  if (!existsSync(modelDir)) {
    throw new Error(
      `Model files not found at ${modelDir}. Run "npm run fetch:model" once before generating embeddings.`,
    );
  }

  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = publicModelsDir + path.sep;

  const extractor = await pipeline('feature-extraction', MODEL_ID, { dtype: 'q8' });

  const chunks = flattenToChunks(resumeContent);
  console.log(`Embedding ${chunks.length} chunks...`);

  const embeddings: { id: string; vector: number[] }[] = [];
  for (const chunk of chunks) {
    const input = `${chunk.title}. ${chunk.text}`;
    const output = await extractor(input, { pooling: 'mean', normalize: true });
    const vector = Array.from(output.data as Float32Array);
    if (vector.length !== EMBEDDING_DIM) {
      throw new Error(`Unexpected embedding dimension for chunk ${chunk.id}: got ${vector.length}, expected ${EMBEDDING_DIM}`);
    }
    embeddings.push({ id: chunk.id, vector });
  }

  mkdirSync(publicDataDir, { recursive: true });
  writeFileSync(path.join(publicDataDir, 'chunks.json'), JSON.stringify(chunks, null, 2));
  writeFileSync(path.join(publicDataDir, 'chunk-embeddings.json'), JSON.stringify(embeddings));

  console.log(`Wrote ${chunks.length} chunks + embeddings to ${publicDataDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
