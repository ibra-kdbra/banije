---
originalSlug: "gitCommands"
lang: "zh_CN"
title: Git 命令示例
published: 2024-02-18
description: '通过示例学习 essential Git 命令，以简化您的工作流程。'
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
---

## 1. Git Merge

Git merge 允许您将两个分支的工作合并为一个。

```sh
git merge <branch>
```

:::tip[使用 git merge 将一个分支的更改集成到另一个分支中，通常是主分支。]
:::

---

## 2. Git Diff

Git diff 显示 Git 仓库中任意两个提交或文件之间的差异。

```sh
git diff <source branch> <target branch>
```

---

## 3. Git Log

`git log` 命令列出项目历史中的所有提交。

```sh
git log
```

:::note[使用 --oneline 或 --graph 等选项来简化或可视化日志。]
:::

---

## 4. Git Show

Git show 显示特定 Git 对象（例如，提交、标签或树）的详细信息。

```sh
git show <commit>
```

---

## 5. Git Grep

Git grep 在您的代码库中搜索特定字符串或模式的出现。

```sh
git grep -n <pattern>
```

---

## 6. Git Branch

在仓库中创建或列出分支。

```sh
git branch
```

:::tip[使用 git branch -d <branch> 来删除分支。]
:::

---

## 7. Git Push

将本地提交推送到远程仓库。

```sh
git push -u <remote> <branch>
```

---

## 8. Git Stash

临时保存更改而不提交它们。

```sh
git stash
```

:::important[请记住运行 git stash pop 以重新应用您暂存的更改。]
:::

---

## 9. Git Rebase

通过将提交应用到基础分支之上来更新分支。

```sh
git rebase <base>
```

:::caution[请确保您了解 rebase 和 merge 之间的区别，以避免不必要的历史重写。]
:::

---

## 10. Git Config

设置或获取全局或仓库特定的选项。

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/mJ-qvsxPHpY" title="Git Tutorial For Dummies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>

## 11. Git Clone

将现有仓库克隆到您的本地机器。

```sh
git clone <repository>
```

---

## 12. Git Init

创建一个新的 Git 仓库。

```sh
git init
```

---

## 13. Git Checkout

在分支之间切换或恢复文件。

```sh
git checkout <branch>
```

---

## 14. Git Reset

将当前的 HEAD 重置到特定的提交。

```sh
git reset <commit>
```

---

## 15. Git Tag

管理仓库中的标签。

```sh
git tag
```

:::tip[使用 git tag -a <tag> 来创建一个带注释的标签。]
:::

---

## 16. Git Archive

从特定提交或分支创建文件存档。

```sh
git archive
```

---

## 17. Git Commit

记录对仓库的更改。

```sh
git commit -m "Commit message"
```

---

## 18. Git Status

显示工作树状态。

```sh
git status
```

---

## 19. Git RM

从工作树和索引中删除文件。

```sh
git rm <file>
```

---

## 20. Git Remote

管理一组跟踪的仓库。

```sh
git remote add <name> <url>
```

---

## 21. Git Instaweb

启动一个本地基于网络的 Git 仓库查看器。

```sh
git instaweb
```

---

## 22. Git Notes

向提交添加额外信息。

```sh
git notes add <message>
```

---

## 23. Git Bisect

通过定位有问题的提交来调试您的仓库。

```sh
git bisect
```

---

## 24. Git Submodules

将其他仓库作为子模块导入。

```sh
git submodule add <repository>
```

---

## 25. Git Bugreport

编译包含系统和仓库信息的 bug 报告。

```sh
git bugreport
```

---

## 26. Git Fsck

验证仓库的完整性并恢复不可达对象。

```sh
git fsck
```

---

## 27. Git Stripspace

从仓库中删除尾随空格。

```sh
git stripspace
```

---

## 28. Git Hooks

在 Git 生命周期事件发生时自动运行脚本。

```sh
git hooks
```

---

## 29. Git Blame

显示文件中某行最后由谁修改。

```sh
git blame <file>
```

---

## 30. Git LFS (Large File Storage)

在 Git 仓库中管理大文件。

```sh
git lfs
```

---

## 31. Git Garbage Collection

通过清理不必要的文件来优化您的仓库。

```sh
git gc
```

---

## 32. Git Describe

根据最新标签为提交生成一个可读的名称。

```sh
git describe
```

---

## 33. Git Reflog

查看仓库上执行的所有 Git 操作。

```sh
git reflog
```

---

## 34. Git Log (Enhanced)

使用附加选项可视化提交日志。

```sh
git log --graph --oneline
```

---

## 35. Git Cherry Pick

将另一个分支的提交应用到当前分支。

```sh
git cherry-pick <commit>
```

---

## 36. Git Switch

快速切换分支。

```sh
git switch <branch>
```

:::note[git switch 是 git checkout 在分支切换方面的一个现代替代方案。]
:::

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/K6Q31YkorUE" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>
