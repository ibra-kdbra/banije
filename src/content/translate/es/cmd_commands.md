---
title: "Comandos del símbolo del sistema de Windows (CMD)"
published: 2023-11-02
description: "Lista de comandos CMD esenciales para Windows."
image: ''
tags: [Windows, CMD, Commands, Productivity]
category: Guide
draft: false
lang: "es"
originalSlug: "cmd_commands"

---

## ASOC

:::note[El comando assoc se utiliza para mostrar o modificar asociaciones de extensiones de archivos.]
:::

```sh
assoc
```

## CHKDSK (Comprobar disco)

:::tip[Comprueba si hay errores en un disco y, si se solicita, corrige los errores.]
:::

```sh
chkdsk C:
```

## CIFRA

:::warning[Cifre o descifre archivos/directorios en particiones NTFS.]
:::

```sh
cipher /E
```

## CLS

:::note[Borra la pantalla de todos los comandos ingresados ​​previamente y otro texto.]
:::

```sh
cls
```

## PARTE DE DISCO

:::tip[Administrar particiones del disco duro.]
:::

```sh
diskpart
```

## CONSULTA DEL CONDUCTOR

:::warning[Muestra una lista de controladores de dispositivos instalados y sus propiedades.]
:::

```sh
driverquery
```

## GPUPDATE

:::note[Actualiza la configuración de la política de grupo.]
:::

```sh
gpupdate /force
```

## CONFIGURACIÓN DE IP

:::tip[Muestra la configuración de IP para todas las interfaces de red.]
:::

```sh
ipconfig /all
```

## NETSTAT

:::warning[Muestra conexiones TCP activas y varias estadísticas de red.]
:::

```sh
netstat -a
```

## BUSCARNS

:::note[Consulta el DNS para obtener el nombre de dominio o la asignación de direcciones IP.]
:::

```sh
nslookup <www.example.com>
```

## RUTA

:::tip[Proporciona información sobre pérdida y latencia de la red en saltos intermedios.]
:::

```sh
pathping <www.example.com>
```

## PING

:::note[Prueba la capacidad de la computadora de origen para llegar a una computadora de destino específica.]
:::

```sh
ping <www.example.com>
```

## PODERCFG

:::warning[Controla los ajustes y configuraciones de energía.]
:::

```sh
powercfg /hibernate on
```

## SFC (Comprobador de archivos del sistema)

:::note[Escanea y repara archivos importantes del sistema.]
:::

```sh
sfc /scannow
```

## CERRAR

:::tip[Apaga, reinicia o cierra la sesión de una computadora o computadora remota.]
:::

```sh
shutdown /s /t 0
```

## INFORMACIÓN DEL SISTEMA

:::note[Muestra información de configuración detallada sobre una computadora y su sistema operativo.]
:::

```sh
systeminfo
```

## LISTA DE TAREAS

:::tip[Muestra una lista de tareas, servicios y procesos en ejecución.]
:::

```sh
tasklist
```

## TRACERTO

:::warning[Muestra la ruta y los saltos que recorre un paquete para llegar a su destino.]
:::

```sh
tracert <www.example.com>
```

## Guía proporcionada para todos los comandos

:::important[Agregué todos los comandos CMD que se conocen en este [TerCli](https://tercli.netlify.app/)]
:::
