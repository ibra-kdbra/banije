---
originalSlug: "flash_drive_setup"
lang: "zh_CN"
title: 在 Linux 上设置和恢复闪存驱动器
published: 2024-11-18
description: '在 Linux 上检查、恢复和格式化闪存驱动器的分步指南。'
image: ''
tags: [Linux, Flash Drive, Recovery]
category: "Systems & Security"
draft: false
---

本文提供了在 Linux 上检查、恢复和格式化闪存驱动器的分步指南。

---

## 步骤 1：验证磁盘信息

列出所有已连接的驱动器以识别正确的设备：

```bash
sudo fdisk -l
```

- 此命令列出所有磁盘分区及其详细信息，例如磁盘大小、扇区大小和分区布局。
- **输出**将有助于确认闪存驱动器的实际容量（例如，`/dev/sdb`）。

---

## 步骤 2：检查错误

安装并使用 `smartctl` 执行健康检查：

1. 安装 `smartmontools` 软件包：

    ```bash
    sudo pacman -S smartmontools
    ```

2. 获取详细设备信息：

    ```bash
    sudo smartctl -i /dev/sdb
    ```

3. 运行非破坏性健康测试（如果支持）：

    ```bash
    sudo smartctl -t long /dev/sdb
    ```

- **注意**：如果测试因“unsupported SCSI opcode”等错误而失败，则设备可能不支持 SMART 功能。

---

## 步骤 3：擦除磁盘

擦除所有数据，包括分区表：

```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M count=10
```

- **解释**：
  - `if=/dev/zero`：输入文件是 `/dev/zero`（生成零字节）。
  - `of=/dev/sdb`：输出文件是闪存驱动器。
  - `bs=1M`：块大小为 1MB。
  - `count=10`：写入 10 个块（10MB）。

---

## 步骤 4：创建新的分区表

启动 `fdisk` 以创建新的分区布局：

```bash
sudo fdisk /dev/sdb
```

- **`fdisk` 中的命令**：
    1. 创建新的分区表 (MBR)：

        ```bash
        o
        ```

    2. 创建主分区：

        ```bash
        n
        ```

    3. 将更改写入磁盘：

        ```bash
        w
        ```

验证分区表：

```bash
sudo fdisk -l /dev/sdb
```

---

## 步骤 5：格式化分区

使用您所需的文件系统格式化新创建的分区：

- 对于仅限 Linux 的系统 (ext4)：

    ```bash
    sudo mkfs.ext4 /dev/sdb1
    ```

- 对于跨平台兼容性 (FAT32)：

    ```bash
    sudo mkfs.vfat -F 32 /dev/sdb1
    ```

---

## 步骤 6：挂载分区

1. 创建挂载点：

    ```bash
    sudo mkdir /mnt/flashdrive
    ```

2. 挂载分区：

    ```bash
    sudo mount /dev/sdb1 /mnt/flashdrive
    ```

3. 验证挂载：

    ```bash
    df -h
    ```

---

## 可选：测试闪存驱动器是否存在假冒

如果驱动器显示容量不正确，请使用 `f3` 验证其真实大小：

1. 安装 `f3`：

    ```bash
    sudo pacman -S f3
    ```

2. 测试驱动器：

    ```bash
    sudo f3probe --destructive --time-ops /dev/sdb
    ```

---

## 结论

通过遵循这些步骤，您可以恢复和设置闪存驱动器，确保其容量和功能得到恢复。为了进一步自动化，您可以将分区添加到 `/etc/fstab` 以实现持久挂载。
