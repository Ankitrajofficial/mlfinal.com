'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, ArrowUp, Loader2 } from 'lucide-react'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What grey sandstones do you quarry?',
  'Which stones work for a driveway?',
  'What formats do you cut?',
  'How do I request a quote?',
]

const GREETING =
  'Namaste. I am the KHADANE assistant. Ask me about our sandstone varieties, formats, surfaces, or how to order.'

export default function KhadaneAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy) return

    const history = [...messages, { role: 'user' as const, content: question }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setBusy(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null)
        const msg =
          data?.error ||
          'Sorry — I could not respond just now. Please write to The Desk at office@khadane.com.'
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: msg }
          return next
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: acc }
          return next
        })
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Sorry — a connection error occurred. Please try again in a moment.',
        }
        return next
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close KHADANE assistant' : 'Ask the KHADANE assistant'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-quarry-gold px-5 py-4 text-obsidian shadow-lg transition-all duration-400 ease-editorial hover:bg-obsidian hover:text-quarry-gold"
      >
        {open ? <X size={20} strokeWidth={1.6} /> : <Sparkles size={20} strokeWidth={1.6} />}
        {!open && (
          <span className="hidden font-sans text-sm uppercase tracking-wider sm:inline">Ask KHADANE</span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-quarry-gold/25 bg-obsidian text-warm-white shadow-2xl sm:right-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-warm-white/10 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-quarry-gold/15 text-quarry-gold">
              <Sparkles size={18} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg leading-none text-warm-white">KHADANE Assistant</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-warm-white/40">
                Bijolia sandstone · since 1972
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="ml-auto grid h-8 w-8 place-items-center rounded-full text-warm-white/60 transition-colors hover:bg-warm-white/10 hover:text-warm-white"
            >
              <X size={18} strokeWidth={1.6} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-warm-white/[0.06] px-4 py-3 text-sm leading-relaxed text-warm-white/90">
              {GREETING}
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-quarry-gold px-4 py-3 text-sm leading-relaxed text-obsidian'
                    : 'max-w-[90%] rounded-2xl rounded-tl-sm bg-warm-white/[0.06] px-4 py-3 text-sm leading-relaxed text-warm-white/90'
                }
              >
                {m.content ? (
                  <span className="whitespace-pre-wrap">{m.content}</span>
                ) : (
                  <Loader2 size={16} className="animate-spin text-warm-white/50" />
                )}
              </div>
            ))}

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-warm-white/15 px-3 py-1.5 text-left font-sans text-xs text-warm-white/70 transition-colors hover:border-quarry-gold/50 hover:text-quarry-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="border-t border-warm-white/10 p-3"
          >
            <div className="flex items-end gap-2 rounded-xl bg-warm-white/[0.06] px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                placeholder="Ask about a stone or format…"
                className="max-h-28 flex-1 resize-none bg-transparent py-1 font-sans text-sm text-warm-white placeholder:text-warm-white/35 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-quarry-gold text-obsidian transition-opacity disabled:opacity-40"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} strokeWidth={2} />}
              </button>
            </div>
            <p className="mt-2 px-1 font-mono text-[10px] text-warm-white/30">
              For quotes & orders, write to The Desk.
            </p>
          </form>
        </div>
      )}
    </>
  )
}
