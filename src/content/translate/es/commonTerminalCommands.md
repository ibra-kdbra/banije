---
title: "Comandos de terminal comunes"
published: 2022-09-20
description: "Aprenda los comandos clave del terminal y su uso."
tags: [Terminal, Commands, Linux, MacOS, Windows, Shell]
category: Guide
draft: false 
lang: "es"
originalSlug: "commonTerminalCommands"

---

## Descripción general

Esta guía proporciona una lista completa de comandos de terminal esenciales, organizados por categorías como navegación, administración de archivos y más. Perfecto tanto para principiantes como para usuarios avanzados.

## Comandos clave y navegación

:::tip[Los atajos de teclado pueden ahorrar tiempo al navegar y utilizar el terminal.]
:::

- `Up Arrow`: Mostrará su último comando
- `Down Arrow`: Mostrará su siguiente comando
- `Tab`: Completará automáticamente su comando
- `Ctrl + L`: Limpiará la pantalla
- `Ctrl + C`: Cancelará un comando
- `Ctrl + R`: Buscará un comando
- `Ctrl + D`: Saldrá de la terminal

## Comando manual

:::note[El comando `man` muestra manuales de comandos en Linux y MacOS. Utilice `--help` para obtener una funcionalidad similar en Git Bash.]
:::

```bash
man ls
```

```bash
ls --help
```

:::important[El comando `whoami` muestra el usuario que ha iniciado sesión actualmente.]
:::

```bash
whoami
```

:::tip[El comando `fecha` muestra la fecha y hora actuales.]
:::

```bash
date
```

:::note[La navegación por el sistema de archivos es fundamental para el uso del terminal.]
:::

| Comando | Descripción |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| pwd | Muestra la ruta al directorio de trabajo |
| ls | Listar el contenido del directorio |
| ls-a | Listar contenidos incluidos archivos ocultos (archivos que comienzan con un punto) |
| ls -l | Lista de contenidos con más información, incluidos permisos (lista larga) |
| ls-r | Orden inverso del contenido de la lista |
| discos compactos | Cambiar directorio a inicio |
| cd [nombredirección] | Cambiar directorio a un directorio específico |
| discos compactos ~ | Cambiar al directorio de inicio |
| discos compactos .. | Cambiar al directorio principal |
| discos compactos - | Cambiar al directorio anterior |
| buscar [dirtosearch] -name [nombre de archivo] | Encontrar ubicación de un programa |

Combinar banderas, por ejemplo,`ls -la`para ver archivos detallados y ocultos.

## Abrir una carpeta o archivo

:::note[Los comandos difieren según el sistema operativo para abrir archivos, carpetas o URL.]
:::

- Mac: `open [dirname]`
- Ventanas: `start [dirname]`
- Linux: `xdg-open [dirname]`

```bash
open https://example.com
```

:::important[Aprenda a crear, eliminar, mover y cambiar el nombre de archivos y directorios.]
:::

| Comando | Descripción |
| --------------------------- | --------------------------------------------------- |
| mkdir [nombredir] | Crear directorio |
| toque [nombre de archivo] | Crear archivo |
| rm [nombre de archivo] | Eliminar archivo |
| rm -i [nombre de archivo] | Eliminar archivo con confirmación |
| rm -r [nombredirección] | Eliminar directorio |
| rm -rf [nombredirección] | Forzar eliminación de directorio |
| rm ./\* | Eliminar todo lo que hay en la carpeta actual |
| cp [nombre de archivo] [nombre de directorio] | Copiar archivo |
| mv [nombre de archivo] [nombre de directorio] | Mover archivo |
| mv [nombre de archivo] [nombre de archivo] | Cambiar nombre de archivo |

Crear directorios anidados:

```bash
mkdir -p ./home/{a,b}/{x,y,z}
```

```bash
cd test2 && mkdir test3
```

:::tip[Redirigir la salida del comando a un archivo.]
:::

```bash
> [filename]
```

## La`cat`Dominio

:::note[`cat` muestra o crea archivos y los combina.]
:::

```bash
cat [filename]
cat > [filename]
cat >> [filename]
```

```bash
cat -n [filename]
```

:::tip[Desplácese por un archivo con "menos".]
:::

```bash
less [filename]
```

## La`echo`Dominio

:::important[Eco de texto a la terminal o archivos.]
:::

```bash
echo "Hello World"
echo "Hello World" > [filename]
```

:::note[`nano` es un editor de texto fácil de usar.]
:::

```bash
nano [filename]
```

## La`head`y`tail`Comandos

:::tip[Muestra el inicio (`head`) o el final (`tail`) de los archivos.]
:::

```bash
head -n 5 [filename]
tail -n 5 [filename]
```

:::note[Busque patrones de texto en archivos.]
:::

```bash
grep [searchterm] [filename]
```

:::important[Busque archivos por nombre, patrón o propiedades.]
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

:::tip[Canalice la salida de un comando a otro.]
:::

```bash
find . -name "file-0*" > output.txt
cat output.txt
```

:::note[Crea enlaces simbólicos a archivos.]
:::

```bash
ln -s [filename] [symlinkname]
```

```bash
rm [symlinkname]
```

:::important[Crea y extrae archivos tar con `tar`.]
:::

| Comando | Descripción |
| ----------------------------------- | -------------------------- |
| tar czvf [nombredirección].tar.gz [nombredirección] | Crear archivo comprimido |
| tar tzvf [nombredir] | Ver contenidos tarball |
| tar xzvf [nombredir].tar.gz | Extraer archivo tar |

## El`history`Dominio

:::note[Ver y ejecutar comandos anteriores.]
:::

```bash
history
!100
```

## Guía proporcionada para todos los comandos

:::important[Agregué todos los comandos de terminal que se conocen en este [TerCli](https://tercli.netlify.app/)]
:::
