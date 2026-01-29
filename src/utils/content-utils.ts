import { getCollection, type CollectionEntry } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@domain/url";
import { normalizeSlug } from "./slug-utils";

export { normalizeSlug };

let cachedSortedPosts: Map<string, CollectionEntry<"posts">[]> = new Map();
let cachedIsProd: boolean | null = null;
let cachedTranslations: Map<string, Map<string, CollectionEntry<"translate">>> | null = null;

/**
 * Get all translations indexed by originalSlug and lang
 */
async function getTranslationsMap(): Promise<Map<string, Map<string, CollectionEntry<"translate">>>> {
	if (cachedTranslations) {
		return cachedTranslations;
	}

	const map = new Map<string, Map<string, CollectionEntry<"translate">>>();

	try {
		const translations = await getCollection("translate");

		for (const translation of translations) {
			const originalSlug = normalizeSlug(translation.data.originalSlug);
			const lang = translation.data.lang;

			if (!map.has(originalSlug)) {
				map.set(originalSlug, new Map());
			}
			map.get(originalSlug)!.set(lang, translation);
		}
	} catch (error) {
		console.error("Error loading translations collection:", error);
	}

	cachedTranslations = map;
	return map;
}

/**
 * Get a translated version of a post if available
 */
export async function getTranslatedPost(
	post: CollectionEntry<"posts">,
	targetLang: string
): Promise<CollectionEntry<"posts"> | CollectionEntry<"translate">> {
	if (targetLang === "en") {
		return post;
	}

	const translationsMap = await getTranslationsMap();
	const normalizedPostSlug = normalizeSlug(post.slug);
	const langTranslations = translationsMap.get(normalizedPostSlug);

	if (langTranslations?.has(targetLang)) {
		return langTranslations.get(targetLang)!;
	}

	// No translation available, return original
	return post;
}

/**
 * Get sorted posts with translations applied for current language
 */
export async function getSortedPosts(lang?: string) {
	const currentLang = lang || (globalThis as any).__lang || "en";

	if (cachedSortedPosts.has(currentLang) && cachedIsProd === import.meta.env.PROD) {
		return cachedSortedPosts.get(currentLang)!;
	}

	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});

	// Prepare results for the specific language
	const resultPosts: CollectionEntry<"posts">[] = [];

	for (const post of sorted) {
		if (currentLang === "en") {
			resultPosts.push(post);
		} else {
			const translated = await getTranslatedPost(post, currentLang);
			resultPosts.push({
				...post, // Start with original post to preserve ID, collection, and file system context
				data: {
					...post.data,
					title: translated.data.title,
					description: translated.data.description,
					// Preserve original image path if translation doesn't have one
					image: translated.data.image || post.data.image,
				},
				// Use translated body and render function while keeping original post identity
				body: translated.body,
				render: translated.render,
			} as CollectionEntry<"posts">);
		}
	}

	// Update navigation slugs after translations are applied to ensure they point to translated versions if needed
	for (let i = 1; i < resultPosts.length; i++) {
		resultPosts[i].data.nextSlug = resultPosts[i - 1].slug;
		resultPosts[i].data.nextTitle = resultPosts[i - 1].data.title;
	}
	for (let i = 0; i < resultPosts.length - 1; i++) {
		resultPosts[i].data.prevSlug = resultPosts[i + 1].slug;
		resultPosts[i].data.prevTitle = resultPosts[i + 1].data.title;
	}

	// Clear cache if production state changed
	if (cachedIsProd !== import.meta.env.PROD) {
		cachedSortedPosts.clear();
		cachedIsProd = import.meta.env.PROD;
	}

	cachedSortedPosts.set(currentLang, resultPosts);
	return resultPosts;
}

export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(lang?: string): Promise<Tag[]> {
	const allBlogPosts = await getSortedPosts(lang);

	const countMap: { [key: string]: number } = {};
	allBlogPosts.map((post: { data: { tags: string[] } }) => {
		post.data.tags.map((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export type SeriesItem = {
	name: string;
	count: number;
	posts: CollectionEntry<"posts">[];
};

export async function getCategoryList(lang?: string): Promise<Category[]> {
	const allBlogPosts = await getSortedPosts(lang);
	const count: { [key: string]: number } = {};
	allBlogPosts.map((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized, lang);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c, lang),
		});
	}
	return ret;
}

export async function getSeriesList(lang?: string): Promise<SeriesItem[]> {
	const allBlogPosts = await getSortedPosts(lang);
	const seriesMap: Record<string, CollectionEntry<"posts">[]> = {};

	for (const post of allBlogPosts) {
		const seriesName = post.data.series?.name?.trim();
		if (!seriesName) continue;
		if (!seriesMap[seriesName]) seriesMap[seriesName] = [];
		seriesMap[seriesName].push(post);
	}

	const seriesList = Object.keys(seriesMap)
		.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
		.map((name) => {
			const posts = seriesMap[name].sort((a, b) => {
				const orderA = a.data.series?.order ?? Number.MAX_SAFE_INTEGER;
				const orderB = b.data.series?.order ?? Number.MAX_SAFE_INTEGER;
				if (orderA !== orderB) return orderA - orderB;
				return b.data.published.getTime() - a.data.published.getTime();
			});
			return {
				name,
				count: posts.length,
				posts,
			};
		});

	return seriesList;
}
