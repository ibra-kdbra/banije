# Performance Report (Phase 3)

## Summary
Phase 3 optimizations focused on reducing client hydration and improving image loading.

## Changes Applied
- Server-rendered archive (removed client hydration).
- Deferred Svelte islands to idle in Navbar.
- Lazy-loaded Pagefind in Search on user interaction.
- Added image `loading`, `fetchpriority`, and `sizes` hints for better LCP and bandwidth.
- Deferred custom scrollbar initialization to idle.
- Cached content queries to reduce repeated reads.

## Budgets (target)
- LCP < 2.5s
- CLS < 0.1
- Post page JS < 150KB
- Image total < 1.5MB per post page

## Validation Checklist
- [ ] Run Lighthouse on homepage and a post page.
- [ ] Confirm LCP/CLS meet targets.
- [ ] Check JS bundle size on post page.
- [ ] Verify image payload sizes with DevTools.

## Next Actions
- If any target fails, reduce islands further or compress images.
