---
title: "Web Peyzaj Tasarımına Giriş"
published: 2025-04-05
description: "UI/UX temellerini, yazılım mühendisliği ilkelerini, güvenliği ve performans optimizasyonunu kapsayan, yazılım mühendisliği perspektifinden modern web tasarımı."
image: ''
tags:[Web Design, UI/UX, Software Engineering, Frontend, Backend, Security, Performance]
category: Software Development
draft: false
lang: "tr"
originalSlug: "introduction-to-web-landscape-design"

---

## 1.0 Giriş

Yazılım geliştirme sözlüğünde "web tasarımı" genellikle hatalı bir şekilde grafik tasarım ve görsel düzen alanıyla sınırlandırılan bir terimdir. Bu sınırlı görüş, modern dijital ortamı tanımlayan karmaşık, etkileşimli ve güvenli web uygulamalarını oluşturmak için gereken mühendislik titizliğini yakalamakta başarısız oluyor. Çağdaş bir web uygulaması karmaşık bir sistemdir ve tasarımı, kullanıcı ihtiyaçlarını, teknik kısıtlamaları, iş hedeflerini ve güvenlik duruşlarını dengeleyen bir mimari karar verme sürecidir.

Yazılım mühendisliği açısından bakıldığında web tasarımı, web tabanlı bir sistemin kullanıcıya yönelik bileşenlerini belirleme, tasarlama ve uygulama uygulamasıdır. **İnsan-bilgisayar etkileşimi (HCI)**, **yazılım mimarisi** ve **siber güvenliğin** bir birleşimidir. Bu belge, web tasarımının temel yönlerini sistematik olarak inceleyecek ve her birini daha geniş yazılım geliştirme yaşam döngüsü içinde tamamlayıcı bir alt disiplin olarak ele alacaktır. İnceleyeceğiz:

* **Kullanıcı Odaklı Çekirdek (UI/UX):** İnsan kullanıcı ile dijital sistem arasındaki etkileşimi yöneten ilkeler.
* **Mühendislik Vakfı:** Web uygulamasını oluşturmak için kullanılan yazılım mühendisliği uygulamaları ve teknolojileri.
* **İşlevsel Olmayan Zorunluluklar:** Sistem bütünlüğünü ve kullanılabilirliğini sağlayan güvenlik ve performansa ilişkin kritik hususlar.

Bu alanları parçalara ayırarak modern web tasarımının gerektirdiği daha doğru ve sağlam bir modeli oluşturabiliriz.

## 2.0 Kullanıcı Odaklı Çekirdek: UI ve UX Tasarımı

Bir web uygulamasının başarısının nihai ölçüsü, hedef kitlesi için faydası ve kullanılabilirliğidir. Kullanıcı Arayüzü (UI) ve Kullanıcı Deneyimi (UX) tasarımı, sistemin yalnızca işlevsel değil aynı zamanda sezgisel, verimli ve kullanımı tatmin edici olmasını sağlamaya adanmış disiplinlerdir.

### 2.1 Kullanıcı Arayüzü (UI) Tasarımı

Kullanıcı Arayüzü tasarımı, bir web uygulamasının görsel ve etkileşimli sunum katmanını tasarlama disiplinidir. Kullanıcı ile arka uç mantığı arasındaki somut temas noktasıdır.

* **Temel İlkeler:** Kullanıcı arayüzü tasarımı, bilişsel yükü azaltmayı ve kullanılabilirliği artırmayı amaçlayan yerleşik HCI ilkelerine göre yönlendirilir. Bunlar şunları içerir:

:::tip[Key UI Principles]

* **Açıklık:** Arayüz net olmalıdır. Simgeler, etiketler ve düzenler amaçlarını ve işlevlerini açıkça belirtmelidir.
* **Tutarlılık:** Uygulama genelinde tutarlı bir tasarım dili (ör. düğme stilleri, gezinme modelleri), kullanıcıların bilgiyi sistemin bir bölümünden diğerine aktarmasına olanak tanıyarak öğrenmeyi hızlandırır.
* **Geri bildirim:** Sistem, kullanıcı eylemleri için anında ve net geri bildirim sağlamalıdır (ör. eşzamansız bir istek için yükleme döndürücü, form gönderimi üzerine bir başarı mesajı).
* **Görsel Hiyerarşi:** Öğelerin düzeni ve stili, kullanıcının dikkatini sayfadaki en önemli bilgilere ve eylemlere yönlendirmelidir.

