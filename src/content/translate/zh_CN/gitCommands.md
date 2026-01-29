---
title: "Git 命令及示例"
published: 2024-02-18
description: "通过示例了解基本的 Git 命令，以简化您的工作流程。"
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "zh_CN"
originalSlug: "gitCommands"

---

## 1.Git 合并

 Git merge 允许您将两个分支的工作合并为一个。
```sh
git merge <branch>
```

:::tip
使用“git merge”将一个分支的更改集成到另一个分支（通常是主分支）。
:::---

 ## 2.Git 差异

 Git diff 显示 Git 存储库中任意两次提交或文件之间的差异。
```sh
git diff <source branch> <target branch>
```

 ## 3.Git 日志

 的`git log`命令列出项目历史记录中的所有提交。
```sh
git log
```

:::note
使用“--oneline”或“--graph”等选项来简化或可视化日志。
:::---

 ## 4.Git 展示

 Git show 显示特定 Git 对象（例如提交、标签或树）的详细信息。
```sh
git show <commit>
```

 ## 5.Git Grep

 Git grep 在代码库中搜索特定字符串或模式的出现。
```sh
git grep -n <pattern>
```

 ## 6.Git 分支

 在存储库中创建或列出分支。
```sh
git branch
```

:::tip
使用 `gitbranch -d <branch>` 删除分支。
:::---

 ## 7.Git 推送

 将本地提交推送到远程存储库。
```sh
git push -u <remote> <branch>
```

 ## 8.Git 存储

 暂时保存更改而不提交它们。
```sh
git stash
```

:::important
请记住运行“git stash pop”以重新应用隐藏的更改。
:::---

 ## 9.Git 变基

 通过在基础分支之上应用提交来更新分支。
```sh
git rebase <base>
```

:::caution
确保您了解“rebase”和“merge”之间的区别，以避免不必要的历史记录重写。
:::---

 ## 10.Git 配置

 设置或获取全局或特定于存储库的选项。
```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

 <iframewidt h=“100%”heigh t=“468”sr c=“https://www.youtube.com/embed/mJ-qvsxPHpY"title=“Git 傻瓜教程”frameborder =“0”allow =“加速度计；自动播放；剪贴板写入；加密媒体；陀螺仪；画中画；网络共享”allowfullscreenallowfullscreen></iframe>

 ## 11.Git 克隆

 将现有存储库克隆到本地计算机。
```sh
git clone <repository>
```

 ## 12.Git 初始化

 创建一个新的 Git 存储库。
```sh
git init
```

 ## 13.Git 签出

 在分支之间切换或恢复文件。
```sh
git checkout <branch>
```

 ## 14.Git 重置

 将当前 HEAD 重置为特定提交。
```sh
git reset <commit>
```

 ## 15.Git 标签

 管理存储库中的标签。
```sh
git tag
```

:::tip
使用 `git tag -a <tag>` 创建带注释的标签。
:::---

 ## 16.Git 存档

 从特定提交或分支创建文件存档。
```sh
git archive
```

 ## 17.Git 提交

 记录对存储库的更改。
```sh
git commit -m "Commit message"
```

 ## 18.Git 状态

 显示工作树状态。
```sh
git status
```

 ## 19.Git RM

 从工作树和索引中删除文件。
```sh
git rm <file>
```

 ## 20.Git 远程

 管理一组跟踪的存储库。
```sh
git remote add <name> <url>
```

 ## 21.Git Instaweb

 启动本地基于 Web 的 Git 存储库查看器。
```sh
git instaweb
```

 ## 22.Git 注释

 向提交添加额外信息。
```sh
git notes add <message>
```

 ## 23.Git 二等分

 通过找到有问题的提交来调试您的存储库。
```sh
git bisect
```

 ## 24.Git 子模块

 将其他存储库作为子模块导入。
```sh
git submodule add <repository>
```

 ## 25.Git 错误报告

 使用系统和存储库信息编写错误报告。
```sh
git bugreport
```

 ## 26.Git Fsck

 验证存储库的完整性并恢复无法访问的对象。
```sh
git fsck
```

 ## 27.Git Stripspace

 从存储库中删除尾随空格。
```sh
git stripspace
```

 ## 28.Git 挂钩

 自动运行脚本以响应 Git 生命周期事件。
```sh
git hooks
```

 ## 29.Git 责备

 显示谁最后修改了文件中的一行。
```sh
git blame <file>
```

 ## 30.Git LFS（大文件存储）

 管理 Git 存储库中的大文件。
```sh
git lfs
```

 ## 31.Git 垃圾收集

 通过清理不必要的文件来优化您的存储库。
```sh
git gc
```

 ## 32.Git 描述

 根据最新标签为提交生成一个可读的名称。
```sh
git describe
```

 ## 33.Git 引用日志

 查看对存储库执行的所有 Git 操作。
```sh
git reflog
```

 ## 34.Git 日志（增强）

 使用附加选项可视化提交日志。
```sh
git log --graph --oneline
```

 ## 35.Git Cherry Pick

 将另一个分支的提交应用到当前分支。
```sh
git cherry-pick <commit>
```

 ## 36.Git 切换

 在分支之间快速切换。
```sh
git switch <branch>
```

:::note
`git switch` 是用于分支切换的 `git checkout` 的现代替代方案。
:::---

 <iframewidt h=“100%”heigh t=“468”sr c=“https://www.youtube.com/embed/K6Q31YkorUE"title=“YouTube视频播放器”frameborder =“0”
 allo w=“加速度计；自动播放；剪贴板写入；加密媒体；陀螺仪；画中画；网络共享”allowfullscreenallowfullscreen></iframe>