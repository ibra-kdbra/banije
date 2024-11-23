# ⛓️‍💥 Banije

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

![Preview Image](https://raw.githubusercontent.com/ibra-kdbra/banije/main/public/captured.png)

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [x] Search functionality

## 🚀 How to Use

1. To edit your blog locally, clone this repository, run `pnpm install` AND `pnpm add sharp` to install dependencies.
   - Install [pnpm](https://pnpm.io) `npm install -g pnpm` if you haven't.
2. Edit the config file `src/config.ts` to customize your blog.
3. Run `pnpm new-post <filename>` to create a new post and edit it in `src/content/posts/`.
4. Deploy your blog to Vercel, Netlify, GitHub Pages, etc., following [the guides](https://docs.astro.build/en/guides/deploy/). You need to edit the site configuration in `astro.config.mjs` before deployment.

## ⚙️ Frontmatter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # Set only if the post's language differs from the site's language in `config.ts`
---
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | Installs dependencies                            |
| `pnpm dev`                          | Starts local dev server at `localhost:4321`      |
| `pnpm build`                        | Build your production site to `./dist/`          |
| `pnpm preview`                      | Preview your build locally, before deploying     |
| `pnpm new-post <filename>`          | Create a new post                                |
| `pnpm astro ...`                    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`                 | Get help using the Astro CLI                     |


## 🙏 Credits

This project, banije, is inspired by the excellent work on the [Fuwari](https://github.com/saicaca/fuwari). Their use of Astro for static site generation and attention to detail in crafting templates is truly commendable.
