---
title: "Mimarın Yapay Zeka Yığını: 2025 Tekillik Sürümü"
published: 2025-12-31
description: "Yüksek Lisans sonrası dönem için eksiksiz, kitap uzunluğunda teknik manifesto. Birleşik Aracı Mimarilerin, Kalıcı Bellek Katmanlarının ve Model Bağlam Protokolünün 100.000 metrelik görünümü."
image: '/images/posts/architect-ai.png'
tags: [AI, Architecture, Future-Tech]
category: Engineering
draft: false 
lang: "tr"
originalSlug: "ai-tools"
series:
    name: "AI Foundations"
    order: 4

---

## "Ortak Pilotluktan Kurucu Ortaklığa"

## İçindekiler

1. **2025'in Ontolojisi: Sistem 2 ve "Sohbet"in Ölümü**
2. **Fronier Engines: Derinlemesine Teknik Bir İnceleme**

* GPT-5.1 ve Kalıcı Bellek Katmanı (PML)
* Claude 4.5 Opus: Derin Düşünür
* Gemini 3 Flash: Gerçek Zamanlı Temsilci

3. **Sinir Sistemi: Model Bağlam Protokolü (MCP)**

* Mimari ve Güvenlik
* Açık Kaynak Sunucu Ekosistemi

4. **Ajanslı Çalışma Alanı: IDE'ler ve IAD'ler**

* Rüzgar Sörfü ve Şelaleler
* İmleç ve Besteci V2
* Cline: Açık Orkestratör

5. **Yerel Egemenlik: Özel Yığın**

* DeepSeek-R2 ve Damıtma
* "Model İşletim Sistemi": Ollama v2

6. **Operasyonel Zeka: Test Etme ve CI/CD**

* Davranışsal Doğrulama (Qodo)
* "Döngüdeki Ajan" Boru Hattı

---

## 1.0 2025'in Ontolojisi: Sistem 2 ve "Sohbet"in Ölümü

2024'ün arayüzü "Chatbot" öldü. Yapay zekaya mesaj göndermemiz gereken çok akıllı bir insan gibi davrandığımız bir geçiş aşaması olan skeuomorfik bir köprüydü.

2025'in sonlarına doğru arayüz **Bağlam** olacaktır. Artık yapay zeka ile "sohbet etmiyoruz"; AI'nın işletim sisteminin her yerde mevcut, durum bilgisi olan bir katmanı olduğu bir çalışma alanında *yaşıyoruz*. Bu yılın belirleyici değişimi **Olasılığa Dayalı Jeton Üretimi**'nden (Sistem 1) **Akıl Yürütme-İlk Planlama**'ya (Sistem 2) geçiştir.

### 1.1 "Hızlı Mühendisin" Çöküşü

"Hızlı Mühendislik", **"Bağlam Mühendisliği" ile değiştirildi.** Artık modeli akıllı olması için kandıramazsınız; modeller (GPT-5, Opus 4.5) artık ham mantık açısından ortalama bir asistan mühendisten daha akıllıdır. Mimarın işi artık kesinlikle **Kaynak Yönetimi**:

* *Bu görevi hangi modele yönlendireceğim?*
* *Ne kadar bağlama ihtiyacı var?*
* *İzin sınırları nelerdir?*

---

## 2.0 Frontier Engines: Derinlemesine Teknik Bir İnceleme

"Üç Büyük" belirli evrimsel nişlere ayrılmış durumda. Artık "Hangisi en iyisi?" diye sormuyoruz. ama "özel iş yüküne hangisi uyuyor?"

### 2.1 GPT-5.1 ve Kalıcı Bellek Katmanı (PML)

**OpenAI (Yayınlandı: Ağu 2025 / Önizleme: Aralık 2025)**

GPT-5 "Genel İstihbaratın" zirvesini temsil eder. Ancak 5.1 Önizlemedeki tanımlayıcı özelliği **PML'dir (Kalıcı Bellek Katmanı)**.

#### 2.1.1 PML'nin Teknik Mimarisi

PML, RAG (Geri Alma Artırılmış Üretim) değildir. RAG bir arama motorudur; belgeleri bulur. PML bir **Durum Makinesidir**.

* **Vektör ve Grafik:** Geleneksel RAG, vektör yerleştirmeleri (bulanık eşleştirme) kullanır. PML bir **Bilgi Grafiği** kullanır. Bir görüşmede bir değişken tanımladığınızda, GPT-5.1 bunu projeye özgü bir grafikte bir düğüm olarak eşler.
* **"Yazma" İşlemi:** Kullanıcı bir kısıtlama oluşturduğunda (örneğin, "Tüm tarihler UTC olmalıdır"), model bir işlem gerçekleştirir`MEM_WRITE`Operasyon. Bu atomik ve kalıcıdır.
* **"Uygulama" Katmanı:** Gelecekteki herhangi bir kodu oluşturmadan önce model, grafiğin üzerinden geçer. Oluşturulan bir belirtecin bir kısıtlama düğümünü ihlal etmesi durumunda (ör.`new Date()`yerine`moment.utc()`), logitler belirteç yayınlanmadan *önce* bastırılır.

