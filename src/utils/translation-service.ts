/**
 * DeepL Translation Service
 * Translates content using DeepL API Free tier (500K chars/month)
 */

// DeepL language codes mapping
const DEEPL_LANG_MAP: Record<string, string> = {
	en: "EN",
	es: "ES",
	ja: "JA",
	ko: "KO",
	tr: "TR",
	zh_CN: "ZH",
	zh_TW: "ZH", // DeepL uses ZH for both, but handles variants
};

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

export interface TranslationResult {
	translatedText: string;
	detectedSourceLang?: string;
}

export interface TranslatedPost {
	title: string;
	description: string;
	content: string;
	lang: string;
	originalSlug: string;
	translatedAt: string;
}

/**
 * Translate text using DeepL API
 */
export async function translateText(
	text: string,
	targetLang: string,
	sourceLang: string = "EN"
): Promise<TranslationResult | null> {
	const apiKey = import.meta.env.DeepL_API_KEY || process.env.DeepL_API_KEY;

	if (!apiKey) {
		console.error("DeepL API key not found in environment variables");
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
		return {
			translatedText: data.translations[0].text,
			detectedSourceLang: data.translations[0].detected_source_language,
		};
	} catch (error) {
		console.error("Translation failed:", error);
		return null;
	}
}

/**
 * Translate markdown content while preserving structure
 * Handles frontmatter, code blocks, and links properly
 */
export async function translateMarkdown(
	markdown: string,
	targetLang: string,
	sourceLang: string = "EN"
): Promise<string | null> {
	// Preserve code blocks and other non-translatable content
	const codeBlocks: string[] = [];
	const codeBlockPlaceholder = "___CODE_BLOCK_";

	// Extract and replace code blocks
	let processedMd = markdown.replace(
		/```[\s\S]*?```|`[^`]+`/g,
		(match) => {
			codeBlocks.push(match);
			return `${codeBlockPlaceholder}${codeBlocks.length - 1}___`;
		}
	);

	// Preserve URLs
	const urls: string[] = [];
	const urlPlaceholder = "___URL_";
	processedMd = processedMd.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		(match, text, url) => {
			urls.push(url);
			return `[${text}](${urlPlaceholder}${urls.length - 1}___)`;
		}
	);

	// Translate the processed markdown
	const result = await translateText(processedMd, targetLang, sourceLang);
	if (!result) return null;

	let translated = result.translatedText;

	// Restore URLs
	translated = translated.replace(
		new RegExp(`${urlPlaceholder}(\\d+)___`, "g"),
		(_, index) => urls[parseInt(index)]
	);

	// Restore code blocks
	translated = translated.replace(
		new RegExp(`${codeBlockPlaceholder}(\\d+)___`, "g"),
		(_, index) => codeBlocks[parseInt(index)]
	);

	return translated;
}

/**
 * Check if a language is supported for translation
 */
export function isLanguageSupported(lang: string): boolean {
	return lang in DEEPL_LANG_MAP;
}

/**
 * Get all supported target languages (excluding source)
 */
export function getSupportedTargetLanguages(sourceLang: string = "en"): string[] {
	return Object.keys(DEEPL_LANG_MAP).filter((lang) => lang !== sourceLang);
}
