---
title: "Ingeniería backend avanzada: desde sistemas distribuidos hasta arquitecturas resilientes"
published: 2025-05-12
description: "Una guía avanzada para sistemas distribuidos que cubre modelos de consistencia, patrones de resiliencia, abastecimiento de eventos, CQRS y arquitecturas backend modernas para crear aplicaciones escalables y tolerantes a fallas."
image: ''
tags: [Backend, Distributed Systems, Architecture, Resilience, CQRS, Event Sourcing, Microservices]
category: Backend Development
draft: false
lang: "es"
originalSlug: "deep-dive-into-backend-development-v2"
series:
    name: "Backend Engineering"
    order: 2
---

## 1.0 Introducción: Las leyes ineludibles de la distribución

La versión 1.0 de esta serie sentó las bases, definiendo las funciones, las herramientas y los patrones arquitectónicos iniciales de la ingeniería backend. Exploramos monolitos y microservicios, SQL y NoSQL, REST y GraphQL. Ese conocimiento representa la base necesaria para crear aplicaciones funcionales. Este volumen, sin embargo, trata sobre lo que sucede cuando escalamos esas aplicaciones; cuando nuestro único servidor se convierte en una flota, nuestra única base de datos se convierte en un clúster y nuestras llamadas en proceso se convierten en saltos de red. Este es el ámbito de los **sistemas distribuidos** y se rige por un conjunto de reglas diferente y más estricto.

La transición de un sistema monomáquina a uno distribuido no es un aumento lineal de la complejidad; es un cambio de paradigma. Supuestos que son válidos en una sola máquina; redes confiables, latencia cero, operaciones instantáneas; están destrozados. El objetivo principal del ingeniero backend avanzado es construir sistemas que puedan funcionar de manera correcta y confiable a pesar de la falta de confiabilidad inherente del entorno subyacente.

### 1.1 Las ocho falacias de la informática distribuida

En la década de 1990, L. Peter Deutsch y otros de Sun Microsystems compilaron una lista de falacias; suposiciones que los programadores nuevos en aplicaciones distribuidas invariablemente hacen, bajo su propio riesgo.

:::caution[Falacias de la Computación Distribuida]

1. **La red es confiable.** (No lo es).
2. **La latencia es cero.** (No lo es).
3. **El ancho de banda es infinito.** (No lo es).
4. **La red es segura.** (No lo es).
5. **La topología no cambia.** (Lo hace.)
6. **Hay un administrador.** (Hay muchos).
7. **El costo de transporte es cero.** (No lo es.)
8. **La red es homogénea.** (No lo es.)

:::

Cada patrón, protocolo y arquitectura analizados en este volumen es, de alguna manera, una estrategia para mitigar las consecuencias de estas falacias.

### 1.2 Una hoja de ruta para la ingeniería backend avanzada

Sobre la base de nuestra base, exploramos los temas avanzados que definen la arquitectura de sistemas modernos:

* **Sección 2: Gestión avanzada de datos y coherencia**
* **Sección 3: Patrones de diseño de sistemas resilientes**
* **Sección 4: Comunicación asincrónica avanzada**
* **Sección 5: Ingeniería del rendimiento a escala**
* **Sección 6: API avanzadas y arquitecturas de seguridad**

## 2.0 Gestión avanzada de datos y coherencia

En una aplicación de servidor único con una base de datos, la coherencia de los datos se resuelve en gran medida mediante transacciones ACID. En un sistema distribuido, la coherencia se convierte en uno de los desafíos más difíciles.

### 2.1 El espectro de consistencia y el teorema PACELC

El teorema CAP describe el comportamiento durante las particiones de la red, pero el **teorema PACELC** proporciona una imagen más completa:

:::note[Teorema PACELC]
**"Si hay una Partición (P), un sistema distribuido debe elegir entre Disponibilidad (A) y Consistencia (C). De lo contrario (E), cuando el sistema se ejecuta normalmente, debe elegir entre Latencia (L) y Consistencia (C)."**
:::

