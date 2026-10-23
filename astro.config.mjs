// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucas-nahuel-pinto.github.io',
  trailingSlash: 'never',
  redirects: {
    '/': '/es',
  },
  integrations: [
    sitemap({
      serialize(item) {
        // Internal animatic review tool (Fase 2) — never list it publicly.
        return item.url.endsWith('/animatic') ? undefined : item;
      },
    }),
  ],
});
