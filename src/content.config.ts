import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pieces' }),
  schema: z.object({
    route: z.string(),
    title: z.string(),
    bgImage: z.string().optional(),
    poster: z.string().optional(),
    generic: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        }),
      )
      .optional(),
    representations: z
      .array(
        z.object({
          date: z.string(),
          location: z.string(),
        }),
      )
      .optional(),
    reservation: z
      .object({
        text: z.string(),
        link: z.string(),
      })
      .optional(),
    quotes: z
      .array(
        z.object({
          text: z.string(),
          author: z.string().optional(),
        }),
      )
      .optional(),
    annex: z.string().optional(),
    sponsoring: z
      .array(
        z.object({
          name: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { pieces };
