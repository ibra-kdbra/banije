# Changelog

## Added

- thoughts.md — Add project roadmap, phases, and diagrams references.
- src/components/ArchivePanel.astro — Server-rendered archive panel to remove client hydration.
- performance-report.md — Phase 3 performance checklist and summary.
- src/pages/series.astro — Series index page for grouped posts.
- src/components/SeriesPanel.astro — Archive-style series list with anchors.

## Modified

- .gitignore — Ignore rules/ and public/images/diagrams outputs.
- src/components/ArchivePanel.svelte — Deprecated Svelte archive panel (replaced by SSR version).
- src/components/Navbar.astro — Defer Svelte islands to idle; remove eager Pagefind loader.
- src/components/Search.svelte — Lazy-load Pagefind on interaction; add Vite ignore for dynamic import.
- src/layouts/Layout.astro — Defer custom scrollbar initialization to idle time.
- src/pages/archive.astro — Use SSR archive panel and server-side filters.
- src/utils/setting-utils.ts — Guard browser-only APIs for SSR.
- src/components/misc/ImageWrapper.astro — Add sizes/priority controls for responsive images.
- src/layouts/MainGridLayout.astro — Provide sizes hint for banner image.
- src/pages/posts/[...slug].astro — Provide sizes hint for post cover image.
- src/components/PostCard.astro — Provide sizes hint for card cover image.
- src/components/widget/Profile.astro — Provide sizes hint for profile image.
- src/utils/content-utils.ts — Cache sorted posts and reuse for tags/categories.
- src/utils/content-utils.ts — Add series aggregation for series index.
- src/features/content/index.ts — Export series helpers and types.
- src/i18n/i18nKey.ts — Add series key.
- src/i18n/languages/*.ts — Add series translations.
- src/constants/link-presets.ts — Add series link preset.
- src/types/config.ts — Add series link preset and series metadata type.
- src/config.ts — Add series to navbar links.
- src/components/PostMeta.astro — Show series badge with deep link.
- src/pages/posts/[...slug].astro — Pass series metadata to PostMeta.
- src/pages/archive.astro — Use client-only archive panel for query filters.
- src/components/ArchivePanel.svelte — Restore client filtering for tags/categories.
- src/content/posts/* — Add series frontmatter for backend/security/AI posts.

## Notes

- Diagram assets live under public/images/diagrams (ignored by git).

## [2026-01-29] - Multilingual Integration

### Changed
- docs: update .gitignore (.gitignore)
- config: update site configuration for multi-language support (astro.config.mjs)
- docs: update package.json (package.json)
- docs: update pnpm-lock.yaml (pnpm-lock.yaml)
- chore: add/update utility script translate-posts.mjs (scripts/translate-posts.mjs)
- feat: update ArchivePanel.astro component for i18n support (src/components/ArchivePanel.astro)
- feat: implement smart language switching with URL redirection (src/components/LanguageSwitch.astro)
- feat: update Navbar.astro component for i18n support (src/components/Navbar.astro)
- feat: update PostPage.astro component for i18n support (src/components/PostPage.astro)
- feat: update SeriesPanel.astro component for i18n support (src/components/SeriesPanel.astro)
- feat: update Categories.astro component for i18n support (src/components/widget/Categories.astro)
- feat: update NavMenuPanel.astro component for i18n support (src/components/widget/NavMenuPanel.astro)
- feat: update SideBar.astro component for i18n support (src/components/widget/SideBar.astro)
- feat: update Tags.astro component for i18n support (src/components/widget/Tags.astro)
- config: update site configuration for multi-language support (src/config.ts)
- config: update constants for supported languages (src/constants/constants.ts)
- config: update site configuration for multi-language support (src/content/config.ts)
- docs: update src/content/posts/AI_ethics/index.md (src/content/posts/AI_ethics/index.md)
- docs: update src/features/content/index.ts (src/features/content/index.ts)
- i18n: update translation handling for translation.ts (src/i18n/translation.ts)
- docs: update src/layouts/Layout.astro (src/layouts/Layout.astro)
- docs: update src/layouts/MainGridLayout.astro (src/layouts/MainGridLayout.astro)
- feat: update [...page].astro to support multilingual content (src/pages/[...page].astro)
- feat: update about.astro to support multilingual content (src/pages/about.astro)
- feat: update posts.json.ts to support multilingual content (src/pages/api/posts.json.ts)
- feat: update archive.astro to support multilingual content (src/pages/archive.astro)
- feat: update [...slug].astro to support multilingual content (src/pages/posts/[...slug].astro)
- feat: update series.astro to support multilingual content (src/pages/series.astro)
- style: update styles for better localized content display (src/styles/markdown.css)
- config: update site configuration for multi-language support (src/types/config.ts)
- feat: implement language-aware content fetching and merging (src/utils/content-utils.ts)
- refactor: enhance URL utilities for language-aware routing (src/utils/url-utils.ts)
- docs: update changelog.md (changelog.md)
- docs: update performance-report.md (performance-report.md)
- docs: update public/images/posts/five_pillars.png (public/images/posts/five_pillars.png)
- chore: add/update utility script audit.js (scripts/audit.js)
- i18n: update translation handling for fix-translations.js (scripts/fix-translations.js)
- chore: add/update utility script translate.js (scripts/translate.js)
- chore: add/update utility script update-changelog.js (scripts/update-changelog.js)
- feat: update TranslatedContent.astro component for i18n support (src/components/misc/TranslatedContent.astro)
- docs: update src/content/translate/ (src/content/translate/)
- feat: implement localized route for [lang] (src/pages/[lang]/)
- feat: update internal to support multilingual content (src/pages/internal/)
- docs: update src/utils/slug-utils.ts (src/utils/slug-utils.ts)
- docs: update thoughts.md (thoughts.md)