:::

* **Bir Arayüz Mühendisliği:** Yazılım mühendisliği açısından bakıldığında, kullanıcı arayüzü tasarımı **bileşen tabanlı mimariler** (ör. React, Vue, Angular) aracılığıyla uygulanır. Yeniden kullanılabilir kullanıcı arayüzü bileşenleri, tasarım desenleri ve stil yönergelerinden oluşan merkezi bir depo görevi gören bir **Tasarım Sistemi** sıklıkla geliştirilir. Bu, programatik olarak tutarlılığı güçlendirir ve tasarımı temeldeki iş mantığından ayırarak modülerliği ve sürdürülebilirliği teşvik eder.

### 2.2 Kullanıcı Deneyimi (UX) Tasarımı

Kullanıcı Deneyimi tasarımı, kullanıcı yolculuğunun tamamını kapsayan daha geniş, daha stratejik bir disiplindir. Kullanıcı arayüzü arayüzün *görünümü ve hissiyatıyla* ilgilenirken, UX deneyimin *genel hissiyatıyla* ilgilenir.

* **UX Süreci:** UX tasarımı, yazılım gereksinimleri mühendisliği aşamasına paralel olan sistematik, veriye dayalı bir süreçtir.

1. **Araştırma:** Röportajlar, anketler ve rekabet analizi gibi tekniklerle son kullanıcıyı anlamak.
2. **Tanım:** **Kullanıcı kişilikleri** (arketip kullanıcı profilleri) ve **kullanıcı yolculuk haritaları** (kullanıcının sistemle etkileşimini görselleştirme) gibi eserlerle araştırmayı sentezlemek.
3. **Fikir ve Tasarım:** Tasarım çözümlerini keşfetmek ve doğrulamak için düşük kaliteli **tel çerçeveler** (yapısal planlar) ve yüksek kaliteli **prototipler** (etkileşimli modeller) oluşturma.
4. **Test:** Önerilen tasarımdaki sorunlu noktaları ve iyileştirilecek alanları belirlemek için gerçek kullanıcılarla **kullanılabilirlik testi** oturumları düzenlemek.

* **UX ve Gereksinimler:** UX süreci sırasında üretilen eserler, yazılım geliştirme için paha biçilmez girdilerdir. Kullanıcı yolculuğu haritası, çevik bir iş akışında kullanıcı hikayelerinin oluşturulmasına doğrudan bilgi verir. Kullanılabilirlik testi sonuçları, verimlilik ve öğrenilebilirlikle ilgili işlevsel olmayan gereksinimleri sağlar. UX, kullanıcı ihtiyaçları ile teknik özellikler arasındaki boşluğu doldurur.

## 3.0 Mühendislik Vakfı: Web Geliştirmede Yazılım Mühendisliği

UI/UX tasarımlarının işleyen bir uygulamaya dönüştürülmesi, kendisi de yazılım mühendisliği ilkelerinin özel bir uygulaması olan web geliştirme alanıdır. Genellikle ön uç ve arka uç geliştirme olarak ikiye ayrılır.

### 3.1 Ön Uç Geliştirme

Ön uç, uygulamanın istemci tarafıdır; yani kullanıcının web tarayıcısında çalışan koddur. Birincil sorumluluğu kullanıcı arayüzünü oluşturmak ve kullanıcı etkileşimlerini yönetmektir.

* **Temel Teknolojiler:** Web'in temeli üç dil üzerine kurulmuştur:
* **HTML (HyperText Markup Language):** Web sayfasının anlamsal yapısını ve içeriğini tanımlar.
* **CSS (Basamaklı Stil Sayfaları):** HTML içeriğinin sunumunu, stilini ve düzenini belirtir.
* **JavaScript:** Etkileşim sağlar, dinamik içerik güncellemelerini etkinleştirir, olay işlemeyi ve sunucuyla iletişimi sağlar.

