import { h } from "hastscript";
import fs from "node:fs";
import path from "node:path";

/**
 * Consolidated Interactive Component
 * Handles both local hotspot diagrams (via JSON data) and external embeds (like shutterstock).
 */
export function InteractiveComponent(properties, children) {
  const id = properties.id || `ID${Math.random().toString(36).slice(-6)}`;
  const src = properties.src || "";
  const componentId = `interactive-${id}`;

  // 1. If data is provided, it's a local hotspot diagram
  if (properties.data) {
    let items = [];
    try {
      const dataPath = path.resolve(process.cwd(), properties.data);
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, "utf8");
        items = JSON.parse(fileContent);
      } else {
        return h("div.error", `Data file not found: ${properties.data}`);
      }
    } catch (e) {
      return h("div.error", `Error parsing data file: ${e.message}`);
    }

    return h("div.interactive-diagram-wrapper", [
      h(`div#${componentId}`, {
        class: "interactive-diagram my-8 flex flex-col md:flex-row gap-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800",
      }, [
        // Image Section
        h("div", { class: "diagram-image-container relative flex-1 aspect-square rounded-xl overflow-hidden bg-white" }, [
          h("img", { 
            src: src, 
            alt: properties.alt || "Interactive Diagram", 
            class: "w-100 h-100 object-contain" 
          }),
          ...items.map(item => h("button", {
            class: "hotspot-btn absolute border-2 border-transparent hover:border-primary/50 hover:bg-primary/5 transition-all rounded-lg cursor-pointer",
            style: `left: ${item.x}%; top: ${item.y}%; width: ${item.w}%; height: ${item.h}%;`,
            "data-target": item.id,
            "aria-label": `Select ${item.label}`
          }))
        ]),
        // Sidebar Section
        h("div", { class: "diagram-sidebar flex-1 flex flex-col gap-3" }, [
          ...items.map(item => h("div", { 
            class: "accordion-item border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all bg-white dark:bg-gray-800",
            "data-id": item.id
          }, [
            h("button", { 
              class: "accordion-header w-full flex items-center justify-between p-4 text-left font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors",
              "data-trigger": item.id
            }, [
              h("span", item.label),
              h("svg", { class: "chevron w-5 h-5 transform transition-transform text-gray-400", viewBox: "0 0 20 20", fill: "currentColor" }, [
                h("path", { fill_rule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clip_rule: "evenodd" })
              ])
            ]),
            h("div", { class: "accordion-content hidden px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed" }, [
              h("p", item.info)
            ])
          ]))
        ]),
        // Interaction Script
        h("script", { type: "text/javascript" }, `
          (function() {
            const container = document.getElementById('${componentId}');
            if (!container) return;
            const items = container.querySelectorAll('.accordion-item');
            const buttons = container.querySelectorAll('.hotspot-btn');
            function setActive(id) {
              items.forEach(item => {
                const content = item.querySelector('.accordion-content');
                const chevron = item.querySelector('.chevron');
                if (item.dataset.id === id) {
                  item.classList.add('ring-2', 'ring-primary', 'border-primary');
                  content.classList.remove('hidden');
                  chevron.classList.add('rotate-180');
                } else {
                  item.classList.remove('ring-2', 'ring-primary', 'border-primary');
                  content.classList.add('hidden');
                  chevron.classList.remove('rotate-180');
                }
              });
              buttons.forEach(btn => {
                if (btn.dataset.target === id) {
                  btn.classList.add('border-primary', 'bg-primary/10');
                } else {
                  btn.classList.remove('border-primary', 'bg-primary/10');
                }
              });
            }
            container.addEventListener('click', e => {
              const trigger = e.target.closest('[data-trigger]');
              const hotspot = e.target.closest('[data-target]');
              if (trigger) setActive(trigger.dataset.trigger);
              else if (hotspot) setActive(hotspot.dataset.target);
            });
            setActive(items[0]?.dataset.id || '');
          })();
        `)
      ])
    ]);
  }

  // 2. If no data, but src is provided, it's an external embed (like shutterstock)
  if (src) {
    const componentUuid = `SS${Math.random().toString(36).slice(-6)}`;
    return h("div", { class: "shutterstock-interactive-wrapper" }, [
      h(`div#${componentUuid}-container`, {
        class: "shutterstock-interactive-container my-6 relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800",
        style: "width: 100%; min-height: 400px; display: flex; align-items: center; justify-content: center;",
        "data-shutterstock-id": id,
      }, [
        h("iframe", {
          src: src,
          width: "100%",
          height: "400",
          frameborder: "0",
          allow: "xr-spatial-tracking; vr; ar; fullscreen",
          "data-id": id,
        })
      ]),
      h("script", { type: "text/javascript" }, `
        console.log("[INTERACTIVE] Embed ${id} initialized.");
        window.addEventListener('message', function(event) {
          const data = event.data;
          if (data && (data.id === "${id}" || data.type === 'shutterstock-interaction')) {
            console.log("[INTERACTIVE] Interaction received for ${id}:", data);
          }
        });
      `)
    ]);
  }

  return h("div.error", "Invalid interactive directive. Must provide 'data' for local diagram or 'src' for embed.");
}
