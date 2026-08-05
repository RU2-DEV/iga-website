# Imagination Grove Academy — marketing site

Static marketing site for [Imagination Grove Academy](https://www.imaginationgroveacademy.com), a multi-campus childcare brand in Indiana and Kentucky. Built with [Astro](https://astro.build), hosted on Netlify, deployed automatically on every push to `main`.

## Local development

```sh
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build into dist/
npm run check      # type-check the .astro/.ts sources
npm run audit:placeholders   # scan dist/ for placeholder text (run after build)
```

Node 22+ (pinned for Netlify in `netlify.toml`; local Node 22 or newer works).

## Where things live

Content is data-driven. **Edit the data file, not the page**, whenever one of these changes:

| What | File |
|------|------|
| Campus addresses, phones, opening labels, per-campus copy, JSON-LD | `src/data/locations.ts` |
| Operating hours, brand contact email, Brightwheel URLs | `src/data/site.ts` |
| Legal-page values (entity, dates, retention, liability cap, draft flag) | `src/data/legal.ts` |
| Nav, footer, `<head>` meta, analytics loader, noindex gate | `src/layouts/BaseLayout.astro` |
| Page content | `src/pages/*.astro`, location pages in `src/pages/locations/` |
| Client-side behavior (nav, fade-ins, form submit, analytics events) | `public/assets/js/main.js` |

`src/data/locations.ts` is the single source of truth for campus NAP data. Once Google Business Profiles exist, the site's NAP must match them **verbatim** — one file to edit means no missed spots.

## Environment variables (set in Netlify)

| Variable | Purpose |
|----------|---------|
| `PUBLIC_LAUNCHED` | Unset or anything but exactly `true` → every page gets `noindex, nofollow`. Set to `true` at launch. Fails safe. |
| `PUBLIC_GTM_ID` | Google Tag Manager container ID. Unset → no analytics markup at all, zero requests to Google. Deliberately separate from `PUBLIC_LAUNCHED` so tracking can be verified pre-launch. |

## Forms

The tour-request form on `/enroll/` posts to **Netlify Forms** (form name `tour-request`).

- The notification email's subject comes from a **submitted field named `subject`** — a hidden input whose markup value is the no-JS fallback, rewritten on submit by `main.js` to include the parent's name and campus. **The Netlify dashboard's "custom email subject" field must stay empty** for this to work.
- Field names matter: the parent's name is **`parent-name`**, not `name`. Reading the wrong key fails silently.
- The primary conversion event (`lead_form_submitted`) fires only after Netlify confirms the POST.

## Privacy

The site honors **Global Privacy Control** and **Do Not Track**: when a browser sends either signal, the GTM loader in `BaseLayout.astro` never runs (and there is deliberately no `<noscript>` GTM iframe, which couldn't check the signal). If that gate is ever removed, Privacy Policy §11 and `legal.honorsDoNotTrack` must change with it.

## Build safety nets

The Netlify build runs `check → build → audit:placeholders`. The placeholder audit fails the deploy if bracket placeholders (`…TBD]`, `[PLACEHOLDER…`) appear in rendered HTML, or if a "pending legal review" marker survives on a page without the draft banner — which is what happens if `legal.isDraft` is flipped to `false` while a value in `legal.ts` is still `null`.

## Launching

See [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md).
