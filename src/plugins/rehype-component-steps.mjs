/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a steps container component.
 */
export function StepsComponent(properties, children) {
	return h("div", { class: "steps-timeline" }, children);
}

/**
 * Creates an individual step component.
 */
export function StepComponent(properties, children) {
	let titleNode = null;
	if (properties?.["has-directive-label"]) {
		titleNode = children[0]; // The first child is the label (title)
		children = children.slice(1);
		titleNode.tagName = "span";
		titleNode.properties = { class: "steps-title" };
	} else {
		titleNode = h("span", { class: "steps-title" }, properties.title || "Step");
	}

	const subtitleNode = properties.subtitle
		? h("span", { class: "steps-subtitle" }, properties.subtitle)
		: null;

	const markerInner = h("div", { class: "steps-marker-inner" });
	const marker = h("div", { class: "steps-marker" }, [markerInner]);

	const titleGroup = h("div", { class: "steps-title-group" }, [
		titleNode,
		subtitleNode,
	].filter(Boolean));

	// Chevron SVG icon
	const chevron = h("div", { class: "steps-chevron" }, [
		h("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}, [
			h("polyline", { points: "6 9 12 15 18 9" })
		])
	]);

	const header = h("div", {
		class: "steps-header"
	}, [
		titleGroup,
		chevron
	]);

	const body = h("div", { class: "steps-body" }, children);

	const bodyWrapper = h("div", { class: "steps-body-wrapper" }, [
		h("div", { class: "steps-body-inner" }, [body])
	]);

	const isOpen = properties.open !== undefined && properties.open !== "false";
	const itemClass = isOpen ? "steps-item open" : "steps-item";

	return h("div", { class: itemClass }, [
		marker,
		header,
		bodyWrapper
	]);
}
