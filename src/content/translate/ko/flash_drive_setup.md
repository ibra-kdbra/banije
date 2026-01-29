---
title: "Linux에서 플래시 드라이브 설정 및 복구"
published: 2024-11-18
description: "Linux에서 플래시 드라이브를 확인, 복구 및 포맷하는 단계별 가이드입니다."
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "ko"
originalSlug: "flash_drive_setup"

---

이 문서는 Linux에서 플래시 드라이브를 확인, 복구 및 포맷하는 방법에 대한 단계별 가이드를 제공합니다. 

--- 

## **1단계: 디스크 정보 확인** 

올바른 장치를 식별하려면 연결된 모든 드라이브를 나열하십시오.
```bash
sudo fdisk -l
```
- **출력**은 플래시 드라이브의 실제 용량을 확인하는 데 도움이 됩니다(예:`/dev/sdb`). 

--- 

## **2단계: 오류 확인** 

설치 및 사용`smartctl`상태 확인을 수행하려면: 

1. 설치`smartmontools`패키지:
```bash
   sudo pacman -S smartmontools
```

```bash
   sudo smartctl -i /dev/sdb
```

```bash
   sudo smartctl -t long /dev/sdb
```

--- 

## **3단계: 디스크 지우기** 

파티션 테이블을 포함한 모든 데이터를 지우려면:
```bash
sudo dd i f=/dev/zero o f=/dev/sdb b s=1M coun t=10
```
-`i f=/dev/zero`: 입력 파일은`/dev/zero`(0으로 된 바이트를 생성합니다). 
-`o f=/dev/sdb`: 출력 파일은 플래시 드라이브입니다. 
-`b s=1M`: 블록 크기는 1MB입니다. 
-`coun t=10`: 10블록(10MB)을 씁니다. 

--- 

## **4단계: 새 파티션 테이블 생성** 

발사`fdisk`새 파티션 레이아웃을 생성하려면:
```bash
sudo fdisk /dev/sdb
```
1. 새 파티션 테이블(MBR)을 생성합니다.
```bash
     o
```

```bash
     n
```
4. 디스크에 변경 사항을 씁니다.
```bash
     w
```

```bash
sudo fdisk -l /dev/sdb
```

## **5단계: 파티션 포맷** 

원하는 파일 시스템으로 새로 생성된 파티션을 포맷합니다. 

- Linux 전용 시스템(ext4)의 경우:
```bash
  sudo mkfs.ext4 /dev/sdb1
```

```bash
  sudo mkfs.vfat -F 32 /dev/sdb1
```

## **6단계: 파티션 마운트** 

1. 마운트 지점을 생성합니다:
```bash
   sudo mkdir /mnt/flashdrive
```

```bash
   sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
   df -h
```

## **선택 사항: 위조 여부를 확인하기 위해 플래시 드라이브 테스트** 

드라이브에 잘못된 용량이 표시되면 다음을 사용하십시오.`f3`실제 크기를 확인하려면: 

1. 설치`f3`:
```bash
   sudo pacman -S f3
```

```bash
   sudo f3probe --destructive --time-ops /dev/sdb
```

## **결론** 

다음 단계를 수행하면 플래시 드라이브를 복구 및 설정하여 용량과 기능을 복원할 수 있습니다. 추가 자동화를 위해 파티션을 추가할 수 있습니다.`/etc/fstab`지속적인 장착을 위해.