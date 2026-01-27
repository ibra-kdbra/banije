#!/usr/bin/env node
/**
 * Build-time Translation Script
 * Translates all posts to supported languages and caches results
 * 
 * Usage: node scripts/translate-posts.mjs [--lang=tr] [--force]
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT_DIR, "src/content/posts");
const CACHE_DIR = path.join(ROOT_DIR, ".translation-cache");
const TRANSLATED_DIR = path.join(ROOT_DIR, "src/content/translations");

// DeepL language codes
const DEEPL_LANG_MAP = {
	en: "EN",
	es: "ES",
	ja: "JA",
	ko: "KO",
	tr: "TR",
	zh_CN: "ZH",
	zh_TW: "ZH",
};

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

// Parse command line arguments
const args = process.argv.slice(2);
const forceRetranslate = args.includes("--force");
const targetLangArg = args.find((a) => a.startsWith("--lang="));
const targetLangs = targetLangArg
	? [targetLangArg.split("=")[1]]
	: Object.keys(DEEPL_LANG_MAP).filter((l) => l !== "en");

console.log("🌐 Translation Script Started");
console.log(`   Target languages: ${targetLangs.join(", ")}`);
console.log(`   Force retranslate: ${forceRetranslate}`);
console.log("");

/**
 * Translate text using DeepL API
 */
async function translateText(text, targetLang, sourceLang = "EN") {
	const apiKey = process.env.DeepL_API_KEY;

	if (!apiKey) {
		throw new Error("DeepL_API_KEY not found in environment variables");
	}

	const deepLTarget = DEEPL_LANG_MAP[targetLang] || targetLang.toUpperCase();

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
		throw new Error(`DeepL API error: ${response.status} - ${errorText}`);
	}

	const data = await response.json();
	return data.translations[0].text;
}

/**
 * Translate markdown while preserving code blocks and structure
 */
