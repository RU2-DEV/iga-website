# Launch checklist

The domain (`www.imaginationgroveacademy.com`) is already live and serving the site;
"launch" means opening it to search engines. Steps in order:

## 1. Finalize the legal pages

In `src/data/legal.ts`:

- [x] Fill every remaining `null` — DONE 2026-08-24 (`liabilityCap = "USD $100"`)
- [x] Set `isDraft = false` — DONE 2026-08-24 (draft banner gone; legal pages
      now follow the site-wide `PUBLIC_LAUNCHED` gate only)
- [x] Delete the sitemap `filter` in `astro.config.mjs` — DONE 2026-08-24

The placeholder audit fails the build if `isDraft` is flipped while any
`legal.ts` value is still `null`, so a forgotten value cannot ship silently.

## 2. Open the site to search engines

- [x] Netlify → Project configuration → Environment variables →
      set `PUBLIC_LAUNCHED = true` — DONE 2026-08-24
- [x] Trigger a redeploy — DONE 2026-08-24 (all 12 pages verified: no robots meta)

## 3. Verify (5 minutes)

- [x] `view-source:` the homepage — no `<meta name="robots" content="noindex, nofollow">`
- [x] `/privacy-policy/` — draft banner gone, no robots meta, no
      "pending legal review" text anywhere
- [x] `/sitemap-index.xml` resolves and the sitemap includes `/privacy-policy/` and `/terms/`
- [x] Submit the sitemap in Google Search Console — DONE 2026-08-27 (full URL required on a Domain property; initial "Couldn't fetch" with blank Last-read is Google's pre-crawl placeholder)

## 4. Post-launch, time-sensitive copy

The site carries dates that expire — remove or update each as it passes:

- [x] Open-interviews copy — REMOVED (homepage 2026-08-24; About hiring note 2026-08-27, `3584785`)
- [ ] Open-house copy (stale after **Sept 12, 2026**) — enroll page + homepage CTA
- [ ] "Projected: September 14, 2026" opening label — `openingLabel` in `locations.ts`, update at opening
- [ ] When the license is issued (client will confirm): flip all "licensing in progress"
      copy site-wide, and change "Planned capacity" to the licensed figure