:::note[Example: Basic HTML Structure]

```html title="index.html"
<!DOCTYPEhtml> 
<html lan g=tr"> 
<kafa> 
<meta karakter kümesi = "UTF-8"> 
<title>Web Tasarım Örneği</title> 
<link rel = "stylesheet" href = "styles.css"> 
</head> 
<gövde> 
<h1>Merhaba, Web Tasarımı!</h1> 
<p>Bu basit bir web sayfası yapısıdır.</p> 
<script sr c="script.js"></script> 
</body> 
</html> 
```

:::

* **Modern Çerçeveler:** Modern uygulamaların karmaşıklığını yönetmek için ön uç geliştirme, büyük ölçüde **React, Angular ve Vue.js** gibi JavaScript çerçevelerine ve kitaplıklarına dayanır. Bu araçlar, bildirime dayalı, bileşen tabanlı bir paradigmayı teşvik ederek geliştiricilerin ölçeklenebilir ve bakımı yapılabilir kullanıcı arayüzleri oluşturmasına olanak tanır. Temel mühendislik kavramları arasında **durum yönetimi**, **bileşen yaşam döngüsü** ve kodu üretim için aktarmak ve bir araya getirmek amacıyla derleme araçlarının (ör. Webpack, Vite) kullanımı yer alır.

### 3.2 Arka Uç Geliştirme

Arka uç, uygulamanın sunucu tarafıdır. İş mantığından, veri kalıcılığından, kimlik doğrulamasından ve bir API aracılığıyla ön uca veri sağlanmasından sorumludur.

* **Sorumluluklar:** Temel arka uç endişeleri şunları içerir:
* **Sunucu Tarafı Mantığı:** Uygulamanın temel işlevlerinin uygulanması.
* **Veri Tabanı Yönetimi:** Verileri depolamak ve almak için veritabanlarıyla (ör. PostgreSQL gibi **SQL**, MongoDB gibi **NoSQL**) etkileşim kurma.
* **API (Uygulama Programlama Arayüzü):** Ön ucun verileri nasıl talep edebileceğine ve işleyebileceğine ilişkin bir sözleşme tanımlama. **REST (Temsili Durum Transferi)** ve **GraphQL**, bu API'lerin tasarımında kullanılan iki baskın mimari stildir.
* **Teknoloji Yığını:** Arka uç geliştirme, çok çeşitli programlama dilleri (ör. Node.js, Python, Java, Go, PHP) ve çerçeveleri (ör. Express.js, Django, Spring Boot) içerir.

## 4.0 İşlevsel Olmayan Emirler: Güvenlik ve Performans

İşlevsel ancak güvenli olmayan veya yavaş bir web uygulaması başarısız bir sistemdir. Güvenlik ve performans, tasarım ve geliştirme süreci boyunca entegre edilmesi gereken kritik, işlevsel olmayan gereksinimlerdir.

### 4.1 Web Güvenliği

Web uygulaması güvenliği, web sitelerini ve web hizmetlerini kötü niyetli saldırılara, yetkisiz erişime ve veri ihlallerine karşı koruma uygulamasıdır. **"Sola Kaydırma"** güvenlik zihniyetini benimsemek (tasarımın ilk aşamalarından itibaren güvenlik hususlarını entegre etmek) çok önemlidir.

* **Yaygın Güvenlik Açıkları:** **OWASP (Açık Web Uygulama Güvenliği Projesi) İlk 10**, en kritik web güvenliği risklerinin bir listesini sağlar.

:::caution[Critical Security Risks]

