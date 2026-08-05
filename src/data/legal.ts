// ============================================================
// LEGAL PAGE CONFIG — single source of truth for /privacy-policy
// and /terms.
//
// The page copy is a DRAFT (written 2026-07-28) awaiting review by
// RU2's legal team. The unresolved values below are `null` on
// purpose: each one renders as a visible "pending" marker rather
// than an invented value, because guessing a legal entity name or a
// liability cap on a published legal page is worse than admitting
// it isn't settled yet.
//
// >>> AFTER LEGAL REVIEW: fill every null, apply any wording
// >>> changes to the two .astro pages, then set isDraft = false.
// >>> That single flag removes the draft banner AND stops forcing
// >>> noindex on both pages.
//
// Source drafts (with the full "Notes for legal review" sections,
// which deliberately do NOT appear on the site):
//   content/privacy-policy-draft-v1.md
//   content/terms-of-service-draft-v1.md
// ============================================================

import { site } from "./site";

export const legal = {
  /** While true: draft banner shows, and both pages force noindex
      even after PUBLIC_LAUNCHED opens the rest of the site. This is
      the safety net if launch happens before legal review lands. */
  isDraft: true,

  /** Operating entity. Confirmed by RU2 legal review (2026-08-04). */
  entityName: "IGA Group, LLC" as string | null,

  /** Corporate/registered address for legal notices — NOT a campus
      address. Confirmed by RU2 legal review (2026-08-04). */
  noticeAddress: "15481 Union Chapel Rd, Suite 100, Noblesville, IN 46060" as string | null,

  effectiveDate: "August 1, 2026" as string | null,
  lastUpdated: "August 4, 2026" as string | null,

  /** Retention period for tour requests that don't convert to
      enrollment. Set by RU2 legal review (2026-08-04). */
  tourRequestRetention: "three years" as string | null,

  /** Retention period for email correspondence. Set by RU2 legal
      review (2026-08-04). */
  emailRetention: "three years" as string | null,

  /** Liability cap in Section 12 of the Terms. Business decision. */
  liabilityCap: null as string | null,

  /** Governing law + venue. Confirmed by RU2 legal review
      (2026-08-04): Indiana, Hamilton County. */
  governingState: "Indiana",
  venueCounty: "Hamilton" as string | null,

  /** Legal review 2026-08-04: the Site DOES honor GPC / Do Not Track.
      The claim is real — BaseLayout.astro skips loading GTM entirely
      when the browser sends either signal. If that gate is ever
      removed, this must go back to null and Privacy §11 comes out. */
  honorsDoNotTrack: true as boolean | null,

  contactEmail: site.contactEmail,
};

/** Renders a value, or a visible marker when it's still unresolved.
    Used only on the two legal draft pages. */
export function pendingLabel(what: string): string {
  return `[${what} — pending legal review]`;
}
