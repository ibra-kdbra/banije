/**
 * Real-time Translation Service with Caching
 * Translates content on-demand and caches results
 */

import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";
const CACHE_DIR = ".translation-cache";

// DeepL language codes mapping
const DEEPL_LANG_MAP: Record<string, string> = {
	en: "EN",
	es: "ES",
	ja: "JA",
	ko: "KO",
	tr: "TR",
	zh_CN: "ZH",
	zh_TW: "ZH",
};

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
function hashContent(content: string): string {
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
	originalContent?: string
): Promise<CachedTranslation | null> {
	const cachePath = getCachePath(slug, targetLang);

	try {
		const cacheContent = await fs.readFile(cachePath, "utf-8");
		const cached: CachedTranslation = JSON.parse(cacheContent);

		// If originalContent is provided, validate the hash
		// Otherwise just return the cached translation
		if (originalContent) {
			const originalHash = hashContent(originalContent);
			if (cached.originalHash !== originalHash) {
				// Content changed, cache is invalid
				return null;
			}
		}

		return cached;
	} catch {
		// Cache doesn't exist or is corrupted
		return null;
	}
}

/**
 * Save a translation to the cache
 */
async function saveCachedTranslation(
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
 * Translate text using DeepL API
 */
async function translateText(
	text: string,
	targetLang: string,
	sourceLang = "EN"
): Promise<string | null> {
	const apiKey = import.meta.env.DeepL_API_KEY || process.env.DeepL_API_KEY;

	if (!apiKey) {
		console.error("DeepL API key not found");
		return null;
	}

	const deepLTarget = DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase();

	try {
		const response = await fetch(DEEPL_API_URL, {
			method: "POST",
			headers: {
				Authorization: `DeepL-Auth-Key ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: [text],
				target_lang: deepLTarget,
				source_lang: sourceLang.toUpperCase(),
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`DeepL API error: ${response.status} - ${errorText}`);
			return null;
		}

		const data = await response.json();
		return data.translations[0].text;
	} catch (error) {
		console.error("Translation failed:", error);
		return null;
	}
}

/**
 * Translate markdown while preserving code blocks and structure
 */
async function translateMarkdown(
	markdown: string,
	targetLang: string
): Promise<string | null> {
	const codeBlocks: string[] = [];
	const codeBlockPlaceholder = "___CODE_BLOCK_";

	// Extract code blocks
	let processed = markdown.replace(/```[\s\S]*?```|`[^`]+`/g, (match) => {
		codeBlocks.push(match);
		return `${codeBlockPlaceholder}${codeBlocks.length - 1}___`;
	});

	// Preserve URLs in links
	const urls: string[] = [];
	const urlPlaceholder = "___URL_";
	processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
		urls.push(url);
		return `[${text}](${urlPlaceholder}${urls.length - 1}___)`;
	});

	// Preserve image references
	const images: string[] = [];
	const imgPlaceholder = "___IMG_";
	processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match) => {
		images.push(match);
		return `${imgPlaceholder}${images.length - 1}___`;
	});

	// Split into chunks if too long (DeepL has limits per request)
	const MAX_CHUNK_SIZE = 30000;
	let translated = "";

	if (processed.length > MAX_CHUNK_SIZE) {
		const paragraphs = processed.split(/\n\n+/);
		let currentChunk = "";
		const chunks: string[] = [];

		for (const para of paragraphs) {
			if ((currentChunk + para).length > MAX_CHUNK_SIZE) {
				if (currentChunk) chunks.push(currentChunk);
				currentChunk = para;
			} else {
				currentChunk += (currentChunk ? "\n\n" : "") + para;
			}
		}
		if (currentChunk) chunks.push(currentChunk);

		for (const chunk of chunks) {
			const translatedChunk = await translateText(chunk, targetLang);
			if (!translatedChunk) return null;
			translated += (translated ? "\n\n" : "") + translatedChunk;
		}
	} else {
		const result = await translateText(processed, targetLang);
		if (!result) return null;
		translated = result;
	}

	// Restore URLs
	translated = translated.replace(
		new RegExp(`${urlPlaceholder}(\\d+)___`, "g"),
		(_, idx) => urls[Number.parseInt(idx)]
	);

	// Restore images
	translated = translated.replace(
		new RegExp(`${imgPlaceholder}(\\d+)___`, "g"),
		(_, idx) => images[Number.parseInt(idx)]
	);

	// Restore code blocks
	translated = translated.replace(
		new RegExp(`${codeBlockPlaceholder}(\\d+)___`, "g"),
		(_, idx) => codeBlocks[Number.parseInt(idx)]
	);

	return translated;
}

/**
 * Translate a post on-demand with caching
 */
export async function translatePostRealtime(
	slug: string,
	title: string,
	description: string,
	content: string,
	targetLang: string
): Promise<CachedTranslation | null> {
	// Normalize slug to match cache file format
	const cacheSlug = slug.replace(/\//g, "_");
	
	// Check cache first (without hash validation to use pre-built translations)
	const cached = await getCachedTranslation(cacheSlug, targetLang);

	if (cached) {
		return cached;
	}

	// Translate in real-time
	console.log(`Translating "${title}" to ${targetLang}...`);

	const [translatedTitle, translatedDescription, translatedContent] =
		await Promise.all([
			translateText(title, targetLang),
			description ? translateText(description, targetLang) : Promise.resolve(""),
			translateMarkdown(content, targetLang),
		]);

	if (!translatedTitle || !translatedContent) {
		console.error(`Failed to translate "${title}" to ${targetLang}`);
		return null;
	}

	const originalContent = `${title}\n${description}\n${content}`;
	const translation: CachedTranslation = {
		originalHash: hashContent(originalContent),
		translatedTitle,
		translatedDescription: translatedDescription || "",
		translatedContent,
		targetLang,
		translatedAt: new Date().toISOString(),
	};

	// Save to cache using normalized slug
	await saveCachedTranslation(cacheSlug, targetLang, translation);

	return translation;
}

/**
 * Check if language is supported
 */
export function isLanguageSupported(lang: string): boolean {
	return lang in DEEPL_LANG_MAP;
}
