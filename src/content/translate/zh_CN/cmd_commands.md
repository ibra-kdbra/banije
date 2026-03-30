---
originalSlug: "cmd_commands"
lang: "zh_CN"
title: Windows 命令提示符 (CMD) 指令
published: 2023-11-02
description: 'Windows 常用 CMD 指令列表。'
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
---

## ASSOC

:::note[用途]
assoc 命令用于显示或修改文件扩展名关联。
:::

```sh
assoc
```

此命令将显示当前的文件关联。

## CHKDSK (磁盘检查)

:::tip[用途]
检查磁盘错误，并在有要求时修复错误。
:::

```sh
chkdsk C:
```

此命令将检查 C 盘是否存在错误。

## CIPHER

:::warning[用途]
加密或解密 NTFS 分区上的文件/目录。
:::

```sh
cipher /E
```

此命令将加密指定的目录。

## CLS

:::note[用途]
清除屏幕上之前输入的所有命令及其他文本。
:::

```sh
cls
```

此命令将清除命令提示符屏幕。

## DISKPART

:::tip[用途]
管理硬盘分区。
:::

```sh
diskpart
```

此命令将启动 DiskPart 命令解释器。

## DRIVERQUERY

:::warning[用途]
显示已安装设备驱动程序的列表及其属性。
:::

```sh
driverquery
```

此命令将显示所有已安装设备驱动程序的列表。

## GPUPDATE

:::note[用途]
更新组策略设置。
:::

```sh
gpupdate /force
```

此命令将强制立即更新组策略设置。

## IPCONFIG

:::tip[用途]
显示所有网络接口的 IP 配置。
:::

```sh
ipconfig /all
```

此命令将显示所有网络接口的详细 IP 配置数据。

## NETSTAT

:::warning[用途]
显示活动的 TCP 连接及各种网络统计信息。
:::

```sh
netstat -a
```

此命令将显示所有活动的 TCP 连接以及计算机正在监听的 TCP 和 UDP 端口。

## NSLOOKUP

:::note[用途]
查询 DNS 以获取域名或 IP 地址映射。
:::

```sh
nslookup <www.example.com>
```

此命令将返回 <www.example.com> 的 IP 地址。

## PATHPING

:::tip[用途]
提供中间节点的网络延迟和丢包信息。
:::

```sh
pathping <www.example.com>
```

此命令将提供到达 <www.example.com> 的每个网络节点的延迟和丢包信息。

## PING

:::note[用途]
测试源计算机到达指定目标计算机的能力。
:::

```sh
ping <www.example.com>
```

此命令将向 <www.example.com> 发送网络请求并等待响应。

## POWERCFG

:::warning[用途]
控制电源设置和配置。
:::

```sh
powercfg /hibernate on
```

此命令将启用休眠功能。

## SFC (系统文件检查器)

:::note[用途]
扫描并修复重要的系统文件。
:::

```sh
sfc /scannow
```

此命令将立即扫描所有受保护的系统文件。

## SHUTDOWN

:::tip[用途]
关闭、重启或注销计算机（或远程计算机）。
:::

```sh
shutdown /s /t 0
```

此命令将立即关闭您的计算机。

## SYSTEMINFO

:::note[用途]
显示有关计算机及其操作系统的详细配置信息。
:::

```sh
systeminfo
```

此命令将显示详细的系统信息。

## TASKLIST

:::tip[用途]
显示运行中的任务、服务和进程列表。
:::

```sh
tasklist
```

此命令将显示当前运行的任务列表。

## TRACERT

:::warning[用途]
显示数据包到达目的地所经过的路由和节点。
:::

```sh
tracert <www.example.com>
```

此命令将显示数据包到达 <www.example.com> 所经过的路由。

## 所有命令的参考指南

:::important
我添加了此 [TerCli](https://tercli.netlify.app/) 中已知的所有 CMD 命令。
:::
