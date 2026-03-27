# ⛓️‍💥 Banije

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**banije** is a personal learning diary, capturing knowledge accumulated over the years through exploring multiple fields, including:

- 💻 **Computer Science**
- 🛠️ **Software Engineering**
- 🐚 **Unix Shell**
- 🔩 **Hardware Development**
- 📐 **Advanced Mathematics**
- 🗂️ **Data Structures**
- 📊 **Algorithms**
- 🌟 *And more...*

This project reflects a passion for learning and serves as a platform to document, refine, and share insights.

(See also the Japanese version: [Japanese version](./README.ja-JP.md))

## Table of Contents

- [⛓️‍💥 Banije](#️-banije)
  - [Table of Contents](#table-of-contents)
  - [✨ Features](#-features)
  - [📋 Prerequisites](#-prerequisites)
  - [🚀 How to Use](#-how-to-use)
  - [⚙️ Frontmatter of Posts](#️-frontmatter-of-posts)
  - [🧞 Commands](#-commands)
  - [🤝 Contributing](#-contributing)
  - [🌍 Translation Workflow (Free)](#-translation-workflow-free)
  - [🤝 Contributing](#-contributing-1)
  - [🙏 Credits](#-credits)
  - [📄 License](#-license)

![Preview Image](https://raw.githubusercontent.com/ibra-kdbra/banije/main/public/captured.png)

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [x] Search functionality

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** package manager
- **Git** for version control

Install pnpm globally if you haven't:

```bash
npm install -g pnpm
```

## 🚀 How to Use

1. Clone this repository:

   ```bash
   git clone https://github.com/ibra-kdbra/banije.git
   cd banije
   ```

2. Install dependencies:

   ```bash
   pnpm install
   pnpm add sharp
   ```

3. Edit the config file `src/config.ts` to customize your blog.

4. Create a new post:

   ```bash
   pnpm new-post <filename>
   ```

   This will create a new file in `src/content/posts/` for you to edit.

5. Start the development server:

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:4321` to see your blog.

6. Deploy your blog to Vercel, Netlify, GitHub Pages, etc., following [the guides](https://docs.astro.build/en/guides/deploy/). Update the site configuration in `astro.config.mjs` before deployment.

## ⚙️ Frontmatter of Posts

Each post in `src/content/posts/` uses YAML frontmatter for metadata. Here's the structure:

```yaml
---
title: My First Blog Post              # Post title (required)
published: 2023-09-09                  # Publication date in YYYY-MM-DD format (required)
description: This is the first post... # Brief description for SEO and previews (required)
image: ./cover.jpg                     # Cover image path relative to post folder (optional)
tags: [Foo, Bar]                       # Array of tags for categorization (optional)
category: Front-end                    # Main category (optional)
draft: false                           # Set to true to hide from production (optional, default: false)
lang: jp                               # Language code if different from site default (optional)
---
```

**Notes:**

- `title`, `published`, and `description` are required fields.
- Images should be placed in the same folder as the post file.
- Tags and category help with organization and search.
- Draft posts won't appear in the live site.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
|:--------------------------|:-------------------------------------------------|
| `pnpm install`            | Installs project dependencies                    |
| `pnpm add sharp`          | Adds Sharp for image processing                  |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm new-post <filename>`| Create a new post in `src/content/posts/`        |
| `pnpm translate`          | Translate posts with structure protection + cache |
| `pnpm translate -- --lang=tr --skip-existing` | Translate only Turkish, skipping existing files |
| `pnpm translate -- --post=gitCommands --lang=ja` | Translate one post to Japanese |
| `pnpm translate:fix`      | Post-process and repair known translation artifacts |
| `pnpm translate:audit`    | Audit translation coverage against source posts |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`       | Get help using the Astro CLI                     |

## 🤝 Contributing

## 🌍 Translation Workflow (Free)

The project includes a free translation pipeline based on `google-translate-api-x`.

What it does:

- Preserves Markdown structure (code fences, links, admonitions, embeds)
- Protects technical terms with a glossary
- Caches results using content hashes to avoid re-translating unchanged files
- Validates translated output shape before writing files

Main files:

- `scripts/translate.js`
- `scripts/translation-glossary.json`
- `scripts/fix-translations.js`
- `scripts/audit.js`

Recommended flow:

1. Run translation incrementally with `pnpm translate -- --skip-existing`.
2. Repair known edge cases with `pnpm translate:fix`.
3. Verify missing translations with `pnpm translate:audit`.

Useful options:

- `--lang=<code>`: target one language (e.g. `tr`, `ja`)
- `--post=<slug>`: target one post
- `--force`: ignore cache and re-translate
- `--delay=<ms>`: request spacing to reduce throttling
- `--max-chars=<n>`: chunk size per translation request
- `--dry-run`: process without writing translated files

If wording is not ideal for technical terms, edit `scripts/translation-glossary.json` and run again.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

Please ensure your code follows the existing style and includes appropriate tests if applicable.

## 🙏 Credits

This project, banije, is inspired by the excellent work on the [Fuwari](https://github.com/saicaca/fuwari). Their use of Astro for static site generation and attention to detail in crafting templates is truly commendable.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
