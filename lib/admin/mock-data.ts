/**
 * MLS Group Command Centre — preview mock data.
 * Grounded in public facts from lib/facts.ts; financials are illustrative only.
 */

import {
  ENTITIES,
  FOUNDING,
  KHADANE_SCALE,
  MLS_SCALE,
  VERTICALS,
  LOCATIONS,
  FAMILY,
} from '@/lib/facts'

export const ADMIN_PREVIEW = {
  label: 'Preview mode',
  banner:
    'Illustrative command centre for Mohan Lal & Sons. Metrics are demo data for design review — not live operational figures.',
  lastSynced: '2026-07-13T09:42:00+05:30',
  operator: {
    name: 'Rahul Dhakar',
    role: 'Group Principal',
    initials: 'RD',
    location: 'Bijolia · Kota',
  },
} as const

export const GROUP_KPIS = [
  {
    id: 'revenue',
    label: 'Group revenue (FY)',
    value: '₹428.6 Cr',
    delta: '+12.4%',
    trend: 'up' as const,
    sub: 'vs prior year · illustrative',
    accent: 'gold',
  },
  {
    id: 'export',
    label: 'Export markets',
    value: KHADANE_SCALE.countries,
    delta: '4 continents',
    trend: 'up' as const,
    sub: `${KHADANE_SCALE.annualOutput} annual stone output`,
    accent: 'ink',
  },
  {
    id: 'workforce',
    label: 'Group workforce',
    value: MLS_SCALE.groupWorkforce,
    delta: `${MLS_SCALE.familyMembers} family`,
    trend: 'neutral' as const,
    sub: `${FOUNDING.generations} · since ${FOUNDING.groupYear}`,
    accent: 'tobacco',
  },
  {
    id: 'verticals',
    label: 'Operating verticals',
    value: String(MLS_SCALE.verticals),
    delta: MLS_SCALE.verticalsDisplay,
    trend: 'neutral' as const,
    sub: 'One family enterprise',
    accent: 'rust',
  },
  {
    id: 'housing',
    label: 'Student beds',
    value: MLS_SCALE.studentHousingTotal,
    delta: 'Kota campus',
    trend: 'up' as const,
    sub: 'Girls + boys residences',
    accent: 'gold',
  },
  {
    id: 'meals',
    label: 'Daily meals (Vyanjanam)',
    value: '1,000+',
    delta: '500+ students',
    trend: 'up' as const,
    sub: 'Food services vertical',
    accent: 'ink',
  },
] as const

export const REVENUE_SERIES = [
  { month: 'Aug', stone: 18.2, hospitality: 4.1, housing: 3.8, food: 2.4, auto: 5.6 },
  { month: 'Sep', stone: 19.4, hospitality: 4.3, housing: 3.9, food: 2.5, auto: 5.8 },
  { month: 'Oct', stone: 21.1, hospitality: 4.8, housing: 4.0, food: 2.7, auto: 6.1 },
  { month: 'Nov', stone: 22.6, hospitality: 5.2, housing: 4.1, food: 2.8, auto: 6.4 },
  { month: 'Dec', stone: 24.0, hospitality: 5.9, housing: 4.2, food: 3.0, auto: 6.8 },
  { month: 'Jan', stone: 23.4, hospitality: 5.1, housing: 4.3, food: 2.9, auto: 6.5 },
  { month: 'Feb', stone: 25.2, hospitality: 5.4, housing: 4.4, food: 3.1, auto: 6.9 },
  { month: 'Mar', stone: 26.8, hospitality: 5.7, housing: 4.5, food: 3.2, auto: 7.2 },
  { month: 'Apr', stone: 27.5, hospitality: 5.5, housing: 4.6, food: 3.3, auto: 7.0 },
  { month: 'May', stone: 28.1, hospitality: 5.3, housing: 4.7, food: 3.4, auto: 7.1 },
  { month: 'Jun', stone: 29.4, hospitality: 5.6, housing: 4.8, food: 3.5, auto: 7.3 },
  { month: 'Jul', stone: 30.2, hospitality: 5.8, housing: 4.9, food: 3.6, auto: 7.5 },
] as const

