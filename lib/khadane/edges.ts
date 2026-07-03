// KHADANE™ — Edge profiles — v3.0 (Surfaces/Edges/White Mint pack, 2026-07-03)
// Source of truth: KHADANE-surfaces-edges-whitemint/data — 4 edges replace the old 4.

import type { Finish } from './surfaces'

export const EDGES: Finish[] = [
  {
    "slug": "machine-cut",
    "name": "Machine Cut",
    "tagline": "Clean, square profiles.",
    "description": "Precision saw-cut edges giving clean, uniform, square profiles for tight jointing. The natural choice for contemporary slab and paver layouts.",
    "hero": "/images/khadane/edges/machine-cut/machine-cut.webp",
    "heroJpg": "/images/khadane/edges/machine-cut/machine-cut.jpg",
    "images": [
      {
        "variety": "Machine Cut",
        "file": "/images/khadane/edges/machine-cut/machine-cut.webp",
        "jpg": "/images/khadane/edges/machine-cut/machine-cut.jpg",
        "thumb": "/images/khadane/edges/machine-cut/machine-cut-thumb.webp"
      },
      {
        "variety": "Slabs",
        "file": "/images/khadane/edges/machine-cut/slabs.webp",
        "jpg": "/images/khadane/edges/machine-cut/slabs.jpg",
        "thumb": "/images/khadane/edges/machine-cut/slabs-thumb.webp"
      },
      {
        "variety": "Pavers",
        "file": "/images/khadane/edges/machine-cut/pavers.webp",
        "jpg": "/images/khadane/edges/machine-cut/pavers.jpg",
        "thumb": "/images/khadane/edges/machine-cut/pavers-thumb.webp"
      }
    ]
  },
  {
    "slug": "straight-handcut",
    "name": "Straight Handcut",
    "tagline": "Crisp, with character.",
    "description": "Hand-cut to a straight line, carrying subtle irregularity — crisp but unmistakably handmade. Suited to copings and pavers.",
    "hero": "/images/khadane/edges/straight-handcut/straight-handcut.webp",
    "heroJpg": "/images/khadane/edges/straight-handcut/straight-handcut.jpg",
    "images": [
      {
        "variety": "Straight Handcut",
        "file": "/images/khadane/edges/straight-handcut/straight-handcut.webp",
        "jpg": "/images/khadane/edges/straight-handcut/straight-handcut.jpg",
        "thumb": "/images/khadane/edges/straight-handcut/straight-handcut-thumb.webp"
      },
      {
        "variety": "Copings",
        "file": "/images/khadane/edges/straight-handcut/copings.webp",
        "jpg": "/images/khadane/edges/straight-handcut/copings.jpg",
        "thumb": "/images/khadane/edges/straight-handcut/copings-thumb.webp"
      }
    ]
  },
  {
    "slug": "hand-cut",
    "name": "Hand Cut",
    "tagline": "Traditional and rustic.",
    "description": "Fully hand-dressed edges with natural variation, for a traditional, rustic joint. At home in heritage and garden paving.",
    "hero": "/images/khadane/edges/hand-cut/hand-cut.webp",
    "heroJpg": "/images/khadane/edges/hand-cut/hand-cut.jpg",
    "images": [
      {
        "variety": "Hand Cut",
        "file": "/images/khadane/edges/hand-cut/hand-cut.webp",
        "jpg": "/images/khadane/edges/hand-cut/hand-cut.jpg",
        "thumb": "/images/khadane/edges/hand-cut/hand-cut-thumb.webp"
      }
    ]
  },
  {
    "slug": "bullnose",
    "name": "Bullnose",
    "tagline": "Rounded and finished.",
    "description": "A rounded, half-round profile edge — soft, safe and neatly finished. The standard for steps, copings and pool edges.",
    "hero": "/images/khadane/edges/bullnose/bullnose.webp",
    "heroJpg": "/images/khadane/edges/bullnose/bullnose.jpg",
    "images": [
      {
        "variety": "Bullnose",
        "file": "/images/khadane/edges/bullnose/bullnose.webp",
        "jpg": "/images/khadane/edges/bullnose/bullnose.jpg",
        "thumb": "/images/khadane/edges/bullnose/bullnose-thumb.webp"
      }
    ]
  }
]

export function getEdge(slug: string): Finish | undefined {
  return EDGES.find((e) => e.slug === slug)
}
