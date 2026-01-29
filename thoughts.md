# thoughts

## Summary

Banije is a content‑first Astro diary with solid UI/UX foundations. The primary needs are: clearer architecture boundaries, stronger content governance, performance budgets, and a phased roadmap for growth.

## What this project needs

### 1) Diary structure (content governance)

- A defined taxonomy: categories vs tags, with clear rules.
- Consistent frontmatter schema and validation.
- A lightweight editorial flow (draft → review → publish).
- A “learning log” cadence (daily/weekly) with templates.

### 2) Clean architecture (frontend)

- Clear separation between:
  - Content (markdown + frontmatter)
  - Domain utilities (content parsing, date, URL logic)
  - Presentation (Astro/Svelte components)
  - Configuration (site/nav/profile/expressive code)
- Introduce a “feature folder” approach inside `src/` for posts, search, archive, and widgets.
- Formalize contracts/types to avoid config drift.

### 3) Software engineering hygiene

- Add lightweight CI for formatting/lint/type-check/build.
- Document contribution rules and naming conventions.
- Add release notes / changelog for visible changes.

### 4) Better performance

- Set performance budgets (LCP, CLS, JS payload).
- Reduce client-side hydration where possible.
- Optimize images and prerendering; keep a strict page weight target.

## Observations (current state)

- Good Astro + Tailwind base and clean component structure.
- Content system exists, but governance and schema enforcement are light.
- Search exists, but indexing rules and experience can be improved.
- No explicit engineering lifecycle (CI, checks, changelog).

## Features that would help

### Content & diary

- Templates for daily/weekly notes (pre-filled frontmatter).
- “Learning trail” pages: a list of related posts by topic.
- “Series” support via frontmatter and a series index page.

### Navigation & discovery

- Better archive filters (by year, tag, category).
- Recent activity widget (latest posts + “last updated”).
- Reading progress / time‑to‑read badge consistency.

### Performance & UX

- Image optimization audit; ensure `sharp` usage and responsive sizes.
- Reduce client hydration for widgets that don’t need it.
- Prefer server-rendered search UI with client enhancement only when necessary.

## Recommended implementation approach

### Architecture conventions

- Define a small set of domains:
  - `content` (schema, loaders, excerpts)
  - `ui` (components, layout)
  - `features` (search, archive, series)
  - `config` (site/nav/profile)
- Enforce types for frontmatter in `src/content/config.ts`.

### Performance discipline

- Establish budgets (example targets):
  - LCP < 2.5s, CLS < 0.1, JS < 150KB on post pages.
- Use Astro’s island model strategically.

## Phased plan

### Overall flow

![Overall phases flow](/images/diagrams/phase-overall.svg)

### Phase 0 — Baseline (1–2 days)

**Goals**

- Define the minimum rules that make the diary consistent and repeatable.

**Implementation tasks**

- Document content taxonomy rules (tags vs categories).
- Create a posting checklist (draft → review → publish).
- Define performance budgets and acceptance criteria.

**Deliverables**

- A short content guideline section in docs.
- A checklist for posts.
- A baseline performance target list.

**Diagram**

![Phase 0 flow](/images/diagrams/phase-0.svg)

### Phase 1 — Governance & Structure (3–5 days)

**Goals**

- Enforce consistent metadata and editorial standards.

**Implementation tasks**

- Formalize frontmatter schema as a single source of truth.
- Add content templates (daily, weekly, series).
- Publish a writing/style guide (tone, naming, tags).

**Deliverables**

- Frontmatter schema documentation.
- Template files and usage instructions.
- Style guide for authors.

**Diagram**

![Phase 1 flow](/images/diagrams/phase-1.svg)

### Phase 2 — Architecture cleanup (4–7 days)

**Goals**

- Separate concerns and reduce coupling across UI, content, and config.

**Implementation tasks**

- Introduce feature-oriented folders (search, archive, series).
- Refactor shared utilities into clear domain modules.
- Tighten TypeScript types between config, content, and UI.

**Deliverables**

- Refined folder structure.
- Stable types and contracts.
- Reduced cross‑module dependencies.

**Diagram**

![Phase 2 flow](/images/diagrams/phase-2.svg)

### Phase 3 — Performance pass (3–5 days)

**Goals**

- Reach the performance budget without degrading UX.

**Implementation tasks**

- Audit client hydration and minimize islands.
- Optimize image pipeline and responsive sizes.
- Validate against the performance budget.

**Deliverables**

- Reduced JS payload for posts.
- Optimized images with consistent sizes.
- Performance budget compliance report.

**Diagram**

![Phase 3 flow](/images/diagrams/phase-3.svg)

### Phase 4 — Discovery & UX (5–10 days)

**Goals**

- Improve navigability and content discovery.

**Implementation tasks**

- Add series pages and richer archive filters.
- Improve search ranking and filters.
- Add “recent activity” and “last updated” widgets.

**Deliverables**

- Series index views.
- Search enhancements.
- Discovery widgets.

**Diagram**

![Phase 4 flow](/images/diagrams/phase-4.svg)

### Phase 5 — Quality & Sustainability (ongoing)

**Goals**

- Keep quality high and prevent regressions.

**Implementation tasks**

- Add CI checks (format, lint, type-check, build).
- Add a changelog for visible changes.
- Track performance regressions and iterate.

**Deliverables**

- Automated quality gates.
- Change history.
- Long-term performance stability.

**Diagram**

![Phase 5 flow](/images/diagrams/phase-5.svg)

## Success criteria

- Consistent, high‑quality diary entries.
- Clear architecture boundaries with minimal coupling.
- Stable and repeatable performance targets.
- Easy navigation and discovery for new readers.
