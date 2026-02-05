---
title: "Git コマンドと例"
published: 2024-02-18
description: "ワークフローを合理化するために、例を使用して重要な Git コマンドについて学びます。"
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "ja"
originalSlug: "gitCommands"

---

## 1. Git マージ

 Git merge を使用すると、2 つのブランチの作業を 1 つに結合できます。

```sh
git merge <branch>
```

:::tip
「git merge」を使用して、あるブランチから別のブランチ (通常はメイン ブランチ) に変更を統合します。
:::---

## 2. Git の差分

 Git diff は、Git リポジトリ内の 2 つのコミットまたはファイル間の違いを示します。

```sh
git diff <source branch> <target branch>
```

## 3. Git ログ

 の`git log`コマンドは、プロジェクト履歴内のすべてのコミットを一覧表示します。

```sh
git log
```

:::note
`--oneline` や `--graph` などのオプションを使用して、ログを簡略化または視覚化します。
:::---

## 4. Git ショー

 Git show は、特定の Git オブジェクト (コミット、タグ、ツリーなど) の詳細を表示します。

```sh
git show <commit>
```

## 5. Git grep

 Git grep は、コードベースで特定の文字列またはパターンの出現を検索します。

```sh
git grep -n <pattern>
```

## 6. Git ブランチ

 リポジトリ内にブランチを作成またはリストします。

```sh
git branch
```

:::tip
ブランチを削除するには、`git Branch -d <branch>` を使用します。
:::---

## 7. Git プッシュ

 ローカルのコミットをリモート リポジトリにプッシュします。

```sh
git push -u <remote> <branch>
```

## 8. Git スタッシュ

 変更をコミットせずに一時的に保存します。

```sh
git stash
```

:::important
忘れずに「git stash Pop」を実行して、隠した変更を再適用してください。
:::

---

## 9. Git リベース

 ベース ブランチの上にコミットを適用してブランチを更新します。

```sh
git rebase <base>
```

:::caution
不要な履歴の書き換えを避けるために、「rebase」と「merge」の違いを必ず認識してください。
:::

---

## 10. Git 構成

 グローバルまたはリポジトリ固有のオプションを設定または取得します。

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

<iframe width="100%" height="468" src="https://www.youtube.com/embed/mJ-qvsxPHpY" title="Git Tutorial For Dummies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>

## 11. Git クローン

 既存のリポジトリのクローンをローカル マシンに作成します。

```sh
git clone <repository>
```

## 12. Git の初期化

 新しい Git リポジトリを作成します。

```sh
git init
```

## 13. Git チェックアウト

 ブランチ間を切り替えるか、ファイルを復元します。

```sh
git checkout <branch>
```

## 14. Git のリセット

 現在の HEAD を特定のコミットにリセットします。

```sh
git reset <commit>
```

## 15. Git タグ

 リポジトリ内のタグを管理します。

```sh
git tag
```

:::tip
注釈付きタグを作成するには、`git tag -a <tag>` を使用します。
:::---

## 16. Git アーカイブ

 特定のコミットまたはブランチからファイルのアーカイブを作成します。

```sh
git archive
```

## 17. Git コミット

 リポジトリへの変更を記録します。

```sh
git commit -m "Commit message"
```

## 18. Git のステータス

 作業ツリーの状態を表示します。

```sh
git status
```

## 19. Git RM

 作業ツリーとインデックスからファイルを削除します。

```sh
git rm <file>
```

## 20. Git リモート

 追跡されたリポジトリのセットを管理します。

```sh
git remote add <name> <url>
```

## 21. Git インスタウェブ

 ローカルの Web ベースの Git リポジトリ ビューアを起動します。

```sh
git instaweb
```

## 22. Git のメモ

 コミットに追加情報を追加します。

```sh
git notes add <message>
```

## 23. Git Bisect

 問題のあるコミットを見つけてリポジトリをデバッグします。

```sh
git bisect
```

## 24. Git サブモジュール

 他のリポジトリをサブモジュールとしてインポートします。

```sh
git submodule add <repository>
```

## 25. Git バグレポート

 システムとリポジトリの情報を含むバグ レポートを作成します。

```sh
git bugreport
```

## 26. Git Fsck

 リポジトリの整合性を確認し、到達不能なオブジェクトを回復します。

```sh
git fsck
```

## 27. Git ストリップスペース

 リポジトリから末尾の空白を削除します。

```sh
git stripspace
```

## 28. Git フック

 Git ライフサイクル イベントに応じてスクリプトを自動的に実行します。

```sh
git hooks
```

## 29. Git のせい

 ファイル内の行を最後に変更した人を表示します。

```sh
git blame <file>
```

## 30. Git LFS (大容量ファイルストレージ)

 Git リポジトリ内の大きなファイルを管理します。

```sh
git lfs
```

## 31. Git ガベージ コレクション

 不要なファイルをクリーンアップしてリポジトリを最適化します。

```sh
git gc
```

## 32. Git の説明

 最新のタグに基づいて、コミットの読みやすい名前を生成します。

```sh
git describe
```

## 33. Git Reflog

 リポジトリ上で実行されたすべての Git アクションを表示します。

```sh
git reflog
```

## 34. Git ログ (拡張)

 追加オプションを使用してコミット ログを視覚化します。

```sh
git log --graph --oneline
```

## 35. Git チェリーピック

 別のブランチから現在のブランチにコミットを適用します。

```sh
git cherry-pick <commit>
```

## 36. Git スイッチ

 ブランチ間を素早く切り替えます。

```sh
git switch <branch>
```

:::note
「git switch」は、ブランチ切り替えのための「git checkout」の最新の代替手段です。
:::---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/K6Q31YkorUE" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>
