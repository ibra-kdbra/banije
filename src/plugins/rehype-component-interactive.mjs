import { h } from "hastscript";
import fs from "node:fs";
import path from "node:path";

/**
 * Interactive Component Plugin (Svelte 5 Bridge)
 * 
 * This plugin replaces the ::interactive directive with a mount point
 * and a bootstrapper script that hydrates the InteractiveImage.svelte component.
 */
export function InteractiveComponent(properties, children) {
  const id = properties.id || `ID${Math.random().toString(36).slice(-6)}`;
  const src = properties.src || "";
  const componentId = `interactive-${id}`;

  if (properties.data) {
    let items = [];
    try {
      const dataPath = path.resolve(process.cwd(), properties.data);
      if (fs.existsSync(dataPath)) {
        items = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      }
    } catch (e) {
      console.error(`[InteractiveComponent] Error loading data: ${e.message}`);
    }

    return h("div.interactive-container.my-8", [
      // The mount point for Svelte
      h(`div#${componentId}`, { 
        class: "interactive-mount-point",
        "data-src": src,
        "data-items": JSON.stringify(items),
        "data-alt": properties.alt || "Interactive Diagram"
      })
    ]);
  }

  // Fallback for external embeds (Shutterstock, etc.)
  if (src && src.includes('shutterstock')) {
    return h("div.shutterstock-embed.my-6", [
      h("iframe", {
        src: src,
        width: "100%",
        height: "500",
        frameborder: "0",
        allow: "fullscreen",
        class: "rounded-xl shadow-lg border border-gray-200"
      })
    ]);
  }

  return h("div.error", "Interactive component requires 'data' or a valid 'src'.");
}
