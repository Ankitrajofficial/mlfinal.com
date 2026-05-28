import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import {
  ENTITIES,
  FOUNDING,
  MLS_SCALE,
  CONTACT,
  INSTITUTIONAL_PARTNER,
  SIGNATURE_LINES,
  FAMILY,
} from '@/lib/facts'
import RevealOnScroll from '@/components/shared/RevealOnScroll'
import PlaceholderImage from '@/components/shared/PlaceholderImage'
import VyanjanamSection from '@/components/mls/VyanjanamSection'

export const metadata = buildMetadata({
  site: 'mls',
  title: 'Food Services — Vyanjanam',
  description:
    "Vyanjanam — the family's kitchen for the coaching students of Kota. Pure vegetarian, 1,000+ daily meals, FSSAI certified, since 2023. Sourced from the family farm at Bijolia.",
  path: '/verticals/food-services',
})

const rahul = FAMILY.find((m) => m.name.includes('Rahul'))
const rohan = FAMILY.find((m) => m.name.includes('Rohan'))

const vyanjanamGallery = [
  {
    src: '/img/vyanjanam/exterior-aerial.jpg',
    title: 'Vyanjanam exterior view',
    meta: 'Facility',
    aspect: 'aspect-[16/10]',
    className: 'md:col-span-2',
  },
  {
    src: '/img/vyanjanam/front-entrance.jpg',
    title: 'Front entrance',
    meta: 'Arrival',
    aspect: 'aspect-[4/5]',
    className: '',
  },
  {
    src: '/img/vyanjanam/main-dining-hall.jpg',
    title: 'Main dining hall',
    meta: 'Dining',
    aspect: 'aspect-[4/5]',
    className: '',
  },
  {
    src: '/img/vyanjanam/live-kitchen.jpg',
    title: 'Live cooking in kitchen',
    meta: 'Kitchen',
    aspect: 'aspect-[4/5]',
    className: '',
  },
  {
    src: '/img/vyanjanam/meal-box-prep.jpg',
    title: 'Meal box preparation',
    meta: 'Tiffin',
    aspect: 'aspect-[4/5]',
    className: '',
  },
  {
    src: '/img/vyanjanam/service-counter.jpg',
    title: 'Self-service counter',
    meta: 'Service',
    aspect: 'aspect-[16/10]',
    className: 'md:col-span-2',
  },
  {
    src: '/img/vyanjanam/roti-prep.jpg',
    title: 'Roti dough preparation',
    meta: 'Kitchen',
    aspect: 'aspect-[16/10]',
    className: 'md:col-span-2',
  },
  {
    src: '/img/vyanjanam/skylit-dining.jpg',
    title: 'Skylit dining area',
    meta: 'Dining',
    aspect: 'aspect-[16/10]',
    className: 'md:col-span-2',
  },
]