async function translateMarkdown(markdown, targetLang) {
	const codeBlocks = [];
	const codeBlockPlaceholder = "___CODE_BLOCK_";

	// Extract code blocks
	let processed = markdown.replace(/```[\s\S]*?```|`[^`]+`/g, (match) => {
		codeBlocks.push(match);
		return `${codeBlockPlaceholder}${codeBlocks.length - 1}___`;
	});

	// Preserve URLs in links
	const urls = [];
	const urlPlaceholder = "___URL_";
	processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
		urls.push(url);
		return `[${text}](${urlPlaceholder}${urls.length - 1}___)`;
	});

	// Preserve image references
	const images = [];
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
		const chunks = [];

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
			translated += (translated ? "\n\n" : "") + translatedChunk;
			// Rate limiting
			await new Promise((r) => setTimeout(r, 100));
		}
	} else {
		translated = await translateText(processed, targetLang);
	}

	// Restore URLs
	translated = translated.replace(
		new RegExp(`${urlPlaceholder}(\\d+)___`, "g"),
		(_, idx) => urls[parseInt(idx)]
	);

	// Restore images
	translated = translated.replace(
		new RegExp(`${imgPlaceholder}(\\d+)___`, "g"),
		(_, idx) => images[parseInt(idx)]
	);

	// Restore code blocks
	translated = translated.replace(
		new RegExp(`${codeBlockPlaceholder}(\\d+)___`, "g"),
		(_, idx) => codeBlocks[parseInt(idx)]
	);

	return translated;
}

/**
 * Parse frontmatter from markdown
 */
function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: "", body: content };

	return {
		frontmatter: match[1],
		body: match[2],
	};
}

/**
 * Extract title and description from frontmatter
 */
function extractMetadata(frontmatter) {
	const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
	const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?\s*$/m);

	return {
		title: titleMatch ? titleMatch[1] : "",
		description: descMatch ? descMatch[1] : "",
	};
}

/**
 * Generate content hash for cache validation
 */
function hashContent(content) {
	return createHash("md5").update(content).digest("hex");
}

/**
 * Get cached translation if valid
 */
async function getCached(slug, targetLang, contentHash) {
	const cachePath = path.join(CACHE_DIR, targetLang, `${slug}.json`);

	try {
		const cached = JSON.parse(await fs.readFile(cachePath, "utf-8"));
		if (cached.originalHash === contentHash) {
			return cached;
		}
	} catch {
		// No cache or invalid
	}

	return null;
}

/**
 * Save translation to cache
 */
async function saveCache(slug, targetLang, data) {
	const cachePath = path.join(CACHE_DIR, targetLang, `${slug}.json`);
	await fs.mkdir(path.dirname(cachePath), { recursive: true });
	await fs.writeFile(cachePath, JSON.stringify(data, null, 2));
}

/**
 * Save translated markdown file
 */
async function saveTranslatedPost(slug, targetLang, content) {
	const outDir = path.join(TRANSLATED_DIR, targetLang);
	const outPath = path.join(outDir, `${slug}.md`);
	await fs.mkdir(outDir, { recursive: true });
	await fs.writeFile(outPath, content);
}

/**
 * Get all markdown files recursively
 */
async function getMarkdownFiles(dir, basePath = "") {
	const files = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relativePath = path.join(basePath, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await getMarkdownFiles(fullPath, relativePath)));
		} else if (entry.name.endsWith(".md")) {
			files.push({ path: fullPath, slug: relativePath.replace(/\.md$/, "") });
		}
	}

	return files;
}

/**
 * Main translation function
 */
async function translatePosts() {
	const posts = await getMarkdownFiles(POSTS_DIR);
	console.log(`📄 Found ${posts.length} posts to translate\n`);

	let translated = 0;
	let cached = 0;
	let failed = 0;

	for (const post of posts) {
		const content = await fs.readFile(post.path, "utf-8");
		const contentHash = hashContent(content);
		const { frontmatter, body } = parseFrontmatter(content);
		const { title, description } = extractMetadata(frontmatter);

		for (const targetLang of targetLangs) {
			const safeSlug = post.slug.replace(/\//g, "_");
			process.stdout.write(`   ${post.slug} → ${targetLang}: `);

			// Check cache
			if (!forceRetranslate) {
				const cachedData = await getCached(safeSlug, targetLang, contentHash);
				if (cachedData) {
					console.log("✓ cached");
					cached++;

					// Ensure translated file exists
					const translatedContent = `---\n${frontmatter.replace(
						/^title:\s*["']?.+?["']?\s*$/m,
						`title: "${cachedData.translatedTitle}"`
					).replace(
						/^description:\s*["']?.+?["']?\s*$/m,
						`description: "${cachedData.translatedDescription}"`
					)}\nlang: "${targetLang}"\noriginalSlug: "${post.slug}"\n---\n${cachedData.translatedBody}`;

					await saveTranslatedPost(safeSlug, targetLang, translatedContent);
					continue;
				}
			}

			try {
				// Translate title
				const translatedTitle = title
					? await translateText(title, targetLang)
					: "";

				// Translate description
				const translatedDescription = description
					? await translateText(description, targetLang)
					: "";

				// Translate body
				const translatedBody = await translateMarkdown(body, targetLang);

				// Update frontmatter with translations
				let newFrontmatter = frontmatter;
				if (title) {
					newFrontmatter = newFrontmatter.replace(
						/^title:\s*["']?.+?["']?\s*$/m,
						`title: "${translatedTitle.replace(/"/g, '\\"')}"`
					);
				}
				if (description) {
					newFrontmatter = newFrontmatter.replace(
						/^description:\s*["']?.+?["']?\s*$/m,
						`description: "${translatedDescription.replace(/"/g, '\\"')}"`
					);
				}
				newFrontmatter += `\nlang: "${targetLang}"\noriginalSlug: "${post.slug}"`;

				const translatedContent = `---\n${newFrontmatter}\n---\n${translatedBody}`;

				// Save translated post
				await saveTranslatedPost(safeSlug, targetLang, translatedContent);

				// Cache the translation
				await saveCache(safeSlug, targetLang, {
					originalHash: contentHash,
					translatedTitle,
					translatedDescription,
					translatedBody,
					translatedAt: new Date().toISOString(),
				});

				console.log("✓ translated");
				translated++;

				// Rate limiting between posts
				await new Promise((r) => setTimeout(r, 200));
			} catch (error) {
				console.log(`✗ failed: ${error.message}`);
				failed++;
			}
		}
	}

	console.log("\n" + "=".repeat(50));
	console.log(`✅ Translated: ${translated}`);
	console.log(`📦 From cache: ${cached}`);
	console.log(`❌ Failed: ${failed}`);
	console.log("=".repeat(50));
}

// Run
translatePosts().catch(console.error);
