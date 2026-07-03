// KHADANE™ — Surface finishes — v3.0 (Surfaces/Edges/White Mint pack, 2026-07-03)
// Source of truth: KHADANE-surfaces-edges-whitemint/data — display order locked.
// 16 finishes replace the old 11 — hero + expandable thumbnails render on the Surfaces page only.

export interface FinishImage {
  variety: string
  file: string
  jpg: string
  thumb: string
}

export interface Finish {
  slug: string
  name: string
  tagline: string
  description: string
  hero: string
  heroJpg: string
  images: FinishImage[]
}

export const SURFACES: Finish[] = [
  {
    "slug": "sawn",
    "name": "Sawn",
    "tagline": "Cut clean.",
    "description": "Cut with a diamond saw to a fine, uniform machine texture — flat, even and subtly gripped. A precise, contemporary surface for modern paving and slab work.",
    "hero": "/images/khadane/surfaces/sawn/red-choco.webp",
    "heroJpg": "/images/khadane/surfaces/sawn/red-choco.jpg",
    "images": [
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/sawn/red-choco.webp",
        "jpg": "/images/khadane/surfaces/sawn/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/sawn/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "honed",
    "name": "Honed",
    "tagline": "Smooth and matte.",
    "description": "Ground to a flat, even surface with no gloss. A calm, contemporary finish that reads soft underfoot and shows the stone's true colour. Suited to interior floors and low-traffic feature areas.",
    "hero": "/images/khadane/surfaces/honed/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/honed/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/honed/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/honed/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/honed/kandla-grey-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/honed/red-choco.webp",
        "jpg": "/images/khadane/surfaces/honed/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/honed/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "matte",
    "name": "Matte",
    "tagline": "Soft, low sheen.",
    "description": "A smooth surface with minimal reflection — gentler than honed, quiet and understated. Well suited to interiors and covered applications.",
    "hero": "/images/khadane/surfaces/matte/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/matte/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/matte/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/matte/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/matte/kandla-grey-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/matte/red-choco.webp",
        "jpg": "/images/khadane/surfaces/matte/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/matte/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "leather",
    "name": "Leather",
    "tagline": "Depth without gloss.",
    "description": "Brushed to a soft, leathered surface that holds the stone's colour depth while resisting marks and smudges. A refined, tactile finish for premium interior surfaces.",
    "hero": "/images/khadane/surfaces/leather/brown.webp",
    "heroJpg": "/images/khadane/surfaces/leather/brown.jpg",
    "images": [
      {
        "variety": "Brown",
        "file": "/images/khadane/surfaces/leather/brown.webp",
        "jpg": "/images/khadane/surfaces/leather/brown.jpg",
        "thumb": "/images/khadane/surfaces/leather/brown-thumb.webp"
      }
    ]
  },
  {
    "slug": "cotton-brush",
    "name": "Cotton Brush",
    "tagline": "Brushed and tactile.",
    "description": "Abrasive-brushed to a soft, matte surface with a fine grain and gentle grip. Contemporary and understated, for interiors and sheltered terraces.",
    "hero": "/images/khadane/surfaces/cotton-brush/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/cotton-brush/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/cotton-brush/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/cotton-brush/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/cotton-brush/kandla-grey-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/cotton-brush/red-choco.webp",
        "jpg": "/images/khadane/surfaces/cotton-brush/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/cotton-brush/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "sandblast",
    "name": "Sandblast",
    "tagline": "Fine, even grip.",
    "description": "Fine abrasive blasted across the surface for a uniform, lightly textured matte finish with dependable grip. A practical choice for steps and wet areas.",
    "hero": "/images/khadane/surfaces/sandblast/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/sandblast/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/sandblast/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/sandblast/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/sandblast/kandla-grey-thumb.webp"
      }
    ]
  },
  {
    "slug": "shotblast",
    "name": "Shotblast",
    "tagline": "Matte, non-slip texture.",
    "description": "Steel shot fired at the surface produces an even, matte, textured face with strong slip resistance. A workhorse external finish for paving and pool decks.",
    "hero": "/images/khadane/surfaces/shotblast/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/shotblast/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/shotblast/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/shotblast/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/shotblast/kandla-grey-thumb.webp"
      },
      {
        "variety": "Kandla Grey (Natural)",
        "file": "/images/khadane/surfaces/shotblast/kandla-grey-natural.webp",
        "jpg": "/images/khadane/surfaces/shotblast/kandla-grey-natural.jpg",
        "thumb": "/images/khadane/surfaces/shotblast/kandla-grey-natural-thumb.webp"
      },
      {
        "variety": "Dual Tone",
        "file": "/images/khadane/surfaces/shotblast/dual-tone.webp",
        "jpg": "/images/khadane/surfaces/shotblast/dual-tone.jpg",
        "thumb": "/images/khadane/surfaces/shotblast/dual-tone-thumb.webp"
      }
    ]
  },
  {
    "slug": "shotblasted-cotton",
    "name": "Shotblasted Cotton",
    "tagline": "Textured, then softened.",
    "description": "Shotblast followed by a cotton brush — textured for grip, then softened for a matte, tactile hand. A refined surface for external and transitional spaces.",
    "hero": "/images/khadane/surfaces/shotblasted-cotton/camel-dust.webp",
    "heroJpg": "/images/khadane/surfaces/shotblasted-cotton/camel-dust.jpg",
    "images": [
      {
        "variety": "Camel Dust",
        "file": "/images/khadane/surfaces/shotblasted-cotton/camel-dust.webp",
        "jpg": "/images/khadane/surfaces/shotblasted-cotton/camel-dust.jpg",
        "thumb": "/images/khadane/surfaces/shotblasted-cotton/camel-dust-thumb.webp"
      }
    ]
  },
  {
    "slug": "flamed",
    "name": "Flamed",
    "tagline": "Fired for grip.",
    "description": "Intense heat spalls the surface crystals to leave a rough, naturally non-slip texture with a softened, lightened tone. A classic for pool surrounds, ramps and high-traffic external paving.",
    "hero": "/images/khadane/surfaces/flamed/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/flamed/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/flamed/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/flamed/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/flamed/kandla-grey-thumb.webp"
      },
      {
        "variety": "Camel Dust",
        "file": "/images/khadane/surfaces/flamed/camel-dust.webp",
        "jpg": "/images/khadane/surfaces/flamed/camel-dust.jpg",
        "thumb": "/images/khadane/surfaces/flamed/camel-dust-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/flamed/red-choco.webp",
        "jpg": "/images/khadane/surfaces/flamed/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/flamed/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "blasted-flamed",
    "name": "Blasted Flamed",
    "tagline": "Dual-textured, deep tone.",
    "description": "Blasted and flamed in combination for a deep, dual-worked surface — enriched tonal contrast with high slip resistance. A statement finish for demanding external settings.",
    "hero": "/images/khadane/surfaces/blasted-flamed/flamed-on-shotblast.webp",
    "heroJpg": "/images/khadane/surfaces/blasted-flamed/flamed-on-shotblast.jpg",
    "images": [
      {
        "variety": "Flamed on Shotblast",
        "file": "/images/khadane/surfaces/blasted-flamed/flamed-on-shotblast.webp",
        "jpg": "/images/khadane/surfaces/blasted-flamed/flamed-on-shotblast.jpg",
        "thumb": "/images/khadane/surfaces/blasted-flamed/flamed-on-shotblast-thumb.webp"
      },
      {
        "variety": "Dual Tone",
        "file": "/images/khadane/surfaces/blasted-flamed/dual-tone.webp",
        "jpg": "/images/khadane/surfaces/blasted-flamed/dual-tone.jpg",
        "thumb": "/images/khadane/surfaces/blasted-flamed/dual-tone-thumb.webp"
      }
    ]
  },
  {
    "slug": "natural-riven",
    "name": "Natural Riven",
    "tagline": "The stone's own face.",
    "description": "The natural cleft face, left as the stone splits along its bed. Characterful and naturally textured, with the grip and variation that only riven stone carries. A traditional choice for gardens and patios.",
    "hero": "/images/khadane/surfaces/natural-riven/natural.webp",
    "heroJpg": "/images/khadane/surfaces/natural-riven/natural.jpg",
    "images": [
      {
        "variety": "Natural",
        "file": "/images/khadane/surfaces/natural-riven/natural.webp",
        "jpg": "/images/khadane/surfaces/natural-riven/natural.jpg",
        "thumb": "/images/khadane/surfaces/natural-riven/natural-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/natural-riven/red-choco.webp",
        "jpg": "/images/khadane/surfaces/natural-riven/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/natural-riven/red-choco-thumb.webp"
      },
      {
        "variety": "White Mint",
        "file": "/images/khadane/surfaces/natural-riven/white-mint.webp",
        "jpg": "/images/khadane/surfaces/natural-riven/white-mint.jpg",
        "thumb": "/images/khadane/surfaces/natural-riven/white-mint-thumb.webp"
      }
    ]
  },
  {
    "slug": "riven-shotblasted",
    "name": "Riven Shotblasted",
    "tagline": "Riven, with extra grip.",
    "description": "A natural riven face further shotblasted to even the texture and lift slip resistance, while keeping the cleft character intact. For external paving that needs both character and grip.",
    "hero": "/images/khadane/surfaces/riven-shotblasted/camel-dust.webp",
    "heroJpg": "/images/khadane/surfaces/riven-shotblasted/camel-dust.jpg",
    "images": [
      {
        "variety": "Camel Dust",
        "file": "/images/khadane/surfaces/riven-shotblasted/camel-dust.webp",
        "jpg": "/images/khadane/surfaces/riven-shotblasted/camel-dust.jpg",
        "thumb": "/images/khadane/surfaces/riven-shotblasted/camel-dust-thumb.webp"
      }
    ]
  },
  {
    "slug": "tumbled",
    "name": "Tumbled",
    "tagline": "Aged and weathered.",
    "description": "Tumbled with abrasive to soften the edges and surface, giving an aged, antique character. Ideal for rustic patios, courtyards and heritage settings.",
    "hero": "/images/khadane/surfaces/tumbled/camel-dust.webp",
    "heroJpg": "/images/khadane/surfaces/tumbled/camel-dust.jpg",
    "images": [
      {
        "variety": "Camel Dust",
        "file": "/images/khadane/surfaces/tumbled/camel-dust.webp",
        "jpg": "/images/khadane/surfaces/tumbled/camel-dust.jpg",
        "thumb": "/images/khadane/surfaces/tumbled/camel-dust-thumb.webp"
      },
      {
        "variety": "Crazy Paving",
        "file": "/images/khadane/surfaces/tumbled/crazy-paving.webp",
        "jpg": "/images/khadane/surfaces/tumbled/crazy-paving.jpg",
        "thumb": "/images/khadane/surfaces/tumbled/crazy-paving-thumb.webp"
      }
    ]
  },
  {
    "slug": "rockfaced",
    "name": "Rockfaced",
    "tagline": "Bold, raised relief.",
    "description": "Hand-dressed to a raised, pillowed face with strong three-dimensional relief. A rugged, architectural finish for wall cladding, boundary walls and elevations.",
    "hero": "/images/khadane/surfaces/rockfaced/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/rockfaced/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/rockfaced/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/rockfaced/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/rockfaced/kandla-grey-thumb.webp"
      },
      {
        "variety": "Brown",
        "file": "/images/khadane/surfaces/rockfaced/brown.webp",
        "jpg": "/images/khadane/surfaces/rockfaced/brown.jpg",
        "thumb": "/images/khadane/surfaces/rockfaced/brown-thumb.webp"
      }
    ]
  },
  {
    "slug": "hand-chiseled",
    "name": "Hand Chiseled",
    "tagline": "Hand-tooled lines.",
    "description": "Chisel-worked by hand for a linear, tooled texture with genuine artisanal variation. A characterful finish for feature walls, borders and steps.",
    "hero": "/images/khadane/surfaces/hand-chiseled/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/hand-chiseled/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/hand-chiseled/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/hand-chiseled/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/hand-chiseled/kandla-grey-thumb.webp"
      },
      {
        "variety": "Brown",
        "file": "/images/khadane/surfaces/hand-chiseled/brown.webp",
        "jpg": "/images/khadane/surfaces/hand-chiseled/brown.jpg",
        "thumb": "/images/khadane/surfaces/hand-chiseled/brown-thumb.webp"
      },
      {
        "variety": "Camel Dust",
        "file": "/images/khadane/surfaces/hand-chiseled/camel-dust.webp",
        "jpg": "/images/khadane/surfaces/hand-chiseled/camel-dust.jpg",
        "thumb": "/images/khadane/surfaces/hand-chiseled/camel-dust-thumb.webp"
      },
      {
        "variety": "Red Choco",
        "file": "/images/khadane/surfaces/hand-chiseled/red-choco.webp",
        "jpg": "/images/khadane/surfaces/hand-chiseled/red-choco.jpg",
        "thumb": "/images/khadane/surfaces/hand-chiseled/red-choco-thumb.webp"
      }
    ]
  },
  {
    "slug": "sparkling",
    "name": "Sparkling",
    "tagline": "Catches the light.",
    "description": "A surface treatment that draws out the natural mica and quartz in the stone, so it sparkles under light. A decorative finish for feature areas.",
    "hero": "/images/khadane/surfaces/sparkling/kandla-grey.webp",
    "heroJpg": "/images/khadane/surfaces/sparkling/kandla-grey.jpg",
    "images": [
      {
        "variety": "Kandla Grey",
        "file": "/images/khadane/surfaces/sparkling/kandla-grey.webp",
        "jpg": "/images/khadane/surfaces/sparkling/kandla-grey.jpg",
        "thumb": "/images/khadane/surfaces/sparkling/kandla-grey-thumb.webp"
      }
    ]
  }
]

export function getSurface(slug: string): Finish | undefined {
  return SURFACES.find((s) => s.slug === slug)
}
