import { ENTITIES, FOUNDING, KHADANE_SCALE, CONTACT, CROSS_LINKS } from './facts'

/**
 * KHADANE™ site configuration.
 * Preserves v1 site structure; updated v2.0 fields pulled from FACTS.
 */

export const KHADANE_SITE = {
  name: ENTITIES.khadane.name,
  domain: 'khadane.com',
  url: process.env.NEXT_PUBLIC_KHADANE_URL ?? 'https://khadane.com',
  shortName: ENTITIES.khadane.short,

  // Brand architecture
  groupParent: ENTITIES.group.name,
  groupOperation: ENTITIES.dsg.name,
  groupAcronym: ENTITIES.dsg.acronym,
  exportOperation: ENTITIES.dsi.name,
  exportAcronym: ENTITIES.dsi.acronym,

  // Locations
  origin: 'Bijolia',
  district: 'Bhilwara District',
  state: 'Rajasthan',
  country: 'India',
  port: KHADANE_SCALE.port, // Mundra

  // Foundation
  foundationYear: FOUNDING.groupYear,
  currentYear: FOUNDING.currentYear,

  // Catalogue scope — internal data, NOT publicly claimed (per v2.0 no-counts discipline)
  varietyCountInternal: KHADANE_SCALE.internalVarietyCount,
  ownedCountInternal: KHADANE_SCALE.internalOwnedCount,
  alliedCountInternal: KHADANE_SCALE.internalAlliedCount,
  formatCountInternal: KHADANE_SCALE.internalFormatCount,

  // Public-claim figures (scale-of-reach, approved)
  quarryCount: KHADANE_SCALE.quarries,
  workforceCount: KHADANE_SCALE.workforce, // 500+ (corrected v2.0 from 1,200+)
  annualOutput: KHADANE_SCALE.annualOutput,
  countriesShipped: KHADANE_SCALE.countries,
  continentsReached: KHADANE_SCALE.continents,
  bijoliaBeltYears: FOUNDING.bijoliaInscriptionsYears,
  processingPhrase: KHADANE_SCALE.publicProcessingPhrase,

  // Contact
  contact: {
    publicEmail: CONTACT.exportsKhadane,
    publicPhone: CONTACT.groupMain,
    whatsappNumber: CONTACT.whatsapp,
    whatsappUrl: CONTACT.whatsappUrl,
    hours: CONTACT.hoursKhadane,
  },

  // Parent links
  parent: {
    site: 'https://mohanlalsonsgroup.com',
    email: CONTACT.exportsMLSFallback,
    description: CROSS_LINKS.khadaneToMls,
  },

  // Brand whisper signature
  signature: `The sandstone catalogue of ${ENTITIES.dsg.name}. Bijolia, Rajasthan. Since ${FOUNDING.groupYear}.`,
  tagline: 'Quarried with pride in Bijolia, Rajasthan.',
  hindiTag: 'खदान — The Quarry',

  // Footer
  copyright: `© ${FOUNDING.groupYear}–${FOUNDING.currentYear} ${ENTITIES.khadane.name} · A ${ENTITIES.dsg.name} operation`,
} as const

export const KHADANE_NAV = [
  { href: '/collection', label: 'Collection' },
  { href: '/formats', label: 'Formats' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/quarry', label: 'The Quarry' },
  { href: '/yard', label: 'The Yard' },
  { href: '/desk', label: 'The Desk' },
  { href: '/field-notes', label: 'Field Notes' },
  { href: '/group', label: 'The Group' },
] as const

// Brand asset paths (preserved from v1)
export const KHADANE_ASSETS = {
  wordmark: {
    onLight: '/brand/khadane/KHADANE_04_transparent_on_light.svg',
    onDark: '/brand/khadane/KHADANE_05_transparent_on_dark.svg',
    stoneLinen: '/brand/khadane/KHADANE_01_stone_linen.svg',
    obsidianDark: '/brand/khadane/KHADANE_02_obsidian_dark.svg',
    pureWhite: '/brand/khadane/KHADANE_03_pure_white.svg',
    tobacco: '/brand/khadane/KHADANE_06_tobacco.svg',
    warmWhite: '/brand/khadane/KHADANE_07_warm_white.svg',
  },
} as const
