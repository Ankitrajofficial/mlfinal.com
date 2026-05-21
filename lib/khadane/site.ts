// ============================================================
// KHADANE™ — Site-wide configuration · v1.0 locked
// ============================================================

export const SITE = {
  name: 'KHADANE™',
  domain: 'khadane.com',
  url: 'https://khadane.com',
  shortName: 'KHADANE',

  // Brand architecture
  groupParent: 'Mohan Lal & Sons',
  groupOperation: 'Dhakar Stones Group',
  groupAcronym: 'DSG',
  exportOperation: 'Dhakar Stone Impex',
  exportAcronym: 'DSI',

  // Locations
  origin: 'Bijolia',
  district: 'Bhilwara District',
  state: 'Rajasthan',
  country: 'India',
  port: 'Mundra',

  // Foundation
  foundationYear: 1972,
  currentYear: 2026,

  // Catalogue scope
  varietyCount: 21,
  ownedVarieties: 12,
  alliedVarieties: 9,
  formatCount: 14,
  quarryCount: '100+',
  workforceCount: '500+',
  annualOutput: 'Over 2 million sq.m',
  bijoliaBeltYears: 854,

  // Contact
  contact: {
    publicEmail: 'exports@khadane.com',
    publicPhone: '+91 98285 71143',
    whatsappNumber: '919828571143',
    whatsappUrl: 'https://wa.me/919828571143',
    hours: 'Monday–Saturday · 10:00–18:00 IST',
  },

  // Parent links
  parent: {
    site: 'https://mohanlalsonsgroup.com',
    email: 'exports@mohanlalsonsgroup.com',
  },

  // Brand whisper signature
  signature: 'The sandstone catalogue of Dhakar Stones Group. Bijolia, Rajasthan. Since 1972.',
  tagline: 'Quarried with pride in Bijolia, Rajasthan.',
  hindiTag: 'खदान — The Quarry',

  // Footer copyright
  copyright: '© 1972–2026 KHADANE™ · A Dhakar Stones Group operation',
} as const

export const NAV_ITEMS = [
  { href: '/collection', label: 'Collection' },
  { href: '/formats', label: 'Formats' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/quarry', label: 'The Quarry' },
  { href: '/yard', label: 'The Yard' },
  { href: '/desk', label: 'The Desk' },
  { href: '/field-notes', label: 'Field Notes' },
  { href: '/group', label: 'The Group' },
] as const

// Brand asset path helpers — always returns transparent variants
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
