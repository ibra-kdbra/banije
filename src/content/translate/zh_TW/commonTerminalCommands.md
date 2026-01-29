---
title: "常用終端命令"
published: 2022-09-20
description: "了解關鍵的終端命令及其用法。"
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false 
lang: "zh_TW"
originalSlug: "commonTerminalCommands"

---

## 概述

本指南提供了基本終端命令的完整列表，按導航、文件管理等類別進行組織。 非常適合初學者和高級用戶。 

## 按鍵命令和導航

:::tip
鍵盤快捷鍵可以節省導航和使用終端的時間。
:::-`Up Arrow`：將顯示您的最後一個命令
-`Down Arrow`：將顯示您的下一個命令
-`Tab`：將自動完成您的命令
-`Ctrl + L`：將清除屏幕
-`Ctrl + C`：將取消命令
-`Ctrl + R`：將搜索命令
-`Ctrl + D`：將退出終端

## 手動命令

:::note
[Using `man` Command]
“man”命令顯示 Linux 和 MacOS 上的命令手冊。 在 Git Bash 上使用 `--help` 來獲得類似的功能。
:::

```bash
man ls
```

```bash
ls --help
```

:::important
[Identify Current User]
“whoami”命令顯示當前登錄的用戶。
:::

```bash
whoami
```

:::tip
[Get Current Date & Time]
“date”命令顯示當前日期和時間。
:::

```bash
date
```

:::note
[Essential Navigation Commands]
文件系統導航是終端使用的基礎。
:::|命令 |描述 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
|密碼 |列出工作目錄的路徑 |
| LS |列出目錄內容 |
| ls -a |列出包含隱藏文件的內容（以點開頭的文件）|
| ls -l |列出包含權限在內的更多信息的內容（長列表）|
| ls -r |列表內容倒序 |
|光盤|將目錄更改為 home |
| cd [目錄名] |將目錄更改為特定目錄 |
|光盤〜|更改主目錄|
|光盤.. |更改到父目錄 |
|光盤-|更改到上一個目錄 |
| find [dirtosearch] -name [文件名] |查找程序的位置 |

組合標誌，例如`ls -la`查看詳細和隱藏文件。 

## 打開文件夾或文件

:::note
[Open Directories, Files, or URLs]
不同操作系統打開文件、文件夾或 URL 的命令有所不同。
:::- 蘋果：`open [dirname]`- 窗戶：`start [dirname]`- Linux：`xdg-open [dirname]`

```bash
open https://example.com
```

:::important
[File & Directory Management Commands]
了解創建、刪除、移動和重命名文件和目錄。
:::|命令 |描述 |
| ------------------------ | | --------------------------------------------------- |
| mkdir [目錄名] |製作目錄 |
|觸摸[文件名] |創建文件|
| rm [文件名] |刪除文件 |
| rm -i [文件名] |刪除文件並確認 |
| rm -r [目錄名] |刪除目錄|
| rm -rf [目錄名] |強制刪除目錄 |
| rm ./\* |刪除當前文件夾中的所有內容 |
| cp [文件名] [目錄名] |複製文件|
| mv [文件名] [目錄名] |移動文件|
| mv [文件名] [文件名] |重命名文件 |

創建嵌套目錄：
```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

```bash
cd test2 && mkdir test3
```

:::tip
[Redirect Output]
將命令輸出重定向到文件中。
:::

```bash
> [filename]
```

＃＃ 這`cat`命令

:::note
[Concatenate Files]
`cat` 顯示或創建文件並將它們組合起來。
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
使用“less”滾動文件。
:::

```bash
less [filename]
```

＃＃ 這`echo`命令

:::important
[Display Text or Write to Files]
將文本回顯到終端或文件。
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

:::note
[Edit Text Files]
`nano` 是一個用戶友好的文本編輯器。
:::

```bash
nano [filename]
```

＃＃ 這`head`和`tail`命令

:::tip
[View File Parts]
顯示文件的開頭（“head”）或結尾（“tail”）。
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
按名稱、模式或屬性搜索文件。
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
將一個命令的輸出通過管道傳輸到另一個命令。
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

:::note
[Create Shortcuts]
創建文件的符號鏈接。
:::

```bash
ln -s [filename] [symlinkname]
```

```bash
rm [symlinkname]
```

:::important
[Manage Archives]
使用“tar”創建並提取 tarball。
:::|命令 |描述 |
| ----------------------------------- | -------------------------- |
| tar czvf [目錄名].tar.gz [目錄名] | tar czvf [目錄名].tar.gz [目錄名] |創建壓縮包 |
| tar tzvf [目錄名] |查看 tarball 內容 |
| tar xzvf [目錄名].tar.gz |提取壓縮包 |

＃＃ 這`history`命令

:::note
[Command History]
查看並執行過去的命令。
:::

```bash
history
!100
```

## 提供所有命令的指南

:::important
:::我確實添加了此中已知的所有終端命令[TerCli](https://tercli.netlify.app/)