export const VERTICAL_PERFORMANCE = VERTICALS.map((v, i) => {
  const metrics = [
    {
      revenue: '₹248.4 Cr',
      share: 58,
      status: 'On track',
      statusTone: 'good' as const,
      sites: `${KHADANE_SCALE.quarries} quarries`,
      headcount: KHADANE_SCALE.workforce,
      highlight: KHADANE_SCALE.annualOutput,
      region: 'Rajasthan · Mundra · 20+ countries',
    },
    {
      revenue: '₹62.1 Cr',
      share: 14.5,
      status: 'Stable',
      statusTone: 'good' as const,
      sites: `${MLS_SCALE.dharnidharStations} · Dabi workshop`,
      headcount: '180+',
      highlight: `Since ${MLS_SCALE.dhakarMotorsOpened}`,
      region: LOCATIONS.dhakarMotorsLocation,
    },
    {
      revenue: '₹41.8 Cr',
      share: 9.8,
      status: 'Growing',
      statusTone: 'good' as const,
      sites: 'M3 Hotel + Mini Mall',
      headcount: '95+',
      highlight: `${MLS_SCALE.m3Rooms} · Opened ${MLS_SCALE.m3Opened}`,
      region: 'Kunhari, Kota',
    },
    {
      revenue: '₹48.6 Cr',
      share: 11.3,
      status: 'On track',
      statusTone: 'good' as const,
      sites: '2 girls campuses · 3 boys PGs',
      headcount: '120+',
      highlight: MLS_SCALE.studentHousingTotal,
      region: 'Kunhari campus · Kota',
    },
    {
      revenue: '₹27.7 Cr',
      share: 6.4,
      status: 'Watch',
      statusTone: 'warn' as const,
      sites: 'Vyanjanam · Divine Dining',
      headcount: '140+',
      highlight: MLS_SCALE.vyanjanamDailyMeals,
      region: 'Kota · Bijolia dairy chain',
    },
  ][i]!

  return {
    ...v,
    ...metrics,
  }
})

export const GLOBAL_MARKETS = [
  { region: 'United Kingdom', orders: 42, volume: '186k m²', share: 22, flag: '🇬🇧' },
  { region: 'United States', orders: 28, volume: '124k m²', share: 15, flag: '🇺🇸' },
  { region: 'Middle East', orders: 36, volume: '158k m²', share: 18, flag: '🇦🇪' },
  { region: 'Europe (ex-UK)', orders: 31, volume: '142k m²', share: 16, flag: '🇪🇺' },
  { region: 'Australia & NZ', orders: 18, volume: '78k m²', share: 9, flag: '🇦🇺' },
  { region: 'Southeast Asia', orders: 22, volume: '96k m²', share: 11, flag: '🇸🇬' },
  { region: 'India domestic', orders: 54, volume: '210k m²', share: 9, flag: '🇮🇳' },
] as const

export const SHIPMENTS = [
  {
    id: 'SH-2607-0184',
    destination: 'Felixstowe, UK',
    variety: 'Kandla Grey · Paving',
    status: 'In transit',
    eta: '28 Jul 2026',
    volume: '2,400 m²',
    port: KHADANE_SCALE.port,
  },
  {
    id: 'SH-2607-0179',
    destination: 'Jebel Ali, UAE',
    variety: 'Autumn Brown · Slabs',
    status: 'Loading',
    eta: '18 Jul 2026',
    volume: '1,850 m²',
    port: KHADANE_SCALE.port,
  },
  {
    id: 'SH-2607-0171',
    destination: 'Rotterdam, NL',
    variety: 'Sage Green · Tiles',
    status: 'Cleared customs',
    eta: '12 Jul 2026',
    volume: '3,120 m²',
    port: KHADANE_SCALE.port,
  },
  {
    id: 'SH-2607-0162',
    destination: 'Sydney, AU',
    variety: 'Raveena White · Cladding',
    status: 'Delivered',
    eta: '04 Jul 2026',
    volume: '980 m²',
    port: KHADANE_SCALE.port,
  },
  {
    id: 'SH-2607-0155',
    destination: 'Houston, US',
    variety: 'Raj Blend · Cobbles',
    status: 'In transit',
    eta: '02 Aug 2026',
    volume: '1,640 m²',
    port: KHADANE_SCALE.port,
  },
] as const

