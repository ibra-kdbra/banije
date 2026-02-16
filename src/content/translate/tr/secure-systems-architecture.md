---
title: "Güvenli Sistem Mimarisi - Çok Perspektifli Bir Mühendislik İncelemesi"
published: 2025-09-11
description: "Ağ güvenliği temellerini, derinlemesine savunma stratejilerini, tehdit modellemeyi ve güvenli geliştirme uygulamalarını birden fazla profesyonel perspektiften kapsayan güvenli sistem mimarisi."
image: ''
tags: [Security, Network Security, Threat Modeling, Defense-in-Depth, Cybersecurity, Secure Development]
category: Guide
draft: false
lang: "tr"
originalSlug: "secure-systems-architecture"
series:
  name: "Security Architecture"
  order: 1

---

## İçeriye Hızlı Bir Bakış 

Bunu, modern yazılım sistemlerini ve ağlarını sıfırdan oluşturma ve savunma konusunda pratik, uygulamalı rehberiniz olarak düşünün. 

Bu kılavuzu farklı kılan yaklaşımımızdır. Fiziksel ağ kablolarından uygulama koduna kadar tüm teknoloji yığınına, bunları her gün yaşayan ve soluyan dört kişinin gözünden bakacağım: 

* Temeli oluşturan **Ağ Mühendisi**. 
* Onu koruması gereken **Siber Güvenlik Savunucusu**. 
* Bunu kırmaya çalışan **Saldırgan Hacker**. 
* Üzerinde çalışan kodu yazan **Yazılım Mühendisi**. 

Kuru, akademik ayrıntılar olmadan temel güvenlik konularını kapsayan tam bir tur alacaksınız. Şunun gibi konuları ele alacağım: 

* Başlangıçtan itibaren saldırıya uğraması zor bir ağ tasarlamak. 
* Savunmanızı, tek bir başarısızlığın felaket olmayacağı şekilde katmanlandırmak (Derinlemesine Savunma). 
* Siber Öldürme Zincirini takip ederek saldırgan gibi düşünmek. 
* İlk günden itibaren güvenli kod yazma (Güvenli SDLC). 

--- 

## **Bölüm I: Ana Kaya - Güvenli Ağ İletişiminin Temelleri** 

### **Bölüm 1: Güvenlik Merceğiyle Yeniden İncelenen Ağ Modelleri** 

Güvenli mimariye yolculuk tüm veri iletişiminin başladığı yerde başlar: ağ. OSI veya TCP/IP modellerinin yüzeysel olarak anlaşılması yetersizdir [^1]. Bir güvenlik uzmanının her katmanı yalnızca işlevi açısından değil, saldırı yüzeyi açısından da anlaması gerekir. 

#### **1.1 Katman 1 - Fiziksel Katman: Somut Tehdit** 

* **Ağ Mühendisinin Görüşü:** Bu katman kabloların, fiber optiklerin, anahtarların ve hub'ların dünyasıdır. Birincil endişe fiziksel bağlantı, sinyal bütünlüğü ve donanım tedariğidir. Her şeyin üzerine inşa edildiği temeldir. 
* **Hacker'ın Görüşü:** Fiziksel katman, eğer erişilebilirse nihai saldırı vektörüdür. Saldırılar genellikle küstahça ama son derece etkilidir: 
* **Kablo dinleme:** Şifrelenmemiş trafiği engellemek için doğrudan ağ kablolarına bağlanma [^2]. 
* **Donanım İmplantları:** Kalıcı bir C2 (Komut ve Kontrol) kanalı oluşturmak için kötü amaçlı cihazları (ör. Raspberry Pi) güvenli bir ağ içinde bir güvenlik duvarının arkasına yerleştirmek. 
* **Bağlantı Noktası Erişimi:** Bir dizüstü bilgisayarı konferans odasındaki veya lobideki güvenli olmayan, aktif bir ağ jakına takmanız yeterlidir. 
* **Savunucunun Görüşü:** Fiziksel güvenlik ağ güvenliğidir. Savunmalar prosedürsel ve fizikseldir: kilitli sunucu odaları, devre dışı bırakılmış, kullanılmayan duvar bağlantı noktaları, katı erişim kontrolü politikaları ve donanım üzerinde kurcalanmaya karşı koruma sağlayan mühürler. Teknik açıdan bakıldığında, **IEEE 802.1X Ağ Erişim Kontrolü (NAC)**, ağa fiziksel olarak bağlanan herhangi bir cihazdan kimlik doğrulaması gerektirecek şekilde uygulanabilir [^3]. 

#### **1.2 Katman 2 - Veri Bağlantısı Katmanı: Yerel Ağ Savaş Alanı** 

