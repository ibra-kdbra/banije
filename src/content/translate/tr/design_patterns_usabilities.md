---
originalSlug: "design_patterns_usabilities"
lang: "tr"
title: "Mimarin Zihni: Tasarım Desenlerini ve Pragmatizmi Dengelemek"
published: 2026-04-08
description: "Klasik nesne yönelimli yapılardan modern dağıtık sistemlere ve yapay zeka destekli orkestrasyona kadar tasarım desenlerinin faydaları ve tuzakları üzerine derinlemesine bir inceleme."
image: "/images/posts/design-patterns-blueprint.webp"
tags: [Mimari, Tasarım Desenleri, Yapay Zeka]
category: "Mimari"
draft: false
---

## Mimarin İkilemi: Plan mı, Yük mü?

Yazılım mimarisinin kulelerinde, **Tasarım Desenleri**'nden adeta kutsal geometri gibi bahsederiz. Bir junior geliştirici için gizli bir el sıkışma gibi görünür; alaycı bir gazi için ise genellikle "Merhaba Dünya"yı beş arayüz ve bir fabrika gerektiren gereksiz soyutlama katmanları gibi görünür.

Ancak projeleri "spagetti mimaride" boğulmaktan kurtarmak zorunda kalmış bir Teknik Çözüm Mühendisi olarak size şunu söyleyebilirim: Tasarım desenleri sadece kullanışlı değil; ölçeklenebilir sistemlerin **evrensel dilidir** [^1]. Ancak değerleri karmaşıklıklarında değil, insan düşüncesini standartlaştırma yeteneklerindedir.

---

### Mimari vs. Tasarım Desenleri: Farkı Bilmek

Fayda hakkında tartışmadan önce, bu terimleri birbirinin yerine kullanmayı bırakmalıyız.

* **Yazılım Mimari** "Makro"dur. Yüksek seviyeli yapıdır (Mikroservisler, Monolit, Olay Güdümlü). Değiştirmesi zor kararlarla ilgilidir: "Servislerimiz nasıl konuşuyor?" veya "Veri nerede yaşıyor?" [^2].
* **Tasarım Desenleri** "Mikro"dur. O mimari içindeki tekrarlayan sorunlara yönelik yerelleştirilmiş çözümlerdir. Mimariyi bir evin kat planı gibi düşünün ve Tasarım Desenlerini ışık anahtarlarını kablolama şekliniz olarak düşünün.

### Gerçek Değer: İletişim Hızı

Bir desenin en büyük faydası kodun kendisi değil; **zihinsel kısayoldur**. Bir mühendis ekibine, *"Bir durum değiştiğinde birden fazla hizmeti sıkı bir bağımlılık olmadan bildirmek için bir yola ihtiyacımız var,"* dersem, bir saat tartışabiliriz. Eğer, *"Buraya bir Observer deseni uygulayalım,"* dersem, herkes veri akışını, kısıtlamaları ve sorumlulukları hemen anlar [^3].

::interactive{id="perspective-diagram" src="/images/posts/angles-of-elevation.webp" data="src/data/interactive/angles.json" overview="Tıpkı bu diyagramın karmaşık bir uzamsal ilişkiyi açıklamak için standartlaştırılmış bir dil kullanması gibi, Yazılım Mimarisi de karmaşık sistem davranışlarını bir ekip boyunca anında iletmek için evrensel bir kısayol olarak Tasarım Desenlerine dayanır."}

Desenler, "tekerleği yeniden icat etme"nin bilişsel yükünü azaltır. Küresel durumu yönetmenin zekice bir yolunu her "icat ettiğinizde", aslında sadece bir **Singleton** veya **State** deseninin (muhtemelen hatalı) bir sürümünü oluşturuyorsunuz. Yerleşik sürümü kullanmak, ücretsiz olarak onlarca yıllık uç durum testinin faydasını elde ettiğiniz anlamına gelir.

### Evrim İçin "Güvenlik Ağı"

İyi mimari **kararları ertelemeyle** ilgilidir. Tasarım desenleri sisteminize "prizler" oluşturmanıza olanak tanır. Bir **Adapter** veya **Strategy** deseni kullanarak, sadece kodu "güzel" yapmıyorsunuz; yıllar sonra, iş mantığı AWS S3'ten Azure Blob Storage'a geçmeye karar verdiğinde, tüm çekirdek mantığınızı yeniden yazmak zorunda kalmayacaksınız. Sadece uygulamayı değiştireceksiniz [^4].

:::note[Mimarın Gerçeği]
Desenleri kodu "zeki" yapmak için kullanmıyoruz. Kodu **sıkıcı** yapmak için kullanıyoruz. Sıkıcı kod öngörülebilirdir. Öngörülebilir kod bakımı yapılabilir.
:::

---

## Karanlık Taraf: Desenler Sorun Olduğunda

Kariyerimde, "spagetti kod"dan daha çok projeyi **aşırı mühendisliğin** öldürdüğünü gördüm. Sektörümüzde "Patternitis" adı verilen belirli bir hastalık var, bu da her sorunu, uysun ya da uymasın, ders kitabından bir tasarım desenine uydurma dürtüsüdür.