export const ENQUIRIES = [
  {
    id: 'ENQ-MLS-88421',
    name: 'Harper Stone Ltd',
    market: 'United Kingdom',
    vertical: 'Stone & Export',
    subject: 'Kandla Grey 600×900 calibrated paving — 3 containers',
    status: 'New',
    priority: 'high' as const,
    received: '13 Jul · 08:14 IST',
    owner: 'Export desk',
  },
  {
    id: 'ENQ-MLS-88418',
    name: 'Allen Career — Parent liaison',
    market: 'Kota',
    vertical: 'Student Housing',
    subject: 'Victoria Palace — twin occupancy for NEET session',
    status: 'In review',
    priority: 'medium' as const,
    received: '12 Jul · 19:42 IST',
    owner: 'Housing desk',
  },
  {
    id: 'ENQ-MLS-88412',
    name: 'Desert Pearl Contracting',
    market: 'UAE',
    vertical: 'Stone & Export',
    subject: 'Gangsaw slabs — Autumn Brown, 5cm, CIF Jebel Ali',
    status: 'Quoted',
    priority: 'high' as const,
    received: '12 Jul · 11:05 IST',
    owner: 'Export desk',
  },
  {
    id: 'ENQ-MLS-88405',
    name: 'Corporate retreat — Jaipur',
    market: 'India',
    vertical: 'Hospitality',
    subject: 'M3 Boutique — 22 rooms, 3 nights, conference day',
    status: 'Won',
    priority: 'medium' as const,
    received: '11 Jul · 16:20 IST',
    owner: 'M3 front office',
  },
  {
    id: 'ENQ-MLS-88397',
    name: 'Fleet operator — Bundi corridor',
    market: 'Rajasthan',
    vertical: 'Automotive & Fuel',
    subject: 'Commercial service package + bulk fuel account',
    status: 'In review',
    priority: 'low' as const,
    received: '11 Jul · 09:33 IST',
    owner: 'Dhakar Motors',
  },
  {
    id: 'ENQ-MLS-88391',
    name: 'Campus mess tender',
    market: 'Kota',
    vertical: 'Food Services',
    subject: 'Vyanjanam capacity for 180 additional evening meals',
    status: 'New',
    priority: 'medium' as const,
    received: '10 Jul · 21:10 IST',
    owner: 'Divine Food Services',
  },
] as const

export const TEAM_ACTIVITY = [
  {
    id: 1,
    actor: 'Export desk',
    action: 'Issued proforma for ENQ-MLS-88412',
    time: '42 min ago',
    type: 'quote' as const,
  },
  {
    id: 2,
    actor: 'Yard operations',
    action: 'Container SH-2607-0179 sealed at Mundra staging',
    time: '1.5 h ago',
    type: 'ops' as const,
  },
  {
    id: 3,
    actor: 'Housing desk',
    action: 'Victoria Palace occupancy updated — 94%',
    time: '3 h ago',
    type: 'ops' as const,
  },
  {
    id: 4,
    actor: 'M3 Boutique',
    action: 'July ADR closed 8.2% above forecast',
    time: '5 h ago',
    type: 'finance' as const,
  },
  {
    id: 5,
    actor: 'Group principal',
    action: 'Approved CSR allocation — Bijolia school wing',
    time: 'Yesterday',
    type: 'governance' as const,
  },
  {
    id: 6,
    actor: 'Vyanjanam kitchen',
    action: 'Dairy intake logged from Bijolia farm chain',
    time: 'Yesterday',
    type: 'ops' as const,
  },
] as const

export const SITES = [
  {
    name: 'Bijolia HQ & quarries',
    role: LOCATIONS.bijolia.role,
    coords: LOCATIONS.bijolia.coords,
    status: 'Operational',
    people: '620+',
    focus: 'Stone · dairy · fuels · family base',
  },
  {
    name: 'Kunhari campus (Kota)',
    role: LOCATIONS.kunhari,
    coords: LOCATIONS.kota.coords,
    status: 'Operational',
    people: '280+',
    focus: 'Housing · hotel · food · mini mall',
  },
  {
    name: 'Dhakar Motors (Dabi)',
    role: LOCATIONS.dhakarMotorsLocation,
    coords: '25°26′N · 75°38′E',
    status: 'Operational',
    people: '90+',
    focus: 'Automotive service',
  },
  {
    name: 'Dharnidhar Fuels',
    role: LOCATIONS.dharnidharFuelsLocation,
    coords: 'NH-27 corridor',
    status: 'Operational',
    people: '40+',
    focus: 'Retail fuel · two stations',
  },
  {
    name: 'Mundra port corridor',
    role: LOCATIONS.mundra.role,
    coords: LOCATIONS.mundra.coords,
    status: 'Active shipping',
    people: 'Field team',
    focus: 'KHADANE export loading',
  },
] as const

