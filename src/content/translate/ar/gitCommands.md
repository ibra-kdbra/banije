---
originalSlug: "gitCommands"
lang: "ar"
title: أوامر Git مع أمثلة
published: 2024-02-18
description: 'تعرف على أوامر Git الأساسية مع أمثلة لتبسيط سير عملك.'
image: ''
tags: [Git, Commands, Examples]
category: "Developer Workflow"
draft: false
---

## 1. Git Merge

يسمح لك أمر `git merge` بدمج العمل من فرعين مختلفين في فرع واحد.

```sh
git merge <branch>
```

:::tip [نصيحة]
استخدم `git merge` لدمج التغييرات من فرع إلى آخر، وعادة ما يكون ذلك الفرع الرئيسي (main branch).
:::

---

## 2. Git Diff

يعرض `git diff` الاختلافات بين أي التزامين (commits) أو ملفين داخل مستودع Git الخاص بك.

```sh
git diff <source branch> <target branch>
```

---

## 3. Git Log

يسرد أمر `git log` جميع الالتزامات (commits) في تاريخ مشروعك.

```sh
git log
```

:::note [ملاحظة]
استخدم خيارات مثل `--oneline` أو `--graph` لتبسيط السجل أو تصويره بيانياً.
:::

---

## 4. Git Show

يعرض `git show` تفاصيل كائن Git محدد (مثل التزام، أو وسم، أو شجرة ملفات).

```sh
git show <commit>
```

---

## 5. Git Grep

يبحث `git grep` في قاعدة الأكواد الخاصة بك عن ظهور سلسلة نصية أو نمط محدد.

```sh
git grep -n <pattern>
```

---

## 6. Git Branch

لإنشاء أو سرد الفروع في مستودعك.

```sh
git branch
```

:::tip [نصيحة]
استخدم `git branch -d <branch>` لحذف فرع ما.
:::

---

## 7. Git Push

دفع التزاماتك المحلية إلى مستودع بعيد.

```sh
git push -u <remote> <branch>
```

---

## 8. Git Stash

حفظ التغييرات مؤقتاً دون إجراء التزام (commit) لها.

```sh
git stash
```

:::important [هام]
تذكر تشغيل `git stash pop` لإعادة تطبيق التغييرات التي قمت بحفظها مؤقتاً.
:::

---

## 9. Git Rebase

تحديث فرع ما عن طريق تطبيق الالتزامات فوق فرع أساسي.

```sh
git rebase <base>
```

:::caution [تنبيه]
تأكد من إدراك الفرق بين `rebase` و `merge` لتجنب إعادة كتابة التاريخ بشكل غير مقصود.
:::

---

## 10. Git Config

ضبط أو استرجاع الخيارات العامة أو الخاصة بمستودع معين.

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/mJ-qvsxPHpY" title="Git Tutorial For Dummies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>

## 11. Git Clone

استنساخ مستودع موجود إلى جهازك المحلي.

```sh
git clone <repository>
```

---

## 12. Git Init

إنشاء مستودع Git جديد.

```sh
git init
```

---

## 13. Git Checkout

التبديل بين الفروع أو استعادة الملفات.

```sh
git checkout <branch>
```

---

## 14. Git Reset

إعادة تعيين HEAD الحالي إلى التزام محدد.

```sh
git reset <commit>
```

---

## 15. Git Tag

إدارة الوسوم في مستودعك.

```sh
git tag
```

:::tip [نصيحة]
استخدم `git tag -a <tag>` لإنشاء وسم موثق (annotated tag).
:::

---

## 16. Git Archive

إنشاء أرشيف للملفات من التزام أو فرع محدد.

```sh
git archive
```

---

## 17. Git Commit

تسجيل التغييرات في المستودع.

```sh
git commit -m "Commit message"
```

---

## 18. Git Status

عرض حالة شجرة العمل.

```sh
git status
```

---

## 19. Git RM

إزالة الملفات من شجرة العمل والفهرس (index).

```sh
git rm <file>
```

---

## 20. Git Remote

إدارة مجموعة من المستودعات المتعقبة.

```sh
git remote add <name> <url>
```

---

## 21. Git Instaweb

تشغيل عارض مستودع Git محلي يعتمد على المتصفح.

```sh
git instaweb
```

---

## 22. Git Notes

إضافة معلومات إضافية إلى الالتزامات.

```sh
git notes add <message>
```

---

## 23. Git Bisect

تصحيح الأخطاء في مستودعك عن طريق تحديد الالتزام المسبب للمشكلة.

```sh
git bisect
```

---

## 24. Git Submodules

استيراد مستودعات أخرى كـ "وحدات فرعية" (submodules).

```sh
git submodule add <repository>
```

---

## 25. Git Bugreport

تجميع تقرير عن الأخطاء مع معلومات النظام والمستودع.

```sh
git bugreport
```

---

## 26. Git Fsck

التحقق من سلامة المستودع واستعادة الكائنات غير القابلة للوصول.

```sh
git fsck
```

---

## 27. Git Stripspace

إزالة المسافات البيضاء الزائدة من المستودع.

```sh
git stripspace
```

---

## 28. Git Hooks

تشغيل السكريبتات تلقائياً استجابةً لأحداث دورة حياة Git.

```sh
git hooks
```

---

## 29. Git Blame

إظهار من قام بآخر تعديل لسطر معين في ملف.

```sh
git blame <file>
```

---

## 30. Git LFS (Large File Storage)

إدارة الملفات الكبيرة في مستودع Git الخاص بك.

```sh
git lfs
```

---

## 31. Git Garbage Collection

تحسين أداء مستودعك عن طريق تنظيف الملفات غير الضرورية.

```sh
git gc
```

---

## 32. Git Describe

إنشاء اسم مقروء لالتزام معين بناءً على أحدث وسم.

```sh
git describe
```

---

## 33. Git Reflog

عرض جميع إجراءات Git التي تم تنفيذها على المستودع.

```sh
git reflog
```

---

## 34. Git Log (Enhanced)

تصور سجلات الالتزام باستخدام خيارات إضافية.

```sh
git log --graph --oneline
```

---

## 35. Git Cherry Pick

تطبيق التزام من فرع آخر على فرعك الحالي.

```sh
git cherry-pick <commit>
```

---

## 36. Git Switch

التبديل بسرعة بين الفروع.

```sh
git switch <branch>
```

:::note [ملاحظة]
يُعد `git switch` بديلاً حديثاً لـ `git checkout` لغرض التبديل بين الفروع.
:::

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/K6Q31YkorUE" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>