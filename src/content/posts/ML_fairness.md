---
title: "The AI Fairness Dilemma: Why We Can't Have It All"
published: 2025-06-12
description: "An explanation of why the three most prominent fairness metrics in machine learning are mutually incompatible, and a look at a causal approach to building fairer models."
image: ''
tags: [AI, Machine Learning, Fairness, Ethics]
category: "Artificial Intelligence"
draft: false
---

Machine learning models are increasingly making critical decisions about our lives, from loan applications to job recommendations and even crime prediction. But there's a huge problem: these models learn from historical data, and that data is often packed with societal biases. An AI trained on biased data doesn't just learn these biases; it can amplify them.

A famous 2016 ProPublica report revealed that the COMPAS recidivism prediction tool was biased against African-American defendants. This sparked a major push in the AI community to define and measure "fairness." The problem? The three most prominent fairness metrics are **mutually incompatible**. A groundbreaking paper explains not just *that* this is true, but *why* it's true from a fundamental, structural level.

---

## The Three Faces of Fairness ⚖️

To understand the problem, we need to know the main contenders for defining fairness. The paper focuses on three popular metrics:

* **Demographic Parity**: This metric insists that a model's predictions must be independent of a sensitive attribute like race or gender. In simple terms, the rate of positive outcomes (e.g., getting a loan) should be the same for all groups.

* **Equalized Odds**: This metric requires that the model's accuracy is equal across different groups for each outcome. For example, the true positive rate and the false positive rate should be the same for both men and women.

* **Predictive Parity**: This metric ensures that for any given prediction, the probability of it being correct is the same for all groups. For instance, if the model predicts a person will repay a loan, the actual rate of repayment among that group should be consistent across all races.

The "Impossibility Theorem" proves that, except in trivial cases, a model can't satisfy all three of these metrics at the same time. This has left developers in a bind, forcing them to choose which definition of fairness to prioritize at the expense of others.

---

## A Causal Explanation: Why They Can't Coexist

The paper's key contribution is explaining this impossibility using **causal diagrams**. Instead of just looking at statistics, it examines the underlying data-generating structures required for each fairness metric. Let's denote the **sensitive attribute** as `A`, the **true outcome** as `Y`, and the **model's prediction** as `Ŷ`.

The causal relationship between `A`, `Y`, and `Ŷ` must be structured differently for each metric to hold:

* For **Demographic Parity** (`Ŷ` is independent of `A`), the path between the prediction and the sensitive attribute is naturally blocked when `Y` is a "collider".
    :::note[Causal Diagram for Demographic Parity]
    `A -> Y <- Ŷ`
    :::
* For **Equalized Odds** (`Ŷ` is independent of `A` given `Y`), observing the true outcome `Y` blocks the path between `A` and `Ŷ`.
    :::note[Causal Diagram for Equalized Odds]
    `A -> Y -> Ŷ`
    :::
* For **Predictive Parity** (`Y` is independent of `A` given `Ŷ`), observing the prediction `Ŷ` blocks the path.
    :::note[Causal Diagram for Predictive Parity]
    `A -> Ŷ -> Y`
    :::

It's clear from these diagrams that the fundamental structure of the data required for each metric is different and mutually exclusive. You simply cannot have a single data generation process that satisfies them all simultaneously. The problem isn't the learning algorithm; it's a fundamental constraint of the data itself.

---

## A New Path Forward: Fairness Through Correction 💡

So, if perfect fairness is impossible, what do we do? The author argues we need to change the goal.

Standard machine learning aims for **Empirical Risk Minimization (ERM)**, which means the model is rewarded for perfectly matching the labels in the (often biased) training data. But what if the goal wasn't to predict the *historical* label, but a *fair* label?.

A new causal framework that introduces a **"correction variable," `C`** has been proposed. You can think of `C` as a switch. This variable, which is influenced by the sensitive attribute `A`, determines whether the model's prediction `Ŷ` should follow the true label `Y` or a different, "fairness" function.
:::note[Causal Diagram for Fairness Through Correction]
A -> C
C -> Ŷ
Y -> Ŷ
:::

Essentially, for a group that has been historically advantaged, the model might proceed as usual (`C=1`). But for a disadvantaged group, the correction variable might flip (`C=0`), causing the model to deviate from the historical data to produce a more equitable outcome. This approach has several advantages:

* It acknowledges that fairness requires actively **deviating from biased historical patterns**.
* It allows practitioners to tune a hyperparameter to decide **how much deviation is needed** based on how unfair the data is.
* It can satisfy looser versions of Demographic Parity and Equalized Odds together, conditioned on the correction variable `C`.

By reframing the problem, this causal approach provides a powerful tool for building models that don't just reflect the world as it is, but help create a world that is more aligned with our evolving notions of fairness.
