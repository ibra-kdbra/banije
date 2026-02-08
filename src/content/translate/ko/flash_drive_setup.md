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

이 문서는 Linux에서 플래시 드라이브를 확인, 복구 및 포맷하는 단계별 가이드를 제공합니다.

---

## 1단계: 디스크 정보 확인

연결된 모든 드라이브를 나열하여 올바른 장치를 확인합니다.

```bash
sudo fdisk -l
```

- 이 명령은 모든 디스크 파티션과 디스크 크기, 섹터 크기, 파티션 레이아웃과 같은 세부 정보를 나열합니다.

- **출력**을 통해 플래시 드라이브의 실제 용량(예: `/dev/sdb`)을 확인할 수 있습니다.

---

## 2단계: 오류 확인

`smartctl`을 설치하고 사용하여 상태 점검을 수행합니다.

1. `smartmontools` 패키지를 설치합니다.

```bash

sudo pacman -S smartmontools
```

2. 자세한 장치 정보를 가져옵니다.

```bash

sudo smartctl -i /dev/sdb
```

3. 비파괴 상태 테스트를 실행합니다(지원되는 경우).

```bash

sudo smartctl -t long /dev/sdb
```

- **참고**: "지원되지 않는 SCSI opcode"와 같은 오류가 발생하며 테스트가 실패하는 경우, 해당 장치가 SMART 기능을 지원하지 않을 수 있습니다.

---

## 3단계: 디스크 초기화

파티션 테이블을 포함한 모든 데이터를 지우려면 다음 명령을 실행합니다.

```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M count=10
```

- **설명**:

- `if=/dev/zero`: 입력 파일은 `/dev/zero`입니다(0으로 채워진 바이트를 출력합니다).

- `of=/dev/sdb`: 출력 파일은 USB 플래시 드라이브입니다.

- `bs=1M`: 블록 크기는 1MB입니다.

- `count=10`: 10개의 블록(10MB)을 기록합니다.

---

## 4단계: 새 파티션 테이블 생성

`fdisk` 명령어를 실행하여 새 파티션 레이아웃을 생성합니다.

```bash
sudo fdisk /dev/sdb
```

- **`fdisk` 명령어**:

1. 새 파티션 테이블(MBR) 생성:

```bash
o
```

1. 기본 파티션 생성:

```bash
n
```

1. 변경 사항을 디스크에 기록:

```bash
w
```

파티션 테이블 확인:

```bash
sudo fdisk -l /dev/sdb
```

---

## 5단계: 파티션 포맷

새로 생성된 파티션을 원하는 파일 시스템으로 포맷합니다.

- Linux 전용 시스템(ext4)의 경우:

```bash
sudo mkfs.ext4 /dev/sdb1

```

- 크로스 플랫폼 호환성(FAT32):

```bash
sudo mkfs.vfat -F 32 /dev/sdb1

``

---

## 6단계: 파티션 마운트**

1. 마운트 지점 생성:

```bash
sudo mkdir /mnt/flashdrive
```

2. 파티션 마운트:

```bash
sudo mount /dev/sdb1 /mnt/flashdrive
```

3. 마운트 확인:

```bash
df -h
```

---

## 선택 사항: 플래시 드라이브 위조 여부 검사

드라이브 용량이 잘못 표시되는 경우, `f3` 명령어를 사용하여 실제 용량을 확인합니다.

1. `f3` 설치:

```bash
sudo pacman -S f3
```

2. 테스트 드라이브:

```bash
sudo f3probe --destructive --time-ops /dev/sdb
```

---

## 결론

위의 단계를 따르면 플래시 드라이브를 복구하고 설정하여 용량과 기능을 복원할 수 있습니다. 추가적인 자동화를 위해 파티션을 `/etc/fstab` 파일에 추가하여 영구적으로 마운트할 수 있습니다.
