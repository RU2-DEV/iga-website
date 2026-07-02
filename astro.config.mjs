// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The production domain — used to build canonical URLs, social-share
  // URLs, and the sitemap. The site is served from imaginationgrove.netlify.app
  // until launch, but all permanent URLs point here.
  site: 'https://imaginationgroveacademy.com',
  integrations: [sitemap()],
});
