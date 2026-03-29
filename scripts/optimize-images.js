#!/usr/bin/env node
/**
 * Optimize post images in public/images/posts for web delivery.
 * Keeps original filenames so existing markdown/frontmatter links continue to work.
 *
 * Usage:
 *   node scripts/optimize-images.js
 *   node scripts/optimize-images.js --dry-run
 *   node scripts/optimize-images.js --max-width=1600 --quality=78
 */

import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const TARGET_DIR = path.join(PROJECT_ROOT, "public", "images", "posts");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const MAX_WIDTH = Number(
  args.find((a) => a.startsWith("--max-width="))?.split("=")[1] ?? "1600",
);
const QUALITY = Number(
  args.find((a) => a.startsWith("--quality="))?.split("=")[1] ?? "78",
);
const EMIT_WEBP = !args.includes("--no-webp");

const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => SUPPORTED_EXT.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(dir, name));
}

function buildPipeline(inputPath) {
  return sharp(inputPath, { failOn: "none" }).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
    fit: "inside",
  });
}

async function optimizeInPlace(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const tempPath = `${inputPath}.tmp`;
  let pipeline = buildPipeline(inputPath);

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({
      quality: QUALITY,
      compressionLevel: 9,
      effort: 8,
      palette: true,
    });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: QUALITY, effort: 6 });
  } else if (ext === ".avif") {
    pipeline = pipeline.avif({ quality: Math.min(QUALITY, 65), effort: 5 });
  } else {
    return { changed: false };
  }

  await pipeline.toFile(tempPath);
  await fs.rename(tempPath, inputPath);

  return { changed: true };
}

async function emitWebpVariant(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return null;
  }

  const webpPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  
  // Skip if webp already exists
  if (await fileExists(webpPath)) {
    return { skipped: true, path: webpPath };
  }

  const tempPath = `${webpPath}.tmp`;

  const pipeline = buildPipeline(inputPath).webp({
    quality: QUALITY,
    effort: 6,
  });
  await pipeline.toFile(tempPath);
  await fs.rename(tempPath, webpPath);

  return { skipped: false, path: webpPath };
}

async function main() {
  if (!(await fileExists(TARGET_DIR))) {
    console.error(`Target directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  const files = await getImageFiles(TARGET_DIR);

  if (files.length === 0) {
    console.log("No supported images found in public/images/posts.");
    return;
  }

  console.log(`Found ${files.length} images in public/images/posts`);
  console.log(
    `Settings -> max-width: ${MAX_WIDTH}px, quality: ${QUALITY}, dry-run: ${DRY_RUN}, emit-webp: ${EMIT_WEBP}`,
  );

  let totalBefore = 0;
  let totalAfter = 0;
  let initiallyLarge = 0;
  let skippedCount = 0;

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const before = (await fs.stat(filePath)).size;
    
    // Skip PNG/JPG/JPEG files that already have corresponding webp
    if ([".png", ".jpg", ".jpeg"].includes(ext) && EMIT_WEBP) {
      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      if (await fileExists(webpPath)) {
        skippedCount++;
        console.log(`[SKIP] ${path.basename(filePath)} -> webp already exists`);
        continue;
      }
    }
    
    totalBefore += before;

    if (before > 5 * 1024 * 1024) {
      initiallyLarge++;
    }

    if (DRY_RUN) {
      totalAfter += before;
      console.log(`[DRY] ${path.basename(filePath)} -> ${formatBytes(before)}`);
      continue;
    }

    await optimizeInPlace(filePath);

    if (EMIT_WEBP) {
      const result = await emitWebpVariant(filePath);
      if (result && result.skipped) {
        console.log(`[SKIP] webp variant already exists for ${path.basename(filePath)}`);
      }
    }

    const after = (await fs.stat(filePath)).size;
    totalAfter += after;
    const delta = before - after;
    const sign = delta >= 0 ? "-" : "+";

    console.log(
      `${path.basename(filePath)}: ${formatBytes(before)} -> ${formatBytes(after)} (${sign}${formatBytes(Math.abs(delta))})`,
    );
  }

  const savings = totalBefore - totalAfter;
  const savingsPct = totalBefore > 0 ? (savings / totalBefore) * 100 : 0;

  console.log("");
  console.log(
    `Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}`,
  );
  console.log(`Savings: ${formatBytes(savings)} (${savingsPct.toFixed(2)}%)`);
  console.log(`Files initially >5MB: ${initiallyLarge}`);
  if (skippedCount > 0) {
    console.log(`Skipped (already optimized): ${skippedCount}`);
  }
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
