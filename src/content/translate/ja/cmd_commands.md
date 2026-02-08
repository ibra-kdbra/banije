---
title: "Windows コマンド プロンプト (CMD) コマンド"
published: 2023-11-02
description: "Windows の必須 CMD コマンドのリスト。"
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "ja"
originalSlug: "cmd_commands"

---

## ASSOC

:::note[Purpose]
assoc コマンドは、ファイル拡張子の関連付けを表示または変更するために使用します。
:::

```sh
assoc
```

## CHKDSK (チェックディスク)

:::tip[Purpose]
ディスクのエラーをチェックし、要求に応じてエラーを修正します。
:::

```sh
chkdsk C:
```

## 暗号

:::warning[Purpose]
NTFS パーティション上のファイル/ディレクトリを暗号化または復号化します。
:::

```sh
cipher /E
```

## CLS

:::note[Purpose]
以前に入力したすべてのコマンドとその他のテキストを画面から消去します。
:::

```sh
cls
```

## DISKPART

:::tip[Purpose]
ハードドライブのパーティションを管理します。
:::

```sh
diskpart
```

## ドライバークエリ

:::warning[Purpose]
インストールされているデバイスドライバーとそのプロパティのリストを表示します。
:::

```sh
driverquery
```

## GPUPDATE

:::note[Purpose]
グループ ポリシー設定を更新します。
:::

```sh
gpupdate /force
```

## IPCONFIG

:::tip[Purpose]
すべてのネットワーク インターフェイスの IP 構成を表示します。
:::

```sh
ipconfig /all
```

## ネット統計

:::warning[Purpose]
アクティブな TCP 接続とさまざまなネットワーク統計を表示します。
:::

```sh
netstat -a
```

## NSLOOKUP

:::note[Purpose]
DNS にクエリを実行して、ドメイン名または IP アドレスのマッピングを取得します。
:::

```sh
nslookup <www.example.com>
```

## パスピング

:::tip[Purpose]
中間ホップでのネットワーク遅延と損失情報を提供します。
:::

```sh
pathping <www.example.com>
```

## ピン

:::note[Purpose]
ソース コンピューターが指定された宛先コンピューターに到達できるかどうかをテストします。
:::

```sh
ping <www.example.com>
```

## パワーCFG

:::warning[Purpose]
電源設定と構成を制御します。
:::

```sh
powercfg /hibernate on
```

## SFC (システム ファイル チェッカー)

:::note[Purpose]
重要なシステム ファイルをスキャンして修復します。
:::

```sh
sfc /scannow
```

## シャットダウン

:::tip[Purpose]
コンピューターまたはリモート コンピューターをシャットダウン、再起動、またはログオフします。
:::

```sh
shutdown /s /t 0
```

## システムフォ

:::note[Purpose]
コンピュータとそのオペレーティング システムに関する詳細な構成情報を表示します。
:::

```sh
systeminfo
```

## タスクリスト

:::tip[Purpose]
実行中のタスク、サービス、プロセスのリストを表示します。
:::

```sh
tasklist
```

## トレース

:::warning[Purpose]
パケットが宛先に到達するまでにかかるルートとホップを表示します。
:::

```sh
tracert <www.example.com>
```

## すべてのコマンドのガイドが提供されています

:::important
この記事で知られているすべての CMD コマンドを追加しました。[TerCli](https://tercli.netlify.app/)
:::
