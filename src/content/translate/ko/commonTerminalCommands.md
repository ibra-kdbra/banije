---
title: "공통 터미널 명령"
published: 2022-09-20
description: "주요 터미널 명령과 사용법을 알아보세요."
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false 
lang: "ko"
originalSlug: "commonTerminalCommands"

---

## 개요 

이 가이드는 탐색, 파일 관리 등과 같은 범주별로 구성된 필수 터미널 명령의 포괄적인 목록을 제공합니다. 초보자와 고급 사용자 모두에게 적합합니다. 

## 주요 명령 및 탐색

:::tip
터미널 탐색 및 사용 시 키보드 단축키를 사용하면 시간을 절약할 수 있습니다.
:::-`Up Arrow`: 마지막 명령이 표시됩니다. 
-`Down Arrow`: 다음 명령이 표시됩니다. 
-`Tab`: 명령을 자동 완성합니다. 
-`Ctrl + L`: 화면을 지웁니다. 
-`Ctrl + C`: 명령을 취소합니다. 
-`Ctrl + R`: 명령을 검색합니다. 
-`Ctrl + D`: 터미널을 빠져나갑니다 

## 수동 명령

:::note
[Using `man` Command]
`man` 명령은 Linux 및 MacOS의 명령 설명서를 표시합니다. Git Bash에서 비슷한 기능을 사용하려면 `--help`를 사용하세요.
:::

```bash
man ls
```

```bash
ls --help
```

:::important
[Identify Current User]
'whoami' 명령은 현재 로그인된 사용자를 표시합니다.
:::

```bash
whoami
```

:::tip
[Get Current Date & Time]
'date' 명령은 현재 날짜와 시간을 표시합니다.
:::

```bash
date
```

:::note
[Essential Navigation Commands]
파일 시스템 탐색은 터미널 사용의 기본입니다.
:::| 명령 | 설명 | 
| ---------------------- | --------------------------------------------------------------------------------- | 
| 비밀번호 | 작업 디렉토리의 경로를 나열합니다. | 
| ls | 디렉토리 내용 나열 | 
| ls -a | 숨겨진 파일을 포함한 내용 나열(점으로 시작하는 파일) | 
| ls -l | 권한을 포함한 추가 정보가 포함된 콘텐츠 나열(긴 목록) | 
| ls -r | 목록 내용 역순 | 
| CD | 디렉토리를 홈으로 변경 | 
| cd [디렉터리 이름] | 디렉토리를 특정 디렉토리로 변경 | 
| CD ~ | 홈 디렉토리로 변경 | 
| CD .. | 상위 디렉토리로 변경 | 
| CD - | 이전 디렉토리로 변경 | 
| find [dirtosearch] -name [파일 이름] | 프로그램 위치 찾기 | 

플래그 결합(예:`ls -la`자세한 파일과 숨겨진 파일을 보려면 

## 폴더나 파일 열기

:::note
[Open Directories, Files, or URLs]
파일, 폴더 또는 URL을 여는 명령은 운영 체제마다 다릅니다.
:::- 맥:`open [dirname]`- 윈도우:`start [dirname]`- 리눅스:`xdg-open [dirname]`

```bash
open https://example.com
```

:::important
[File & Directory Management Commands]
파일과 디렉터리를 생성, 삭제, 이동하고 이름을 바꾸는 방법을 알아보세요.
:::| 명령 | 설명 | 
| -------------- | -------------------------------------- | 
| mkdir [디렉터리 이름] | 디렉토리 만들기 | 
| [파일 이름] 터치 | 파일 생성 | 
| rm [파일명] | 파일 제거 | 
| rm -i [파일 이름] | 확인 후 파일 제거 | 
| rm -r [디렉터리 이름] | 디렉토리 제거 | 
| rm -rf [디렉터리 이름] | 강제로 디렉토리 제거 | 
| rm ./\* | 현재 폴더의 모든 항목 제거 | 
| cp [파일명] [디렉터리명] | 파일 복사 | 
| mv [파일 이름] [디렉터리 이름] | 파일 이동 | 
| mv [파일 이름] [파일 이름] | 파일 이름 바꾸기 | 

중첩된 디렉터리를 만듭니다.
```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

```bash
cd test2 && mkdir test3
```

:::tip
[Redirect Output]
명령 출력을 파일로 리디렉션합니다.
:::

```bash
> [filename]
```

##`cat`명령

:::note
[Concatenate Files]
`cat`은 파일을 표시하거나 생성하고 결합합니다.
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

```bash
cat -n [filename]
```

:::tip
[View File Contents]
'less'를 사용하여 파일을 스크롤합니다.
:::

```bash
less [filename]
```

##`echo`명령

:::important
[Display Text or Write to Files]
터미널이나 파일에 텍스트를 에코합니다.
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

:::note
[Edit Text Files]
`nano`는 사용자 친화적인 텍스트 편집기입니다.
:::

```bash
nano [filename]
```

##`head`그리고`tail`명령

:::tip
[View File Parts]
파일의 시작(`head`) 또는 끝(`tail`)을 표시합니다.
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

:::note
[Search File Content]
파일에서 텍스트 패턴을 검색합니다.
:::

```bash
grep [searchterm] [filename]
```

:::important
[Locate Files or Directories]
이름, 패턴 또는 속성으로 파일을 검색합니다.
:::

```bash
find [dirname] -name [filename]
```

```bash
touch file-{001..100}.txt
find . -empty
```

```bash
find . -name "file-*" -delete
```

:::tip
[Redirect Output]
한 명령의 출력을 다른 명령으로 파이프합니다.
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

:::note
[Create Shortcuts]
파일에 대한 심볼릭 링크를 만듭니다.
:::

```bash
ln -s [filename] [symlinkname]
```

```bash
rm [symlinkname]
```

:::important
[Manage Archives]
`tar`를 사용하여 타르볼을 만들고 추출합니다.
:::| 명령 | 설명 | 
| ---------------------- | ------------- | 
| tar czvf [디렉터리 이름].tar.gz [디렉터리 이름] | 타르볼 생성 | 
| tar tzvf [디렉터리 이름] | 타르볼 내용 보기 | 
| tar xzvf [디렉터리 이름].tar.gz | 타르볼 추출 | 

##`history`명령

:::note
[Command History]
과거 명령을 보고 실행합니다.
:::

```bash
history
!100
```

## 모든 명령어에 대한 가이드 제공

:::important
:::나는 이것에 알려진 모든 터미널 명령을 추가했습니다.[TerCli](https://tercli.netlify.app/)
