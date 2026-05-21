# Photography Shot List — MLS Side

This document lists every documentary photograph the MLS site is waiting on. Every `<PlaceholderImage swapPath="…">` reference in the codebase resolves to a path under `/public/img/…` once the real photograph is delivered.

## How to use this document

For each photo listed below:
1. **Spec** — the technical brief (dimensions, light, framing)
2. **Path** — where the file goes in `/public/img/…`
3. **Page** — where it appears on the site
4. **Voice** — the editorial expectation for what the photo should feel like

Photographer brief in one line: **documentary, not advertising**. No models, no styling, no flash, no posed shots. Working photographs of working operations.

## Universal principles (apply to every shot)

- **Available light** wherever possible. No on-camera flash.
- **Real working hours.** Photograph the operation as it happens, not after closing.
- **Hands visible** where humans are in frame.
- **Wide aspect ratios** preferred — most placeholders are 4:5 portrait or 3:2 landscape.
- **Documentary register.** If a moment can't be captured authentically, don't fake it.
- **Geo-stamps welcome.** Bijolia or Kunhari in caption metadata.

## Resolutions

All hero-tier photos should deliver at 2× pixel density for retina displays:

- 4:5 portrait → **2400 × 3000 px minimum**, JPEG or WebP, ≤ 600KB compressed
- 3:2 landscape → **3000 × 2000 px minimum**
- Square (1:1) → **2400 × 2400 px minimum**

After deliverable, optimise via `npx @squoosh/cli` or similar. Final files in `/public/img/` should be ~120-200 KB.

---

## Homepage — `/`

### `bijolia-quarry-face.jpg`
- **Spec:** 1200 × 1500 (4:5 portrait minimum 2x)
- **Section:** 05 — The Bijolia Inscriptions
- **Voice:** "Working stone, working hands." Documentary of quarry face mid-morning, hands visible
- **Subject:** Bijolia stone belt. Workers at face. Natural light.

### `family-bijolia.jpg`
- **Spec:** 1600 × 1067 (3:2 landscape)
- **Section:** 09 — The Family preview
- **Voice:** "The brothers, at the quarry face."
- **Subject:** G2 brothers (Jagdish + Rajesh + Manoj + Sanjay) at the quarry. Not posed. Working day.

### Section 11 — Recent Work (3 tiles)
- `stone-recent-001.jpg` — Kandla Grey, batch-marked at the yard. 4:5
- `m3-recent.jpg` — M3 reception, late afternoon. 4:5
- `bijolia-dairy.jpg` — The morning milk run. 4:5

---

## `/our-legacy/`

### `legacy-first-quarry.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "The first quarry."
- **Subject:** Quarry-face (archival if available, recent otherwise) on the family's first land in Bijolia
- **Caption:** `Bijolia, Bhilwara District`

---

## `/verticals/stone-export/`

### `stone-export-quarry.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "The work, at the face."
- **Subject:** Quarry-face documentary. Strong sidelight. Tools and workers in shot.

---

## `/verticals/automotive-fuel/`

### `dhakar-motors.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "The dealership floor."
- **Subject:** Ashok Leyland dealership at Dabi, Bundi District. Working day. A truck being shown, the showroom, mechanics at work in the service bay.

### `dharnidhar-fuels.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "Forecourt, working hours."
- **Subject:** One of the two NH 27 stations. Daytime. A truck filling up. Forecourt staff. The flag of either IOC or Nayara should be incidentally in frame.

---

## `/verticals/hospitality/`

### `m3-lobby.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "The lobby, late afternoon."
- **Subject:** M3 Hotel reception/lobby. Late-afternoon light. A guest checking in or staff at the desk. Boutique-scale should read — not corporate hotel.

### `m3-mini-mall.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Voice:** "The walkway, between buildings."
- **Subject:** M3 Mini Mall — exterior or interior corridor. The neighbourhood-fixture feel. Foot traffic of locals, not tourists.

---

## `/verticals/student-housing/` (overview)

### `boys-pgs.jpg`
- **Spec:** 1600 × 1067 (3:2 landscape)
- **Voice:** "The walk to the door."
- **Subject:** Exterior or street-side view of one of the three boys' PGs in Kunhari. Time-of-day: late afternoon when students return from class.

---

## `/verticals/student-housing/girls/` — THE HIGH-STAKES PAGE

This page carries the most institutional weight on the entire site. Photography must read as documentary, respectful, the family's own daughters in spirit. **No close-ups of students. No identifiable faces in shots intended for the public archive.**

### Section 02 — The two houses (2 tiles)
- `princess-campus.jpg` — Princess residence. Exterior or common area. 3:2
- `victoria-campus.jpg` — Victoria Palace residence. Exterior or common area. 3:2

### `girls-campus-day.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Section:** 03 — The day
- **Voice:** "The dining area, morning."
- **Subject:** Dining area of the campus in the morning. Students at breakfast — backs to camera, hands visible, no faces. Or: the kitchen serving counter just before the meal.

### `divine-dining-kitchen.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Section:** 04 — The Divine Dining (named-only) block
- **Voice:** "The morning serve."
- **Subject:** Kitchen documentary. Hands of the kitchen staff. Service in progress. Available light. The institutional respect of the operation should read.

---

## `/verticals/food-services/` — VYANJANAM

### `vyanjanam-morning.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Section:** 01 — Hero (Vyanjanam dark)
- **Voice:** "Service, before the day's first paper."
- **Subject:** Morning service at Vyanjanam open mess. Real students. Backs to camera. The institutional rhythm of breakfast before class.

### `vyanjanam-mess.jpg`
- **Spec:** 1200 × 1500 (4:5)
- **Section:** 03 — The open mess
- **Voice:** "Lunch service, mid-day."
- **Subject:** Active service. Real students. Hands at the serving counter or eating. No faces.

---

## `/gallery/`

### Section 02 — Stone (4 tiles, all 3:4 portrait)
- `gallery-stone-001.jpg` — Block selection, morning.
- `gallery-stone-002.jpg` — Calibration line.
- `gallery-stone-003.jpg` — Loading, the Mundra container.
- `gallery-stone-004.jpg` — Hands at the face.

### Section 03 — Kunhari cluster (4 tiles, all 1:1 square)
- `gallery-m3-lobby.jpg` — M3 reception, late afternoon
- `gallery-princess-day.jpg` — Morning walk to class
- `gallery-victoria-study.jpg` — Library hours, evening
- `gallery-vyanjanam-busy.jpg` — Lunch, the busy hour

---

## Delivery & integration

When photographs are ready:

1. Save originals to `/photography/raw/` (gitignored, not committed)
2. Optimise: resize to spec, compress to ≤200 KB JPEG
3. Save final versions to `/public/img/<filename>.jpg`
4. The placeholders in components automatically swap in once `<PlaceholderImage swapPath="/img/<filename>.jpg">` resolves to a real file
5. No code changes needed — the placeholder gracefully degrades if the path is missing

## Cost estimate (for Rahul's budgeting)

Approximate count of placeholders: **~30 photographs** across the MLS side. At Indian commercial documentary photography rates (₹8,000-15,000 per finished frame for a quality photographer), this is a **₹2.5L-4.5L commission** for a complete site refresh.

A 2-day shoot at Bijolia + 2-day shoot at Kunhari, with a photographer who understands documentary register (think *The Caravan* magazine, not commercial advertising) — that's the right brief.

🔱
