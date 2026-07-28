// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The production domain — used to build canonical URLs, social-share
  // URLs, and the sitemap. The site is served from imaginationgrove.netlify.app
  // until launch, but all permanent URLs point here.
  site: 'https://imaginationgroveacademy.com',
  integrations: [
    sitemap({
      // Keep the DRAFT legal pages out of the sitemap. They force `noindex`
      // while `legal.isDraft` is true (see src/data/legal.ts), and listing a
      // noindexed URL in the sitemap makes Search Console report
      // "Submitted URL marked 'noindex'" — a real warning about a
      // self-inflicted contradiction.
      //
      // >>> AFTER LEGAL SIGN-OFF: when you set legal.isDraft = false, delete
      // >>> this filter so /privacy-policy and /terms get indexed normally.
      // >>> (Legal pages SHOULD be indexed once they're final.)
      filter: (page) =>
        !page.endsWith('/privacy-policy/') && !page.endsWith('/terms/'),
    }),
  ],
});