Esto obliga a una discusión arquitectónica matizada. Un sistema podría sacrificar la coherencia por la disponibilidad durante las fallas, pero priorizar la coherencia sobre la latencia durante el funcionamiento normal.

### 2.2 Transacciones distribuidas: el patrón Saga

El compromiso en dos fases es sincrónico y no es adecuado para microservicios. **Saga Pattern** gestiona la coherencia de los datos entre servicios a través de transacciones locales y acciones de compensación.

:::tip[Ejemplo de Patrón Saga: Pedido de Comercio Electrónico]

1. `Servicio de pedidos`: crea un pedido en estado `PENDIENTE`, publica el evento `ORDER_CREADO`
2. "Servicio de pago": procesa el pago, publica "PAYMENT_PROCESSED" en caso de éxito
3. "Servicio de inventario": actualiza el stock, publica "INVENTARIO_ACTUALIZADO" en caso de éxito
4. `Servicio de pedidos`: Actualiza el pedido a `CONFIRMADO`

**Manejo de fallas:** Si el inventario falla, el Servicio de pago compensa con un reembolso, el Servicio de pedidos se cancela.

:::

**Estilos de implementación:**

:::note[Enfoques de Implementación de Saga]

* **Coreografía:** Servicios de publicación/suscripción a eventos sin coordinador central.
* **Orquestación:** El orquestador central gestiona el estado de la saga y las transacciones de compensación.

:::

### 2.3 Fuente de eventos y CQRS

Estos patrones construyen sistemas altamente escalables y auditables.

* **Fuente de eventos:** Almacena eventos inmutables en lugar del estado actual. El estado actual se obtiene reproduciendo eventos.

:::note[Ejemplo de Fuente de Eventos]

```json
// En lugar de almacenar saldo: 80 
// Almacenar secuencia de eventos: 
[ 
{"tipo": "CuentaCreada", "Saldoinicial": 0}, 
{"tipo": "Depósito realizado", "monto": 100}, 
{"tipo": "Retiro realizado", "monto": 20} 
] 
// Saldo actual = repetir eventos 
```

:::

* **CQRS (Segregación de responsabilidad de consulta de comando):** Separa el modelo de escritura del modelo de lectura.

:::tip[Beneficios de CQRS]

* Diferentes modelos optimizados para escrituras versus lecturas
* Escalado independiente de los lados de comando y consulta.
* Mejor modelado de dominios con contextos separados

:::

### 2.4 Componentes internos de la base de datos para el ingeniero de backend

Comprender los motores de almacenamiento y las estrategias de replicación es crucial para el rendimiento y la confiabilidad.

:::note[Motores de Almacenamiento MySQL]

* **InnoDB:** Bloqueo transaccional, compatible con ACID y a nivel de fila para cargas de trabajo OLTP
* **MyISAM:** Rápido para lecturas, bloqueo a nivel de tabla, sin transacciones (obsoleto para aplicaciones nuevas)

:::

**Estrategias de replicación:**

:::tip[Modelos de Replicación]

* **Líder-Seguidor:** Todas las escrituras al líder, lecturas de réplicas (más común)
* **Líder múltiple:** Varios nodos aceptan escrituras, los conflictos de replicación deben resolverse
* **Sin líder (estilo Cassandra):** Escribe en varios nodos simultáneamente, lee el quórum

:::

**Niveles de aislamiento de transacciones (SQL):**

:::note[Niveles de Aislamiento SQL]

1. **Lectura no confirmada:** Puede leer cambios no confirmados (lecturas sucias)
2. **Lectura confirmada:** Solo lee los cambios confirmados (es posible realizar lecturas no repetibles)
3. **Lectura repetible:** Valor de fila consistente dentro de la transacción (es posible realizar lecturas fantasmas)
4. **Serializable:** Ejecución en serie completa (mayor coherencia, menor rendimiento)

:::

## 3.0 Patrones de diseño de sistemas resilientes

La resiliencia es la capacidad de recuperarse de fallas y continuar funcionando; manejar las fallas con elegancia en lugar de prevenirlas por completo.

### 3.1 El patrón del disyuntor (en profundidad)

