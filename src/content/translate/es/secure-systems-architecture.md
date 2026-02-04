---
title: "Arquitectura de sistemas seguros: un tratado de ingeniería con múltiples perspectivas"
published: 2025-09-11
description: "Arquitectura de sistemas seguros que cubre los fundamentos de la seguridad de la red, estrategias de defensa en profundidad, modelado de amenazas y prácticas de desarrollo seguro desde múltiples perspectivas profesionales."
image: ''
tags: [Security, Network Security, Threat Modeling, Defense-in-Depth, Cybersecurity, Secure Development]
category: Guide
draft: false
lang: "es"
originalSlug: "secure-systems-architecture"
series:
    name: "Security Architecture"
    order: 1
---

## Una mirada rápida al interior

Piense en esto como una guía práctica para construir y defender redes y sistemas de software modernos desde cero.

Lo que hace que esta guía sea diferente es nuestro enfoque. Examinaré toda la tecnología, desde los cables de red físicos hasta el código de la aplicación, a través de los ojos de las cuatro personas que viven y respiran esto todos los días:

* El **ingeniero de redes** que construye los cimientos.
* El **Defensor de la Ciberseguridad** que tiene que protegerla.
* El **Hacker ofensivo** que intenta romperlo.
* El **Ingeniero de software** que escribe el código que se ejecuta en él.

Obtendrá un recorrido completo por temas de seguridad esenciales sin la tontería académica y seca. Cubriré cosas como:

* Diseñar una red que sea difícil de atacar desde el principio.
* Colocar tus defensas en capas para que un fracaso no sea una catástrofe (Defensa en profundidad).
* Pensar como un atacante siguiendo Cyber ​​Kill Chain.
* Escritura de código seguro desde el primer día (el Secure SDLC).

---

## **Parte I: La base: fundamentos de una red segura**

### **Capítulo 1: Los modelos de red revisados a través de una lente de seguridad**

