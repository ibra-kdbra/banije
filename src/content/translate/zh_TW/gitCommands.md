---
title: "Git 命令及示例"
published: 2024-02-18
description: "通過示例了解基本的 Git 命令，以簡化您的工作流程。"
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "zh_TW"
originalSlug: "gitCommands"

---

## 1.Git 合併

Git merge 允許您將兩個分支的工作合併為一個。
```sh
git merge <branch>
```

:::tip
使用“git merge”將一個分支的更改集成到另一個分支（通常是主分支）。
:::---

## 2.Git 差異

Git diff 顯示 Git 存儲庫中任意兩次提交或文件之間的差異。
```sh
git diff <source branch> <target branch>
```

## 3.Git 日誌

的`git log`命令列出項目歷史記錄中的所有提交。
```sh
git log
```

:::note
使用“--oneline”或“--graph”等選項來簡化或可視化日誌。
:::---

## 4.Git 展示

Git show 顯示特定 Git 對象（例如提交、標籤或樹）的詳細信息。
```sh
git show <commit>
```

## 5.Git Grep

Git grep 在代碼庫中搜索特定字符串或模式的出現。
```sh
git grep -n <pattern>
```

## 6.Git 分支

在存儲庫中創建或列出分支。
```sh
git branch
```

:::tip
使用 `gitbranch -d <branch>` 刪除分支。
:::---

## 7.Git 推送

將本地提交推送到遠程存儲庫。
```sh
git push -u <remote> <branch>
```

## 8.Git 存儲

暫時保存更改而不提交它們。
```sh
git stash
```

:::important
請記住運行“git stash pop”以重新應用隱藏的更改。
:::---

## 9.Git 變基

通過在基礎分支之上應用提交來更新分支。
```sh
git rebase <base>
```

:::caution
Ensure you’re aware of the difference between `rebase` and `merge` to avoid unwanted history rewrites.
:::---

## 10.Git 配置

設置或獲取全局或特定於存儲庫的選項。
```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

<iframe寬度=“100%”heigh t=“468”sr c=“https://www.youtube.com/embed/mJ-qvsxPHpY"title=“Git 傻瓜教程”frameborder =“0”allow =“加速度計；自動播放；剪貼板寫入；加密媒體；陀螺儀；畫中畫；網絡共享”allowfullscreenallowfullscreen></iframe>

## 11.Git 克隆

將現有存儲庫克隆到本地計算機。
```sh
git clone <repository>
```

## 12.Git 初始化

創建一個新的 Git 存儲庫。
```sh
git init
```

## 13.Git 簽出

在分支之間切換或恢復文件。
```sh
git checkout <branch>
```

## 14.Git 重置

將當前 HEAD 重置為特定提交。
```sh
git reset <commit>
```

## 15.Git 標籤

管理存儲庫中的標籤。
```sh
git tag
```

:::tip
使用 `git tag -a <tag>` 創建帶註釋的標籤。
:::---

## 16.Git 存檔

從特定提交或分支創建文件存檔。
```sh
git archive
```

## 17.Git 提交

記錄對存儲庫的更改。
```sh
git commit -m "Commit message"
```

## 18.Git 狀態

顯示工作樹狀態。
```sh
git status
```

## 19.Git RM

從工作樹和索引中刪除文件。
```sh
git rm <file>
```

## 20.Git 遠程

管理一組跟踪的存儲庫。
```sh
git remote add <name> <url>
```

## 21.Git Instaweb

啟動本地基於 Web 的 Git 存儲庫查看器。
```sh
git instaweb
```

## 22.Git 註釋

向提交添加額外信息。
```sh
git notes add <message>
```

## 23.Git 二等分

通過找到有問題的提交來調試您的存儲庫。
```sh
git bisect
```

## 24.Git 子模塊

將其他存儲庫作為子模塊導入。
```sh
git submodule add <repository>
```

## 25.Git 錯誤報告

使用系統和存儲庫信息編寫錯誤報告。
```sh
git bugreport
```

## 26.Git Fsck

驗證存儲庫的完整性並恢復無法訪問的對象。
```sh
git fsck
```

## 27.Git Stripspace

從存儲庫中刪除尾隨空格。
```sh
git stripspace
```

## 28.Git 掛鉤

自動運行腳本以響應 Git 生命週期事件。
```sh
git hooks
```

## 29.Git 責備

顯示誰最後修改了文件中的一行。
```sh
git blame <file>
```

## 30.Git LFS（大文件存儲）

管理 Git 存儲庫中的大文件。
```sh
git lfs
```

## 31.Git 垃圾收集

通過清理不必要的文件來優化您的存儲庫。
```sh
git gc
```

## 32.Git 描述

根據最新標籤為提交生成一個可讀的名稱。
```sh
git describe
```

## 33.Git 引用日誌

查看對存儲庫執行的所有 Git 操作。
```sh
git reflog
```

## 34.Git 日誌（增強）

使用附加選項可視化提交日誌。
```sh
git log --graph --oneline
```

## 35.Git Cherry Pick

將另一個分支的提交應用到當前分支。
```sh
git cherry-pick <commit>
```

## 36.Git 切換

在分支之間快速切換。
```sh
git switch <branch>
```

:::note
`git switch` 是用於分支切換的 `git checkout` 的現代替代方案。
:::---

<iframe寬度=“100%”heigh t=“468”sr c=“https://www.youtube.com/embed/K6Q31YkorUE"title=“YouTube視頻播放器”frameborder =“0”
允許=“加速度計；自動播放；剪貼板寫入；加密媒體；陀螺儀；畫中畫；網絡共享”allowfullscreenallowfullscreen></iframe>