export default function FoodServicesPage() {
  return (
    <>
      {/* SECTION 01 — HERO (Vyanjanam dark treatment) */}
      <VyanjanamSection>
        <div className="max-w-5xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-marker text-vyanjanam-light mb-6">
              05 · Food Services · Vyanjanam
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter leading-[1.02] text-vyanjanam-white mb-8">
              The meal that comes
              <span className="block italic text-vyanjanam-light mt-2">
                before the exam.
              </span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={250}>
            <p className="font-display italic text-2xl md:text-3xl text-vyanjanam-light/90 max-w-3xl leading-snug">
              Vyanjanam is the family&rsquo;s kitchen for the coaching
              students of Kota. {MLS_SCALE.vyanjanamDailyMeals}. Pure
              vegetarian. Since {MLS_SCALE.vyanjanamFounded}.
            </p>
          </RevealOnScroll>
        </div>
      </VyanjanamSection>

      {/* SECTION 02 — THE PHILOSOPHICAL ANCHOR */}
      <section className="bg-mls-cream py-20 lg:py-32 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                02 · The reading
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-mls-ink mb-10">
                {SIGNATURE_LINES.foodAndHumanDignity}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={250}>
              <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85">
                <p>
                  Vyanjanam is the operating brand of{' '}
                  {ENTITIES.vyanjanam.vehicle}, the family&rsquo;s
                  food-services vehicle. The kitchen serves three streams,
                  read separately below: dine-in mess service at Kunhari;
                  tiffin delivery to the boys&rsquo; residences in the same
                  neighbourhood; and Divine Dining, the in-house residence
                  kitchen that serves the two girls&rsquo; campuses.
                </p>
                <p>
                  All three draw on the same sourcing chain. {MLS_SCALE.vegSourcingPct}. The dairy is from
                  the family&rsquo;s own farm in Bijolia. The institutional
                  knowledge of feeding coaching students at scale has been
                  developed by the family over the last several years.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE OPEN MESS */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  03 · The open mess
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-8">
                  Pure vegetarian.
                  <span className="block italic text-mls-gold mt-2">
                    FSSAI certified. Since {MLS_SCALE.vyanjanamFounded}.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <div className="space-y-5 text-lg leading-relaxed text-mls-ink/85">
                  <p>
                    The dine-in service in Kunhari is open to coaching
                    students from outside the family&rsquo;s own residences,
                    to walk-in guests, and to visiting parents. The mess
                    operates daily, with the kitchen closed for deep
                    cleaning on the {MLS_SCALE.vyanjanamClosure.toLowerCase()}.
                  </p>
                  <p>
                    Service runs on the rhythm of the coaching day:
                    breakfast before morning classes, lunch between
                    sessions, dinner after evening study. Over five hundred
                    students subscribe to the monthly plan.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5">
              <RevealOnScroll delay={150}>
                <PlaceholderImage
                  label="VYANJANAM · MESS HALL"
                  title="Lunch service, mid-day."
                  spec="1200 × 1500px · Active service, real students, no flash"
                  swapPath="/img/vyanjanam-mess.jpg"
                  aspectRatio="aspect-[4/5]"
                  variant="vyanjanam-dark"
                />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — THE PLACE IN PICTURES */}
      <section className="bg-mls-ink text-mls-cream py-20 lg:py-32 border-b border-mls-cream/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-vyanjanam-light mb-5">
                  04 · The place in pictures
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  The dining hall,
                  <span className="block italic text-vyanjanam-light mt-2">
                    kitchen, and service floor.
                  </span>
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <RevealOnScroll delay={180}>
                <p className="text-lg leading-relaxed text-mls-cream/78">
                  The photographs read Vyanjanam as a working food-service
                  operation: the entrance, the dining floor, kitchen prep,
                  tiffin packing, and the self-service rhythm of the day.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {vyanjanamGallery.map((item, i) => (
              <RevealOnScroll key={item.src} delay={i * 60}>
                <figure
                  className={`group relative overflow-hidden border border-mls-cream/10 bg-vyanjanam-hero ${item.aspect} ${item.className}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes={
                      item.className
                        ? '(min-width: 768px) 50vw, 100vw'
                        : '(min-width: 768px) 25vw, 100vw'
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5">
                    <p className="font-mono text-[10px] uppercase tracking-marker text-vyanjanam-light/80 mb-2">
                      {item.meta}
                    </p>
                    <p className="font-display text-xl text-vyanjanam-white leading-tight">
                      {item.title}
                    </p>
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — THE SOURCING CHAIN */}
      <section className="bg-mls-cream py-20 lg:py-32 border-b border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-5xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-6">
                05 · The sourcing chain
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-mls-ink mb-10">
                From the farm in Bijolia
                <span className="block italic text-mls-gold mt-2">
                  to the tray in Kota.
                </span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-lg leading-relaxed text-mls-ink/85 mb-12 max-w-3xl">
                The chain the kitchen serves from is short enough that the
                family can name every link. We read it here.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-mls-ink/10">
            {[
              {
                num: '01',
                title: 'Bijolia farm.',
                body: 'Vegetables, where the season permits. 50-60% of the produce from the family farm.',
              },
              {
                num: '02',
                title: 'Bijolia dairy.',
                body: "The family's own dairy. Milk and curd carried to the Kota home in the morning.",
              },
              {
                num: '03',
                title: "The family kitchen.",
                body: "From the Kota house, Rahul Ji's mother sends the day's buttermilk to the kitchen.",
              },
              {
                num: '04',
                title: 'The student tray.',
                body: 'Vyanjanam open mess. Tiffin to the boys. Divine Dining at the girls&rsquo; campuses.',
              },
            ].map((step, i) => (
              <RevealOnScroll key={step.num} delay={i * 80}>
                <div className="bg-mls-cream p-7 lg:p-8 h-full">
                  <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-4">
                    {step.num}
                  </p>
                  <h3 className="font-display text-xl lg:text-2xl text-mls-ink tracking-tight leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-mls-ink/75"
                    dangerouslySetInnerHTML={{ __html: step.body }}
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — THE FOUNDERS (text-only treatment per locked decision) */}
      <section className="bg-mls-buff/20 py-20 lg:py-32 border-y border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                06 · The founders
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-mls-ink tracking-tight">
                Read by name.
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: rahul ? `${rahul.honorific} ${rahul.name}` : 'Mr. Rahul Dhakar',
                role: 'CO-FOUNDER · INSTITUTIONAL ANCHOR',
                body: 'CEO of the group. Operational lead for Food Services, Hospitality, and Student Housing. Carries the institutional voice of the kitchen.',
              },
              {
                name: rohan ? `${rohan.honorific} ${rohan.name}` : 'Mr. Rohan Dhakar',
                role: 'CO-FOUNDER · FOUNDER BEHIND THE FLAVOUR',
                body: 'Trained chef. BBA in Entrepreneurship. Co-founded Vyanjanam with Rahul and runs the kitchen day to day. Carries the operational lead.',
              },
              {
                name: `Mr. ${INSTITUTIONAL_PARTNER.name}`,
                role: 'EXECUTION BACKBONE · FAMILY STANDING',
                body: `Anchors the kitchen and the residences. Joined the work in ${INSTITUTIONAL_PARTNER.tenureStart} and has stood beside the family for ${INSTITUTIONAL_PARTNER.tenureYears} years. Named here because the work cannot be told without him.`,
              },
            ].map((founder, i) => (
              <RevealOnScroll key={founder.name} delay={i * 100}>
                <div className="bg-mls-cream p-8 border border-mls-ink/10 h-full">
                  <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold mb-4">
                    {founder.role}
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl text-mls-ink tracking-tight leading-tight mb-5">
                    {founder.name}
                  </h3>
                  <p className="text-base leading-relaxed text-mls-ink/80">
                    {founder.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400}>
            <p className="mt-12 text-base text-mls-slate italic max-w-3xl">
              Portraits will be added as documentary photography lands.
              Until then, this section reads honestly about the founders by
              name and role.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION 07 — THE SUBSCRIPTION ARCHITECTURE (plan structure only, no pricing) */}
      <section className="bg-mls-cream py-20 lg:py-32 border-b border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="mb-12 max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-3">
                07 · The subscription architecture
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-mls-ink tracking-tight leading-[1.1] mb-6">
                Four plans.
                <span className="block italic text-mls-gold mt-2">
                  Each suited to a different reading of the day.
                </span>
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                code: 'DAILY',
                title: 'Daily',
                body: 'Pay-as-you-eat. For walk-in students and visitors.',
                suited: 'Visiting parents · short stays',
              },
              {
                code: 'WEEKLY',
                title: 'Weekly',
                body: 'Two daily meals across a working week.',
                suited: 'Trial subscribers · short-course students',
              },
              {
                code: 'MONTHLY',
                title: 'Monthly',
                body: 'The standard student subscription. Two daily meals, six days a week.',
                suited: 'Full-time coaching students',
              },
              {
                code: 'TERM',
                title: 'Term',
                body: 'The coaching-year plan. Aligned with the academic term.',
                suited: 'Year-long coaching students',
              },
            ].map((plan, i) => (
              <RevealOnScroll key={plan.code} delay={i * 80}>
                <div className="bg-mls-cream border border-mls-ink/15 p-7 h-full flex flex-col">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-mls-gold" aria-hidden />
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-gold">
                      {plan.code}
                    </p>
                  </div>
                  <h3 className="font-display text-2xl text-mls-ink mb-3">
                    {plan.title}
                  </h3>
                  <p className="text-base leading-relaxed text-mls-ink/80 mb-4 flex-1">
                    {plan.body}
                  </p>
                  <div className="pt-4 border-t border-mls-ink/10">
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate mb-2">
                      Suited for
                    </p>
                    <p className="text-sm text-mls-ink/85">{plan.suited}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400}>
            <div className="mt-10 max-w-3xl">
              <p className="font-display italic text-lg text-mls-tobacco">
                For pricing in effect, write to The Office.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION 08 — VOICE OF STUDENTS (empty state) */}
      <section className="bg-mls-cream py-20 lg:py-28">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                08 · The voice of students
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-mls-ink mb-6">
                Testimonies from current students
                <span className="block italic text-mls-gold mt-2">
                  will be added as the work continues.
                </span>
              </h2>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* SECTION 09 — RESERVE / REACH THE KITCHEN */}
      <section className="bg-mls-tobacco text-mls-cream py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <p className="font-mono text-[11px] uppercase tracking-marker text-mls-gold mb-5">
                  09 · Reach the kitchen
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
                  Two direct lines.
                  <span className="block italic text-mls-gold mt-2">
                    Mess and tiffin.
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className="text-lg leading-relaxed text-mls-cream/85 max-w-xl">
                  For dine-in subscriptions and visits, call the mess
                  reception. For tiffin delivery to boys&rsquo; PGs, the
                  tiffin line. The Office reads all email enquiries within
                  one business day.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-mls-cream/15">
              <RevealOnScroll delay={150}>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Mess reception
                    </p>
                    <a
                      href={`tel:${CONTACT.vyanjanamReception.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.vyanjanamReception}
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-marker text-mls-cream/60 mb-2">
                      Tiffin delivery
                    </p>
                    <a
                      href={`tel:${CONTACT.vyanjanamTiffinDelivery.replace(/\s/g, '')}`}
                      className="font-display text-xl text-mls-cream hover:text-mls-gold transition-colors"
                    >
                      {CONTACT.vyanjanamTiffinDelivery}
                    </a>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-mls-gold text-mls-gold text-sm font-body tracking-wider uppercase hover:bg-mls-gold hover:text-mls-tobacco transition-all duration-400"
                    >
                      Open the contact page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mls-cream py-16 border-t border-mls-ink/10">
        <div className="mx-auto px-6 md:px-12 lg:px-16 max-w-[88rem]">
          <p className="font-mono text-[10px] uppercase tracking-marker text-mls-slate text-center">
            VYANJANAM · {ENTITIES.vyanjanam.vehicle.toUpperCase()} · KUNHARI, KOTA · {FOUNDING.yearsEvergreen.toUpperCase()}
          </p>
        </div>
      </section>
    </>
  )
}
