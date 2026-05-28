// ============================================================
// KHADANE(TM) - Variety Catalogue Data
// Source: update.md
// 23 varieties: 14 owned + 9 allied
// ============================================================

export type Tier = 'owned' | 'allied'

export interface Variety {
  code: string
  rank: number
  slug: string
  name: string
  nameHindi: string
  tier: Tier
  tierLabel: string
  district: string
  primaryLocation: string
  additionalLocations?: string
  quarryNetworkNote?: string
  formation: string
  tradeNames: string
  oneLine: string
  inHandHeadline: string
  formatScope: string
  formatExceptions?: string[]
  placeholderClass: string
  alliedRelationship?: string
  alternateNames?: string[]
  splittable?: string
  splittabilityNote?: string
  workedSince?: string
  renamedByKhadane?: string
  provenanceLine?: string
  editorialBody?: string[]
  foundingStone?: boolean
}

export const VARIETIES: Variety[] = [
  {
    "code": "KHD-O-01",
    "rank": 1,
    "slug": "khadipur-grey",
    "name": "Khadipur Grey",
    "nameHindi": "खादीपुर ग्रे",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Khadipur, Bijolia tehsil, Bhilwara District, Rajasthan",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan sandstone formation",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A cool, restrained grey from the Khadipur block of the Bijolia belt.",
    "inHandHeadline": "Quarried from the family's owned block at Khadipur village, Bhilwara District. Catalogued under its trade name.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-grey",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1980s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned block at Khadipur village, Bhilwara District. Catalogued under its trade name.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-02",
    "rank": 2,
    "slug": "kandla-grey",
    "name": "Kandla Grey",
    "nameHindi": "कंदला ग्रे",
    "tier": "owned",
    "tierLabel": "Owned · Founding Stone",
    "district": "Bundi District",
    "primaryLocation": "Parana, Bundi District, Rajasthan (Founding bed, first quarried by the family in the early 1970s)",
    "additionalLocations": "",
    "quarryNetworkNote": "Today worked across multiple owned beds in the Bijolia sandstone belt, spanning both the Bhilwara and Bundi sides of the region.",
    "formation": "Bijolia sandstone belt (Lower Vindhyan) — broader belt spanning Bhilwara and Bundi districts",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "The founding stone. Worked since 1972 across the Bijolia belt.",
    "inHandHeadline": "Kandla Grey is KHADANE's founding stone, first quarried from the family's block at Parana village, Bundi District, in the early years of the operation. Today the stone is worked across multiple owned beds in the Bijolia sandstone belt, spanning the Bhilwara and Bundi sides of the region.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-grey",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1970s",
    "renamedByKhadane": "No",
    "provenanceLine": "Kandla Grey is KHADANE's founding stone, first quarried from the family's block at Parana village, Bundi District, in the early years of the operation. Today the stone is worked across multiple owned beds in the Bijolia sandstone belt, spanning the Bhilwara and Bundi sides of the region.",
    "foundingStone": true
  },
  {
    "code": "KHD-O-03",
    "rank": 3,
    "slug": "autumn-brown",
    "name": "Autumn Brown",
    "nameHindi": "ऑटम ब्राउन",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Nayanagar, Bijolia tehsil, Bhilwara District, Rajasthan",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan sandstone formation",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "The warm-brown anchor of the Bijolia belt — Nayanagar quarry, since the 1980s.",
    "inHandHeadline": "Quarried from the family's owned block at Nayanagar village, within the Bijolia tehsil of Bhilwara District. Worked since the 1980s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1980s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned block at Nayanagar village, within the Bijolia tehsil of Bhilwara District. Worked since the 1980s.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-04",
    "rank": 4,
    "slug": "raj-blend",
    "name": "Raj Blend",
    "nameHindi": "राज ब्लेंड",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Choti Bijolia, Bijolia tehsil, Bhilwara District, Rajasthan (Named anchor village within the multi-block variegated bed)",
    "additionalLocations": "",
    "quarryNetworkNote": "Multiple owned blocks across the Bijolia tehsil, including the Choti Bijolia block.",
    "formation": "Bijolia belt, Lower Vindhyan — naturally variegated bed",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A naturally variegated warm bed from the Bijolia tehsil.",
    "inHandHeadline": "Quarried from the family's owned variegated beds across the Bijolia tehsil of Bhilwara District, including the Choti Bijolia block. Worked since the 1980s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1980s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned variegated beds across the Bijolia tehsil of Bhilwara District, including the Choti Bijolia block. Worked since the 1980s.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-05",
    "rank": 5,
    "slug": "garda-green",
    "name": "Garda Green",
    "nameHindi": "गरडा ग्रीन",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bundi District",
    "primaryLocation": "Garda, Bundi District, Rajasthan",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bundi sandstone formation (same broader belt as Kandla Grey)",
    "tradeNames": "Raj Green (international trade); Rajpura Green — for stones from the neighbouring quarries",
    "oneLine": "A sage-to-khaki green from the family’s owned Garda block, Bundi District.",
    "inHandHeadline": "Garda Green is quarried from the family's owned block at Garda village, Bundi District. Also known in the trade as Raj Green, or Rajpura Green for stones from the neighbouring quarries.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-green",
    "alternateNames": [
      "Raj Green (international trade)",
      "Rajpura Green"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1990s",
    "renamedByKhadane": "Yes",
    "provenanceLine": "Garda Green is quarried from the family's owned block at Garda village, Bundi District. Also known in the trade as Raj Green, or Rajpura Green for stones from the neighbouring quarries.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-06",
    "rank": 6,
    "slug": "slate-grey",
    "name": "Slate Grey",
    "nameHindi": "स्लेट ग्रे",
    "tier": "owned",
    "tierLabel": "Owned · Founding Stone",
    "district": "Bundi District",
    "primaryLocation": "Dabi-Budhpura area, Bundi District, Rajasthan (Multiple owned blocks across the area)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bundi sandstone formation (broader belt spans Bundi and Bhilwara)",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A dark, uniform grey from the founding-era Bundi blocks. Since 1972.",
    "inHandHeadline": "Slate Grey is quarried from the family's owned blocks in the Dabi-Budhpura area of Bundi District, within the broader sandstone belt that runs across Bundi and Bhilwara. Worked since the founding years of the operation, 1972.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-grey",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1970s",
    "renamedByKhadane": "No",
    "provenanceLine": "Slate Grey is quarried from the family's owned blocks in the Dabi-Budhpura area of Bundi District, within the broader sandstone belt that runs across Bundi and Bhilwara. Worked since the founding years of the operation, 1972.",
    "foundingStone": true
  },
  {
    "code": "KHD-O-07",
    "rank": 7,
    "slug": "mint",
    "name": "Mint",
    "nameHindi": "मिंट",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Khoki, Bijolia tehsil, Bhilwara District, Rajasthan (Near Sukhpura)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A pale celadon-mint from the Khoki block. Worked since the 1990s.",
    "inHandHeadline": "Mint is quarried from the family's owned block at Khoki village, near Sukhpura, within the Bijolia tehsil of Bhilwara District. Worked since the 1990s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-green",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1990s",
    "renamedByKhadane": "No",
    "provenanceLine": "Mint is quarried from the family's owned block at Khoki village, near Sukhpura, within the Bijolia tehsil of Bhilwara District. Worked since the 1990s.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-08",
    "rank": 8,
    "slug": "fossil-mint",
    "name": "Fossil Mint",
    "nameHindi": "फॉसिल मिंट",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Bijolia tehsil, Bhilwara District, Rajasthan (Specific village held at tehsil level — fossil-bearing strata)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan — fossil-bearing sedimentary strata",
    "tradeNames": "Mint Fossil (alternative trade variant)",
    "oneLine": "The fossil-bearing mint bed. Marine impressions across selected slabs.",
    "inHandHeadline": "Quarried from the family's owned fossil-bearing mint bed in the Bijolia tehsil of Bhilwara District. Worked since the 2000s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-green",
    "alternateNames": [
      "Mint Fossil (alternative trade variant)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "Fossil layer fragile; primarily sold as calibrated paving and slabs, less commonly as hand-cut crazy paving",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned fossil-bearing mint bed in the Bijolia tehsil of Bhilwara District. Worked since the 2000s.",
    "editorialBody": [
      "Fossil Mint shares the celadon-to-mint colour of ordinary Mint, but carries something the rest of the bed does not: marine fossils preserved in the sedimentary layer. Small bivalves, shell fragments, and occasional larger impressions surface across the face of slabs cut from the fossil-bearing strata.",
      "The fossils come rarely. Not every slab will carry visible patterns; the strata that hold them are thinner than the surrounding bed, and a single quarry session yields more ordinary Mint than Fossil Mint. The yard sorts the cut slabs before dispatch — pieces with visible fossil impressions are flagged and packed together, and customers who specifically need fossil-bearing material should request this at the order stage. Honed surface treatment reads the fossils most clearly against the polished ground."
    ],
    "foundingStone": false
  },
  {
    "code": "KHD-O-09",
    "rank": 9,
    "slug": "buff",
    "name": "Buff",
    "nameHindi": "बफ़",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Bhooti, Bijolia tehsil, Bhilwara District, Rajasthan (Primary source village (Bhooti also supplies Camel Dust and Dual Tone))",
    "additionalLocations": "",
    "quarryNetworkNote": "Multiple owned blocks across the Bijolia tehsil, with Bhooti as the primary source.",
    "formation": "Bijolia belt, Lower Vindhyan",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A pale yellow-beige from the family’s Bhooti block and the wider Bijolia tehsil.",
    "inHandHeadline": "Quarried from the family's owned blocks across the Bijolia tehsil of Bhilwara District, with Bhooti village as the primary source. Worked since the 1980s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1980s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned blocks across the Bijolia tehsil of Bhilwara District, with Bhooti village as the primary source. Worked since the 1980s.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-10",
    "rank": 10,
    "slug": "camel-dust",
    "name": "Camel Dust",
    "nameHindi": "कैमल डस्ट",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Bhooti, Bijolia tehsil, Bhilwara District, Rajasthan (One of the primary sources within a multi-block network (also supplies Buff))",
    "additionalLocations": "",
    "quarryNetworkNote": "Multiple owned blocks across the Bijolia tehsil.",
    "formation": "Bijolia belt, Lower Vindhyan",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "A tan-to-camel mid-tone from the Bijolia tehsil. Bhooti and beyond.",
    "inHandHeadline": "Quarried from the family's owned blocks across the Bijolia tehsil of Bhilwara District, with Bhooti village as one of the primary sources. Worked since the 1990s.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1990s",
    "renamedByKhadane": "No",
    "provenanceLine": "Quarried from the family's owned blocks across the Bijolia tehsil of Bhilwara District, with Bhooti village as one of the primary sources. Worked since the 1990s.",
    "foundingStone": false
  },
  {
    "code": "KHD-O-11",
    "rank": 11,
    "slug": "red-choco",
    "name": "Red Choco",
    "nameHindi": "रेड चॉको",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Kaansiya, Bijolia tehsil, Bhilwara District, Rajasthan",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan — red-iron-oxide-rich bed",
    "tradeNames": "Kaansiya Red — older village-name designation used historically by Indian buyers",
    "oneLine": "A deep cocoa-red from the Kaansiya block. Renamed from the trade’s Kaansiya Red.",
    "inHandHeadline": "Red Choco is quarried from the family's owned block at Kaansiya village, within the Bijolia tehsil of Bhilwara District. Also known in the trade as Kaansiya Red — the older village-name designation.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-red",
    "alternateNames": [
      "Kaansiya Red"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "The bed splits cleanly along its natural bedding plane.",
    "workedSince": "the 1990s",
    "renamedByKhadane": "Yes",
    "provenanceLine": "Red Choco is quarried from the family's owned block at Kaansiya village, within the Bijolia tehsil of Bhilwara District. Also known in the trade as Kaansiya Red — the older village-name designation.",
    "editorialBody": [
      "Red Choco carries a deep, settled cocoa-red tone — neither the brick-red of Agra sandstone nor the orange-pink of Dholpur. The colour is darker, richer, more uniform across a single face, with occasional darker mineral patches where the iron content concentrated.",
      "The surface holds shape well under the hand-cut tools the yard uses; the bed splits cleanly along its natural plane, which makes Red Choco one of the more economical varieties to dress at finer thicknesses. Specified for cladding, paving, and architectural detail where the deep red tone needs to read confident rather than industrial — the cocoa register is what differentiates it from the harder reds of the Agra and Dholpur quarries."
    ],
    "foundingStone": false
  },
  {
    "code": "KHD-O-12",
    "rank": 12,
    "slug": "dual-tone",
    "name": "Dual Tone",
    "nameHindi": "ड्यूल टोन",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Sadaram Ji ka Khera, Bijolia tehsil, Bhilwara District, Rajasthan",
    "additionalLocations": "Bhooti, Bijolia tehsil, Bhilwara District, Rajasthan; Udpuriya, Bijolia tehsil, Bhilwara District, Rajasthan",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan — two-tone bedding plane",
    "tradeNames": "Two Tone Sandstone (Indian export trade); Indian York Sandstone (UK paving market)",
    "oneLine": "Buff and dove-grey in a single slab. The UK trade’s Indian York.",
    "inHandHeadline": "Dual Tone is quarried from the family's owned blocks at Sadaram Ji ka Khera, Bhooti, and Udpuriya villages, within the Bijolia tehsil of Bhilwara District. Also known in the trade as Two Tone Sandstone, or Indian York Sandstone in the UK paving market.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Two Tone Sandstone (Indian export trade)",
      "Indian York Sandstone (UK paving market)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 1990s",
    "renamedByKhadane": "Yes",
    "provenanceLine": "Dual Tone is quarried from the family's owned blocks at Sadaram Ji ka Khera, Bhooti, and Udpuriya villages, within the Bijolia tehsil of Bhilwara District. Also known in the trade as Two Tone Sandstone, or Indian York Sandstone in the UK paving market.",
    "editorialBody": [
      "Dual Tone is the family’s owned two-tone bed — buff yellow and dove grey holding the same sedimentary plane, with the boundary between the two often running diagonally or in soft swirls across a single slab. The contrast is the character of the stone; each piece carries both tones in different proportions.",
      "In the UK paving trade, this stone is the closest natural equivalent to traditional York paving — a comparison that has held since the first Indian sandstone exports reached the UK in the 1990s. KHADANE’s Dual Tone is cut to UK calibration standards and specified frequently for heritage-context paving, garden patios with period properties, and any installation that wants the visual age of York stone without the cost."
    ],
    "foundingStone": false
  },
  {
    "code": "KHD-O-13",
    "rank": 13,
    "slug": "multi-brown",
    "name": "Multi Brown",
    "nameHindi": "मल्टी ब्राउन",
    "tier": "owned",
    "tierLabel": "Owned",
    "district": "Bhilwara District",
    "primaryLocation": "Bhawanipura, Bijolia tehsil, Bhilwara District, Rajasthan",
    "additionalLocations": "Aroli, Bijolia tehsil, Bhilwara District, Rajasthan; Nayanagar, Bijolia tehsil, Bhilwara District, Rajasthan (Also supplies Autumn Brown)",
    "quarryNetworkNote": "",
    "formation": "Bijolia belt, Lower Vindhyan — naturally variegated brown bed",
    "tradeNames": "Mix Brown Sandstone (some Indian catalogues)",
    "oneLine": "Honey, walnut, cinnamon, cocoa — the variegated brown bed of three KHADANE blocks.",
    "inHandHeadline": "Multi Brown is quarried from the family's owned blocks at Bhawanipura, Aroli, and Nayanagar villages, within the Bijolia tehsil of Bhilwara District. Also known in some Indian catalogues as Mix Brown Sandstone.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Mix Brown Sandstone (some Indian catalogues)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Multi Brown is quarried from the family's owned blocks at Bhawanipura, Aroli, and Nayanagar villages, within the Bijolia tehsil of Bhilwara District. Also known in some Indian catalogues as Mix Brown Sandstone.",
    "editorialBody": [
      "Multi Brown carries the full register of brown tones across a single quarry face — honey, walnut, cinnamon, and cocoa drifting through the same bed as the iron-oxide and organic sediment vary from layer to layer. No two slabs are identical; the variegation is the character of the stone, not a deviation from it.",
      "The surface holds a soft matte finish under most treatments. Grain runs in faint horizontal striations, occasionally interrupted by darker mineral patches where the bed was richer in iron. Specified often for installations that want warmth without uniformity — courtyard paving, garden retaining walls, large-format cladding where a single slab can carry several tonal shifts."
    ],
    "foundingStone": false
  },
  {
    "code": "KHD-O-14",
    "rank": 14,
    "slug": "multi-colours",
    "name": "Multi Colours",
    "nameHindi": "मल्टी कलर्स",
    "tier": "owned",
    "tierLabel": "Owned · Newest",
    "district": "Bhilwara District",
    "primaryLocation": "Bijolia tehsil, Bhilwara District, Rajasthan (Multiple owned blocks tehsil-wide; the variegated bed surfaces in several KHADANE quarries)",
    "additionalLocations": "",
    "quarryNetworkNote": "The variegated bed surfaces in multiple KHADANE quarries across the Bijolia tehsil.",
    "formation": "Bijolia belt, Lower Vindhyan — mineralogically complex variegated bed",
    "tradeNames": "Rainbow Sandstone (international trade)",
    "oneLine": "The full-spectrum variegated bed. The newest stone in the catalogue.",
    "inHandHeadline": "Multi Colours is quarried from several of the family's owned blocks across the Bijolia tehsil of Bhilwara District — the variegated bed surfaces in multiple KHADANE quarries within the tehsil. Also known in the trade as Rainbow Sandstone.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Rainbow Sandstone (international trade)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2010s",
    "renamedByKhadane": "Yes",
    "provenanceLine": "Multi Colours is quarried from several of the family's owned blocks across the Bijolia tehsil of Bhilwara District — the variegated bed surfaces in multiple KHADANE quarries within the tehsil. Also known in the trade as Rainbow Sandstone.",
    "editorialBody": [
      "Multi Colours is the full-spectrum variegated bed of KHADANE’s owned Bijolia quarries — browns, soft greens, dove greys, and pale yellows surfacing in patches across a single face. The colour distribution is geological, not deliberate; the bed laid down with mixed mineralogy across the layers and the stone reflects that history wherever it is cut.",
      "Honed surfaces hold the colour distinctly. Natural-riven faces soften the boundaries between tones. Sandblasted and tumbled treatments lift the lighter patches and recess the darker ones. The stone is specified for installations that want visual movement — driveway cobbles where the variegation reads as patina from a distance, wall cladding where the colour shifts give a slab the character of geological time."
    ],
    "foundingStone": false
  },
  {
    "code": "KHD-A-01",
    "rank": 15,
    "slug": "agra-red",
    "name": "Agra Red",
    "nameHindi": "आगरा रेड",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Bharatpur District",
    "primaryLocation": "Bansi Paharpur, Bayana tehsil, Bharatpur District, Rajasthan (Historical Mughal-era building stone; named for use in Agra monuments though quarried in Bharatpur District)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Upper Vindhyan, Bhander Group sandstone formation",
    "tradeNames": "Bansi Paharpur Red — village-name designation",
    "oneLine": "The historic Mughal-era red. Quarried at Bansi Paharpur, Bharatpur District.",
    "inHandHeadline": "Sourced from a family-allied quarry at Bansi Paharpur village in Bayana tehsil of Bharatpur District, Rajasthan. Also known in the trade as Bansi Paharpur Red — the village-name designation used by Indian buyers.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-red",
    "alternateNames": [
      "Bansi Paharpur Red"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry at Bansi Paharpur village in Bayana tehsil of Bharatpur District, Rajasthan. Also known in the trade as Bansi Paharpur Red — the village-name designation used by Indian buyers.",
    "alliedRelationship": "Sourced from a family-allied quarry at Bansi Paharpur village in Bayana tehsil of Bharatpur District, Rajasthan. Also known in the trade as Bansi Paharpur Red — the village-name designation used by Indian buyers.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-02",
    "rank": 16,
    "slug": "basalt-black",
    "name": "Basalt Black",
    "nameHindi": "बेसाल्ट ब्लैक",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Kota District",
    "primaryLocation": "Kota basalt cluster, Kota District, Rajasthan (Specific quarry village TBC)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Deccan Trap basalt (igneous volcanic formation — the catalogue’s only non-sandstone)",
    "tradeNames": "Rajasthan Black Basalt (most common international name)",
    "oneLine": "The catalogue’s only igneous stone. Deccan Trap basalt from Kota.",
    "inHandHeadline": "Sourced from a family-allied quarry in Kota District, Rajasthan. The stone is volcanic basalt from the Deccan Trap formation, distinct from the sandstone catalogue. Also known in the trade as Rajasthan Black Basalt.",
    "formatScope": "Machine-cut / block-first formats",
    "formatExceptions": [
      "block-first"
    ],
    "placeholderClass": "placeholder-stone-grey",
    "alternateNames": [
      "Rajasthan Black Basalt (most common international name)"
    ],
    "splittable": "No — block-only, machine-cut downstream",
    "splittabilityNote": "Basalt is dense igneous rock; block-only, machine-cut downstream.",
    "workedSince": "the 2010s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry in Kota District, Rajasthan. The stone is volcanic basalt from the Deccan Trap formation, distinct from the sandstone catalogue. Also known in the trade as Rajasthan Black Basalt.",
    "alliedRelationship": "Sourced from a family-allied quarry in Kota District, Rajasthan. The stone is volcanic basalt from the Deccan Trap formation, distinct from the sandstone catalogue. Also known in the trade as Rajasthan Black Basalt.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-03",
    "rank": 17,
    "slug": "dholpur-beige",
    "name": "Dholpur Beige",
    "nameHindi": "धौलपुर बेज",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Dholpur District",
    "primaryLocation": "Sarmathura, Dholpur District, Rajasthan",
    "additionalLocations": "Bari, Dholpur District, Rajasthan; Baseri, Dholpur District, Rajasthan",
    "quarryNetworkNote": "",
    "formation": "Vindhyan sandstone, Bhander Group (same formation that built the Red Fort and Humayun’s Tomb)",
    "tradeNames": "Dholpur Creme (alternative international name)",
    "oneLine": "The Vindhyan beige of Mughal-era monuments. Sarmathura quarry, Dholpur.",
    "inHandHeadline": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The bed sits in the same Vindhyan sandstone formation that built the Red Fort and Humayun’s Tomb. Also known in some catalogues as Dholpur Creme.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Dholpur Creme (alternative international name)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The bed sits in the same Vindhyan sandstone formation that built the Red Fort and Humayun’s Tomb. Also known in some catalogues as Dholpur Creme.",
    "alliedRelationship": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The bed sits in the same Vindhyan sandstone formation that built the Red Fort and Humayun’s Tomb. Also known in some catalogues as Dholpur Creme.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-04",
    "rank": 18,
    "slug": "dholpur-pink",
    "name": "Dholpur Pink",
    "nameHindi": "धौलपुर पिंक",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Dholpur District",
    "primaryLocation": "Sarmathura, Dholpur District, Rajasthan",
    "additionalLocations": "Bari, Dholpur District, Rajasthan",
    "quarryNetworkNote": "",
    "formation": "Vindhyan sandstone, Bhander Group — hematite-rich pink bed",
    "tradeNames": "Catalogued under its trade name",
    "oneLine": "The hematite-rich pink of Sarmathura. From the same belt as Dholpur Beige.",
    "inHandHeadline": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The pink colour comes from natural hematite content in the Vindhyan sandstone bed.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-red",
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The pink colour comes from natural hematite content in the Vindhyan sandstone bed.",
    "alliedRelationship": "Sourced from a family-allied quarry at Sarmathura, within Dholpur District of Rajasthan. The pink colour comes from natural hematite content in the Vindhyan sandstone bed.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-05",
    "rank": 19,
    "slug": "gwalior-mint",
    "name": "Gwalior Mint",
    "nameHindi": "ग्वालियर मिंट",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Gwalior District",
    "primaryLocation": "Behat-Pichhore area, Gwalior District, Madhya Pradesh (Multiple quarries in the Gwalior District sandstone outcrops)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Vindhyan sandstone, central Indian extension",
    "tradeNames": "Mint Natural Stone (alternative international name); Gwalior Greenish White (some operators)",
    "oneLine": "Cream-and-mint from the central Indian Vindhyan extension. Gwalior District, MP.",
    "inHandHeadline": "Sourced from a family-allied quarry in the sandstone outcrops of Gwalior District, Madhya Pradesh. The stone is from the central Indian extension of the Vindhyan formation.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-green",
    "alternateNames": [
      "Mint Natural Stone (alternative international name)",
      "Gwalior Greenish White (some operators)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2000s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry in the sandstone outcrops of Gwalior District, Madhya Pradesh. The stone is from the central Indian extension of the Vindhyan formation.",
    "alliedRelationship": "Sourced from a family-allied quarry in the sandstone outcrops of Gwalior District, Madhya Pradesh. The stone is from the central Indian extension of the Vindhyan formation.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-06",
    "rank": 20,
    "slug": "jaisalmer-yellow",
    "name": "Jaisalmer Yellow",
    "nameHindi": "जैसलमेर यलो",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Jaisalmer District",
    "primaryLocation": "Jethwai, Jaisalmer District, Rajasthan",
    "additionalLocations": "Moolsagar, Jaisalmer District, Rajasthan",
    "quarryNetworkNote": "",
    "formation": "Jaisalmer Formation, Middle-to-Late Jurassic marine deposits — technically yellow limestone, classified by IUGS as Jaisalmer Golden Limestone",
    "tradeNames": "Jaisalmer Golden Limestone (IUGS classification); Jaisalmer Yellow Limestone (trade variant)",
    "oneLine": "The stone of Jaisalmer Fort. Jurassic yellow limestone, geologically distinct from the sandstone catalogue.",
    "inHandHeadline": "Sourced from a family-allied quarry in the Jethwai and Moolsagar quarry network of Jaisalmer District, Rajasthan. The stone is technically Jurassic yellow limestone — the same formation that built the Jaisalmer Fort, classified by IUGS as Jaisalmer Golden Limestone.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Jaisalmer Golden Limestone (IUGS classification)",
      "Jaisalmer Yellow Limestone (trade variant)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2010s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry in the Jethwai and Moolsagar quarry network of Jaisalmer District, Rajasthan. The stone is technically Jurassic yellow limestone — the same formation that built the Jaisalmer Fort, classified by IUGS as Jaisalmer Golden Limestone.",
    "alliedRelationship": "Sourced from a family-allied quarry in the Jethwai and Moolsagar quarry network of Jaisalmer District, Rajasthan. The stone is technically Jurassic yellow limestone — the same formation that built the Jaisalmer Fort, classified by IUGS as Jaisalmer Golden Limestone.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-07",
    "rank": 21,
    "slug": "lalitpur-yellow",
    "name": "Lalitpur Yellow",
    "nameHindi": "ललितपुर यलो",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Lalitpur District",
    "primaryLocation": "Lalitpur District, Uttar Pradesh (Lalitpur District quarry network)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Vindhyan sandstone, Bhander Group — yellow-iron-oxide-rich bed",
    "tradeNames": "L Yellow Sandstone (trade abbreviation); Sun Yellow Sandstone (alternative name)",
    "oneLine": "A warm yellow Vindhyan from Lalitpur, UP. Frost-resistant and salt-air-tolerant.",
    "inHandHeadline": "Sourced from a family-allied quarry in Lalitpur District, Uttar Pradesh. The bed is Vindhyan sandstone, yellow-iron-oxide-rich, frost and salt-air resistant — specified often for sea-shore cladding for these reasons.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "L Yellow Sandstone (trade abbreviation)",
      "Sun Yellow Sandstone (alternative name)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "",
    "workedSince": "the 2010s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry in Lalitpur District, Uttar Pradesh. The bed is Vindhyan sandstone, yellow-iron-oxide-rich, frost and salt-air resistant — specified often for sea-shore cladding for these reasons.",
    "alliedRelationship": "Sourced from a family-allied quarry in Lalitpur District, Uttar Pradesh. The bed is Vindhyan sandstone, yellow-iron-oxide-rich, frost and salt-air resistant — specified often for sea-shore cladding for these reasons.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-08",
    "rank": 22,
    "slug": "sagar-black",
    "name": "Sagar Black",
    "nameHindi": "सागर ब्लैक",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Sagar District",
    "primaryLocation": "Sagar District, Madhya Pradesh (Sagar District quarry cluster; processing routed via Kota)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Sandstone bed with high iron-rich mineral content (quartz and feldspar matrix with dark mineral concentration producing the near-uniform black character)",
    "tradeNames": "Black Saga Sandstone (international variant); Kalabari Black Sandstone (alternate Indian name)",
    "oneLine": "The deepest black character in the catalogue. Sagar District, MP.",
    "inHandHeadline": "Sourced from a family-allied quarry in Sagar District, Madhya Pradesh. The bed yields the deepest black character in the catalogue — quartz and feldspar matrix with high iron-oxide mineral concentration.",
    "formatScope": "All 19 formats",
    "placeholderClass": "placeholder-stone-grey",
    "alternateNames": [
      "Black Saga Sandstone (international variant)",
      "Kalabari Black Sandstone (alternate Indian name)"
    ],
    "splittable": "Yes — splits cleanly along its natural bedding plane",
    "splittabilityNote": "Higher breakage rates during calibration; pricing reflects this.",
    "workedSince": "the 2010s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry in Sagar District, Madhya Pradesh. The bed yields the deepest black character in the catalogue — quartz and feldspar matrix with high iron-oxide mineral concentration.",
    "alliedRelationship": "Sourced from a family-allied quarry in Sagar District, Madhya Pradesh. The bed yields the deepest black character in the catalogue — quartz and feldspar matrix with high iron-oxide mineral concentration.",
    "foundingStone": false
  },
  {
    "code": "KHD-A-09",
    "rank": 23,
    "slug": "teakwood",
    "name": "Teakwood",
    "nameHindi": "टीकवुड",
    "tier": "allied",
    "tierLabel": "Allied",
    "district": "Bundi District",
    "primaryLocation": "Garda, Bundi District, Rajasthan (Same village as Garda Green; different quarry, allied partnership)",
    "additionalLocations": "",
    "quarryNetworkNote": "",
    "formation": "Bundi sandstone formation — banded brown-iron-oxide bed with natural wood-grain striations",
    "tradeNames": "Bundi Teakwood — geographic-anchor SEO alias",
    "oneLine": "The catalogue’s most figured stone — wood-grain striations across each slab.",
    "inHandHeadline": "Sourced from a family-allied quarry at Garda village in Bundi District, Rajasthan. The bed yields the catalogue’s most figured stone — natural wood-grain striations across each face. Also known in the trade as Bundi Teakwood.",
    "formatScope": "Machine-cut / block-first formats",
    "formatExceptions": [
      "block-first"
    ],
    "placeholderClass": "placeholder-stone-warm",
    "alternateNames": [
      "Bundi Teakwood"
    ],
    "splittable": "No — block-only, machine-cut downstream",
    "splittabilityNote": "Block-only, machine-cut downstream. Available in machine-cut formats only — gangsaw slabs, calibrated paving, architectural cladding, cobbles, sills, copings, steps and treads.",
    "workedSince": "the 2010s",
    "renamedByKhadane": "No",
    "provenanceLine": "Sourced from a family-allied quarry at Garda village in Bundi District, Rajasthan. The bed yields the catalogue’s most figured stone — natural wood-grain striations across each face. Also known in the trade as Bundi Teakwood.",
    "alliedRelationship": "Sourced from a family-allied quarry at Garda village in Bundi District, Rajasthan. The bed yields the catalogue’s most figured stone — natural wood-grain striations across each face. Also known in the trade as Bundi Teakwood.",
    "foundingStone": false
  }
]

export function getVariety(slug: string): Variety | undefined {
  return VARIETIES.find((v) => v.slug === slug)
}

export function getOwnedVarieties(): Variety[] {
  return VARIETIES.filter((v) => v.tier === 'owned')
}

export function getAlliedVarieties(): Variety[] {
  return VARIETIES.filter((v) => v.tier === 'allied')
}

export function getPrevVariety(currentRank: number): Variety {
  const prevRank = currentRank === 1 ? VARIETIES.length : currentRank - 1
  return VARIETIES.find((v) => v.rank === prevRank)!
}

export function getNextVariety(currentRank: number): Variety {
  const nextRank = currentRank === VARIETIES.length ? 1 : currentRank + 1
  return VARIETIES.find((v) => v.rank === nextRank)!
}
