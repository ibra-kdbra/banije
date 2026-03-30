---
originalSlug: "cmd_commands"
lang: "zh_TW"
title: Windows 命令提示字元 (CMD) 指令
published: 2023-11-02
description: 'Windows 的基本 CMD 指令列表。'
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
---

## ASSOC

:::note[用途]
`assoc` 指令用於顯示或修改檔案副檔名關聯。
:::

```sh
assoc
```

此指令將顯示目前的檔案關聯。

## CHKDSK (檢查磁碟)

:::tip[用途]
檢查磁碟是否有錯誤，並在要求時修正任何錯誤。
:::

```sh
chkdsk C:
```

此指令將檢查磁碟 C: 的錯誤。

## CIPHER

:::warning[用途]
在 NTFS 分割區上加密或解密檔案/目錄。
:::

```sh
cipher /E
```

此指令將加密指定的目錄。

## CLS

:::note[用途]
清除螢幕上所有先前輸入的指令和其他文字。
:::

```sh
cls
```

此指令將清除命令提示字元螢幕。

## DISKPART

:::tip[用途]
管理硬碟分割區。
:::

```sh
diskpart
```

此指令將啟動 DiskPart 命令直譯器。

## DRIVERQUERY

:::warning[用途]
顯示已安裝裝置驅動程式及其屬性的列表。
:::

```sh
driverquery
```

此指令將顯示所有已安裝裝置驅動程式的列表。

## GPUPDATE

:::note[用途]
更新群組原則設定。
:::

```sh
gpupdate /force
```

此指令將強制立即更新群組原則設定。

## IPCONFIG

:::tip[用途]
顯示所有網路介面的 IP 設定。
:::

```sh
ipconfig /all
```

此指令將顯示所有網路介面的詳細 IP 設定資料。

## NETSTAT

:::warning[用途]
顯示作用中的 TCP 連線及各種網路統計資料。
:::

```sh
netstat -a
```

此指令將顯示所有作用中的 TCP 連線，以及電腦正在監聽的 TCP 和 UDP 連接埠。

## NSLOOKUP

:::note[用途]
查詢 DNS 以取得網域名稱或 IP 位址對應。
:::

```sh
nslookup <www.example.com>
```

此指令將傳回 <www.example.com> 的 IP 位址。

## PATHPING

:::tip[用途]
提供中間節點的網路延遲和封包遺失資訊。
:::

```sh
pathping <www.example.com>
```

此指令將提供到達 <www.example.com> 的每個網路節點的延遲和遺失資訊。

## PING

:::note[用途]
測試來源電腦是否能到達指定目的電腦的能力。
:::

```sh
ping <www.example.com>
```

此指令將向 <www.example.com> 傳送網路請求並等待回應。

## POWERCFG

:::warning[用途]
控制電源設定和組態。
:::

```sh
powercfg /hibernate on
```

此指令將啟用休眠功能。

## SFC (系統檔案檢查程式)

:::note[用途]
掃描並修復重要的系統檔案。
:::

```sh
sfc /scannow
```

此指令將立即掃描所有受保護的系統檔案。

## SHUTDOWN

:::tip[用途]
關閉、重新啟動或登出電腦或遠端電腦。
:::

```sh
shutdown /s /t 0
```

此指令將立即關閉您的電腦。

## SYSTEMINFO

:::note[用途]
顯示電腦及其作業系統的詳細組態資訊。
:::

```sh
systeminfo
```

此指令將顯示詳細的系統資訊。

## TASKLIST

:::tip[用途]
顯示正在執行的任務、服務和處理序的列表。
:::

```sh
tasklist
```

此指令將顯示目前正在執行的任務列表。

## TRACERT

:::warning[用途]
顯示封包到達目的地所經過的路由和節點。
:::

```sh
tracert <www.example.com>
```

此指令將顯示封包到達 <www.example.com> 所經過的路由。

## 提供的所有指令指南

:::important
我在 [TerCli](https://tercli.netlify.app/) 中加入了所有已知的 CMD 指令。
:::