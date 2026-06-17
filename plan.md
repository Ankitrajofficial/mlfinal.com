# Plan — Apply KHADANE + MLS site edits

## Source material
Three hand-off files live in `~/Downloads` (not in the repo):
- `NOTE-FOR-ANKIT (2).md` — instruction note describing two patches.
- `khadane-edits.txt` — git diff for khadane.com (26 files). Newer/complete version.
- `mls-edits.txt` — git diff for mohanlalsonsgroup.com (22 files). Newer/complete version.

The `.txt` files are newer than the sibling `.patch` files (they additionally touch
`components/mls/StatMarquee.tsx`, `components/mls/VerticalCard.tsx`, `app/mls/layout.tsx`,
`app/mls/resources/brochures/page.tsx`). The NOTE's description matches the `.txt` files,
so the `.txt` files are the source of truth.

## What the edits do
**KHADANE (khadane.com):** Gallery → "The Record"; "provenance" → "origin"; decorative
section numbers removed; all port/Mundra references removed (→ "nationwide & worldwide");
Dhakar Stone Impex sub-brand framing dropped; Field Notes turned into real linked articles
(drop-cap, pull quotes, byline, sources); clean footer links; reduced-motion CSS.

**MLS (mohanlalsonsgroup.com):** "A working group." → "A working house."; decorative
numbering fully removed (incl. SectionHeader `number=` + VerticalCard 01–05 stamps);
Automotive "dealer" → "authorised service center", 2013 → 2012; food sourcing corrected
to "50–60% own farms, rest trusted vendors"; ports removed sitewide; indirect-export
reconciled to "25+ years"; "M3 Boutique Hotel" + "Dhakar Stone Group" standardised;
generational framing softened (Founders/Builders/Operating Family), "Next Wave" children
section removed; "family" overuse reduced; header enlarged + transparent-over-hero.

## Complication discovered
Current `main` (commit `0bdfdb6 "Site edits: MLS content pass + KHADANE footer link
cleanup"`) already contains **most of the KHADANE changes and some MLS changes**. The
`.txt` patches were cut against an older base, so a flat `git apply` fails on every file
(context drift / already-applied hunks).

## Approach
1. Work on a branch off `main`.
2. Apply each `.txt` patch with `git apply --3way` so already-applied hunks are skipped
   and only genuinely-new changes land. Resolve any conflict markers by hand.
3. `npx tsc --noEmit` to confirm the project still type-checks.
4. Review the diff, then commit. (Do not push until reviewed.)

## Flags left for Rahul (from the NOTE, not code changes)
1. Privacy/Terms legal entity naming — a CA question, left as-is.
2. In-page KHADANE CTA links still use `/khadane/...` prefix (work, redirect-hop).
3. Local-dev-only `/gallery` cold-route on bare `localhost`.
4. Student Housing brittle bed-count ternary, deliberately left.
