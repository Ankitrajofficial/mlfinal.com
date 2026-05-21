# Photography Shot List — KHADANE™

This document lists every documentary photograph the KHADANE™ site is waiting on or already has. Same principles as the MLS list: documentary, not advertising. No models, no flash, no posed shots.

KHADANE™'s photographic register is **slightly more refined** than MLS's — it's the trade-facing brand, and overseas buyers expect a certain editorial quality. But the principle remains: photograph the operation honestly.

## Same universal principles

- Available light wherever possible
- Working hours, not staged
- Hands visible where humans are in frame
- Documentary register
- Geo-stamps in metadata: Bijolia, Mundra, Xiamen (depending on subject)

## Resolutions

- Hero / full-bleed: **2400 × 3000 minimum**, JPEG/WebP ≤ 600 KB compressed
- Tile / grid: **1600 × 1200 minimum**
- Catalogue product shots: **2400 × 3000**, neutral grey background (#E8E3D7)

## Variety catalogue — the 21 sandstones

For each variety in `/lib/varieties.ts`, the KHADANE™ collection page expects:

| Asset | Path | Spec |
|---|---|---|
| Hero (full-bleed product shot) | `/public/varieties/<slug>-hero.jpg` | 2400×3000, 4:5 portrait |
| Texture (close-up surface) | `/public/varieties/<slug>-texture.jpg` | 2400×2400, 1:1 square |
| In-situ (installed setting) | `/public/varieties/<slug>-insitu.jpg` | 3000×2000, 3:2 landscape |

The 21 varieties are:

1. **Kandla Grey** (`kandla-grey`) — #KHD-001-KDG — the founding variety
2. **Autumn Brown** (`autumn-brown`) — #KHD-002-AB
3. **Sage Green** (`sage-green`) — #KHD-003-SG — formerly Raj Green
4. **Mint Fossil** (`mint-fossil`) — #KHD-004-MF
5. **Raj Blend** (`raj-blend`) — #KHD-005-RB
6. **Modak** (`modak`) — #KHD-006-MD
7. **Lalitpur Yellow** (`lalitpur-yellow`) — #KHD-007-LY
8. **Camel Dust** (`camel-dust`) — #KHD-008-CD
9. **Buff Brown** (`buff-brown`) — #KHD-009-BB
10. **Dholpur Beige** (`dholpur-beige`) — #KHD-010-DB
11. **Agra Red** (`agra-red`) — #KHD-011-AR
12. **Pink Sandstone** (`pink-sandstone`) — #KHD-012-PS
13. **Jodhpur Pink** (`jodhpur-pink`) — #KHD-013-JP
14. **Slate Grey** (`slate-grey`) — #KHD-014-SLG — OWNED
15. **Bansi Pink** (`bansi-pink`) — #KHD-015-BP
16. **Bansi Pahari** (`bansi-pahari`) — #KHD-016-BPH
17. **White Mint** (`white-mint`) — #KHD-017-WM
18. **Rainbow Sandstone** (`rainbow-sandstone`) — #KHD-018-RBS
19. **Tandur Yellow** (`tandur-yellow`) — #KHD-019-TY
20. **Kota Stone** (`kota-stone`) — #KHD-020-KS
21. **Teakwood** (`teakwood`) — #KHD-021-TKW — ALLIED variety (sourced from partner quarry at Garda, Kota District)

**Note:** For varieties marked as "allied" or "partner-sourced", document them in their natural setting (at the partner quarry, in transit, at the yard) rather than treating them as fully owned production.

## Format catalogue — the 14 production formats

For each format in `/lib/formats.ts`, the KHADANE™ formats page expects ONE primary image showing the format in production:

| Format | Path | Subject |
|---|---|---|
| Sawn Block | `/public/formats/sawn-block.jpg` | Block at the yard, dimensional markers visible |
| Cobble | `/public/formats/cobble.jpg` | Cobble stacks |
| Setts | `/public/formats/setts.jpg` | Setts on display, pattern visible |
| Tumbled Setts | `/public/formats/tumbled-setts.jpg` | Tumbled finish, edges rounded |
| Calibrated Paving | `/public/formats/calibrated-paving.jpg` | Calibrated slabs at the calibration line |
| Riven Paving | `/public/formats/riven-paving.jpg` | Natural-riven surface |
| Hand-Dressed Paving | `/public/formats/hand-dressed.jpg` | Worker dressing a slab by hand |
| Sawn Edge Paving | `/public/formats/sawn-edge-paving.jpg` | Slab edge detail showing saw marks |
| Tiles | `/public/formats/tiles.jpg` | Tile stack with dimensional callouts |
| Mosaic | `/public/formats/mosaic.jpg` | Mosaic pattern installed or stacked |
| Steps & Risers | `/public/formats/steps-risers.jpg` | Step profile, in situ if possible |
| Coping & Caps | `/public/formats/coping-caps.jpg` | Coping profile detail |
| Wall Cladding | `/public/formats/wall-cladding.jpg` | Cladding installed on a wall section |
| Custom Profiles | `/public/formats/custom-profiles.jpg` | Workshop, a custom shape being cut |

## Place-of-work documentary photos

These are the institutional photos that show KHADANE™ as an operation, not as a product:

### Quarry series
- `/public/img/quarry-001-face.jpg` — Quarry face in mid-morning light, workers visible
- `/public/img/quarry-002-loading.jpg` — Block loading onto a flatbed
- `/public/img/quarry-003-mining.jpg` — Active extraction
- `/public/img/quarry-004-team.jpg` — A team at lunch break, documentary

### Yard series
- `/public/img/yard-001-stockyard.jpg` — Block inventory at the Bijolia yard
- `/public/img/yard-002-calibration.jpg` — Calibration line in action
- `/public/img/yard-003-loading-container.jpg` — Loading a Mundra-bound container

### Desk series (the export desk)
- `/public/img/desk-001-laptop.jpg` — A laptop, a stone sample, a notebook
- `/public/img/desk-002-buyer-call.jpg` — Mid-call documentary (back of head, screen)

### Family at work (KHADANE side)
- `/public/img/khadane-family-quarry.jpg` — G2 + G3 at the quarry face

## Field notes photography

Each entry in `lib/field-notes.ts` has an optional `image` field. Photos here should match the editorial register of *The Caravan* or *Granta* — documentary moments, often without people in frame, that carry the institutional truth of the piece.

## Editorial constraints (for the photographer)

When shooting KHADANE™:

1. **No staging.** If the moment isn't happening, wait for it or come back.
2. **No retouching.** Light, colour balance, sharpening — yes. Removing imperfections — no. The quarry is dusty. The yard has tire tracks. The work is honest.
3. **Hands matter.** When humans appear, their hands should tell the story more than their faces.
4. **No buyers in frame.** We don't photograph our trade partners for our own marketing. Period.
5. **Documents in frame are acceptable.** A loading manifest, a calibration spec, a buyer's purchase order — these read as institutional truth. Crop personally identifying information if needed.

## Already-delivered photos

KHADANE v1 launched with placeholder images (gradients with text overlays) — these are still in place in `/public/varieties/` and `/public/formats/`. They render acceptably as the photographs are commissioned and swapped in over time.

The v1 site's `BrandWhisper`, `HeroWordRise`, and `Gallery` components use these placeholders gracefully. As real photographs land, they replace the placeholders one variety / one format / one section at a time.

## Cost estimate

Approximate count of photographs needed: **~70-80 across all 21 varieties (3 per variety) + 14 formats + 30 institutional/documentary**. At rates of ₹8,000-15,000 per finished frame, this is **₹6L-12L** for a complete KHADANE™ archive.

Realistic phasing:
- **Phase 1 (₹2L):** Top 6 varieties (Kandla Grey, Autumn Brown, Sage Green, Raj Blend, Teakwood, Slate Grey) — 3 photos each = 18 photos. Plus 12 institutional. Total ~30 photos.
- **Phase 2 (₹2L):** Remaining 15 varieties — 3 photos each = 45 photos.
- **Phase 3 (₹2L):** All 14 formats + 10 field-notes photos.

Phase 1 alone refreshes the bulk of what buyers see. Phases 2 and 3 can follow over the next year.

🔱
