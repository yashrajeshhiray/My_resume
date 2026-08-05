import { env, pipeline } from '@huggingface/transformers';
import { mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODEL_ID } from '../src/rag/embeddings/embedModel';

/**
 * One-time helper: downloads the quantized embedding model from the Hugging
 * Face Hub into a throwaway cache, then copies the resulting files into
 * public/models/<MODEL_ID>/ so the site can self-host them (GitHub Pages
 * serves them directly — no external CDN dependency at runtime).
 * Run again only if MODEL_ID or the quantization ("dtype") changes.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const cacheDir = path.join(repoRoot, '.model-cache');
const publicModelsDir = path.join(repoRoot, 'public', 'models');
const HUB_REPO = 'Xenova/all-MiniLM-L6-v2';

async function main() {
  rmSync(cacheDir, { recursive: true, force: true });
  mkdirSync(cacheDir, { recursive: true });

  env.allowRemoteModels = true;
  env.allowLocalModels = false;
  env.cacheDir = cacheDir;
  env.useBrowserCache = false;
  env.useFSCache = true;

  console.log(`Downloading ${HUB_REPO} (q8 quantized) to ${cacheDir}...`);
  await pipeline('feature-extraction', HUB_REPO, { dtype: 'q8' });

  const cachedModelDir = path.join(cacheDir, HUB_REPO);
  if (!existsSync(cachedModelDir)) {
    throw new Error(`Expected cached model directory not found: ${cachedModelDir}`);
  }

  const targetDir = path.join(publicModelsDir, MODEL_ID);
  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(targetDir, { recursive: true });
  cpSync(cachedModelDir, targetDir, { recursive: true });

  rmSync(cacheDir, { recursive: true, force: true });

  console.log(`Model files written to ${targetDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
