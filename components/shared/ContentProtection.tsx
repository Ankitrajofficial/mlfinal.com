'use client'

import { useEffect } from 'react'

/**
 * Deters image saving and screen capture across the whole website.
 *
 * A browser cannot truly stop a screenshot (OS shortcuts, phone cameras and
 * devtools all bypass the page), so this raises the bar rather than closing it:
 *   - no "Save image as…" context menu, drag-out, or iOS long-press save
 *   - Cmd/Ctrl+S (save page) and Cmd/Ctrl+P (print) are swallowed
 *   - PrintScreen wipes the clipboard and briefly blanks the page
 *   - imagery hides while the window is unfocused (snipping tools steal focus)
 * Print output is hidden by the print rule in app/globals.css.
 *
 * Mounted once in the root layout, so it covers both sites and /admin.
 */
const MEDIA = 'img, picture, video, canvas, svg'

function isMedia(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  if (target.closest(MEDIA)) return true
  return getComputedStyle(target).backgroundImage.includes('url(')
}

export default function ContentProtection() {
  useEffect(() => {
    const root = document.documentElement

    const onContextMenu = (e: MouseEvent) => {
      if (isMedia(e.target)) e.preventDefault()
    }
    const onDragStart = (e: DragEvent) => {
      if (isMedia(e.target)) e.preventDefault()
    }

    let blankTimer: ReturnType<typeof setTimeout> | undefined
    const blankBriefly = () => {
      root.classList.add('capture-blank')
      clearTimeout(blankTimer)
      blankTimer = setTimeout(() => root.classList.remove('capture-blank'), 1500)
    }

    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      const key = e.key.toLowerCase()
      if (mod && (key === 's' || key === 'p')) {
        e.preventDefault()
        return
      }
      if (e.key === 'PrintScreen') {
        blankBriefly()
        navigator.clipboard?.writeText('').catch(() => {})
      }
    }

    const onBlur = () => root.classList.add('capture-guard')
    const onFocus = () => root.classList.remove('capture-guard')

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('dragstart', onDragStart)
    window.addEventListener('keydown', onKey)
    // PrintScreen on Windows only fires keyup.
    window.addEventListener('keyup', onKey)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)

    return () => {
      clearTimeout(blankTimer)
      root.classList.remove('capture-blank', 'capture-guard')
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('dragstart', onDragStart)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  return null
}
