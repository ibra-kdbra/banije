/**
 * Translation Cache System
 * Caches translated content to avoid re-translating unchanged content
 */

import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

const CACHE_DIR = ".translation-cache";

export interface CachedTranslation {
	originalHash: string;
	translatedTitle: string;
	translatedDescription: string;
	translatedContent: string;
	targetLang: string;
	translatedAt: string;
}

/**
 * Generate a hash of the content for cache validation
 */
export function hashContent(content: string): string {
	return createHash("md5").update(content).digest("hex");
}

/**
 * Get the cache file path for a specific post and language
 */
function getCachePath(slug: string, targetLang: string): string {
	const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "_");
	return path.join(process.cwd(), CACHE_DIR, targetLang, `${safeSlug}.json`);
}

/**
 * Check if a cached translation exists and is still valid
 */
export async function getCachedTranslation(
	slug: string,
	targetLang: string,
	originalHash: string
): Promise<CachedTranslation | null> {
	const cachePath = getCachePath(slug, targetLang);

	try {
		const cacheContent = await fs.readFile(cachePath, "utf-8");
		const cached: CachedTranslation = JSON.parse(cacheContent);

		// Check if the original content has changed
		if (cached.originalHash === originalHash) {
			return cached;
		}

		// Content changed, cache is invalid
		return null;
	} catch {
		// Cache doesn't exist or is corrupted
		return null;
	}
}

/**
 * Save a translation to the cache
 */
export async function saveCachedTranslation(
	slug: string,
	targetLang: string,
	translation: CachedTranslation
): Promise<void> {
	const cachePath = getCachePath(slug, targetLang);
	const cacheDir = path.dirname(cachePath);

	try {
		await fs.mkdir(cacheDir, { recursive: true });
		await fs.writeFile(cachePath, JSON.stringify(translation, null, 2));
	} catch (error) {
		console.error(`Failed to save translation cache for ${slug}:`, error);
	}
}

/**
 * Clear all cached translations for a specific language
 */
export async function clearLanguageCache(targetLang: string): Promise<void> {
	const langCacheDir = path.join(process.cwd(), CACHE_DIR, targetLang);

	try {
		await fs.rm(langCacheDir, { recursive: true, force: true });
	} catch {
		// Directory doesn't exist, ignore
	}
}

/**
 * Clear the entire translation cache
 */
export async function clearAllCache(): Promise<void> {
	const cacheDir = path.join(process.cwd(), CACHE_DIR);

	try {
		await fs.rm(cacheDir, { recursive: true, force: true });
	} catch {
		// Directory doesn't exist, ignore
	}
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
	totalFiles: number;
	byLanguage: Record<string, number>;
}> {
	const cacheDir = path.join(process.cwd(), CACHE_DIR);
	const stats = { totalFiles: 0, byLanguage: {} as Record<string, number> };

	try {
		const langs = await fs.readdir(cacheDir);

		for (const lang of langs) {
			const langDir = path.join(cacheDir, lang);
			const stat = await fs.stat(langDir);

			if (stat.isDirectory()) {
				const files = await fs.readdir(langDir);
				const jsonFiles = files.filter((f) => f.endsWith(".json"));
				stats.byLanguage[lang] = jsonFiles.length;
				stats.totalFiles += jsonFiles.length;
			}
		}
	} catch {
		// Cache directory doesn't exist
	}

	return stats;
}
