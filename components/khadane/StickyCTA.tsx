'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MessageCircle, Mail } from 'lucide-react'
import { SITE } from '@/lib/khadane/site'

export default function StickyCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/desk' || pathname?.startsWith('/desk/')) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-30 flex flex-col gap-3 transition-all duration-600 ease-editorial ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <a
        href={SITE.contact.whatsappUrl}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp KHADANE"
        className="group bg-quarry-gold text-obsidian rounded-full p-4 shadow-lg hover:bg-obsidian hover:text-quarry-gold transition-all duration-400 ease-editorial"
      >
        <MessageCircle size={22} strokeWidth={1.5} />
      </a>
      <Link
        href="/desk"
        aria-label="Write to The Desk"
        className="hidden md:flex bg-obsidian text-warm-white rounded-full p-4 shadow-lg hover:bg-quarry-gold hover:text-obsidian transition-all duration-400 ease-editorial"
      >
        <Mail size={22} strokeWidth={1.5} />
      </Link>
    </div>
  )
}
