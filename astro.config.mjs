import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import node from '@astrojs/node';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        icon(),
    ],

    output: 'static',

    adapter: node({
        mode: 'standalone',
    }),
});