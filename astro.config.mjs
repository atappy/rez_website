import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import node from '@astrojs/node';

import netlify from '@astrojs/netlify';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        icon(),
    ],

    output: 'static',

    adapter: netlify(),
});