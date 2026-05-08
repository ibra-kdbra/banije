<script>
  /**
   * InteractiveImage — Version 2 (Svelte 5)
   * 
   * Features:
   *   - Dev-Only Debugger: Visible only during development (npm run dev)
   *   - Premium UI: Glassmorphism and smooth transitions
   *   - Portaled Overlay: Escapes parent CSS transforms
   */
  import { onMount } from 'svelte';

  let { src, items = [], alt = 'Interactive Diagram' } = $props();

  // Environment Check
  const isDev = import.meta.env.DEV;

  // State
  let isFocusMode = $state(false);
  let isZoomed   = $state(false);
  let activeId   = $state(null);
  let debugX     = $state(0);
  let debugY     = $state(0);

  // Derived
  let activeItem = $derived(items.find(i => i.id === activeId));
  let overlayEl  = $state(null);

  onMount(() => {
    if (overlayEl) document.body.appendChild(overlayEl);
    return () => {
      overlayEl?.remove();
      document.body.style.overflow = '';
    };
  });

  function toggleHotspot(id) {
    activeId = activeId === id ? null : id;
  }

  function openFocus() {
    isFocusMode = true;
    document.body.style.overflow = 'hidden';
  }

  function closeFocus() {
    isFocusMode = false;
    activeId = null;
    isZoomed = false;
    document.body.style.overflow = '';
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && isFocusMode) closeFocus();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Preview (inline) -->
<div class="ii-wrap">
  <button class="ii-preview" onclick={openFocus} type="button">
    <img {src} {alt} class="ii-preview-img" />
    <div class="ii-preview-hover">
      <span class="ii-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Click to explore
      </span>
    </div>
  </button>
</div>

<!-- Focus Overlay (portaled to body) -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  bind:this={overlayEl}
  class="ii-overlay"
  class:ii-visible={isFocusMode}
  class:ii-dev-mode={isDev}
  onclick={(e) => e.target === e.currentTarget && closeFocus()}
