import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

//  Define public URL
const SITE_URL = "https://banije.vercel.app";

export const GET: APIRoute = async () => {
  const allPosts: CollectionEntry<"posts">[] = await getCollection(
    "posts",
    ({ data }) => {
      return data.draft !== true;
    }
  );

  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.data.published).getTime() -
      new Date(a.data.published).getTime()
  );

  const formattedPosts = sortedPosts.map((post) => {
    // ✅ Create a full, absolute URL for the cover image
    const absoluteImageUrl =
      post.data.image && post.data.image.startsWith("/")
        ? `${SITE_URL}${post.data.image}`
        : post.data.image;

    return {
      title: post.data.title,
      brief: post.data.description,
      // Use the new absolute URL
      coverImage: absoluteImageUrl,
      slug: post.slug,
      publishedAt: post.data.published.toISOString(),
    };
  });

  return new Response(JSON.stringify(formattedPosts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
