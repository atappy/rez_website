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

    // Caddy terminates TLS and proxies to Node over plain HTTP; @astrojs/node's
    // standalone server always derives the request protocol from the raw socket
    // (never X-Forwarded-Proto), so Astro sees every request as http:// while
    // browsers always send an https:// Origin header. That permanent mismatch
    // trips the built-in cross-site form-submission check on every real POST.
    security: {
        checkOrigin: false,
    },
});