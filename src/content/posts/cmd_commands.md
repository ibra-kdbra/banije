---
title: Windows Command Prompt (CMD) Commands
published: 2023-11-02
description: 'List of essential CMD commands for Windows.'
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
---

## ASSOC

:::note[Purpose]
The assoc command is used to display or modify file extensions associations.
:::

```sh
assoc
```

This command will display the current file associations.

## CHKDSK (Check Disk)

:::tip[Purpose]
Checks a disk for errors and, if requested, corrects any errors.
:::

```sh
chkdsk C:
```

This command will check the disk C: for errors.

## CIPHER

:::warning[Purpose]
Encrypt or decrypt files/directories on NTFS partitions.
:::

```sh
cipher /E
```

This command will encrypt the specified directory.

## CLS

:::note[Purpose]
Clears the screen of all previously entered commands and other text.
:::

```sh
cls
```

This command will clear the command prompt screen.

## DISKPART

:::tip[Purpose]
Manage hard drive partitions.
:::

```sh
diskpart
```

This command will start the DiskPart command interpreter.

## DRIVERQUERY

:::warning[Purpose]
Display a list of installed device drivers and their properties.
:::

```sh
driverquery
```

This command will display a list of all installed device drivers.

## GPUPDATE

:::note[Purpose]
Updates Group Policy settings.
:::

```sh
gpupdate /force
```

This command will force an immediate update of Group Policy settings.

## IPCONFIG

:::tip[Purpose]
Displays the IP configuration for all network interfaces.
:::

```sh
ipconfig /all
```

This command will display detailed IP configuration data for all network interfaces.

## NETSTAT

:::warning[Purpose]
Displays active TCP connections and various networking statistics.
:::

```sh
netstat -a
```

This command will display all active TCP connections and the TCP and UDP ports on which the computer is listening.

## NSLOOKUP

:::note[Purpose]
Queries the DNS to obtain domain name or IP address mapping.
:::

```sh
nslookup <www.example.com>
```

This command will return the IP address of <www.example.com>.

## PATHPING

:::tip[Purpose]
Provides network latency and loss information at intermediate hops.
:::

```sh
pathping <www.example.com>
```

This command will provide latency and loss information for each network hop to reach <www.example.com>.

## PING

:::note[Purpose]
Tests the ability of the source computer to reach a specified destination computer.
:::

```sh
ping <www.example.com>
```

This command will send a network request to <www.example.com> and wait for a response.

## POWERCFG

:::warning[Purpose]
Controls power settings and configurations.
:::

```sh
powercfg /hibernate on
```

This command will enable hibernation.

## SFC (System File Checker)

:::note[Purpose]
Scans and repairs important system files.
:::

```sh
sfc /scannow
```

This command will immediately scan all protected system files.

## SHUTDOWN

:::tip[Purpose]
Shuts down, restarts, or logs off a computer or remote computer.
:::

```sh
shutdown /s /t 0
```

This command will shut down your computer immediately.

## SYSTEMINFO

:::note[Purpose]
Displays detailed configuration information about a computer and its operating system.
:::

```sh
systeminfo
```

This command will display detailed system information.

## TASKLIST

:::tip[Purpose]
Displays a list of running tasks, services, and processes.
:::

```sh
tasklist
```

This command will display a list of currently running tasks.

## TRACERT

:::warning[Purpose]
Shows the route and hops a packet takes to reach its destination.
:::

```sh
tracert <www.example.com>
```

This command will show the route that a packet takes to reach <www.example.com>.

## Provided Guide for all the commands

:::important
I did add all the CMD commands that is known in this [TerCli](https://tercli.netlify.app/)
:::
