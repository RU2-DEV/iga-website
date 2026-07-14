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
  /** "About this campus" heading + draft-note hint (coming-soon pages). */
  aboutHeading: string;
  aboutHint: string;
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
  streetAddress?: string;
  postalCode?: string;
  telephone?: string;
  geo?: { latitude: number; longitude: number };
}

export const locations: Location[] = [
  {
    slug: "bargersville",
    city: "Bargersville",
    state: "IN",
    cityState: "Bargersville, IN",
    email: "bargersville@imaginationgroveacademy.com",
    streetAddress: "2805 South Grove Blvd",
    postalCode: "46106",
    status: "open",
    statusLabel: "Opening first · Enrolling now",
    metaTitle: "Childcare in Bargersville, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is opening its first campus in Bargersville, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers, state-licensed. Enrolling now.",
    heroHeading: "Childcare in Bargersville, IN.",
    heroSub:
      "Imagination Grove Academy's first campus is opening in Bargersville. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn.",
    napHeading: "Visit us",
    areaServed: ["Bargersville", "Greenwood", "Franklin"],
    aboutHeading: "A purpose-built childcare home in Bargersville.",
    aboutHint:
      "Location-specific paragraph goes here once the building, neighborhood context, and opening story are finalized. Two or three sentences: where the building is, what makes it the right fit for the community, what's unique about this campus (outdoor space, natural light, partnership with a local pediatrician, etc.). This is the copy that helps the page rank for \"childcare Bargersville\" and feel like a real place rather than a marketing brochure.",
    programsEyebrow: "At the Bargersville campus",
    programsIntro:
      "The Bargersville campus serves all four IGA age groups. We follow all state guidelines strictly, keeping class sizes small in every program.",
  },
  {
    slug: "fishers",
    city: "Fishers",
    state: "IN",
    cityState: "Fishers, IN",
    email: "fishers@imaginationgroveacademy.com",
    streetAddress: "12344 Cyntheanne Rd",
    postalCode: "46037",
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in Fishers, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to Fishers, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers, state-licensed. Join the waitlist.",
    heroHeading: "Childcare in Fishers, IN.",
    heroSub:
      "Imagination Grove Academy is coming to Fishers. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to Fishers",
    areaServed: ["Fishers", "Noblesville", "Carmel"],
    aboutHeading: "An IGA campus is coming to Fishers.",
    aboutHint:
      "Location-specific paragraph goes here once the Fishers building, neighborhood context, and opening timeline are finalized. Mention the area being served (Geist? Saxony? Hamilton County north?), what makes this campus distinct, and any partnerships or features unique to the Fishers location. This is what helps the page rank for \"childcare Fishers Indiana\" once live.",
    programsEyebrow: "When the Fishers campus opens",
    programsIntro:
      "Every IGA campus serves all four age groups. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when Fishers opens.",
      body: "The Fishers campus is opening soon. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
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
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in New Palestine, IN | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to New Palestine, IN. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers, state-licensed. Join the waitlist.",
    heroHeading: "Childcare in New Palestine, IN.",
    heroSub:
      "Imagination Grove Academy is coming to New Palestine. Safe, joyful childcare for children 6 weeks–5 years — with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to New Palestine",
    areaServed: ["New Palestine", "Greenfield", "McCordsville"],
    aboutHeading: "An IGA campus is coming to New Palestine.",
    aboutHint:
      "Location-specific paragraph goes here once the New Palestine building, neighborhood context, and opening timeline are finalized. Mention the area being served, what makes this campus distinct, and any partnerships or features unique to the New Palestine location. This is what helps the page rank for \"childcare New Palestine Indiana\" once live.",
    programsEyebrow: "When the New Palestine campus opens",
    programsIntro:
      "Every IGA campus serves all four age groups. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when New Palestine opens.",
      body: "The New Palestine campus is opening soon. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
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
    status: "soon",
    statusLabel: "Coming soon",
    metaTitle: "Childcare in Lexington, KY | Imagination Grove Academy",
    metaDescription:
      "Imagination Grove Academy is coming soon to Lexington, KY. Safe, joyful childcare for children 6 weeks–5 years. Low ratios, degree-qualified lead teachers, Kentucky-licensed. Join the waitlist.",
    heroHeading: "Childcare in Lexington, KY.",
    heroSub:
      "Imagination Grove Academy is coming to Lexington — our first campus in Kentucky. Safe, joyful childcare for children 6 weeks–5 years, with low teacher-to-child ratios, degree-qualified lead teachers, and a curriculum that respects how young children actually learn. Join the waitlist to be first in line.",
    napHeading: "Coming to Lexington",
    areaServed: ["Lexington", "Nicholasville", "Georgetown"],
    aboutHeading: "IGA is expanding into Kentucky.",
    aboutHint:
      "Location-specific paragraph goes here once the Lexington building, neighborhood context, and opening timeline are finalized. This is also where you can introduce IGA to a new state — why Kentucky, why Lexington, what makes this expansion meaningful. The page needs to rank for \"childcare Lexington KY\" and feel rooted in the city rather than imported.",
    programsEyebrow: "When the Lexington campus opens",
    programsIntro:
      "Every IGA campus serves all four age groups. We follow all state guidelines strictly, keeping class sizes small in every program.",
    waitlist: {
      heading: "Be first in line when Lexington opens.",
      body: "The Lexington campus is our first in Kentucky. Join the waitlist and we'll reach out as soon as we have an opening date and tour availability.",
    },
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
    url: `https://imaginationgroveacademy.com/locations/${loc.slug}/`,
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
        opens: "06:30",
        closes: "18:00",
      },
    ],
    areaServed: loc.areaServed.map((name) => ({ "@type": "City", name })),
    parentOrganization: {
      "@type": "Organization",
      name: "Imagination Grove Academy",
      url: "https://imaginationgroveacademy.com",
    },
  };
}

/** The four IGA programs, shown identically on every location page. */
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
