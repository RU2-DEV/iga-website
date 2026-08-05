// ============================================================
// SINGLE SOURCE OF TRUTH for campus data.
//
// Every surface that shows a campus's name / address / phone —
// the locations hub cards, each location page's NAP card, and
// the ChildCare JSON-LD — reads from this file. When the client
// sends real addresses and phone numbers, update them HERE and
// everything stays in sync.
//
// WHY THIS MATTERS: once Google Business Profiles exist, the
// site's NAP must match them VERBATIM (capitalization, "Ste."
// vs "Suite", everything) or local-SEO signals fragment.
// One file to edit = no missed spots.
// ============================================================

import { site, hoursProse } from "./site";

export type LocationStatus = "open" | "soon";

export interface CredentialRow {
  dt: string;
  dd: string;
}

export interface Location {
  slug: string;
  city: string;
  state: "IN" | "KY";
  cityState: string;
  email: string;
  status: LocationStatus;
  statusLabel: string;
  metaTitle: string;
  metaDescription: string;
  /** Hero paragraph under the H1. */
  heroSub: string;
  /** H1 on the location page. */
  heroHeading: string;
  /** Heading on the NAP (address/phone/hours) card. */
  napHeading: string;
  /** Cities for the JSON-LD areaServed field. */
  areaServed: string[];
  /** "About this campus" heading + body. One string per paragraph.
      This is the primary organic-ranking copy for the page and should stay
      aligned with the campus's Google Business Profile description once that
      exists. Replaced the old aboutHint draft-note field 2026-07-28. */
  aboutHeading: string;
  aboutBody: string[];
  /** Short area line on the /locations hub card (county / side of metro).
      Geographic only — deliberately avoids naming school districts. */
  areaLabel?: string;
  programsEyebrow: string;
  programsIntro: string;
  /** Waitlist CTA section (coming-soon pages only). */
  waitlist?: { heading: string; body: string };
  /** State licensing rows for the credentials table (coming-soon pages only —
      Bargersville's fuller table lives in its own page). */
  licensingRows?: CredentialRow[];
  staffingRows?: CredentialRow[];
  /** Bottom CTA band (coming-soon pages only). */
  cta?: { heading: string; body: string; btnLabel: string; btnHref: string };
  // --- Real data, added as the client provides it. Leave undefined until confirmed. ---
  /** Display string for the NAP card's "Opening" row (e.g. "Projected: September 14, 2026").
      Leave undefined to render "Date to be announced". */
  openingLabel?: string;
  streetAddress?: string;
  postalCode?: string;
  telephone?: string;
  geo?: { latitude: number; longitude: number };
  /** Planned capacity for this campus. Rendered under the label "Planned
      capacity" — NOT "Licensed capacity" — until the state license actually
      comes back, because the licensed figure can differ from the planned one.
      Switch the label on the location page once licensure is confirmed.
      Leave undefined to omit the row entirely (preferred over a placeholder). */
  capacity?: number;
  /** Public Brightwheel digital-form URL for this campus's waitlist.
      When set, the "Join the Waitlist" CTAs on the coming-soon page link
      out to Brightwheel (opens in a new tab, rel="noopener nofollow") and a
      submission auto-creates a "Prospect" record. Leave undefined until the
      Brightwheel subscription is active and the form's share URL exists —
      the CTAs fall back to the native /enroll page in the meantime.
      See INTEGRATION-BRIGHTWHEEL.md, Phase 1b. */
  waitlistFormUrl?: string;
}

/** Per-state public lookup where a parent can independently verify a center's
    licensing status and inspection history. Client direction (2026-07-27) is to
    link these out rather than list inspection records on the site. Indiana and
    Kentucky have separate systems, so this is keyed by state — never hardcode
    the Indiana URL on a Kentucky page. */
export const stateLookup: Record<string, { label: string; url: string }> = {
  IN: {
    label: "Indiana's Child Care Finder",
    url: "https://www.in.gov/fssa/childcarefinder/",
  },
  KY: {
    label: "Kentucky's public child care search",
    url: "https://kynect.ky.gov/benefits/s/child-care-provider?origin=program-page&language=en_US",
  },
};