* **Ağ Mühendisinin Görüşü:** Bu, MAC adresleri, anahtarlar ve yerel alan ağları (LAN'lar) alanıdır. Birincil protokoller Ethernet ve IP adreslerini (Katman 3) MAC adreslerine (Katman 2) eşleyen **ARP'dir (Adres Çözümleme Protokolü)** [^4]. Bu katman, çerçevelerin *aynı* yerel ağ bölümündeki doğru cihaza alınmasından sorumludur. 
* **Hacker'ın Görüşü:** Katman 2, örtülü bir güven modeliyle tasarlandığından saldırılar için zengin bir ortamdır. 
* **ARP Sahteciliği/Zehirlenmesi:** Saldırgan, LAN'a sahte ARP mesajları gönderir. Ağ geçidine, saldırganın MAC adresinin kurbanın IP'sine ait olduğunu söyleyebilir ve kurbana, saldırganın MAC adresinin ağ geçidinin IP'sine ait olduğunu söyleyebilirler. Bu, saldırganı konuşmanın ortasına yerleştirerek (**Ortadaki Adam, MitM**) kurbanın tüm trafiğini engellemesine veya değiştirmesine olanak tanır. [^5]. 
* **MAC Flooding:** Bir ağ anahtarına yapılan saldırı. Saldırgan, farklı kaynak MAC adreslerine sahip bir Ethernet çerçeveleri seli göndererek anahtarın CAM (İçerik Adreslenebilir Bellek) tablosunu doldurur. Tablo dolduğunda, anahtar artık çerçeveleri belirli bağlantı noktalarına akıllıca iletemez ve bir hub gibi davranarak tüm çerçeveleri tüm bağlantı noktalarına yayınlayan bir "arıza açma" moduna girer. Bu, saldırganın anahtarlanan ağdaki tüm trafiği koklamasına olanak tanır [^6]. 
* **VLAN Atlama:** Bir VLAN'a bağlı saldırganın, başka bir VLAN'da erişememesi gereken trafiğe erişim sağladığı saldırı. Bu genellikle yanlış yapılandırılmış ana hat bağlantı noktalarından yararlanılarak yapılır. [^7]. 
* **Savunucunun Görüşü:** Anahtarlar, bu saldırılarla mücadele etmek için bir dizi güvenlik özelliği sunar: 
* **Bağlantı Noktası Güvenliği:** Tek bir anahtar bağlantı noktasında kullanılabilecek MAC adreslerinin sayısını sınırlar ve yalnızca belirli MAC adreslerine izin verecek şekilde yapılandırılabilir [^8]. 
* **DHCP Gözetimi:** Sahte DHCP sunucularının ağa tanıtılmasını engeller. 
* **Dinamik ARP Denetimi (DAI):** ARP isteklerini/yanıtlarını DHCP gözetleme bağlama tablosuyla karşılaştırarak ARP sahtekarlığını önleyerek bir ağdaki ARP paketlerini doğrular. 

#### **1.3 Katman 3 - Ağ Katmanı: Yönlendirme Satranç Tahtası** 

* **Ağ Mühendisinin Görüşü:** Bu IP adresleri ve yönlendirme katmanıdır. Paketlerin farklı ağlar arasında taşınmasıyla ilgilidir. Yönlendiriciler bu katmanda çalışır ve paketleri nihai hedeflerine iletmek için hedef IP adreslerine göre kararlar verir. **ICMP** (ping ve traceroute için) ve IGMP gibi protokoller burada mevcuttur [^9]. 
* **Hacker'ın Görüşü:** Katman 3 saldırıları, yönlendirmeyi bozmaya ve kimlik sahtekarlığına odaklanır. 
* **IP Sahtekarlığı:** Saldırgan, sahte kaynak IP adresiyle IP paketleri oluşturur. Bu, **Hizmet Reddi (DoS)** saldırılarında kullanılan birincil tekniktir. **Şirin saldırısında**, saldırgan ağın yayın adresine çok sayıda ICMP yankı isteği (ping'ler) göndererek kaynak IP'yi kurbanın IP'si sanıyor. Ağdaki tüm ana bilgisayarlar daha sonra kurbana yanıt vererek onu ezer [^10]. 
* **Rota Ele Geçirme (BGP Ele Geçirme):** Bir saldırganın, özellikle **Sınır Ağ Geçidi Protokolü (BGP)** tarafından tutulan internet yönlendirme tablolarını bozarak IP adresi gruplarının kontrolünü gayri meşru bir şekilde ele geçirdiği karmaşık bir saldırı. Bu, trafiği yeniden yönlendirmek için kullanılabilir, bu da onu casusluk veya büyük ölçekli MitM saldırıları için güçlü bir araç haline getirir [^11]. 
* **Savunucunun Görüşü:** Bu katmandaki savunma, filtreleme ve doğrulamayla ilgilidir. 
* **Giriş/Çıkış Filtreleme:** Güvenlik duvarları, internetten kaynak IP adresine sahip gelen paketleri dahili ağ içinden bırakacak şekilde yapılandırılmalıdır (giriş filtreleme). Ayrıca, kaynak IP'si olmayan giden paketleri dahili ağ içinden bırakacak şekilde de yapılandırılmalıdırlar (çıkış filtreleme). Bu, BCP 38 / RFC 2827'de belgelendiği gibi IP sahtekarlığının önlenmesine yardımcı olur [^12]. 
* **Erişim Kontrol Listeleri (ACL'ler):** Yönlendiriciler ve güvenlik duvarları, kaynak/hedef IP, bağlantı noktası ve protokole dayalı olarak trafiğe izin vermek veya trafiği reddetmek için ACL'leri kullanır. Bu, ağ erişim kontrolünün temel yapı taşıdır. 

#### **1.4 Katman 4 - Aktarım Katmanı: Bağlantı Sözleşmesi** 

* **Ağ Mühendisinin Görüşü:** Bu katman, ana bilgisayardan ana bilgisayara iletişim hizmetleri sağlar. En önemli iki protokol **TCP (İletim Kontrol Protokolü)** ve **UDP'dir (Kullanıcı Datagram Protokolü)** [^13]. 
* **TCP:** Bağlantı odaklı, güvenilir ve düzenli teslimat. **Üç yönlü el sıkışma (SYN, SYN-ACK, ACK)** aracılığıyla bağlantı kurar ve tüm verilerin doğru şekilde ulaşmasını sağlar. HTTP, FTP, SMTP için kullanılır. 
* **UDP:** Bağlantısız, güvenilmez ve sırasız. Bu, çok daha hızlı olan ancak teslimat garantisi sunmayan bir "ateşle ve unut" protokolüdür. DNS, VoIP, çevrimiçi oyun için kullanılır. 
* **Hacker'ın Görüşü:** Bu katmandaki saldırılar genellikle kaynak tüketimine ve keşiflere odaklanır. 
* **TCP SYN Flood:** Klasik bir DoS saldırısı. Saldırgan, kurban sunucuya yüksek miktarda TCP SYN paketi göndererek kaynak IP adresini taklit eder. Sunucu bir SYN-ACK ile yanıt verir ve yeni bağlantı için kaynakları tahsis eder, hiçbir zaman gelmeyecek olan son ACK'yı bekler (çünkü kaynak IP sahtedir). Bu, çok sayıda yarı açık bağlantı bırakarak sunucunun bağlantı tablosunu tüketir ve meşru kullanıcıların bağlanmasını engeller [^14]. 
* **Bağlantı Noktası Taraması:** Saldırgan, hangi hizmetlerin çalıştığını keşfetmek amacıyla hedef ana bilgisayardaki çeşitli bağlantı noktalarına araştırma göndermek için **nmap** gibi araçları kullanır. "Açık" bağlantı noktası, istismar için potansiyel bir hedef olabilecek bir dinleme hizmetini belirtir [^15]. 
* **Savunucunun Görüşü:** Savunmalar, durum yönetimi ve tarama tespitine odaklanır. 
* **Durum Bilgili Güvenlik Duvarları:** Bu güvenlik duvarları TCP bağlantılarının durumunu izler. Bir SYN-ACK paketine yalnızca karşılık gelen bir SYN paketi gördüklerinde izin verirler ve bir ACK'ye yalnızca bir SYN-ACK gördüklerinde izin verirler. Bu onları durum bilgisi olmayan paket filtrelerinden çok daha güvenli kılar. 
* **SYN Çerezleri:** SYN taşmalarını azaltmaya yönelik bir teknik. Sunucu, bir SYN aldıktan sonra kaynakları tahsis etmek yerine, bağlantı hakkındaki bilgileri SYN-ACK paketinin sıra numarasına kodlar ve onu geri gönderir. Kaynakları yalnızca istemci "çerez"i içeren ve bunun meşru bir kaynak olduğunu kanıtlayan son ACK'yı gönderdiğinde tahsis eder [^16]. 
* **İzinsiz Giriş Tespit Sistemleri (IDS):** Bir IDS, bağlantı noktası tarama etkinliğini tespit edecek ve uyaracak şekilde yapılandırılabilir ve savunmacılara olası bir saldırı konusunda erken uyarı verir. 

--- 

### **Bölüm 2: Savunulabilir Bir Ağ Mimarisi Tasarlama** 

Her cihazın diğer cihazlarla iletişim kurabildiği düz bir ağ, bilgisayar korsanları için cennettir. Tek, düşük değerli bir ana bilgisayarı (yazıcı veya iş istasyonu gibi) tehlikeye attıklarında, etki alanı denetleyicileri veya veritabanları gibi yüksek değerli hedeflere kolayca yanal olarak geçebilirler. Savunulabilir bir mimari, bölümlere ayrılmış bir mimaridir. [^17]. 

#### **2.1 Segmentasyon Prensibi: İç Duvarlar İnşa Etmek** 

* **Ağ Mühendisinin Görüşü:** Segmentasyon, bir ağı daha küçük, yalıtılmış alt ağlara bölme uygulamasıdır. Bu, aşağıdakiler kullanılarak elde edilir: 
* **Alt ağ oluşturma:** Büyük bir IP adresi bloğunu daha küçük bloklara bölme. Trafiğin alt ağlar arasında hareket etmesi için yönlendiriciler gereklidir. 
* **VLAN'lar (Sanal LAN'lar):** Aynı fiziksel anahtarlama altyapısı üzerinde mantıksal olarak ayrı ağlar oluşturmanın bir yolu. Bir anahtar, VLAN 10'daki bağlantı noktaları farklı fiziksel anahtarlarda olsalar bile yalnızca VLAN 10'daki diğer bağlantı noktalarıyla konuşabilecek şekilde yapılandırılabilir [^18]. 
* **Katmanlı Mimari:** Uygulama işlevine göre ağı ayıran, genellikle internete yönelik hizmetler için bir **DMZ (Askersiz Bölge)** oluşturan klasik bir tasarım modeli [^19]. 
* **Web Katmanı (DMZ):** İnternetten erişilebilen en dış katman. Web sunucularını ve ters proxy'leri içerir. 
* **Uygulama Katmanı:** Yalnızca Web Katmanından erişilebilen orta katman. Uygulama sunucularını ve iş mantığını içerir. 
* **Veri Katmanı:** Yalnızca Uygulama Katmanından erişilebilen en içteki, en korumalı katman. Veritabanlarını içerir. 
* **Savunucunun Görüşü:** Segmentasyon, **Derinlemesine Savunma**'nın temel taşıdır. Ağ düzeyinde **en az ayrıcalık** ilkesini doğrudan destekler. Bir web sunucusunun doğrudan etki alanı denetleyicisiyle konuşması gerekmez; dolayısıyla güvenlik duvarı kuralları bu iletişim yolunu engellemelidir. Web sunucusunun güvenliği ihlal edilirse, saldırganın yana doğru hareket etme yeteneği ciddi şekilde kısıtlanır. Amaç, saldırgan için DMZ'den uygulama katmanına, uygulama katmanından veri katmanına kadar her adımı zor ve yoğun şekilde izlenen bir tıkanma noktası haline getirmektir. 

#### **2.2 Mikro Segmentasyon ve Sıfır Güven** 

* **Ağ Mühendisinin Görüşü:** Mikrosegmentasyon, segmentasyonun daha ayrıntılı bir evrimidir. Büyük bölgelere (VLAN'lar) göre segmentlere ayırmak yerine, bireysel iş yükleri veya uygulamalar etrafında güvenlik sınırları oluşturabilirsiniz. Sanallaştırılmış veya bulut ortamında bu genellikle **yazılım tanımlı ağ iletişimi (SDN)** ve sanal güvenlik duvarlarıyla uygulanır. 
* **Siber Güvenlik Uzmanının Görüşü:** Mikro bölümleme, **Sıfır Güven** ağ mimarisinin nihai ifadesidir. Sıfır Güven'in temel ilkesi "asla güvenme, her zaman doğrula"dır. Saldırganların zaten ağın içinde olduğunu varsayar [^20]. Bu nedenle, aynı alt ağda olsalar bile iki sanal makine arasındaki iletişime örtülü olarak güvenilmez. Bir güvenlik politikası tarafından açıkça izin verilmesi gerekir. Bu, saldırganın yanal hareketini son derece zorlaştırır. 
* **Yazılım Mühendisinin Görüşü:** Bunun geliştiriciler açısından sonuçları vardır. Uygulamalar, ağ bağlantısının garanti edilmediği varsayımıyla tasarlanmalıdır. Bağlantı hatalarına karşı dayanıklı olmaları ve doğru hizmet bulma mekanizmalarıyla yapılandırılmaları gerekir. Kubernetes **Ağ Politikaları**, geliştiricilerin kodda (YAML) mikro bölümleme kurallarını tanımlamalarına ve hangi bölmelerin hangi diğer bölmelerle iletişim kurmasına izin verildiğini belirlemelerine önemli bir örnektir [^21]. 

--- 

### **Bölüm 3: Ayrıntılı Olarak Çekirdek Ağ Güvenliği Kontrolleri** 

#### **3.1 Güvenlik Duvarı: Ağ Ağ Geçidi Denetleyicisi** 

* **Durumsuz ve Durum Bilgili:** Bölüm 1'de tartışıldığı gibi, durum bilgisi olan bir güvenlik duvarı, bir bağlantının içeriğini anladığı için çok daha üstündür. 
* **Yeni Nesil Güvenlik Duvarı (NGFW):** NGFW, basit bağlantı noktası/protokol incelemesinin ötesine geçen bir "derin paket incelemesi" güvenlik duvarıdır. Aşağıdaki gibi özellikleri içerir: 
* **Uygulama Farkındalığı:** Yalnızca bağlantı noktası numarasına değil (birçok uygulama 443 numaralı bağlantı noktası üzerinden çalıştığından) uygulamaya dayalı olarak trafiği tanımlayabilir ve kontrol edebilir (ör. Facebook'u engelleyin ancak Salesforce'a izin verin) [^22]. 
* **Entegre İzinsiz Giriş Önleme (IPS):** Bilinen saldırı imzalarıyla eşleşen trafiği aktif olarak engelleyebilir. 
* **Tehdit İstihbaratı Akışları:** Bilinen kötü amaçlı IP adreslerinden veya etki alanlarından gelen trafiği engellemek için bulut tabanlı tehdit istihbaratı hizmetleriyle entegre olabilir. 
* **Web Uygulaması Güvenlik Duvarı (WAF):** WAF, Katman 7'de (Uygulama Katmanı) çalışan özel bir güvenlik duvarıdır. Web uygulamalarını OWASP Top 10 listesinde listelenenler gibi yaygın web tabanlı saldırılara karşı korumak için tasarlanmıştır. [^23]. 
* **Geliştiricinin Görüşü:** WAF çok önemli bir savunma katmanıdır ancak güvenli kodlamanın yerini tutmaz. Bu bir güvenlik ağıdır. Bir WAF, aşağıdaki gibi temel bir SQL Enjeksiyon saldırısını engelleyebilir: `OR 1=1` ancak yetenekli bir saldırgan genellikle kodlama, gizleme veya daha karmaşık sorgular kullanarak WAF kurallarını atlamanın yollarını bulabilir. Birincil savunma kodun kendisinde olmalıdır (parametreli sorgular kullanılarak). 
* **Hacker'ın Görüşü:** WAF'tan kaçınma köklü bir disiplindir. Saldırganlar, WAF'leri araştırmak, satıcıyı ve kural kümelerini belirlemek ve sözdizimsel olarak geçerli ancak WAF imzalarını tetiklemeyen veriler oluşturmak için araçlar kullanır [^24]. 

#### **3.2 IDS/IPS: Ağ Gözetleme Kulesi** 

* **İzinsiz Giriş Tespit Sistemi (IDS):** Pasif bir izleme cihazı. Ağ trafiğinin bir kopyasını analiz eder ve şüpheli etkinlik tespit ederse bir uyarı gönderir. Trafiği engellemez. 
* **İzinsiz Girişi Önleme Sistemi (IPS):** Aktif, hat içi bir cihaz. Trafiği analiz eder ve kötü amaçlı imzalarla eşleşen paketleri hedeflerine ulaşmadan önce aktif olarak engelleyebilir veya bırakabilir. 
* **Algılama Metodolojileri:** 
* **İmza Tabanlı:** Antivirüs yazılımı gibi çalışır. Bilinen saldırı modellerinden ("imzalar") oluşan bir veritabanına sahiptir. Bu, bilinen tehditlere karşı çok etkilidir ancak yeni "sıfır gün" saldırılarını tespit edemez. 
* **Anomali Tabanlı:** Sistem öncelikle "normal" ağ trafiğinin neye benzediğine dair bir temel oluşturur. Daha sonra bu temel çizgiden önemli ölçüde sapan herhangi bir aktivite konusunda uyarı veriyor. Bu, yeni saldırıları tespit edebilir ancak genellikle yüksek oranda yanlış pozitifliğe eğilimlidir [^25]. 
* **Hacker'ın Görüşü:** Kaçırma teknikleri arasında paketlerin parçalanması, şifreleme kullanılması (bir IDS/IPS, hesaplama açısından pahalı olan SSL/TLS şifre çözme işlemini gerçekleştirmediği sürece şifrelenmiş trafiği denetleyemez) ve bilinen imzaların eşleşmesini önlemek için saldırı yüklerinin değiştirilmesi yer alır. 

--- 

--- 

## **Bölüm II: Savunmacının Kalesi - Bütünsel Savunma Stratejileri** 

### **Bölüm 4: Derinlemesine Savunma Felsefesi** 

Derinlemesine Savunma, modern siber güvenliğin temel felsefesidir. Bu, herhangi bir güvenlik kontrolünün başarısız olabileceği ve başarısız olacağının kabul edilmesidir. Amaç, bir saldırganı tespit etmek, yavaşlatmak ve durdurmak için birden fazla fırsat sağlayan katmanlı, yedekli bir savunma oluşturmaktır. [^26]. 

#### **4.1 Kalenin Katmanları** 

Ortaçağ kalesi mükemmel bir benzetme sağlıyor: 

1. **Hendek (Çevre Güvenliği):** Bu ilk savunma hattıdır. Sınır yönlendiricilerine ve çevre güvenlik duvarlarına karşılık gelir. Görevi bilgisiz, fırsatçı saldırganları uzak tutmaktır. 
2. **Dış Duvar (Ağ Güvenliği):** Daha güçlü bir bariyer. Bu, dahili segmentasyona, IDS/IPS ve güçlü erişim kontrol listelerine karşılık gelir. Çevreyi aşan tehditleri kontrol altına alacak şekilde tasarlanmıştır. 
3. **Duvardaki Okçular (İzleme ve Tespit):** Bunlar nöbetçilerdir. Bu, Güvenlik Operasyon Merkezi (SOC), SIEM sistemleri ve günlük analizine karşılık gelir. Aktif olarak bir saldırının işaretlerini arıyorlar. 
4. **İç Kale (Ana Bilgisayar ve Uç Nokta Güvenliği):** Ağır şekilde güçlendirilmiş bir kale. Bu, sunuculardaki ve iş istasyonlarındaki güvenlik kontrollerine karşılık gelir: **Uç Nokta Algılama ve Yanıt (EDR)**, ana bilgisayar tabanlı güvenlik duvarları, antivirüs ve dosya bütünlüğü izleme. 
5. **Kraliyet Mücevherleri (Uygulama ve Veri Güvenliği):** En güçlü kontrollerle korunan en büyük ödül. Bu, güvenli uygulama koduna, sağlam kimlik doğrulama ve yetkilendirmeye ve beklemede ve aktarım sırasında veri şifrelemeye karşılık gelir. 
6. **Korumalar (İnsan, Süreç ve Politika):** İnsan unsuru. Buna güvenlik farkındalığı eğitimi, olay müdahale planları ve güçlü operasyonel güvenlik prosedürleri dahildir. 

* **Hacker'ın Görüşü:** Saldırgan bu katmanları aşılması gereken bir dizi engel olarak görür. Amaçları her katmandaki en zayıf halkayı bulmaktır. Bir çalışanın bir kimlik avı bağlantısına tıklaması durumunda (çevre ve ağ katmanlarını atlayarak) güçlü bir güvenlik duvarı işe yaramaz. Güvenli bir uygulama, ana bilgisayar katmanında tehlikeye atılabilecek yamalanmamış bir sunucuda çalışıyorsa işe yaramaz. 

### **Bölüm 5: Tehdit Modelleme - Bir Saldırgan Gibi Düşünmek** 

Tehdit modelleme, bir sistem *kurulmadan önce* potansiyel tehditleri ve güvenlik açıklarını tespit etmeye yönelik yapılandırılmış bir süreçtir. Bu reaktif değil proaktif bir güvenlik uygulamasıdır [^27]. 

#### **5.1 STRIDE Metodolojisi** 

Microsoft tarafından geliştirilen STRIDE, tehditleri kategorilere ayırmaya yönelik bir anımsatıcıdır [^28]: 

* **S**poofing: Yasadışı bir şekilde başka bir kullanıcının veya bileşenin kimliğini üstlenmek. 
* *Savunma:* Güçlü kimlik doğrulama (MFA), dijital imzalar. 
* **T**amperleme: Aktarım halindeki veya beklemedeki verilerde izinsiz değişiklik yapılması. 
* *Savunma:* Karma, erişim kontrolleri, veri şifreleme. 
* **R**reddedilme: Bir kullanıcının bir eylemi gerçekleştirdiğini inkar etmesi. 
* *Savunma:* Güvenli denetim günlükleri, dijital imzalar. 
* **I**Bilgi İfşası: Hassas bilgilerin yetkisiz kişilerin eline geçmesi. 
* *Savunma:* Şifreleme, erişim kontrolleri. 
* **Hizmetin Engellenmesi: Meşru kullanıcıların sisteme erişiminin engellenmesi. 
* *Savunma:* Hız sınırlama, yük dengeleme, esnek mimari. 
* **E**Ayrıcalık Yükselmesi: Bir kullanıcının veya bileşenin, hak sahibi olmadığı izinleri elde etmesi. 
* *Savunma:* En az ayrıcalık ilkesi, sağlam yetkilendirme kontrolleri. 

#### **5.2 Pratik Bir Tehdit Modelleme Alıştırması** 

* **Yazılım Mühendisinin Görüşü:** Bir kullanıcının profilini güncellemek için basit bir API uç noktası hayal edin: `PUT /api/users/{id}`. Geliştirme ekibi, bir güvenlik uzmanıyla birlikte bir tehdit modeli gerçekleştirecek. 
1. **Uygulamayı Parçalayın:** Bir veri akış şeması çizin. Kullanıcının tarayıcısı bir API Ağ Geçidine bir HTTPS isteği gönderir, bu istek bunu bir Kullanıcı Hizmetine ileitir ve daha sonra PostgreSQL veritabanını günceller. 
2. **STRIDE kullanarak Tehditleri Belirleyin:** 
* **(Spoofing):** Bir kullanıcı, başka bir kullanıcının profilini değiştirerek güncelleyebilir mi? `{id}` URL'de mi? (Bu klasik bir yetkilendirme hatasıdır). 
* **(Kurcalama):** MitM konumundaki bir saldırgan, aktarım halindeki profil verilerini değiştirebilir mi? (Savunma: HTTPS/TLS bunu engeller). 
* **(Bilgi Açıklaması):** API yanıtı, kullanıcının şifre karması veya diğer kişisel bilgiler gibi hassas verileri sızdırıyor mu? 
* **(Hizmet Reddi):** Bir saldırgan, hizmeti veya veritabanını aşmak için bu uç noktayı çok sayıda istekle doldurabilir mi? (Savunma: Hız sınırlaması). 
* **(Ayrıcalık Yükseltmesi):** Güncelleme mantığında, bir saldırganın yönetici ayrıcalıkları elde etmesine izin verecek bir güvenlik açığı (örn. SQL Enjeksiyonu) var mı? 

Bu süreç, güvenliği soyut bir kavramdan somut bir mühendislik görevleri ve test senaryoları listesine dönüştürür. 

### **Bölüm 6: Güvenlik Operasyon Merkezi (SOC) - Görünürlük ve Yanıt** 

Strateji Derinlemesine Savunma ise SOC, bu stratejinin yürütüldüğü komuta merkezidir. 

#### **6.1 SOC'nin Temeli: SIEM** 

* **Güvenlik Bilgileri ve Olay Yönetimi (SIEM):** SIEM, bir SOC'nin merkezi sinir sistemidir. Görevi şudur: 
1. **Günlükleri Toplayın:** Yüzlerce veya binlerce kaynaktan (güvenlik duvarları, sunucular, uygulamalar, bulut hizmetleri vb.) günlük verilerini toplayın. 
2. **Verileri Normalleştirin:** Bu farklı günlük formatlarını ortak bir şemada ayrıştırın. 
3. **Olayları İlişkilendirin:** Bu, temel işlevdir. SIEM, farklı kaynaklardan gelen bireysel, görünüşte zararsız olayları anlamlı bir güvenlik olayına bağlamak için korelasyon kurallarını kullanır. 
4. **Uyarı:** Bir korelasyon kuralı tetiklendiğinde SIEM, bir güvenlik analistinin araştırması için yüksek kaliteli bir uyarı oluşturur [^29]. 

* **Geliştiricinin Görüşü:** Uygulamanızın günlükleri SIEM için kritik bir veri kaynağıdır. İyi bir günlük kaydı bir güvenlik özelliğidir. Günlükler yapılandırılmalı (ör. JSON), ilgili bağlamı içermeli (kullanıcı kimliği, kaynak IP, istek kimliği) ve hem başarılı hem de başarısız güvenlikle ilgili olayları (ör. oturum açma bilgileri, şifre değişiklikleri, yetkilendirme hataları) kaydetmelidir. 

#### **6.2 Olay Müdahale Yaşam Döngüsü** 

Bir uyarının gerçek bir olay olduğu doğrulandığında SOC, genellikle NIST'inki gibi bir çerçeveye dayanan yapılandırılmış bir olay müdahale (IR) planını izler. [^30]: 

1. **Hazırlık:** Bir olay meydana gelmeden *önce* yapılan iş (planlara, araçlara ve eğitimli personele sahip olmak). 
2. **Tanımlama:** Bir olayın bir güvenlik olayı olup olmadığının belirlenmesi. 
3. **Sınırlama:** Acil öncelik kanamayı durdurmaktır. Bu, güvenliği ihlal edilmiş bir ana bilgisayarın ağdan izole edilmesini veya güvenliği ihlal edilmiş bir kullanıcı hesabının devre dışı bırakılmasını içerebilir. 
4. **Ortadan kaldırma:** Tehdidi ortamdan kaldırmak (ör. kötü amaçlı yazılımları kaldırmak, güvenlik açığına yama uygulamak). 
5. **Kurtarma:** Sistemleri normal çalışmaya geri yükleme. 
6. **Alınan Dersler:** Olayın temel nedenini belirlemek ve olayın tekrar yaşanmasını önlemek için iyileştirmeleri belirlemek amacıyla yapılan otopsi analizi. 

--- 

--- 

## **Bölüm III: Saldırganın Gambiti - Saldırı Metodolojileri** 

Güçlü bir savunma oluşturmak için hücumu anlamalısınız. Bu bölüm, saldırganın zihniyetini ve metodolojisini inceleyerek, başka bir yerde tartışılan savunma önlemlerinin bağlamını sağlar. 

### **Bölüm 7: Siber Öldürme Zinciri - Saldırı Planı** 

Lockheed Martin tarafından geliştirilen Siber Öldürme Zinciri, tipik bir siber saldırının aşamalarını modeller. Savunmacılar, zinciri olabildiğince erken kırma hedefiyle kontrollerini her aşamaya göre haritalandırabilir [^31]. 

1. **Keşif:** Saldırgan, hedef hakkında bilgi toplar. 
* **Pasif Keşif:** Kamuya açık bilgilerin kullanılması (**OSINT** - Açık Kaynak İstihbaratı). 
* **Aktif Keşif:** Hedefin altyapısını doğrudan araştırıyor. Bu, bağlantı noktası taramayı (nmap), DNS numaralandırmayı ve internete bakan cihazları bulmak için Shodan gibi araçları kullanmayı içerir. 
2. **Silahlaştırma:** Saldırgan, hedefe teslim etmek için kötü amaçlı bir yük oluşturur. 
3. **Teslimat:** Silah haline getirilen yükün hedefe nasıl iletildiği. Yaygın vektörler hedef odaklı kimlik avı e-postalarını veya arabayla indirilenleri içerir. 
4. **İstismar:** Silah haline getirilmiş yük, hedefin sistemindeki bir güvenlik açığından yararlanılarak tetiklenir. 
5. **Kurulum:** Saldırgan, dayanak oluşturmak için kurbanın makinesine kötü amaçlı yazılım veya **Uzaktan Erişim Truva Atı (RAT)** yükler. 
6. **Komuta ve Kontrol (C2):** Yüklenen kötü amaçlı yazılım, saldırgan tarafından kontrol edilen bir C2 sunucusunu "eve çağırır". Bu kalıcı bir kanal oluşturur. 
7. **Hedeflere İlişkin Eylemler:** Saldırgan, veri sızdırma veya fidye yazılımı dağıtma gibi nihai hedefine ulaşır. 

### **Bölüm 8: Yaygın Sömürü Vektörlerinin Derinlemesine İncelemesi** 

#### **8.1 Temellerin Ötesinde Web Uygulaması Güvenlik Açıkları** 

* **Sunucu Tarafı İstek Sahteciliği (SSRF):** Bir saldırganın, sunucu tarafındaki bir uygulamayı rastgele bir etki alanına HTTP istekleri yapmaya zorlayabileceği bir güvenlik açığı. Bulut ortamlarında bu, bulut sağlayıcının meta veri hizmetine erişmek için kullanılabilir ve bu da geçici güvenlik kimlik bilgilerinin sızdırılmasına neden olabilir [^32]. 
* **Geliştiricinin Görüşü:** SSRF güvenlik açıkları, bir uygulamanın kullanıcı tarafından sağlanan bir URL'yi alıp uygun doğrulama olmadan bu URL'den içerik alması durumunda ortaya çıkar. Savunma, uygulamanın talep etmesine izin verilen alan adları ve protokollerden oluşan katı bir izin verilenler listesi tutmaktır. 
* **Güvensiz Seriden Çıkarma:** Bu güvenlik açığı, bir uygulamanın güvenilmeyen, kullanıcı tarafından sağlanan verileri uygun doğrulama olmaksızın seri durumdan çıkarması durumunda ortaya çıkar. Bir saldırgan, seri durumdan çıkarıldığında uzaktan kod yürütülmesine yol açabilecek kötü amaçlı serileştirilmiş bir nesne oluşturabilir [^33]. 

#### **8.2 İnsan Unsuru: Sosyal Mühendislik** 

* **Hacker'ın Görüşü:** İnsan çoğu zaman en zayıf halkadır. Sosyal mühendislik, insanları eylemler gerçekleştirmeye veya gizli bilgileri açıklamaya yönlendirme sanatıdır. 
* **Kimlik avı:** Mağdurları kandırarak hassas bilgileri ifşa etmeleri veya kötü amaçlı yazılım dağıtmaları için meşru bir kaynaktan geliyormuş gibi görünen sahte e-postalar göndermek. **Hedef odaklı kimlik avı**, belirli bir kişiye veya kuruluşa yönelik, oldukça hedefli bir kimlik avı biçimidir [^34]. 
* **Bahane:** Mağdurun güvenini kazanmak için uydurma bir senaryo (bahane) yaratmak. 
* **Savunucunun Görüşü:** Sosyal mühendisliğe karşı savunma çok katmanlıdır: 
* **Teknik Kontroller:** E-posta ağ geçitleri. 
* **Kullanıcı Eğitimi:** En kritik savunma. Düzenli güvenlik farkındalığı eğitimi. 
* **Süreç:** Hassas işlemler için birden fazla kişinin onayını gerektirir. 

### **Bölüm 9: Sömürü Sonrası - Arazide Yaşamak** 

Saldırganın ilk dayanağı bulduğunda işi daha yeni başlamıştır. Bir sonraki aşama, MITRE ATT&CK gibi çerçevelerde detaylandırılan bir süreç olan, erişimlerini genişletmek ve tespit edilmeden hedeflerine ulaşmakla ilgilidir. [^35]. 

* **Yatay Hareket:** Güvenliği ihlal edilmiş bir ana bilgisayardan aynı ağ içindeki diğer ana bilgisayarlara geçme işlemi. 
* **Hacker'ın Görüşü:** Windows Active Directory ortamında bu iyi tanımlanmış bir süreçtir. Saldırgan, kimlik bilgilerini ilk makinenin belleğinden atar (**Mimikatz** gibi bir araç kullanarak) [^36]), etki alanı yöneticisi hesaplarını arıyorum. Düz metin parolaya ihtiyaç duymadan kullanıcının parola karmasını kullanarak diğer makinelerde kimlik doğrulaması yapabildikleri **Pass-the-Hash** gibi teknikleri kullanabilirler. 
* **Kalıcılık:** Ağda uzun vadeli bir varlık oluşturmak. Saldırganlar, ilk güvenlik açığı kapatılsa veya ele geçirilen makine yeniden başlatılsa bile yeniden erişim elde edebilmelerini sağlayacak mekanizmalar oluşturacaktır. 
* **Karada Yaşamak (LotL):** Tespit edilmekten kaçınmak için önemli bir teknik. Saldırganlar, kendi özel kötü amaçlı yazılımlarını getirmek yerine, kurbanın sisteminde zaten mevcut olan meşru araçları kullanır. Örneğin, komut dosyası oluşturmak için **PowerShell** veya uzaktan komut yürütmek için **PsExec** kullanmak [^37]. 
* **Savunucunun Görüşü:** LotL saldırılarını tespit etmek çok zordur. **Uç Nokta Algılama ve Yanıt (EDR)** çözümlerinin kritik olduğu nokta burasıdır. EDR, daha sonra şüpheli bir IP adresine ağ bağlantısı kuran bir PowerShell işlemi oluşturan bir Word belgesi gibi şüpheli etkinlikleri işaretlemek için davranış analizini kullanır. 

--- 

--- 

## **Bölüm IV: İnşaatçının Sorumluluğu - Tasarım Yoluyla Güvenli** 

Güvenlik sonradan akla gelen bir düşünce olamaz. Güvenli sistemler oluşturmanın en etkili yolu, güvenliği yazılım geliştirme yaşam döngüsünün her aşamasına entegre etmektir. 

### **Bölüm 10: Güvenli Yazılım Geliştirme Yaşam Döngüsü (SSDLC)** 

Genellikle **"Sola Kaydır"** olarak adlandırılan SSDLC, güvenlik uygulamalarını geliştirme zaman çizelgesinde daha erken (sola) taşımakla ilgilidir [^38]. 

1. **Gereksinimler Aşaması:** Güvenlik gereksinimleri, işlevsel gereksinimlerin yanı sıra tanımlanmalıdır. 
2. **Tasarım Aşaması:** Tehdit modellemenin (Bölüm 5) gerçekleştiği yer burasıdır. 
3. **Uygulama (Kodlama) Aşaması:** 
* **Geliştiricinin Görüşü:** Bu, yaygın güvenlik açıklarından kaçınmak için güvenli kodlamayla ilgili en iyi uygulamaların izlenmesini içerir. 
* **Statik Uygulama Güvenliği Testi (SAST):** SAST araçları, uygulamanın kaynak kodunu çalıştırmadan analiz ederek olası güvenlik açıklarını arar [^39]. 
4. **Test Aşaması:** 
* **Dinamik Uygulama Güvenliği Testi (DAST):** DAST araçları, çalışan uygulamayı güvenlik açıklarına karşı araştıran "kara kutu" test araçlarıdır. 
* **Sızma Testi:** Etik bilgisayar korsanlarının güvenlik açıklarından aktif olarak yararlanmaya çalıştığı manuel veya yarı otomatik bir süreç. 
5. **Dağıtım ve Bakım Aşaması:** Bu, üretim ortamının güvenliğini sağlamayı, sürekli izlemeyi ve güvenlik açıklarını düzeltmeye yönelik bir plan yapmayı içerir. 

### **Bölüm 11: Ayrıntılı Uygulama Güvenliği (AppSec)** 

#### **11.1 Ayrıntılı Olarak Kimlik Doğrulama ve Yetkilendirme** 

* **Kimlik doğrulama (Sen kimsin?):** 
* **Çok Faktörlü Kimlik Doğrulama (MFA):** Hesapları korumak için en etkili tek kontrol. Farklı kategorilerden iki veya daha fazla doğrulama faktörü gerektirir: bildiğiniz bir şey (şifre), sahip olduğunuz bir şey (telefon) veya olduğunuz bir şey (biyometrik) [^40]. 
* **Yetkilendirme (Ne yapmanıza izin veriliyor?):** 
* **Geliştiricinin Görüşü:** Pek çok kritik hatanın ortaya çıktığı yer burasıdır. Yaygın görülen bir kusura **Güvensiz Doğrudan Nesne Referansı (IDOR)** adı verilir. Bu durum, bir uygulamanın yetkilendirme kontrolü yapmadan bir kaynağa erişmek için kullanıcı tarafından sağlanan bir tanımlayıcıyı kullanması durumunda meydana gelir. [^41]. Çözüm, şu anda kimliği doğrulanmış kullanıcının istenen kaynağa erişim iznine sahip olduğunu her zaman doğrulamaktır. 

#### **11.2 Geliştiriciler için Şifreleme: Temel Kurallar** 

* **Kural 1: Asla Kendi Kriptonuzu Yuvarlamayın.** Kriptografiyi doğru şekilde kullanmak inanılmaz derecede zordur. Her zaman iyi denetlenmiş standart kitaplıkları kullanın (ör. Google'ın Tink'i, Libsodium) [^42]. 
* **Kural 2: Güçlü, Standart Algoritmalar Kullanın.** Şifreleri karma hale getirmek için **Argon2** gibi modern, yavaş bir algoritma kullanın. [^43]. Simetrik şifreleme için **AES-256-GCM** kullanın. Asimetrik şifreleme için **RSA-4096** veya eliptik eğri şifrelemesini kullanın. 
* **Kural 3: Anahtar Yönetimi Her Şeydir.** Bir kriptografik sistemin güvenliği tamamen anahtarların gizliliğine bağlıdır. Şifreleme anahtarlarını depolamak ve yönetmek için özel bir anahtar yönetim sistemi (KMS) veya donanım güvenlik modülü (HSM) kullanın [^44]. 

#### **11.3 Tedarik Zinciri Güvenliği: Yeni Sınır** 

* **Yazılım Mühendisinin Görüşü:** Modern uygulamalar yüzlerce açık kaynak bağımlılığından bir araya getirilmiştir. Bu bağımlılıklardan yalnızca birindeki bir güvenlik açığı, uygulamanızda bir güvenlik açığına dönüşür. Bu bir tedarik zinciri saldırısıdır. 
* **Log4Shell (Örnek):** Log4j güvenlik açığı feci bir örnekti. Her yerde bulunan tek bir günlük kitaplığı, milyonlarca uygulamayı anında saldırıya açık hale getiren kritik bir uzaktan kod yürütme güvenlik açığına sahipti [^45]. 
* **Savunma:** 
* **Yazılım Malzeme Listesi (SBoM):** Uygulamanızdaki tüm bağımlılıkların eksiksiz bir envanterini tutun [^46]. 
* **Güvenlik Açığı Taraması:** Bağımlılıklarınızı bilinen güvenlik açıklarına karşı sürekli olarak taramak için **Snyk, Dependabot veya Trivy** gibi araçları kullanın. 

### **Bölüm 12: Modern Bulut Yerel Yığın Güvenliğini Sağlama** 

#### **12.1 Konteyner Güvenliği** 

* **Güvenli Temel Görüntüler:** Minimum düzeyde güvenilir temel görüntülerle başlayın (ör.`distroless`veya`alpine`) saldırı yüzeyini azaltmak için [^47]. 
* **Kök Olarak Çalıştırma:** Varsayılan olarak, kapsayıcılar kök olarak çalıştırılır. `root` kullanıcı. Şunu kullanın: `USER` Uygulamayı ayrıcalıklı olmayan bir kullanıcı olarak çalıştırmak için Dockerfile'ınızdaki talimat. 
* **Görüntü Tarama:** Kapsayıcı görüntülerinizi bir kayıt defterine gönderilmeden önce bilinen güvenlik açıklarına karşı taramak için Trivy veya Clair gibi araçları CI/CD ardışık düzeninize entegre edin. 

#### **12.2 Kubernetes Güvenliği** 

Kubernetes, geniş saldırı yüzeyine sahip güçlü ancak karmaşık bir sistemdir. 

* **Rol Tabanlı Erişim Denetimi (RBAC):** Küme içindeki hem kullanıcılar hem de hizmet hesapları için en az ayrıcalık ilkesini uygulamak üzere RBAC'yi kullanın [^48]. 
* **Ağ Politikaları:** Varsayılan olarak, bir kümedeki tüm bölmeler diğer tüm bölmelerle konuşabilir. Uygulamanız gerekir `NetworkPolicy` "Varsayılan olarak reddet" duruşuna dayalı olarak iletişimi kısıtlamak için kaynaklar. 
* **Sır Yönetimi:** Sırları ConfigMaps'te düz metin olarak saklamayın. Yerleşik Kubernetes Secrets nesnesini kullanın ancak daha yüksek güvenlik için HashiCorp Vault gibi harici bir gizli dizi yöneticisiyle entegre edin [^49]. 
* **Pod Güvenlik Standartları:** Pod'ların kök olarak çalıştırma veya ana bilgisayarın ağına erişme gibi tehlikeli yapılandırmalarla çalışmasını önlemek için Pod Güvenlik Standartlarını kullanın. [^50]. 

#### **12.3 Kod Olarak Altyapı (IaC) Güvenliği** 

* **Geliştiricinin Görüşü:** Terraform gibi IaC araçları, altyapınızı kodla tanımlamanıza olanak tanır. Bu kod, dağıtılmadan *önce* yanlış yapılandırmalara karşı taranabilir. 
* **IaC için Statik Analiz:** CI/CD işlem hattınızda **Checkov** veya **tfsec** gibi araçları kullanarak Terraform kodunuzu genel erişime açık bir S3 klasörü veya tüm internetten SSH'ye izin veren bir güvenlik grubu oluşturmak gibi genel güvenlik sorunlarına karşı taramak için kullanın (`0.0.0.0/0`) [^51]. 

--- 

## **Sonuç: Disiplinlerin Sentezi** 

Bu üç ciltlik yolculuk bizi arka uç geliştirmenin temellerinden dağıtılmış sistemlerin karmaşıklığına ve son olarak da güvenlik mimarisinin her şeyi kapsayan disiplinine götürdü. Nihai ders, bunların ayrı alanlar olmadığıdır. Ağ oluşturma ve güvenlikten anlamayan bir yazılım mühendisi, kırılgan ve savunmasız uygulamalar oluşturacaktır. Ağında çalışan uygulamaları anlamayan bir ağ mühendisi, ağının güvenliğini etkili bir şekilde sağlayamaz. Gelişimi ve operasyonları anlamayan bir güvenlik uzmanı etkili rehberlik sağlayamaz. Modern sistem mühendisi, en gerçek anlamda, çok yönlü bir insan olmalıdır. Ağ paketinden uygulama mantığına, güvenlik duvarı kuralından konteyner konfigürasyonuna kadar her soyutlama katmanında sistem hakkında akıl yürütebilmelidirler. Aynı anda bir inşaatçı, bir savunucu ve bir kırıcı gibi düşünmeleri gerekir. Güvenlik bir ürün ya da özellik değildir; iyi tasarlanmış bir sistemin bir özelliğidir. Sürekli gelişen bir tehdit ortamı karşısında sürekli bir tasarım, savunma ve adaptasyon sürecidir. Bu çalışmada detaylandırılan ilkeli, bütünsel yaklaşım yalnızca bir metodoloji değildir; dijital dünyamızın dayandığı dayanıklı ve güvenilir sistemleri oluşturmanın temel gereksinimidir. 

--- 

--- 

## **Referanslar** 

[^1]: [Cloudflare - OSI Modeli nedir?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
[^2]: [Krebs, B. (2012) - Küçük, Sessiz Ağ Bağlantılarından Kaynaklanan Büyüyen Tehdit](https://krebsonsecurity.com/2012/03/the-growing-threat-from-tiny-silent-network-taps/)
[^3]: [Cisco - 802.1X Nedir?](https://www.cisco.com/c/en/us/products/security/what-is-802-1x.html)
[^4]: [Microsoft (2021) - Adres Çözümleme Protokolü](https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/network-subsystem/address-resolution-protocol)
[^5]: [OWASP - Adres Çözümleme Protokolü Sahtekarlığı](https://owasp.org/www-community/attacks/ARP_Spoofing)
[^6]: [İmperva - MAC Sel Baskını](https://www.imperva.com/learn/application-security/mac-flooding/)
[^7]: [Cisco - VLAN Atlamalı Saldırı](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst4500/12-2/15-02SG/configuration/guide/config/dhcp.html#wp1102555)
[^8]: [GeeksforGeeks (2023) - Bilgisayar Ağlarında Port Güvenliği](https://www.geeksforgeeks.org/port-security-in-computer-networks/)
[^9]: [Cloudflare - İnternet Protokolü nedir?](https://www.cloudflare.com/learning/network-layer/internet-protocol/)
[^10]: [Cloudflare - Şirin DDoS Saldırısı](https://www.cloudflare.com/learning/ddos/smurf-ddos-attack/)
[^11]: [Cloudflare - BGP ele geçirme nedir?](https://www.cloudflare.com/learning/security/glossary/bgp-hijacking/)
[^12]: [IETF (2000) - RFC 2827: Ağ Giriş Filtreleme: IP Kaynak Adresi Sahtekarlığı kullanan Hizmet Reddi Saldırılarını yenmek](https://datatracker.ietf.org/doc/html/rfc2827)
[^13]: [IETF (1981) - RFC 793: İletim Kontrol Protokolü](https://datatracker.ietf.org/doc/html/rfc793)
[^14]: [Cloudflare - SYN Sel Saldırısı](https://www.cloudflare.com/learning/ddos/syn-flood-ddos-attack/)
[^15]: [Nmap - Resmi Nmap Proje Sitesi](https://nmap.org/)
[^16]: [Vikipedi - SYN çerezleri](https://en.wikipedia.org/wiki/SYN_cookies)
[^17]: [SANS Enstitüsü (2016) - Ağ Segmentasyonunun Uygulanması](https://www.sans.org/white-papers/37232/)
[^18]: [IETF (2003) - RFC 3069: Verimli Adres Tahsisi için VLAN Toplama](https://datatracker.ietf.org/doc/html/rfc3069)
[^19]: [Palo Alto Ağları - DMZ nedir?](https://www.paloaltonetworks.com/cyberpedia/what-is-a-dmz)
[^20]: [NIST (2020) - Sıfır Güven Mimarisi](https://csrc.nist.gov/publications/detail/sp/800-207/final)
[^21]: [Kubernet'ler - Ağ Politikaları](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
[^22]: [Palo Alto Ağları - Yeni Nesil Güvenlik Duvarı (NGFW) nedir?](https://www.paloaltonetworks.com/cyberpedia/what-is-a-next-generation-firewall-ngfw)
[^23]: [OWASP - OWASP İlk 10](https://owasp.org/www-project-top-ten/)
[^24]: [OWASP - WAF Kaçınma Teknikleri](https://owasp.org/www-community/attacks/WAF_Evasion_Techniques)
[^25]: [SANS Enstitüsü (2001) - Saldırı Tespit Sistemlerini Anlamak](https://www.sans.org/white-papers/27/)
[^26]: [NSA (2021) - Derinlikli Savunma](https://www.nsa.gov/portals/75/documents/what-we-do/cybersecurity/professional-resources/csg-defense-in-depth-20210225.pdf)
[^27]: [OWASP - Tehdit Modellemesi](https://owasp.org/www-community/Threat_Modeling)
[^28]: [Microsoft (2022) - STRIDE Tehdit Modeli](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
[^29]: [Splunk - SIEM nedir?](https://www.splunk.com/en_us/data-insider/what-is-siem.html)
[^30]: [NIST (2012) - SP 800-61 Rev. 2: Bilgisayar Güvenliği Olaylarını Ele Alma Kılavuzu](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
[^31]: [Lockheed Martin - Siber Öldürme Zinciri](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)
[^32]: [OWASP - Sunucu Tarafı İstek Sahteciliği](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery)
[^33]: [OWASP - A08:2021 – Yazılım ve Veri Bütünlüğü Arızaları (Güvensiz Seriden Çıkarma ile ilgili)](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/)
[^34]: [CISA - Sosyal Mühendislik ve Kimlik Avı Saldırılarından Kaçınmak](https://www.cisa.gov/uscert/ncas/tips/ST04-014)
[^35]: [MITRE - ATT&CK Çerçevesi](https://attack.mitre.org/)
[^36]: [Depy, B. - mimikatz](https://github.com/gentilkiwi/mimikatz)
[^37]: [Microsoft (2022) - Toprakla geçinmek](https://www.microsoft.com/en-us/security/blog/2022/05/26/living-off-the-land-a-technical-and-strategic-overview-of-lolbins/)
[^38]: [OWASP - Sola Kaydır](https://owasp.org/www-community/Shift_Left)
[^39]: [OWASP - Statik Uygulama Güvenliği Testi (SAST)](https://owasp.org/www-community/Static_Application_Security_Testing_(SAST))
[^40]: [NIST (2017) - SP 800-63B: Dijital Kimlik Yönergeleri: Kimlik Doğrulama ve Yaşam Döngüsü Yönetimi](https://pages.nist.gov/800-63-3/sp800-63b.html)
[^41]: [OWASP - A01:2021 – Bozuk Erişim Kontrolü (IDOR ile ilgili)](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
[^42]: [Google - Tink Şifreleme Kütüphanesi](https://developers.google.com/tink)
[^43]: [Argon2 Şifre Karma Fonksiyonu - Resmi Argon2 Sitesi](https://www.password-hashing.net/)
[^44]: [AWS - Anahtar Yönetim Hizmeti Nedir?](https://aws.amazon.com/kms/what-is-kms/)
[^45]: [CISA - Apache Log4j Güvenlik Açığı Kılavuzu](https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance)
[^46]: [NTIA - Yazılım Malzeme Listesi (SBOM)](https://www.ntia.gov/SBOM)
[^47]: [GoogleCloudPlatform - arızasız Docker Görüntüleri](https://github.com/GoogleCloudPlatform/distroless)
[^48]: [Kubernet'ler - RBAC Yetkilendirmesini Kullanma](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
[^49]: [HashiCorp - Kasa](https://www.vaultproject.io/)
[^50]: [Kubernet'ler - Pod Güvenlik Standartları](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
[^51]: [Köprü mürettebatı - Chekov](https://www.checkov.io/)
