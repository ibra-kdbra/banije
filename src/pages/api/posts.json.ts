import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
// 1. Fetch posts from your content collection
	const allPosts: CollectionEntry<'posts'>[] = await getCollection('posts', ({ data }) => {
    return data.draft !== true; // Filter out drafts
  });

// 2. Sort posts by date (newest first)
const sortedPosts = allPosts.sort((a, b) =>
    new Date(b.data.published).getTime() - new Date(a.data.published).getTime()
);

// 3. Format the data to match your frontmatter
const formattedPosts = sortedPosts.map(post => ({
title: post.data.title,
brief: post.data.description, // Matches your 'description' field
coverImage: post.data.image,    // ✅ CHANGED from coverImage to 'image'
slug: post.slug,
publishedAt: post.data.published.toISOString(), // ✅ CHANGED from pubDate to 'published'
}));

// 4. Return the data as a JSON response
return new Response(
JSON.stringify(formattedPosts), {
status: 200,
headers: {
	"Content-Type": "application/json"
      }
    }
  );
}