* **Enjeksiyon Saldırıları (örn. SQL Enjeksiyonu):** Kötü amaçlı veriler, bir komutun veya sorgunun parçası olarak yorumlayıcıya gönderilerek istenmeyen yürütmeye yol açar.
* **Siteler Arası Komut Dosyası Çalıştırma (XSS):** Kötü amaçlı komut dosyaları güvenilir web sitelerine enjekte edilir ve kurbanın tarayıcısında çalıştırılır.
* **Bozuk Kimlik Doğrulama:** Kimlik doğrulama veya oturum yönetimi mantığındaki kusurlar, saldırganların kullanıcı hesaplarının güvenliğini aşmasına olanak tanır.

:::

* **Azaltma Stratejileri:** Savunma amaçlı kodlama ve mimari modeller önemlidir. Bunlar arasında katı **giriş doğrulama**, **çıkış kodlama**, parametreli sorgular (SQLi'yi önlemek için), sağlam bir **İçerik Güvenliği Politikası (CSP)** uygulanması ve **OAuth 2.0** gibi güvenli kimlik doğrulama protokollerinin kullanılması yer alır. Tüm veri aktarımları **HTTPS (TLS üzerinden HTTP)** kullanılarak şifrelenmelidir.

### 4.2 Web Performansı Optimizasyonu

Web performansı, bir web sitesinin hızının ve yanıt verebilirliğinin nesnel ölçümünü ve algılanan kullanıcı deneyimini ifade eder. Düşük performans, yüksek kullanıcı terk etme oranları ve zayıf arama motoru sıralamalarıyla doğrudan ilişkilidir.

* **Önemli Ölçümler:** Google'ın **Önemli Web Verileri**, kullanıcı deneyimini ölçmek için standartlaştırılmış bir dizi ölçüm sağlar:
* **En Büyük İçerikli Boya (LCP):** Yükleme performansını ölçer.
* **İlk Giriş Gecikmesi (FID):** Etkileşimi ölçer.
* **Kümülatif Düzen Kayması (CLS):** Görsel stabiliteyi ölçer.
* **Optimizasyon Teknikleri:** Performans, ön uç ve arka uç stratejilerinin birleşimi yoluyla tasarlanmıştır:

:::tip[Performance Best Practices]

* **Varlık Optimizasyonu:** CSS/JavaScript'in küçültülmesi, görüntülerin sıkıştırılması ve modern biçimlerin (ör. WebP) kullanılması.
* **Önbelleğe Alma:** Varlıkları kullanıcıya daha yakın depolamak için tarayıcı önbelleğe alma ve **İçerik Dağıtım Ağlarından (CDN'ler)** yararlanılır.
* **Kod Optimizasyonu:** Ekran dışı varlıklar için yavaş yükleme gibi tekniklerin uygulanması ve uzun süren JavaScript görevlerinin karmaşıklığının azaltılması.
* **Sunucu Optimizasyonu:** Verimli veritabanı sorguları ve arka uç mantığı aracılığıyla sunucu yanıt süresini (İlk Bayta Kadar Geçen Süre - TTFB) en aza indirme.

:::

## 5.0 Sonuç

Web tasarımı, yazılım mühendisliği merceğinden bakıldığında kendisini son derece teknik ve işbirliğine dayalı bir disiplin olarak ortaya koyar. Monolitik bir faaliyet değil, HCI, sanat, mimari ve güvenlik mühendisliğinin bir sentezidir. Bir web uygulamasının başarılı tasarımı, kullanıcı merkezli tasarım süreçlerinin kusursuz entegrasyonuna, sağlam yazılım mühendisliği uygulamalarına ve güvenlik ve performansa sürekli odaklanmaya bağlıdır.

Web tasarımının geleceği, web ve yerel uygulamalar arasındaki çizgiyi bulanıklaştıran **Progresif Web Uygulamalarının (PWA'lar)** yükselişi, performans açısından kritik görevler için **WebAssembly**'nin giderek daha fazla benimsenmesi ve **AI odaklı araçların** hem tasarım hem de geliştirme süreçlerini artırma potansiyeli ile daha da fazla entegrasyona ve karmaşıklığa işaret ediyor. Yazılım mühendisi için web, bütünsel ve çok yönlü beceri gerektiren dinamik ve zorlu bir platform olmaya devam ediyor.
