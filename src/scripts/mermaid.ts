/**
 * Mermaid rendering + pan/zoom.
 *
 * A single, robust pipeline that replaces the previous split setup (an unused
 * CDN instance in Layout.astro plus an auto-`mermaid.run()` in Markdown.astro):
 *
 *  - Renders each diagram in isolation with try/catch, so one malformed
 *    diagram can never stop the others from rendering.
 *  - Each diagram is measured and its SVG is scaled to *fit* its card on load
 *    (no more tiny, zoomed-out diagrams floating in empty space); the card's
 *    height adapts to the diagram's aspect ratio.
 *  - Wheel/pinch zoom toward the cursor, bounded drag-pan, a themed toolbar,
 *    and a fullscreen lightbox — the SVG behaves like a zoomable image.
 *  - Renders in an LTR-forced context so diagrams stay correct on RTL
 *    (Arabic) pages.
 *  - Re-renders after swup page transitions and on theme changes.
 */

import mermaid from "mermaid";

const PAD = 28; // breathing room (px) between diagram and card edge
const MIN_CARD_H = 220;
const MAX_ZOOM = 8;

let booted = false;
let uid = 0;

function currentTheme(): "dark" | "default" {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "default";
}

function configure() {
  mermaid.initialize({
    startOnLoad: false,
    theme: currentTheme(),
    securityLevel: "loose",
    fontFamily:
      "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    // We size diagrams ourselves via transforms, so let mermaid emit each SVG
    // at its natural dimensions rather than shrinking it to the container.
    flowchart: { htmlLabels: true, useMaxWidth: false },
    sequence: { useMaxWidth: false },
    mindmap: { useMaxWidth: false },
    gantt: { useMaxWidth: false },
  });
}

