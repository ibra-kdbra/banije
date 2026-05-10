# ⛓️‍💥 Banije (日本語版)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Banije** は、長年にわたって蓄積された、複数の技術領域にわたる知識を記録するための、個人的な学習ダイアリーおよび集約されたナレッジベースです。このプロジェクトは、探求への情熱を反映しており、エンジニアリングの洞察を文書化し、洗練させ、共有するための**生きたプラットフォーム**として機能します。

---

## 🔍 関心領域

コンテンツは、以下の主要な技術ピラーに基づいて構成されています。
- 💻 **Computer Science**: 基礎理論とデータ構造。
- 🛠️ **Software Engineering**: デザインパターン、リファクタリング、クリーンコード。
- 🐚 **Unix Shell**: 環境の自動化とシェルスクリプト。
- 🔩 **Hardware Development**: 低レイヤーシステムとハードウェアの相互作用。
- 📐 **Advanced Mathematics**: アルゴリズムと数学的論理。
- 🧠 **Artificial Intelligence**: LLM、エージェントワークフロー、および倫理的AI。

---

## 🏗️ アーキテクチャと技術スタック

本プロジェクトは、速度、SEO、およびプレミアムな開発者体験（DX）を最適化するように設計されています。
- **フレームワーク**: [Astro 5](https://astro.build) (静的サイト生成 - SSG)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com) + [Stylus](https://stylus-lang.com/)
- **コンポーネント**: [Svelte 5](https://svelte.dev) (Runesによるインタラクティブ性)
- **検索エンジン**: [Pagefind](https://pagefind.app/) (分散型静的検索)
- **タイポグラフィ**: コードの視認性を高めるための [JetBrains Mono](https://www.jetbrains.com/lp/mono/) を採用。

---

## ✨ 特徴

- [x] **パフォーマンス**: Astro 5 による瞬時の静的ページ読み込み。
- [x] **モダンなUI**: Svelte 5 によるスムーズなアニメーションとページ遷移。
- [x] **テーマ**: レスポンシブなライト/ダークモードに対応。
- [x] **カスタマイズ**: テーマカラーやバナーを簡単に変更可能。
- [x] **検索**: 高速な分散型静的検索を統合。
- [x] **多言語翻訳**: 自動化された多言語サポート。

---

## 📋 前提条件

開始する前に、以下のツールがインストールされていることを確認してください。
- **Node.js** (バージョン 18 以上)
- **pnpm** パッケージマネージャー
- **Git** (バージョン管理用)

pnpm がインストールされていない場合は、グローバルにインストールしてください。
```bash
npm install -g pnpm
```

---

## 🚀 使い方

1. **リポジトリをクローンする**:
   ```bash
   git clone https://github.com/ibra-kdbra/banije.git
   cd banije
   ```

2. **依存関係のインストール**:
   ```bash
   pnpm install
   pnpm add sharp # Astroの画像処理に必要
   ```

3. **ブログのカスタマイズ**:
   `src/config.ts` を編集して、ブログの設定を自分好みに変更します。

4. **新しい記事を作成する**:
   ```bash
   pnpm new-post <filename>
   ```
   これにより、`src/content/posts/` に編集用の新しいファイルが作成されます。

5. **開発サーバーを起動する**:
   ```bash
   pnpm dev
   ```
   `http://localhost:4321` にアクセスして、変更をリアルタイムで確認できます。

6. **ビルドとデプロイ**:
   本番用サイトを `./dist/` ディレクトリにビルドします。
   ```bash
   pnpm build
   ```
   Vercel、Netlify、GitHub Pages へのデプロイについては、[Astroのガイド](https://docs.astro.build/en/guides/deploy/)を参照してください。

---

## ⚙️ フロントマター仕様

`src/content/posts/` 内の各記事は YAML フロントマターを使用します。

```yaml
---
title: "記事のタイトル"                # (必須)
published: YYYY-MM-DD              # (必須)
description: "SEO用の要約"             # (必須)
image: "/images/posts/cover.png"   # (任意) カバー画像のパス
tags: [Tag1, Tag2, Tag3]           # (任意) 最大3つ推奨
category: "Architecture"           # (任意) 主要カテゴリ
draft: false                       # (任意) デフォルトは false
---
```

**注意点:**
- `title`、`published`、`description` はビルドを通すために必須です。
- 画像は `public/images/posts/` ディレクトリ、または記事の相対パスに配置してください。
- タグとカテゴリにより、動的なフィルタリングと検索が可能になります。

---

## 🧞 全コマンドリスト

| コマンド | アクション |
| :--- | :--- |
| `pnpm install` | プロジェクトの依存関係をインストール |
| `pnpm add sharp` | 画像処理用の Sharp を追加 |
| `pnpm dev` | `localhost:4321` でローカル開発サーバーを起動 |
| `pnpm build` | 本番サイトのビルドと検索インデックスの生成 |
| `pnpm preview` | デプロイ前にビルドをローカルでプレビュー |
| `pnpm new-post` | `src/content/posts/` に新しい記事を作成 |
| `pnpm translate` | LLMを活用した多言語翻訳の実行 |
| `pnpm images:optimize`| コンテンツディレクトリ内の画像を最適化 |
| `pnpm lint` | Biome を使用したコード品質チェック |
| `pnpm format` | ソースコードの自動フォーマット |
| `pnpm type-check` | TypeScript の型チェックを実行 |

---

## 🛠️ 翻訳ワークフロー (無料版)

本プロジェクトには、`google-translate-api-x` とカスタムスクリプトに基づいた無料の翻訳パイプラインが含まれています。

**主な機能:**
- **構造の維持**: Markdownのフェンス、リンク、警告（Admonitions）、Svelte埋め込みを保護。
- **技術用語集**: `scripts/translation-glossary.json` を使用して、技術用語の誤訳を防止。
- **キャッシュ**: コンテンツハッシュを使用して、変更のないファイルの再翻訳をスキップ。
- **バリデーション**: 翻訳された出力がフロントマターの形式に一致することを確認。

**便利なコマンド:**
- `pnpm translate -- --lang=tr --skip-existing`: トルコ語のみを翻訳し、既存ファイルをスキップ。
- `pnpm translate -- --post=gitCommands --lang=ja`: 特定の記事のみを日本語に翻訳。
- `pnpm translate:fix`: 翻訳時によく発生するアーティファクトを修正。

---

## 🤝 貢献について

コントリビューションを歓迎します！
1. リポジトリをフォークします。
2. フィーチャーブランチを作成します: `git checkout -b feature/your-feature`
3. 変更をコミットします: `git commit -m 'Add some feature'`
4. ブランチをプッシュします: `git push origin feature/your-feature`
5. プルリクエストを送信します。

---

## 🙏 クレジット

クリーンな Astro の基盤とミニマルなデザイン哲学を提供している [Fuwari](https://github.com/saicaca/fuwari) にインスパイアされました。

## 📄 ライセンス

MIT ライセンス。詳細は [LICENSE](LICENSE) を参照してください。
