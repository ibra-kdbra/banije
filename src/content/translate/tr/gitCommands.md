---
title: "Örneklerle Git Komutları"
published: 2024-02-18
description: "İş akışınızı kolaylaştıracak örneklerle temel Git komutları hakkında bilgi edinin."
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "tr"
originalSlug: "gitCommands"

---

## 1. Git Birleştirme 

Git birleştirme, iki daldaki çalışmaları tek bir dalda birleştirmenize olanak tanır.
```sh
git merge <branch>
```

:::tip
Değişiklikleri bir daldan diğerine (genellikle ana dal) entegre etmek için "git merge"ü kullanın.
:::--- 

## 2. Git Farkı 

Git diff, Git deponuzdaki herhangi iki işlem veya dosya arasındaki farkları gösterir.
```sh
git diff <source branch> <target branch>
```

## 3. Git Günlüğü 

`git log`komutu proje geçmişinizdeki tüm taahhütleri listeler.
```sh
git log
```

:::note
Günlüğü basitleştirmek veya görselleştirmek için "--oneline" veya "--graph" gibi seçenekleri kullanın.
:::--- 

## 4. Git Gösterisi 

Git show, belirli bir Git nesnesinin (ör. taahhüt, etiket veya ağaç) ayrıntılarını görüntüler.
```sh
git show <commit>
```

## 5. Git Grep 

Git grep, kod tabanınızda belirli bir dize veya modelin oluşumlarını arar.
```sh
git grep -n <pattern>
```

## 6. Git Şubesi 

Deponuzda şubeler oluşturun veya listeleyin.
```sh
git branch
```

:::tip
Bir dalı silmek için `git Branch -d <branch>` komutunu kullanın.
:::--- 

## 7. Git Push 

Yerel taahhütlerinizi uzak bir depoya aktarın.
```sh
git push -u <remote> <branch>
```

## 8. Git Zulası 

Değişiklikleri taahhüt etmeden geçici olarak kaydedin.
```sh
git stash
```

:::important
Saklanan değişikliklerinizi yeniden uygulamak için "git stash pop"u çalıştırmayı unutmayın.
:::--- 

## 9. Git Yeniden Tabanı 

Bir temel dalın üstüne taahhütler uygulayarak bir dalı güncelleyin.
```sh
git rebase <base>
```

:::caution
İstenmeyen geçmiş yeniden yazma işlemlerini önlemek için "yeniden oluşturma" ile "birleştirme" arasındaki farkın farkında olduğunuzdan emin olun.
:::--- 

## 10. Git Yapılandırması 

Genel veya veri havuzuna özgü seçenekleri ayarlayın veya alın.
```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

<iframe width = "100%" yükseklik = "468" src = "https://www.youtube.com/embed/mJ-qvsxPHpY"title="Yeni Başlayanlar İçin Git Eğitimi" çerçeveborder = "0" izin = "ivmeölçer; otomatik oynatma; panoya yazma; şifreli medya; jiroskop; resim içinde resim; web paylaşımı" izin veren tam ekran izin veren tam ekran></iframe> 

## 11. Git Klonu 

Mevcut bir depoyu yerel makinenize kopyalayın.
```sh
git clone <repository>
```

## 12. Git Başlatma 

Yeni bir Git deposu oluşturun.
```sh
git init
```

## 13. Git Ödemesi 

Dallar arasında geçiş yapın veya dosyaları geri yükleyin.
```sh
git checkout <branch>
```

## 14. Git'i Sıfırla 

Mevcut HEAD'inizi belirli bir işleme göre sıfırlayın.
```sh
git reset <commit>
```

## 15. Git Etiketi 

Deponuzdaki etiketleri yönetin.
```sh
git tag
```

:::tip
Açıklamalı bir etiket oluşturmak için `git tag -a <tag>` kullanın.
:::--- 

## 16. Git Arşivi 

Belirli bir taahhütten veya daldan bir dosya arşivi oluşturun.
```sh
git archive
```

## 17. Git Taahhüdü 

Değişiklikleri depoya kaydedin.
```sh
git commit -m "Commit message"
```

## 18. Git Durumu 

Çalışan ağaç durumunu görüntüleyin.
```sh
git status
```

## 19. Git RM 

Dosyaları çalışma ağacından ve dizinden kaldırın.
```sh
git rm <file>
```

## 20. Git Uzaktan Kumandası 

Bir dizi izlenen depoyu yönetin.
```sh
git remote add <name> <url>
```

## 21. Git Instaweb 

Yerel bir web tabanlı Git deposu görüntüleyicisini başlatın.
```sh
git instaweb
```

## 22. Git Notları 

Taahhütlere ekstra bilgi ekleyin.
```sh
git notes add <message>
```

## 23. Git Bisect 

Sorunlu bir işlemi bularak deponuzdaki hataları ayıklayın.
```sh
git bisect
```

## 24. Git Alt Modülleri 

Diğer depoları alt modüller olarak içe aktarın.
```sh
git submodule add <repository>
```

## 25. Git Hata Raporu 

Sistem ve depo bilgilerini içeren bir hata raporu derleyin.
```sh
git bugreport
```

## 26. Git Fsck 

Deponuzun bütünlüğünü doğrulayın ve ulaşılamayan nesneleri kurtarın.
```sh
git fsck
```

## 27. Git Stripspace 

Deponuzdan sondaki boşlukları kaldırın.
```sh
git stripspace
```

## 28. Git Kancaları 

Git yaşam döngüsü olaylarına yanıt olarak komut dosyalarını otomatik olarak çalıştırın.
```sh
git hooks
```

## 29. Git Suçu 

Bir dosyadaki bir satırı en son kimin değiştirdiğini gösterin.
```sh
git blame <file>
```

## 30. Git LFS (Büyük Dosya Depolama) 

Git deponuzdaki büyük dosyaları yönetin.
```sh
git lfs
```

## 31. Git Çöp Toplama 

Gereksiz dosyaları temizleyerek deponuzu optimize edin.
```sh
git gc
```

## 32. Git'i Tanımlayın 

En son etikete dayalı olarak bir taahhüt için okunabilir bir ad oluşturun.
```sh
git describe
```

## 33. Git Yeniden Günlüğü 

Depoda gerçekleştirilen tüm Git eylemlerini görüntüleyin.
```sh
git reflog
```

## 34. Git Günlüğü (Gelişmiş) 

Ek seçeneklerle taahhüt günlüklerini görselleştirin.
```sh
git log --graph --oneline
```

## 35. Git Kiraz Seçimi 

Başka bir şubeden mevcut şubenize bir taahhüt uygulayın.
```sh
git cherry-pick <commit>
```

## 36. Git Anahtarı 

Şubeler arasında hızla geçiş yapın.
```sh
git switch <branch>
```

:::note
'git switch', şube değiştirme için 'git checkout'a modern bir alternatiftir.
:::--- 

<iframe width = "100%" yükseklik = "468" src = "https://www.youtube.com/embed/K6Q31YkorUE"title="YouTube video oynatıcısı" çerçeve sınırı = "0" 
izin ver = "ivmeölçer; otomatik oynatma; panoya yazma; şifreli medya; jiroskop; resim içinde resim; web paylaşımı" izin veren tam ekran izin veren tam ekran></iframe>