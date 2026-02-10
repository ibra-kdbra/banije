---
title: "Yapay Zeka Adillik İkilemi: Neden Her Şeye Sahip Olamayız"
published: 2025-06-12
description: "Makine öğreniminde en öne çıkan üç adalet ölçütünün neden birbiriyle uyumsuz olduğuna dair bir açıklama ve daha adil modeller oluşturmaya yönelik nedensel bir yaklaşıma bir bakış."
image: ''
tags: [AI, Machine Learning, Fairness, Ethics]
category: Engineering
draft: false
lang: "tr"
originalSlug: "ML_fairness"
series:
    name: "AI Foundations"
    order: 3

---

Makine öğrenimi modelleri, kredi başvurularından iş önerilerine ve hatta suç tahminine kadar hayatımızla ilgili giderek daha kritik kararlar alıyor. Ancak çok büyük bir sorun var: Bu modeller tarihsel verilerden öğreniyor ve bu veriler genellikle toplumsal önyargılarla dolu. Önyargılı verilerle eğitilmiş bir yapay zeka yalnızca bu önyargıları öğrenmekle kalmaz; onları güçlendirebilir.

Ünlü bir 2016 ProPublica raporu, COMPAS suç tekrarı tahmin aracının Afrikalı-Amerikalı sanıklara karşı önyargılı olduğunu ortaya çıkardı. Bu, yapay zeka topluluğunda "adaletin" tanımlanması ve ölçülmesi yönünde büyük bir baskıyı ateşledi. Sorun? En öne çıkan üç adalet ölçütü **karşılıklı olarak uyumsuzdur**. Çığır açan bir makale bunun yalnızca *bunun* doğru olduğunu değil, aynı zamanda temel, yapısal düzeyde *neden* doğru olduğunu da açıklıyor.

---

## Adaletin Üç Yüzü ⚖️

Sorunu anlamak için adaleti tanımlamanın ana rakiplerini bilmemiz gerekiyor. Makale üç popüler ölçüme odaklanıyor:

* **Demografik Eşitlik**: Bu ölçüm, bir modelin tahminlerinin ırk veya cinsiyet gibi hassas özelliklerden bağımsız olması gerektiği konusunda ısrar eder. Basit bir ifadeyle, olumlu sonuçların (örneğin kredi alma) oranı tüm gruplar için aynı olmalıdır.

* **Eşitleştirilmiş Oranlar**: Bu ölçüm, modelin doğruluğunun her sonuç için farklı gruplar arasında eşit olmasını gerektirir. Örneğin, gerçek pozitif oranı ve yanlış pozitif oranı hem erkekler hem de kadınlar için aynı olmalıdır.

* **Tahmin Edici Eşitlik**: Bu ölçüm, herhangi bir tahminin doğru olma olasılığının tüm gruplar için aynı olmasını sağlar. Örneğin, model bir kişinin bir krediyi geri ödeyeceğini öngörüyorsa, o gruptaki gerçek geri ödeme oranının tüm ırklar arasında tutarlı olması gerekir.

"İmkansızlık Teoremi", önemsiz durumlar dışında, bir modelin bu ölçümlerin üçünü de aynı anda karşılayamayacağını kanıtlıyor. Bu, geliştiricileri zor durumda bıraktı ve onları başkalarının pahasına hangi adalet tanımına öncelik vereceklerini seçmeye zorladı.

---

## Nedensel Bir Açıklama: Neden Bir Arada Var Olamıyorlar

Makalenin temel katkısı, bu imkansızlığı **nedensel diyagramlar** kullanarak açıklamasıdır. Sadece istatistiklere bakmak yerine, her adalet ölçütü için gerekli olan altta yatan veri üreten yapıları inceler. **Hassas niteliği** `A`, **gerçek sonucu** `Y` ve **modelin tahminini** `Ŷ` olarak adlandıralım.

