---
title: "Windows 명령 프롬프트(CMD) 명령"
published: 2023-11-02
description: "Windows용 필수 CMD 명령 목록입니다."
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "ko"
originalSlug: "cmd_commands"

---

## ASSOC

:::note
[Purpose]
assoc 명령은 파일 확장자 연결을 표시하거나 수정하는 데 사용됩니다.
:::

```sh
assoc
```

## CHKDSK(디스크 검사)

:::tip
[Purpose]
디스크에 오류가 있는지 확인하고 요청 시 오류를 수정합니다.
:::

```sh
chkdsk C:
```

## 암호

:::warning
[Purpose]
NTFS 파티션의 파일/디렉터리를 암호화하거나 해독합니다.
:::

```sh
cipher /E
```

## CLS

:::note
[Purpose]
이전에 입력한 모든 명령과 기타 텍스트의 화면을 지웁니다.
:::

```sh
cls
```

## 디스크파트

:::tip
[Purpose]
하드 드라이브 파티션을 관리합니다.
:::

```sh
diskpart
```

## 드라이버 쿼리

:::warning
[Purpose]
설치된 장치 드라이버 및 해당 속성 목록을 표시합니다.
:::

```sh
driverquery
```

## GPUPDATE

:::note
[Purpose]
그룹 정책 설정을 업데이트합니다.
:::

```sh
gpupdate /force
```

## IPCONFIG

:::tip
[Purpose]
모든 네트워크 인터페이스에 대한 IP 구성을 표시합니다.
:::

```sh
ipconfig /all
```

## NETSTAT

:::warning
[Purpose]
활성 TCP 연결과 다양한 네트워킹 통계를 표시합니다.
:::

```sh
netstat -a
```

## NSLOOKUP

:::note
[Purpose]
도메인 이름이나 IP 주소 매핑을 얻기 위해 DNS를 쿼리합니다.
:::

```sh
nslookup <www.example.com>
```

## 경로 지정

:::tip
[Purpose]
중간 홉에서 네트워크 대기 시간 및 손실 정보를 제공합니다.
:::

```sh
pathping <www.example.com>
```

## 핑

:::note
[Purpose]
지정된 대상 컴퓨터에 연결하는 원본 컴퓨터의 기능을 테스트합니다.
:::

```sh
ping <www.example.com>
```

## POWERCFG

:::warning
[Purpose]
전원 설정 및 구성을 제어합니다.
:::

```sh
powercfg /hibernate on
```

## SFC(시스템 파일 검사기)

:::note
[Purpose]
중요한 시스템 파일을 검사하고 복구합니다.
:::

```sh
sfc /scannow
```

## 종료

:::tip
[Purpose]
컴퓨터나 원격 컴퓨터를 종료하거나 다시 시작하거나 로그오프합니다.
:::

```sh
shutdown /s /t 0
```

## 시스템 정보

:::note
[Purpose]
컴퓨터 및 해당 운영 체제에 대한 자세한 구성 정보를 표시합니다.
:::

```sh
systeminfo
```

## 작업 목록

:::tip
[Purpose]
실행 중인 작업, 서비스 및 프로세스 목록을 표시합니다.
:::

```sh
tasklist
```

## 트레이서트

:::warning
[Purpose]
패킷이 목적지에 도달하는 데 걸리는 경로와 홉을 표시합니다.
:::

```sh
tracert <www.example.com>
```

## 모든 명령어에 대한 가이드 제공

:::important
:::나는 이것에 알려진 모든 CMD 명령을 추가했습니다.[TerCli](https://tercli.netlify.app/)
