/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Steps — a vertical, collapsible "timeline" for `.md` content.
 *
 * Authored with markdown directives:
 *
 *   :::steps
 *   :::step[Title]{subtitle="Optional" open}
 *   body markdown…
 *   :::
 *   :::
 *
 * These map to the components below via `rehype-components` (see astro.config).
 * Because Astro cannot mount a real `.astro`/`.svelte` component inside a `.md`
 * content-collection file, a rehype component is the idiomatic reusable unit
 * here — the same pattern the admonitions and GitHub cards use.
 *
 * Each step renders as a native <details>/<summary>, so the accordion is
 * fully keyboard-accessible and needs ZERO client JavaScript (it survives
 * swup/view-transitions for free). All open/close visuals are driven by the
 * `[open]` attribute in CSS; the reveal animation is a pure CSS keyframe.
 */

/** Container: the timeline wrapper. */
export function StepsComponent(properties, children) {
	return h("div", { class: "steps-timeline" }, children);
}

/** A single collapsible step. */
export function StepComponent(properties, children) {
	// Title: either the directive label (`:::step[Title]`) or a `title=` prop.
	let titleNode = null;
	if (properties?.["has-directive-label"]) {
		titleNode = children[0];
		children = children.slice(1);
		titleNode.tagName = "span";
		titleNode.properties = { class: "steps-title" };
	} else {
		titleNode = h("span", { class: "steps-title" }, properties.title || "Step");
	}

	const subtitleNode = properties.subtitle
		? h("span", { class: "steps-subtitle" }, properties.subtitle)
		: null;

	const marker = h("div", { class: "steps-marker" }, [
		h("div", { class: "steps-marker-inner" }),
	]);

	const titleGroup = h(
		"div",
		{ class: "steps-title-group" },
		[titleNode, subtitleNode].filter(Boolean),
	);

	const chevron = h("div", { class: "steps-chevron" }, [
		h(
			"svg",
			{
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true",
			},
			[h("polyline", { points: "6 9 12 15 18 9" })],
		),
	]);

	// <summary> is the clickable/focusable header (native accessibility).
	const summary = h("summary", { class: "steps-header" }, [
		marker,
		titleGroup,
		chevron,
	]);

	const body = h("div", { class: "steps-body" }, children);

	const isOpen = properties.open !== undefined && properties.open !== "false";

	return h(
		"details",
		{ class: "steps-item", ...(isOpen ? { open: true } : {}) },
		[summary, body],
	);
}
