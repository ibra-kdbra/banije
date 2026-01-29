---
title: "Linux 上的閃存驅動器設置和恢復"
published: 2024-11-18
description: "在 Linux 上檢查、恢復和格式化閃存驅動器的分步指南。"
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "zh_TW"
originalSlug: "flash_drive_setup"

---

本文檔提供了在 Linux 上檢查、恢復和格式化閃存驅動器的分步指南。 

---

## **第 1 步：驗證磁盤信息**

列出所有連接的驅動器以識別正確的設備：
```bash
sudo fdisk -l
```
- **輸出**將有助於確認閃存驅動器的實際容量（例如，`/dev/sdb`）。 

---

## **第 2 步：檢查錯誤**

安裝與使用`smartctl`執行健康檢查：

1. 安裝`smartmontools`包裹：
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

## **步驟 3：擦除磁盤**

刪除所有數據，包括分區表：
```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```
-`i f=/dev/zero`：輸入文件是`/dev/zero`（產生清零字節）。 
-`o f=/dev/sdb`：輸出文件是閃存驅動器。 
-`b s=1M`：塊大小為 1MB。 
-`coun t=10`：寫入10個塊（10MB）。 

---

## **步驟 4：創建新分區表**

發射`fdisk`創建新的分區佈局：
```bash
sudo fdisk /dev/sdb
```
1、創建新的分區表（MBR）：
```bash
     o
```

```bash
     n
```
4. 將更改寫入磁盤：
```bash
     w
```

```bash
sudo fdisk -l /dev/sdb
```

## **第五步：格式化分區**

使用所需的文件系統格式化新創建的分區：

- 對於僅 Linux 系統 (ext4)：
```bash
  sudo mkfs.ext4 /dev/sdb1
```

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
```

## **第6步：掛載分區**

1.創建掛載點：
```bash
   sudo mkdir /mnt/flashdrive
```

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
   df -h
```

## **可選：測試閃存驅動器是否偽造**

如果驅動器顯示的容量不正確，請使用`f3`驗證其真實尺寸：

1. 安裝`f3`:
```bash
   sudo pacman -S f3
```

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
```

## **結論**

通過執行以下步驟，您可以恢復和設置閃存驅動器，確保恢復其容量和功能。 為了實現額外的自動化，您可以將分區添加到`/etc/fstab`用於持久安裝。