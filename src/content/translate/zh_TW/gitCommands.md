---
originalSlug: "gitCommands"
lang: "zh_TW"
title: Git 指令範例大全
published: 2024-02-18
description: '學習必備的 Git 指令與範例，優化您的開發工作流程。'
image: ''
tags: [Git, Commands, Examples]
category: "Developer Workflow"
draft: false
---

## 1. Git Merge

Git merge 允許您將兩個分支的工作合併為一個。

```sh
git merge <branch>
```

:::tip [提示]
使用 `git merge` 將一個分支的變更整合到另一個分支（通常是主分支）。
:::

---

## 2. Git Diff

Git diff 用於顯示 Git 儲存庫中任意兩個提交（commit）或檔案之間的差異。

```sh
git diff <source branch> <target branch>
```

---

## 3. Git Log

`git log` 指令會列出專案歷史紀錄中的所有提交。

```sh
git log
```

:::note [備註]
使用 `--oneline` 或 `--graph` 等選項來簡化或視覺化日誌。
:::

---

## 4. Git Show

Git show 會顯示特定 Git 物件（例如 commit、tag 或 tree）的詳細資訊。

```sh
git show <commit>
```

---

## 5. Git Grep

Git grep 會在您的程式碼庫中搜尋特定字串或模式的出現位置。

```sh
git grep -n <pattern>
```

---

## 6. Git Branch

在您的儲存庫中建立或列出分支。

```sh
git branch
```

:::tip [提示]
使用 `git branch -d <branch>` 來刪除分支。
:::

---

## 7. Git Push

將本機提交推送到遠端儲存庫。

```sh
git push -u <remote> <branch>
```

---

## 8. Git Stash

暫時儲存變更而不進行提交。

```sh
git stash
```

:::important [重要]
記得執行 `git stash pop` 來套回您暫存的變更。
:::

---

## 9. Git Rebase

透過在基礎分支之上應用提交來更新當前分支。

```sh
git rebase <base>
```

:::caution [警告]
請務必了解 `rebase` 與 `merge` 之間的差異，以避免不必要的歷史紀錄重寫。
:::

---

## 10. Git Config

設定或獲取全域或儲存庫專屬的選項。

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/mJ-qvsxPHpY" title="Git Tutorial For Dummies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>

## 11. Git Clone

將現有的儲存庫複製到您的本機電腦。

```sh
git clone <repository>
```

---

## 12. Git Init

建立一個新的 Git 儲存庫。

```sh
git init
```

---

## 13. Git Checkout

在不同分支之間切換或還原檔案。

```sh
git checkout <branch>
```

---

## 14. Git Reset

將當前的 HEAD 重置到特定的提交。

```sh
git reset <commit>
```

---

## 15. Git Tag

管理儲存庫中的標籤。

```sh
git tag
```

:::tip [提示]
使用 `git tag -a <tag>` 來建立註釋標籤。
:::

---

## 16. Git Archive

從特定的提交或分支建立檔案封存檔。

```sh
git archive
```

---

## 17. Git Commit

記錄對儲存庫所做的變更。

```sh
git commit -m "Commit message"
```

---

## 18. Git Status

顯示工作樹的狀態。

```sh
git status
```

---

## 19. Git RM

從工作樹和索引中移除檔案。

```sh
git rm <file>
```

---

## 20. Git Remote

管理一組追蹤的儲存庫。

```sh
git remote add <name> <url>
```

---

## 21. Git Instaweb

啟動一個基於網頁的本地 Git 儲存庫檢視器。

```sh
git instaweb
```

---

## 22. Git Notes

為提交添加額外的資訊。

```sh
git notes add <message>
```

---

## 23. Git Bisect

透過定位有問題的提交來偵錯您的儲存庫。

```sh
git bisect
```

---

## 24. Git Submodules

將其他儲存庫匯入為子模組。

```sh
git submodule add <repository>
```

---

## 25. Git Bugreport

編譯包含系統與儲存庫資訊的錯誤報告。

```sh
git bugreport
```

---

## 26. Git Fsck

驗證儲存庫的完整性並復原無法存取的物件。

```sh
git fsck
```

---

## 27. Git Stripspace

移除儲存庫中行尾的空白字元。

```sh
git stripspace
```

---

## 28. Git Hooks

針對 Git 生命週期事件自動執行指令碼。

```sh
git hooks
```

---

## 29. Git Blame

顯示檔案中每一行最後是由誰修改的。

```sh
git blame <file>
```

---

## 30. Git LFS (Large File Storage)

管理 Git 儲存庫中的大型檔案。

```sh
git lfs
```

---

## 31. Git Garbage Collection

透過清除不必要的檔案來最佳化您的儲存庫。

```sh
git gc
```

---

## 32. Git Describe

根據最近的標籤產生提交的可讀名稱。

```sh
git describe
```

---

## 33. Git Reflog

檢視儲存庫上執行的所有 Git 操作。

```sh
git reflog
```

---

## 34. Git Log (Enhanced)

使用額外選項來視覺化提交日誌。

```sh
git log --graph --oneline
```

---

## 35. Git Cherry Pick

將來自其他分支的提交套用到您的當前分支。

```sh
git cherry-pick <commit>
```

---

## 36. Git Switch

快速切換分支。

```sh
git switch <branch>
```

:::note [備註]
`git switch` 是 `git checkout` 在分支切換功能上的現代化替代方案。
:::

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/K6Q31YkorUE" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>
