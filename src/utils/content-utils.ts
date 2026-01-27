import { getCollection, type CollectionEntry } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@domain/url";

let cachedSortedPosts: CollectionEntry<"posts">[] | null = null;
let cachedIsProd: boolean | null = null;
let cachedTranslations: Map<string, Map<string, CollectionEntry<"translations">>> | null = null;

/**
 * Get all translations indexed by originalSlug and lang
 */
async function getTranslationsMap(): Promise<Map<string, Map<string, CollectionEntry<"translations">>>> {
	if (cachedTranslations) {
		return cachedTranslations;
	}

	const map = new Map<string, Map<string, CollectionEntry<"translations">>>();

	try {
		const translations = await getCollection("translations");
		
		for (const translation of translations) {
			const originalSlug = translation.data.originalSlug;
			const lang = translation.data.lang;
			
			if (!map.has(originalSlug)) {
				map.set(originalSlug, new Map());
			}
			map.get(originalSlug)!.set(lang, translation);
		}
	} catch {
		// Translations collection might not exist yet
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
): Promise<CollectionEntry<"posts"> | CollectionEntry<"translations">> {
	if (targetLang === "en") {
		return post;
	}

	const translationsMap = await getTranslationsMap();
	const postSlug = post.slug.replace(/\//g, "_");
	const langTranslations = translationsMap.get(postSlug);

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
	if (cachedSortedPosts && cachedIsProd === import.meta.env.PROD && !lang) {
		return cachedSortedPosts;
	}

	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	// If a specific language is requested, apply translations
	if (lang && lang !== "en") {
		const translatedPosts: CollectionEntry<"posts">[] = [];
		
		for (const post of sorted) {
			const translated = await getTranslatedPost(post, lang);
			// Merge translation data with original post structure
			translatedPosts.push({
				...post,
				data: {
					...post.data,
					title: translated.data.title,
					description: translated.data.description,
				},
				body: translated.body,
				render: translated.render,
			} as CollectionEntry<"posts">);
		}
		
		return translatedPosts;
	}

	cachedSortedPosts = sorted;
	cachedIsProd = import.meta.env.PROD;
	return cachedSortedPosts;
}

export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getSortedPosts();

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

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getSortedPosts();
	const count: { [key: string]: number } = {};
	allBlogPosts.map((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
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
			url: getCategoryUrl(c),
		});
	}
	return ret;
}

export async function getSeriesList(): Promise<SeriesItem[]> {
	const allBlogPosts = await getSortedPosts();
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
