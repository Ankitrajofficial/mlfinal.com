interface HeroWordRiseProps {
  words: string[]
  className?: string
  baseDelay?: number
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

// The headline rise is a pure CSS animation (.word-rise in globals.css), so it
// runs from the first paint without waiting for hydration and never leaves the
// heading blank if JavaScript is slow. Delays are capped so the whole line is
// on screen within roughly 900 ms of paint whatever the page asks for.
const MAX_BASE_DELAY_MS = 150
const MAX_STAGGER_MS = 60

export default function HeroWordRise({
  words,
  className = '',
  baseDelay = 100,
  staggerDelay = 110,
  as: Tag = 'h1',
}: HeroWordRiseProps) {
  const base = Math.min(baseDelay, MAX_BASE_DELAY_MS)
  const stagger = Math.min(staggerDelay, MAX_STAGGER_MS)

  return (
    <Tag className={`${className} no-justify`}>
      {words.map((word, i) => (
        <span key={i} className="word-rise align-bottom" style={{ marginRight: '0.25em' }}>
          <span style={{ animationDelay: `${base + i * stagger}ms` }}>{word}</span>
        </span>
      ))}
    </Tag>
  )
}
