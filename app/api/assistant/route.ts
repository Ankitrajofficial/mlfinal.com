import { type NextRequest } from 'next/server'
import { buildSystemPrompt } from '@/lib/khadane/assistant-context'
import { getClientIp } from '@/lib/rate-limit'

// KHADANE™ Assistant — streams a grounded reply from Groq (OpenAI-compatible).
// Requires GROQ_API_KEY in the environment. No external SDK — plain fetch.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

const MAX_MESSAGES = 16
const MAX_CHARS_PER_MESSAGE = 2000

// Lightweight in-memory rate limit: 20 requests / 5 min per IP.
const WINDOW_MS = 5 * 60 * 1000
const MAX_PER_WINDOW = 20
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null
  const cleaned: ChatMessage[] = []
  for (const m of input.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== 'object') continue
    const role = (m as { role?: unknown }).role
    const content = (m as { content?: unknown }).content
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue
    const trimmed = content.trim().slice(0, MAX_CHARS_PER_MESSAGE)
    if (trimmed) cleaned.push({ role, content: trimmed })
  }
  return cleaned.length ? cleaned : null
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'The assistant is not configured yet. Set GROQ_API_KEY to enable it.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(req.headers)
  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many messages. Please wait a moment and try again.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const messages = sanitizeMessages((body as { messages?: unknown })?.messages)
  if (!messages) {
    return Response.json({ error: 'No message provided.' }, { status: 400 })
  }

  let upstream: Response
  try {
    upstream = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 800,
        stream: true,
        messages: [{ role: 'system', content: buildSystemPrompt() }, ...messages],
      }),
    })
  } catch {
    return Response.json({ error: 'The assistant is unavailable right now.' }, { status: 502 })
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { error: 'The assistant could not respond. Please try again or write to The Desk.' },
      { status: 502 },
    )
  }

  // Parse Groq's SSE stream and forward only the text deltas as plain text.
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const reader = upstream.body.getReader()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = ''
      try {
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const data = trimmed.slice(5).trim()
            if (data === '[DONE]') continue
            try {
              const json = JSON.parse(data)
              const text = json?.choices?.[0]?.delta?.content
              if (text) controller.enqueue(encoder.encode(text))
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
      } catch {
        // upstream closed unexpectedly — end the stream gracefully
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
