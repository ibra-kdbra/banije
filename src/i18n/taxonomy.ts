/**
 * Localised display names for content taxonomy (series & categories).
 *
 * Series names and category names live in post frontmatter as canonical
 * English strings — they are *content*, not UI copy, so they don't fit the
 * enum-keyed i18n system in ./translation.ts. This module is the single source
 * of truth that maps each canonical value to its per-language display name,
 * with a graceful fallback to the canonical English when a translation is
 * missing (so a new, untranslated series/category still renders sensibly).
 *
 * IMPORTANT: only the *display* is localised. Slugs, anchor ids, URLs, and
 * filtering keep using the canonical English value, so cross-language links and
 * navigation stay stable.
 *
 * Tags are intentionally NOT handled here: they are a large, open-ended
 * vocabulary currently localised for Arabic only (see utils/arabic-translations).
 */

type LocaleMap = Record<string, string>;

/** Normalise a lang code to the keys used below (e.g. "zh-CN" -> "zh_cn"). */
function normalizeLang(lang?: string): string {
  const l = (lang ?? "").toLowerCase().replace(/-/g, "_");
  if (l.startsWith("zh")) return l; // keep zh_cn / zh_tw distinct
  return l.split("_")[0]; // es_es -> es, en_us -> en
}

const seriesTranslations: Record<string, LocaleMap> = {
  "AI Foundations": {
    ar: "أسس الذكاء الاصطناعي",
    es: "Fundamentos de la IA",
    ja: "AI の基礎",
    ko: "AI 기초",
    tr: "Yapay Zekâ Temelleri",
    zh_cn: "AI 基础",
    zh_tw: "AI 基礎",
  },
  "Backend Engineering": {
    ar: "هندسة الواجهة الخلفية",
    es: "Ingeniería de Backend",
    ja: "バックエンドエンジニアリング",
    ko: "백엔드 엔지니어링",
    tr: "Backend Mühendisliği",
    zh_cn: "后端工程",
    zh_tw: "後端工程",
  },
  "Security Architecture": {
    ar: "بنية الأمان",
    es: "Arquitectura de Seguridad",
    ja: "セキュリティアーキテクチャ",
    ko: "보안 아키텍처",
    tr: "Güvenlik Mimarisi",
    zh_cn: "安全架构",
    zh_tw: "安全架構",
  },
};

