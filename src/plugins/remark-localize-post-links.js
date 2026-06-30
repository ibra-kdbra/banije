import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

/**
 * Localize in-body internal post links for translated articles.
 *
 * Authors write plain, default-language links in Markdown, e.g.
 *   [Volume II](/posts/identity_and_access_in_depth/)
 *
 * When the SAME article is translated (a file under `src/content/translate/<lang>/`
 * carrying `lang:` in its frontmatter), the rendered body would otherwise keep the
 * default-language URL and bounce the reader back to English. This plugin rewrites
 * those links to the language-prefixed route, e.g. `/ar/posts/identity_and_access_in_depth/`,
 * BUT ONLY when a translation of the target actually exists for that language.
 * If it does not, the link is left as-is so it falls back to the (always-present)
 * default-language page instead of 404-ing on a non-existent translated route.
 *
 * English / default-language entries are never touched.
 */

const DEFAULT_LANGUAGE = "en";
const TRANSLATE_DIR = path.resolve(process.cwd(), "src/content/translate");

// Mirrors src/utils/slug-utils.ts normalizeSlug so link slugs and translation
// filenames resolve to the same canonical route segment.
function normalizeSlug(slug) {
	return slug
		.toLowerCase()
		.replace(/[/\-]/g, "_")
		.replace(/_index$/, "");
}

// Build (once) the set of "<lang>::<normalizedSlug>" translations that exist on disk.
let translationSet = null;
function getTranslationSet() {
	if (translationSet) return translationSet;
	const set = new Set();
	try {
		for (const lang of fs.readdirSync(TRANSLATE_DIR)) {
			const langDir = path.join(TRANSLATE_DIR, lang);
			if (!fs.statSync(langDir).isDirectory()) continue;
			for (const file of fs.readdirSync(langDir)) {
				if (!/\.mdx?$/.test(file)) continue;
				const slug = normalizeSlug(file.replace(/\.mdx?$/, ""));
				set.add(`${lang}::${slug}`);
			}
		}
	} catch (err) {
		// Missing translate dir just means nothing to localize.
		console.warn(`[remark-localize-post-links] ${err.message}`);
	}
	translationSet = set;
	return set;
}

// Matches internal post links: "/posts/<slug>" with optional trailing slash, no lang prefix.
const POST_LINK = /^\/posts\/([^/#?]+)\/?$/;

export function remarkLocalizePostLinks() {
	return (tree, file) => {
		const lang = file?.data?.astro?.frontmatter?.lang;
		if (!lang || lang === DEFAULT_LANGUAGE) return; // only translated entries

		const translations = getTranslationSet();

		visit(tree, "link", (node) => {
			const match = typeof node.url === "string" && node.url.match(POST_LINK);
			if (!match) return;
			const slug = normalizeSlug(match[1]);
			// Only prefix when the target is actually translated into this language;
			// otherwise leave the default-language link (graceful fallback).
			if (translations.has(`${lang}::${slug}`)) {
				node.url = `/${lang}/posts/${slug}/`;
			}
		});
	};
}