### 1. Soyutlama Vergisi

Bir tasarım deseni uyguladığınız her seferinde bir **Soyutlama Vergisi** ödersiniz. Uzun vadeli esneklik için anlık kod okunabilirliğinden ödün verirsiniz. Gerçekten değişmeyecek bir mantık parçası için bir **Factory Provider Pattern** kullanırsanız, kodu "daha iyi" yapmamış olursunuz; aslında, hata ayıklamayı daha da zorlaştırmış olursunuz.

:::important[Kaba Taslak Kural]
Soyutlama, belirli, öngörülen bir acı noktasını çözmüyorsa, sadece gürültüdür. Karmaşıklık, bir derleme çalıştırdığınızda veya yeni bir işe alım yaptığınızda her seferinde faizini ödediğiniz bir borçtur.
:::

### 2. Altın Çekiç Yanılgısı

Tasarım Desenleri hakkında yeni bir kitap bitirmiş ve şimdi her sorunu bir **Strategy Pattern** olarak gören mühendisle tanıştık. Bu, bir desenin neden "en iyi uygulama" olduğu düşünüldüğü için, ödünleşmeleri anlamadan kullanıldığı "Kargo Kültü Programcılığına" yol açar.

### 3. YAGNI: Mimarın En Sevdiği Kısaltma

**YAGNI** (*İhtiyacın Olmayacak*) aşırı hevesli desen kullanıcısının doğal düşmanıdır [^5]. Mimari seçimi **hedeflerle** değil, **gereksinimlerle** yönlendirilmelidir. İkinci dinleyici olduğunda yeniden düzenleyeceğiz. O zamana kadar, basit tutun.

---

## Seçim Matrisi: Tetik Çekme Zamanı

Bir Yazılım Mimarı olarak görevim desenleri kullanmanın yollarını bulmak değil; mümkün olan en az "sihir" ile iş problemlerini çözmenin yollarını bulmaktır. Ancak, bir desenin alternatifi (kaos) kadar ucuz olduğu bir noktaya gelir.

### 1. Boyut: Değişim Sıklığı

Bu en kritik metriktir. Bir kod parçası bir kez yazılıp nadiren dokunulursa, onu karmaşık bir **Decorator** veya **Bridge** deseniyle sarmak zaman kaybıdır. Desenleri "değişim bölgelerine", yani Git geçmişinizdeki en çok commit içeren alanlara uygulayın.

### 2. Boyut: Üçler Kuralı

Mimaride **Üçler Kuralı**'nı takip ederiz [^6]:

1. **İlk kez:** Kodu yazarsınız. Çalışmasını sağlarsınız.
2. **İkinci kez:** Kopyala-yapıştır yaptığınız için suçluluk duyarsınız. Genelleştirme dürtüsüne karşı koyarsınız.
3. **Üçüncü kez:** Resmi olarak tekrarlayan bir sorun bulmuşsunuz demektir. **Şimdi** deseni uygulayın.

### 3. Boyut: Ekip Ölçeği (Bilişsel Yük)

Mimari seçimi teknoloji kadar **psikolojiyle** de ilgilidir. Çok sayıda junior geliştirici veya yüksek işten çıkarma oranına sahip hızlı hareket eden bir startup yönetiyorsam, **Okunabilirlik için Genişletilebilirliği** önceliklendiririm. Bu bağlamda, "zeki" bir desen bir yük oluşturur çünkü giriş için yüksek bir engel oluşturur.

| Sorun Türü | Mimari Sorun Noktası | Önerilen Desen Kategorisi |
| :--- | :--- | :--- |
| **Nesne Oluşturma** | Testi imkansız hale getiren sıkı bağımlılıklar. | **Yapısal** (Bağımlılık Enjeksiyonu, Factory) |
| **Uyumluluk** | Eski sistemler yeni mikroservislerimizle konuşmuyor. | **Yapısal** (Adapter, Facade) |
| **İletişim** | Servis A, Servis B'nin varlığından "haberdar olmadan" Servis B'nin ne yaptığını bilmeli. | **Davranışsal** (Observer, Mediator) |
| **Durum Büyümesi** | Nesne durumunu yöneten büyük `switch` ifadeleri veya `if/else` zincirleri. | **Davranışsal** (State, Strategy) |

---

## Desen Evrimi: Gang of Four'un Ötesinde

Klasik tasarım desenleri çoğunlukla 90'larda tek işlemcili sistemler için kavramsallaştırılmıştır [^7]. Bugün, IDE'lerde geçirdiğimiz kadar zamanı bulutta da geçiriyoruz. Bu değişim, desenlerimizi dahili kod yapılarından **dağıtık sistem davranışlarına** evrilmeye zorladı.

### Nesnelerden Servislere

Ayrıştırma mantığı aynı kalır, ancak uygulama ağ katmanına taşınmıştır:

