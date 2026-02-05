---
title: "Linux でのフラッシュ ドライブのセットアップとリカバリ"
published: 2024-11-18
description: "Linux でフラッシュ ドライブを確認、回復、フォーマットするためのステップバイステップ ガイド。"
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "ja"
originalSlug: "flash_drive_setup"

---

このドキュメントでは、Linux 上でフラッシュ ドライブを確認、回復、フォーマットするためのステップバイステップのガイドを提供します。

---

## ステップ 1: ディスク情報を確認する

 接続されているすべてのドライブをリストして、正しいデバイスを特定します。

```bash
sudo fdisk -l
```

- **出力**は、フラッシュ ドライブの実際の容量を確認するのに役立ちます (例:`/dev/sdb`）。

---

## ステップ 2: エラーを確認する

`smartctl` をインストールしてヘルスチェックを実行します。

1. `smartmontools` パッケージをインストールします。

   ```bash
   sudo pacman -S smartmontools
   ```

2. デバイスの詳細情報を取得します。

   ```bash
   sudo smartctl -i /dev/sdb
   ```

3. 非破壊ヘルステストを実行します（サポートされている場合）。

   ```bash
   sudo smartctl -t long /dev/sdb
   ```

- **注**: 「unsupported SCSI opcode」などのエラーでテストが失敗する場合は、デバイスが SMART 機能をサポートしていない可能性があります。

---

## ステップ 3: ディスクを消去する

 パーティション テーブルを含むすべてのデータを消去するには、次の手順を実行します。

```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```

-`i f=/dev/zero`: 入力ファイルは`/dev/zero`(ゼロ化されたバイトが生成されます)。
-`o f=/dev/sdb`: 出力ファイルはフラッシュドライブです。
-`b s=1M`：ブロックサイズは1MBです。
-`coun t=10`：10ブロック（10MB）を書き込みます。

---

## ステップ 4: 新しいパーティション テーブルを作成する

`fdisk` を起動して新しいパーティションレイアウトを作成します。

```bash
sudo fdisk /dev/sdb
```

- **`fdisk` のコマンド**:

1. 新しいパーティションテーブル (MBR) を作成します。

   ```bash
   o
   ```

2. プライマリパーティションを作成します。

   ```bash
   n
   ```

3. パーティション番号、開始セクター、終了セクターはデフォルトのままにして、ディスク全体を使用します。

   ```bash
   w
   ```

パーティションテーブルを確認します。

```bash
sudo fdisk -l /dev/sdb
```

## ステップ 5: パーティションをフォーマットする

新しく作成したパーティションを、希望するファイルシステムでフォーマットします。

- Linux のみのシステムの場合 (ext4):

   ```bash
   sudo mkfs.ext4 /dev/sdb1
   ```

- クロスプラットフォーム互換性の場合 (FAT32):

   ```bash
   sudo mkfs.vfat -F 32 /dev/sdb1
   ```

---

## ステップ 6: パーティションをマウントする**

1. マウントポイントを作成します。

   ```bash
   sudo mkdir /mnt/flashdrive
   ```

2. パーティションをマウントします。

   ```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
   ```

3. マウントを確認します。

   ```bash
   df -h
   ```

---

## オプション: フラッシュドライブのテスト偽造

ドライブの容量が正しく表示されない場合は、「f3」を使用して実際のサイズを確認してください。

1. `f3` をインストールします。

   ```bash
   sudo pacman -S f3
   ``

2. ドライブをテストします。

   ```bash
   sudo f3probe --destructive --time-ops /dev/sdb
   ```

---

## **結論**

 これらの手順に従って、フラッシュ ドライブを回復してセットアップし、その容量と機能を確実に復元できます。 さらに自動化するには、パーティションを追加できます。`/etc/fstab`永続的なマウント用。
