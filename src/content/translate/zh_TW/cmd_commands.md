---
title: "Windows 命令提示符 (CMD) 命令"
published: 2023-11-02
description: "Windows 基本 CMD 命令列表。"
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "zh_TW"
originalSlug: "cmd_commands"

---

## 協會

:::note
[Purpose]
assoc 命令用於顯示或修改文件擴展名關聯。
:::

```sh
assoc
```

## CHKDSK（檢查磁盤）

:::tip
[Purpose]
檢查磁盤是否有錯誤，並根據要求更正任何錯誤。
:::

```sh
chkdsk C:
```

## 密碼

:::warning
[Purpose]
加密或解密 NTFS 分區上的文件/目錄。
:::

```sh
cipher /E
```

## CLS

:::note
[Purpose]
清除屏幕上所有先前輸入的命令和其他文本。
:::

```sh
cls
```

## 磁盤部分

:::tip
[Purpose]
管理硬盤分區。
:::

```sh
diskpart
```

## 驅動程序查詢

:::warning
[Purpose]
顯示已安裝的設備驅動程序及其屬性的列表。
:::

```sh
driverquery
```

## GPU更新

:::note
[Purpose]
更新組策略設置。
:::

```sh
gpupdate /force
```

## IP配置

:::tip
[Purpose]
顯示所有網絡接口的 IP 配置。
:::

```sh
ipconfig /all
```

## 網絡統計

:::warning
[Purpose]
顯示活動的 TCP 連接和各種網絡統計信息。
:::

```sh
netstat -a
```

## 查詢

:::note
[Purpose]
查詢DNS，獲取域名或IP地址映射。
:::

```sh
nslookup <www.example.com>
```

## 探路

:::tip
[Purpose]
提供中間躍點的網絡延遲和丟失信息。
:::

```sh
pathping <www.example.com>
```

## 平

:::note
[Purpose]
測試源計算機到達指定目標計算機的能力。
:::

```sh
ping <www.example.com>
```

## 電源CFG

:::warning
[Purpose]
控制電源設置和配置。
:::

```sh
powercfg /hibernate on
```

## SFC（系統文件檢查器）

:::note
[Purpose]
掃描並修復重要的系統文件。
:::

```sh
sfc /scannow
```

＃＃ 關閉

:::tip
[Purpose]
關閉、重新啟動或註銷計算機或遠程計算機。
:::

```sh
shutdown /s /t 0
```

## 系統信息

:::note
[Purpose]
顯示有​​關計算機及其操作系統的詳細配置信息。
:::

```sh
systeminfo
```

## 任務列表

:::tip
[Purpose]
顯示正在運行的任務、服務和進程的列表。
:::

```sh
tasklist
```

## 追踪器

:::warning
[Purpose]
顯示數據包到達目的地所需的路由和躍點。
:::

```sh
tracert <www.example.com>
```

## 提供所有命令的指南

:::important
:::我確實添加了在此已知的所有 CMD 命令[TerCli](https://tercli.netlify.app/)
