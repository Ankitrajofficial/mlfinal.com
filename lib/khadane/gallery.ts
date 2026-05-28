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
    varietyCode: 'KHD-O-02',
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
    varietyCode: 'KHD-O-03',
    location: 'Bhilwara District',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/stone/autumn-brown-honed.jpg',
  },
  {
    id: 'GAL-003',
    category: 'stone',
    title: 'Garda Green · Edge Detail',
    caption: 'The variegated landscape paving, edge-on.',
    varietyCode: 'KHD-O-05',
    location: 'Bundi District',
    layoutHint: 'square',
    placeholderVariant: 'stone-green',
    swapPath: '/img/gallery/stone/garda-green-edge.jpg',
  },
  {
    id: 'GAL-004',
    category: 'stone',
    title: 'Red Choco · Natural Cleft',
    caption: 'The deep cocoa-red Bijolia stone, photographed at the quarry.',
    varietyCode: 'KHD-O-11',
    location: 'Bhilwara District',
    layoutHint: 'wide',
    placeholderVariant: 'stone-red',
    swapPath: '/img/varieties/red-choco/slab-face.jpg',
  },
  {
    id: 'GAL-005',
    category: 'stone',
    title: 'Camel Dust · Surface Grain',
    caption: 'Also marketed as Rippon Buff. The buff-tone export favourite.',
    varietyCode: 'KHD-O-10',
    location: 'Bhilwara District',
    layoutHint: 'standard',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/varieties/camel-dust/slab-face.jpg',
  },
  {
    id: 'GAL-006',
    category: 'stone',
    title: 'Buff · Sawn',
    caption: 'A pale yellow-beige from the Bhooti block and wider Bijolia tehsil.',
    varietyCode: 'KHD-O-09',
    location: 'Bhilwara District',
    layoutHint: 'tall',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/varieties/buff/slab-face.jpg',
  },
  {
    id: 'GAL-007',
    category: 'stone',
    title: 'Multi Colours · Banded Section',
    caption: 'Full-spectrum variegation from the Bijolia belt.',
    varietyCode: 'KHD-O-14',
    location: 'Bhilwara + Bundi',
    layoutHint: 'square',
    placeholderVariant: 'stone',
    swapPath: '/img/varieties/multi-colours/slab-face.jpg',
  },
  {
    id: 'GAL-008',
    category: 'stone',
    title: 'Teakwood · Block Detail',
    caption: 'Sourced direct from Nagaur. Blocks-only export.',
    varietyCode: 'KHD-A-09',
    location: 'Nagaur District',
    layoutHint: 'wide',
    placeholderVariant: 'stone',
    swapPath: '/img/varieties/teakwood/slab-face.jpg',
  },

  // ─── QUARRY · 6 items ─── (Drive: KHADANE CORPORATION / Aerials + Quarry)
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
    caption: 'Eleven treatments. Riven, honed, sandblasted, sawn, brushed.',
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
    varietyCode: 'KHD-O-02',
    layoutHint: 'hero',
    placeholderVariant: 'stone-grey',
    swapPath: '/img/gallery/installation/kandla-grey-surrey.jpg',
  },
  {
    id: 'GAL-022',
    category: 'installation',
    title: 'Autumn Brown · Heritage Driveway',
    caption: 'Cobbles and setts. Cotswolds, England.',
    varietyCode: 'KHD-O-03',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/gallery/installation/autumn-brown-cotswolds.jpg',
  },
  {
    id: 'GAL-023',
    category: 'installation',
    title: 'Garda Green · Landscape',
    caption: 'Mixed-tone paving. Devon, England.',
    varietyCode: 'KHD-O-05',
    layoutHint: 'wide',
    placeholderVariant: 'stone-green',
    swapPath: '/img/gallery/installation/garda-green-devon.jpg',
  },
  {
    id: 'GAL-024',
    category: 'installation',
    title: 'Camel Dust · Commercial Plaza',
    caption: 'Public realm paving. Dubai.',
    varietyCode: 'KHD-O-10',
    layoutHint: 'square',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/varieties/camel-dust-hero.jpg',
  },
  {
    id: 'GAL-025',
    category: 'installation',
    title: 'Buff · Pool Surround',
    caption: 'Bullnose copings, pale beige paving. Côte d\'Azur.',
    varietyCode: 'KHD-O-09',
    layoutHint: 'wide',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/varieties/buff-hero.jpg',
  },
  {
    id: 'GAL-026',
    category: 'installation',
    title: 'Red Choco · Heritage District',
    caption: 'Traditional flooring in vernacular setting.',
    varietyCode: 'KHD-O-11',
    layoutHint: 'standard',
    placeholderVariant: 'stone-red',
    swapPath: '/img/varieties/red-choco-hero.jpg',
  },
  {
    id: 'GAL-027',
    category: 'installation',
    title: 'Dual Tone · Contemporary Patio',
    caption: 'Two-tone paving in a minimalist garden scheme.',
    varietyCode: 'KHD-O-12',
    layoutHint: 'tall',
    placeholderVariant: 'stone',
    swapPath: '/img/varieties/dual-tone-hero.jpg',
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
    swapPath: '/img/gallery/quarry/working-face-dawn.jpg',
  },
  {
    id: 'GAL-029',
    category: 'belt-film',
    title: 'K-003 · The Workforce',
    caption: '500+ workforce. Three units. One direction.',
    layoutHint: 'wide',
    placeholderVariant: 'yard',
    swapPath: '/img/gallery/yard/hand-picking.jpg',
  },
  {
    id: 'GAL-030',
    category: 'belt-film',
    title: 'K-005 · Geological Cross-Section',
    caption: 'Vindhyan Supergroup. Bhander Group. The geology, in frame.',
    layoutHint: 'square',
    placeholderVariant: 'stone-warm',
    swapPath: '/img/gallery/quarry/strata-cross-section.jpg',
  },
  {
    id: 'GAL-031',
    category: 'belt-film',
    title: 'K-007 · The Container',
    caption: 'Loaded at the yard. Bound for Mundra.',
    layoutHint: 'tall',
    placeholderVariant: 'belt',
    swapPath: '/img/gallery/yard/container-loading.jpg',
  },
  {
    id: 'GAL-032',
    category: 'belt-film',
    title: 'K-009 · Closing Frame',
    caption: 'Bijolia · Rajasthan · Since 1972.',
    layoutHint: 'wide',
    placeholderVariant: 'quarry',
    swapPath: '/img/gallery/quarry/far-wall.jpg',
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