El disyuntor monitorea fallas y previene fallas en cascada en sistemas distribuidos.

:::note[Estados del Disyuntor]

* **Cerrado:** Operación normal, flujo de solicitudes, fallas de monitoreo
* **Abierto:** Error rápido para problemas posteriores, tiempo de espera antes de volver a intentarlo
* **Medio abierto:** Pruebe la recuperación posterior con una sola solicitud de sonda

:::

### 3.2 El patrón del mamparo

Aísle los componentes de la aplicación en grupos para evitar que fallas individuales afecten a todo el sistema.

:::tip[Implementación de Mamparos]
Utilice grupos de subprocesos/conexiones separados para cada servicio descendente. Un Servicio A lento no afectará el grupo del Servicio B, lo que evitará una falla total del sistema.
:::

### 3.3 Los patrones de reintento y tiempo de espera

Esencial para manejar fallas transitorias en sistemas distribuidos.

:::caution[Mejores Prácticas de Reintento]

* **Tiempos de espera:** Los tiempos de espera agresivos evitan el agotamiento de los recursos
* **Retroceso exponencial:** Aumentar los intervalos de reintento (1 s, 2 s, 4 s, 8 s)
* **Jitter:** Agregue aleatoriedad para evitar problemas estruendosos en el rebaño

:::

### 3.4 Limitación de velocidad y deslastre de carga

Proteja los servicios de la sobrecarga e implemente una degradación elegante.

:::note[Estrategias de Limitación de Tasa]

* **Bolsa de tokens:** Los tokens se acumulan para las solicitudes y se eliminan cuando se usan.
* **Leaky Bucket:** Solicitudes procesadas a tasa fija, exceso descartado
* **Desconexión de carga:** Rechaza solicitudes de baja prioridad bajo carga extrema

:::

## 4.0 Comunicación asincrónica avanzada

Los patrones asincrónicos son fundamentales para los sistemas distribuidos resilientes y débilmente acoplados.

### 4.1 Agentes de mensajes frente a registros de eventos

Diferentes enfoques de mensajería con distintas compensaciones.

:::tip[Características del Agente de Mensajes]

* **RabbitMQ:** Enrutamiento inteligente, colas de trabajo, modelo de intermediario de mensajes
* **Apache Kafka:** Transmisión de eventos, registros persistentes, múltiples consumidores

:::

### 4.2 Consumidores idempotentes

Es fundamental para gestionar la entrega "al menos una vez" en los sistemas de mensajería.

:::note[Estrategia de Idempotencia]

```text
función mensaje de proceso (mensaje) { 
if (mensajes procesados.contiene(mensaje.id)) { 
regresar; // Saltar duplicado 
} 

// mensaje de proceso 
procesoBusinessLogic(mensaje); 

// Seguimiento como procesado (atómico con lógica empresarial) 
mensajes procesados.add(mensaje.id); 
} 
```

:::

### 4.3 El patrón de la bandeja de salida transaccional

Resuelva actualizaciones de bases de datos atómicas y publicación de eventos en sistemas controlados por eventos.

:::tip[Flujo de Bandeja de Salida Transaccional]

1. Actualice la entidad comercial E inserte el evento en la bandeja de salida en una única transacción local
2. La retransmisión de mensajes publica eventos de forma asincrónica y los marca como enviados.
3. Garantiza la atomicidad sin transacciones distribuidas.
4. Proporciona semántica de entrega "al menos una vez".

:::

## Ingeniería de rendimiento 5.0 a escala

Disciplina sistemática de identificación y eliminación de cuellos de botella.

### 5.1 Patrones de almacenamiento en caché (en profundidad)

Estrategias de almacenamiento en caché avanzadas más allá del almacenamiento en caché básico.

:::note[Comparación de Patrones de Almacenamiento en Caché]

* **Aparte del caché:** El código de la aplicación administra el caché y la carga diferida
* **Lectura directa:** La caché maneja la carga de datos desde la base de datos.
* **Escritura directa:** Las actualizaciones de caché actualizan la base de datos de forma sincrónica
* **Reescritura:** Las actualizaciones de caché se descargan de forma asincrónica en la base de datos

