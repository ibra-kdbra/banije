---
title: "Ortak Terminal Komutları"
published: 2022-09-20
description: "Anahtar terminal komutlarını ve bunların kullanımını öğrenin."
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false 
lang: "tr"
originalSlug: "commonTerminalCommands"

---

## Genel Bakış

Bu kılavuz, gezinme, dosya yönetimi ve daha fazlası gibi kategorilere göre düzenlenmiş, temel terminal komutlarının kapsamlı bir listesini sağlar. Hem yeni başlayanlar hem de ileri düzey kullanıcılar için mükemmeldir.

## Tuş Komutları ve Gezinme

:::tip
Klavye kısayolları terminalde gezinirken ve kullanırken zaman kazandırabilir.
:::

-`Up Arrow`: Son komutunuzu gösterecek
-`Down Arrow`: Bir sonraki komutunuzu gösterecek
-`Tab`: Komutunuzu otomatik olarak tamamlayacak
-`Ctrl + L`: Ekranı temizler
-`Ctrl + C`: Bir komutu iptal eder
-`Ctrl + R`: Bir komut arayacak
-`Ctrl + D`: Terminalden çıkacak

## Manuel Komut

:::note[Using `man` Command]
'Man' komutu, Linux ve MacOS'taki komutların kılavuzlarını görüntüler. Git Bash'te benzer işlevler için `--help` kullanın.
:::

```bash
man ls
```

```bash
ls --help
```

:::important[Identify Current User]
'Whoami' komutu mevcut oturum açmış kullanıcıyı görüntüler.
:::

```bash
whoami
```

:::tip[Get Current Date & Time]
'Tarih' komutu geçerli tarih ve saati gösterir.
:::

```bash
date
```

:::note[Essential Navigation Commands]
Dosya sisteminde gezinme, terminal kullanımı için temeldir.
:::

| Komut | Açıklama |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| pwd | Çalışma dizininin yolunu listeler |
| l | Dizin içeriğini listele |
| ls -a | Gizli dosyalar dahil içerikleri listeleme (Noktayla başlayan dosyalar) |
| ls-l | İzinler dahil daha fazla bilgi içeren içerikleri listeleyin (uzun liste) |
| ls -r | İçerikleri ters sırada listele |
| cd | Dizini ana sayfaya değiştir |
| cd [dizin adı] | Dizini belirli bir dizine değiştir |
| CD ~ | Ana dizine değiştir |
| cd .. | Ana dizine değiştir |
| cd- | Önceki dizine geç |
| find [dirtosearch] -name [dosyaadı] | Bir programın konumunu bulun |

Bayrakları birleştirin, ör.`ls -la`ayrıntılı ve gizli dosyaları görüntülemek için.

## Klasör veya Dosya Açma

:::note[Open Directories, Files, or URLs]
Dosyaları, klasörleri veya URL'leri açmaya ilişkin komutlar işletim sistemleri arasında farklılık gösterir.
:::

- Mac:`open [dirname]`- Windows:`start [dirname]`-Linux:`xdg-open [dirname]`

```bash
open https://example.com
```

:::important[File & Directory Management Commands]
Dosyaları ve dizinleri oluşturmayı, silmeyi, taşımayı ve yeniden adlandırmayı öğrenin.
:::

| Komut | Açıklama |
| ----------------- | --------------------------------------------------- |
| mkdir [dizin adı] | Dizin oluştur |
| [dosya adı]'na dokunun | Dosya oluştur |
| rm [dosya adı] | Dosyayı kaldır |
| rm -i [dosya adı] | Onaylı dosyayı kaldır |
| rm -r [dizin adı] | Dizini kaldır |
| rm -rf [dizin adı] | Dizini kaldırmaya zorla |
| rm ./\* | Geçerli klasördeki her şeyi kaldır |
| cp [dosya adı] [dizin adı] | Dosyayı kopyala |
| mv [dosya adı] [dizin adı] | Dosyayı taşı |
| mv [dosya adı] [dosya adı] | Dosyayı yeniden adlandır |

İç içe geçmiş dizinler oluşturun:

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

```bash
cd test2 && mkdir test3
```

:::tip[Redirect Output]
Komut çıktısını bir dosyaya yönlendirin.
:::

```bash
> [filename]
```

## `cat`Emretmek

:::note[Concatenate Files]
'cat' dosyaları görüntüler veya oluşturur ve bunları birleştirir.
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

```bash
cat -n [filename]
```

:::tip[View File Contents]
'Daha az' içeren bir dosyada ilerleyin.
:::

```bash
less [filename]
```

## `echo`Emretmek

:::important[Display Text or Write to Files]
Metni terminale veya dosyalara yankılayın.
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

:::note[Edit Text Files]
'nano' kullanıcı dostu bir metin editörüdür.
:::

```bash
nano [filename]
```

## `head`Ve`tail`Komutlar

:::tip[View File Parts]
Dosyaların başlangıcını (`baş`) veya sonunu (`kuyruk`) görüntüleyin.
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

:::note[Search File Content]
Dosyalardaki metin desenlerini arayın.
:::

```bash
grep [searchterm] [filename]
```

:::important[Locate Files or Directories]
Dosyaları ada, desene veya özelliklere göre arayın.
:::

```bash
find [dirname] -name [filename]
```

```bash
touch file-{001..100}.txt
find . -empty
```

```bash
find . -name "file-*" -delete
```

:::tip[Redirect Output]
Bir komutun çıktısını diğerine aktarın.
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

:::note[Create Shortcuts]
Dosyalara sembolik bağlantılar oluşturun.
:::

```bash
ln -s [filename] [symlinkname]
```

```bash
rm [symlinkname]
```

:::important[Manage Archives]
'Tar' ile tarball'lar oluşturun ve çıkarın.
:::

| Komut | Açıklama |
| ----------------------------------- | -------------------------- |
| tar czvf [dizin adı].tar.gz [dizin adı] | Tarball oluştur |
| tar tzvf [dizin adı] | Tarball içeriğini görüntüle |
| tar xzvf [dizin adı].tar.gz | Tarball'ı çıkart |

## `history`Emretmek

:::note[Command History]
Geçmiş komutları görüntüleyin ve yürütün.
:::

```bash
history
!100
```

## Tüm komutlar için Sağlanan Kılavuz

:::important
Bunda bilinen tüm terminal komutlarını ekledim[TerCli](https://tercli.netlify.app/)
:::
