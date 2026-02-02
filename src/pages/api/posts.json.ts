import { getSortedPosts } from "@features/content";
import { url } from "@domain/url";

export async function GET() {
	const posts = await getSortedPosts();

	const postsData = posts.map((post) => ({
		slug: post.slug,
		title: post.data.title,
		description: post.data.description || "",
		published: post.data.published.toISOString(),
		updated: post.data.updated?.toISOString() || null,
		tags: post.data.tags || [],
		category: post.data.category || "",
		image: post.data.image || "",
		url: url(`/posts/${post.slug}/`),
		// Additional fields for portfolio compatibility
		brief: post.data.description || "",
		coverImage: post.data.image || null,
		publishedAt: post.data.published.toISOString(),
	}));

	return new Response(JSON.stringify(postsData), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
