import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { normalizeSlug } from "./slug-utils";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@constants/constants";

export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function getPostUrlBySlug(slug: string, lang?: string): string {
	return url(`/posts/${normalizeSlug(slug)}/`, lang);
}

export function getTagUrl(tag: string, lang?: string): string {
	if (!tag) return url("/archive/", lang);
	return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`, lang);
}

export function getCategoryUrl(category: string | null, lang?: string): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase()
	)
		return url("/archive/?uncategorized=true", lang);
	return url(`/archive/?category=${encodeURIComponent(category.trim())}`, lang);
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return path.substring(0, lastSlashIndex + 1);
}

export function getRelativePostUrlBySlug(slug: string, lang?: string): string {
	const currentLang = lang || (globalThis as { __lang?: string }).__lang || DEFAULT_LANGUAGE;
	const langPrefix =
		currentLang && currentLang !== DEFAULT_LANGUAGE && SUPPORTED_LANGUAGES.includes(currentLang as any)
			? `/${currentLang}`
			: "";
	return `${langPrefix}/posts/${normalizeSlug(slug)}/`;
}

export function url(path: string, lang?: string) {
	const currentLang = lang || (globalThis as { __lang?: string }).__lang || DEFAULT_LANGUAGE;
	
	// Skip language prefix for static assets
	const isAsset = path.startsWith("/images/") || 
                    path.startsWith("images/") || 
                    path.startsWith("/favicon/") || 
                    path.startsWith("favicon/") ||
                    path.startsWith("/assets/") ||
                    path.startsWith("assets/");

	const langPrefix =
		!isAsset && currentLang && currentLang !== DEFAULT_LANGUAGE && SUPPORTED_LANGUAGES.includes(currentLang as any)
			? `/${currentLang}`
			: "";

	// Ensure path starts with / if it doesn't and isn't empty
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return joinUrl("", import.meta.env.BASE_URL, langPrefix, normalizedPath);
}