export const locations: Location[] = [
  {
    slug: "bargersville",
    city: "Bargersville",
    state: "IN",
    cityState: "Bargersville, IN",
    email: "bargersville@imaginationgroveacademy.com",
    streetAddress: "2805 South Grove Blvd",
    postalCode: "46106",
    telephone: "317-207-4797",
    capacity: 135,
    openingLabel: "Projected: September 14, 2026",
    status: "open",
    statusLabel: "Opening first · Enrolling now",
    metaTitle: "Childcare in Bargersville, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is opening its first campus in Bargersville, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers. Enrolling now.",
    heroHeading: "Childcare in Bargersville, IN.",
    heroSub:
      "Imagination Grove Academy's first campus is opening in Bargersville. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn.",
    napHeading: "Visit us",
    areaServed: ["Bargersville", "Greenwood", "Franklin"],
    areaLabel: "Johnson County · Indianapolis south metro",
    aboutHeading: "A purpose-built childcare home in Bargersville.",
    aboutBody: [
      "Our Bargersville campus is new construction on South Grove Blvd — built from the ground up as a childcare center, not converted from a space that used to be something else. Every classroom was drawn around the age group it serves, so sinks, cubbies, sightlines, and nap space sit where they need to be from day one instead of being worked around later.",
      `Bargersville is opening first because this building is furthest along. It also sits in one of the fastest-growing corners of the Indianapolis south metro, within an easy drive for families in Bargersville, Greenwood, Franklin, and the Center Grove area — most of whom are heading north for work in the morning. Doors open at ${site.hours.open} and stay open until ${site.hours.close}, Monday through Friday.`,
      "The campus serves every IGA age group under one roof: infants from six weeks, toddlers, twos, preschool, and Pre-K, each in their own room with their own teaching team. Class sizes stay small in every program, and lead teachers are degree-qualified. A 30-minute tour is the fastest way to see it — and you are welcome in the classrooms while the children are in them.",
    ],
    programsEyebrow: "At the Bargersville campus",
    programsIntro:
      "The Bargersville campus serves every IGA age group. We follow all state guidelines strictly, keeping class sizes small in every program.",
  },
  {
    slug: "fishers",
    city: "Fishers",
    state: "IN",
    cityState: "Fishers, IN",
    email: "fishers@imaginationgroveacademy.com",
    streetAddress: "12344 Cyntheanne Rd",
    postalCode: "46037",
    capacity: 135,
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in Fishers, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to Fishers, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers. Join the waitlist.",
    heroHeading: "Childcare in Fishers, IN.",
    heroSub:
      "Imagination Grove Academy is coming to Fishers. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to Fishers",
    areaServed: ["Fishers", "Noblesville", "Carmel"],
    areaLabel: "East Fishers · Hamilton County",
    aboutHeading: "An IGA campus is coming to Fishers.",
    aboutBody: [
      "Our Fishers campus is new construction on Cyntheanne Road, on the east side of Hamilton County. Like every IGA building, it is purpose-built for childcare rather than adapted from another use — classrooms sized to the age groups that will use them, with the practical things designed in rather than retrofitted.",
      `The location puts us within a short drive of east Fishers, the Geist area, Noblesville, and Carmel, near the Southeastern Parkway and Olio Road corridors that families in this part of the county already use on their commute. Hours will match our other campuses: ${hoursProse}.`,
      "When Fishers opens it will offer the full IGA age range — infants from six weeks through Pre-K — with the same small class sizes, the same credentialing standards for lead teachers, and the same curriculum running at every IGA campus. We do not have an opening date to publish yet. Joining the waitlist is how you hear first: we will reach out as soon as we have a date and tour availability.",
    ],
    programsEyebrow: "When the Fishers campus opens",
    programsIntro:
      "Every IGA campus serves every age group. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when Fishers opens.",
      body: "The Fishers campus is opening soon. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
    // Brightwheel "Join the Waitlist - Fishers, IN" form (link access enabled 2026-07-26).
    waitlistFormUrl:
      "https://schools.mybrightwheel.com/sign-in?redirect_path=forms/bccac228-cd30-402d-9e50-58addeb5dad4/self-service",
    licensingRows: [
      { dt: "License type", dd: "Indiana Class 1 Licensed Childcare Center (pending)" },
      { dt: "Licensing body", dd: "Indiana Family & Social Services Administration (FSSA), Bureau of Child Care" },
      { dt: "License number", dd: "Available upon request" },
    ],
    staffingRows: [
      { dt: "Hiring", dd: "Lead teachers and assistant teachers will be hired ahead of opening, with the same credentialing standards as all IGA campuses." },
      { dt: "Standards", dd: "Lead teachers: minimum Associate's degree in ECE. 100% background-checked. CPR & pediatric first aid required." },
    ],
    cta: {
      heading: "While you wait, visit our Bargersville campus.",
      body: "The same curriculum, the same standards, the same IGA. Touring Bargersville is the fastest way to see what we'll bring to Fishers.",
      btnLabel: "See the Bargersville campus",
      btnHref: "/locations/bargersville",
    },
  },
  {
    slug: "new-palestine",
    city: "New Palestine",
    state: "IN",
    cityState: "New Palestine, IN",
    email: "newpalestine@imaginationgroveacademy.com",
    capacity: 135,
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in New Palestine, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to New Palestine, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers. Join the waitlist.",
    heroHeading: "Childcare in New Palestine, IN.",
    heroSub:
      "Imagination Grove Academy is coming to New Palestine. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to New Palestine",
    areaServed: ["New Palestine", "Greenfield", "McCordsville"],
    areaLabel: "Hancock County · east of Indianapolis",
    aboutHeading: "An IGA campus is coming to New Palestine.",
    aboutBody: [
      "Our New Palestine campus will be new construction, serving Hancock County and the communities east of Indianapolis. Like every IGA building, it is designed as a childcare center from the start rather than converted from another use, with classrooms built around the age groups that will use them.",
      `New Palestine sits along the US 52 and I-70 corridor, which makes it a practical stop for families commuting between Hancock County and Indianapolis, and puts us within reach of New Palestine, Greenfield, McCordsville, and Cumberland. Hours will match our other campuses: ${hoursProse}.`,
      "We are not ready to publish a street address or an opening date for this campus yet. What we can tell you is what will not change: the full age range from six weeks through Pre-K, the same small class sizes, the same credentialing standards for lead teachers, and the same curriculum running at every IGA campus. Join the waitlist and we will reach out as soon as we have dates to share.",
    ],
    programsEyebrow: "When the New Palestine campus opens",
    programsIntro:
      "Every IGA campus serves every age group. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when New Palestine opens.",
      body: "The New Palestine campus is opening soon. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
    // Brightwheel "Join the Waitlist - New Palestine, IN" form (link access enabled 2026-07-26).
    waitlistFormUrl:
      "https://schools.mybrightwheel.com/sign-in?redirect_path=forms/2f551fe9-af38-42a8-b46f-098129186896/self-service",
    licensingRows: [
      { dt: "License type", dd: "Indiana Class 1 Licensed Childcare Center (pending)" },
      { dt: "Licensing body", dd: "Indiana Family & Social Services Administration (FSSA), Bureau of Child Care" },
      { dt: "License number", dd: "Available upon request" },
    ],
    staffingRows: [
      { dt: "Hiring", dd: "Lead teachers and assistant teachers will be hired ahead of opening, with the same credentialing standards as all IGA campuses." },
      { dt: "Standards", dd: "Lead teachers: minimum Associate's degree in ECE. 100% background-checked. CPR & pediatric first aid required." },
    ],
    cta: {
      heading: "While you wait, visit our Bargersville campus.",
      body: "The same curriculum, the same standards, the same IGA. Touring Bargersville is the fastest way to see what we'll bring to New Palestine.",
      btnLabel: "See the Bargersville campus",
      btnHref: "/locations/bargersville",
    },
  },
  {
    slug: "lexington-ky",
    city: "Lexington",
    state: "KY",
    cityState: "Lexington, KY",
    email: "lexington@imaginationgroveacademy.com",
    streetAddress: "2450 Georgetown Rd",
    postalCode: "40511",
    capacity: 135,
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in Lexington, KY | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to Lexington, KY. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers. Join the waitlist.",
    heroHeading: "Childcare in Lexington, KY.",
    heroSub:
      "Imagination Grove Academy is coming to Lexington — our first campus in Kentucky. Safe, joyful childcare for children 6 weeks–5 years, with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to Lexington",
    areaServed: ["Lexington", "Nicholasville", "Georgetown"],
    areaLabel: "Northwest Lexington · Fayette County",
    aboutHeading: "IGA is expanding into Kentucky.",
    aboutBody: [
      "Lexington is IGA's first campus outside Indiana. The reason is straightforward: the need we saw in the Indianapolis suburbs — families struggling to find quality infant and toddler care close to home — is just as real in central Kentucky.",
      `The campus is new construction on Georgetown Road in northwest Lexington, minutes from New Circle Road and convenient to both I-64 and I-75, which keeps it reachable for families across Fayette County and from Nicholasville and Georgetown. Hours will match our other campuses: ${hoursProse}.`,
      "Kentucky regulates childcare through its own framework — the Cabinet for Health and Family Services, Division of Child Care, with the Kentucky All STARS quality rating rather than Indiana's system — and our Lexington campus will meet those requirements in full. The programs themselves will be identical to our Indiana campuses: infants from six weeks through Pre-K, small class sizes, and degree-qualified lead teachers. Join the waitlist to hear first.",
    ],
    programsEyebrow: "When the Lexington campus opens",
    programsIntro:
      "Every IGA campus serves every age group. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when Lexington opens.",
      body: "The Lexington campus is our first in Kentucky. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
    // Brightwheel "Join the Waitlist - Lexington, KY" form (link access enabled 2026-07-26).
    waitlistFormUrl:
      "https://schools.mybrightwheel.com/sign-in?redirect_path=forms/5b69bf9a-7cf4-4010-93c2-2a064756fed4/self-service",
    licensingRows: [
      { dt: "License type", dd: "Kentucky Licensed Type I Child-Care Center (pending)" },
      { dt: "Licensing body", dd: "Kentucky Cabinet for Health and Family Services — Division of Child Care" },
      { dt: "License number", dd: "Available upon request" },
      { dt: "Kentucky All STARS rating", dd: "Pending after opening — IGA is committed to pursuing the highest All STARS quality rating." },
    ],
    staffingRows: [
      { dt: "Hiring", dd: "Lead teachers and assistant teachers will be hired ahead of opening, with the same credentialing standards as all IGA campuses." },
      { dt: "Standards", dd: "Lead teachers: minimum Associate's degree in ECE. 100% background-checked (Kentucky AOC, CAN check). CPR & pediatric first aid required." },
    ],
    cta: {
      heading: "The same IGA standards, in Lexington.",
      body: "Our Bargersville, IN campus opens first. The Lexington campus follows with the exact same curriculum, ratios, and credentialing standards — adapted to Kentucky's licensing framework.",
      btnLabel: "See the Bargersville campus",
      btnHref: "/locations/bargersville",
    },
  },
];

