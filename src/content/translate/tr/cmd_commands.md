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

## ASSOC

:::note[Amaç]
Assoc komutu, dosya uzantıları ilişkilerini görüntülemek veya değiştirmek için kullanılır.
:::

```sh
assoc
```

Bu komut mevcut dosya ilişkilerini görüntüleyecektir.

## CHKDSK (Diski Kontrol Et)

:::tip[Amaç]
Diski hatalara karşı kontrol eder ve istenirse hataları düzeltir.
:::

```sh
chkdsk C:
```

Bu komut C: diskini hatalara karşı kontrol edecektir.

## CIPHER

:::warning[Amaç]
NTFS bölümlerindeki dosyaları/dizinleri şifreleyin veya şifresini çözün.
:::

```sh
cipher /E
```

Bu komut belirtilen dizini şifreleyecektir.

## CLS

:::note[Amaç]
Daha önce girilen tüm komutların ve diğer metinlerin ekranını temizler.
:::

```sh
cls
```

Bu komut komut istemi ekranını temizleyecektir.

## DISKPART

:::tip[Amaç]
Sabit sürücü bölümlerini yönetin.
:::

```sh
diskpart
```

Bu komut DiskPart komut yorumlayıcısını başlatacaktır.

## DRIVERQUERY

:::warning[Amaç]
Yüklü aygıt sürücülerinin ve özelliklerinin bir listesini görüntüleyin.
:::

```sh
driverquery
```

Bu komut yüklü tüm aygıt sürücülerinin bir listesini görüntüleyecektir.

## GPUPDATE

:::note[Amaç]
Grup İlkesi ayarlarını günceller.
:::

```sh
gpupdate /force
```

Bu komut Grup İlkesi ayarlarının hemen güncellenmesini sağlayacaktır.

## IPCONFIG

:::tip[Amaç]
Tüm ağ arayüzleri için IP yapılandırmasını görüntüler.
:::

```sh
ipconfig /all
```

Bu komut tüm ağ arayüzleri için ayrıntılı IP yapılandırma verilerini görüntüleyecektir.

## NETSTAT

:::warning[Amaç]
Etkin TCP bağlantılarını ve çeşitli ağ istatistiklerini görüntüler.
:::

```sh
netstat -a
```

Bu komut tüm etkin TCP bağlantılarını ve bilgisayarın dinlediği TCP ve UDP bağlantı noktalarını görüntüleyecektir.

## NSLOOKUP

:::note[Amaç]
Etki alanı adı veya IP adresi eşlemesini elde etmek için DNS'yi sorgular.
:::

```sh
nslookup <www.example.com>
```

Bu komut <www.example.com> adresinin IP adresini döndürecektir.

## PATHPING

:::tip[Amaç]
Ara atlama noktalarında ağ gecikmesi ve kayıp bilgileri sağlar.
:::

```sh
pathping <www.example.com>
```

Bu komut <www.example.com> adresine ulaşmak için her ağ atlaması için gecikme ve kayıp bilgisi sağlayacaktır.

## PING

:::note[Amaç]
Kaynak bilgisayarın belirtilen hedef bilgisayara ulaşma yeteneğini test eder.
:::

```sh
ping <www.example.com>
```

Bu komut <www.example.com> adresine bir ağ isteği gönderecek ve bir yanıt bekleyecektir.

## POWERCFG

:::warning[Amaç]
Güç ayarlarını ve yapılandırmalarını kontrol eder.
:::

```sh
powercfg /hibernate on
```

Bu komut hazırda bekletme modunu etkinleştirecektir.

## SFC (Sistem Dosyası Denetleyicisi)

:::note[Amaç]
Önemli sistem dosyalarını tarar ve onarır.
:::

```sh
sfc /scannow
```

Bu komut tüm korumalı sistem dosyalarını hemen tarayacaktır.

## SHUTDOWN

:::tip[Amaç]
Bir bilgisayarı veya uzaktaki bilgisayarı kapatır, yeniden başlatır veya oturumunu kapatır.
:::

```sh
shutdown /s /t 0
```

Bu komut bilgisayarınızı hemen kapatacaktır.

## SYSTEMINFO

:::note[Amaç]
Bir bilgisayar ve işletim sistemi hakkında ayrıntılı yapılandırma bilgilerini görüntüler.
:::

```sh
systeminfo
```

Bu komut ayrıntılı sistem bilgilerini görüntüleyecektir.

## GÖREV LİSTESİ

:::tip[Amaç]
Çalışan görevlerin, hizmetlerin ve işlemlerin bir listesini görüntüleyin.
:::

```sh
tasklist
```

Bu komut o anda çalışan görevlerin bir listesini görüntüleyecektir.

## TRACERT

:::warning[Amaç]
Bir paketin hedefine ulaşmak için izlediği rotayı ve atlamaları gösterir.
:::

```sh
tracert <www.example.com>
```

Bu komut bir paketin <www.example.com> adresine ulaşmak için izlediği yolu gösterecektir.

## Tüm komutlar için Sağlanan Kılavuz

:::important
Bunda bilinen tüm CMD komutlarını ekledim [TerCli](https://tercli.netlify.app/)
:::