>
  <div class="ii-modal">
    <!-- Top bar -->
    <div class="ii-topbar">
      <span class="ii-topbar-label">Interactive Diagram</span>
      <div class="ii-topbar-actions">
        <button
          class="ii-ctrl-btn"
          class:ii-ctrl-active={isZoomed}
          onclick={() => isZoomed = !isZoomed}
          type="button"
          aria-label="Toggle Zoom"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>{#if !isZoomed}<line x1="11" y1="8" x2="11" y2="14"/>{/if}</svg>
        </button>
        <button class="ii-ctrl-btn ii-ctrl-close" onclick={closeFocus} type="button" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="ii-body">
      <div class="ii-imgpane">
        <div 
          class="ii-imgframe" 
          class:ii-zoomed={isZoomed}
          onmousemove={(e) => {
            if (!isDev) return;
            const rect = e.currentTarget.getBoundingClientRect();
            debugX = Number(((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
            debugY = Number(((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
          }}
          onclick={(e) => {
            if (isDev && e.target.tagName === 'IMG') {
              console.log(`COORDS: "x": ${debugX}, "y": ${debugY}`);
            }
          }}
        >
          <img {src} {alt} class="ii-mainimg" draggable="false" />
          
          {#if isDev}
            <div class="ii-debug-coords">X: {debugX}% Y: {debugY}%</div>
          {/if}

          {#each items as item (item.id)}
            <button
              class="ii-hotspot"
              class:ii-active={activeId === item.id}
              style="left:{item.x}%; top:{item.y}%; width:{item.w}%; height:{item.h}%"
              onclick={() => toggleHotspot(item.id)}
              type="button"
              aria-label={item.label}
            ></button>
          {/each}
        </div>
      </div>

      <!-- Sidebar -->
      <div class="ii-sidebar">
        {#if activeItem}
          <div class="ii-card">
            <div class="ii-card-dot"></div>
            <h3 class="ii-card-title">{activeItem.label}</h3>
            <p class="ii-card-body">{activeItem.info}</p>
          </div>
        {:else}
          <div class="ii-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>
            <p class="ii-ph-title">Select a label</p>
            <p class="ii-ph-sub">Click any label on the diagram to view its description.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* ── Preview (Scoped) ────────────────── */
  .ii-wrap { margin: 2rem 0; }
  .ii-preview {
    position: relative; display: block; width: 100%; padding: 0;
    border: 2px solid rgba(128,128,128,.1); border-radius: 1rem;
    overflow: hidden; cursor: pointer; background: none;
    transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ii-preview:hover {
    border-color: oklch(0.58 0.19 255);
    box-shadow: 0 12px 40px rgba(0,0,0,.15);
    transform: translateY(-4px);
  }
  .ii-preview-img { display: block; width: 100%; height: auto; transition: transform .6s; }
  .ii-preview:hover .ii-preview-img { transform: scale(1.03); }
  .ii-preview-hover {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,.05); opacity: 0; transition: opacity .3s;
  }
  .ii-preview:hover .ii-preview-hover { opacity: 1; }
  .ii-cta {
    display: inline-flex; align-items: center; gap: .5rem;
    padding: .6rem 1.4rem; border-radius: 999px;
    font-size: .85rem; font-weight: 700;
    background: #fff; color: #111;
    box-shadow: 0 4px 15px rgba(0,0,0,.1);
  }
  :global(.dark) .ii-cta { background: #1a1a1e; color: #fff; }

  /* ── Overlay (Global - Portaled) ──────── */
  :global(.ii-overlay) {
    position: fixed; inset: 0; z-index: 99999;
    display: flex; flex-direction: column;
    background: rgba(0,0,0,.7);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    opacity: 0; pointer-events: none;
    transition: opacity .4s ease;
  }
  :global(.ii-overlay.ii-visible) { opacity: 1; pointer-events: auto; }

  :global(.ii-modal) {
    flex: 1; display: flex; flex-direction: column;
    max-width: 1400px; width: 96%;
    margin: 1rem auto; border-radius: 1.5rem;
    overflow: hidden; background: #fff;
    box-shadow: 0 30px 90px rgba(0,0,0,.5);
  }
  :global(.dark .ii-modal) { background: #0f0f12; border: 1px solid rgba(255,255,255,.05); }

  :global(.ii-topbar) {
    display: flex; align-items: center; justify-content: space-between;
    padding: .75rem 1.5rem; background: #fafafa;
    border-bottom: 1px solid rgba(0,0,0,.05); flex-shrink: 0;
  }
  :global(.dark .ii-topbar) { background: #151518; border-color: rgba(255,255,255,.05); }
  :global(.ii-topbar-label) { font-size: .7rem; font-weight: 800; text-transform: uppercase; letter-spacing: .15em; color: #888; }
  :global(.ii-topbar-actions) { display: flex; gap: .5rem; }

  :global(.ii-ctrl-btn) {
    width: 38px; height: 38px;
    border: 1px solid rgba(0,0,0,.08); border-radius: .75rem;
    background: #fff; color: #444;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .2s;
  }
  :global(.dark .ii-ctrl-btn) { background: #1c1c21; color: #ccc; border-color: rgba(255,255,255,.1); }
  :global(.ii-ctrl-btn:hover) { background: #f0f0f0; transform: translateY(-1px); }
  :global(.dark .ii-ctrl-btn:hover) { background: #2a2a30; }
  :global(.ii-ctrl-btn.ii-ctrl-active) { background: oklch(0.58 0.19 255); color: #fff; border-color: oklch(0.58 0.19 255); }
  :global(.ii-ctrl-close:hover) { background: #fee2e2; color: #ef4444; border-color: #fecaca; }

  /* ── Body split ──────────────────────── */
  :global(.ii-body) { flex: 1; display: flex; overflow: hidden; }
  @media (max-width: 900px) { :global(.ii-body) { flex-direction: column; } }

  :global(.ii-imgpane) { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; overflow: hidden; background: #f4f5f7; }
  :global(.dark .ii-imgpane) { background: #08080a; }

  :global(.ii-imgframe) { position: relative; display: inline-block; transition: transform .5s cubic-bezier(0.2, 1, 0.3, 1); transform-origin: center; }
  :global(.ii-imgframe.ii-zoomed) { transform: scale(1.8); cursor: zoom-out; }

  :global(.ii-mainimg) { display: block; max-width: 100%; height: auto; max-height: calc(88vh - 80px); border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.2); pointer-events: none; }

  /* ── Hotspots (Premium Bounding Box) ─── */
  :global(.ii-hotspot) {
    position: absolute; appearance: none; outline: none; padding: 0; margin: 0;
    border: 2px solid transparent; border-radius: 8px; background: transparent;
    cursor: pointer; transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Visible only in DEV mode */
  :global(.ii-dev-mode .ii-hotspot) {
    border-color: rgba(239, 68, 68, 0.25);
    background: rgba(239, 68, 68, 0.05);
  }

  :global(.ii-hotspot:hover) {
    background: rgba(59, 130, 246, 0.1) !important;
    border-color: rgba(59, 130, 246, 0.3) !important;
    transform: scale(1.03);
  }
  :global(.ii-hotspot.ii-active) {
    background: rgba(59, 130, 246, 0.12) !important;
    border-color: oklch(0.58 0.19 255) !important;
    box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.15), 0 10px 25px rgba(0,0,0,0.1);
    transform: scale(1.03);
  }

  /* ── Debug Tracker ───────────────────── */
  :global(.ii-debug-coords) {
    position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9); color: #00ff00; padding: 6px 14px;
    border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 11px; font-weight: 700; pointer-events: none; z-index: 1000;
    border: 1px solid rgba(0, 255, 0, 0.4); box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }

  /* ── Sidebar ─────────────────────────── */
  :global(.ii-sidebar) { width: 380px; flex-shrink: 0; display: flex; flex-direction: column; background: #fff; border-left: 1px solid rgba(0,0,0,.05); overflow-y: auto; }
  :global(.dark .ii-sidebar) { background: #121215; border-color: rgba(255,255,255,.05); }
  @media (max-width: 900px) { :global(.ii-sidebar) { width: 100%; height: 40%; border-left: none; border-top: 1px solid rgba(0,0,0,.05); } }

  /* ── Card ────────────────────────────── */
  :global(.ii-card) { margin: 1.5rem; padding: 1.75rem; border-radius: 1.25rem; background: #f9fafb; border: 1px solid rgba(0,0,0,.05); animation: ii-up .4s cubic-bezier(0.2, 1, 0.3, 1); position: relative; overflow: hidden; }
  :global(.dark .ii-card) { background: #1a1a20; border-color: rgba(255,255,255,.05); }
  :global(.ii-card-dot) { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: oklch(0.58 0.19 255); }
  :global(.ii-card-title) { margin: 0 0 .8rem; font-size: 1.35rem; font-weight: 900; color: oklch(0.58 0.19 255); letter-spacing: -.02em; }
  :global(.ii-card-body) { margin: 0; font-size: .95rem; line-height: 1.8; color: #444; }
  :global(.dark .ii-card-body) { color: #aaa; }
  @keyframes ii-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

  :global(.ii-placeholder) { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem; opacity: .4; }
  :global(.ii-ph-title) { margin: 1rem 0 .4rem; font-size: 1.1rem; font-weight: 800; color: #111; }
  :global(.dark .ii-ph-title) { color: #fff; }
  :global(.ii-ph-sub) { margin: 0; font-size: .85rem; max-width: 240px; line-height: 1.6; }
</style>
