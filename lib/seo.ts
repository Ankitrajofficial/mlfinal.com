import type { Metadata } from 'next'
import { MLS_SITE } from './site-mls'
import { KHADANE_SITE } from './site-khadane'
import { ENTITIES } from './facts'

/**
 * Shared SEO metadata helpers for both sites.
 * Per build prompt §4.7: metadataBase per site, alternates.canonical on every page.
 */

export type SiteName = 'mls' | 'khadane'

interface BuildMetadataOptions {
  site: SiteName
  title: string
  description: string
  path: string // e.g. '/our-legacy' (without trailing slash)
  ogImage?: string // optional override of default OG image
  noIndex?: boolean // for staging or unfinished pages
}

export function buildMetadata({
  site,
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const isKhadane = site === 'khadane'
  const baseUrl = isKhadane ? KHADANE_SITE.url : MLS_SITE.url
  const siteName = isKhadane ? KHADANE_SITE.name : MLS_SITE.name

  const fullUrl = `${baseUrl}${path === '/' ? '' : path}`
  const titleBrand = isKhadane
    ? `${title} · ${KHADANE_SITE.name}`
    : `${title} · ${MLS_SITE.name}`

  return {
    metadataBase: new URL(baseUrl),
    title: titleBrand,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: titleBrand,
      description,
      url: fullUrl,
      siteName,
      type: 'website',
      locale: 'en_IN',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleBrand,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

/**
 * JSON-LD generators per build prompt §4.7
 */
export function buildOrganizationLD(site: SiteName) {
  if (site === 'khadane') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: KHADANE_SITE.name,
      alternateName: KHADANE_SITE.shortName,
      url: KHADANE_SITE.url,
      parentOrganization: {
        '@type': 'Organization',
        name: KHADANE_SITE.groupParent,
        url: KHADANE_SITE.parent.site,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: KHADANE_SITE.origin,
        addressRegion: KHADANE_SITE.state,
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: KHADANE_SITE.contact.publicEmail,
        telephone: KHADANE_SITE.contact.publicPhone,
        availableLanguage: ['English', 'Hindi'],
      },
      foundingDate: String(KHADANE_SITE.foundationYear),
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: MLS_SITE.name,
    alternateName: MLS_SITE.acronym,
    url: MLS_SITE.url,
    description: MLS_SITE.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bijolia',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: MLS_SITE.contact.email,
      telephone: MLS_SITE.contact.phone,
      availableLanguage: ['English', 'Hindi'],
    },
    foundingDate: String(MLS_SITE.founded),
    subOrganization: [
      { '@type': 'Organization', name: ENTITIES.khadane.name },
      { '@type': 'Organization', name: ENTITIES.m3.hotel },
      { '@type': 'Organization', name: ENTITIES.vyanjanam.brand },
      { '@type': 'Organization', name: ENTITIES.dhakarMotors },
      { '@type': 'Organization', name: ENTITIES.dharnidharFuels },
    ],
  }
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export function buildBreadcrumbLD(site: SiteName, items: BreadcrumbItem[]) {
  const baseUrl = site === 'khadane' ? KHADANE_SITE.url : MLS_SITE.url

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href === '/' ? '' : item.href}`,
    })),
  }
}
