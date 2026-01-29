---
title: "Windows Komut İstemi (CMD) Komutları"
published: 2023-11-02
description: "Windows için temel CMD komutlarının listesi."
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "tr"
originalSlug: "cmd_commands"

---

## DOÇ

:::note
[Purpose]
Assoc komutu, dosya uzantıları ilişkilerini görüntülemek veya değiştirmek için kullanılır.
:::

```sh
assoc
```

## CHKDSK (Diski Kontrol Et)

:::tip
[Purpose]
Diski hatalara karşı kontrol eder ve istenirse hataları düzeltir.
:::

```sh
chkdsk C:
```

## ŞİFRE

:::warning
[Purpose]
NTFS bölümlerindeki dosyaları/dizinleri şifreleyin veya şifresini çözün.
:::

```sh
cipher /E
```

## CLS

:::note
[Purpose]
Daha önce girilen tüm komutların ve diğer metinlerin ekranını temizler.
:::

```sh
cls
```

## DİSKPART

:::tip
[Purpose]
Sabit sürücü bölümlerini yönetin.
:::

```sh
diskpart
```

## SÜRÜCÜSORGU

:::warning
[Purpose]
Yüklü aygıt sürücülerinin ve özelliklerinin bir listesini görüntüleyin.
:::

```sh
driverquery
```

## GPUPDATE

:::note
[Purpose]
Grup İlkesi ayarlarını günceller.
:::

```sh
gpupdate /force
```

## IPCONFIG

:::tip
[Purpose]
Tüm ağ arayüzleri için IP yapılandırmasını görüntüler.
:::

```sh
ipconfig /all
```

##NETSTAT

:::warning
[Purpose]
Etkin TCP bağlantılarını ve çeşitli ağ istatistiklerini görüntüler.
:::

```sh
netstat -a
```

## GÖRÜNTÜLEME

:::note
[Purpose]
Etki alanı adı veya IP adresi eşlemesini elde etmek için DNS'yi sorgular.
:::

```sh
nslookup <www.example.com>
```

## YOL BULMA

:::tip
[Purpose]
Ara atlama noktalarında ağ gecikmesi ve kayıp bilgileri sağlar.
:::

```sh
pathping <www.example.com>
```

## PING

:::note
[Purpose]
Kaynak bilgisayarın belirtilen hedef bilgisayara ulaşma yeteneğini test eder.
:::

```sh
ping <www.example.com>
```

## POWERCFG

:::warning
[Purpose]
Güç ayarlarını ve yapılandırmalarını kontrol eder.
:::

```sh
powercfg /hibernate on
```

## SFC (Sistem Dosyası Denetleyicisi)

:::note
[Purpose]
Önemli sistem dosyalarını tarar ve onarır.
:::

```sh
sfc /scannow
```

## KAPAT

:::tip
[Purpose]
Bir bilgisayarı veya uzaktaki bilgisayarı kapatır, yeniden başlatır veya oturumunu kapatır.
:::

```sh
shutdown /s /t 0
```

## SİSTEM BİLGİSİ

:::note
[Purpose]
Bir bilgisayar ve işletim sistemi hakkında ayrıntılı yapılandırma bilgilerini görüntüler.
:::

```sh
systeminfo
```

## GÖREV LİSTESİ

:::tip
[Purpose]
Çalışan görevlerin, hizmetlerin ve işlemlerin bir listesini görüntüler.
:::

```sh
tasklist
```

## İZLEYİCİ

:::warning
[Purpose]
Bir paketin hedefine ulaşmak için izlediği rotayı ve atlamaları gösterir.
:::

```sh
tracert <www.example.com>
```

## Tüm komutlar için Sağlanan Kılavuz

:::important
:::Bunda bilinen tüm CMD komutlarını ekledim[TerCli](https://tercli.netlify.app/)
