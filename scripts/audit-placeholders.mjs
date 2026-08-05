// Post-build gate: fail the build if placeholder text is about to ship.
//
// Runs against dist/ AFTER `astro build` (see the Netlify build command).
// Two kinds of failure:
//
//  1. Bracket placeholders — "…TBD]" or "[PLACEHOLDER…" anywhere in the
//     rendered HTML. These should never reach production.
//
//  2. Orphaned legal markers — "[… — pending legal review]" on a page that
//     does NOT also show the draft banner. While src/data/legal.ts has
//     isDraft = true, the banner renders and the markers are deliberate.
//     The moment isDraft flips to false the banner disappears — so any
//     marker still left (e.g. a null that was never filled) fails the
//     build instead of publishing "[Liability cap — pending legal review]"
//     on a live legal page.
//
// No dependencies; plain Node. Run manually with: npm run audit:placeholders

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist", import.meta.url).pathname;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

let failures = [];

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  const rel = file.slice(DIST.length + 1);

  if (/TBD\]/.test(html)) {
    failures.push(`${rel}: contains a "TBD]" bracket placeholder`);
  }
  if (/\[PLACEHOLDER/i.test(html)) {
    failures.push(`${rel}: contains a "[PLACEHOLDER" tag`);
  }
  if (html.includes("pending legal review") && !html.includes("legal-draft-banner")) {
    failures.push(
      `${rel}: has a "pending legal review" marker but NO draft banner — ` +
        `legal.isDraft was set to false with unresolved nulls in legal.ts`
    );
  }
}

if (failures.length) {
  console.error("✗ Placeholder audit FAILED:\n");
  for (const f of failures) console.error("  - " + f);
  console.error("\nFix the source data (src/data/*.ts) and rebuild.");
  process.exit(1);
}

console.log("✓ Placeholder audit passed — no placeholder text in dist/.");
