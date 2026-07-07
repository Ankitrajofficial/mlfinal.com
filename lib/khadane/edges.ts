// KHADANE™ — Edge profiles — v3.0 (Surfaces/Edges/White Mint pack, 2026-07-03)
// Source of truth: KHADANE-surfaces-edges-whitemint/data — 4 edges replace the old 4.

import type { Finish } from './surfaces'

export const EDGES: Finish[] = [
  {
    "slug": "hand-cut",
    "name": "Hand Cut",
    "tagline": "Traditional and rustic.",
    "description": "Fully hand-dressed edges with natural variation, for a traditional, rustic joint. At home in heritage and garden paving.",
    "hero": "/images/khadane/edges/hand-cut/hand-cut-v2.webp",
    "heroJpg": "/images/khadane/edges/hand-cut/hand-cut-v2.jpg",
    "images": [
      {
        "variety": "Hand Cut",
        "file": "/images/khadane/edges/hand-cut/hand-cut-v2.webp",
        "jpg": "/images/khadane/edges/hand-cut/hand-cut-v2.jpg",
        "thumb": "/images/khadane/edges/hand-cut/hand-cut-v2-thumb.webp"
      }
    ]
  },
  {
    "slug": "straight-handcut",
    "name": "Straight Handcut",
    "tagline": "Crisp, with character.",
    "description": "Hand-cut to a straight line, carrying subtle irregularity — crisp but unmistakably handmade. Suited to copings and pavers.",
    "hero": "/images/khadane/edges/straight-handcut/straight-handcut-v4.webp",
    "heroJpg": "/images/khadane/edges/straight-handcut/straight-handcut-v4.jpg",
    "images": [
      {
        "variety": "Straight Handcut",
        "file": "/images/khadane/edges/straight-handcut/straight-handcut-v4.webp",
        "jpg": "/images/khadane/edges/straight-handcut/straight-handcut-v4.jpg",
        "thumb": "/images/khadane/edges/straight-handcut/straight-handcut-v4-thumb.webp"
      }
    ]
  },
  {
    "slug": "machine-cut",
    "name": "Machine Cut",
    "tagline": "Clean, square profiles.",
    "description": "Precision saw-cut edges giving clean, uniform, square profiles for tight jointing. The natural choice for contemporary slab and paver layouts.",
    "hero": "/images/khadane/edges/machine-cut/machine-cut-v2.webp",
    "heroJpg": "/images/khadane/edges/machine-cut/machine-cut-v2.jpg",
    "images": [
      {
        "variety": "Machine Cut",
        "file": "/images/khadane/edges/machine-cut/machine-cut-v2.webp",
        "jpg": "/images/khadane/edges/machine-cut/machine-cut-v2.jpg",
        "thumb": "/images/khadane/edges/machine-cut/machine-cut-v2-thumb.webp"
      }
    ]
  },
  {
    "slug": "bullnose",
    "name": "Bullnose",
    "tagline": "Rounded and finished.",
    "description": "A rounded, half-round profile edge — soft, safe and neatly finished. The standard for steps, copings and pool edges.",
    "hero": "/images/khadane/edges/bullnose/bullnose-v3.webp",
    "heroJpg": "/images/khadane/edges/bullnose/bullnose-v3.jpg",
    "images": [
      {
        "variety": "Bullnose",
        "file": "/images/khadane/edges/bullnose/bullnose-v3.webp",
        "jpg": "/images/khadane/edges/bullnose/bullnose-v3.jpg",
        "thumb": "/images/khadane/edges/bullnose/bullnose-v3-thumb.webp"
      }
    ]
  }
]

export function getEdge(slug: string): Finish | undefined {
  return EDGES.find((e) => e.slug === slug)
}
