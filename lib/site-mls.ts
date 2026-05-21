import { ENTITIES, FOUNDING, CONTACT, CROSS_LINKS } from './facts'

/**
 * MLS site configuration.
 * All values that touch a fact import from lib/facts.ts (single source of truth).
 */

export const MLS_SITE = {
  name: ENTITIES.group.name,
  domain: 'mohanlalsonsgroup.com',
  url: process.env.NEXT_PUBLIC_MLS_URL ?? 'https://mohanlalsonsgroup.com',
  acronym: ENTITIES.group.acronym,
  tagline: 'A working group, since 1972.',
  description:
    'Mohan Lal & Sons (MLS) — five verticals operated by the Dhakar family from Bijolia, Rajasthan, since 1972. Stone & Export (KHADANE™), Automotive & Fuel, Hospitality, Student Housing, Food Services.',
  founded: FOUNDING.groupYear,
  copyright: `© ${FOUNDING.groupYear}–${FOUNDING.currentYear} Mohan Lal & Sons · ${ENTITIES.footerSignature}`,

  parentLink: {
    label: 'KHADANE™ — Stone & Export',
    href: '/khadane',
    description: CROSS_LINKS.mlsToKhadane,
  },

  contact: {
    email: CONTACT.officeMLS,
    phone: CONTACT.groupMain,
    whatsapp: CONTACT.whatsappUrl,
    hours: CONTACT.hours,
    sla: CONTACT.slaStandard,
  },
} as const

// Nav structure (locked from briefing)
export const MLS_NAV = [
  { href: '/', label: 'Home' },
  {
    href: '/our-legacy',
    label: 'The Legacy',
    children: [
      { href: '/our-legacy', label: 'Our Legacy' },
      { href: '/csr', label: 'CSR' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    href: '/verticals',
    label: 'Ventures',
    children: [
      { href: '/khadane', label: 'Stone & Export' },
      { href: '/verticals/automotive-fuel', label: 'Automotive & Fuel' },
      { href: '/verticals/hospitality', label: 'Hospitality' },
      { href: '/verticals/student-housing', label: 'Student Housing' },
      { href: '/verticals/food-services', label: 'Food Services' },
    ],
  },
  {
    href: '/khadane',
    label: 'KHADANE™',
  },
  {
    href: '/resources',
    label: 'Resources',
    children: [
      { href: '/resources/blog', label: 'Blog' },
      { href: '/resources/catalogues', label: 'Catalogues' },
      { href: '/resources/press', label: 'Press' },
      { href: '/resources/brochures', label: 'Brochures' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'The Office' },
] as const

// Brand asset paths (per the locked KHADANE v1 asset bundle structure)
export const MLS_ASSETS = {
  mark: {
    onLight: '/brand/mls/MLS_mark_05_transparent_on_light.svg',
    onDark: '/brand/mls/MLS_mark_04_transparent_on_dark.svg',
    canonical: '/brand/mls/MLS_mark_canonical.svg',
  },
  lockup: {
    onLight: '/brand/mls/MLS_lockup_05_transparent_on_light.svg',
    onDark: '/brand/mls/MLS_lockup_04_transparent_on_dark.svg',
    cream: '/brand/mls/MLS_lockup_03_cream.svg',
    dark: '/brand/mls/MLS_lockup_01_dark.svg',
    tobacco: '/brand/mls/MLS_lockup_02_tobacco.svg',
  },
} as const

// Vertical hero video.
export const MLS_HERO_VIDEO = '/videos/home-hero.mp4'
