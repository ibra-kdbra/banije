---
originalSlug: "design_patterns_usabilities"
lang: "zh_TW"
title: "架構師的心智：平衡設計模式與務實主義"
published: 2026-04-08
description: "深入探討設計模式的實用性與陷阱，從經典物件導向結構到現代分散式系統與 AI 輔助的協調。"
image: "/images/posts/design-patterns-blueprint.png"
tags: [架構, 設計模式, AI]
category: "架構"
draft: false
---

## 架構師的兩難：藍圖還是負擔？

在軟體架構的象牙塔裡，我們常將**設計模式**視為神聖的幾何學。對初級開發者而言，它們看起來像是一種秘密的暗號；對一位憤世嫉俗的資深開發者來說，它們往往像是毫無必要的抽象層，讓「Hello World」都變得需要五個介面和一個工廠。

但身為一位從「義大利麵式架構」的泥沼中拯救過專案的技術解決方案工程師，我可以告訴你：設計模式不僅有用，它們更是可擴展系統的**通用語言** [^1]。然而，它們的價值不在於複雜性，而在於標準化人類思維的能力。

---

### 架構 vs. 設計模式：認識差異

在我們爭論其實用性之前，必須停止將這些術語混為一談。

*   **軟體架構**是「宏觀」。它是高層次的結構（微服務、單體、事件驅動）。它關乎那些難以更改的決策：「我們的服務如何溝通？」或「資料儲存在哪裡？」 [^2]。
*   **設計模式**是「微觀」。它們是針對該架構中重複出現的問題所提供的局部解決方案。可以將架構想像成房屋的平面圖，而設計模式則是你接線燈開關的具體方式。

### 真正的價值：溝通速度

模式的最大實用性不在於程式碼本身；而在於**心智上的簡寫**。如果我告訴一個工程師團隊：「我們需要一種方式，在狀態改變時通知多個服務，且不產生緊密耦合。」我們可能會花費一小時來辯論。如果我說：「在這裡實施一個觀察者模式 (Observer pattern)。」大家會立刻理解資料流、限制條件和職責 [^3]。

::interactive{id="perspective-diagram" src="/images/posts/angles-of-elevation.webp" data="src/data/interactive/angles.json" overview="如同此圖表使用標準化的詞彙解釋複雜的空間關係，軟體架構依賴設計模式作為通用簡寫，瞬間跨團隊溝通複雜的系統行為。"}

模式減少了「重新發明輪子」的認知負擔。每一次你「發明」一個管理全域狀態的巧妙方法時，你實際上只是在建構一個（很可能帶有 Bug 的）**單例模式 (Singleton)** 或**狀態模式 (State)** 的版本。使用既有的版本意味著你免費獲得了數十年邊緣案例測試的好處。

### 進化的「安全網」

良好的架構在於**延遲決策**。設計模式讓你可以在系統中建立「插槽」。透過使用**介面卡模式 (Adapter)** 或**策略模式 (Strategy)**，你不僅僅是讓程式碼「好看」；多年以後，當業務決定從 AWS S3 遷移到 Azure Blob Storage 時，你將不必重寫整個核心邏輯。你只需要更換實作 [^4]。

:::note[架構師的真相]
我們不使用模式來讓程式碼變得聰明。我們使用它們來讓程式碼變得**乏味**。乏味的程式碼是可預測的。可預測的程式碼是可維護的。
:::

---

## 陰暗面：模式何時變成問題

在我的職業生涯中，我見過比「義大利麵式程式碼」更多的專案被**過度工程化**所摧毀。我們產業有一種特定的疾病，稱為**「模式病 (Patternitis)」**，這是一種強迫症，無論是否適用，都試圖將每個問題套用教科書上的設計模式。

### 1. 抽象的代價 (Abstraction Tax)