* **Observer**, **Pub/Sub Mesajlaşma** (Kafka, RabbitMQ, SNS/SQS) olur.
* **Singleton**, **Global Konfigürasyon Deposu** veya **Dağıtık Önbellek** (Redis) haline gelir.
* **Facade**, aşağı akış mikroservislerinin karmaşıklığını gizlemek için **API Gateway** olur [^8].

### Dayanıklılık Desenlerinin Yükselişi

Modern mimaride en önemli desenler, uzak çağrıların kaçınılmaz başarısızlığını yönetir [^9]:

* **Devre Kesici:** Başarısız bir hizmetin kümenizde zincirleme bir başarısızlığa neden olmasını önler [^10].
* **Yan Pod Deseni:** Çapraz kesen endişeleri (günlükleme, güvenlik) uygulama kodundan ayrı bir kapsüle taşır [^11].
* **Saga Deseni:** Sonunda tutarlılığı korumak için telafi edici ("geri al") mantık ile yerel işlemler dizisi olarak dağıtık işlemleri yönetir [^12].

---

## Pragmatik Mimarın Manifestosu: LLM Çağında Mühendislik

2026'da en büyük soru sadece hangi desenin kullanılacağı değil; kimin (veya neyin) kullandığıdır. Yapay zeka destekli araçlar artık dünyanın tek kalıplı kodunun %40'ını ürettiğinden, Yazılım Mimarının rolü "Usta Yazıcı"dan **"Niyet Orkestratörü"**ne kaymıştır.

### 1. Desenler Yerine İlkeler

* **Dogma Yerine Bağlam:** Hiçbir desen boşlukta "en iyi uygulama" değildir.
* **Zekâ Yerine Sürdürülebilirlik:** Bir yapay zeka, bir insanın hata ayıklayamayacağı karmaşık bir desen üretirse, başarısız olmuş demektir.
* **Soyutlama Yerine Değer:** Desen gelecekteki değişiklik maliyetini azaltmıyorsa, bu **Teknik Kaplama**'dır.

### 2. Yapay Zeka Faktörü: "Vibe Kodlama" vs. Mühendislik

Doğal dilde bir sistemi tanımlayabileceğiniz **"Vibe Kodlama"** çağına giriyoruz. Bu, Tasarım Desenlerini *daha* önemli hale getirir, çünkü yapay zeka, verimsiz olsalar bile popüler desenleri önermeyi sever. Mimarın görevi **Korumaya Almak** olmaktır.

:::tip[Çözüm Mühendisi'nden İpucu]
Deseni *uygulamak* için yapay zekayı kullanın, ancak *seçmesine* asla izin vermeyin. Yapay zekaya şunu söyleyin: "Bunu bir Strategy Pattern kullanarak uygula", sadece şunu sormayın: "Bunu nasıl ele almalıyım?"
:::

### 3. Yeni GoF: Ajans ve Dağıtık Desenler

Alfabe, **Ajans İş Akışlarına** doğru evriliyor:

* **Orchestrator Deseni:** Birden fazla uzman yapay zeka ajansını yönetme.
* **Guardrail Deseni:** Olasılıksal LLM çıktısını doğrulayan deterministik bir katman.
* **Prompt-as-Code Deseni:** Yapay zeka talimatlarını kaynak koduyla aynı sürüm kontrolü ve test titizliğiyle ele alma.

---

## Sonuç: İnsan Hendek

Tasarım desenleri gerçekten kullanışlı mı? **Evet.** Ama bir kural listesi olarak değil. Tekrarlayan sorunları çözmek için bir **Zihinsel Çerçeve**dir. İstediğiniz herhangi bir kodu yazabilen bir yapay zeka dünyasında, sizi vazgeçilmez kılan "İnsan Hendek" **Tasarım Yargısı**'dır.

Mimari seçimi nihayetinde **hayır deme sanatıdır**. Anlaşılması kolay, değiştirilmesi kolay ve her şeyden önce silinmesi kolay sistemler inşa eden mimar olun.

---

## Kaynaklar

[^1]: [Refactoring.Guru - Tasarım Desenleri](https://refactoring.guru/design-patterns)
[^2]: [Martin Fowler - Yazılım Mimarisi Rehberi](https://martinfowler.com/architecture/)
[^3]: [Wikipedia - Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
[^4]: [Microsoft Learn - Strategy Pattern](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#the-strategy-pattern)
[^5]: [Martin Fowler - YAGNI](https://martinfowler.com/bliki/Yagni.html)
[^6]: [Wikipedia - Üçler Kuralı (bilgisayar programcılığı)](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
[^7]: [Gang of Four - Tasarım Desenleri: Yeniden Kullanılabilir Nesne Yönelimli Yazılımın Öğeleri](https://en.wikipedia.org/wiki/Design_Patterns)
[^8]: [Microsoft Learn - API Gateway Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)
[^9]: [Azure Mimari Merkezi - Bulut Tasarım Desenleri](https://learn.microsoft.com/en-us/azure/architecture/patterns/)
[^10]: [Azure Mimari Merkezi - Circuit Breaker Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
[^11]: [Azure Mimari Merkezi - Sidecar Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar)
[^12]: [Azure Mimari Merkezi - Saga Design Pattern](https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)