export const FINANCE_SNAPSHOT = {
  fyLabel: 'FY 2025–26 (illustrative)',
  cashPosition: '₹38.4 Cr',
  receivables: '₹22.1 Cr',
  payables: '₹14.6 Cr',
  capexYtd: '₹11.2 Cr',
  ebitdaMargin: '18.6%',
  exportMix: '61%',
  domesticMix: '39%',
  debtEquity: '0.28×',
  costCentres: [
    { name: 'Stone & Export', budget: 186, spent: 142, pct: 76 },
    { name: 'Hospitality', budget: 28, spent: 19, pct: 68 },
    { name: 'Student Housing', budget: 24, spent: 17, pct: 71 },
    { name: 'Food Services', budget: 18, spent: 14, pct: 78 },
    { name: 'Automotive & Fuel', budget: 32, spent: 24, pct: 75 },
    { name: 'Group overhead', budget: 12, spent: 8, pct: 67 },
  ],
} as const

export const PEOPLE_SNAPSHOT = {
  total: MLS_SCALE.groupWorkforce,
  family: MLS_SCALE.familyMembers,
  generations: FOUNDING.generations,
  attrition: '4.8%',
  openRoles: 14,
  trainingHours: '2,840',
  departments: [
    { name: 'Quarry & yard', headcount: 420, fill: 88 },
    { name: 'Export & logistics', headcount: 85, fill: 72 },
    { name: 'Hospitality', headcount: 95, fill: 64 },
    { name: 'Student housing', headcount: 120, fill: 70 },
    { name: 'Food services', headcount: 140, fill: 78 },
    { name: 'Automotive & fuel', headcount: 180, fill: 82 },
    { name: 'Corporate & finance', headcount: 45, fill: 55 },
  ],
  leadership: FAMILY.slice(0, 6).map((m) => ({
    name: m.name,
    role: m.mlsRole,
    generation: m.generation,
  })),
}

export const ALERTS = [
  {
    id: 'a1',
    level: 'critical' as const,
    title: 'Monsoon contingency — Bijolia yard',
    body: 'Rainfall advisory active. Covered stock rotation scheduled for 14 Jul.',
  },
  {
    id: 'a2',
    level: 'info' as const,
    title: 'New buyer onboarding — UK',
    body: 'Harper Stone Ltd credit check complete. Desk ready to quote.',
  },
  {
    id: 'a3',
    level: 'warn' as const,
    title: 'Occupancy spike — The Princess',
    body: 'Waitlist at 28 for August NEET cycle. Overflow protocol draft ready.',
  },
] as const

export const NAV_ITEMS = [
  { id: 'overview', label: 'Command centre', icon: 'LayoutDashboard' },
  { id: 'verticals', label: 'Verticals', icon: 'Layers' },
  { id: 'global', label: 'Global operations', icon: 'Globe2' },
  { id: 'enquiries', label: 'Enquiries CRM', icon: 'Inbox' },
  { id: 'finance', label: 'Finance', icon: 'Wallet' },
  { id: 'people', label: 'People', icon: 'Users' },
  { id: 'sites', label: 'Sites & assets', icon: 'MapPin' },
  { id: 'governance', label: 'Governance', icon: 'Shield' },
] as const

export type AdminView = (typeof NAV_ITEMS)[number]['id']

export const ENTITY_STRIP = [
  ENTITIES.group.name,
  ENTITIES.khadane.name,
  ENTITIES.m3.hotel,
  ENTITIES.vyanjanam.brand,
  ENTITIES.dhakarMotors,
  ENTITIES.dharnidharFuels,
] as const
