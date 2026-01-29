import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    tags: z
      .array(z.string().trim().min(1))
      .optional()
      .default([]),
    category: z
      .string()
      .trim()
      .optional()
      .nullable()
      .default(""),
    lang: z.string().optional().default(""),
    originalSlug: z.string().optional(),
    series: z
      .object({
        name: z.string().trim(),
        order: z.number().int().min(1),
      })
      .optional(),

    /* For internal use */
    prevTitle: z.string().default(""),
    prevSlug: z.string().default(""),
    nextTitle: z.string().default(""),
    nextSlug: z.string().default(""),
  }),
});

const translateCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    tags: z
      .array(z.string().trim().min(1))
      .optional()
      .default([]),
    category: z
      .string()
      .trim()
      .optional()
      .nullable()
      .default(""),
    lang: z.string(),
    originalSlug: z.string(),
    series: z
      .object({
        name: z.string().trim(),
        order: z.number().int().min(1),
      })
      .optional(),
    prevTitle: z.string().default(""),
    prevSlug: z.string().default(""),
    nextTitle: z.string().default(""),
    nextSlug: z.string().default(""),
  }),
});

const specCollection = defineCollection({
  schema: z.object({}),
});

export const collections = {
  posts: postsCollection,
  translate: translateCollection,
  spec: specCollection,
};
