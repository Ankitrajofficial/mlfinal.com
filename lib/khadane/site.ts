// ============================================================
// KHADANE(TM) - Site-wide configuration
// Source: update.md
// ============================================================

export const SITE = {
  name: "KHADANE™",
  domain: "khadane.com",
  url: "https://khadane.com",
  shortName: "KHADANE",

  groupParent: "Mohan Lal & Sons",
  groupOperation: "Dhakar Stones Group (DSG)",
  groupAcronym: 'DSG',
  exportOperation: "Dhakar Stone Impex (DSI)",
  exportAcronym: 'DSI',

  origin: "Bijolia",
  district: 'Bhilwara District',
  state: 'Rajasthan',
  country: 'India',
  port: "Mundra",

  foundationYear: 1972,
  currentYear: 2026,

  varietyCount: 23,
  ownedVarieties: 14,
  alliedVarieties: 9,
  formatCount: 19,
  surfaceTreatmentCount: 11,
  edgeProfileCount: 4,
  quarryCount: '100+',
  workforceCount: '500+',
  annualOutput: 'Over 2 million sq.m',
  countriesShipped: '20+',
  continentsReached: '4',
  bijoliaBeltYears: 854,

  contact: {
    publicEmail: "exports@khadane.com",
    publicPhone: "+91 98285 71143",
    whatsappNumber: '919828571143',
    whatsappUrl: 'https://wa.me/919828571143',
    hours: "Monday–Saturday, 09:00–18:00 IST",
  },

  parent: {
    site: 'https://mohanlalsonsgroup.com',
    email: 'exports@mohanlalsonsgroup.com',
    description: "Part of Mohan Lal & Sons — the operating group behind KHADANE™. Five verticals. One family. Since 1972.",
  },

  signature: "The sandstone catalogue of Dhakar Stones Group. Bijolia, Rajasthan. Since 1972.",
  tagline: "Quarried with pride in Bijolia, Rajasthan.",
  hindiTag: "खदान — The Quarry",
  copyright: "© 1972–2026 KHADANE™ · A Dhakar Stones Group operation",
} as const

export const NAV_ITEMS = [
  {
    "label": "Collection",
    "href": "/collection"
  },
  {
    "label": "Formats",
    "href": "/formats"
  },
  {
    "label": "The Quarry",
    "href": "/quarry"
  },
  {
    "label": "The Yard",
    "href": "/yard"
  },
  {
    "label": "Field Notes",
    "href": "/field-notes"
  },
  {
    "label": "The Group",
    "href": "/group"
  },
  {
    "label": "Gallery",
    "href": "/gallery"
  }
] as const

export const ASSETS = {
  khadane: {
    onLight: '/brand/khadane/KHADANE_04_transparent_on_light.svg',
    onDark: '/brand/khadane/KHADANE_05_transparent_on_dark.svg',
  },
  mls: {
    mark: {
      onLight: '/brand/mls/MLS_mark_05_transparent_on_light.svg',
      onDark: '/brand/mls/MLS_mark_04_transparent_on_dark.svg',
    },
    lockup: {
      onLight: '/brand/mls/MLS_lockup_05_transparent_on_light.svg',
      onDark: '/brand/mls/MLS_lockup_04_transparent_on_dark.svg',
    },
  },
} as const
