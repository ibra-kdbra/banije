import { siteConfig } from "../config";
import type I18nKey from "./i18nKey";
import { en } from "./languages/en";
import { es } from "./languages/es";
import { ja } from "./languages/ja";
import { tr } from "./languages/tr";
import { ko } from "./languages/ko";
import { zh_CN } from "./languages/zh_CN";
import { zh_TW } from "./languages/zh_TW";

export type Translation = {
	[K in I18nKey]: string;
};

const defaultTranslation = en;

const map: { [key: string]: Translation } = {
	es: es,
	en: en,
	en_us: en,
	en_gb: en,
	en_au: en,
	zh_cn: zh_CN,
	zh_tw: zh_TW,
	ja: ja,
	ja_jp: ja,
	ko: ko,
	ko_kr: ko,
	tr: tr,
	tr_tr: tr,
};

export function getTranslation(lang: string): Translation {
	return map[lang.toLowerCase()] || defaultTranslation;
}

export function i18n(key: I18nKey): string {
	const globalLang = (globalThis as { __lang?: string }).__lang;
	const docLang =
		typeof document !== "undefined" ? document.documentElement.lang : undefined;
	const resolved = globalLang || docLang || siteConfig.lang || "en";
	return getTranslation(resolved)[key];
}
