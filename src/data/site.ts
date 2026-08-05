// ============================================================
// SITE-WIDE CONFIG — single source of truth for brand-level
// values that appear in more than one place.
//
// Campus-specific data (addresses, phones, per-campus copy)
// lives in locations.ts. Legal-page values live in legal.ts.
// This file holds what is true across every campus:
//
//   - operating hours (footer, NAP cards, JSON-LD, campus copy)
//   - the brand contact email
//   - Brightwheel URLs (portal launch + app store badges)
//
// If hours ever change, edit them HERE and they update
// everywhere at once — footer, every location page, and the
// structured data Google reads.
// ============================================================

export const site = {
  name: "Imagination Grove Academy",

  /** Brand-level contact — the shared mailbox, not a campus box. */
  contactEmail: "team@imaginationgroveacademy.com",

  hours: {
    daysShort: "Mon–Fri",
    daysLong: "Monday–Friday",
    open: "6:30 AM",
    close: "6:00 PM",
    /** 24h forms for ChildCare JSON-LD OpeningHoursSpecification. */
    opensIso: "06:30",
    closesIso: "18:00",
  },

  /** Brightwheel entry points. Per-campus waitlist form URLs are
      campus data and stay in locations.ts. */
  brightwheel: {
    web: "https://schools.mybrightwheel.com",
    appStore: "https://apps.apple.com/app/brightwheel/id832701752",
    googlePlay: "https://play.google.com/store/apps/details?id=com.brightwheel.schools",
  },
} as const;

/** "6:30 AM to 6:00 PM, Monday through Friday" — the phrasing used
    in campus prose. */
export const hoursProse = `${site.hours.open} to ${site.hours.close}, Monday through Friday`;