El viaje hacia una arquitectura segura comienza donde comienza toda comunicación de datos: la red. Una comprensión superficial de los modelos OSI o TCP/IP es insuficiente[[1]](#ref-1). Un profesional de la seguridad debe comprender cada capa no sólo por su función, sino también por su superficie de ataque.

#### **1.1 Capa 1 - La capa física: la amenaza tangible**

* **La visión del ingeniero de redes:** Esta capa es el mundo de los cables, la fibra óptica, los conmutadores y los concentradores. La principal preocupación es la conectividad física, la integridad de la señal y el aprovisionamiento de hardware. Es la base sobre la que se construye todo.
* **La visión del hacker:** La capa física es el vector de ataque definitivo si es accesible. Los ataques suelen ser descarados pero muy eficaces:
* **Escuchas telefónicas:** Conexión directa a cables de red para interceptar el tráfico no cifrado[[2]](#ref-2).
* **Implantes de hardware:** Colocar dispositivos maliciosos (por ejemplo, una Raspberry Pi) detrás de un firewall, dentro de una red segura, para establecer un canal C2 (comando y control) persistente.
* **Acceso al puerto:** Simplemente conecte una computadora portátil a un conector de red activo y no seguro en una sala de conferencias o vestíbulo.
* **La visión del defensor:** La seguridad física es la seguridad de la red. Las defensas son físicas y de procedimiento: salas de servidores cerradas, puertos de pared no utilizados desactivados, políticas estrictas de control de acceso y sellos de hardware a prueba de manipulaciones. Desde un punto de vista técnico, **Control de acceso a la red (NAC)** IEEE 802.1X se puede implementar para requerir autenticación desde cualquier dispositivo que se conecte físicamente a la red.[[3]](#ref-3).

#### **1.2 Capa 2: La capa de enlace de datos: el campo de batalla de la red local**

* **La visión del ingeniero de redes:** Este es el ámbito de las direcciones MAC, los conmutadores y las redes de área local (LAN). Los protocolos principales son Ethernet y **ARP (Protocolo de resolución de direcciones)**, que asigna direcciones IP (Capa 3) a direcciones MAC (Capa 2).[[4]](#ref-4). Esta capa es responsable de enviar tramas al dispositivo correcto en el *mismo* segmento de red local.
* **La visión del hacker:** La capa 2 es un entorno rico para ataques porque fue diseñada con un modelo de confianza implícito.
* **Suplantación/envenenamiento de ARP:** El atacante envía mensajes ARP falsificados a la LAN. Pueden decirle a la puerta de enlace de la red que la dirección MAC del atacante pertenece a la IP de la víctima y decirle a la víctima que la dirección MAC del atacante pertenece a la IP de la puerta de enlace. Esto coloca al atacante en medio de la conversación (**Man-in-the-Middle, MitM**), lo que le permite interceptar o modificar todo el tráfico de la víctima.[[5]](#ref-5).
* **MAC Flooding:** Un ataque contra un conmutador de red. El atacante envía una avalancha de tramas Ethernet con diferentes direcciones MAC de origen, llenando la tabla CAM (Memoria direccionable de contenido) del conmutador. Cuando la tabla está llena, el conmutador ya no puede reenviar tramas de manera inteligente a puertos específicos y entra en un modo de "apertura fallida" en el que actúa como un concentrador, transmitiendo todas las tramas a todos los puertos. Esto permite al atacante rastrear todo el tráfico en la red conmutada.[[6]](#ref-6).
* **Salto de VLAN:** ​​Un ataque en el que el atacante, conectado a una VLAN, obtiene acceso al tráfico de otra VLAN a la que no debería poder acceder. Esto a menudo se hace explotando puertos troncales mal configurados.[[7]](#ref-7).
* **La visión del defensor:** Los conmutadores ofrecen una serie de características de seguridad para combatir estos ataques:
* **Seguridad de puerto:** Limita la cantidad de direcciones MAC que se pueden usar en un único puerto de switch y se puede configurar para permitir solo direcciones MAC específicas.[[8]](#ref-8).
* **DHCP Snooping:** Evita que servidores DHCP no autorizados se introduzcan en la red.
* **Inspección dinámica de ARP (DAI):** Valida los paquetes ARP en una red, evitando la suplantación de ARP al comparar las solicitudes/respuestas de ARP con la tabla de vinculación de espionaje DHCP.

#### **1.3 Capa 3: La capa de red: el tablero de ajedrez de enrutamiento**

* **La visión del ingeniero de redes:** Esta es la capa de direcciones IP y enrutamiento. Se trata de mover paquetes entre diferentes redes. Los enrutadores operan en esta capa y toman decisiones basadas en las direcciones IP de destino para reenviar paquetes hacia su destino final. Aquí existen protocolos como **ICMP** (para ping y traceroute) e IGMP.[[9]](#ref-9).
* **La visión del hacker:** Los ataques de capa 3 se centran en interrumpir el enrutamiento y falsificar la identidad.
* **Suplantación de IP:** Un atacante crea paquetes IP con una dirección IP de origen falsificada. Esta es una técnica principal utilizada en ataques de **denegación de servicio (DoS)**. En un **ataque Smurf**, el atacante envía una gran cantidad de solicitudes de eco ICMP (pings) a la dirección de transmisión de la red, falsificando la IP de origen para que sea la IP de la víctima. Todos los hosts de la red responden a la víctima, abrumándola.[[10]](#ref-10).
* **Secuestro de ruta (secuestro de BGP):** Un ataque sofisticado en el que un atacante toma de forma ilegítima el control de grupos de direcciones IP corrompiendo las tablas de enrutamiento de Internet, específicamente aquellas mantenidas por el **Protocolo de puerta de enlace fronteriza (BGP)**. Esto se puede utilizar para redirigir el tráfico, lo que lo convierte en una poderosa herramienta para espionaje o ataques MitM a gran escala.[[11]](#ref-11).
* **La vista del defensor:** La defensa en esta capa se trata de filtrado y validación.
* **Filtrado de entrada/salida:** Los firewalls deben configurarse para descartar paquetes entrantes de Internet que tengan una dirección IP de origen dentro de la red interna (filtrado de entrada). También deben configurarse para descartar paquetes salientes que no tengan una IP de origen desde dentro de la red interna (filtrado de salida). Esto ayuda a prevenir la suplantación de IP, como se documenta en BCP 38/RFC 2827.[[12]](#ref-12).
* **Listas de control de acceso (ACL):** Los enrutadores y firewalls utilizan ACL para permitir o denegar el tráfico según la IP, el puerto y el protocolo de origen/destino. Este es el componente fundamental del control de acceso a la red.

#### **1.4 Capa 4 - La capa de transporte: el contrato de conexión**

* **La visión del ingeniero de redes:** Esta capa proporciona servicios de comunicación de host a host. Los dos protocolos más importantes son **TCP (Protocolo de control de transmisión)** y **UDP (Protocolo de datagramas de usuario)**[[13]](#ref-13).
* **TCP:** Entrega orientada a la conexión, confiable y ordenada. Establece una conexión mediante un **protocolo de enlace de tres vías (SYN, SYN-ACK, ACK)** y garantiza que todos los datos lleguen correctamente. Utilizado para HTTP, FTP, SMTP.
* **UDP:** Sin conexión, poco confiable y desordenado. Es un protocolo de "disparar y olvidar" que es mucho más rápido pero no ofrece garantías de entrega. Utilizado para DNS, VoIP y juegos en línea.
* **La visión del hacker:** Los ataques en esta capa a menudo se centran en el agotamiento de los recursos y el reconocimiento.
* **TCP SYN Flood:** Un ataque DoS clásico. El atacante envía un gran volumen de paquetes TCP SYN al servidor víctima, falsificando la dirección IP de origen. El servidor responde con un SYN-ACK y asigna recursos para la nueva conexión, esperando el ACK final que nunca llega (porque la IP de origen era falsa). Esto deja una gran cantidad de conexiones entreabiertas, agotando la tabla de conexiones del servidor e impidiendo que los usuarios legítimos se conecten.[[14]](#ref-14).
* **Escaneo de puertos:** un atacante utiliza herramientas como **nmap** para enviar sondas a una variedad de puertos en un host de destino para descubrir qué servicios se están ejecutando. Un puerto "abierto" indica un servicio de escucha que podría ser un objetivo potencial de explotación.[[15]](#ref-15).
* **La visión del defensor:** Las defensas se centran en la gestión del estado y la detección de escaneo.
* **Firewalls con estado:** Estos firewalls rastrean el estado de las conexiones TCP. Solo permitirán el paso de un paquete SYN-ACK si han visto un paquete SYN correspondiente, y solo permitirán un ACK si han visto un SYN-ACK. Esto los hace mucho más seguros que los filtros de paquetes sin estado.
* **Cookies SYN:** Una técnica para mitigar las inundaciones SYN. En lugar de asignar recursos al recibir un SYN, el servidor codifica información sobre la conexión en el número de secuencia del paquete SYN-ACK y lo envía de vuelta. Solo asigna recursos cuando el cliente envía el ACK final que contiene la "cookie", lo que demuestra que es una fuente legítima.[[16]](#ref-16).
* **Sistemas de detección de intrusiones (IDS):** Se puede configurar un IDS para detectar y alertar sobre la actividad de escaneo de puertos, brindando a los defensores una advertencia temprana de un posible ataque.

---

### **Capítulo 2: Diseño de una arquitectura de red defendible**

Una red plana, donde cada dispositivo puede comunicarse con todos los demás, es el paraíso de los piratas informáticos. Una vez que comprometen un único host de bajo valor (como una impresora o una estación de trabajo), pueden moverse fácilmente lateralmente hacia objetivos de alto valor como controladores de dominio o bases de datos. Una arquitectura defendible es una arquitectura segmentada.[[17]](#ref-17).

#### **2.1 El principio de segmentación: construcción de muros internos**

* **La visión del ingeniero de redes:** La segmentación es la práctica de dividir una red en subredes más pequeñas y aisladas. Esto se logra usando:
* **Subredes:** Dividir un bloque grande de direcciones IP en bloques más pequeños. Se requieren enrutadores para que el tráfico se mueva entre subredes.
* **VLAN (LAN virtuales):** Una forma de crear redes lógicamente separadas en la misma infraestructura de conmutación física. Se puede configurar un conmutador para que los puertos de la VLAN 10 solo puedan comunicarse con otros puertos de la VLAN 10, incluso si están en conmutadores físicos diferentes.[[18]](#ref-18).
* **Arquitectura por niveles:** Un patrón de diseño clásico que separa la red según la función de la aplicación, creando a menudo una **DMZ (Zona Desmilitarizada)** para servicios orientados a Internet.[[19]](#ref-19).
* **Nivel web (DMZ):** El nivel más externo, al que se puede acceder desde Internet. Contiene servidores web y proxies inversos.
* **Nivel de aplicación:** El nivel medio, al que se puede acceder únicamente desde el nivel web. Contiene los servidores de aplicaciones y la lógica empresarial.
* **Nivel de datos:** El nivel más interno y protegido, al que solo se puede acceder desde el nivel de aplicación. Contiene las bases de datos.
* **La visión del defensor:** La segmentación es la piedra angular de la **Defensa en profundidad**. Respalda directamente el principio de **privilegio mínimo** a nivel de red. Un servidor web no necesita comunicarse directamente con un controlador de dominio, por lo que las reglas del firewall deberían bloquear esa ruta de comunicación. Si el servidor web se ve comprometido, la capacidad del atacante para moverse lateralmente queda severamente restringida. El objetivo es hacer que cada paso para el atacante (desde la DMZ hasta el nivel de la aplicación, desde el nivel de la aplicación hasta el nivel de datos) sea un punto de estrangulamiento difícil y fuertemente monitoreado.

#### **2.2 Microsegmentación y Confianza Cero**

* **La visión del ingeniero de redes:** La microsegmentación es una evolución más granular de la segmentación. En lugar de segmentar por zonas grandes (VLAN), puede crear límites de seguridad alrededor de cargas de trabajo o aplicaciones individuales. En un entorno virtualizado o en la nube, esto a menudo se implementa con **redes definidas por software (SDN)** y firewalls virtuales.
* **La visión del profesional de la ciberseguridad:** La microsegmentación es la máxima expresión de una arquitectura de red **Zero Trust**. El principio fundamental de Zero Trust es "nunca confiar, siempre verificar". Se supone que los atacantes ya están dentro de la red.[[20]](#ref-20). Por lo tanto, la comunicación entre dos máquinas virtuales, incluso si están en la misma subred, no es implícitamente confiable. Debe estar permitido explícitamente por una política de seguridad. Esto hace que el movimiento lateral sea extremadamente difícil para un atacante.
* **La opinión del ingeniero de software:** Esto tiene implicaciones para los desarrolladores. Las aplicaciones deben diseñarse asumiendo que la conectividad de la red no está garantizada. Deben ser resistentes a los fallos de conexión y estar configurados con los mecanismos correctos de descubrimiento de servicios. Las **Políticas de red** de Kubernetes son un excelente ejemplo de cómo los desarrolladores definen reglas de microsegmentación en el código (YAML), especificando qué pods pueden comunicarse con qué otros pods.[[21]](#ref-21).

---

### **Capítulo 3: Controles básicos de seguridad de la red en detalle**

#### **3.1 El cortafuegos: el guardián de la red**

* **Sin estado versus con estado:** Como se analizó en el Capítulo 1, un firewall con estado es muy superior ya que comprende el contexto de una conexión.
* **Firewall de próxima generación (NGFW):** Un NGFW es un firewall de "inspección profunda de paquetes" que va más allá de la simple inspección de puerto/protocolo. Incluye características como:
* **Conocimiento de la aplicación:** Puede identificar y controlar el tráfico según la aplicación (por ejemplo, bloquear Facebook pero permitir Salesforce), no solo el número de puerto (ya que muchas aplicaciones se ejecutan en el puerto 443).[[22]](#ref-22).
* **Prevención de intrusiones integrada (IPS):** Puede bloquear activamente el tráfico que coincida con firmas de ataques conocidas.
* **Fuentes de inteligencia de amenazas:** Puede integrarse con servicios de inteligencia de amenazas basados ​​en la nube para bloquear el tráfico de direcciones IP o dominios maliciosos conocidos.
* **Firewall de aplicaciones web (WAF):** Un WAF es un firewall especializado que opera en la Capa 7 (la Capa de Aplicación). Está diseñado para proteger aplicaciones web de ataques web comunes, como los que figuran en el Top 10 de OWASP.[[23]](#ref-23).
* **La opinión del desarrollador:** Un WAF es una capa crucial de defensa, pero no sustituye a la codificación segura. Es una red de seguridad. Un WAF podría bloquear un ataque básico de inyección SQL como`OR 1=1`, pero un atacante experto a menudo puede encontrar formas de eludir las reglas WAF mediante codificación, ofuscación o consultas más complejas. La defensa principal debe estar en el código mismo (mediante consultas parametrizadas).
* **La visión del hacker:** La evasión WAF es una disciplina bien establecida. Los atacantes utilizan herramientas para sondear los WAF, identificar el proveedor y los conjuntos de reglas, y crear cargas útiles que sean sintácticamente válidas pero que no activen las firmas del WAF.[[24]](#ref-24).

#### **3.2 IDS/IPS: La Atalaya de la Red**

* **Sistema de detección de intrusiones (IDS):** Un dispositivo de monitoreo pasivo. Analiza una copia del tráfico de la red y envía una alerta si detecta actividad sospechosa. No bloquea el tráfico.
* **Sistema de prevención de intrusiones (IPS):** Un dispositivo activo en línea. Analiza el tráfico y puede bloquear o descartar activamente paquetes que coincidan con firmas maliciosas antes de que lleguen a su objetivo.
* **Metodologías de detección:**
* **Basado en firmas:** Funciona como software antivirus. Dispone de una base de datos de patrones de ataque conocidos ("firmas"). Esto es muy eficaz contra amenazas conocidas, pero no puede detectar nuevos ataques de "día cero".
* **Basado en anomalías:** El sistema primero crea una línea base de cómo se ve el tráfico de red "normal". Luego alerta sobre cualquier actividad que se desvíe significativamente de esta línea de base. Esto puede detectar nuevos ataques, pero a menudo es propenso a una alta tasa de falsos positivos.[[25]](#ref-25).
* **La visión del hacker:** Las técnicas de evasión incluyen la fragmentación de paquetes, el uso de cifrado (un IDS/IPS no puede inspeccionar el tráfico cifrado a menos que realice un descifrado SSL/TLS, que es computacionalmente costoso) y la modificación de cargas útiles de ataque para evitar coincidencias con firmas conocidas.

---

---

## **Parte II: La ciudadela del defensor - Estrategias para una defensa integral**

### **Capítulo 4: La filosofía de la defensa en profundidad**

La defensa en profundidad es la filosofía central de la ciberseguridad moderna. Es el reconocimiento de que cualquier control de seguridad por sí solo puede fallar y fallará. El objetivo es crear una defensa redundante y en capas que brinde múltiples oportunidades para detectar, frenar y detener a un atacante.[[26]](#ref-26).

#### **4.1 Las capas de la ciudadela**

El castillo medieval ofrece una analogía perfecta:

1. **El Foso (Seguridad Perimetral):** Esta es la primera línea de defensa. Corresponde a enrutadores fronterizos y cortafuegos perimetrales. Su trabajo es mantener alejados a los atacantes oportunistas y poco sofisticados.
2. **El muro exterior (seguridad de la red):** Una barrera más fuerte. Esto corresponde a la segmentación interna, IDS/IPS y listas de control de acceso sólidas. Está diseñado para contener amenazas que superan el perímetro.
3. **Los arqueros en el muro (monitoreo y detección):** Estos son los centinelas. Esto corresponde al Centro de Operaciones de Seguridad (SOC), los sistemas SIEM y el análisis de registros. Están buscando activamente señales de un ataque.
4. **The Inner Keep (Host & Endpoint Security):** Una fortaleza fuertemente fortificada. Esto corresponde a los controles de seguridad en los propios servidores y estaciones de trabajo: **Detección y respuesta de endpoints (EDR)**, firewalls basados ​​en host, antivirus y monitoreo de la integridad de los archivos.
5. **Las joyas de la corona (seguridad de datos y aplicaciones):** El premio máximo, protegido por los controles más estrictos. Esto corresponde a un código de aplicación seguro, autenticación y autorización sólidas y cifrado de datos en reposo y en tránsito.
6. **Los guardias (personas, procesos y políticas):** El elemento humano. Esto incluye capacitación en concientización sobre seguridad, planes de respuesta a incidentes y sólidos procedimientos de seguridad operativa.

* **La visión del hacker:** Un atacante ve estas capas como una serie de obstáculos que debe superar. Su objetivo es encontrar el eslabón más débil de cada capa. Un firewall fuerte es inútil si un empleado hace clic en un enlace de phishing (sin pasar por el perímetro y las capas de red). Una aplicación segura es inútil si se ejecuta en un servidor sin parches que puede verse comprometido en la capa de host.

### **Capítulo 5: Modelado de amenazas: pensar como un atacante**

El modelado de amenazas es un proceso estructurado para identificar posibles amenazas y vulnerabilidades en un sistema *antes* de construirlo. Es una práctica de seguridad proactiva, no reactiva.[[27]](#ref-27).

#### **5.1 La metodología STRIDE**

Desarrollado por Microsoft, STRIDE es un mnemotécnico para categorizar amenazas[[28]](#ref-28):

* **S**poofing: Asumir ilegítimamente la identidad de otro usuario o componente.
* *Defensa:* Autenticación fuerte (MFA), firmas digitales.
* **T**ampering: Modificación no autorizada de datos, ya sea en tránsito o en reposo.
* *Defensa:* Hashing, controles de acceso, cifrado de datos.
* **R**repudio: Un usuario que niega haber realizado una acción cuando lo hizo.
* *Defensa:* Registros de auditoría seguros, firmas digitales.
* **Divulgación de información: exposición de información confidencial a personas no autorizadas.
* *Defensa:* Cifrado, controles de acceso.
* **D**denegación de servicio: Impedir que usuarios legítimos accedan al sistema.
* *Defensa:* Limitación de velocidad, equilibrio de carga, arquitectura resistente.
* **E**levación de privilegios: un usuario o componente obtiene permisos a los que no tiene derecho.
* *Defensa:* Principio de privilegio mínimo, controles de autorización sólidos.

#### **5.2 Un ejercicio práctico de modelado de amenazas**

* **La opinión del ingeniero de software:** Imagine un punto final API simple para actualizar el perfil de un usuario:`PUT /api/users/{id}`. El equipo de desarrollo, junto con un profesional de seguridad, realizaría un modelo de amenaza.

1. **Descomponga la aplicación:** Dibuje un diagrama de flujo de datos. El navegador del usuario envía una solicitud HTTPS a una puerta de enlace API, que la reenvía a un servicio de usuario, que luego actualiza una base de datos PostgreSQL.
2. **Identificar amenazas usando STRIDE:**

* **(Spoofing):** ¿Puede un usuario actualizar el perfil de otro usuario cambiando el`{id}`en la URL? (Este es un error de autorización clásico).
* **(Manipulación):** ¿Puede un atacante en una posición MitM modificar los datos del perfil en tránsito? (Defensa: HTTPS/TLS evita esto).
* **(Divulgación de información):** ¿La respuesta de la API filtra datos confidenciales, como el hash de la contraseña del usuario u otra PII?
* **(Denegación de servicio):** ¿Puede un atacante inundar este punto final con una gran cantidad de solicitudes para saturar el servicio o la base de datos? (Defensa: Limitación de tarifas).
* **(Elevación de privilegios):** ¿Existe una vulnerabilidad (por ejemplo, inyección SQL) en la lógica de actualización que permitiría a un atacante obtener privilegios de administrador?

Este proceso transforma la seguridad de un concepto abstracto a una lista concreta de tareas de ingeniería y casos de prueba.

### **Capítulo 6: El Centro de Operaciones de Seguridad (SOC): Visibilidad y Respuesta**

Si la estrategia es la defensa en profundidad, el SOC es el centro de mando donde se ejecuta esa estrategia.

#### **6.1 El núcleo del SOC: SIEM**

* **Gestión de eventos e información de seguridad (SIEM):** Un SIEM es el sistema nervioso central de un SOC. Su trabajo es:

1. **Registros agregados:** Recopile datos de registro de cientos o miles de fuentes (firewalls, servidores, aplicaciones, servicios en la nube, etc.).
2. **Normalizar datos:** Analice estos formatos de registro dispares en un esquema común.
3. **Correlacionar eventos:** Esta es la función clave. SIEM utiliza reglas de correlación para conectar eventos individuales, aparentemente inofensivos, de diferentes fuentes en un incidente de seguridad significativo.
4. **Alertas:** Cuando se activa una regla de correlación, SIEM genera una alerta de alta fidelidad para que un analista de seguridad la investigue.[[29]](#ref-29).

* **La vista del desarrollador:** Los registros de su aplicación son una fuente de datos crítica para SIEM. Un buen registro es una característica de seguridad. Los registros deben estar estructurados (por ejemplo, JSON), contener contexto relevante (ID de usuario, IP de origen, ID de solicitud) y registrar eventos relevantes para la seguridad exitosos y fallidos (por ejemplo, inicios de sesión, cambios de contraseña, fallas de autorización).

#### **6.2 El ciclo de vida de respuesta a incidentes**

Cuando se confirma que una alerta es un incidente real, el SOC sigue un plan estructurado de respuesta a incidentes (IR), a menudo basado en un marco como el del NIST.[[30]](#ref-30):

1. **Preparación:** El trabajo realizado *antes* de que ocurra un incidente (contar con planes, herramientas y personal capacitado).
2. **Identificación:** Determinar si un evento es un incidente de seguridad.
3. **Contención:** La prioridad inmediata es detener el sangrado. Esto podría implicar aislar un host comprometido de la red o deshabilitar una cuenta de usuario comprometida.
4. **Erradicación:** Eliminar la amenaza del entorno (por ejemplo, eliminar malware, parchear la vulnerabilidad).
5. **Recuperación:** Restaurar los sistemas a su funcionamiento normal.
6. **Lecciones aprendidas:** Un análisis post mortem para determinar la causa raíz del incidente e identificar mejoras para evitar que vuelva a suceder.

---

---

## **Parte III: El gambito del atacante - Metodologías ofensivas**

Para construir una defensa fuerte, debes entender la ofensiva. Esta parte analiza la mentalidad y la metodología del atacante, proporcionando el contexto para las medidas defensivas discutidas en otra parte.

### **Capítulo 7: La cadena de muerte cibernética: un plan para el ataque**

Desarrollada por Lockheed Martin, Cyber Kill Chain modela las etapas de un ciberataque típico. Los defensores pueden asignar sus controles a cada etapa, con el objetivo de romper la cadena lo antes posible.[[31]](#ref-31).

1. **Reconocimiento:** El atacante recopila información sobre el objetivo.

* **Reconocimiento pasivo:** Uso de información disponible públicamente (**OSINT** - Inteligencia de código abierto).
* **Active Recon:** Sondear directamente la infraestructura del objetivo. Esto incluye escaneo de puertos (nmap), enumeración de DNS y uso de herramientas como Shodan para encontrar dispositivos con acceso a Internet.

2. **Armado:** El atacante crea una carga útil maliciosa para entregarla al objetivo.
2. **Entrega:** Cómo se transmite la carga útil armada al objetivo. Los vectores comunes incluyen correos electrónicos de phishing o descargas no autorizadas.
3. **Explotación:** La carga útil armada se activa, explotando una vulnerabilidad en el sistema del objetivo.
4. **Instalación:** El atacante instala malware o un **troyano de acceso remoto (RAT)** en la máquina de la víctima para establecer un punto de apoyo.
5. **Comando y control (C2):** El malware instalado "llama a casa" a un servidor C2 controlado por el atacante. Esto crea un canal persistente.
6. **Acciones según los objetivos:** El atacante logra su objetivo final, como la filtración de datos o la implementación de ransomware.

### **Capítulo 8: Profundización en los vectores de explotación comunes**

#### **8.1 Vulnerabilidades de aplicaciones web más allá de lo básico**

* **Falsificación de solicitudes del lado del servidor (SSRF):** Una vulnerabilidad en la que un atacante puede obligar a una aplicación del lado del servidor a realizar solicitudes HTTP a un dominio arbitrario. En entornos de nube, esto se puede utilizar para acceder al servicio de metadatos del proveedor de la nube, que puede filtrar credenciales de seguridad temporales.[[32]](#ref-32).
* **La opinión del desarrollador:** Las vulnerabilidades SSRF surgen cuando una aplicación toma una URL proporcionada por el usuario y obtiene contenido de ella sin la validación adecuada. La defensa es mantener una lista estricta de dominios y protocolos permitidos que la aplicación puede solicitar.
* **Deserialización insegura:** Esta vulnerabilidad se produce cuando una aplicación deserializa datos no confiables proporcionados por el usuario sin la validación adecuada. Un atacante puede crear un objeto serializado malicioso que, cuando se deserializa, puede conducir a la ejecución remota de código.[[33]](#ref-33).

#### **8.2 El elemento humano: ingeniería social**

* **La visión del hacker:** El ser humano suele ser el eslabón más débil. La ingeniería social es el arte de manipular a las personas para que realicen acciones o divulguen información confidencial.
* **Phishing:** Envío de correos electrónicos fraudulentos que parecen provenir de una fuente legítima para engañar a las víctimas para que revelen información confidencial o implementen malware. **Spear phishing** es una forma muy específica de phishing dirigida a un individuo u organización específica.[[34]](#ref-34).
* **Pretexto:** Crear un escenario inventado (un pretexto) para ganarse la confianza de la víctima.
* **La visión del defensor:** La defensa contra la ingeniería social tiene varios niveles:
* **Controles técnicos:** Puertas de enlace de correo electrónico que analizan en busca de enlaces y archivos adjuntos maliciosos.
* **Capacitación de usuarios:** La defensa más crítica. Capacitación periódica en concientización sobre seguridad.
* **Proceso:** Requiere la aprobación de varias personas para acciones sensibles.

### **Capítulo 9: Post-Explotación - Vivir de la tierra**

Una vez que un atacante logra un punto de apoyo inicial, su trabajo apenas comienza. La siguiente fase consiste en ampliar su acceso y lograr sus objetivos sin ser detectado, un proceso detallado en marcos como MITRE ATT&CK.[[35]](#ref-35).

* **Movimiento lateral:** El proceso de pasar de un host comprometido a otros hosts dentro de la misma red.
* **La visión del hacker:** En un entorno Windows Active Directory, este es un proceso bien definido. El atacante volcará las credenciales de la memoria de la primera máquina (usando una herramienta como **Mimikatz**[[36]](#ref-36)), buscando cuentas de administrador de dominio. Pueden utilizar técnicas como **Pass-the-Hash**, donde pueden autenticarse en otras máquinas utilizando el hash de contraseña de un usuario sin necesidad de la contraseña en texto plano.
* **Persistencia:** Establecer una presencia a largo plazo en la red. Los atacantes crearán mecanismos para garantizar que puedan recuperar el acceso incluso si se parchea la vulnerabilidad inicial o se reinicia la máquina comprometida.
* **Living Off the Land (LotL):** Una técnica clave para evadir la detección. En lugar de traer su propio malware personalizado, los atacantes utilizan herramientas legítimas que ya están presentes en el sistema de la víctima. Por ejemplo, usar **PowerShell** para secuencias de comandos o **PsExec** para la ejecución remota de comandos.[[37]](#ref-37).
* **La visión del defensor:** Detectar ataques de LotL es muy difícil. Aquí es donde las soluciones de **Detección y respuesta de endpoints (EDR)** son fundamentales. Un EDR utiliza análisis de comportamiento para señalar actividades sospechosas, como un documento de Word que genera un proceso de PowerShell que luego establece una conexión de red a una dirección IP sospechosa.

---

---

## **Parte IV: La responsabilidad del constructor: seguridad por diseño**

La seguridad no puede ser una idea de último momento. La forma más eficaz de crear sistemas seguros es integrar la seguridad en cada fase del ciclo de vida del desarrollo de software.

### **Capítulo 10: El ciclo de vida de desarrollo de software seguro (SSDLC)**

El SSDLC, a menudo llamado **"Shift Left"**, trata de adelantar las prácticas de seguridad (hacia la izquierda) en el cronograma de desarrollo.[[38]](#ref-38).

1. **Fase de requisitos:** Los requisitos de seguridad deben definirse junto con los requisitos funcionales.
2. **Fase de diseño:** Aquí es donde ocurre el modelado de amenazas (Capítulo 5).
3. **Fase de implementación (codificación):**

* **La opinión del desarrollador:** Esto implica seguir las mejores prácticas de codificación segura para evitar vulnerabilidades comunes.
* **Pruebas de seguridad de aplicaciones estáticas (SAST):** Las herramientas SAST analizan el código fuente de la aplicación sin ejecutarla, buscando posibles fallas de seguridad.[[39]](#ref-39).

4. **Fase de prueba:**

* **Pruebas dinámicas de seguridad de aplicaciones (DAST):** Las herramientas DAST son probadores de "caja negra" que exploran la aplicación en ejecución en busca de vulnerabilidades.
* **Pruebas de penetración:** Un proceso manual o semiautomático en el que los piratas informáticos éticos intentan explotar activamente las vulnerabilidades.

5. **Fase de implementación y mantenimiento:** Esto implica proteger el entorno de producción, monitorear continuamente y tener un plan para parchear las vulnerabilidades.

### **Capítulo 11: Seguridad de aplicaciones (AppSec) en profundidad**

#### **11.1 Autenticación y autorización en detalle**

* **Autenticación (¿Quién eres?):**
* **Autenticación multifactor (MFA):** El control más eficaz para proteger cuentas. Requiere dos o más factores de verificación de diferentes categorías: algo que sabes (contraseña), algo que tienes (teléfono) o algo que eres [biométrico]([40)](#ref-40).
* **Autorización (¿Qué puedes hacer?):**
* **La opinión del desarrollador:** Aquí es donde ocurren muchos errores críticos. Un defecto común se llama **Referencia directa a objetos inseguros (IDOR)**. Esto sucede cuando una aplicación utiliza un identificador proporcionado por el usuario para acceder a un recurso sin realizar una verificación de autorización.[[41]](#ref-41). La solución es verificar siempre que el usuario actualmente autenticado tenga permiso para acceder al recurso solicitado.

#### **11.2 Criptografía para desarrolladores: las reglas cardinales**

* **Regla 1: Nunca lances tu propia criptografía.** La criptografía es increíblemente difícil de hacer bien. Utilice siempre bibliotecas estándar bien examinadas [por ejemplo, Tink de Google, Libsodium]([42)](#ref-42).
* **Regla 2: Utilice algoritmos estándar y potentes.** Para el hash de contraseñas, utilice un algoritmo moderno y lento como **Argon2**[[43]](#ref-43). Para cifrado simétrico, utilice **AES-256-GCM**. Para cifrado asimétrico, utilice **RSA-4096** o criptografía de curva elíptica.
* **Regla 3: La gestión de claves lo es todo.** La seguridad de un sistema criptográfico depende enteramente del secreto de las claves. Utilice un sistema de administración de claves (KMS) dedicado o un módulo de seguridad de hardware (HSM) para almacenar y administrar claves criptográficas.[[44]](#ref-44).

#### **11.3 Seguridad de la cadena de suministro: la nueva frontera**

* **La visión del ingeniero de software:** Las aplicaciones modernas se ensamblan a partir de cientos de dependencias de código abierto. Una vulnerabilidad en solo una de esas dependencias se convierte en una vulnerabilidad en su aplicación. Este es un ataque a la cadena de suministro.
* **Log4Shell (Ejemplo):** La vulnerabilidad Log4j fue un ejemplo catastrófico. Una biblioteca de registro única y ubicua tenía una vulnerabilidad crítica de ejecución remota de código, lo que hacía que millones de aplicaciones fueran instantáneamente vulnerables.[[45]](#ref-45).
* **Defensas:**
* **Lista de materiales de software (SBoM):** Mantenga un inventario completo de todas las dependencias en su aplicación.[[46]](#ref-46).
* **Análisis de vulnerabilidades:** Utilice herramientas como **Snyk, Dependabot o Trivy** para escanear continuamente sus dependencias en busca de vulnerabilidades conocidas.

### **Capítulo 12: Proteger la pila moderna nativa de la nube**

#### **12.1 Seguridad del contenedor**

* **Imágenes base seguras:** Comience con imágenes base mínimas y confiables (p. ej.,`distroless`o`alpine`) para reducir la superficie de ataque[[47]](#ref-47).
* **No ejecutar como raíz:** De forma predeterminada, los contenedores se ejecutan como raíz.`root`usuario. Utilice el`USER`instrucción en su Dockerfile para ejecutar la aplicación como usuario sin privilegios.
* **Escaneo de imágenes:** Integre herramientas como Trivy o Clair en su proceso de CI/CD para escanear las imágenes de su contenedor en busca de vulnerabilidades conocidas antes de enviarlas a un registro.

#### **12.2 Seguridad de Kubernetes**

Kubernetes es un sistema potente pero complejo con una gran superficie de ataque.

* **Control de acceso basado en roles (RBAC):** Utilice RBAC para aplicar el principio de privilegio mínimo tanto para los usuarios como para las cuentas de servicio dentro del clúster.[[48]](#ref-48).
* **Políticas de red:** De forma predeterminada, todos los pods de un clúster pueden comunicarse con todos los demás pods. Debes implementar`NetworkPolicy`recursos para restringir la comunicación basándose en una postura de "denegación por defecto".
* **Gestión de secretos:** No almacene secretos como texto sin formato en ConfigMaps. Utilice el objeto Kubernetes Secrets integrado, pero para mayor seguridad, intégrelo con un administrador de secretos externo como HashiCorp Vault.[[49]](#ref-49).
* **Estándares de seguridad de pods:** Utilice los estándares de seguridad de pods para evitar que los pods se ejecuten con configuraciones peligrosas, como ejecutarse como root o acceder a la red del host.[[50]](#ref-50).

#### **12.3 Seguridad de infraestructura como código (IaC)**

* **La vista del desarrollador:** Las herramientas de IaC como Terraform le permiten definir su infraestructura en código. Este código se puede escanear en busca de configuraciones incorrectas *antes* de implementarlo.
* **Análisis estático para IaC:** Utilice herramientas como **Checkov** o **tfsec** en su canal de CI/CD para escanear su código Terraform en busca de problemas de seguridad comunes, como la creación de un depósito S3 de acceso público o un grupo de seguridad que permita SSH desde todo Internet (`0.0.0.0/0`)[[51]](#ref-51).

---

## **Conclusión: La Síntesis de Disciplinas**

Este viaje de tres volúmenes nos ha llevado desde los fundamentos del desarrollo backend hasta las complejidades de los sistemas distribuidos y, finalmente, hasta la disciplina integral de la arquitectura de seguridad. La lección definitiva es que no se trata de campos separados. Un ingeniero de software que no comprenda las redes y la seguridad creará aplicaciones frágiles y vulnerables. Un ingeniero de redes que no comprende las aplicaciones que se ejecutan en su red no puede protegerla de manera efectiva. Un profesional de seguridad que no comprenda el desarrollo y las operaciones no puede brindar una orientación eficaz. El ingeniero de sistemas moderno, en el sentido más estricto, debe ser un erudito. Deben poder razonar sobre el sistema en cada capa de abstracción, desde el paquete de red hasta la lógica de la aplicación, desde la regla del firewall hasta la configuración del contenedor. Deben pensar como constructores, defensores y rompedores simultáneamente. La seguridad no es un producto o una característica; es una propiedad de un sistema bien diseñado. Es un proceso continuo de diseño, defensa y adaptación frente a un panorama de amenazas en constante evolución. El enfoque holístico y de principios que se detalla en este trabajo no es solo una metodología: es el requisito fundamental para construir los sistemas resilientes y confiables de los que depende nuestro mundo digital.

---

---

## **Referencias**

<a i d="ref-1"></a>

1. Llamarada de nube. (Dakota del Norte.). *¿Qué es el modelo OSI?* Obtenido de <https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/><a i d="ref-2"></a>
2. Krebs, B. (2012). *La creciente amenaza de pequeños y silenciosos grifos de red*. Krebs sobre seguridad. Obtenido de <https://krebsonsecurity.com/2012/03/the-growing-threat-from-tiny-silent-network-taps/><a i d="ref-3"></a>
3. Cisco. (Dakota del Norte.). *¿Qué es 802.1X?* Obtenido de <https://www.cisco.com/c/en/us/products/security/what-is-802-1x.html><a i d="ref-4"></a>
4.Microsoft. (2021). *Protocolo de resolución de direcciones*. Microsoft aprende. Obtenido de <https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/network-subsystem/address-resolution-protocol><a i d="ref-5"></a>
4. OWASP. (Dakota del Norte.). *Suplantación del protocolo de resolución de direcciones*. Obtenido de <https://owasp.org/www-community/attacks/ARP_Spoofing><a i d="ref-6"></a>
5. Imperva. (Dakota del Norte.). *Inundación MAC*. Obtenido de <https://www.imperva.com/learn/application-security/mac-flooding/><a i d="ref-7"></a>
6. Cisco. (Dakota del Norte.). *Ataque de salto de VLAN*. Obtenido de <https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst4500/12-2/15-02SG/configuration/guide/config/dhcp.html#wp1102555><a i d="ref-8"></a>
7. Frikis para frikis. (2023). *Seguridad Portuaria en Redes Informáticas*. Obtenido de <https://www.geeksforgeeks.org/port-security-in-computer-networks/><a i d="ref-9"></a>
8. Llamarada de nube. (Dakota del Norte.). *¿Qué es el Protocolo de Internet?* Obtenido de <https://www.cloudflare.com/learning/network-layer/internet-protocol/><a i d="ref-10"></a>
9. Llamarada de nube. (Dakota del Norte.). *Ataque DDoS Pitufo*. Obtenido de <https://www.cloudflare.com/learning/ddos/smurf-ddos-attack/><a i d="ref-11"></a>
10. Llamarada de nube. (Dakota del Norte.). *¿Qué es el secuestro de BGP?* Obtenido de <https://www.cloudflare.com/learning/security/glossary/bgp-hijacking/><a i d="ref-12"></a>
11. IETF. (2000). *RFC 2827: Filtrado de ingreso a la red: Derrotar ataques de denegación de servicio que emplean suplantación de dirección de origen IP*. Obtenido de <https://datatracker.ietf.org/doc/html/rfc2827><a i d="ref-13"></a>
12. IETF. (1981). *RFC 793: Protocolo de control de transmisión*. Obtenido de <https://datatracker.ietf.org/doc/html/rfc793><a i d="ref-14"></a>
13. Llamarada de nube. (Dakota del Norte.). *Ataque de inundación SYN*. Obtenido de <https://www.cloudflare.com/learning/ddos/syn-flood-ddos-attack/><a i d="ref-15"></a>
14. Nmapa. (Dakota del Norte.). *Sitio oficial del proyecto Nmap*. Obtenido de <https://nmap.org/><a i d="ref-16"></a>
16.Wikipedia. (Dakota del Norte.). *Cookies SINC*. Obtenido de <https://en.wikipedia.org/wiki/SYN_cookies><a i d="ref-17"></a>
15. Instituto SANS. (2016). *Implementación de Segmentación de Red*. Obtenido de <https://www.sans.org/white-papers/37232/><a i d="ref-18"></a>
16. IETF. (2003). *RFC 3069: Agregación de VLAN para una asignación eficiente de direcciones*. Obtenido de <https://datatracker.ietf.org/doc/html/rfc3069><a i d="ref-19"></a>
17. Redes de Palo Alto. (Dakota del Norte.). *¿Qué es una DMZ?* Obtenido de <https://www.paloaltonetworks.com/cyberpedia/what-is-a-dmz><a i d="ref-20"></a>
18. NIST. (2020). *SP 800-207: Arquitectura de confianza cero*. Obtenido de <https://csrc.nist.gov/publications/detail/sp/800-207/final><a i d="ref-21"></a>
19. Kubernetes. (Dakota del Norte.). *Políticas de Red*. Obtenido de <https://kubernetes.io/docs/concepts/services-networking/network-policies/><a i d="ref-22"></a>
20. Redes de Palo Alto. (Dakota del Norte.). *¿Qué es un firewall de próxima generación (NGFW)?* Obtenido de <https://www.paloaltonetworks.com/cyberpedia/what-is-a-next-generation-firewall-ngfw><a i d="ref-23"></a>
21. OWASP. (Dakota del Norte.). *Top 10 de OWASP*. Obtenido de <https://owasp.org/www-project-top-ten/><a i d="ref-24"></a>
22. OWASP. (Dakota del Norte.). *Técnicas de Evasión WAF*. Obtenido de <https://owasp.org/www-community/attacks/WAF_Evasion_Techniques><a i d="ref-25"></a>
23. Instituto SANS. (2001). *Comprensión de los sistemas de detección de intrusiones*. Obtenido de <https://www.sans.org/white-papers/27/><a i d="ref-26"></a>
24. Agencia de Seguridad Nacional (NSA). (2021). *Defensa en profundidad*. Obtenido de <https://www.nsa.gov/portals/75/documents/what-we-do/cybersecurity/professional-resources/csg-defense-in-depth-20210225.pdf><a i d="ref-27"></a>
25. OWASP. (Dakota del Norte.). *Modelado de amenazas*. Obtenido de <https://owasp.org/www-community/Threat_Modeling><a i d="ref-28"></a>
28.Microsoft. (2022). *El modelo de amenaza STRIDE*. Microsoft aprende. Obtenido de <https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats><a i d="ref-29"></a>
26. Splunk. (Dakota del Norte.). *¿Qué es SIEM?*. Obtenido de <https://www.splunk.com/en_us/data-insider/what-is-siem.html><a i d="ref-30"></a>
27. NIST. (2012). *SP 800-61 Rev. 2: Guía de manejo de incidentes de seguridad informática*. Obtenido de <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final><a i d="ref-31"></a>
28. Lockheed Martín. (Dakota del Norte.). *La cadena de muerte cibernética*. Obtenido de <https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html><a i d="ref-32"></a>
29. OWASP. (Dakota del Norte.). *Falsificación de solicitudes del lado del servidor*. Obtenido de <https://owasp.org/www-community/attacks/Server_Side_Request_Forgery><a i d="ref-33"></a>
30. OWASP. (Dakota del Norte.). *A08:2021 – Fallos de integridad de datos y software (relacionados con la deserialización insegura)*. Obtenido de <https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/><a i d="ref-34"></a>
31. CISA. (Dakota del Norte.). *Evitar ataques de ingeniería social y phishing*. Obtenido de <https://www.cisa.gov/uscert/ncas/tips/ST04-014><a i d="ref-35"></a>
32. MITRA. (Dakota del Norte.). *Marco ATT&CK*. Obtenido de <https://attack.mitre.org/><a i d="ref-36"></a>
33. Depy, B. (sin fecha). *mimikatz*. GitHub. Obtenido de <https://github.com/gentilkiwi/mimikatz><a i d="ref-37"></a>
37.Microsoft. (2022). *Vivir de la tierra*. Blog de seguridad de Microsoft. Obtenido de <https://www.microsoft.com/en-us/security/blog/2022/05/26/living-off-the-land-a-technical-and-strategic-overview-of-lolbins/><a i d="ref-38"></a>
34. OWASP. (Dakota del Norte.). *Desplazamiento a la izquierda*. Obtenido de <https://owasp.org/www-community/Shift_Left><a i d="ref-39"></a>
35. OWASP. (Dakota del Norte.). *Pruebas de seguridad de aplicaciones estáticas (SAST)*. Obtenido de <https://owasp.org/www-community/Static_Application_Security_Testing_(SAST)><a i d="ref-40"></a>
36. NIST. (2017). *SP 800-63B: Directrices de identidad digital: autenticación y gestión del ciclo de vida*. Obtenido de <https://pages.nist.gov/800-63-3/sp800-63b.html><a i d="ref-41"></a>
37. OWASP. (Dakota del Norte.). *A01:2021 – Control de acceso roto (relacionado con IDOR)*. Obtenido de <https://owasp.org/Top10/A01_2021-Broken_Access_Control/><a i d="ref-42"></a>
38. Google. (Dakota del Norte.). *Biblioteca criptográfica Tink*. Obtenido de <https://developers.google.com/tink><a i d="ref-43"></a>
39. La función de hash de contraseñas de Argon2. (Dakota del Norte.). *Sitio oficial de Argon2*. Obtenido de <https://www.password-hashing.net/><a i d="ref-44"></a>
40. AWS. (Dakota del Norte.). *¿Qué es un Servicio de Gestión de Claves?* Obtenido de <https://aws.amazon.com/kms/what-is-kms/><a i d="ref-45"></a>
41. CISA. (Dakota del Norte.). *Guía de vulnerabilidad de Apache Log4j*. Obtenido de <https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance><a i d="ref-46"></a>
42. NTIA. (Dakota del Norte.). *Lista de materiales de software (SBOM)*. Obtenido de <https://www.ntia.gov/SBOM><a i d="ref-47"></a>
43. Plataforma GoogleCloud. (Dakota del Norte.). *Imágenes Docker sin distribución*. GitHub. Obtenido de <https://github.com/GoogleCloudPlatform/distroless><a i d="ref-48"></a>
44. Kubernetes. (Dakota del Norte.). *Usando la autorización RBAC*. Obtenido de <https://kubernetes.io/docs/reference/access-authn-authz/rbac/><a i d="ref-49"></a>
45. HashiCorp. (Dakota del Norte.). *Bóveda*. Obtenido de <https://www.vaultproject.io/><a i d="ref-50"></a>
46. Kubernetes. (Dakota del Norte.). *Estándares de seguridad del pod*. Obtenido de <https://kubernetes.io/docs/concepts/security/pod-security-standards/><a i d="ref-51"></a>
47. Tripulación de puente. (Dakota del Norte.). *Chequeov*. Obtenido de <https://www.checkov.io/>