/** Look up one location by slug; throws at build time if the slug is wrong. */
export function getLocation(slug: string): Location {
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) throw new Error(`Unknown location slug: ${slug}`);
  return loc;
}

/**
 * schema.org ChildCare JSON-LD for a location page.
 * Only includes fields we have REAL data for — placeholder values like
 * "[PHONE TBD]" are invalid structured data and can get the whole block
 * ignored by Google. street/zip/phone/geo are added automatically once
 * they're filled in on the location above.
 */
export function locationJsonLd(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: `Imagination Grove Academy — ${loc.city}`,
    url: `https://www.imaginationgroveacademy.com/locations/${loc.slug}/`,
    email: loc.email,
    priceRange: "$$",
    ...(loc.telephone ? { telephone: loc.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(loc.streetAddress ? { streetAddress: loc.streetAddress } : {}),
      addressLocality: loc.city,
      addressRegion: loc.state,
      ...(loc.postalCode ? { postalCode: loc.postalCode } : {}),
      addressCountry: "US",
    },
    ...(loc.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: loc.geo.latitude, longitude: loc.geo.longitude } }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: site.hours.opensIso,
        closes: site.hours.closesIso,
      },
    ],
    areaServed: loc.areaServed.map((name) => ({ "@type": "City", name })),
    parentOrganization: {
      "@type": "Organization",
      name: "Imagination Grove Academy",
      url: "https://www.imaginationgroveacademy.com",
    },
  };
}

