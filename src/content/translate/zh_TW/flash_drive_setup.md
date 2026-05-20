---
originalSlug: "flash_drive_setup"
lang: "zh_TW"
title: Linux 下的隨身碟設定與救援
published: 2024-11-18
description: '檢查、救援和格式化 Linux 隨身碟的逐步指南。'
image: ''
tags: [Linux, 隨身碟, 救援]
category: 教學
draft: false
---


本文提供一份逐步指南，介紹如何在 Linux 環境下檢查、救援和格式化隨身碟。

---

## 步驟 1：驗證磁碟資訊

列出所有已連接的磁碟，以識別正確的裝置：

```bash
sudo fdisk -l
```

- 此指令會列出所有磁碟分割區，以及磁碟大小、磁區大小和分割區佈局等詳細資訊。
- **輸出**結果將有助於確認隨身碟的實際容量（例如：`/dev/sdb`）。

---

## 步驟 2：檢查錯誤

安裝並使用 `smartctl` 來執行健康檢查：

1. 安裝 `smartmontools` 套件：

   

```bash
   sudo pacman -S smartmontools
   
```

2. 取得詳細的裝置資訊：

   

```bash
   sudo smartctl -i /dev/sdb
   
```

3. 執行非破壞性的健康測試（如果支援）：

   

```bash
   sudo smartctl -t long /dev/sdb
   
```

- **注意**：如果測試失敗並出現「unsupported SCSI opcode」等錯誤，表示該裝置可能不支援 SMART 功能。

---

## 步驟 3：清除磁碟

若要清除所有資料，包括分割區表：

```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M count=10
```

- **說明**：
  - `if=/dev/zero`：輸入檔為 `/dev/zero`（產生零位元組）。
  - `of=/dev/sdb`：輸出檔為隨身碟。
  - `bs=1M`：區塊大小為 1MB。
  - `count=10`：寫入 10 個區塊（共 10MB）。

---

## 步驟 4：建立新的分割區表

啟動 `fdisk` 來建立新的分割區佈局：

```bash
sudo fdisk /dev/sdb
```

- **`fdisk` 中的指令**：
  1. 建立新的分割區表（MBR）：

     

```bash
     o
     
```

  2. 建立主要分割區：

     

```bash
     n
     
```

  3. 將變更寫入磁碟：

     

```bash
     w
     
```

驗證分割區表：

```bash
sudo fdisk -l /dev/sdb
```

---

## 步驟 5：格式化分割區

使用您想要的檔案系統格式化新建立的分割區：

- 僅限 Linux 系統（ext4）：

  

```bash
  sudo mkfs.ext4 /dev/sdb1
  
```

- 跨平台相容（FAT32）：

  

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
  
```

---

## 步驟 6：掛載分割區**

1. 建立掛載點：

   

```bash
   sudo mkdir /mnt/flashdrive
   
```

2. 掛載分割區：

   

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
   
```

3. 驗證掛載：

   

```bash
   df -h
   
```

---

## 選用：測試隨身碟是否仿冒

如果隨身碟顯示的容量不正確，請使用 `f3` 來驗證其真實大小：

1. 安裝 `f3`：

   

```bash
   sudo pacman -S f3
   
```

2. 測試隨身碟：

   

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
   
```

---

## 結論

遵循以上步驟，您可以修復並設定隨身碟，確保其容量和功能恢復正常。為了進一步自動化，您可以將分割區加入 `/etc/fstab` 以實現永久掛載。
