// ============================================================
// KHADANE™ — Site-wide configuration · v2.0
// ============================================================
// Backwards-compatibility shim for KHADANE v1 components.
// Re-exports SITE / NAV_ITEMS / ASSETS using the v2.0 fact values
// from lib/facts.ts. v1 components import unchanged; values reflect
// the v2.0 sealed facts (workforce 500+, no public catalogue counts, etc).
// ============================================================

import { KHADANE_SITE, KHADANE_NAV, KHADANE_ASSETS } from './site-khadane'

// Re-exported as v1-shape SITE object (preserves field names v1 components use)
export const SITE = {
  name: KHADANE_SITE.name,
  domain: KHADANE_SITE.domain,
  url: KHADANE_SITE.url,
  shortName: KHADANE_SITE.shortName,

  // Brand architecture
  groupParent: KHADANE_SITE.groupParent,
  groupOperation: KHADANE_SITE.groupOperation,
  groupAcronym: KHADANE_SITE.groupAcronym,
  exportOperation: KHADANE_SITE.exportOperation,
  exportAcronym: KHADANE_SITE.exportAcronym,

  // Locations
  origin: KHADANE_SITE.origin,
  district: KHADANE_SITE.district,
  state: KHADANE_SITE.state,
  country: KHADANE_SITE.country,
  port: KHADANE_SITE.port,

  // Foundation
  foundationYear: KHADANE_SITE.foundationYear,
  currentYear: KHADANE_SITE.currentYear,

  // Catalogue scope — INTERNAL DATA ONLY (no-counts public discipline per v2.0)
  // These fields exist for component logic (e.g. rendering the catalogue),
  // not for public claim copy. Components SHOULD NOT display these as figures.
  varietyCount: KHADANE_SITE.varietyCountInternal,
  ownedVarieties: KHADANE_SITE.ownedCountInternal,
  alliedVarieties: KHADANE_SITE.alliedCountInternal,
  formatCount: KHADANE_SITE.formatCountInternal,

  // Scale-of-reach figures (APPROVED for public claim)
  quarryCount: KHADANE_SITE.quarryCount,
  workforceCount: KHADANE_SITE.workforceCount, // 500+ (v2.0 corrected from 1,200+)
  annualOutput: KHADANE_SITE.annualOutput,
  countriesShipped: KHADANE_SITE.countriesShipped,
  continentsReached: KHADANE_SITE.continentsReached,
  bijoliaBeltYears: KHADANE_SITE.bijoliaBeltYears,

  // Contact
  contact: KHADANE_SITE.contact,

  // Parent links
  parent: KHADANE_SITE.parent,

  // Signatures
  signature: KHADANE_SITE.signature,
  tagline: KHADANE_SITE.tagline,
  hindiTag: KHADANE_SITE.hindiTag,

  // Footer
  copyright: KHADANE_SITE.copyright,
} as const

export const NAV_ITEMS = KHADANE_NAV

// ASSETS shape v1 components expect (khadane: { onLight, onDark }, mls: { mark, lockup })
export const ASSETS = {
  khadane: {
    onLight: KHADANE_ASSETS.wordmark.onLight,
    onDark: KHADANE_ASSETS.wordmark.onDark,
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
