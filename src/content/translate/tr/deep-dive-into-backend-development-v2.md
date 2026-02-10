---
title: "Gelişmiş Arka Uç Mühendisliği - Dağıtık Sistemlerden Esnek Mimarilere"
published: 2025-05-12
description: "Ölçeklenebilir, hataya dayanıklı uygulamalar oluşturmak için tutarlılık modelleri, esneklik modelleri, olay kaynağı oluşturma, CQRS ve modern arka uç mimarilerini kapsayan dağıtılmış sistemlere yönelik gelişmiş bir kılavuz."
image: ''
tags: [Backend, Distributed Systems, Architecture, Resilience, CQRS, Event Sourcing, Microservices]
category: Backend Development
draft: false
lang: "tr"
originalSlug: "deep-dive-into-backend-development-v2"
series:
  name: "Backend Engineering"
  order: 2

---

## 1.0 Giriş: Kaçınılmaz Dağıtım Yasaları

Bu serinin 1.0 sürümü, arka uç mühendisliğinin rollerini, araçlarını ve ilk mimari modellerini tanımlayarak temelleri attı. Monolitleri ve mikro hizmetleri, SQL ve NoSQL, REST ve GraphQL'i araştırdık. Bu bilgi, işlevsel uygulamalar oluşturmak için gerekli temeli temsil eder. Ancak bu cilt, bu uygulamaları ölçeklendirdiğimizde ne olacağıyla ilgilidir; Tek sunucumuz bir filo haline geldiğinde, tek veritabanımız bir küme haline gelir ve işlem içi çağrılarımız ağ atlama noktalarına dönüşür. Bu, **dağıtılmış sistemler** alanıdır ve farklı, daha katı kurallar dizisi tarafından yönetilir.

Tek makineli bir sistemden dağıtılmış bir sisteme geçiş, karmaşıklığın doğrusal bir artışı değildir; bu bir paradigma değişimidir. Tek bir makinede geçerli olan varsayımlar; güvenilir ağ iletişimi, sıfır gecikme süresi, anlık işlemler; paramparça oldular. Gelişmiş arka uç mühendisinin birincil hedefi, temel ortamın doğasında olan güvenilmezliğe rağmen doğru ve güvenilir bir şekilde çalışabilen sistemler oluşturmaktır.

### 1.1 Dağıtılmış Bilgi İşlemin Sekiz Yanılgısı

1990'larda L. Peter Deutsch ve Sun Microsystems'teki diğerleri yanılgıların bir listesini derlediler; Dağıtılmış uygulamalara yeni başlayan programcıların her zaman yaptıkları varsayımlar kendilerini tehlikeye atar.

:::caution[Eight Fallacies of Distributed Computing]

1. **Ağ güvenilirdir.** (Değildir.)
2. **Gecikme sıfırdır.** (Değildir.)
3. **Bant genişliği sonsuzdur.** (Değildir.)
4. **Ağ güvenlidir.** (Değildir.)
5. **Topoloji değişmez.** (Değişir.)
6. **Bir yönetici var.** (Birçok yönetici var.)
7. **Nakliye maliyeti sıfırdır.** (Değildir.)
8. **Ağ homojendir.** (Değildir.)
:::Bu ciltte tartışılan her model, protokol ve mimari, bir bakıma bu yanılgıların sonuçlarını hafifletmeye yönelik bir stratejidir.

### 1.2 Gelişmiş Arka Uç Mühendisliği için Bir Yol Haritası

Temelimizi temel alarak modern sistem mimarisini tanımlayan ileri konuları araştırıyoruz:

* **Bölüm 2: Gelişmiş Veri Yönetimi ve Tutarlılık**
* **Bölüm 3: Dayanıklı Sistem Tasarım Modelleri**
* **Bölüm 4: Gelişmiş Asenkron İletişim**
* **Bölüm 5: Büyük Ölçekte Performans Mühendisliği**
* **Bölüm 6: Gelişmiş API ve Güvenlik Mimarileri**

## 2.0 Gelişmiş Veri Yönetimi ve Tutarlılık

Tek veritabanına sahip tek sunuculu bir uygulamada veri tutarlılığı büyük ölçüde ACID işlemleriyle çözülür. Dağıtılmış bir sistemde tutarlılık en zor zorluklardan biri haline gelir.

### 2.1 Tutarlılık Spektrumu ve PACELC Teoremi

CAP teoremi ağ bölümleri sırasındaki davranışı açıklar, ancak **PACELC teoremi** daha eksiksiz bir tablo sağlar:

:::note[PACELC Theorem]
**"Bir Bölüm (P) varsa, dağıtılmış sistemin Kullanılabilirlik (A) ve Tutarlılık (C) arasında seçim yapması gerekir. Aksi halde (E), sistem normal çalışırken Gecikme (L) ve Tutarlılık (C) arasında seçim yapması gerekir."**
:::

