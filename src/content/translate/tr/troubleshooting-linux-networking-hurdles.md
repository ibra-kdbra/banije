---
originalSlug: "troubleshooting-linux-networking-hurdles"
lang: "tr"
title: "Linux Ağ Sorunlarını Giderme"
published: 2026-06-11
description: "Bir yazılımcının OpenVPN DNS sorunlarını çözme, genel VPN bot engellerini aşma, kısıtlı bütçeyle özel sunucu profilleri üzerinden yönlendirme yapma ve Arch Linux üzerinde WireGuard split tunneling kurulumu günlüğü."
image: "/images/posts/monitors.webp"
tags: [Linux, Networking, VPN, OpenVPN, WireGuard]
category: "Systems & Security"
draft: false
---

## Modern Yönlendirmenin Karmaşıklığı

Oldukça fazla deneme yanılma sürecinden geçtim, ancak sonunda ihtiyaç duyduğum belirli konumlara yönlendirme yapan istikrarlı ve yüksek hızlı bir geliştirme ortamı yapılandırmayı başardım. Bu oturumun nasıl başladığına baktığımda, modern ağ yönlendirme ve güvenlik katmanlarının ne kadar karmaşık olabileceğine dair sağlam bir hatırlatıcı oldu.

---

## 1. Perde: Otomatik İndirme Hatası

Hedef basitti: Bulut profillerim için tutarlılığı korumak, GCP gibi araçları bölgesel sürtünme olmadan kullanmak ve arka plan yayınlarımın sorunsuz akmasını sağlamak için trafiğimi belirli bir `<region>` düğümü üzerinden yönlendirmem gerekiyordu.

Zaman kazanmak adına, VPNBook'tan bazı ücretsiz yapılandırma profillerini denemeye karar verdim. Terminalime geçtim ve hızlı bir otomatik indirme denemesi yaptım:

```bash
mkdir -p ~/vpnbook && cd ~/vpnbook
curl -O https://www.vpnbook.com/free-openvpn-account/VPNBook.com-OpenVPN-EuroServers.zip
```

Enter tuşuna bastım, transferin tamamlanmasını izledim ve `unzip` komutunu çalıştırdım.

:::caution[Sorun]
Terminal kritik bir hata verdi: `End-of-central-directory signature not found`. Arşiv dosyası tamamen okunamaz durumdaydı.
:::

:::note[Ders]
Pek çok genel altyapı sağlayıcısının varlıklarını bot karşıtı doğrulama katmanlarının arkasında koruduğu gerçeğini gözden kaçırmıştım. Ham bir `curl` komutuyla doğrudan zip dosyasını hedefleyerek, sunucunun otomatik isteği işaretlemesine ve zip arşivi yerine bir HTML hata sayfası göndermesine neden oldum.
:::

:::tip[Çözüm]
Otomatik yaklaşımdan vazgeçtim, Firefox'u açtım, web sitesinin bot karşıtı doğrulama sayfasını manuel olarak geçtim ve temiz yapılandırma dosyalarını doğrudan tarayıcı üzerinden indirdim.
:::

---

![free-proxy-region](/images/posts/check-free-proxy.webp)

## 2. Perde: Çalışan Tünel ve Eksik DNS Bağlantısı

Sıkıştırılmamış `.ovpn` dosyaları `~/vpnbook` klasöründe dururken, kimlik bilgilerini manuel olarak yazmamak için yerel bir `auth.txt` dosyası oluşturdum. Bu kimlik bilgisi yolunu profillere eklemek için bir stream editor komutu kullandım:

```bash
sed -i 's/auth-user-pass/auth-user-pass auth.txt/g' *.ovpn
```

25000 portunda bir UDP profili seçtim ve root yetkisiyle başlattım:

```bash
sudo openvpn --config vpnbook-de20-udp25000.ovpn
```

Terminal günlüğü akıp gitti ve başarılı bir onay ile bitti: `Initialization Sequence Completed`.

