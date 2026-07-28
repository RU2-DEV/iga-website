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

export const legal = {
  /** While true: draft banner shows, and both pages force noindex
      even after PUBLIC_LAUNCHED opens the rest of the site. This is
      the safety net if launch happens before legal review lands. */
  isDraft: true,

  /** Operating entity. UNKNOWN — the real client is a real-estate
      development company investing in IGA, so this may not be
      "Imagination Grove Academy." Do not guess. */
  entityName: null as string | null,

  /** Corporate/registered address for legal notices — NOT a campus
      address. */
  noticeAddress: null as string | null,

  effectiveDate: null as string | null,
  lastUpdated: null as string | null,

  /** Retention period for tour requests that don't convert to
      enrollment. Emily + legal to set. */
  tourRequestRetention: null as string | null,

  /** Retention period for email correspondence. */
  emailRetention: null as string | null,

  /** Days to respond to a data request. Draft proposed 45. */
  requestResponseDays: 45,

  /** Liability cap in Section 12 of the Terms. Business decision. */
  liabilityCap: null as string | null,

  /** Governing law. Draft assumes Indiana (3 of 4 campuses), but the
      Lexington KY campus makes this a real question for legal. */
  governingState: "Indiana",
  venueCounty: null as string | null,

  /** Whether the site honors Do Not Track / Global Privacy Control.
      Left null deliberately — never claim to honor a signal the site
      does not actually honor. */
  honorsDoNotTrack: null as boolean | null,

  contactEmail: "team@imaginationgroveacademy.com",
};

/** Renders a value, or a visible marker when it's still unresolved.
    Used only on the two legal draft pages. */
export function pendingLabel(what: string): string {
  return `[${what} — pending legal review]`;
}
