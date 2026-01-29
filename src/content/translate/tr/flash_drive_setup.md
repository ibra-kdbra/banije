---
title: "Linux'ta Flash Sürücü Kurulumu ve Kurtarma"
published: 2024-11-18
description: "Linux'ta bir flash sürücüyü kontrol etmek, kurtarmak ve biçimlendirmek için adım adım kılavuz."
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "tr"
originalSlug: "flash_drive_setup"

---

Bu belge, Linux'ta bir flash sürücüyü kontrol etmek, kurtarmak ve biçimlendirmek için adım adım bir kılavuz sağlar. 

--- 

## **1. Adım: Disk Bilgilerini Doğrulayın** 

Doğru cihazı tanımlamak için bağlı tüm sürücüleri listeleyin:
```bash
sudo fdisk -l
```
- **Çıktı** flash sürücünün gerçek kapasitesinin doğrulanmasına yardımcı olacaktır (ör.`/dev/sdb`). 

--- 

## **2. Adım: Hataları Kontrol Edin** 

Kurulum ve kullanım`smartctl`sağlık kontrolü yapmak için: 

1. Kurulumu yapın`smartmontools`paket:
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

## **3. Adım: Diski silin** 

Bölüm tablosu dahil tüm verileri silmek için:
```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```
-`i f=/dev/zero`: Giriş dosyası`/dev/zero`(sıfırlanmış baytlar üretir). 
-`o f=/dev/sdb`: Çıkış dosyası flash sürücüdür. 
-`b s=1M`: Blok boyutu 1MB'dir. 
-`coun t=10`: 10 blok (10MB) yazın. 

--- 

## **4. Adım: Yeni Bir Bölümleme Tablosu Oluşturun** 

Başlat`fdisk`yeni bir bölüm düzeni oluşturmak için:
```bash
sudo fdisk /dev/sdb
```
1. Yeni bir bölüm tablosu (MBR) oluşturun:
```bash
     o
```

```bash
     n
```
4. Değişiklikleri diske yazın:
```bash
     w
```

```bash
sudo fdisk -l /dev/sdb
```

## **5. Adım: Bölümü Biçimlendirin** 

Yeni oluşturulan bölümü istediğiniz dosya sistemiyle biçimlendirin: 

- Yalnızca Linux sistemleri için (ext4):
```bash
  sudo mkfs.ext4 /dev/sdb1
```

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
```

## **6. Adım: Bölümü Monte Edin** 

1. Bir bağlama noktası oluşturun:
```bash
   sudo mkdir /mnt/flashdrive
```

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
   df -h
```

## **İsteğe bağlı: Flash Sürücüyü Sahteciliğe Karşı Test Edin** 

Sürücü yanlış kapasite gösteriyorsa şunu kullanın:`f3`gerçek boyutunu doğrulamak için: 

1. Yükle`f3`:
```bash
   sudo pacman -S f3
```

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
```

## **Sonuç** 

Bu adımları izleyerek bir flash sürücüyü kurtarabilir ve kurarak kapasitesinin ve işlevselliğinin geri yüklenmesini sağlayabilirsiniz. Ek otomasyon için bölümü ekleyebilirsiniz.`/etc/fstab`Kalıcı montaj için.