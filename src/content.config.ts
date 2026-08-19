import {z} from 'astro/zod';
import {glob} from 'astro/loaders';
import {defineCollection} from "astro:content";

const pieces = defineCollection({
    loader: glob({pattern: '**/*.md', base: './src/pieces'}),
    schema: ({image}) => z.object({
        route: z.string(),
        title: z.string(),
        title_logo: image().optional(),
        bgImage: z.string().optional(),
        poster: z.string().optional(),
        summary: z.string().optional(),
        custom_font: z.string().optional(),
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
        annex: z.array(z.string()).optional(),
        sponsoring: z
            .array(
                z.object({
                    name: z.string(),
                }),
            )
            .optional(),
    }),
});

const members = defineCollection({
    loader: glob({pattern: '**/*.md', base: './src/members'}),
    schema: z.object({
        order: z.number(),
        name: z.string(),
        photo: z.string().optional(),
        adore: z.string().optional(),
        deteste: z.string().optional(),
        history: z.array(
            z.object({
                years: z.string(),
                role: z.string(),
                show: z.string(),
                venue: z.string(),
            }),
        ),
    }),
});

export const collections = {pieces, members};