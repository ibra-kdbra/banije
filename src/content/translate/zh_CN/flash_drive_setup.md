---
title: "Linux 上的闪存驱动器设置和恢复"
published: 2024-11-18
description: "在 Linux 上检查、恢复和格式化闪存驱动器的分步指南。"
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "zh_CN"
originalSlug: "flash_drive_setup"

---

本文档提供了在 Linux 上检查、恢复和格式化闪存驱动器的分步指南。 

---

 ## **第 1 步：验证磁盘信息**

 列出所有连接的驱动器以识别正确的设备：
```bash
sudo fdisk -l
```
- **输出**将有助于确认闪存驱动器的实际容量（例如，`/dev/sdb`）。 

---

 ## **第 2 步：检查错误**

 安装与使用`smartctl`执行健康检查：

 1. 安装`smartmontools`包裹：
```bash
   sudo pacman -S smartmontools
```

```bash
   sudo smartctl -i /dev/sdb
```

```bash
   sudo smartctl -t long /dev/sdb
```

---

 ## **步骤 3：擦除磁盘**

 删除所有数据，包括分区表：
```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```
-`i f=/dev/zero`：输入文件是`/dev/zero`（产生清零字节）。 
-`o f=/dev/sdb`：输出文件是闪存驱动器。 
-`b s=1M`：块大小为 1MB。 
-`coun t=10`：写入10个块（10MB）。 

---

 ## **步骤 4：创建新分区表**

 发射`fdisk`创建新的分区布局：
```bash
sudo fdisk /dev/sdb
```
 1、创建新的分区表（MBR）：
```bash
     o
```

```bash
     n
```
4. 将更改写入磁盘：
```bash
     w
```

```bash
sudo fdisk -l /dev/sdb
```

 ## **第五步：格式化分区**

 使用所需的文件系统格式化新创建的分区：

 - 对于仅 Linux 系统 (ext4)：
```bash
  sudo mkfs.ext4 /dev/sdb1
```

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
```

 ## **第6步：挂载分区**

 1.创建挂载点：
```bash
   sudo mkdir /mnt/flashdrive
```

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
   df -h
```

 ## **可选：测试闪存驱动器是否伪造**

 如果驱动器显示的容量不正确，请使用`f3`验证其真实尺寸：

 1. 安装`f3`:
```bash
   sudo pacman -S f3
```

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
```

 ## **结论**

 通过执行以下步骤，您可以恢复和设置闪存驱动器，确保恢复其容量和功能。 为了实现额外的自动化，您可以将分区添加到`/etc/fstab`用于持久安装。