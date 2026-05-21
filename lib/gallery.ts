// ============================================================
// KHADANE™ — Gallery Catalogue Data · v1.0
// Filterable editorial gallery with five categories
// ============================================================

export type GalleryCategory =
  | 'stone'         // Stone close-ups, swatches, surfaces, textures
  | 'quarry'        // The working face, extraction, geology
  | 'yard'          // Processing, calibration, hand-picking, loading
  | 'installation'  // Real installations, in-situ paving, walls
  | 'belt-film'     // Stills from the Belt Film (export buyer film)

export type GalleryLayoutHint = 'hero' | 'wide' | 'tall' | 'square' | 'standard'

export interface GalleryItem {
  id: string                          // GAL-001
  category: GalleryCategory
  title: string                       // Cinematic title
  caption?: string                    // Editorial caption
  varietyCode?: string                // #KHD-001 if relevant
  location?: string                   // Bijolia, etc.
  layoutHint: GalleryLayoutHint       // For mosaic positioning
  placeholderVariant:
    | 'stone'
    | 'quarry'
    | 'yard'
    | 'stone-grey'
    | 'stone-warm'
    | 'stone-red'
    | 'stone-green'
    | 'portrait'
    | 'belt'
  swapPath: string                    // Where Ankit drops the real photo
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ─── STONE CLOSE-UPS · 8 items ───
  {
    id: 'GAL-001',
    category: 'stone',
    title: 'Kandla Grey · Riven Face',
    caption: 'The natural split, captured in raking light.',
    varietyCode: '#KHD-001',
    location: 'Bhilwara District',
    layoutHint: 'hero',
    placeholderVariant: 'stone-grey',
    swapPath: '/img/gallery/stone/kandla-grey-riven.jpg',
  },
  {
    id: 'GAL-002',
    category: 'stone',
    title: 'Autumn Brown · Honed Surface',
    caption: 'Calibrated to 22mm. Surface honed to a soft matt finish.',
    varietyCode: '#KHD-002',
    location: 'Bhilwara District',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/stone/autumn-brown-honed.jpg',
  },
  {
    id: 'GAL-003',
    category: 'stone',
    title: 'Sage Green · Edge Detail',
    caption: 'The variegated landscape paving, edge-on.',
    varietyCode: '#KHD-003',
    location: 'Bundi District',
    layoutHint: 'square',
    placeholderVariant: 'stone-green',
    swapPath: '/img/gallery/stone/sage-green-edge.jpg',
  },
  {
    id: 'GAL-004',
    category: 'stone',
    title: 'Kaansiya Red · Natural Cleft',
    caption: 'The Bijolia red, photographed at the quarry.',
    varietyCode: '#KHD-012',
    location: 'Bhilwara District',
    layoutHint: 'wide',
    placeholderVariant: 'stone-red',
    swapPath: '/img/gallery/stone/kaansiya-red-cleft.jpg',
  },
  {
    id: 'GAL-005',
    category: 'stone',
    title: 'Camel Dust · Surface Grain',
    caption: 'Also marketed as Rippon Buff. The buff-tone export favourite.',
    varietyCode: '#KHD-007',
    location: 'Bhilwara District',
    layoutHint: 'standard',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/stone/camel-dust-grain.jpg',
  },
  {
    id: 'GAL-006',
    category: 'stone',
    title: 'Raveena White · Sawn',
    caption: 'A neutral white for contemporary patios.',
    varietyCode: '#KHD-006',
    location: 'Bhilwara District',
    layoutHint: 'tall',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/stone/raveena-white-sawn.jpg',
  },
  {
    id: 'GAL-007',
    category: 'stone',
    title: 'Rainbow · Banded Section',
    caption: 'Multi-colour banding from the Bijolia-Bundi belt.',
    varietyCode: '#KHD-010',
    location: 'Bhilwara + Bundi',
    layoutHint: 'square',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/stone/rainbow-banded.jpg',
  },
  {
    id: 'GAL-008',
    category: 'stone',
    title: 'Teakwood · Block Detail',
    caption: 'Sourced direct from Nagaur. Blocks-only export.',
    varietyCode: '#KHD-009',
    location: 'Nagaur District',
    layoutHint: 'wide',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/stone/teakwood-block.jpg',
  },

