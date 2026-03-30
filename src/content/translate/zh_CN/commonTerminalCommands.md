---
originalSlug: "commonTerminalCommands"
lang: "zh_CN"
title: 常用终端命令
published: 2022-09-20
description: '学习关键的终端命令及其用法。'
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false
---


## 概述

本指南提供了全面的常用终端命令列表，按导航、文件管理等类别进行分类。非常适合初学者和进阶用户。

## 关键命令与导航

:::tip[快捷键]
键盘快捷键可以节省在终端中导航和操作的时间。
:::

- `Up Arrow`: 显示上一条命令
- `Down Arrow`: 显示下一条命令
- `Tab`: 自动补全命令
- `Ctrl + L`: 清屏
- `Ctrl + C`: 取消当前命令
- `Ctrl + R`: 搜索历史命令
- `Ctrl + D`: 退出终端

## 手册命令

:::note[使用 `man` 命令]
`man` 命令用于显示 Linux 和 MacOS 上的命令手册。在 Git Bash 上可使用 `--help` 实现类似功能。
:::

```bash
man ls
```

在 Git Bash 或 Windows 上：

```bash
ls --help
```

## `whoami` 命令

:::important[识别当前用户]
`whoami` 命令显示当前登录的用户。
:::

```bash
whoami
```

## `date` 命令

:::tip[获取当前日期和时间]
`date` 命令用于显示当前的日期和时间。
:::

```bash
date
```

## 文件系统导航

:::note[基本导航命令]
文件系统导航是终端使用的基础。
:::

| 命令 | 描述 |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| pwd | 列出当前工作目录的路径 |
| ls | 列出目录内容 |
| ls -a | 列出所有内容，包括隐藏文件（以点开头的文件） |
| ls -l | 以长格式列出内容，包含详细信息（权限等） |
| ls -r | 反向排序列表内容 |
| cd | 切换到主目录 |
| cd [dirname] | 切换到指定目录 |
| cd ~ | 切换到主目录 |
| cd .. | 切换到父目录 |
| cd - | 切换到上一个目录 |
| find [dirtosearch] -name [filename] | 查找程序的路径 |

可以合并标志位，例如使用 `ls -la` 查看包含隐藏文件的详细列表。

## 打开文件夹或文件

:::note[打开目录、文件或 URL]
不同操作系统打开文件、文件夹或 URL 的命令有所不同。
:::

- Mac: `open [dirname]`
- Windows: `start [dirname]`
- Linux: `xdg-open [dirname]`

```bash
open https://example.com
```

## 修改文件与目录

:::important[文件与目录管理命令]
学习创建、删除、移动和重命名文件及目录。
:::

| 命令 | 描述 |
| --------------------------- | --------------------------------------------------- |
| mkdir [dirname] | 创建目录 |
| touch [filename] | 创建文件 |
| rm [filename] | 删除文件 |
| rm -i [filename] | 删除文件并进行确认 |
| rm -r [dirname] | 删除目录 |
| rm -rf [dirname] | 强制删除目录 |
| rm ./\* | 删除当前文件夹中的所有内容 |
| cp [filename] [dirname] | 复制文件 |
| mv [filename] [dirname] | 移动文件 |
| mv [filename] [filename] | 重命名文件 |

创建嵌套目录：

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

运行多条命令：

```bash
cd test2 && mkdir test3
```

## 右尖括号 `>`

:::tip[重定向输出]
将命令输出重定向到文件中。
:::

```bash
> [filename]
```

使用 `Ctrl+D` 退出。

## `cat` 命令

:::note[连接文件]
`cat` 用于显示、创建或合并文件内容。
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

显示行号：

```bash
cat -n [filename]
```

## `less` 命令

:::tip[查看文件内容]
使用 `less` 翻阅文件。
:::

```bash
less [filename]
```

使用 `q` 退出。

## `echo` 命令

:::important[显示文本或写入文件]
将文本输出到终端或写入文件。
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

## `nano` 命令

:::note[编辑文本文件]
`nano` 是一个用户友好的文本编辑器。
:::

```bash
nano [filename]
```

使用 `Ctrl+X` 退出。使用 `Y` 保存。

## `head` 和 `tail` 命令

:::tip[查看文件片段]
显示文件的开头 (`head`) 或结尾 (`tail`) 部分。
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

## `grep` 命令

:::note[搜索文件内容]
在文件中搜索文本模式。
:::

```bash
grep [searchterm] [filename]
```

## `find` 命令

:::important[定位文件或目录]
按名称、模式或属性搜索文件。
:::

```bash
find [dirname] -name [filename]
```

创建测试文件：

```bash
touch file-{001..100}.txt
find . -empty
```

删除文件：

```bash
find . -name "file-*" -delete
```

## 管道操作

:::tip[重定向输出]
将一条命令的输出传递给另一条命令。
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

## 创建符号链接

:::note[创建快捷方式]
创建指向文件的符号链接。
:::

```bash
ln -s [filename] [symlinkname]
```

删除链接：

```bash
rm [symlinkname]
```

## 文件压缩

:::important[管理归档]
使用 `tar` 创建和解压压缩包。
:::

| 命令 | 描述 |
| ----------------------------------- | -------------------------- |
| tar czvf [dirname].tar.gz [dirname] | 创建压缩包 |
| tar tzvf [dirname] | 查看压缩包内容 |
| tar xzvf [dirname].tar.gz | 解压压缩包 |

## `history` 命令

:::note[命令历史]
查看并执行过去的命令。
:::

```bash
history
!100
```

执行历史记录中的第 100 条命令。

## 命令综合指南

:::important
我添加了所有已知的终端命令，可以在此查看：[TerCli](https://tercli.netlify.app/)
:::