const categoryTranslations: Record<string, LocaleMap> = {
  "Advanced Programming": {
    ar: "برمجة متقدمة",
    es: "Programación Avanzada",
    ja: "高度なプログラミング",
    ko: "고급 프로그래밍",
    tr: "İleri Programlama",
    zh_cn: "高级编程",
    zh_tw: "進階程式設計",
  },
  Architecture: {
    ar: "معمارية",
    es: "Arquitectura",
    ja: "アーキテクチャ",
    ko: "아키텍처",
    tr: "Mimari",
    zh_cn: "架构",
    zh_tw: "架構",
  },
  "Artificial Intelligence": {
    ar: "الذكاء الصنعي",
    es: "Inteligencia Artificial",
    ja: "人工知能",
    ko: "인공지능",
    tr: "Yapay Zekâ",
    zh_cn: "人工智能",
    zh_tw: "人工智慧",
  },
  "Backend Development": {
    ar: "تطوير الخلفية",
    es: "Desarrollo de Backend",
    ja: "バックエンド開発",
    ko: "백엔드 개발",
    tr: "Backend Geliştirme",
    zh_cn: "后端开发",
    zh_tw: "後端開發",
  },
  Cybersecurity: {
    ar: "الأمن السيبراني",
    es: "Ciberseguridad",
    ja: "サイバーセキュリティ",
    ko: "사이버 보안",
    tr: "Siber Güvenlik",
    zh_cn: "网络安全",
    zh_tw: "網路安全",
  },
  "Developer Workflow": {
    ar: "سير عمل المطور",
    es: "Flujo de Trabajo del Desarrollador",
    ja: "開発者ワークフロー",
    ko: "개발자 워크플로",
    tr: "Geliştirici İş Akışı",
    zh_cn: "开发者工作流",
    zh_tw: "開發者工作流程",
  },
  Engineering: {
    ar: "الهندسة",
    es: "Ingeniería",
    ja: "エンジニアリング",
    ko: "엔지니어링",
    tr: "Mühendislik",
    zh_cn: "工程",
    zh_tw: "工程",
  },
  "Financial Market": {
    ar: "السوق المالية",
    es: "Mercado Financiero",
    ja: "金融市場",
    ko: "금융 시장",
    tr: "Finansal Piyasa",
    zh_cn: "金融市场",
    zh_tw: "金融市場",
  },
  Guide: {
    ar: "دليل",
    es: "Guía",
    ja: "ガイド",
    ko: "가이드",
    tr: "Rehber",
    zh_cn: "指南",
    zh_tw: "指南",
  },
  Mathematics: {
    ar: "الرياضيات",
    es: "Matemáticas",
    ja: "数学",
    ko: "수학",
    tr: "Matematik",
    zh_cn: "数学",
    zh_tw: "數學",
  },
  "Network Engineering": {
    ar: "هندسة الشبكات",
    es: "Ingeniería de Redes",
    ja: "ネットワークエンジニアリング",
    ko: "네트워크 엔지니어링",
    tr: "Ağ Mühendisliği",
    zh_cn: "网络工程",
    zh_tw: "網路工程",
  },
  Philosophy: {
    ar: "الفلسفة",
    es: "Filosofía",
    ja: "哲学",
    ko: "철학",
    tr: "Felsefe",
    zh_cn: "哲学",
    zh_tw: "哲學",
  },
  "Software Development": {
    ar: "تطوير البرمجيات",
    es: "Desarrollo de Software",
    ja: "ソフトウェア開発",
    ko: "소프트웨어 개발",
    tr: "Yazılım Geliştirme",
    zh_cn: "软件开发",
    zh_tw: "軟體開發",
  },
  "Software Engineering": {
    ar: "هندسة البرمجيات",
    es: "Ingeniería de Software",
    ja: "ソフトウェア工学",
    ko: "소프트웨어 공학",
    tr: "Yazılım Mühendisliği",
    zh_cn: "软件工程",
    zh_tw: "軟體工程",
  },
  "Systems & Security": {
    ar: "الأنظمة والأمان",
    es: "Sistemas y Seguridad",
    ja: "システムとセキュリティ",
    ko: "시스템과 보안",
    tr: "Sistemler ve Güvenlik",
    zh_cn: "系统与安全",
    zh_tw: "系統與安全",
  },
  Tutorial: {
    ar: "دروس تعليمية",
    es: "Tutorial",
    ja: "チュートリアル",
    ko: "튜토리얼",
    tr: "Eğitim",
    zh_cn: "教程",
    zh_tw: "教學",
  },
  "Version Control": {
    ar: "إدارة النسخ",
    es: "Control de Versiones",
    ja: "バージョン管理",
    ko: "버전 관리",
    tr: "Sürüm Kontrolü",
    zh_cn: "版本控制",
    zh_tw: "版本控制",
  },
};

function translate(
  map: Record<string, LocaleMap>,
  value: string | null | undefined,
  lang?: string,
): string {
  if (!value) return value ?? "";
  const key = value.trim();
  const entry = map[key];
  if (!entry) return key; // unknown taxonomy value -> canonical English
  return entry[normalizeLang(lang)] ?? key; // missing locale -> canonical English
}

/** Localised display name for a series (falls back to the canonical English). */
export function translateSeries(
  name: string | null | undefined,
  lang?: string,
): string {
  return translate(seriesTranslations, name, lang);
}

/** Localised display name for a category (falls back to the canonical English). */
export function translateCategory(
  name: string | null | undefined,
  lang?: string,
): string {
  return translate(categoryTranslations, name, lang);
}