:::tip[Architectural Impact]
Bu, **"Sıfır Atışla Katılım"** olanağı sağlar. Yeni bir sohbet oturumu sıfırdan başlamaz; projenin Bilgi Grafiğinin tam durumundan başlar.
:::

### 2.2 Claude 4.5 Opus: Derin Düşünür

**Antropik (Yayınlandı: Kasım 2025)**

GPT-5 CEO ise Claude 4.5 Opus Baş Araştırmacıdır. Yavaş, pahalı ve son derece zekice.

#### 2.2.1 2 Milyonluk Jeton "Mükemmel Geri Çağırma"

Claude 4.5 daha önce imkansız olanı başarıyor: **Ölçekli Doğrusal Dikkat**. **%99,93 Samanlıktaki İğne geri çağırma** ile 2.000.000 jeton içerik penceresi (yaklaşık 15.000 kod dosyası) barındırabilir.

* **Kullanım Örneği: "Büyük Yeniden Düzenleyici"**
Claude 4.5'i tam bir eski Java monolitiyle besleyebilir ve şunu sorabilirsiniz: *"Yarış koşullarına neden olan Singleton modelinin her örneğini tanımlayın ve bunları Dependency Injection kullanacak şekilde yeniden yazın."*
45 saniye boyunca düşünecek (Sistem 2 duraklaması) ve ardından tek bir içe aktarma yolunun halüsinasyonunu görmeden 400 dosyaya dokunan bir planın çıktısını alacak.

### 2.3 Gemini 3 Flash: Gerçek Zamanlı Temsilci

**Google (Yayınlanma: Aralık 2025)**

Gemini 3 Flash yapay zekanın ekonomisini değiştirdi. **Çok Modlu Yerel** ve **Gecikme Optimize Edilmiştir**.

* **"0,2s" Bariyeri:** Gemini 3 Flash, bir kullanıcı arayüzü hatasının ekran görüntüsünü alabilir, metni OCR'layabilir, günlükleri ayrıştırabilir ve 200 milisaniyeden kısa bir sürede bir düzeltme önerebilir.
* **Agentic Loops:** Çok ucuz olduğundan (0,10 ABD doları / 1 milyon jeton), artık onu "Kaba Kuvvet Muhakemesi" için kullanıyoruz. Aynı anda 50 farklı hata düzeltmesini denemek için 50 paralel aracı oluşturabilir, testleri çalıştırabilir ve kullanıcıya yalnızca başarılı olanı sunabiliriz.

---

## 3.0 Sinir Sistemi: Model Bağlam Protokolü (MCP)

**Anthropic & Linux Foundation (2025) tarafından standartlaştırılmıştır**

2025'ten önce yapay zekayı verilere bağlamak, hassas API birleştirme kodu yazmak anlamına geliyordu. **MCP** "Zeka için USB-C"dir. *Herhangi bir modelin *herhangi* veri kaynağıyla konuşması için standart bir yol oluşturur.

### 3.1 MCP Nasıl Çalışır ("İstemci-Ana Bilgisayar-Sunucu" Modeli)

1. **MCP Ana Bilgisayarı:** Yapay zekayı çalıştıran uygulama (ör. Claude Desktop, Cursor, Cline).
2. **MCP Sunucusu:** Verileri açığa çıkaran hafif, korumalı alana alınmış bir işlem.
3. **MCP İstemcisi:** Yapay zeka modelinin kendisi.

```json title="Example: The Anatomy of an MCP Request"
// The AI wants to check a database.
// It sends a JSON-RPC message to the Host.
{
  "jsonrpc": "2.0",
  "method": "callTool",
  "params": {
    "name": "postgres_query",
    "arguments": {
      "query": "SELECT * FROM users WHERE status = 'active' LIMIT 5"
    }
  }
}
// The Host validates permissions ("Does this AI have DB access?").
// The Host forwards to the Postgres MCP Server.
// The Server executes and returns the JSON result.
```

Topluluk ücretsiz MCP sunucularıyla dolup taştı. Bunları bugün yerel olarak çalıştırabilirsiniz.

