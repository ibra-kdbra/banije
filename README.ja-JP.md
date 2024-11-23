# ⛓️‍💥 Banije

**banije** は、長年にわたって得た知識を記録するための個人的な学習日記です。このプロジェクトは、以下の分野を探求してきた経験を基にしています：

- 💻 **コンピュータサイエンス**
- 🛠️ **ソフトウェアエンジニアリング**
- 🐚 **Unixシェル**
- 🔩 **ハードウェア開発**
- 📐 **高度な数学**
- 🗂️ **データ構造**
- 📊 **アルゴリズム**
- 🌟 *その他...*

このプロジェクトは学びへの情熱を反映しており、知識を文書化し、洗練し、共有するためのプラットフォームとして機能します。

（英語版もご覧ください：[英語版](./README.md)）
![Preview Image](https://raw.githubusercontent.com/ibra-kdbra/resource/main/banije/public/captured.png)

## ✨ 特徴

- [x] [Astro](https://astro.build) と [Tailwind CSS](https://tailwindcss.com) を使用して構築
- [x] スムーズなアニメーションとページ遷移
- [x] ライト/ダークモード
- [x] カスタマイズ可能なテーマカラーとバナー
- [x] レスポンシブデザイン
- [x] 検索機能

## 🚀 使用方法

1. このリポジトリをクローンした後、`pnpm install` と `pnpm add sharp` を実行して依存関係をインストールします。
   - [pnpm](https://pnpm.io) がインストールされていない場合は、`npm install -g pnpm` でインストールできます。
2. `src/config.ts` ファイルを編集してブログをカスタマイズします。
3. `pnpm new-post <filename>` を実行して新しい投稿を作成し、`src/content/posts/` フォルダ内で編集します。
4. 作成したブログをVercel、Netlify、GitHub Pages などにデプロイするには、[ガイド](https://docs.astro.build/ja/guides/deploy/)に従ってください。デプロイ前に、`astro.config.mjs` を編集してサイト構成を変更する必要があります。

## ⚙️ 記事のフロントマター

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: /images/cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---


## 🧞 コマンド

すべてのコマンドは、ターミナルでプロジェクトのルートから実行する必要があります:

| Command                             | Action                                      |
|:------------------------------------|:--------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | 依存関係のインストール                                 |
| `pnpm dev`                          | `localhost:4321` で開発用ローカルサーバーを起動            |
| `pnpm build`                        | `./dist/` にビルド内容を出力                         |
| `pnpm preview`                      | デプロイ前の内容をローカルでプレビュー                         |
| `pnpm new-post <filename>`          | 新しい投稿を作成                                    |
| `pnpm astro ...`                    | `astro add`, `astro check` の様なコマンドを実行する際に使用 |
| `pnpm astro --help`                 | Astro CLIのヘルプを表示                            |
