---
title: Flash Drive Setup and Recovery on Linux
published: 2024-11-18
description: 'Step-by-step guide to check, recover, and format a flash drive on Linux.'
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
---


This document provides a step-by-step guide to checking, recovering, and formatting a flash drive on Linux.

---

## Step 1: Verify Disk Information

List all connected drives to identify the correct device:

```bash
sudo fdisk -l
```

- This command lists all disk partitions and details such as disk size, sector size, and partition layout.
- **Output** will help confirm the actual capacity of the flash drive (e.g., `/dev/sdb`).

---

## Step 2: Check for Errors

Install and use `smartctl` to perform a health check:

1. Install the `smartmontools` package:

   ```bash
   sudo pacman -S smartmontools
   ```

2. Get detailed device information:

   ```bash
   sudo smartctl -i /dev/sdb
   ```

3. Run a non-destructive health test (if supported):

   ```bash
   sudo smartctl -t long /dev/sdb
   ```

- **Note**: If tests fail with errors like "unsupported SCSI opcode," the device might not support SMART features.

---

## Step 3: Wipe the Disk

To erase all data, including the partition table:

```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M count=10
```

- **Explanation**:
  - `if=/dev/zero`: Input file is `/dev/zero` (produces zeroed-out bytes).
  - `of=/dev/sdb`: Output file is the flash drive.
  - `bs=1M`: Block size is 1MB.
  - `count=10`: Write 10 blocks (10MB).

---

## Step 4: Create a New Partition Table

Launch `fdisk` to create a new partition layout:

```bash
sudo fdisk /dev/sdb
```

- **Commands in `fdisk`**:
  1. Create a new partition table (MBR):

     ```bash
     o
     ```

  2. Create a primary partition:

     ```bash
     n
     ```

  3. Write changes to disk:

     ```bash
     w
     ```

Verify the partition table:

```bash
sudo fdisk -l /dev/sdb
```

---

## Step 5: Format the Partition

Format the newly created partition with your desired file system:

- For Linux-only systems (ext4):

  ```bash
  sudo mkfs.ext4 /dev/sdb1
  ```

- For cross-platform compatibility (FAT32):

  ```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
  ```

---

## Step 6: Mount the Partition**

1. Create a mount point:

   ```bash
   sudo mkdir /mnt/flashdrive
   ```

2. Mount the partition:

   ```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
   ```

3. Verify the mount:

   ```bash
   df -h
   ```

---

## Optional: Test Flash Drive for Counterfeiting

If the drive shows incorrect capacity, use `f3` to verify its true size:

1. Install `f3`:

   ```bash
   sudo pacman -S f3
   ```

2. Test the drive:

   ```bash
   sudo f3probe --destructive --time-ops /dev/sdb
   ```

---

## Conclusion

By following these steps, you can recover and set up a flash drive, ensuring its capacity and functionality are restored. For additional automation, you can add the partition to `/etc/fstab` for persistent mounting.
