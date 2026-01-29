---
title: "Windows 命令提示符 (CMD) 命令"
published: 2023-11-02
description: "Windows 基本 CMD 命令列表。"
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "zh_CN"
originalSlug: "cmd_commands"

---

## 协会

:::note
[Purpose]
assoc 命令用于显示或修改文件扩展名关联。
:::

```sh
assoc
```

## CHKDSK（检查磁盘）

:::tip
[Purpose]
检查磁盘是否有错误，并根据要求更正任何错误。
:::

```sh
chkdsk C:
```

## 密码

:::warning
[Purpose]
加密或解密 NTFS 分区上的文件/目录。
:::

```sh
cipher /E
```

## CLS

:::note
[Purpose]
清除屏幕上所有先前输入的命令和其他文本。
:::

```sh
cls
```

## 磁盘部分

:::tip
[Purpose]
管理硬盘分区。
:::

```sh
diskpart
```

## 驱动程序查询

:::warning
[Purpose]
显示已安装的设备驱动程序及其属性的列表。
:::

```sh
driverquery
```

## GPU更新

:::note
[Purpose]
更新组策略设置。
:::

```sh
gpupdate /force
```

## IP配置

:::tip
[Purpose]
显示所有网络接口的 IP 配置。
:::

```sh
ipconfig /all
```

## 网络统计

:::warning
[Purpose]
显示活动的 TCP 连接和各种网络统计信息。
:::

```sh
netstat -a
```

## 查询

:::note
[Purpose]
查询DNS，获取域名或IP地址映射。
:::

```sh
nslookup <www.example.com>
```

## 探路

:::tip
[Purpose]
提供中间跃点的网络延迟和丢失信息。
:::

```sh
pathping <www.example.com>
```

## 平

:::note
[Purpose]
测试源计算机到达指定目标计算机的能力。
:::

```sh
ping <www.example.com>
```

## 电源CFG

:::warning
[Purpose]
控制电源设置和配置。
:::

```sh
powercfg /hibernate on
```

## SFC（系统文件检查器）

:::note
[Purpose]
扫描并修复重要的系统文件。
:::

```sh
sfc /scannow
```

＃＃ 关闭

:::tip
[Purpose]
关闭、重新启动或注销计算机或远程计算机。
:::

```sh
shutdown /s /t 0
```

## 系统信息

:::note
[Purpose]
显示有关计算机及其操作系统的详细配置信息。
:::

```sh
systeminfo
```

## 任务列表

:::tip
[Purpose]
显示正在运行的任务、服务和进程的列表。
:::

```sh
tasklist
```

## 追踪器

:::warning
[Purpose]
显示数据包到达目的地所需的路由和跃点。
:::

```sh
tracert <www.example.com>
```

## 提供所有命令的指南

:::important
:::我确实添加了在此已知的所有 CMD 命令[TerCli](https://tercli.netlify.app/)