每一次你實作一個設計模式，你都要支付一筆**抽象的代價**。你用長期的彈性來換取即時的程式碼可讀性。如果你為一個實際上永遠不會改變的邏輯使用了**工廠提供者模式 (Factory Provider Pattern)**，你並未讓程式碼「更好」；事實上，你只是讓它更難除錯。

:::important[經驗法則]
如果抽象無法解決特定的、預期的痛點，那它就只是噪音。複雜性是你每次建置或引入新員工時都要支付利息的債務。
:::

### 2. 萬用錘子謬誤 (Golden Hammer Fallacy)

我們都遇過那種剛讀完一本設計模式的書，然後突然將每個問題都視為**策略模式 (Strategy Pattern)** 的工程師。這會導致「邪教式程式設計 (Cargo Cult Programming)」，為了被認為是「最佳實踐」而使用模式，卻不理解其權衡。

### 3. YAGNI：架構師最喜歡的縮寫

**YAGNI** (*You Ain't Gonna Need It* - 你不會需要它) 是過度熱衷於模式使用者的天敵 [^5]。架構選擇應該由**需求**驅動，而不是由**願望**驅動。當我們有第二個監聽器時，我們才會重構。在那之前，保持簡單。

---

## 選用矩陣：何時扣下扳機

作為軟體架構師，我的工作不是尋找使用模式的方法；而是尋找以最少的「魔法」來解決業務問題的方法。然而，有時候，引入模式比混亂的替代方案來得更划算。

### 1. 維度一：變更的頻率

這是最關鍵的指標。如果一段程式碼只寫一次，很少被修改，那麼用複雜的**裝飾器模式 (Decorator)** 或**橋接模式 (Bridge)** 包裹它就是浪費時間。將模式應用於「變更熱區 (churn zones)」，也就是你 Git 歷史記錄中提交次數最多的區域。

### 2. 維度二：三倍法則 (Rule of Three)

在架構中，我們遵循**三倍法則** [^6]：
1.  **第一次：** 你只寫程式碼。讓它能工作。
2.  **第二次：** 你會因為複製貼上而感到一絲罪惡感。你抵制了泛化的衝動。
3.  **第三次：** 你正式發現了一個重複出現的問題。**現在**，你實作這個模式。

### 3. 維度三：團隊規模 (認知負擔)

架構選擇在很大程度上關乎**心理學**，也關乎技術。如果我領導一家快速發展的初創公司，團隊成員多為初級開發者或離職率高，我會優先考慮**可讀性高於可擴展性**。在此情境下，一個「聰明的」模式是一種負擔，因為它提高了入門門檻。

| 問題類型 | 架構痛點 | 推薦模式類別 |
| :--- | :--- | :--- |
| **物件創建** | 硬編碼的依賴導致測試困難。 | **創建型** (依賴注入, 工廠) |
| **相容性** | 舊系統無法與我們的微服務溝通。 | **結構型** (介面卡, 外觀) |
| **溝通** | 服務 A 需要知道服務 B 做了什麼，但又不能「知道」服務 B 的存在。 | **行為型** (觀察者, 調解者) |
| **狀態膨脹** | 巨大的 `switch` 語句或 `if/else` 鏈來管理物件狀態。 | **行為型** (狀態, 策略) |

---

## 模式演進：超越四人幫 (Gang of Four)

經典的設計模式大多概念於 90 年代，針對單一進程系統 [^7]。如今，我們花在雲端的時間與 IDE 一樣多。這種轉變迫使我們的模式從內部程式碼結構演變為**分散式系統行為**。

### 從物件到服務

解耦的邏輯保持不變，但實作已轉移到網路層：
*   **觀察者模式 (Observer)** 變成**發布/訂閱訊息 (Pub/Sub Messaging)** (Kafka, RabbitMQ, SNS/SQS)。
*   **單例模式 (Singleton)** 演變成**全域組態儲存 (Global Configuration Store)** 或**分散式快取 (Distributed Cache)** (Redis)。
*   **外觀模式 (Facade)** 變成** API 閘道 (API Gateway)**，用來隱藏下游微服務的複雜性 [^8]。

### 韌性模式的興起

在現代架構中，最重要的模式是處理遠端呼叫不可避免的失敗 [^9]：
*   **斷路器模式 (Circuit Breaker)**：防止失敗的服務在整個叢集中引發連鎖故障 [^10]。
*   **側車模式 (Sidecar Pattern)**：將橫切關注點（日誌記錄、安全）從應用程式碼移到單獨的容器中 [^11]。
*   **Saga 模式**：將分散式交易管理為一系列本地交易，並帶有補償（「撤銷」）邏輯，以維持最終一致性 [^12]。

---

## 務實架構師的宣言：LLM 時代的工程

在 2026 年，最大的問題不僅在於使用哪種模式；而在於誰（或什麼）在使用者。隨著 AI 輔助工具如今產生全球 40% 的樣板程式碼，軟體架構師的角色已從「腳本大師」轉變為**「意圖的協調者 (Orchestrator of Intent)」**。

### 1. 原則重於模式
*   **情境重於教條**：沒有模式在真空中是「最佳實踐」。
*   **可維護性重於巧妙**：如果 AI 生成的複雜模式人類無法除錯，那就是失敗。
*   **價值重於抽象**：如果模式未能降低未來變更的成本，那就是**技術上的鍍金 (Technical Gold-Plating)**。

### 2. AI 因子：「氛圍編碼 (Vibe Coding)」對決工程
我們正進入**「氛圍編碼」**時代，在這個時代，你可以用自然語言描述一個系統。這使得設計模式**更加重要**，因為 AI 喜歡建議流行的模式，即使它們對你的邊緣案例效率不高。架構師的職責是扮演**防護欄 (Guardrail)**。

:::tip[解決方案工程師的提示]
使用 AI 來*實作*模式，但切勿讓它*選擇*模式。告訴 AI：「使用策略模式來實作這個，」而不是只問：「我應該如何處理這個？」
:::

### 3. 新的 GoF：代理式和分散式模式
字母表正朝向**代理式工作流程 (Agentic Workflows)** 演進：
*   **協調者模式 (Orchestrator Pattern)**：管理多個專業 AI 代理。
*   **防護欄模式 (Guardrail Pattern)**：驗證機率性 LLM 輸出的確定性層。
*   **提示即程式碼模式 (Prompt-as-Code Pattern)**：將 AI 指令視為與原始碼相同的版本控制和測試嚴謹性。

---

## 結論：人類護城河

設計模式真的有用嗎？**是的**。但不是作為規則清單。它們是解決重複性問題的**心智框架**。在一個 AI 可以隨你所願編寫任何程式碼的世界裡，「人類護城河」，也就是讓你不可替代的，是**設計判斷力**。

架構選擇最終是**說「不」的藝術**。成為那個建造易於理解、易於變更，且最重要的是，易於刪除的系統的架構師。

---

## 參考資料

[^1]: [Refactoring.Guru - Design Patterns](https://refactoring.guru/design-patterns)
[^2]: [Martin Fowler - Software Architecture Guide](https://martinfowler.com/architecture/)
[^3]: [Wikipedia - Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
[^4]: [Microsoft Learn - Strategy Pattern](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#the-strategy-pattern)
[^5]: [Martin Fowler - YAGNI](https://martinfowler.com/bliki/Yagni.html)
[^6]: [Wikipedia - Rule of three (computer programming)](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
[^7]: [Gang of Four - Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)
[^8]: [Microsoft Learn - API Gateway Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)
[^9]: [Azure Architecture Center - Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)
[^10]: [Azure Architecture Center - Circuit Breaker Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
[^11]: [Azure Architecture Center - Sidecar Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar)
[^12]: [Azure Architecture Center - Saga Design Pattern](https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)