:::

**Mitigación del rebaño atronador:**

:::caution[Problema del Rebaño Atronador]
Cuando el elemento almacenado en caché caduca, miles de solicitudes simultáneamente pierden el caché y abruman la base de datos. Solución: recuperación basada en bloqueos donde solo la primera solicitud carga datos mientras otras esperan.
:::

### 5.2 Simultaneidad versus paralelismo

Conceptos fundamentales para la optimización del rendimiento.

:::tip[Coincidencia de Carga de Trabajo]

* **Cargas de trabajo vinculadas a E/S:** Los modelos asincrónicos (Node.js, asyncio) manejan muchas solicitudes simultáneas
* **Cargas de trabajo vinculadas a la CPU:** El paralelismo (Go, Java) aprovecha múltiples núcleos

:::

### 5.3 Creación de perfiles y ajuste del rendimiento

No se puede optimizar lo que no se puede medir.

:::note[Creación de Perfiles de Rendimiento]
Utilice perfiladores para generar gráficos de llamas que identifiquen:

* Puntos de acceso de CPU en rutas de ejecución de código
* Patrones de asignación de memoria y fugas.
* Cuellos de botella de E/S y tiempo de espera

:::

## 6.0 API avanzadas y arquitecturas de seguridad

Soluciones a nivel de infraestructura para gestionar la complejidad en entornos distribuidos.

### 6.1 El patrón de puerta de enlace API

Punto de entrada único que gestiona la comunicación entre clientes y servicios.

:::tip[Responsabilidades del Gateway de API]

* **Enrutamiento:** Solicitudes directas a los microservicios apropiados
* **Autenticación/Autorización:** Verificar las credenciales en el borde
* **Limitación de velocidad:** Aplicar políticas de uso y limitación
* **Transformación de solicitudes:** Adaptar solicitudes para servicios posteriores
* **Observabilidad:** Registro y monitoreo centralizados

:::

### 6.2 Malla de servicio

Capa de infraestructura para una comunicación de servicio a servicio segura, rápida y confiable.

:::note[Componentes de Malla de Servicio]

* **Sidecar Proxy:** (Envoy) maneja todo el tráfico entrante/saliente por servicio
* **Plano de control:** (Istio, Linkerd) configura todos los servidores proxy sidecar
* **Características:** mTLS, gestión de tráfico, seguimiento distribuido, observabilidad

:::

### 6.3 Seguridad de confianza cero

Modelo de seguridad "Nunca confíes, siempre verifica" para sistemas distribuidos.

:::caution[Principios de Confianza Cero]

* **Autenticación basada en identidad:** Verifique cada solicitud independientemente de su origen
* **Acceso con privilegios mínimos:** Otorga los permisos mínimos necesarios
* **Asumir incumplimiento:** Diseño esperando compromiso interno

:::

### 6.4 JWT (en profundidad): riesgos y mitigación

Comprender las vulnerabilidades de JWT y su implementación segura.

:::caution[Problemas de Seguridad JWT]

* **Ataques de confusión de algoritmos:** Engañar al servidor con algoritmos débiles
* *Mitigación:* Configure la biblioteca para aceptar solo algoritmos potentes (RS256)
* **Revocación de token:** Los tokens sin estado no se pueden invalidar
* *Mitigación:* Mantener la lista de denegación de revocación en caché rápida

:::

## 7.0 Conclusión: El ingeniero con principios

La versión 2.0 ha viajado a la ingeniería de sistemas distribuidos. La creación de sistemas backend resilientes y escalables requiere una comprensión profunda de las compensaciones fundamentales: latencia versus coherencia, disponibilidad versus corrección, velocidad versus seguridad.

El ingeniero de backend avanzado diseña para fallas, asume la hostilidad de la red y aplica patrones como Sagas, Event Sourcing, Circuit Breakers y Service Meshes. La habilidad suprema es razonar sobre la complejidad; identificar puntos de falla, cuellos de botella y vulnerabilidades para aplicar estrategias de mitigación apropiadas.
