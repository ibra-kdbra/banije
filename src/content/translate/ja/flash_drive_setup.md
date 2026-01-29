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

 ## **ステップ 1: ディスク情報を確認する**

 接続されているすべてのドライブをリストして、正しいデバイスを特定します。
```bash
sudo fdisk -l
```
- **出力**は、フラッシュ ドライブの実際の容量を確認するのに役立ちます (例:`/dev/sdb`）。 

---

 ## **ステップ 2: エラーを確認する**

 インストールして使用する`smartctl`ヘルスチェックを実行するには:

 1. をインストールします。`smartmontools`パッケージ：
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

 ## **ステップ 3: ディスクを消去する**

 パーティション テーブルを含むすべてのデータを消去するには、次の手順を実行します。
```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```
-`i f=/dev/zero`: 入力ファイルは`/dev/zero`(ゼロ化されたバイトが生成されます)。 
-`o f=/dev/sdb`: 出力ファイルはフラッシュドライブです。 
-`b s=1M`：ブロックサイズは1MBです。 
-`coun t=10`：10ブロック（10MB）を書き込みます。 

---

 ## **ステップ 4: 新しいパーティション テーブルを作成する**

 打ち上げ`fdisk`新しいパーティション レイアウトを作成するには:
```bash
sudo fdisk /dev/sdb
```
 1. 新しいパーティション テーブル (MBR) を作成します。
```bash
     o
```

```bash
     n
```
4. 変更をディスクに書き込みます。
```bash
     w
```

```bash
sudo fdisk -l /dev/sdb
```

 ## **ステップ 5: パーティションをフォーマットする**

 新しく作成したパーティションを希望のファイル システムでフォーマットします。 

- Linux 専用システム (ext4) の場合:
```bash
  sudo mkfs.ext4 /dev/sdb1
```

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
```

 ## **ステップ 6: パーティションをマウントする**

 1. マウント ポイントを作成します。
```bash
   sudo mkdir /mnt/flashdrive
```

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
   df -h
```

 ## **オプション: フラッシュ ドライブの偽造品のテスト**

 ドライブの容量が正しくない場合は、次を使用します。`f3`実際のサイズを確認するには:

 1.インストール`f3`:
```bash
   sudo pacman -S f3
```

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
```

 ## **結論**

 これらの手順に従って、フラッシュ ドライブを回復してセットアップし、その容量と機能を確実に復元できます。 さらに自動化するには、パーティションを追加できます。`/etc/fstab`永続的なマウント用。