// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { siteUrl } from './src/data/site.ts';

// Canonical production domain. Update `siteUrl` in src/data/site.ts if this changes.
// Do not assume the domain is already registered or live.
export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  adapter: cloudflare({
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const normalized = item.url.replace(/\/$/, '');
        if (normalized === siteUrl) {
          item.url = `${siteUrl}/`;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
