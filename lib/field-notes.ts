// ============================================================
// KHADANE™ — Field Notes Catalogue Data
// 6 editorial briefs · Geology, Process, Trade, Network
// ============================================================

export type FieldNoteCategory = 'geology' | 'process' | 'trade' | 'network'

export interface FieldNoteSection {
  heading?: string
  body: string[]   // Each item is a paragraph
}

export interface FieldNote {
  id: string                           // FN-001
  slug: string                         // bijolia-sandstone-geology
  category: FieldNoteCategory
  categoryLabel: string                // 'GEOLOGY'
  title: string
  excerpt: string                      // 2-sentence intro
  date: string                         // 'Q2 · 2026'
  readMinutes: number
  placeholderVariant:
    | 'stone' | 'quarry' | 'yard'
    | 'stone-grey' | 'stone-warm' | 'stone-red' | 'stone-green'
    | 'portrait' | 'belt'
  sections: FieldNoteSection[]
  closingNote?: string                 // Italic gold close line
}

export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'FN-001',
    slug: 'bijolia-sandstone-geology',
    category: 'geology',
    categoryLabel: 'GEOLOGY',
    title: 'Why Bijolia sandstone sits where it does.',
    excerpt:
      'The Vindhyan Supergroup is one of the largest preserved sedimentary basins on Earth. Bijolia sits on its western edge.',
    date: 'Q2 · 2026',
    readMinutes: 4,
    placeholderVariant: 'stone-warm',
    sections: [
      {
        body: [
          'When you stand at the working face of a Bijolia quarry, you are standing on roughly a billion years of geological time. The sandstone here belongs to the Vindhyan Supergroup — specifically the Bhander Group of formations — laid down during the Proterozoic, when most of what is now central and northern India was a shallow sedimentary basin.',
          'The Vindhyan basin is among the largest and best-preserved Precambrian sedimentary sequences anywhere on Earth. It stretches from Sasaram in the east to Chittorgarh in the west — a horizontal expanse roughly 1,000 km across. Bijolia sits near the western edge of this basin, in what geologists call the Chittor-Bundi sub-basin.',
        ],
      },
      {
        heading: 'What this means for the stone.',
        body: [
          'Sandstones laid down under quiet, shallow water for hundreds of millions of years tend to develop very particular qualities: fine grain, dense matrix, low porosity, good dimensional stability. The Bhander sandstones of the Bijolia belt show all four. This is why they have been quarried — continuously, by hand and then by machine — for over eight centuries.',
          'It is also why they ship well. A dense, dimensionally stable stone holds its calibration better. It absorbs less water during transit. It freeze-thaws better in northern European climates. It cuts cleaner. None of this is luck. It is the geology, written into the rock long before any of us got here.',
        ],
      },
      {
        heading: 'The colour story.',
        body: [
          'Iron is the colourist. Where iron is high and oxidised, you get Autumn Brown, Kaansiya Red, Modak. Where iron is low and the matrix is dominated by quartz with traces of clay minerals, you get Kandla Grey, Raveena White. Where iron exists alongside organic carbonates from very ancient algal mats, you get the green tones — Sage Green, Garda Green. Where the basin shifted through multiple oxidation states across a single bed, you get banding — Rainbow, Dual Tone.',
          'All of this from a basin that closed up before complex life appeared.',
        ],
      },
    ],
    closingNote: 'The stone we ship today was decided a billion years ago.',
  },
  {
    id: 'FN-002',
    slug: 'calibration-explained',
    category: 'process',
    categoryLabel: 'PROCESS',
    title: 'Calibration, explained.',
    excerpt:
      'A 22mm Kandla Grey slab should not arrive at 24mm. Tolerance is the unsung discipline of the export trade.',
    date: 'Q2 · 2026',
    readMinutes: 5,
    placeholderVariant: 'stone-grey',
    sections: [
      {
        body: [
          'In the Indian sandstone trade, calibration is the single most under-discussed quality metric. Buyers ask about colour. They ask about size. They sometimes ask about surface finish. They very rarely ask about calibration tolerance — and yet that single number determines whether the stone lays flat on the contractor\'s site or causes weeks of grief.',
        ],
      },
      {
        heading: 'What calibration actually is.',
        body: [
          'Calibration is the precision with which a stone\'s thickness is held across a batch. A 22mm calibrated paving slab does not mean every slab is 22.000mm. It means every slab in that batch falls within a defined tolerance band around 22mm.',
          'The European market sets calibration tolerances for external paving. For most working applications, ±2mm is workshop-grade. ±1.5mm is good. ±1mm is export-grade. Anything tighter than ±1mm starts to cost real money in production time and rejection rates.',
        ],
      },
      {
        heading: 'How we hold it.',
        body: [
          'Three production controls. First, slab thickness is set at the gangsaw — the multi-blade saw that cuts blocks into raw slabs. Blade spacing determines target thickness. Second, the calibrator — a precision grinding machine — reduces each slab to its final dimension. Third, every batch is sample-measured before it leaves the yard. Reject rate is photographed and reported.',
          'The discipline is not in any one machine. It is in the inspection cadence. Calibration drifts with blade wear, with operator fatigue, with stone hardness variation across a single block. The yard that catches drift early holds tolerance. The yard that catches it at container loading does not.',
        ],
      },
      {
        heading: 'What the buyer should ask.',
        body: [
          'Three questions. First, what is the calibration tolerance band on this batch? Second, what is the inspection cadence — is every slab measured, or one in ten, or one in fifty? Third, what is the reject rate, and where are the reject piles photographed?',
          'A supplier who can answer all three is operating at export grade. A supplier who deflects, or quotes ±5mm, is not.',
        ],
      },
    ],
    closingNote: 'Calibration is the difference between paving and rework.',
  },
  {
    id: 'FN-003',
    slug: 'fob-for-cif-uk-buyers',
    category: 'trade',
    categoryLabel: 'TRADE',
    title: 'FOB, FOR, CIF: what UK buyers actually need.',
    excerpt:
      'The shipping terms most often confused — and what they mean for your landed cost. A practical primer for first-time importers.',
    date: 'Q2 · 2026',
    readMinutes: 6,
    placeholderVariant: 'yard',
    sections: [
      {
        body: [
          'First-time importers of Indian sandstone almost always confuse FOB, FOR, CIF, and EXW. These are Incoterms — the international rules governing where exporter responsibility ends and importer responsibility begins. They matter because they determine landed cost, insurance liability, and customs clearance responsibility.',
        ],
      },
      {
        heading: 'EXW — Ex Works.',
        body: [
          'The exporter\'s job ends at the factory gate. The buyer arranges transport from the yard, customs clearance at origin, ocean freight, customs clearance at destination, and final delivery. Cheapest unit price. Highest buyer complexity. Rarely used for first-time importers.',
        ],
      },
      {
        heading: 'FOR — Free On Rail or Free On Road.',
        body: [
          'A domestic Indian term. The exporter delivers the stone to a named rail station or trucking depot. Used almost exclusively in Indian domestic trade. Not relevant for UK importers receiving sea freight.',
        ],
      },
      {
        heading: 'FOB — Free On Board.',
        body: [
          'The exporter\'s responsibility ends when the goods are loaded on the vessel at the agreed port of loading. For us, that port is Mundra. The buyer arranges ocean freight, marine insurance, customs at destination, and delivery beyond destination port. This is the most common term for established importers. It separates costs cleanly.',
        ],
      },
      {
        heading: 'CIF — Cost, Insurance, Freight.',
        body: [
          'The exporter\'s responsibility extends to the destination port. The exporter pays ocean freight and marine insurance. The buyer takes over at the destination port — customs clearance, port charges, inland transport. CIF is convenient for buyers who do not want to manage freight forwarding, but it bundles costs in a way that makes price comparison harder.',
        ],
      },
      {
        heading: 'What we quote against.',
        body: [
          'We quote FOB Mundra as the default. For first-time buyers, we can quote CIF to a named UK port — typically Felixstowe, Southampton, or Tilbury — if the volume is sufficient. We do not quote DDP (delivered duty paid). UK VAT and import duty are the buyer\'s responsibility.',
        ],
      },
    ],
    closingNote: 'The right Incoterm is the one that makes the cost comparison honest.',
  },
  {
    id: 'FN-004',
    slug: 'the-colour-of-stone',
    category: 'geology',
    categoryLabel: 'GEOLOGY',
    title: 'The colour of stone: where it comes from.',
    excerpt:
      'Iron oxidation, organic content, mineral inclusion. Why Autumn Brown is brown and Kandla Grey is grey, written in the rock.',
    date: 'Q1 · 2026',
    readMinutes: 4,
    placeholderVariant: 'stone',
    sections: [
      {
        body: [
          'Stone colour is not aesthetic. It is geological. Every tone in the KHADANE™ catalogue traces back to a specific chemical or mineral condition in the Vindhyan basin when the sediment was being deposited.',
        ],
      },
      {
        heading: 'The iron family.',
        body: [
          'Iron in oxidised form (hematite, Fe₂O₃) produces the reds and browns. The deeper the iron concentration, the deeper the colour. Kaansiya Red sits at the high-iron end. Autumn Brown is mid-range. Raj Blend mixes iron with organic carbonates for its brown-green character.',
          'Iron in reduced form (magnetite, Fe₃O₄) produces darker, more neutral greys. Slate Grey shows this — a denser, more iron-rich grey than Kandla Grey, but with the iron held in a reduced state.',
        ],
      },
      {
        heading: 'The carbonate family.',
        body: [
          'Where ancient algal mats lived in the shallow Vindhyan sea, they left behind organic carbonates. As these mixed into the sandstone matrix, they gave certain beds a distinctive green or olive cast. This is the Sage Green / Garda Green story. The colour comes from what was alive in the water a billion years ago.',
        ],
      },
      {
        heading: 'The quartz neutrals.',
        body: [
          'Where iron was low and organic content was minimal, you get the neutrals — Kandla Grey, Raveena White, Camel Dust. These are quartz-dominated beds with minor clay minerals. They are the workhorses of the export catalogue precisely because they pair with almost any garden or interior palette.',
        ],
      },
    ],
    closingNote: 'Colour is geology slowed down to building material.',
  },
  {
    id: 'FN-005',
    slug: 'allied-not-traded',
    category: 'network',
    categoryLabel: 'NETWORK',
    title: 'Allied does not mean traded.',
    excerpt:
      'How direct-source allied relationships work in practice — and what separates them from the broker chains that dominate the trade.',
    date: 'Q1 · 2026',
    readMinutes: 4,
    placeholderVariant: 'stone-red',
    sections: [
      {
        body: [
          'The Indian sandstone trade runs on three layers: quarries, processors, and exporters. Most exporters do not own quarries. They buy through brokers, often through several chained brokers between the quarry face and the container. By the time stone reaches the importer, it has often been relabelled, reshuffled, and stripped of its origin documentation.',
          'We work differently. The owned varieties are simple — we operate the quarries, we control the processing, we load the containers. But the catalogue also includes nine varieties from outside our owned belt. How do we ship those without becoming the broker chain we are trying to avoid?',
        ],
      },
      {
        heading: 'What "allied" actually means.',
        body: [
          'Allied means a long-standing direct relationship with the operator at the quarry face. For Teakwood, that is a single heritage family in Nagaur. For Agra Red and Dholpur Pink, it is two specific operators we have worked with for over a decade. For Jaisalmer Yellow and Jodhpur Chittar, it is families whose grandfathers cut stone where they still cut it today.',
          'We do not buy through brokers. We do not relabel other suppliers\' material. We do not blend allied stone with owned stone. The allied operator extracts, our team processes, our facility loads, our paperwork ships.',
        ],
      },
      {
        heading: 'Why it matters.',
        body: [
          'Stone trade fraud is real. Mis-labelling — selling Dholpur Pink as Jodhpur Pink because the buyer overpaid for the wrong name — is depressingly common. Blending — mixing inferior allied stone with premium grades — happens at the broker level. Origin laundering — stamping FCL paperwork with a yard that never touched the stone — is a trade scandal waiting to happen.',
          'Direct-source allied relationships eliminate all three failure modes. The operator who quarried the stone is named. The yard that processed it is named. The container that shipped it is photographed. Nothing is anonymised between quarry and port.',
        ],
      },
    ],
    closingNote: 'Direct does not mean closer. It means accountable.',
  },
  {
    id: 'FN-006',
    slug: 'hand-picking-inspection',
    category: 'process',
    categoryLabel: 'PROCESS',
    title: 'Hand-picking: what we actually inspect.',
    excerpt:
      'A short field guide to the inspection criteria — grain consistency, edge condition, surface uniformity, dimensional tolerance.',
    date: 'Q1 · 2026',
    readMinutes: 5,
    placeholderVariant: 'stone-warm',
    sections: [
      {
        body: [
          'Hand-picking is the last quality control gate before container loading. Every piece passes a single inspection cycle against the approved sample. What does "approved sample" actually mean, and what does the inspector look for?',
        ],
      },
      {
        heading: 'The approved sample.',
        body: [
          'Before any order ships, the buyer receives a set of physical samples — typically three to five pieces per variety and format. These represent the variation range the buyer is signing off on. The samples are catalogued and held at the yard for the duration of production. Every piece hand-picked for the order is compared against these samples.',
          'This is not a strict numerical match. Sandstone is a natural material — variation is inherent and not grounds for rejection. The samples define the acceptable range, not a single ideal.',
        ],
      },
      {
        heading: 'The four inspection criteria.',
        body: [
          'First, grain consistency. The grain pattern across a piece should match the sample range. Patches that look noticeably different from the bulk — either much finer or much coarser — are pulled.',
          'Second, edge condition. The pieces should have clean, machine-cut edges with no significant chipping or feathering. Riven faces are an exception — these are deliberately irregular.',
          'Third, surface uniformity. The finish should match the sample. Riven, honed, sawn, sandblasted, flamed — each has a defined surface signature. Pieces that drift from that signature are pulled.',
          'Fourth, dimensional tolerance. Length, width, and thickness should fall within the calibration band agreed at order. Pieces outside band are pulled.',
        ],
      },
      {
        heading: 'The reject pile.',
        body: [
          'Reject pieces are photographed, batched, and reported to the buyer. The reject percentage is part of the loading documentation. A normal export-grade reject rate sits around 8–12% across most varieties. Higher rates indicate either an unusually variable block or an inspector who is being conservative.',
          'Pieces that fail inspection do not disappear. They are recycled into lower-grade orders, domestic supply, or reused as cobbles and setts depending on size.',
        ],
      },
    ],
    closingNote: 'What you order is what you ship. Nothing else.',
  },
]

export function getFieldNote(slug: string): FieldNote | undefined {
  return FIELD_NOTES.find((n) => n.slug === slug)
}

export function getPrevFieldNote(currentSlug: string): FieldNote {
  const idx = FIELD_NOTES.findIndex((n) => n.slug === currentSlug)
  const prev = idx === 0 ? FIELD_NOTES.length - 1 : idx - 1
  return FIELD_NOTES[prev]
}

export function getNextFieldNote(currentSlug: string): FieldNote {
  const idx = FIELD_NOTES.findIndex((n) => n.slug === currentSlug)
  const next = idx === FIELD_NOTES.length - 1 ? 0 : idx + 1
  return FIELD_NOTES[next]
}
