---
title: "일반적인 터미널 명령"
published: 2022-09-20
description: "주요 터미널 명령과 그 사용법에 대해 알아봅니다."
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false
lang: "ko"
originalSlug: "commonTerminalCommands"

---

## 개요

이 가이드는 탐색, 파일 관리 등과 같은 카테고리별로 구성된 필수 터미널 명령의 포괄적인 목록을 제공합니다. 초보자와 고급 사용자 모두에게 적합합니다.

## 주요 명령 및 탐색

:::tip[팁]
키보드 단축키를 사용하면 터미널을 탐색하고 사용할 때 시간을 절약할 수 있습니다.
:::

- `Up Arrow`: 마지막 명령을 보여줍니다.
- `Down Arrow`: 다음 명령을 보여줍니다.
- `Tab`: 명령을 자동 완성합니다.
- `Ctrl + L`: 화면을 지웁니다.
- `Ctrl + C`: 명령을 취소합니다.
- `Ctrl + R`: 명령을 검색합니다.
- `Ctrl + D`: 터미널을 종료합니다.

## 매뉴얼 명령

:::note[`man` 명령 사용]
`man` 명령은 Linux 및 MacOS에서 명령에 대한 매뉴얼을 표시합니다. Git Bash에서 유사한 기능을 사용하려면 `--help`를 사용하십시오.
:::

```bash
man ls
```

Git Bash 또는 Windows의 경우:

```bash
ls --help
```

## `whoami` 명령

:::important[현재 사용자 식별]
`whoami` 명령은 현재 로그인된 사용자를 표시합니다.
:::

```bash
whoami
```

## `date` 명령

:::tip[현재 날짜 및 시간 확인]
`date` 명령은 현재 날짜와 시간을 보여줍니다.
:::

```bash
date
```

## 파일 시스템 탐색

:::note[필수 탐색 명령]
파일 시스템 탐색은 터미널 사용의 기본입니다.
:::

| 명령 | 설명 |
| :--- | :--- |
| pwd | 현재 작업 디렉터리의 경로를 나열합니다. |
| ls | 디렉터리 내용을 나열합니다. |
| ls -a | 숨겨진 파일(점으로 시작하는 파일)을 포함한 내용을 나열합니다. |
| ls -l | 권한을 포함한 더 많은 정보와 함께 내용을 나열합니다(긴 목록). |
| ls -r | 내용을 역순으로 나열합니다. |
| cd | 홈 디렉터리로 이동합니다. |
| cd [dirname] | 특정 디렉터리로 이동합니다. |
| cd ~ | 홈 디렉터리로 이동합니다. |
| cd .. | 부모 디렉터리로 이동합니다. |
| cd - | 이전 디렉터리로 이동합니다. |
| find [dirtosearch] -name [filename] | 프로그램의 위치를 찾습니다. |

`ls -la`와 같이 플래그를 결합하여 상세 정보와 숨겨진 파일을 볼 수 있습니다.

## 폴더 또는 파일 열기

:::note[디렉터리, 파일 또는 URL 열기]
파일, 폴더 또는 URL을 여는 명령은 운영 체제마다 다릅니다.
:::

- Mac: `open [dirname]`
- Windows: `start [dirname]`
- Linux: `xdg-open [dirname]`

```bash
open https://example.com
```

## 파일 및 디렉터리 수정

:::important[파일 및 디렉터리 관리 명령]
파일과 디렉터리를 생성, 삭제, 이동 및 이름 변경하는 방법을 알아봅니다.
:::

| 명령 | 설명 |
| :--- | :--- |
| mkdir [dirname] | 디렉터리를 생성합니다. |
| touch [filename] | 파일을 생성합니다. |
| rm [filename] | 파일을 제거합니다. |
| rm -i [filename] | 확인 후 파일을 제거합니다. |
| rm -r [dirname] | 디렉터리를 제거합니다. |
| rm -rf [dirname] | 디렉터리를 강제로 제거합니다. |
| rm ./\* | 현재 폴더의 모든 내용을 제거합니다. |
| cp [filename] [dirname] | 파일을 복사합니다. |
| mv [filename] [dirname] | 파일을 이동합니다. |
| mv [filename] [filename] | 파일 이름을 변경합니다. |

중첩된 디렉터리 생성:

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

여러 명령 실행:

```bash
cd test2 && mkdir test3
```

## 오른쪽 꺾쇠 괄호 `>`

:::tip[출력 리다이렉트]
명령 출력을 파일로 리다이렉트합니다.
:::

```bash
> [filename]
```

`Ctrl+D`로 종료합니다.

## `cat` 명령

:::note[파일 연결]
`cat`은 파일을 표시하거나 생성하고 이를 결합합니다.
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

행 번호 표시:

```bash
cat -n [filename]
```

## `less` 명령

:::tip[파일 내용 보기]
`less`를 사용하여 파일을 스크롤합니다.
:::

```bash
less [filename]
```

`q`로 종료합니다.

## `echo` 명령

:::important[텍스트 표시 또는 파일에 쓰기]
텍스트를 터미널 또는 파일에 출력합니다.
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

## `nano` 명령

:::note[텍스트 파일 편집]
`nano`는 사용자 친화적인 텍스트 편집기입니다.
:::

```bash
nano [filename]
```

`Ctrl+X`로 종료합니다. `Y`로 저장합니다.

## `head` 및 `tail` 명령

:::tip[파일 부분 보기]
파일의 시작(`head`) 또는 끝(`tail`)을 표시합니다.
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

## `grep` 명령

:::note[파일 내용 검색]
파일에서 텍스트 패턴을 검색합니다.
:::

```bash
grep [searchterm] [filename]
```

## `find` 명령

:::important[파일 또는 디렉터리 찾기]
이름, 패턴 또는 속성별로 파일을 검색합니다.
:::

```bash
find [dirname] -name [filename]
```

테스트 파일 생성:

```bash
touch file-{001..100}.txt
find . -empty
```

파일 제거:

```bash
find . -name "file-*" -delete
```

## 파이핑 (Piping)

:::tip[출력 리다이렉트]
한 명령의 출력을 다른 명령으로 전달합니다.
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

## 심볼릭 링크 생성

:::note[바로가기 만들기]
파일에 대한 심볼릭 링크를 생성합니다.
:::

```bash
ln -s [filename] [symlinkname]
```

제거:

```bash
rm [symlinkname]
```

## 파일 압축

:::important[아카이브 관리]
`tar`를 사용하여 타르볼을 생성하고 압축을 풉니다.
:::

| 명령 | 설명 |
| :--- | :--- |
| tar czvf [dirname].tar.gz [dirname] | 타르볼 생성 |
| tar tzvf [dirname] | 타르볼 내용 보기 |
| tar xzvf [dirname].tar.gz | 타르볼 압축 풀기 |

## `history` 명령

:::note[명령 기록]
과거 명령을 보고 실행합니다.
:::

```bash
history
!100
```

기록에서 100번째 명령을 실행합니다.

## 모든 명령에 대한 제공된 가이드

:::important[중요]
나는 이 [TerCli](https://tercli.netlify.app/)에 알려진 모든 터미널 명령을 추가했습니다.
:::
