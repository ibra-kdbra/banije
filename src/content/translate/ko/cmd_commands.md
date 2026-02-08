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

:::note[목적]
assoc 명령은 파일 확장자 연결을 표시하거나 수정하는 데 사용됩니다.
:::

```sh
assoc
```

이 명령은 현재 파일 연결을 표시합니다.

## CHKDSK (Check Disk)

:::tip[목적]
디스크에 오류가 있는지 확인하고 요청 시 오류를 수정합니다.
:::

```sh
chkdsk C:
```

이 명령은 디스크 C:의 오류를 확인합니다.

## CIPHER

:::warning[목적]
NTFS 파티션의 파일/디렉터리를 암호화하거나 해독합니다.
:::

```sh
cipher /E
```

이 명령은 지정된 디렉터리를 암호화합니다.

## CLS

:::note[목적]
이전에 입력한 모든 명령과 기타 텍스트의 화면을 지웁니다.
:::

```sh
cls
```

이 명령은 명령 프롬프트 화면을 지웁니다.

## DISKPART

:::tip[목적]
하드 드라이브 파티션을 관리합니다.
:::

```sh
diskpart
```

이 명령은 DiskPart 명령 인터프리터를 시작합니다.

## DRIVERQUERY

:::warning[목적]
설치된 장치 드라이버 및 해당 속성 목록을 표시합니다.
:::

```sh
driverquery
```

이 명령은 설치된 모든 장치 드라이버 목록을 표시합니다.

## GPUPDATE

:::note[목적]
그룹 정책 설정을 업데이트합니다.
:::

```sh
gpupdate /force
```

이 명령은 그룹 정책 설정을 즉시 업데이트하도록 강제합니다.

## IPCONFIG

:::tip[목적]
모든 네트워크 인터페이스에 대한 IP 구성을 표시합니다.
:::

```sh
ipconfig /all
```

이 명령은 모든 네트워크 인터페이스에 대한 자세한 IP 구성 데이터를 표시합니다.

## NETSTAT

:::warning[목적]
활성 TCP 연결과 다양한 네트워킹 통계를 표시합니다.
:::

```sh
netstat -a
```

이 명령은 모든 활성 TCP 연결과 컴퓨터가 수신 대기 중인 TCP 및 UDP 포트를 표시합니다.

## NSLOOKUP

:::note[목적]
도메인 이름이나 IP 주소 매핑을 얻기 위해 DNS를 쿼리합니다.
:::

```sh
nslookup <www.example.com>
```

이 명령은 <www.example.com>의 IP 주소를 반환합니다.

## PATHPING

:::tip[목적]
중간 홉에서 네트워크 대기 시간 및 손실 정보를 제공합니다.
:::

```sh
pathping <www.example.com>
```

이 명령은 <www.example.com>에 도달하기 위한 각 네트워크 홉에 대한 대기 시간 및 손실 정보를 제공합니다.

## PING

:::note[목적]
지정된 대상 컴퓨터에 연결하는 원본 컴퓨터의 기능을 테스트합니다.
:::

```sh
ping <www.example.com>
```

이 명령은 <www.example.com>에 네트워크 요청을 보내고 응답을 기다립니다.

## POWERCFG

:::warning[목적]
전원 설정 및 구성을 제어합니다.
:::

```sh
powercfg /hibernate on
```

이 명령은 최대 절전 모드를 활성화합니다.

## SFC (System File Checker)

:::note[목적]
중요한 시스템 파일을 검사하고 복구합니다.
:::

```sh
sfc /scannow
```

이 명령은 보호된 모든 시스템 파일을 즉시 검사합니다.

## SHUTDOWN

:::tip[목적]
컴퓨터나 원격 컴퓨터를 종료하거나 다시 시작하거나 로그오프합니다.
:::

```sh
shutdown /s /t 0
```

이 명령은 컴퓨터를 즉시 종료합니다.

## SYSTEMINFO

:::note[목적]
컴퓨터 및 해당 운영 체제에 대한 자세한 구성 정보를 표시합니다.
:::

```sh
systeminfo
```

이 명령은 자세한 시스템 정보를 표시합니다.

## TASKLIST

:::tip[목적]
실행 중인 작업, 서비스 및 프로세스 목록을 표시합니다.
:::

```sh
tasklist
```

이 명령은 현재 실행 중인 작업 목록을 표시합니다.

## TRACERT

:::warning[목적]
패킷이 목적지에 도달하는 데 걸리는 경로와 홉을 표시합니다.
:::

```sh
tracert <www.example.com>
```

이 명령은 패킷이 <www.example.com>에 도달하기 위해 거치는 경로를 보여줍니다.

## 모든 명령에 대한 제공된 가이드

:::important
나는 이것에 알려진 모든 CMD 명령을 추가했습니다 [TerCli](https://tercli.netlify.app/)
:::
