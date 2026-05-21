'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Single MotionConfig wrapper for the app.
 * Respects user's prefers-reduced-motion setting per build prompt §4.7.
 * Mount once at site root (in each route group layout).
 */
export default function AppMotionConfig({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  )
}
