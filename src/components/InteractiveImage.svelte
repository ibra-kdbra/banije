<script>
  /**
   * InteractiveImage — Refined Version
   * Focus: Clean UI, Smaller Sidebar, Improved Theme Contrast.
   */
  import { onMount, tick } from 'svelte';

  let { src, items = [], alt = 'Interactive Diagram', overview = "" } = $props();

  // Robust Overview Logic
  const finalOverview = $derived(overview && overview !== "null" && overview !== "undefined" 
    ? overview 
    : "Explore the components of this diagram. Click any label or use the sidebar list to see detailed descriptions.");

  const isDev = import.meta.env.DEV;

  // State
  let isFocusMode = $state(false);
  let isZoomed   = $state(false);
  let activeId   = $state(null);
  let debugX     = $state(0);
  let debugY     = $state(0);
  let sidebarRefs = {};

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

  async function toggleHotspot(id) {
    if (activeId === id) {
      activeId = null;
    } else {
      activeId = id;
      await tick();
      if (sidebarRefs[id]) {
        sidebarRefs[id].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
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

<!-- ── Preview UI (Minimalist) ── -->
<div class="ii-wrap">
  <button class="ii-preview" onclick={openFocus} type="button">
    <img {src} {alt} class="ii-preview-img" />
    <div class="ii-preview-overlay">
      <div class="ii-preview-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        <span class="ii-preview-text">Expand Diagram</span>
      </div>
    </div>
  </button>
</div>

<!-- ── Fullscreen Overlay ── -->
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
    <!-- Top Bar -->
    <div class="ii-topbar">
      <div class="ii-topbar-left">
        <button class="ii-topbar-back" onclick={closeFocus} title="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <span class="ii-topbar-label">Interactive View</span>
      </div>
      <div class="ii-topbar-actions">
        <button
          class="ii-ctrl-btn"
          class:ii-ctrl-active={isZoomed}
          onclick={() => isZoomed = !isZoomed}
          aria-label="Toggle Zoom"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>{#if !isZoomed}<line x1="11" y1="8" x2="11" y2="14"/>{/if}</svg>
        </button>
        <button class="ii-ctrl-btn ii-close-btn" onclick={closeFocus} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <div class="ii-layout">
      <!-- Image Pane -->
      <div class="ii-pane-image">
        <div 
          class="ii-canvas"
          class:ii-zoomed={isZoomed}
          onmousemove={(e) => {
            if (!isDev) return;
            const rect = e.currentTarget.getBoundingClientRect();
            debugX = Number(((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
            debugY = Number(((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
          }}
        >
          <img {src} {alt} class="ii-main-img" draggable="false" />
          
          {#if isDev}
            <div class="ii-debug-badge">X: {debugX}% Y: {debugY}%</div>
          {/if}

          {#each items as item (item.id)}
            <button
              class="ii-hotspot"
              class:ii-active={activeId === item.id}
              style="left:{item.x}%; top:{item.y}%; width:{item.w}%; height:{item.h}%"
              onclick={() => toggleHotspot(item.id)}
              aria-label={item.label}
            ></button>
          {/each}
        </div>
      </div>

      <!-- Compact Sidebar -->
      <div class="ii-pane-sidebar">
        <div class="ii-sidebar-inner">
          <div class="ii-header">
            <h2 class="ii-title">Diagram Details</h2>
            <p class="ii-description">{finalOverview}</p>
          </div>

          <div class="ii-list">
            {#each items as item (item.id)}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                bind:this={sidebarRefs[item.id]}
                class="ii-item"
                class:ii-item-active={activeId === item.id}
                onclick={() => toggleHotspot(item.id)}
              >
                <div class="ii-item-trigger">
                  <span class="ii-item-idx">{items.indexOf(item) + 1}</span>
                  <span class="ii-item-label">{item.label}</span>
                  <svg class="ii-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
                </div>
                {#if activeId === item.id}
                  <div class="ii-item-body">
                    <p>{item.info}</p>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* ── PREVIEW ── */
  .ii-wrap { margin: 2rem 0; border-radius: 1rem; overflow: hidden; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
  :global(.dark .ii-wrap) { box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
  .ii-preview {
    position: relative; width: 100%; border: none; padding: 0; background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .ii-preview-img { display: block; width: 100%; height: auto; transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1); }
  .ii-preview:hover .ii-preview-img { transform: scale(1.02); }

  .ii-preview-overlay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.4s; pointer-events: none;
  }
  .ii-preview:hover .ii-preview-overlay { opacity: 1; }
  
  .ii-preview-icon { 
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.7rem 1.25rem; border-radius: 100px;
    background: rgba(15, 15, 20, 0.75); border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px); color: #fff; font-weight: 700; font-size: 0.8rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1);
    transform: translateY(10px); transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
  }
  .ii-preview:hover .ii-preview-icon { transform: translateY(0); background: rgba(15, 15, 20, 0.9); border-color: oklch(0.58 0.19 255 / 0.4); }
  .ii-preview-text { text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.7rem; }

  /* ── OVERLAY ── */
  :global(.ii-overlay) {
    position: fixed; inset: 0; z-index: 99999; display: flex;
    background: rgba(0,0,0,0.8); backdrop-filter: blur(12px);
    opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
  }
  :global(.ii-overlay.ii-visible) { opacity: 1; pointer-events: auto; }

  :global(.ii-modal) {
    flex: 1; display: flex; flex-direction: column;
    max-width: 1400px; width: 96%; margin: auto; height: 92vh;
    background: #fff; border-radius: 1.5rem; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  }
  :global(.dark .ii-modal) { background: #0f0f12; border: 1px solid rgba(255,255,255,0.05); }

  :global(.ii-topbar) {
    padding: 0.75rem 1.25rem; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.05); background: #fff;
  }
  :global(.dark .ii-topbar) { background: #16161a; border-color: rgba(255,255,255,0.05); }
  :global(.ii-topbar-left) { display: flex; align-items: center; gap: 0.75rem; }
  :global(.ii-topbar-back) { background: none; border: none; padding: 0.5rem; cursor: pointer; border-radius: 8px; color: inherit; }
  :global(.ii-topbar-back:hover) { background: rgba(0,0,0,0.05); }
  :global(.dark .ii-topbar-back:hover) { background: rgba(255,255,255,0.05); }
  :global(.ii-topbar-label) { font-weight: 800; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888; }

  /* Clean Actions (No hover backgrounds) */
  :global(.ii-topbar-actions) { display: flex; border: 1px solid rgba(0,0,0,0.05); border-radius: 10px; overflow: hidden; }
  :global(.dark .ii-topbar-actions) { border-color: rgba(255,255,255,0.1); }
  :global(.ii-ctrl-btn) {
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: #fff; border: none; cursor: pointer; transition: all 0.2s; color: #666;
  }
  :global(.dark .ii-ctrl-btn) { background: #1a1a1e; color: #aaa; }
  :global(.ii-ctrl-btn:not(:last-child)) { border-right: 1px solid rgba(0,0,0,0.05); }
  :global(.dark .ii-ctrl-btn:not(:last-child)) { border-color: rgba(255,255,255,0.1); }
  :global(.ii-ctrl-active) { color: oklch(0.58 0.19 255) !important; background: rgba(59,130,246,0.05) !important; }
  :global(.ii-close-btn:hover) { color: #ef4444 !important; }

  /* ── LAYOUT ── */
  :global(.ii-layout) { flex: 1; display: flex; overflow: hidden; }
  @media (max-width: 900px) { :global(.ii-layout) { flex-direction: column; } }

  :global(.ii-pane-image) { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; background: #f8fafc; overflow: hidden; }
  :global(.dark .ii-pane-image) { background: #08080a; }

  :global(.ii-canvas) { position: relative; transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1); transform-origin: center; }
  :global(.ii-zoomed) { transform: scale(1.8); cursor: zoom-out; }
  :global(.ii-main-img) { max-width: 100%; max-height: 78vh; border-radius: 1rem; box-shadow: 0 15px 50px rgba(0,0,0,0.2); }

  /* ── HOTSPOTS ── */
  :global(.ii-hotspot) {
    position: absolute; appearance: none; outline: none; border: 1.5px solid transparent; border-radius: 6px;
    background: transparent; cursor: pointer; transition: all 0.2s;
  }
  :global(.ii-dev-mode .ii-hotspot) { border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.04); }
  :global(.ii-hotspot:hover) { border-color: rgba(59,130,246,0.3) !important; background: rgba(59,130,246,0.08) !important; }
  :global(.ii-hotspot.ii-active) {
    border-color: oklch(0.58 0.19 255) !important; background: rgba(59,130,246,0.12) !important;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.15); z-index: 10;
  }

  /* ── SIDEBAR (Compact) ── */
  :global(.ii-pane-sidebar) { width: 320px; flex-shrink: 0; background: #fff; border-left: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; }
  :global(.dark .ii-pane-sidebar) { background: #121215; border-color: rgba(255,255,255,0.05); }
  @media (max-width: 900px) { :global(.ii-pane-sidebar) { width: 100%; height: 42%; border-left: none; border-top: 1px solid rgba(0,0,0,0.05); } }

  :global(.ii-sidebar-inner) { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
  :global(.ii-header) { padding: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.03); }
  :global(.ii-title) { margin: 0 0 0.5rem; font-size: 1.25rem; font-weight: 900; color: #111; }
  :global(.dark .ii-title) { color: #fff; }
  :global(.ii-description) { margin: 0; font-size: 0.85rem; line-height: 1.6; color: #64748b; }
  :global(.dark .ii-description) { color: #94a3b8; }

  :global(.ii-list) { padding: 0.75rem; }
  :global(.ii-item) {
    margin-bottom: 0.25rem; border-radius: 12px; cursor: pointer; transition: all 0.2s;
  }
  :global(.ii-item:hover) { background: #f8fafc; }
  :global(.dark .ii-item:hover) { background: #1a1a20; }

  :global(.ii-item-trigger) { padding: 1rem; display: flex; align-items: center; gap: 0.75rem; }
  :global(.ii-item-idx) { font-size: 0.7rem; font-weight: 800; color: #94a3b8; width: 18px; }
  :global(.ii-item-label) { flex: 1; font-weight: 700; font-size: 0.95rem; color: #334155; }
  :global(.dark .ii-item-label) { color: #e2e8f0; }
  :global(.ii-chevron) { color: #cbd5e1; transition: transform 0.2s; }

  :global(.ii-item-body) { padding: 0 1rem 1rem 2.6rem; font-size: 0.85rem; line-height: 1.6; color: #475569; animation: ii-slide .3s ease; }
  :global(.dark .ii-item-body) { color: #94a3b8; }

  :global(.ii-item-active) { background: rgba(59,130,246,0.05) !important; }
  :global(.dark .ii-item-active) { background: rgba(59,130,246,0.08) !important; }
  :global(.ii-item-active .ii-item-label) { color: oklch(0.58 0.19 255); }
  :global(.ii-item-active .ii-chevron) { transform: rotate(180deg); color: oklch(0.58 0.19 255); }

  @keyframes ii-slide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
  :global(.ii-debug-badge) { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); background: #000; color: #0f0; padding: 4px 10px; border-radius: 5px; font-family: monospace; font-size: 10px; font-weight: 700; z-index: 100; }
</style>