Her ölçüt için `A`, `Y` ve `Ŷ` arasındaki nedensel ilişki farklı şekilde yapılandırılmalıdır:

* **Demografik Eşitlik** için (`Ŷ`, `A`'dan bağımsızdır), `Y` bir "çarpışma noktası" olduğunda, tahmin ile hassas nitelik arasındaki yol doğal olarak engellenir.
    :::note[Demografik Eşitlik için Nedensel Diyagram]
    `A -> Y <- Ŷ`
    :::

* **Eşitlenmiş Oranlar** için (`Ŷ`, `Y` verildiğinde `A`'dan bağımsızdır), gerçek sonuç `Y`'yi gözlemlemek, `A` ve `Ŷ` arasındaki yolu engeller.
    :::note[Eşitlenmiş Oranlar için Nedensel Diyagram]
    `A -> Y -> Ŷ`
    :::

* **Tahmin Edilebilir Eşitlik** için (`Y`, `Ŷ` verildiğinde `A`'dan bağımsızdır), tahmini `Ŷ`'yi gözlemlemek yolu engeller.
    :::note[Tahmin Edilebilir Eşitlik için Nedensel Diyagram]
    `A -> Ŷ -> Y`
    :::

Bu diyagramlardan, her bir ölçüt için gerekli verilerin temel yapısının farklı ve birbirini dışlayan olduğu açıktır. Bunların hepsini aynı anda karşılayan tek bir veri üretim süreci olamaz. Sorun öğrenme algoritmasında değil; verinin kendisinin temel bir kısıtlamasında yatıyor

---

## İleriye Doğru Yeni Bir Yol: Düzeltme Yoluyla Adalet 💡

Peki, mükemmel adalet imkansızsa ne yapacağız? Yazar hedefi değiştirmemiz gerektiğini savunuyor.

Standart makine öğrenimi **Deneysel Risk Minimizasyonunu (ERM)** hedefler; bu, modelin (çoğunlukla önyargılı) eğitim verilerindeki etiketlerle mükemmel şekilde eşleştiği için ödüllendirildiği anlamına gelir. Peki ya amaç *tarihsel* etiketi tahmin etmek değil de *adil* etiketi tahmin etmekse?

**"düzeltme değişkeni" sunan yeni bir nedensel çerçeve,`C`** önerildi. Düşünebilirsin`C`bir anahtar olarak. Hassas nitelikten etkilenen bu değişken`A`, modelin tahmininin olup olmadığını belirler`Ŷ`doğru etiketi takip etmeli`Y`veya farklı bir "adalet" işlevi.

:::note[Düzeltme Yoluyla Adalet İçin Nedensel Diyagram]
A -> C
C -> Ŷ
Y -> Ŷ
:::

Temel olarak, tarihsel olarak avantajlı olan bir grup için model her zamanki gibi ilerleyebilir (`C=1`). Ancak dezavantajlı bir grup için düzeltme değişkeni tersine dönebilir (`C=0`), daha adil bir sonuç üretmek için modelin geçmiş verilerden sapmasına neden olur. Bu yaklaşımın çeşitli avantajları vardır:

* Adil olmanın aktif olarak **önyargılı tarihsel kalıplardan sapmayı** gerektirdiğini kabul eder.
* Uygulayıcıların, verilerin ne kadar adaletsiz olduğuna bağlı olarak **ne kadar sapmanın gerekli olduğuna** karar vermek için bir hiperparametre ayarlamasına olanak tanır.
* Düzeltme değişkenine bağlı olarak Demografik Eşitlik ve Eşitlenmiş Oranların daha gevşek versiyonlarını birlikte karşılayabilir`C`.

Bu nedensel yaklaşım, sorunu yeniden çerçevelendirerek, yalnızca dünyayı olduğu gibi yansıtmayan, aynı zamanda gelişen adalet anlayışlarımızla daha uyumlu bir dünya yaratmaya yardımcı olan modeller oluşturmak için güçlü bir araç sağlar.
