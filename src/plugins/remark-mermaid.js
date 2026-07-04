import { visit } from "unist-util-visit";

/**
 * Escape only the characters that would corrupt the raw HTML we emit.
 * Mermaid reads the element's textContent, so the browser decodes these back
 * to their literal form before the diagram is parsed. Without this, labels
 * containing `<`, `>` or `&` (e.g. `code_challenge=...&scope=openid`, HTML
 * tags in sequence-diagram notes) silently break the diagram source and the
 * whole diagram — sometimes every diagram after it — fails to render.
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang !== "mermaid") return;

      // The source is stashed, verbatim (whitespace preserved for
      // indentation-sensitive diagrams like mindmap/timeline), inside a hidden
      // <pre>. The client renderer reads it, renders once, and wraps the SVG in
      // a pan/zoom shell. We do NOT let mermaid auto-discover `.mermaid` here so
      // we keep full control over error isolation and zoom.
      node.type = "html";
      node.value = `<div class="mermaid-diagram" data-mermaid><pre class="mermaid-src" hidden>${escapeHtml(
        node.value,
      )}</pre></div>`;
    });
  };
}