const svgIcon = (paths: string, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  zoomIn: svgIcon(
    `<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>`,
  ),
  zoomOut: svgIcon(
    `<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>`,
  ),
  fit: svgIcon(
    `<path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 9V5a1 1 0 0 0-1-1h-4"/><path d="M4 15v4a1 1 0 0 0 1 1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/>`,
  ),
  expand: svgIcon(
    `<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>`,
  ),
  close: svgIcon(
    `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
    20,
  ),
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const escapeHtml = (s: string) =>
  s.replace(
    /[<>&]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string,
  );

/**
 * Force an SVG to expose its natural pixel size (from its viewBox) and stop it
 * from auto-shrinking, so our transform math has a stable content box.
 * Returns the natural width/height.
 */
function normalizeSvg(svg: SVGSVGElement): { w: number; h: number } {
  let w = svg.viewBox?.baseVal?.width || 0;
  let h = svg.viewBox?.baseVal?.height || 0;
  if (!w || !h) {
    try {
      const bb = svg.getBBox();
      w = w || bb.width;
      h = h || bb.height;
    } catch {
      /* not laid out yet */
    }
  }
  w = w || 600;
  h = h || 400;
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.style.maxWidth = "none";
  svg.style.width = `${w}px`;
  svg.style.height = `${h}px`;
  svg.style.display = "block";
  return { w, h };
}

interface Viewport {
  fit: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  destroy: () => void;
  isHome: () => boolean;
}

/**
 * Pan/zoom controller for one `content` element inside a `stage`. `natW/natH`
 * are the content's intrinsic size. The transform origin is the stage centre;
 * the content is flex-centred at rest, so translate(0,0) means "centred".
 */
function createViewport(
  stage: HTMLElement,
  content: HTMLElement,
  natW: number,
  natH: number,
): Viewport {
  const state = { scale: 1, x: 0, y: 0 };
  let base = 1; // the "fit" scale, also the home/reset scale
  const pointers = new Map<number, { x: number; y: number }>();
  let pinchDist = 0;
  let panning = false;
  let panStart = { x: 0, y: 0, ox: 0, oy: 0 };

  const stageBox = () => stage.getBoundingClientRect();

  const computeBase = () => {
    const r = stageBox();
    const s = Math.min((r.width - PAD) / natW, (r.height - PAD) / natH);
    return clamp(s, 0.05, MAX_ZOOM);
  };

  const minScale = () => base * 0.6;
  const maxScale = () => Math.min(base * 6, MAX_ZOOM);

  const clampPan = () => {
    const r = stageBox();
    const dw = natW * state.scale;
    const dh = natH * state.scale;
    // Allow panning only as far as the overflow (plus a small margin) so the
    // diagram can never be flung out of view.
    const mx = Math.max(0, (dw - r.width) / 2) + 24;
    const my = Math.max(0, (dh - r.height) / 2) + 24;
    state.x = clamp(state.x, -mx, mx);
    state.y = clamp(state.y, -my, my);
  };

  const isHome = () =>
    Math.abs(state.scale - base) < 0.01 &&
    Math.abs(state.x) < 0.5 &&
    Math.abs(state.y) < 0.5;

  const apply = () => {
    clampPan();
    content.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
    stage.classList.toggle("is-zoomed", !isHome());
  };

  const fit = () => {
    base = computeBase();
    state.scale = base;
    state.x = 0;
    state.y = 0;
    apply();
  };

  // Zoom by `factor`, keeping the point (clientX, clientY) stationary.
  const zoomAt = (factor: number, clientX: number, clientY: number) => {
    const r = stageBox();
    const ox = clientX - r.left - r.width / 2;
    const oy = clientY - r.top - r.height / 2;
    const next = clamp(state.scale * factor, minScale(), maxScale());
    const ratio = next / state.scale;
    state.x = ox - (ox - state.x) * ratio;
    state.y = oy - (oy - state.y) * ratio;
    state.scale = next;
    apply();
  };

  const centre = () => {
    const r = stageBox();
    return [r.left + r.width / 2, r.top + r.height / 2] as const;
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX, e.clientY);
  };

  const onPointerDown = (e: PointerEvent) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stage.setPointerCapture(e.pointerId);
    if (pointers.size === 1) {
      panning = true;
      panStart = { x: e.clientX, y: e.clientY, ox: state.x, oy: state.y };
      stage.classList.add("is-grabbing");
    } else if (pointers.size === 2) {
      panning = false;
      const pts = [...pointers.values()];
      pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size >= 2) {
      const pts = [...pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchDist > 0) {
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        zoomAt(dist / pinchDist, midX, midY);
      }
      pinchDist = dist;
      return;
    }

    if (panning) {
      state.x = panStart.ox + (e.clientX - panStart.x);
      state.y = panStart.oy + (e.clientY - panStart.y);
      apply();
    }
  };

  const endPointer = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (pointers.size < 2) pinchDist = 0;
    if (pointers.size === 0) {
      panning = false;
      stage.classList.remove("is-grabbing");
    }
  };

  const onDblClick = (e: MouseEvent) => {
    if (isHome()) zoomAt(2, e.clientX, e.clientY);
    else fit();
  };

  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);
  stage.addEventListener("dblclick", onDblClick);

  fit();

  const stepZoom = (factor: number) => () => {
    const [cx, cy] = centre();
    zoomAt(factor, cx, cy);
  };

  return {
    fit,
    zoomIn: stepZoom(1.4),
    zoomOut: stepZoom(1 / 1.4),
    isHome,
    destroy() {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endPointer);
      stage.removeEventListener("pointercancel", endPointer);
      stage.removeEventListener("dblclick", onDblClick);
    },
  };
}

function toolbarHtml(withFullscreen: boolean) {
  return `
    <div class="mermaid-zoom-toolbar" role="toolbar" aria-label="Diagram controls">
      <button type="button" data-act="out" title="Zoom out" aria-label="Zoom out">${ICONS.zoomOut}</button>
      <button type="button" data-act="fit" title="Fit to view" aria-label="Fit to view">${ICONS.fit}</button>
      <button type="button" data-act="in" title="Zoom in" aria-label="Zoom in">${ICONS.zoomIn}</button>
      ${
        withFullscreen
          ? `<span class="mermaid-toolbar-sep" aria-hidden="true"></span>
             <button type="button" data-act="full" title="Fullscreen" aria-label="Open fullscreen">${ICONS.expand}</button>`
          : ""
      }
    </div>`;
}

function wireToolbar(root: ParentNode, vp: Viewport, onFull?: () => void) {
  root.querySelector('[data-act="in"]')?.addEventListener("click", vp.zoomIn);
  root.querySelector('[data-act="out"]')?.addEventListener("click", vp.zoomOut);
  root.querySelector('[data-act="fit"]')?.addEventListener("click", vp.fit);
  if (onFull)
    root.querySelector('[data-act="full"]')?.addEventListener("click", onFull);
}

/* ------------------------------ lightbox ------------------------------ */

let lightbox: HTMLElement | null = null;
let lightboxVp: Viewport | null = null;

function buildLightbox(): HTMLElement {
  const el = document.createElement("div");
  el.className = "mermaid-lightbox";
  el.innerHTML = `
    <button type="button" class="mermaid-lightbox-close" title="Close" aria-label="Close">${ICONS.close}</button>
    <div class="mermaid-lightbox-stage"><div class="mermaid-lightbox-content"></div></div>`;
  document.body.appendChild(el);

  el.querySelector(".mermaid-lightbox-close")!.addEventListener(
    "click",
    closeLightbox,
  );
  el.addEventListener("pointerdown", (e) => {
    if (e.target === el) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
  return el;
}

function openLightbox(svgMarkup: string) {
  if (!lightbox) lightbox = buildLightbox();
  const stage = lightbox.querySelector(
    ".mermaid-lightbox-stage",
  ) as HTMLElement;
  const content = lightbox.querySelector(
    ".mermaid-lightbox-content",
  ) as HTMLElement;

  lightboxVp?.destroy();
  content.innerHTML = svgMarkup;
  lightbox.querySelector(".mermaid-lightbox-toolbar")?.remove();

  document.body.classList.add("mermaid-lightbox-open");
  lightbox.classList.add("open");

  // measure after it is visible so the fit scale is correct
  requestAnimationFrame(() => {
    const svg = content.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;
    const { w, h } = normalizeSvg(svg);
    lightboxVp = createViewport(stage, content, w, h);
    lightbox!.insertAdjacentHTML("beforeend", toolbarHtml(false));
    const tb = lightbox!.querySelector(".mermaid-zoom-toolbar")!;
    tb.classList.add("mermaid-lightbox-toolbar");
    wireToolbar(tb, lightboxVp);
  });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.classList.remove("mermaid-lightbox-open");
}

/* ------------------------------ rendering ------------------------------ */

async function renderOne(host: HTMLElement) {
  if (host.hasAttribute("data-rendered")) return;
  host.setAttribute("data-rendered", "");

  const code = (
    host.querySelector<HTMLElement>(".mermaid-src")?.textContent ?? ""
  ).trim();
  if (!code) return;
  host.dataset.src = code; // keep source for re-theming

  try {
    const { svg } = await mermaid.render(`mermaid-svg-${uid++}`, code);

    host.innerHTML = `
      <div class="mermaid-zoom">
        <div class="mermaid-stage"><div class="mermaid-canvas">${svg}</div></div>
        ${toolbarHtml(true)}
      </div>`;

    const stage = host.querySelector(".mermaid-stage") as HTMLElement;
    const canvas = host.querySelector(".mermaid-canvas") as HTMLElement;
    const svgEl = canvas.querySelector("svg") as SVGSVGElement;
    const { w, h } = normalizeSvg(svgEl);

    // Adapt the card height to the diagram's aspect ratio (bounded), so wide
    // diagrams get short cards and tall ones get tall cards — no dead space.
    const availW = stage.clientWidth - PAD * 2;
    const maxCardH = Math.min(560, Math.round(window.innerHeight * 0.7));
    const idealH = Math.round(h * (availW / w)) + PAD * 2;
    stage.style.height = `${clamp(idealH, MIN_CARD_H, maxCardH)}px`;

    const vp = createViewport(stage, canvas, w, h);
    wireToolbar(host, vp, () => openLightbox(svg));

    // Re-fit on container resize while the user hasn't manually zoomed.
    if ("ResizeObserver" in window) {
      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (vp.isHome()) vp.fit();
        });
      });
      ro.observe(stage);
    }
  } catch (err) {
    host.setAttribute("data-error", "");
    host.innerHTML = `
      <div class="mermaid-error">
        <span class="mermaid-error-title">Diagram failed to render</span>
        <pre>${escapeHtml(code)}</pre>
      </div>`;
    console.error("[mermaid] render failed:", err);
  }
}

export async function renderMermaid() {
  const hosts = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".mermaid-diagram:not([data-rendered])",
    ),
  );
  if (hosts.length === 0) return;
  configure();
  // Sequential: mermaid.render shares a global parser instance.
  for (const host of hosts) {
    await renderOne(host);
  }
}

/** Re-render every diagram from its stashed source (used on theme flip). */
async function rerenderForTheme() {
  const hosts = document.querySelectorAll<HTMLElement>(
    ".mermaid-diagram[data-rendered][data-src]",
  );
  if (hosts.length === 0) return;
  hosts.forEach((h) => {
    h.removeAttribute("data-rendered");
    h.removeAttribute("data-error");
    h.innerHTML = `<pre class="mermaid-src" hidden>${escapeHtml(
      h.dataset.src ?? "",
    )}</pre>`;
  });
  await renderMermaid();
}

export function initMermaid() {
  if (!booted) {
    booted = true;

    const onView = () => renderMermaid();
    if (window.swup) {
      window.swup.hooks.on("page:view", onView);
    } else {
      document.addEventListener("swup:enable", () => {
        window.swup?.hooks.on("page:view", onView);
      });
    }

    let themeSnapshot = currentTheme();
    new MutationObserver(() => {
      const next = currentTheme();
      if (next !== themeSnapshot) {
        themeSnapshot = next;
        rerenderForTheme();
      }
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  renderMermaid();
}
