---
title: "El dilema de la equidad de la IA: por qué no podemos tenerlo todo"
published: 2025-06-12
description: "Una explicación de por qué las tres métricas de equidad más destacadas en el aprendizaje automático son mutuamente incompatibles y una mirada a un enfoque causal para construir modelos más justos."
image: ''
tags: [AI, Machine Learning, Fairness, Ethics]
category: Engineering
draft: false
lang: "es"
originalSlug: "ML_fairness"
series:
    name: "AI Foundations"
    order: 3
---

Los modelos de aprendizaje automático toman cada vez más decisiones críticas sobre nuestras vidas, desde solicitudes de préstamos hasta recomendaciones laborales e incluso predicciones de delitos. Pero hay un gran problema: estos modelos aprenden de datos históricos, y esos datos a menudo están llenos de sesgos sociales. Una IA entrenada con datos sesgados no sólo aprende estos sesgos; puede amplificarlos.

Un famoso informe de ProPublica de 2016 reveló que la herramienta de predicción de reincidencia COMPAS estaba sesgada en contra de los acusados ​​afroamericanos. Esto provocó un gran impulso en la comunidad de IA para definir y medir la "justicia". ¿El problema? Las tres métricas de equidad más destacadas son **mutuamente incompatibles**. Un artículo innovador explica no sólo *que* esto es cierto, sino *por qué* es cierto desde un nivel estructural fundamental.

---

## Las Tres Caras de la Justicia ⚖️

Para comprender el problema, necesitamos conocer a los principales contendientes para definir la justicia. El documento se centra en tres métricas populares:

* **Paridad demográfica**: esta métrica insiste en que las predicciones de un modelo deben ser independientes de un atributo sensible como la raza o el género. En términos simples, la tasa de resultados positivos (por ejemplo, obtener un préstamo) debería ser la misma para todos los grupos.

* **Probabilidades igualadas**: esta métrica requiere que la precisión del modelo sea igual en diferentes grupos para cada resultado. Por ejemplo, la tasa de verdaderos positivos y la tasa de falsos positivos deben ser la misma tanto para hombres como para mujeres.

* **Paridad predictiva**: esta métrica garantiza que, para cualquier predicción determinada, la probabilidad de que sea correcta sea la misma para todos los grupos. Por ejemplo, si el modelo predice que una persona pagará un préstamo, la tasa de pago real entre ese grupo debería ser consistente en todas las razas.

El "Teorema de la imposibilidad" demuestra que, excepto en casos triviales, un modelo no puede satisfacer estas tres métricas al mismo tiempo. Esto ha dejado a los desarrolladores en un aprieto, obligándolos a elegir qué definición de justicia priorizar a expensas de los demás.

---

## Una explicación causal: por qué no pueden coexistir

La contribución clave del artículo es explicar esta imposibilidad utilizando **diagramas causales**. En lugar de limitarse a mirar las estadísticas, examina las estructuras subyacentes de generación de datos necesarias para cada métrica de equidad. Denotemos el **atributo sensible** como`A`, el **verdadero resultado** como`Y`, y la **predicción del modelo** como`Ŷ`.

La relación causal entre`A`,`Y`, y`Ŷ`debe estructurarse de manera diferente para que cada métrica cumpla:

* Para **Paridad demográfica** (`Ŷ`es independiente de`A`), el camino entre la predicción y el atributo sensible se bloquea naturalmente cuando`Y`es un "colisionador".
    :::note[Causal Diagram for Demographic Parity]
    `A -> Y <- Ŷ`

    :::

* Para **Probabilidades igualadas** (`Ŷ` es independiente de `A` dado `Y`), observar el resultado verdadero `Y` bloquea el camino entre `A` y `Ŷ`.
    :::note[Causal Diagram for Equalized Odds]
    `A -> Y -> Ŷ`
    :::

* Para **Paridad predictiva** (`Y` es independiente de `A` dado `Ŷ`), observar la predicción `Ŷ` bloquea el camino.
    :::note[Causal Diagram for Predictive Parity]
    `A -> Ŷ -> Y`
    :::

De estos diagramas se desprende claramente que la estructura fundamental de los datos necesarios para cada métrica es diferente y mutuamente excluyente. Simplemente no se puede tener un único proceso de generación de datos que los satisfaga a todos simultáneamente. El problema no es el algoritmo de aprendizaje; es una restricción fundamental de los datos mismos.

---

## Un nuevo camino a seguir: equidad a través de la corrección 💡

Entonces, si la justicia perfecta es imposible, ¿qué hacemos? El autor sostiene que necesitamos cambiar el objetivo.

El aprendizaje automático estándar tiene como objetivo la **Minimización de riesgos empíricos (ERM)**, lo que significa que el modelo es recompensado por coincidir perfectamente con las etiquetas en los datos de entrenamiento (a menudo sesgados). Pero ¿y si el objetivo no fuera predecir la etiqueta *histórica*, sino una etiqueta *justa*?

Un nuevo marco causal que introduce una **"variable de corrección",`C`** se ha propuesto. Puedes pensar en`C`como un interruptor. Esta variable, que está influenciada por el atributo sensible`A`, determina si la predicción del modelo`Ŷ`debe seguir la etiqueta verdadera`Y`o una función diferente de "equidad".

:::note[Causal Diagram for Fairness Through Correction]
A -> C
C -> Ŷ
Y -> Ŷ
:::

Esencialmente, para un grupo que ha sido históricamente favorecido, el modelo podría proceder como de costumbre (`C=1`). Pero para un grupo desfavorecido, la variable de corrección podría invertirse (`C=0`), lo que hace que el modelo se desvíe de los datos históricos para producir un resultado más equitativo. Este enfoque tiene varias ventajas:

* Reconoce que la justicia requiere activamente **desviarse de patrones históricos sesgados**.
* Permite a los profesionales ajustar un hiperparámetro para decidir **cuánta desviación se necesita** en función de cuán injustos son los datos.
* Puede satisfacer versiones más flexibles de paridad demográfica y probabilidades igualadas juntas, condicionadas a la variable de corrección.`C`.

Al reformular el problema, este enfoque causal proporciona una poderosa herramienta para construir modelos que no sólo reflejen el mundo tal como es, sino que ayuden a crear un mundo que esté más alineado con nuestras nociones cambiantes de justicia.
