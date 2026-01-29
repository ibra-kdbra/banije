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
