# ⛓️‍💥 Banije

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Banije** is a personal learning diary and centralized knowledge base, capturing knowledge accumulated over the years through exploring multiple technical fields. This project reflects a passion for discovery and serves as a living platform to document, refine, and share engineering insights.

---

## 🔍 Fields of Interest

The content is organized across several core technical pillars:
- 💻 **Computer Science**: Foundational theory and data structures.
- 🛠️ **Software Engineering**: Design patterns, refactoring, and clean code.
- 🐚 **Unix Shell**: Environment automation and shell scripting.
- 🔩 **Hardware Development**: Low-level systems and hardware interactions.
- 📐 **Advanced Mathematics**: Algorithms and mathematical logic.
- 🧠 **Artificial Intelligence**: LLMs, agentic workflows, and ethical AI.

(See also the Japanese version: [Japanese version](./README.ja-JP.md))

---

## 🏗️ Architecture & Tech Stack

The project is architected for speed, SEO, and a premium developer experience:
- **Framework**: [Astro 5](https://astro.build) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Stylus](https://stylus-lang.com/)
- **Components**: [Svelte 5](https://svelte.dev) (Runes-based interactivity)
- **Search**: [Pagefind](https://pagefind.app/) (Decentralized static search)
- **Typography**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) for code-heavy legibility.

---

## ✨ Features

- [x] **Performance**: Built with Astro 5 for near-instant static page loads.
- [x] **Modern UI**: Smooth animations and page transitions via Svelte 5.
- [x] **Themes**: Responsive Light / Dark mode support.
- [x] **Customization**: Easily customizable theme colors and banners.
- [x] **Search**: Integrated lightning-fast decentralized search.
- [x] **Translation**: Robust automated multi-language support.

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **pnpm** package manager
- **Git** for version control

Install pnpm globally if you haven't:
```bash
npm install -g pnpm
```

---

## 🚀 How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ibra-kdbra/banije.git
   cd banije
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   pnpm add sharp # Required for Astro image processing
   ```

3. **Customize your blog**:
   Edit the configuration file at `src/config.ts` to tailor the blog to your needs.

4. **Create a new post**:
   ```bash
   pnpm new-post <filename>
   ```
   This will scaffold a new file in `src/content/posts/` for you to edit.

5. **Start development server**:
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:4321` to see your changes in real-time.

6. **Build & Deploy**:
   Build your production site to the `./dist/` directory:
   ```bash
   pnpm build
   ```
   Follow [the Astro guides](https://docs.astro.build/en/guides/deploy/) to deploy to Vercel, Netlify, or GitHub Pages.

---

## ⚙️ Frontmatter Specification

Each post in `src/content/posts/` uses YAML frontmatter. All fields below are standard:

```yaml
---
title: "Post Title"                # (Required)
published: YYYY-MM-DD              # (Required)
description: "Brief SEO summary"    # (Required)
image: "/images/posts/cover.png"   # (Optional) Cover image path
tags: [Tag1, Tag2, Tag3]           # (Optional) Max 3 tags recommended
category: "Architecture"           # (Optional) Main technical pillar
draft: false                       # (Optional) Default: false
---
```

**Notes:**
- `title`, `published`, and `description` are required for the build to pass.
- Images should be placed in the `public/images/posts/` directory or relative to the post.
- Tags and categories enable the dynamic filtering and search systems.

---

## 🧞 Full Command List

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs project dependencies |
| `pnpm add sharp` | Adds Sharp for image processing |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build production site and generate search index |
| `pnpm preview` | Preview your build locally before deploying |
| `pnpm new-post` | Create a new post in `src/content/posts/` |
| `pnpm translate` | Runs LLM-powered multi-language translation |
| `pnpm images:optimize`| Optimizes images in the content directory |
| `pnpm lint` | Perform code quality checks using Biome |
| `pnpm format` | Automatically format the source code |
| `pnpm type-check` | Run TypeScript validation |

---

## 🛠️ Translation Workflow (Free)

The project includes a free translation pipeline based on `google-translate-api-x` and custom scripts.

**Core Capabilities:**
- **Structure Preservation**: Protects Markdown fences, links, admonitions, and Svelte embeds.
- **Technical Glossary**: Uses `scripts/translation-glossary.json` to protect technical terms.
- **Caching**: Uses content hashes to avoid re-translating unchanged files.
- **Validation**: Ensures the translated output matches the required frontmatter shape.

**Useful Commands:**
- `pnpm translate -- --lang=tr --skip-existing`: Translate only Turkish, skipping existing files.
- `pnpm translate -- --post=gitCommands --lang=ja`: Translate one specific post to Japanese.
- `pnpm translate:fix`: Post-process and repair known translation artifacts.

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

---

## 🙏 Credits

Inspired by [Fuwari](https://github.com/saicaca/fuwari) for its clean Astro foundations and minimalist aesthetic.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
