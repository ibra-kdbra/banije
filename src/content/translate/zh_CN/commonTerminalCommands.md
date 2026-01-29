---
title: "常用终端命令"
published: 2022-09-20
description: "了解关键的终端命令及其用法。"
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false 
lang: "zh_CN"
originalSlug: "commonTerminalCommands"

---

## 概述

 本指南提供了基本终端命令的完整列表，按导航、文件管理等类别进行组织。 非常适合初学者和高级用户。 

## 按键命令和导航

:::tip
键盘快捷键可以节省导航和使用终端的时间。
:::-`Up Arrow`：将显示您的最后一个命令
 -`Down Arrow`：将显示您的下一个命令
 -`Tab`：将自动完成您的命令
 -`Ctrl + L`：将清除屏幕
 -`Ctrl + C`：将取消命令
 -`Ctrl + R`：将搜索命令
 -`Ctrl + D`：将退出终端

 ## 手动命令

:::note
[Using `man` Command]
“man”命令显示 Linux 和 MacOS 上的命令手册。 在 Git Bash 上使用 `--help` 来获得类似的功能。
:::

```bash
man ls
```

```bash
ls --help
```

:::important
[Identify Current User]
“whoami”命令显示当前登录的用户。
:::

```bash
whoami
```

:::tip
[Get Current Date & Time]
“date”命令显示当前日期和时间。
:::

```bash
date
```

:::note
[Essential Navigation Commands]
文件系统导航是终端使用的基础。
:::| 命令 | 描述 |
 | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
 | 密码 | 列出工作目录的路径 |
 | LS | 列出目录内容 |
 | ls -a | 列出包含隐藏文件的内容（以点开头的文件）|
 | ls -l | 列出包含权限在内的更多信息的内容（长列表）|
 | ls -r | 列表内容倒序 |
 | 光盘| 将目录更改为 home |
 | cd [目录名] | 将目录更改为特定目录 |
 | 光盘〜| 更改主目录 |
 | 光盘.. | 更改到父目录 |
 | 光盘-| 更改到上一个目录 |
 | find [dirtosearch] -name [文件名] | 查找程序的位置 |

 组合标志，例如`ls -la`查看详细和隐藏文件。 

## 打开文件夹或文件

:::note
[Open Directories, Files, or URLs]
不同操作系统打开文件、文件夹或 URL 的命令有所不同。
:::- 苹果：`open [dirname]`- 窗户：`start [dirname]`- Linux：`xdg-open [dirname]`

```bash
open https://example.com
```

:::important
[File & Directory Management Commands]
了解创建、删除、移动和重命名文件和目录。
:::| 命令 | 描述 |
 | ------------------------ | | --------------------------------------------------- |
 | mkdir [目录名] | 制作目录 |
 | 触摸[文件名] | 创建文件|
 | rm [文件名] | 删除文件 |
 | rm -i [文件名] | 删除文件并确认 |
 | rm -r [目录名] | 删除目录|
 | rm -rf [目录名] | 强制删除目录 |
 | rm ./\* | 删除当前文件夹中的所有内容 |
 | cp [文件名] [目录名] | 复制文件|
 | mv [文件名] [目录名] | 移动文件|
 | mv [文件名] [文件名] | 重命名文件 |

 创建嵌套目录：
```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

```bash
cd test2 && mkdir test3
```

:::tip
[Redirect Output]
将命令输出重定向到文件中。
:::

```bash
> [filename]
```

＃＃ 这`cat`命令

:::note
[Concatenate Files]
`cat` 显示或创建文件并将它们组合起来。
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

```bash
cat -n [filename]
```

:::tip
[View File Contents]
使用“less”滚动文件。
:::

```bash
less [filename]
```

＃＃ 这`echo`命令

:::important
[Display Text or Write to Files]
将文本回显到终端或文件。
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

:::note
[Edit Text Files]
`nano` 是一个用户友好的文本编辑器。
:::

```bash
nano [filename]
```

＃＃ 这`head`和`tail`命令

:::tip
[View File Parts]
显示文件的开头（“head”）或结尾（“tail”）。
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

:::note
[Search File Content]
搜索文件中的文本模式。
:::

```bash
grep [searchterm] [filename]
```

:::important
[Locate Files or Directories]
按名称、模式或属性搜索文件。
:::

```bash
find [dirname] -name [filename]
```

```bash
touch file-{001..100}.txt
find . -empty
```

```bash
find . -name "file-*" -delete
```

:::tip
[Redirect Output]
将一个命令的输出通过管道传输到另一个命令。
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

:::note
[Create Shortcuts]
创建文件的符号链接。
:::

```bash
ln -s [filename] [symlinkname]
```

```bash
rm [symlinkname]
```

:::important
[Manage Archives]
使用“tar”创建并提取 tarball。
:::| 命令 | 描述 |
 | ----------------------------------- | -------------------------- |
 | tar czvf [目录名].tar.gz [目录名] | tar czvf [目录名].tar.gz [目录名] | 创建压缩包 |
 | tar tzvf [目录名] | 查看 tarball 内容 |
 | tar xzvf [目录名].tar.gz | 提取压缩包 |

 ＃＃ 这`history`命令

:::note
[Command History]
查看并执行过去的命令。
:::

```bash
history
!100
```

## 提供所有命令的指南

:::important
:::我确实添加了此中已知的所有终端命令[TerCli](https://tercli.netlify.app/)
