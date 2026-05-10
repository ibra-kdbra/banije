### The Strategy: "The Interactive Wrapper"

You can create a Svelte component that takes an image and a list of "hotspots" as data.

#### 1. Create the Svelte Component (`ImageHotspots.svelte`)
```svelte
<script>
  export let src;
  export let alt = "Interactive diagram";
  export let hotspots = []; // Array of { x, y, w, h, label, info }

  let activeInfo = "";

  function showDetails(info) {
    activeInfo = info;
  }
</script>

<div class="container">
  <div class="image-wrapper">
    <img {src} {alt} />

    {#each hotspots as spot}
      <button
        class="hotspot"
        style="top: {spot.y}%; left: {spot.x}%; width: {spot.w}%; height: {spot.h}%;"
        on:mouseenter={() => showDetails(spot.info)}
        on:mouseleave={() => activeInfo = ""}
      >
        <span class="sr-only">{spot.label}</span>
      </button>
    {/each}
  </div>

  {#if activeInfo}
    <div class="tooltip">{activeInfo}</div>
  {/if}
</div>

<style>
  .container { position: relative; max-width: 100%; }
  .image-wrapper { position: relative; display: inline-block; }
  img { display: block; width: 100%; height: auto; border-radius: 8px; }

  .hotspot {
    position: absolute;
    background: rgba(255, 255, 255, 0);
    border: 2px dashed transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .hotspot:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .tooltip {
    margin-top: 1rem;
    padding: 1rem;
    background: #333;
    color: white;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .sr-only { display: none; }
</style>
```

#### 2. Using it in your Markdown (MDX)
If you aren't using `.mdx` yet, I highly recommend adding the `@astrojs/mdx` integration. It allows you to drop Svelte components directly into your diary entries.

In your `post.mdx`:
```markdown
---
title: "Understanding the Observer Pattern"
---
import ImageHotspots from '../components/ImageHotspots.svelte';

Here is the breakdown of the diagram I generated today:

<ImageHotspots
  client:load
  src="/images/observer-diagram.png"
  hotspots={[
    { x: 55, y: 31, w: 10, h: 8, label: "Subject", info: "The object holding the state." },
    { x: 28, y: 32, w: 20, h: 7, label: "Observer", info: "The objects waiting for updates." }
  ]}
/>
```

### Why this is better than what Gemini did:
1.  **Responsiveness:** By using percentages (`%`) instead of pixels (`px`) for your coordinates, your "interactive boxes" will stay in the right place even if the user is viewing your diary on a phone.
2.  **Svelte reactivity:** You can make the `info` text appear in a nice animated sidebar or a modal using Svelte's `transition:fade`.
3.  **Astro efficiency:** Astro will only ship the JavaScript for that component if you use the `client:load` directive, keeping your diary fast.

### A Quick Tip on Coordinates:
To get the percentages easily, open your image in a browser, open the **Inspect Element** tool, and hover over the image. You can temporarily draw a `div` over it and tweak the `%` values until it fits.


## Version two task: **Task: Interactive Image UI/UX Overhaul**

Smart move stepping back to look at the architecture. Moving from imperative DOM manipulation (vanilla JS) to a declarative framework (Svelte) requires a shift in how you structure the logic.

Here is the high-level plan to rebuild this feature correctly, cleanly, and without the bounding-box bloat.

### Phase 1: Data Correction (The Bounding Boxes)

The root cause of the "missing the right boxes" issue is the JSON coordinate mapping.

* **The Problem:** The current `w` (width) and `h` (height) percentages in the JSON are too large, creating massive invisible hit areas that overlap and confuse the user.
* **The Fix:** Audit and adjust the `x, y, w, h` values in your JSON file so they act as a tight highlight *only* around the text strings on the diagram, rather than the general vicinity of the concept.

### Phase 2: State Management Architecture

Instead of using `document.getElementById` and manually toggling `.active` classes, Svelte will handle the UI purely based on three reactive variables:

1. **`isFocusMode` (Boolean):** Tracks whether the full-screen interactive overlay is open.
2. **`isZoomed` (Boolean):** Tracks the zoom state of the image in focus mode.
3. **`activeId` (String | Null):** The core driver of the interactive feature. It stores the ID of the currently clicked hotspot. If it's `null`, nothing is selected.

### Phase 3: Component Layout & Rendering Strategy

You will split the Svelte template into two primary conditional blocks:

* **The Preview Block:** Always renders initially. A static image that, when clicked, sets `isFocusMode = true`.
* **The Focus Overlay Block:** Wrapped in an `{#if isFocusMode}` statement.
* **Image Pane:** Iterates through your JSON array to render absolute-positioned hotspot buttons over the image.
* **Sidebar Pane:** Wrapped in an `{#if activeId}` statement. This guarantees the sidebar content is strictly closed/empty until a user clicks a hotspot. If `activeId` is null, you render a helpful "Select a label to begin" empty state.



### Phase 4: Interaction Logic

* **Toggling Hotspots:** When a hotspot is clicked, the function should check if the clicked ID matches the current `activeId`. If it does, set `activeId = null` (closing the sidebar). If it doesn't, update `activeId` to the new ID (swapping the sidebar content).
* **Closing the View:** The close button or the "Escape" key listener should reset `isFocusMode = false`, `activeId = null`, and `isZoomed = false`, returning the component to its baseline state.

### Phase 5: Styling Approach

* **Hotspot UI:** Abandon the large padded background strategy. Instead, style the hotspots to look like interactive links on the image. Give them a subtle dashed `border-bottom` that turns into a tight, solid box when the `activeId` matches the hotspot's ID.
* **Encapsulation:** Keep all CSS inside Svelte's `<style>` block to ensure it is naturally scoped to the component and doesn't leak into the rest of your app.

By following this plan, your UI becomes a direct reflection of your data (`activeId`), entirely eliminating the sync bugs and overlapping click areas from the previous version.
