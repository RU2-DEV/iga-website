# Launch checklist

The domain (`www.imaginationgroveacademy.com`) is already live and serving the site;
"launch" means opening it to search engines. Steps in order:

## 1. Finalize the legal pages

In `src/data/legal.ts`:

- [ ] Fill every remaining `null` (as of this writing: `liabilityCap`)
- [ ] Set `isDraft = false` — this removes the draft banner AND stops forcing
      `noindex` on `/privacy-policy` and `/terms`
- [ ] **Separately**: delete the sitemap `filter` in `astro.config.mjs` so the
      legal pages get indexed (flagged in a comment there — easy to miss)

The placeholder audit fails the build if `isDraft` is flipped while any
`legal.ts` value is still `null`, so a forgotten value cannot ship silently.

## 2. Open the site to search engines

- [ ] Netlify → Site configuration → Environment variables →
      set `PUBLIC_LAUNCHED = true`
- [ ] Trigger a redeploy

## 3. Verify (5 minutes)

- [ ] `view-source:` the homepage — no `<meta name="robots" content="noindex, nofollow">`
- [ ] `/privacy-policy/` — draft banner gone, no robots meta, no
      "pending legal review" text anywhere
- [ ] `/sitemap-index.xml` resolves and the sitemap includes `/privacy-policy/` and `/terms/`
- [ ] Submit the sitemap in Google Search Console

## 4. Post-launch, time-sensitive copy

The site carries dates that expire — remove or update each as it passes:

- [ ] Open-interviews copy (stale after **Aug 21, 2026**) — About hiring note + homepage teachers section
- [ ] Open-house copy (stale after **Sept 12, 2026**) — enroll page + homepage CTA
- [ ] "Projected: September 14, 2026" opening label — `openingLabel` in `locations.ts`, update at opening
- [ ] When the license is issued (client will confirm): flip all "licensing in progress"
      copy site-wide, and change "Planned capacity" to the licensed figure