Bu, incelikli mimari tartışmayı zorlar. Bir sistem, arızalar sırasında kullanılabilirlik için tutarlılıktan fedakarlık edebilir, ancak normal çalışma sırasında gecikme yerine tutarlılığa öncelik verebilir.

### 2.2 Dağıtılmış İşlemler: Destan Modeli

İki Aşamalı Taahhüt eşzamanlıdır ve mikro hizmetler için uygun değildir. **Saga Modeli**, yerel işlemler ve telafi edici eylemler yoluyla hizmetler genelinde veri tutarlılığını yönetir.

:::tip[Saga Pattern Example: E-commerce Order]

1. `Sipariş Hizmeti`: `BEKLEMEDE' durumunda sipariş oluşturur,`ORDER_CREATED` olayını yayınlar
2. "Ödeme Hizmeti": Ödemeyi işler, başarı durumunda "PAYMENT_PROCESSED" yayınlar
3. "Envanter Hizmeti": Stokları günceller, başarı durumunda "INVENTORY_UPDATED"ı yayınlar
4. "Sipariş Hizmeti": Siparişi "ONAYLANDI" olarak günceller

**Arıza Ele Alma:** Envanter başarısız olursa, Ödeme Hizmeti para iadesini telafi eder, Sipariş Hizmeti iptal eder.
:::

**Uygulama Stilleri:**

:::note[Saga Implementation Approaches]

* **Koreografi:** Hizmetler, merkezi bir koordinatör olmaksızın etkinlikler yayınlar/abone olurlar
* **Orkestrasyon:** Merkezi orkestratör, destan durumunu ve telafi edici işlemleri yönetir

:::

### 2.3 Olay Kaynak Kullanımı ve CQRS

Bu modeller yüksek düzeyde ölçeklenebilir ve denetlenebilir sistemler oluşturur.

* **Olay Kaynağı:** Mevcut durum yerine değiştirilemez olayları saklayın. Mevcut durum, olayların tekrar oynatılmasıyla elde edilir.

:::note[Event Sourcing Example]

```json
// Bakiyeyi saklamak yerine: 80 
// Olay sırasını sakla: 
[ 
{"type": "AccountCreated", "initialBalance": 0}, 
{"type": "Para Yatırma", "tutar": 100}, 
{"type": "Çekilme Yapıldı", "tutar": 20} 
] 
// Mevcut bakiye = tekrarlanan olaylar 
''''
:::

* **CQRS (Komut Sorgu Sorumluluğu Ayrımı):** Yazma modelini okuma modelinden ayırır.

:::tip[CQRS Benefits]

* Yazma ve okuma için optimize edilmiş farklı modeller
* Komut ve sorgu taraflarının bağımsız ölçeklendirilmesi
* Ayrı bağlamlarla daha iyi etki alanı modellemesi

:::

### 2.4 Arka Uç Mühendisi için Veritabanı İç Bileşenleri

Depolama motorlarını ve çoğaltma stratejilerini anlamak, performans ve güvenilirlik açısından çok önemlidir.

:::note[MySQL Storage Engines]

* **InnoDB:** OLTP iş yükleri için işlemsel, ACID uyumlu, satır düzeyinde kilitleme
* **MyISAM:** Okumalar için hızlı, tablo düzeyinde kilitleme, işlem yok (yeni uygulamalar için kullanımdan kaldırıldı)
:::**Çoğaltma Stratejileri:**

:::tip[Replication Models]

* **Lider-Takipçi:** Tümü lidere yazar, kopyalardan okur (en yaygın)
* **Çoklu Lider:** Birden fazla düğüm yazma işlemlerini kabul eder, kopya çakışmaları çözülmelidir
* **Lidersiz (Cassandra stili):** Aynı anda birden fazla düğüme yazar, çekirdek okur
:::**İşlem Yalıtım Düzeyleri (SQL):**

:::note[SQL Isolation Levels]

1. **Kayıt Edilmemiş Okuma:** Kaydedilmemiş değişiklikleri okuyabilir (kirli okumalar)
2. **Okuma Taahhüt Edildi:** Yalnızca taahhüt edilen değişiklikleri okur (tekrarlanamayan okumalar mümkündür)
3. **Tekrarlanabilir Okuma:** İşlem içinde tutarlı satır değeri (hayalet okumalar mümkündür)
4. **Serileştirilebilir:** Tam seri yürütme (en yüksek tutarlılık, en düşük performans)

:::

## 3.0 Esnek Sistem Tasarım Modelleri

Dayanıklılık, başarısızlıklardan kurtulma ve çalışmaya devam etme yeteneğidir; Başarısızlıkları tamamen önlemek yerine, incelikle ele almak.

### 3.1 Devre Kesici Modeli (Derinlemesine)

Devre Kesici arızaları izler ve dağıtılmış sistemlerdeki ardışık arızaları önler.

:::note[Circuit Breaker States]

* **Kapalı:** Normal çalışma, istek akışı, izleme hataları
* **Açık:** Aşağı akış sorunları için hızlı başarısız olun, yeniden denemeden önce zaman aşımı
* **Yarı Açık:** Tek prob isteğiyle aşağı yönde kurtarmayı test edin

:::

### 3.2 Bölme Modeli

Tek arızaların tüm sistemi etkilemesini önlemek için uygulama bileşenlerini havuzlara ayırın.

:::tip[Bulkhead Implementation]
Her aşağı akış hizmeti için ayrı iş parçacığı/bağlantı havuzları kullanın. Yavaş bir Hizmet A, Hizmet B'nin havuzunu etkilemez ve sistemin tamamen arızalanmasını önler.
:::

### 3.3 Yeniden Deneme ve Zaman Aşımı Modelleri

Dağıtılmış sistemlerde geçici arızaların giderilmesi için gereklidir.

:::caution[Retry Best Practices]

* **Zaman aşımları:** Agresif zaman aşımları kaynakların tükenmesini önler
* **Üstel Gerileme:** Yeniden deneme aralıklarını artırın (1 sn, 2 sn, 4 sn, 8 sn)
* **Titreşim:** Gürleyen sürü sorunlarını önlemek için rastgelelik ekleyin

:::

### 3.4 Hız Sınırlama ve Yük Atma

Hizmetleri aşırı yükten koruyun ve hassas bozulma uygulayın.

:::note[Rate Limiting Strategies]

* **Jeton Grubu:** İstekler için jetonlar birikir, kullanım sırasında kaldırılır
* **Sızdıran Kova:** İstekler sabit oranda işlenir, fazlası atılır
* **Yük Atma:** Aşırı yük altında düşük öncelikli istekleri reddedin

:::

## 4.0 Gelişmiş Asenkron İletişim

Eşzamansız modeller esnek, gevşek bağlı dağıtılmış sistemler için temeldir.

### 4.1 Mesaj Aracıları ve Olay Günlükleri

Farklı ödünleşimlerle mesajlaşmaya farklı yaklaşımlar.

:::tip[Message Broker Characteristics]

* **RabbitMQ:** Akıllı yönlendirme, iş kuyruğu, mesaj aracısı modeli
* **Apache Kafka:** Olay akışı, kalıcı günlükler, birden çok tüketici

:::

### 4.2 İdempotent Tüketiciler

Mesajlaşma sistemlerinde "en az bir kez" teslimatın gerçekleştirilmesi açısından kritik öneme sahiptir.

:::note[Idempotency Strategy]

```text
function süreçMesaj(mesaj) { 
if (processedMessages.contains(message.id)) { 
dönüş; // Kopyayı atla 
} 

// Mesajı işle 
prosesBusinessLogic(mesaj); 

// İşlenmiş olarak takip et (iş mantığıyla atomik) 
işlenmişMessages.add(message.id); 
} 
```

:::

### 4.3 İşlemsel Giden Kutusu Modeli

Olay odaklı sistemlerde atomik veritabanı güncellemelerini ve olay yayınlamayı çözün.

:::tip[Transactional Outbox Flow]

1. İşletme varlığını güncelleyin VE tek bir yerel işlemde olayı giden kutusuna ekleyin
2. Mesaj aktarımı, olayları ve işaretleri gönderildiği gibi eşzamansız olarak yayınlar
3. Dağıtılmış işlemler olmadan atomikliği garanti eder
4. "En az bir kez" dağıtım semantiği sağlar

:::

## 5.0 Büyük Ölçekte Performans Mühendisliği

Darboğazların belirlenmesi ve ortadan kaldırılmasına yönelik sistematik disiplin.

### 5.1 Önbelleğe Alma Desenleri (Derinlemesine)

Temel önbelleklemenin ötesinde gelişmiş önbellekleme stratejileri.

:::note[Caching Pattern Comparison]

* **Önbellek Kenarı:** Uygulama kodu önbelleği ve yavaş yüklemeyi yönetir
* **Okuma:** Önbellek, veritabanından veri yüklemeyi yönetir
* **İçine Yazma:** Önbellek güncellemeleri eşzamanlı olarak veritabanını günceller
* **Geri Yazma:** Önbellek güncellemeleri eşzamansız olarak DB'ye aktarılır

:::

**Gürleyen Sürü Azaltma:**

:::caution
[Thundering Herd Problem]
Önbelleğe alınan öğenin süresi dolduğunda, binlerce istek aynı anda önbelleği kaçırır ve DB'yi bunaltır. Çözüm: diğerleri beklerken yalnızca ilk isteğin verileri yüklediği kilit tabanlı yeniden getirme.
:::

### 5.2 Eşzamanlılık ve Paralellik

Performans optimizasyonu için temel kavramlar.

:::tip[Workload Matching]

* **G/Ç Bağlantılı İş Yükleri:** Eşzamansız modeller (Node.js, eşzamansız) birçok eşzamanlı isteği işler
* **CPU'ya Bağlı İş Yükleri:** Paralellik (Go, Java) birden fazla çekirdekten yararlanır

:::

### 5.3 Profil Oluşturma ve Performans Ayarlama

Ölçemediğiniz şeyi optimize edemezsiniz.

:::note[Performance Profiling]
Aşağıdakileri tanımlayan alev grafikleri oluşturmak için profil oluşturucuları kullanın:

* Kod yürütme yollarındaki CPU etkin noktaları
* Bellek ayırma düzenleri ve sızıntılar
* G/Ç darboğazları ve bekleme süresi

:::

## 6.0 Gelişmiş API ve Güvenlik Mimarileri

Dağıtılmış ortamlarda karmaşıklığın yönetilmesine yönelik altyapı düzeyinde çözümler.

### 6.1 API Ağ Geçidi Modeli

İstemciler ve hizmetler arasındaki iletişimi yöneten tek giriş noktası.

:::tip[API Gateway Responsibilities]

* **Yönlendirme:** Uygun mikro hizmetlere doğrudan istekler
* **Kimlik Doğrulama/Yetkilendirme:** Kimlik bilgilerini uçta doğrulayın
* **Hız Sınırlama:** Kullanım politikalarını ve azaltmayı zorunlu kılın
* **Dönüştürme Talebi:** Aşağı yöndeki hizmetler için istekleri uyarlama
* **Gözlemlenebilirlik:** Merkezi günlük kaydı ve izleme

:::

### 6.2 Hizmet Ağı

Güvenli, hızlı ve güvenilir hizmetten hizmete iletişim için altyapı katmanı.

:::note[Service Mesh Components]

* **Sidecar Proxy:** (Elçi) hizmet başına tüm gelen/giden trafiği yönetir
* **Kontrol Düzlemi:** (Istio, Linkerd) tüm sepet proxy'lerini yapılandırır
* **Özellikler:** mTLS, trafik yönetimi, dağıtılmış izleme, gözlemlenebilirlik

:::

### 6.3 Sıfır Güven Güvenliği

Dağıtılmış sistemler için "Asla güvenme, her zaman doğrula" güvenlik modeli.

:::caution[Zero Trust Principles]

* **Kimlik Tabanlı Kimlik Doğrulama:** Kaynağı ne olursa olsun her isteği doğrulayın
* **En Az Ayrıcalıklı Erişim:** Gerekli minimum izinleri verin
* **İhlal Varsayalım:** Tasarım dahili uzlaşmayı bekliyor

:::

### 6.4 JWT'ler (Derinlemesine): Riskler ve Azaltma

JWT güvenlik açıklarını anlama ve güvenli uygulama.

:::caution[JWT Security Issues]

* **Algoritma Karışıklık Saldırıları:** Sunucuyu zayıf algoritmalara yönlendirecek şekilde kandırın
* *Azaltma:* Kitaplığı yalnızca güçlü algoritmaları kabul edecek şekilde yapılandırın (RS256)
* **Jeton İptali:** Durum bilgisi olmayan jetonlar geçersiz kılınamaz
* *Azaltma:* İptal red listesini hızlı önbellekte tutun

:::

## 7.0 Sonuç: İlkeli Mühendis

Sürüm 2.0, dağıtılmış sistem mühendisliğine doğru yolculuğa çıktı. Dayanıklı, ölçeklenebilir arka uç sistemleri oluşturmak, temel ödünleşimlerin derinlemesine anlaşılmasını gerektirir: gecikmeye karşı tutarlılık, kullanılabilirliğe karşı doğruluk, hıza karşı güvenlik.

Gelişmiş arka uç mühendisi başarısızlık için tasarım yapar, ağ düşmanlığını üstlenir ve Sagas, Olay Kaynak Kullanımı, Devre Kesiciler ve Hizmet Ağları gibi modelleri uygular. Nihai beceri, karmaşıklık hakkında akıl yürütmektir; Uygun azaltma stratejilerini uygulamak için başarısızlık noktalarının, darboğazların ve güvenlik açıklarının belirlenmesi.
