export function normalizeSlug(slug: string): string {
	return slug
		.toLowerCase()
		.replace(/[\/\-]/g, "_")
		.replace(/_index$/, "");
}
