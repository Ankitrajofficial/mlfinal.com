import type { Metadata } from 'next'
import { ENTITIES, FOUNDING } from '@/lib/facts'
import './admin.css'

export const metadata: Metadata = {
  title: `Command Centre · ${ENTITIES.group.name}`,
  description: `Internal operations console for ${ENTITIES.group.name} — ${FOUNDING.yearsEvergreen}.`,
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root" data-admin="true">
      {/* Prevent public-site body styles from fighting the console */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body:has(.admin-root) {
              background: #f4f1e8 !important;
              overflow: hidden;
            }
            body:has(.admin-root) p {
              text-align: left !important;
              hyphens: none !important;
            }
          `,
        }}
      />
      {children}
    </div>
  )
}
