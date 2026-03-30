---
originalSlug: "commonTerminalCommands"
lang: "zh_TW"
title: 常見終端機指令
published: 2022-09-20
description: '學習關鍵的終端機指令及其用法。'
tags: [終端機, 指令, Linux, MacOS, Windows, Shell]
category: 指南
draft: false
---

## 總覽

本指南提供一份包含基本終端機指令的全面列表，並依據類別（例如導覽、檔案管理等）進行組織。非常適合初學者和進階使用者。

## 關鍵指令與導覽

:::tip
鍵盤快捷鍵可以在導覽和使用終端機時節省時間。
:::

- `向上箭頭`: 顯示您最後執行的指令
- `向下箭頭`: 顯示您下一個執行的指令
- `Tab`: 自動完成您的指令
- `Ctrl + L`: 清除螢幕
- `Ctrl + C`: 取消指令
- `Ctrl + R`: 搜尋指令
- `Ctrl + D`: 結束終端機

## 手冊指令

:::note[使用 `man` 指令]
`man` 指令會顯示 Linux 和 MacOS 上指令的手冊。在 Git Bash 上，使用 `--help` 可獲得類似功能。
:::

```bash
man ls
```

在 Git Bash 或 Windows 上：

```bash
ls --help
```

## `whoami` 指令

:::important[識別目前使用者]
`whoami` 指令會顯示目前已登入的使用者。
:::

```bash
whoami
```

## `date` 指令

:::tip[取得目前日期與時間]
`date` 指令會顯示目前的日期與時間。
:::

```bash
date
```

## 檔案系統導覽

:::note[基本導覽指令]
檔案系統導覽是終端機使用的基礎。
:::

| 指令                             | 說明                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| pwd                                 | 顯示目前工作目錄的路徑                                           |
| ls                                  | 列出目錄內容                                                           |
| ls -a                               | 列出包含隱藏檔案的內容 (以點 `.` 開頭的檔案)                |
| ls -l                               | 列出包含更多資訊（例如權限）的內容 (長列表格式)                 |
| ls -r                               | 以反向順序列出內容                                                           |
| cd                                  | 變更目錄至家目錄                                                          |
| cd [dirname]                        | 變更目錄至指定目錄                                                          |
| cd ~                                | 變更至家目錄                                                          |
| cd ..                               | 變更至父目錄                                                          |
| cd -                                | 變更至上一個目錄                                                          |
| find [dirtosearch] -name [filename] | 尋找程式的位置                                                        |

可以合併旗標，例如 `ls -la` 以檢視詳細和隱藏的檔案。

## 開啟資料夾或檔案

:::note[開啟目錄、檔案或 URL]
跨作業系統，開啟檔案、資料夾或 URL 的指令有所不同。
:::

- Mac: `open [dirname]`
- Windows: `start [dirname]`
- Linux: `xdg-open [dirname]`

```bash
open https://example.com
```

## 修改檔案與目錄

:::important[檔案與目錄管理指令]
學習建立、刪除、移動和重新命名檔案及目錄。
:::

| 指令                     | 說明                                         |
| --------------------------- | --------------------------------------------------- |
| mkdir [dirname]             | 建立目錄                                      |
| touch [filename]            | 建立檔案                                      |
| rm [filename]               | 刪除檔案                                      |
| rm -i [filename]            | 刪除檔案並確認                                                      |
| rm -r [dirname]             | 刪除目錄                                    |
| rm -rf [dirname]            | 強制刪除目錄                              |
| rm ./\*                     | 刪除目前資料夾中的所有內容             |
| cp [filename] [dirname]     | 複製檔案                                      |
| mv [filename] [dirname]     | 移動檔案                                      |
| mv [filename] [filename]    | 重新命名檔案                                         |

建立巢狀目錄：

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

執行多個指令：

```bash
cd test2 && mkdir test3
```

## 右角括號 `>`

:::tip[重新導向輸出]
將指令的輸出重新導向至檔案。
:::

```bash
> [filename]
```

使用 `Ctrl+D` 退出。

## `cat` 指令

:::note[串連檔案]
`cat` 用於顯示或建立檔案，以及串連它們。
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

顯示行號：

```bash
cat -n [filename]
```

## `less` 指令

:::tip[檢視檔案內容]
使用 `less` 捲動瀏覽檔案。
:::

```bash
less [filename]
```

使用 `q` 退出。

## `echo` 指令

:::important[顯示文字或寫入檔案]
將文字輸出至終端機或檔案。
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

## `nano` 指令

:::note[編輯文字檔案]
`nano` 是一個使用者友善的文字編輯器。
:::

```bash
nano [filename]
```

使用 `Ctrl+X` 退出。使用 `Y` 儲存。

## `head` 與 `tail` 指令

:::tip[檢視檔案片段]
顯示檔案的開頭 (`head`) 或結尾 (`tail`)。
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

## `grep` 指令

:::note[搜尋檔案內容]
在檔案中搜尋文字模式。
:::

```bash
grep [searchterm] [filename]
```

## `find` 指令

:::important[定位檔案或目錄]
依據名稱、模式或屬性搜尋檔案。
:::

```bash
find [dirname] -name [filename]
```

建立測試檔案：

```bash
touch file-{001..100}.txt
find . -empty
```

刪除檔案：

```bash
find . -name "file-*" -delete
```

## 管道 (Piping)

:::tip[重新導向輸出]
將一個指令的輸出傳送至另一個指令。
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

## 建立符號連結 (Symlink)

:::note[建立捷徑]
建立檔案的符號連結。
:::

```bash
ln -s [filename] [symlinkname]
```

使用以下指令移除：

```bash
rm [symlinkname]
```

## 檔案壓縮

:::important[管理封存檔]
使用 `tar` 建立和解壓縮 tarball。
:::

| 指令                             | 說明                |
| ----------------------------------- | -------------------------- |
| tar czvf [dirname].tar.gz [dirname] | 建立 tarball             |
| tar tzvf [dirname]                  | 檢視 tarball 內容      |
| tar xzvf [dirname].tar.gz           | 解壓縮 tarball            |

## `history` 指令

:::note[指令歷程]
檢視並執行過去的指令。
:::

```bash
history
!100
```

執行歷程中的第 100 個指令。

## 所有指令的提供指南

:::important
我在這個 [TerCli](https://tercli.netlify.app/) 中加入了我所知的全部終端機指令。
:::