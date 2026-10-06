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
  integrations: [sitemap()],
});