  // ─── QUARRY · 6 items ───
  {
    id: 'GAL-009',
    category: 'quarry',
    title: 'The Working Face',
    caption: 'Bijolia. Active extraction at dawn.',
    location: 'Bijolia, Bhilwara District',
    layoutHint: 'hero',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/quarry/working-face-dawn.jpg',
  },
  {
    id: 'GAL-010',
    category: 'quarry',
    title: 'Strata',
    caption: 'Vindhyan Supergroup, Bhander Group. The geology, written in the rock.',
    location: 'Bijolia',
    layoutHint: 'tall',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/quarry/strata-cross-section.jpg',
  },
  {
    id: 'GAL-011',
    category: 'quarry',
    title: 'Block Selection',
    caption: 'Grain consistency. Edge condition. Dimensional viability.',
    location: 'Bijolia',
    layoutHint: 'square',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/quarry/block-selection.jpg',
  },
  {
    id: 'GAL-012',
    category: 'quarry',
    title: 'The Lift',
    caption: 'Block extraction. Marked, batched, dispatched to the yard.',
    location: 'Bijolia',
    layoutHint: 'wide',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/quarry/block-lift.jpg',
  },
  {
    id: 'GAL-013',
    category: 'quarry',
    title: 'Dust Haze',
    caption: 'A working quarry. Mid-afternoon.',
    location: 'Bijolia',
    layoutHint: 'standard',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/quarry/dust-haze.jpg',
  },
  {
    id: 'GAL-014',
    category: 'quarry',
    title: 'The Far Wall',
    caption: '854 years of recorded production. Counting.',
    location: 'Bijolia',
    layoutHint: 'tall',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/quarry/far-wall.jpg',
  },

  // ─── YARD · 6 items ───
  {
    id: 'GAL-015',
    category: 'yard',
    title: 'Gangsaw Line',
    caption: 'Multi-blade gangsaw. Large-format slabs in production.',
    layoutHint: 'hero',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/yard/gangsaw-line.jpg',
  },
  {
    id: 'GAL-016',
    category: 'yard',
    title: 'Calibration',
    caption: 'Calibrated tolerance. 22mm, batch after batch.',
    layoutHint: 'wide',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/yard/calibration.jpg',
  },
  {
    id: 'GAL-017',
    category: 'yard',
    title: 'Hand-Picking',
    caption: 'Against approved samples. Every order.',
    layoutHint: 'square',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/yard/hand-picking.jpg',
  },
  {
    id: 'GAL-018',
    category: 'yard',
    title: 'Surface Finishing',
    caption: 'Fourteen finishes. Riven, honed, sandblasted, sawn, polished.',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/yard/surface-finishing.jpg',
  },
  {
    id: 'GAL-019',
    category: 'yard',
    title: 'The Crates',
    caption: 'Wooden pallets. Fumigated where required. Photographed for record.',
    layoutHint: 'standard',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/yard/crates.jpg',
  },
  {
    id: 'GAL-020',
    category: 'yard',
    title: 'Container Loading',
    caption: 'Our facility. Before transit to Mundra.',
    layoutHint: 'wide',
    placeholderVariant: 'belt',
    swapPath: '/img/gallery/yard/container-loading.jpg',
  },

