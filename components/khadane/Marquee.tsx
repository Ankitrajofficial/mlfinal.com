import { VARIETIES } from '@/lib/khadane/varieties'

export default function Marquee() {
  // Build a long string of codes interlaced with names
  const items = VARIETIES.map((v) => `${v.code}  ·  ${v.name.toUpperCase()}`)
  // Repeat twice for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-5 lg:py-6 border-y border-obsidian/8 bg-stone-linen">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs lg:text-sm tracking-wider text-tobacco/70 mx-6 lg:mx-10 no-justify"
          >
            {item}
            <span className="ml-6 lg:ml-10 text-quarry-gold/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
