---
title: "Configuración y recuperación de unidades flash en Linux"
published: 2024-11-18
description: "Guípaso paso para comprobar, recuperar y formatear una unidad flash en Linux."
image: ''
tags: [Linux, Flash Drive, Recovery, Guide]
category: Tutorial
draft: false
lang: "es"
originalSlug: "flash_drive_setup"
---

Este documento proporciona una guípaso paso para comprobar, recuperar y formatear una unidad flash en Linux.

---

## Paso 1: verificar la información del disco

Enumere todas las unidades conectadas para identificar el dispositivo correcto:

```bash
sudo fdisk -l
```

- **Salida** ayudará a confirmar la capacidad real de la unidad flash (p. ej., `/dev/sdb`).

---

## Paso 2: comprobar si hay errores

Instalar y usar`smartctl`para realizar un control de salud:

Instale el `smartmontools` paquete:

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

## Paso 3: Limpiar el disco

Para borrar todos los datos, incluida la tabla de particiones:

```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M count=10
```

- `if=/dev/zero`: El archivo de entrada es `/dev/zero` (produce bytes puestos a cero).
- `of=/dev/sdb`: El archivo de salida es la unidad flash.
- `bs=1M`: El tamaño del bloque es 1 MB.
- `count=10`: Escribe 10 bloques (10 MB).

---

## Paso 4: Crear una nueva tabla de particiones

Lanzamiento`fdisk`para crear un nuevo diseño de partición:

```bash
sudo fdisk /dev/sdb
```

1. Cree una nueva tabla de particiones (MBR):

```bash
o
```

```bash
n
```

2. Escriba los cambios en el disco:

```bash
w
```

```bash
sudo fdisk -l /dev/sdb
```

## Paso 5: Formatear la partición

Formatee la partición recién creada con el sistema de archivos que desee:

- Para sistemas exclusivos de Linux (ext4):

```bash
sudo mkfs.ext4 /dev/sdb1
```

```bash
sudo mkfs.vfat -F 32 /dev/sdb1
```

## Paso 6: montar la partición

Cree un punto de montaje:

```bash
sudo mkdir /mnt/flashdrive
```

```bash
sudo mount /dev/sdb1 /mnt/flashdrive
```

```bash
df -h
```

## Opcional: Pruebe la unidad flash para detectar falsificaciones

Si la unidad muestra una capacidad incorrecta, utilice`f3`para verificar su verdadero tamaño:

Instalar `f3`:

```bash
sudo pacman -S f3
```

```bash
sudo f3probe --destructive --time-ops /dev/sdb
```

## Conclusión

Si sigue estopasos, puede recuperar y configurar una unidad flash, asegurándose de que se restablezcan su capacidad y funcionalidad. Para una automatización adicional, puede agregar la partición a`/etc/fstab`para montaje persistente.