/** The IGA programs, shown identically on every location page. */
export const programs = [
  {
    name: "Infant Care",
    ageMeta: "6 weeks – 12 months",
    blurb: "Calm, primary-caregiver-led infant care with parent-set feed and nap schedules.",
    href: "/programs#infant",
    linkLabel: "Learn about infant care",
  },
  {
    name: "Toddler Program",
    ageMeta: "1 – 2 years",
    blurb: "Sensory play, language-rich rooms, and the gentle structure toddlers need.",
    href: "/programs#toddler",
    linkLabel: "Learn about toddler care",
  },
  {
    name: "Two-Year-Olds",
    ageMeta: "2 – 3 years",
    blurb: "Play-based exploration that builds language, independence, and social confidence.",
    href: "/programs#twos",
    linkLabel: "Learn about our twos program",
  },
  {
    name: "Preschool",
    ageMeta: "3 – 4 years",
    blurb: "Curiosity-led curriculum with foundational literacy, math, and independent learning.",
    href: "/programs#preschool",
    linkLabel: "Learn about preschool",
  },
  {
    name: "Pre-K",
    ageMeta: "4 – 5 years",
    blurb: "Kindergarten-ready academic foundations with strong social-emotional growth.",
    href: "/programs#pre-k",
    linkLabel: "Learn about Pre-K",
  },
];