:::caution[Sorun]
Tünel aktif olmasına rağmen internet bağlantım tamamen işlevsizdi. Web sayfaları zaman aşımına uğruyor, GCP ve AWS yüklenmiyor, terminal araçlarım ise harici depolara erişemiyordu.
:::

:::note[Ders]
Günlük çıktısını daha dikkatli inceledim ve bağlantı sekansı bitmeden hemen önce belirli bir uyarı yakaladım:
`Failed to set DNS configuration: Could not activate remote peer 'org.freedesktop.resolve1': unknown unit`.

OpenVPN uzak düğüme giden ağ yolunu oluşturmuştu, ancak işletim sisteminin `systemd-resolved` kullanarak etki alanı adlarını çözümlemesini bekliyordu. EndeavourOS bu hizmeti varsayılan olarak devre dışı bıraktığı için, makinem ağ tünelinin içindeydi ancak artık metin tabanlı etki alanı URL'lerini sayısal IP adresleriyle eşleştiremiyordu.
:::

:::tip[Çözüm]
Ayrı bir terminal penceresi açtım ve gerekli D-Bus bağlantılarını başlatmak için yerel sistem arka plan programını etkinleştirdim:

```bash
sudo systemctl enable --now systemd-resolved
```

Hizmet başlar başlamaz DNS hattı temiz bir şekilde çözüldü. OpenVPN uygun genel ad sunucularını atadı, tarayıcı sayfaları normal şekilde yüklemeye başladı ve hızlı bir konum kontrolü başarılı bir harici bağlantı olduğunu gösterdi.
:::

---

## 3. Perde: Hız Darboğazı ve Hata Döngüsü

Terminal bağlantısı çalıştıktan sonra, sistem açılışında temiz bir şekilde çalışması için bunu otomatikleştirmek istedim. `vpn-failover.service` adında basit bir systemd arka plan hizmet dosyası ve temel bir bash sarmalayıcı betiği oluşturdum. Yapılandırma profillerini bir hiyerarşide düzenledim: birincil bağlantı olarak `udp25000`, yedek olarak `udp53` ve son çare olarak `tcp443`.

:::caution[Sorun]
Yük devretme (failover) betiği gayet iyi çalışıyordu, ancak gerçek ağ performansı ciddi oranda düştü. Bant genişliği o kadar kısıtlıydı ki temel dokümantasyon sayfaları bile yüklenemiyor, gerçek zamanlı kod araçlarım ise bağlantıları koparıyordu.
:::

:::note[Farkındalık]
Temelde aşırı yüklenmiş bir kaynağı optimize etmeye çalışıyordum. Ücretsiz genel VPN sunucuları, bant genişliklerini dünya çapında binlerce kullanıcıyla paylaşır. Hiçbir yerel betik optimizasyonu, donanım düzeyinde doymuş bir uzak sunucu arayüzünü düzeltemez.
:::

---

## 4. Perde: Sıkı Bir Bütçeyle Alternatifleri Değerlendirme

Kullanılamaz genel hızlarla karşı karşıya kalınca, ticari alternatifleri araştırdım ve özellikle ayda 2,50\$ karşılığında özel bir proxy düşündüm. Geliştirme araçlarım için hafif, uygulama düzeyinde bir tünel sağlayacağını umuyordum.

Onay vermeden önce iki büyük kısıtlamanın olduğunu fark ettim:

1. **ASN İtibar Engeli:** Çoğu uygun fiyatlı özel proxy, ticari veri merkezlerine ait IP bloklarına atanmıştır. Modern yapay zeka güvenlik duvarları, bu Otonom Sistem Numaralarını (ASN) aktif olarak tarar. GCP, AWS veya Claude gibi platformlar, trafiğin bir konut internet servis sağlayıcısından değil de ticari bir sunucu rafından geldiğini tespit ettiğinde, bunu genellikle bot olarak işaretler; bu da sürekli CAPTCHA zorluklarına veya toplam erişim engellerine yol açar.

