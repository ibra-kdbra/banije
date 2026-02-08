---
title: "예제가 포함된 Git 명령"
published: 2024-02-18
description: "워크플로를 간소화하기 위한 예제와 함께 필수 Git 명령에 대해 알아보세요."
image: ''
tags: [Git, Commands, Examples, Guide]
category: Version Control
draft: false
lang: "ko"
originalSlug: "gitCommands"

---

## 1. Git 병합

Git 병합을 사용하면 두 브랜치의 작업을 하나로 결합할 수 있습니다.

```sh
git merge <branch>
```

:::tip
한 브랜치의 변경 사항을 다른 브랜치(일반적으로 메인 브랜치)에 통합하려면 'git merge'를 사용하세요.
:::

---

## 2. 힘내 비교

Git diff는 Git 저장소 내의 두 커밋 또는 파일 간의 차이점을 보여줍니다.

```sh
git diff <source branch> <target branch>
```

## 3. Git 로그

는`git log`명령은 프로젝트 기록의 모든 커밋을 나열합니다.

```sh
git log
```

:::note
로그를 단순화하거나 시각화하려면 `--oneline` 또는 `--graph`와 같은 옵션을 사용하세요.
:::

---

## 4. Git 쇼

Git 쇼는 특정 Git 개체(예: 커밋, 태그 또는 트리)의 세부 정보를 표시합니다.

```sh
git show <commit>
```

## 5. Git Grep

Git grep은 코드베이스에서 특정 문자열이나 패턴이 나타나는지 검색합니다.

```sh
git grep -n <pattern>
```

## 6. Git 브랜치

저장소에 분기를 생성하거나 나열합니다.

```sh
git branch
```

:::tip
브랜치를 삭제하려면 `git Branch -d <branch>`를 사용하세요.
:::

---

## 7. Git 푸시

로컬 커밋을 원격 저장소로 푸시합니다.

```sh
git push -u <remote> <branch>
```

## 8. Git 스태시

변경 사항을 커밋하지 않고 일시적으로 저장합니다.

```sh
git stash
```

:::important
숨겨진 변경 사항을 다시 적용하려면 `git stash pop`을 실행하는 것을 잊지 마세요.
:::

---

## 9. Git 리베이스

기본 분기 위에 커밋을 적용하여 분기를 업데이트합니다.

```sh
git rebase <base>
```

:::caution
원치 않는 기록 재작성을 방지하려면 'rebase'와 'merge'의 차이점을 알고 있어야 합니다.
:::

---

## 10. 힘내 구성

전역 또는 저장소별 옵션을 설정하거나 가져옵니다.

```sh
git config --global user.name "Your Name"
git config --global user.email "<youremail@example.com>"
```

<iframe widt h="100%" heigh t="468" sr c="https://www.youtube.com/embed/mJ-qvsxPHpY"title="초보자를 위한 Git 튜토리얼" frameborde r="0" allo w="가속도계; 자동 재생; 클립보드 쓰기; 암호화된 미디어; 자이로스코프; 사진 속 사진; 웹 공유" allowfullscreen allowfullscreen></iframe>

## 11. Git 복제

기존 저장소를 로컬 머신에 복제합니다.

```sh
git clone <repository>
```

## 12. Git 초기화

새로운 Git 저장소를 생성합니다.

```sh
git init
```

## 13. Git 체크아웃

지점 간을 전환하거나 파일을 복원합니다.

```sh
git checkout <branch>
```

## 14. 힘내 재설정

현재 HEAD를 특정 커밋으로 재설정합니다.

```sh
git reset <commit>
```

## 15. 힘내 태그

저장소에서 태그를 관리하세요.

```sh
git tag
```

:::tip
주석이 달린 태그를 생성하려면 `git tag -a <tag>`를 사용하세요.
:::

---

## 16. Git 아카이브

특정 커밋 또는 분기에서 파일 아카이브를 만듭니다.

```sh
git archive
```

## 17. Git 커밋

저장소에 대한 변경 사항을 기록합니다.

```sh
git commit -m "Commit message"
```

## 18. 힘내 상태

작업 트리 상태를 표시합니다.

```sh
git status
```

## 19. 힘내 RM

작업 트리 및 인덱스에서 파일을 제거합니다.

```sh
git rm <file>
```

## 20. Git 원격

추적된 저장소 세트를 관리합니다.

```sh
git remote add <name> <url>
```

## 21. Git 인스타웹

로컬 웹 기반 Git 저장소 뷰어를 시작합니다.

```sh
git instaweb
```

## 22. Git 노트

커밋에 추가 정보를 추가합니다.

```sh
git notes add <message>
```

## 23. 힘내 바이섹트

문제가 있는 커밋을 찾아서 저장소를 디버그하세요.

```sh
git bisect
```

## 24. Git 하위 모듈

다른 저장소를 하위 모듈로 가져옵니다.

```sh
git submodule add <repository>
```

## 25. Git 버그 리포트

시스템 및 저장소 정보로 버그 보고서를 컴파일합니다.

```sh
git bugreport
```

## 26. Git Fsck

저장소의 무결성을 확인하고 연결할 수 없는 개체를 복구하세요.

```sh
git fsck
```

## 27. 힘내 스트립스페이스

저장소에서 후행 공백을 제거하십시오.

```sh
git stripspace
```

## 28. Git 후크

Git 수명 주기 이벤트에 대한 응답으로 스크립트를 자동으로 실행합니다.

```sh
git hooks
```

## 29. 힘내 비난

파일의 줄을 마지막으로 수정한 사람을 표시합니다.

```sh
git blame <file>
```

## 30. Git LFS(대형 파일 저장 공간)

Git 저장소에서 대용량 파일을 관리하세요.

```sh
git lfs
```

## 31. Git 가비지 컬렉션

불필요한 파일을 정리하여 저장소를 최적화하세요.

```sh
git gc
```

## 32. Git 설명

가장 최근 태그를 기반으로 커밋에 대해 읽을 수 있는 이름을 생성합니다.

```sh
git describe
```

## 33. Git 리프로그

저장소에서 수행된 모든 Git 작업을 봅니다.

```sh
git reflog
```

## 34. Git 로그(향상됨)

추가 옵션으로 커밋 로그를 시각화합니다.

```sh
git log --graph --oneline
```

## 35. 힘내 체리 픽

다른 브랜치의 커밋을 현재 브랜치에 적용합니다.

```sh
git cherry-pick <commit>
```

## 36. 힘내 스위치

지점 간을 빠르게 전환하세요.

```sh
git switch <branch>
```

:::note
`git switch`는 분기 전환을 위한 `git checkout`의 현대적인 대안입니다.
:::

---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/K6Q31YkorUE" title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen allowfullscreen></iframe>