| Sunucu | Yetenek | Komut |
| :--- | :--- | :--- |
| **@modelcontextprotocol/server-postgres** | Salt okunur SQL şeması incelemesi ve sorgulaması. |`docker run mcp/postgres`|
| **@modelcontextprotocol/server-github** | Sorun takibi, PR incelemeleri, dosya arama. |`npx -y @mcp/server-github`|
| **@modelcontextprotocol/sunucu-dosya sistemi** | Güvenli yerel dosya erişimi (korumalı alan). |`npx -y @mcp/server-filesystem`|
| **mcp-sunucu-k8s** | Kubernetes kümesi incelemesi ve günlük okuma. |`go run mcp-k8s`|
| **mcp-sunucu-tarayıcı** | Web'de gezinmek/test etmek için başsız krom. |`npx -y @mcp/browser`|

---

## 4.0 Aracılı Çalışma Alanı: IDE'ler ve IAD'ler

"Entegre Geliştirme Ortamı" (IDE) artık kullanılmıyor. Artık **"Entegre Etmenli Ortamlar" (IAD'ler)** üzerinde çalışıyoruz.

### 4.1 Rüzgar Sörfü: "Akış" Durumu

Rüzgar Sörfü (Codeium tarafından) **"Cascades"** konseptini tanıttı.

* **Derin Bağlam Farkındalığı:** Rüzgar Sörfü yalnızca açık dosyaya bakmaz. Değişken tanımlarınızı, içe aktarma grafiğinizi ve son terminal çıktınızı indeksler.
* **Tahmin Edici Gezinme:** Arka uçtaki bir işlev imzasını değiştirirseniz, Windsurf *proaktif olarak* onu çağıran ön uç dosyasını açar ve siz derleyiciyi çalıştırmadan önce arayı vurgular.

### 4.2 Cline: Açık Kaynak Orkestratörü

Cline açık kaynak dünyasının kahramanıdır. Düzenleyiciyi **Otonom Aracıya** dönüştüren bir VS Code uzantısıdır.

* **"Hareket" Döngüsü:** Cline yalnızca kod önermez; terminal komutlarını çalıştırır. Şunları yapabilir:
  1. `npm test`(Başarısız)

  2. Hatayı okuyun.
  3. Dosyayı düzenleyin.
  4. `npm test`(Geçti)
  5. `git commit`

* **MCP Entegrasyonu:** Cline en gelişmiş MCP istemcisidir. Araçları zincirleyebilirsiniz: *"Sorunu bulmak için **GitHub MCP**'yi kullanın, verileri kontrol etmek için **Postgres MCP**'yi kullanın ve ardından düzeltmeyi yazın."*

---

## 5.0 Yerel Egemenlik: Özel Yığın

HIPAA, GDPR veya ticari sırlarla uğraşan kuruluşlar için bulut bir seçenek değildir. 2025 yılı “Yerel İstihbarat” atılımını gerçekleştirdi.

### 5.1 DeepSeek-R2: Açık Ağırlık Mucizesi

DeepSeek-R2, GPT-4o'ya rakip olan ancak tüketici donanımıyla çalışan açık ağırlıklı bir modeldir.

* **Distilasyon:** Daha büyük muhakeme modellerinden "Bilgi Damıtma" kullanılarak eğitildi ve daha az parametreyle derinlemesine "düşünmesine" olanak tanıdı.
* **Gizlilik:** DeepSeek-R2'yi yerel bir Mac Studio veya NVIDIA H100 kümesinde çalıştırarak şirketler "Hava Boşluklu Zeka" elde eder. Hiçbir veri binadan dışarı çıkmıyor.

### 5.2 Ollama v2.0: Model İşletim Sistemi

Ollama artık yerel yapay zeka için standart çalışma zamanıdır.

* **Çalışırken Değiştirme:** Ollama v2, VRAM'de yüklü olan "temel" ağırlıkları korur ve "LoRA Adaptörlerini" (Düşük Dereceli Uyarlamalar) çalışırken değiştirilebilir. 10 ms'de "Kodlama Uzmanı"ndan "Yaratıcı Yazar"a geçiş yapabilirsiniz.

---

## 6.0 Operasyonel Zeka: "İnceleme Krizi"

2025'in temel sorunu kod üretmek değil; **doğruluyor**. Kıdemsiz bir geliştirici (veya bir yapay zeka aracısı) 30 saniyede 5.000 satırlık karmaşık React mantığı oluşturabildiğinde, Kıdemli Mimar darboğaz haline gelir. **"Kod Eğimi"** çağına girdik; kod doğru görünüyor, birim testlerini geçiyor ancak incelikli mimari sapmalar getiriyor.

### 6.1 Qodo (eski adıyla Codium): "BS Dedektörü"

Qodo gibi araçlar artık "sahip olunması hoş" değil; bunlar savunma altyapısıdır. Onların asıl işi sadece test yapmak değil, **Halüsinasyonu Sınırlamak**.

* **"Güven Uçurumu":** Yapay zeka ajanlarının hatalı olduklarında bile kendilerine güvenmeleri herkesin bildiği gibi. Qodo tarafsız denetçi olarak hareket eder.
* **Özellik Tabanlı Bulanıklaştırma:** Uç durumları anlama konusunda yapay zekaya güvenemeyeceğimiz için, aracının kodunu "bulanıklaştırmak" için Qodo'yu kullanırız; mantığın nerede bozulduğunu görmek için fonksiyona milyonlarca rastgele girdi atarız.
* **Gerçeklik Kontrolü:** Üretimde Qodo'nun, yorgun bir insan incelemecinin gözden kaçırabileceği tek tek ince hatalar veya güvenlik gerilemeleri nedeniyle "Sistem 1" AI kodunun ~%40'ını reddettiğini görüyoruz.

### 6.2 Gerçekçi Boru Hattı: "Acı Döngüsü"

İdealleştirilmiş demoda, Aracı kodu yazar ve CI onu birleştirir. Gerçekte boru hattı "Ajan Saldırganlığı" ve "İnsan Yorgunluğu"nun savaş alanıdır.

**2025 İş Akışı (Gerçek Dünya):**

1. **İstem (İnsan):** Kıdemli Geliştirici **Cline**'a bir özelliği açıklıyor.
2. **"İlk Taslak" (Ajan):** Cline özelliği yazar. Mükemmel görünüyor.
3. **"Hayalet Bağımlılık" (CI Hatası):** Aracı, var olmayan bir kitaplığı içe aktardığı veya 2024'te kullanımdan kaldırılan bir paketin sürümünü kullandığı için derleme başarısız oluyor.
4. **"Yakma Hızı" Döngüsü (Ajan):**

* Temsilci hatayı görür.
*Düzeltmeye çalışır. Başarısız.
* Tekrar dener. Başarısız.
* *Sonuç:* Bir insanın 30 saniyede düzeltebileceği bir döngü için **GPT-5**'te az önce 12,00 $ API kredisi harcadınız.

5. **"İnceleme Darboğazı" (İnsan):** PR sonunda CI'yi geçer. 45 dosya değiştirildi. Kıdemli Geliştirici kapıyı açar.

* *Sorun:* Kodu okumak, yazmaktan daha zordur. Geliştirici bunu tarar, ince bir durum yönetimi hatasını gözden kaçırır ve yorgunluktan onu onaylar.

6. **Üretim (Gerçeklik):** Bu özellik çalışıyor ancak "Kalıcı Bellek", kod tabanının karmaşıklığının %15 arttığını belirtiyor. Teknik borç artık otomatik olarak oluşturuluyor.

### 6.3 Gizli Maliyet: Mimari Entropi

2025'in tehlikesi "Skynet" değil; **Ölçekli Spagetti Kodu**'dur.

* **Tutarsızlık:** Ajan A (Claude kullanarak) Functional React yazıyor. Aracı B (GPT-5 kullanarak) OOP tarzı Sınıf bileşenlerini yazar. Kod tabanı bir tarzlar şizofrenisi haline geliyor.
* **Şişkinlik:** Yapay zeka ajanları "yeniden düzenleme" yerine "kod eklemeyi" tercih ediyor. Eski mantığı nadiren silerler; sarıyorlar. Bir yıldan fazla bir süre içinde bu, büyük ve sürdürülemez bir uygulama şişkinliğine yol açar.

---

## 🎯 Sonuç: "Kapıcı" Olarak Mimar

Bu yeni çağın "100.000 kelimesi"ni biz yazmıyoruz; tasarladığımız sistemler tarafından üretilirler. Ve bu kelimelerin çoğu çöp.

2025'in sonlarında Mimar'ın rolü "İnşaat Ustası"ndan **"Uzman Editör"e değişti.** Artık *yaratma* konusunda darboğaz değiliz; *kalitede* darboğaz biziz.

**Yığın'ın Son Gerçeği:**

1. **Yapay Zeka, Miktarı üretir.**
2. **İnsanlar Kaliteyi zorunlu kılar.**
3. **Yığın, ikisi arasındaki çatışmayı yönetmek için mevcuttur.**

Artık işiniz kod yazmak değil. İşiniz, yapay zekanın temiz mimarinizi eski bir kabusa dönüştürmesini önleyen "bağışıklık sistemini" (MCP, Qodo, katı Kısıtlamalar) oluşturmaktır.

Heavy Stack'a hoş geldiniz. Kaskını tak.
