# ⛓️‍💥 Banije

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## 目次

- [⛓️‍💥 Banije](#️-banije)
  - [目次](#目次)
  - [✨ 特徴](#-特徴)
  - [📋 前提条件](#-前提条件)
  - [🚀 使用方法](#-使用方法)
  - [⚙️ 記事のフロントマター](#️-記事のフロントマター)
  - [🧞 コマンド](#-コマンド)
  - [🤝 貢献](#-貢献)
  - [🙏 クレジット](#-クレジット)
  - [📄 ライセンス](#-ライセンス)

![Preview Image](https://raw.githubusercontent.com/ibra-kdbra/banije/main/public/captured.png)


## ✨ 特徴

- [x] [Astro](https://astro.build) と [Tailwind CSS](https://tailwindcss.com) を使用して構築
- [x] スムーズなアニメーションとページ遷移
- [x] ライト/ダークモード
- [x] カスタマイズ可能なテーマカラーとバナー
- [x] レスポンシブデザイン
- [x] 検索機能

## 📋 前提条件

始める前に、以下のものがインストールされていることを確認してください：

- **Node.js** （バージョン 18 以上）
- **pnpm** パッケージマネージャー
- **Git** バージョン管理用

pnpm がインストールされていない場合は、グローバルにインストールしてください：
```bash
npm install -g pnpm
```

## 🚀 使用方法

1. このリポジトリをクローンします：
   ```bash
   git clone https://github.com/ibra-kdbra/banije.git
   cd banije
   ```

2. 依存関係をインストールします：
   ```bash
   pnpm install
   pnpm add sharp
   ```

3. `src/config.ts` ファイルを編集してブログをカスタマイズします。

4. 新しい投稿を作成します：
   ```bash
   pnpm new-post <filename>
   ```
   これにより、`src/content/posts/` フォルダ内に新しいファイルが作成され、編集できます。

5. 開発サーバーを起動します：
   ```bash
   pnpm dev
   ```
   `http://localhost:4321` でブログを確認できます。

6. 作成したブログをVercel、Netlify、GitHub Pages などにデプロイするには、[ガイド](https://docs.astro.build/ja/guides/deploy/)に従ってください。デプロイ前に、`astro.config.mjs` を編集してサイト構成を変更する必要があります。

## ⚙️ 記事のフロントマター

`src/content/posts/` 内の各記事は、メタデータのためのYAMLフロントマターを使用します。構造は以下の通りです：

```yaml
---
title: My First Blog Post              # 記事タイトル（必須）
published: 2023-09-09                  # 公開日（YYYY-MM-DD形式、必須）
description: This is the first post... # 説明文（SEOとプレビュー用、必須）
image: ./cover.jpg                     # カバー画像のパス（記事フォルダからの相対パス、オプション）
tags: [Foo, Bar]                       # タグの配列（分類用、オプション）
category: Front-end                    # メインカテゴリ（オプション）
draft: false                           # プロダクションで非表示にする場合true（オプション、デフォルト: false）
lang: jp                               # サイトのデフォルト言語と異なる場合の言語コード（オプション）
---
```

**注意点：**
- `title`、`published`、`description` は必須フィールドです。
- 画像は記事ファイルと同じフォルダに配置してください。
- タグとカテゴリは整理と検索に役立ちます。
- 下書き記事はライブサイトに表示されません。

## 🧞 コマンド

すべてのコマンドは、ターミナルでプロジェクトのルートから実行する必要があります:

| コマンド                    | アクション                                           |
|:--------------------------|:-------------------------------------------------|
| `pnpm install`            | プロジェクトの依存関係をインストール                    |
| `pnpm add sharp`          | 画像処理用のSharpを追加                          |
| `pnpm dev`                | `localhost:4321` で開発サーバーを起動              |
| `pnpm build`              | `./dist/` に本番サイトをビルド                      |
| `pnpm preview`            | デプロイ前のビルド内容をローカルでプレビュー            |
| `pnpm new-post <filename>`| `src/content/posts/` に新しい投稿を作成            |
| `pnpm astro ...`          | `astro add`、`astro check` などのCLIコマンドを実行 |
| `pnpm astro --help`       | Astro CLIのヘルプを表示                            |


## 🤝 貢献

貢献は歓迎します！以下の方法で協力できます：

1. リポジトリをフォークします
2. 機能ブランチを作成します：`git checkout -b feature/your-feature`
3. 変更を加えてコミットします：`git commit -m 'Add some feature'`
4. ブランチにプッシュします：`git push origin feature/your-feature`
5. プルリクエストを送信します

コードは既存のスタイルに従い、必要に応じて適切なテストを含めてください。

## 🙏 クレジット

このプロジェクト「banije」は、[Fuwari](https://github.com/saicaca/fuwari)の優れた作品に触発されました。彼らの静的サイト生成におけるAstroの使用と、テンプレート作成における細部へのこだわりには感銘を受けました。

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細については[LICENSE](LICENSE)ファイルを参照してください。