2. **Bütçe Sınırı:** Kart bakiyemi kontrol ettim ve tam olarak `$7.75` gibi katı bir limit olduğunu gördüm. Bu, genellikle tek bir ay için ön ödeme olarak `$10` ila `$15` talep eden büyük ticari VPN sağlayıcılarını tamamen devre dışı bıraktı.

---

## 5. Perde: Bütçe Dostu Özel Bir Plan Uygulama

Temiz IP itibarı, güvenilir erişim ve katı bir finansal limit arasında orta yolu bulmak için esnek planlara göz attım ve Windscribe aracılığıyla özel bir "Build-A-Plan" katmanında karar kıldım. Bu, kullanıcıların 3\$ minimum satın alma şartıyla, belirli sunucu konumlarına 1\$ karşılığında ayrı ayrı erişim satın almalarına olanak tanıyor.

Temel bir yapılandırma hazırladım:

* İlk gereken `<region>` düğümü için Premium Sunucu Erişimi: \$1.00
* İkinci gereken `<region>` düğümü için Premium Sunucu Erişimi: \$1.00
* Sınırsız Veri ve Güvenlik Profili Yükseltmesi: \$1.00
* **Toplam Maliyet: \$3.00**

Bu, bütçenin içinde rahatça kaldı ve kartta güvenli bir \$4.75 bakiye bırakırken, ticari tüketici sınıfı yönlendirme hatlarına kısıtlanmamış erişim sağladı.

---

## 6. Perde: Arch Paket Çakışmasını Çözme

Yönetimi basitleştirmek için, ham yapılandırma dosyalarını manuel olarak yönetmek yerine Arch Kullanıcı Deposu'ndan (AUR) resmi grafiksel kullanıcı arayüzü masaüstü uygulamasını yüklemeye karar verdim:

```bash
yay -S windscribe-v2-bin
```

Sistem varlıkları derledi ancak son kurulum aşamasında Pacman işlemi net bir bağımlılık hatasıyla engelledi:
`error: unresolvable package conflicts detected (windscribe-v2-bin and python-windscribe-git are in conflict)`.

:::tip[Son Çözüm]
Sistemimde kalan eski, üçüncü taraf bir paket aynı dizin yollarının sahipliğini iddia etmeye çalışıyordu. Eski bağımlılığı temizlemek için hızlı bir kaldırma komutu çalıştırdım, önbelleğe alınmış yapı dosyalarından çekmek için yükleyiciyi yeniden başlattım ve arka plan yönetim programını çalıştırdım:

```bash
sudo pacman -R python-windscribe-git
yay -S windscribe-v2-bin
sudo systemctl enable --now windscribe-helper
```

Kurulum sorunsuz bir şekilde tamamlandı.
:::

---

## Nihai Çalışma Alanı Durumu

Resmi uygulamaya giriş yapmak, ham terminal betiklerine göre çok daha yapılandırılmış bir kurulum sağladı:

* **Protokol Optimizasyonu:** Bağlantı tercihlerini açtım ve sürücüyü OpenVPN'den WireGuard'a geçirdim. WireGuard, paketleri kullanıcı alanı geçişleri yerine doğrudan Linux çekirdek alanında işlediğinden, bağlantı hızları anında evimdeki bant genişliği kapasitesine ulaştı.
* **Split Tunneling:** Uygulama düzeyinde yönlendirmeyi etkinleştirdim, böylece yalnızca Firefox ve belirli IDE süreçlerim premium `<region>` düğümü üzerinden yönlendiriliyor. Bu, bulut hizmetlerinde kimliğimi tamamen tutarlı tutarken, temel sistem güncellemelerimin, yerel konteynerlerimin ve genel yardımcı programlarımın mevcut ev bağlantım üzerinden çalışmaya devam etmesini sağlıyor.

Süreç, birkaç klasik Linux ağ tuzağını düzeltmeyi gerektirdi ancak ortam artık istikrarlı, bütçe korunuyor ve çalışma alanı tamamen işlevsel durumda.