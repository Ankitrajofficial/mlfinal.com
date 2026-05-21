import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  FAMILY,
  NEXT_WAVE,
  INSTITUTIONAL_PARTNER,
  LOCATIONS,
  formatFamilyName,
  type FamilyMember,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import SectionHeader from '@/components/mls/SectionHeader'
import PlaceholderImage from '@/components/shared/PlaceholderImage'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Our Legacy',
  description:
    'The legacy of Mohan Lal & Sons: the founding work, the brothers who built it, the generation now operating it, and the children growing up around it. Since 1972.',
  path: '/our-legacy',
})

/**
 * Two-part page:
 *   PART I — institutional narrative (founding, the shape of the work)
 *   PART II — the family (G1 → G2 → G3 → Next Wave + Milan Ji)
 */
export default function OurLegacyPage() {
  const g1 = FAMILY.filter((m) => m.generation === 'G1')
  const g2 = FAMILY.filter((m) => m.generation === 'G2')
  const g3 = FAMILY.filter((m) => m.generation === 'G3')

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                The Legacy · {FOUNDING.yearsEvergreen}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter leading-[1.02] text-mls-ink mb-8">
                The work began
                <span className="block italic text-mls-gold mt-2">
                  with stone.
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <p className="font-display italic text-2xl md:text-3xl text-mls-tobacco max-w-3xl leading-snug">
                A reading of the work, the brothers who carried it, and the
                generation that operates it now.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART I — THE INSTITUTIONAL NARRATIVE
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-32 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-16">
            <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
              Part I
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
              The shape of the work.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Narrative column */}
            <div className="lg:col-span-7 space-y-10 text-lg leading-relaxed text-mls-ink/85">
              <RevealOnScroll>
                <p>
                  The group began in 1972, in Bijolia, with the first stone
                  cut from the family&rsquo;s own land. The two brothers
                  founders the work — Shri Bhura Lal Dhakar and his younger
                  brother, Shri Mohan Lal Dhakar, for whom the group is
                  named. Their decision was simple: work the stone, work the
                  belt, and stay close to home.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p>
                  For the first twenty-five years the work was almost
                  entirely stone. The family expanded into transport because
                  the stone had to move. Into fuel because the trucks had to
                  run. Into hospitality because the families of the children
                  who came to Kota for the entrance exams needed somewhere
                  to stay. Into housing for those children themselves. Into
                  food for them. Each new operation was an answer to an
                  obligation the family had already taken on.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p>
                  Direct buyer-to-buyer export was consolidated under
                  KHADANE™ in 2026. For the previous{' '}
                  {FOUNDING.indirectExportYears.toLowerCase()}, the stone
                  reached its overseas markets through intermediaries; the
                  family knew the quarry and the loading port, but not
                  always the building it ended up in. KHADANE™ closes that
                  distance.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p>
                  The group operates five verticals today, and every one of
                  them is run by a member of the family. The founders are
                  still consulted. The brothers walk the quarry every
                  working day. The third generation has taken on the
                  operational lead for each vertical, with the second
                  generation as anchor.
                </p>
              </RevealOnScroll>
            </div>

            {/* Visual column */}
            <div className="lg:col-span-5">
              <RevealOnScroll delay={100}>
                <PlaceholderImage
                  label="LEGACY · DOCUMENTARY"
                  title="The first quarry."
                  spec="1200 × 1500px · Quarry-face archival or recent, family land"
                  swapPath="/img/legacy-first-quarry.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="mls-tobacco"
                />
                <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mt-4 italic">
                  Bijolia, {LOCATIONS.bijolia.district}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART II — THE FAMILY
          ============================================================ */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-16">
            <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
              Part II
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
              The family, read in order.
            </h2>
          </div>

          {/* G1 — Founders */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-baseline justify-between mb-8 border-b border-mls-ink/10 pb-4">
              <h3 className="font-display text-2xl md:text-3xl text-mls-ink">
                First Generation
                <span className="font-mono text-[10px] uppercase tracking-marker text-mls-slate ml-3">
                  Founders
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {g1.map((m, i) => (
                <RevealOnScroll key={m.name} delay={i * 100}>
                  <FamilyCard m={m} variant="founder" />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* G2 — Brothers / Builders */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-baseline justify-between mb-8 border-b border-mls-ink/10 pb-4">
              <h3 className="font-display text-2xl md:text-3xl text-mls-ink">
                Second Generation
                <span className="font-mono text-[10px] uppercase tracking-marker text-mls-slate ml-3">
                  Sons of Shri Mohan Lal · At the quarry every working day
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {g2.map((m, i) => (
                <RevealOnScroll key={m.name} delay={i * 80}>
                  <FamilyCard m={m} variant="builder" />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* G3 — Operating Generation */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-baseline justify-between mb-8 border-b border-mls-ink/10 pb-4">
              <h3 className="font-display text-2xl md:text-3xl text-mls-ink">
                Third Generation
                <span className="font-mono text-[10px] uppercase tracking-marker text-mls-slate ml-3">
                  Operational leads, one per vertical
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {g3.map((m, i) => (
                <RevealOnScroll key={m.name} delay={i * 80}>
                  <FamilyCard m={m} variant="operating" />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Next Wave */}
          <div className="mb-16">
            <div className="flex items-baseline justify-between mb-6 border-b border-mls-ink/10 pb-4">
              <h3 className="font-display text-2xl md:text-3xl text-mls-ink">
                The Next Wave
                <span className="font-mono text-[10px] uppercase tracking-marker text-mls-slate ml-3">
                  The children
                </span>
              </h3>
            </div>
            <RevealOnScroll>
              <p className="font-display italic text-xl text-mls-tobacco max-w-2xl mb-6">
                {NEXT_WAVE.join(' · ')}
              </p>
              <p className="text-base leading-relaxed text-mls-ink/80 max-w-2xl">
                The children of the third generation. They grow up around
                the work — at the quarry, at the residences, at the kitchen
                — without yet being asked to carry any of it. They are
                named here because they are part of the family.
              </p>
            </RevealOnScroll>
          </div>

          {/* Institutional Partner — Milan Ji */}
          <div>
            <div className="flex items-baseline justify-between mb-8 border-b border-mls-ink/10 pb-4">
              <h3 className="font-display text-2xl md:text-3xl text-mls-ink">
                An Institutional Partner
                <span className="font-mono text-[10px] uppercase tracking-marker text-mls-slate ml-3">
                  Family standing · Since {INSTITUTIONAL_PARTNER.tenureStart}
                </span>
              </h3>
            </div>
            <RevealOnScroll>
              <div className="bg-mls-ink text-mls-cream p-8 lg:p-10 max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-3">
                  Mr. {INSTITUTIONAL_PARTNER.name}
                </p>
                <h4 className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] mb-5">
                  Execution backbone.
                </h4>
                <p className="text-base leading-relaxed text-mls-cream/85 mb-3">
                  Mr. {INSTITUTIONAL_PARTNER.name} joined the work{' '}
                  {INSTITUTIONAL_PARTNER.poeticPhrase} — that is,{' '}
                  {INSTITUTIONAL_PARTNER.directPhrase}. He anchors Vyanjanam
                  and Divine Dining and has stood beside the family for{' '}
                  {INSTITUTIONAL_PARTNER.tenureYears} years.
                </p>
                <p className="font-display italic text-lg text-mls-gold">
                  Named here because the institutional work of the family
                  cannot honestly be told without him.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          CLOSING
          ============================================================ */}
      <section className="bg-mls-cream py-20 lg:py-28 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-display italic text-2xl md:text-3xl text-mls-ink leading-snug">
                {ENTITIES.footerSignature}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-slate mt-6">
                Bijolia · {LOCATIONS.bijolia.district} ·{' '}
                {FOUNDING.yearsEvergreen}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}

// ============================================================
// FamilyCard helper
// ============================================================

interface FamilyCardProps {
  m: FamilyMember
  variant: 'founder' | 'builder' | 'operating'
}

function FamilyCard({ m, variant }: FamilyCardProps) {
  const isFounder = variant === 'founder'
  return (
    <div
      className={`p-7 lg:p-8 border ${
        isFounder
          ? 'bg-mls-tobacco text-mls-cream border-mls-tobacco'
          : 'bg-mls-cream text-mls-ink border-mls-ink/10'
      }`}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-marker mb-3 ${
          isFounder ? 'text-mls-gold' : 'text-mls-gold'
        }`}
      >
        {m.generation} · {m.honorific}
      </p>
      <h4
        className={`font-display ${
          isFounder ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
        } tracking-tight leading-tight mb-3`}
      >
        {formatFamilyName(m)}
      </h4>
      <p
        className={`text-sm leading-relaxed ${
          isFounder ? 'text-mls-cream/85' : 'text-mls-ink/75'
        }`}
      >
        {m.mlsRole}
      </p>
    </div>
  )
}