  // ─── INSTALLATIONS · 7 items ───
  {
    id: 'GAL-021',
    category: 'installation',
    title: 'Kandla Grey · UK Patio',
    caption: '22mm calibrated paving. Surrey, England.',
    varietyCode: '#KHD-001',
    layoutHint: 'hero',
    placeholderVariant: 'stone-grey',
    swapPath: '/img/gallery/installation/kandla-grey-surrey.jpg',
  },
  {
    id: 'GAL-022',
    category: 'installation',
    title: 'Autumn Brown · Heritage Driveway',
    caption: 'Cobbles and setts. Cotswolds, England.',
    varietyCode: '#KHD-002',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/installation/autumn-brown-cotswolds.jpg',
  },
  {
    id: 'GAL-023',
    category: 'installation',
    title: 'Sage Green · Landscape',
    caption: 'Mixed-tone paving. Devon, England.',
    varietyCode: '#KHD-003',
    layoutHint: 'wide',
    placeholderVariant: 'stone-green',
    swapPath: '/img/gallery/installation/sage-green-devon.jpg',
  },
  {
    id: 'GAL-024',
    category: 'installation',
    title: 'Camel Dust · Commercial Plaza',
    caption: 'Public realm paving. Dubai.',
    varietyCode: '#KHD-007',
    layoutHint: 'square',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/installation/camel-dust-dubai.jpg',
  },
  {
    id: 'GAL-025',
    category: 'installation',
    title: 'Raveena White · Pool Surround',
    caption: 'Bullnose copings, neutral white paving. Côte d\'Azur.',
    varietyCode: '#KHD-006',
    layoutHint: 'wide',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/installation/raveena-white-cote-dazur.jpg',
  },
  {
    id: 'GAL-026',
    category: 'installation',
    title: 'Kaansiya Red · Heritage District',
    caption: 'Traditional flooring in vernacular setting.',
    varietyCode: '#KHD-012',
    layoutHint: 'standard',
    placeholderVariant: 'stone-red',
    swapPath: '/img/gallery/installation/kaansiya-red-heritage.jpg',
  },
  {
    id: 'GAL-027',
    category: 'installation',
    title: 'Dual Tone · Contemporary Patio',
    caption: 'Two-tone paving in a minimalist garden scheme.',
    varietyCode: '#KHD-011',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/installation/dual-tone-contemporary.jpg',
  },

  // ─── BELT FILM STILLS · 5 items ───
  {
    id: 'GAL-028',
    category: 'belt-film',
    title: 'K-001 · Establishing Shot',
    caption: 'The opening frame. 25.176° N · 75.342° E.',
    location: 'Bijolia, Rajasthan',
    layoutHint: 'hero',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/belt-film/k-001-establishing.jpg',
  },
  {
    id: 'GAL-029',
    category: 'belt-film',
    title: 'K-003 · The Workforce',
    caption: '500+ workforce. Multiple units. One direction.',
    layoutHint: 'wide',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/belt-film/k-003-workforce.jpg',
  },
  {
    id: 'GAL-030',
    category: 'belt-film',
    title: 'K-005 · Geological Cross-Section',
    caption: 'Vindhyan Supergroup. Bhander Group. The geology, in frame.',
    layoutHint: 'square',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/belt-film/k-005-geology.jpg',
  },
  {
    id: 'GAL-031',
    category: 'belt-film',
    title: 'K-007 · The Container',
    caption: 'Loaded at the yard. Bound for Mundra.',
    layoutHint: 'tall',
    placeholderVariant: 'belt',
    swapPath: '/img/gallery/belt-film/k-007-container.jpg',
  },
  {
    id: 'GAL-032',
    category: 'belt-film',
    title: 'K-009 · Closing Frame',
    caption: 'Bijolia · Rajasthan · Since 1972.',
    layoutHint: 'wide',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/belt-film/k-009-closing.jpg',
  },
]

export const GALLERY_CATEGORIES: { value: GalleryCategory | 'all'; label: string; description: string }[] = [
  { value: 'all', label: 'All', description: 'The full gallery, every category.' },
  { value: 'stone', label: 'Stone', description: 'Close-ups, swatches, surfaces, grain.' },
  { value: 'quarry', label: 'The Quarry', description: 'The working face. Extraction. Geology.' },
  { value: 'yard', label: 'The Yard', description: 'Processing. Calibration. Loading.' },
  { value: 'installation', label: 'Installations', description: 'Real projects, in-situ.' },
  { value: 'belt-film', label: 'Belt Film', description: 'Stills from the 2:25 export buyer film.' },
]

export function getItemsByCategory(category: GalleryCategory | 'all'): GalleryItem[] {
  if (category === 'all') return GALLERY_ITEMS
  return GALLERY_ITEMS.filter((item) => item.category === category)
}
