// ============================================================
// KHADANE™ — External image URL overrides per variety
// ------------------------------------------------------------
// URLs point at Google Drive (lh3.googleusercontent.com), the
// "KHADANE CORPORATION / Owned" folder. To swap an image, paste
// a new URL into the matching field. Empty/undefined falls back
// to /public/img/varieties/<slug>/<slot>.jpg, and a missing
// local file falls back to the generated SVG placeholder.
// ============================================================

export interface VarietyImageSet {
  hero?: string
  thumb?: string
  slabFace?: string
  surfaceClose?: string
  edgeProfile?: string
  workedFormat?: string
  sourceContext?: string
}

// Drive image helper: serves a public Drive file as a JPEG of the requested width.
const d = (id: string, w = 1600) =>
  `https://lh3.googleusercontent.com/d/${id}=w${w}`

export const VARIETY_IMAGES: Record<string, VarietyImageSet> = {
  'khadipur-grey': {
    hero:          d('1AhiqZ4SF3oP9I2gk6ZTHuBW782bpS-KX'),
    thumb:         d('1AhiqZ4SF3oP9I2gk6ZTHuBW782bpS-KX', 800),
    slabFace:      d('1AhiqZ4SF3oP9I2gk6ZTHuBW782bpS-KX'),
    surfaceClose:  d('1NICCniycZ6LhLRy35QndUSYhV6DM5xLI'),
  },
  'kandla-grey': {
    hero:          d('10_-Tp7z5Qu-McKSb28l5XrEkz6rG3OX3'),
    thumb:         d('10_-Tp7z5Qu-McKSb28l5XrEkz6rG3OX3', 800),
    slabFace:      d('10_-Tp7z5Qu-McKSb28l5XrEkz6rG3OX3'),
    surfaceClose:  d('1uv_2PJbZNucByXQZ0GDuNDytOEM1zx0y'),
    edgeProfile:   d('1DgelA-npbpJMqh-ztu21NhBmmGvCjYIu'),
    workedFormat:  d('1hjIaGMM3Banlz7TXUmXRpZCHf0pMxH6C'),
    sourceContext: d('12yPPeoPguL2hzGnjkxC1TtRbSk2qHIMB'),
  },
  'autumn-brown': {
    hero:          d('146PYc7R_OBaGdvdqSfF6Pv5SWcU2UyTa'),
    thumb:         d('146PYc7R_OBaGdvdqSfF6Pv5SWcU2UyTa', 800),
    slabFace:      d('146PYc7R_OBaGdvdqSfF6Pv5SWcU2UyTa'),
    surfaceClose:  d('1cQeOMeRFxxK60UM2g5e5gZEVjMANgQCq'),
    edgeProfile:   d('1hjsZ023NnZK3jslbv__jS6c-Hlg4Z2Dt'),
    workedFormat:  d('1IL44en1g7FAq0n9aqzOcxHICzbwwnCSw'),
    sourceContext: d('1X2O-ofyzDJGxja9-w8x86Gk-kPLUYtF5'),
  },
  'raj-blend': {
    hero:          d('1Y_1BDmq_8KOOpfIGRT7DYerRWdb0nv37'),
    thumb:         d('1Y_1BDmq_8KOOpfIGRT7DYerRWdb0nv37', 800),
    slabFace:      d('1Y_1BDmq_8KOOpfIGRT7DYerRWdb0nv37'),
    surfaceClose:  d('1VovtJaAIgUTI9SwiCRMG6dQyMMvMLI2d'),
    edgeProfile:   d('19rFUBy0y5RGT6v4Dy1-zqa6MOsahQ7HD'),
    workedFormat:  d('1gax6Jo3xVxKqdPyslqMSD_9YpdlBnpio'),
    sourceContext: d('1o2OcLQLdRO9mrCYzEd64ne4B0BLIrSqU'),
  },
  'garda-green': {
    // Note: 8 of 9 photos in Drive show photographer's feet — using the 1 clean photo (wet slabs on grass) for hero/thumb; other slots stay on placeholder.
    hero:          d('1fXsaOQBzdvsPtAtVlV26CyoUkrwZueGU'),
    thumb:         d('1fXsaOQBzdvsPtAtVlV26CyoUkrwZueGU', 800),
  },
  'slate-grey': {
    // Re-picked: original hero was a light pinkish surface; folder has actual dark-slate slab photos.
    hero:          d('1lXEGtJEp3BS60EOxnk_PIDP2g5oC-avr'), // dark slate slabs on earth
    thumb:         d('1lXEGtJEp3BS60EOxnk_PIDP2g5oC-avr', 800),
    slabFace:      d('1lXEGtJEp3BS60EOxnk_PIDP2g5oC-avr'),
    surfaceClose:  d('107E2MTktWAKLOLc5DoSFzI4-F25oigcS'), // close-up of grey slabs
    edgeProfile:   d('1NS9QVjUsn7_SBbMuT-MUZt5ha2bcE8a2'), // charcoal slabs
    workedFormat:  d('1ZGEPbaHpJqGl5BuUP2bfUKssoqii05LK'), // surface texture
    sourceContext: d('1Ipzpxg41DXqhDvx79pKdKMQT_IlRdMsr'), // pale grey surface
  },
  'mint': {
    hero:          d('1zle5V1XTQL_v-KpcA_R8GVttdcw2HHPH'),
    thumb:         d('1zle5V1XTQL_v-KpcA_R8GVttdcw2HHPH', 800),
    slabFace:      d('1zle5V1XTQL_v-KpcA_R8GVttdcw2HHPH'),
    surfaceClose:  d('1cfQEQyLzUfmp6H3TQ7WssDji_EXHz-3k'),
    edgeProfile:   d('1IhTAXtSFfrY_bxP4Y6iV3QbGY5F9ryhh'),
    workedFormat:  d('1ysKkBSDRmF0C3Vp6HU9L6Zp9MpRdh1mf'),
    sourceContext: d('1LrQOG9Y_u5p_mJocbF5v_87BcMgjhZmp'),
  },
  'fossil-mint': {
    hero:          d('1tkBEdzQzlAoB_xhdinFp3gDAvqocTVa-'),
    thumb:         d('1tkBEdzQzlAoB_xhdinFp3gDAvqocTVa-', 800),
    slabFace:      d('1tkBEdzQzlAoB_xhdinFp3gDAvqocTVa-'),
    surfaceClose:  d('1FPYmx8cHFYNupmi3JEreLFl_zkuQ-BSX'),
    edgeProfile:   d('11BNkkySDOE2MvVbYAl33rNjmvW5jPs62'),
    workedFormat:  d('1-LhADdFP7fDWa5LXxVRm0qFW9FRyfvAi'),
    sourceContext: d('1jzXNZnTKyYfogApSH9gf9cWOSdstNkfX'),
  },
  'buff': {
    hero:          d('1314ftFK_bamOHolVqKh5Yak-0Np8qZ0w'),
    thumb:         d('1314ftFK_bamOHolVqKh5Yak-0Np8qZ0w', 800),
    slabFace:      d('1314ftFK_bamOHolVqKh5Yak-0Np8qZ0w'),
    surfaceClose:  d('1LCirg8uybVYIpo6OuYoajzxq4NjK-5tg'),
    edgeProfile:   d('1InWSO0NbmuI6MPZzFPwqUDWO2Vxyqqua'),
    workedFormat:  d('1tsMDn4CU5ZJMooQTIoqyM7HPKb4-Vayu'),
    sourceContext: d('1kK8k69Dp8t7TCEPfUnL9gb_Ogb4KnQ1i'),
  },
  'camel-dust': {},
  'red-choco': {
    hero:          d('1njKN6rxMyQC5jv-_ekt1gYo0l63DxLqf'),
    thumb:         d('1njKN6rxMyQC5jv-_ekt1gYo0l63DxLqf', 800),
    slabFace:      d('1njKN6rxMyQC5jv-_ekt1gYo0l63DxLqf'),
  },
  'dual-tone': {
    hero:          d('1OkzMDWGhEU8KLRleW7XJzJ6JKf_k9vgz'),
    thumb:         d('1OkzMDWGhEU8KLRleW7XJzJ6JKf_k9vgz', 800),
    slabFace:      d('1OkzMDWGhEU8KLRleW7XJzJ6JKf_k9vgz'),
    surfaceClose:  d('19QhxdwMEn4omLjTbh0xk-iPPEZZ8MS8p'),
    edgeProfile:   d('1jdhcHJkcd7dovXL7cRanJYk27k_weGDo'),
    workedFormat:  d('142xXAgWbp74pYoMkvdsLRRiAYMbXey-l'),
    sourceContext: d('16ATBHIEQuohdohxd9_avyMYrbdPwqVKS'),
  },
  'multi-brown': {
    hero:          d('1XM6FKloE7NwOk4nbgneId-gA6IpcaXmM'),
    thumb:         d('1XM6FKloE7NwOk4nbgneId-gA6IpcaXmM', 800),
    slabFace:      d('1XM6FKloE7NwOk4nbgneId-gA6IpcaXmM'),
    surfaceClose:  d('1FmsrpECoGTsVIKWMT9RFjkdVF-DMihRl'),
    edgeProfile:   d('1yW2wLaLeXk1_8DbbWSY3grcnLc6peCdk'),
    workedFormat:  d('1Qw820y1glRXF3RCfp13I8Tn8nS4e36-1'),
    sourceContext: d('17EzqL2R-BemfisNPBi6zDcpHihMgQ-vG'),
  },
  'multi-colours': {},
  // Allied varieties — no Drive folder yet, will use placeholders
  'agra-red': {},
  'basalt-black': {},
  'dholpur-beige': {},
  'dholpur-pink': {},
  'gwalior-mint': {},
  'jaisalmer-yellow': {},
  'lalitpur-yellow': {},
  'sagar-black': {},
  'teakwood': {},
}

const local = (slug: string, fields: Array<keyof Omit<VarietyImageSet, 'hero' | 'thumb'>> = []): VarietyImageSet => {
  const set: VarietyImageSet = {
    hero: `/img/varieties/${slug}-hero.jpg`,
    thumb: `/img/varieties/${slug}-hero.jpg`,
  }

  fields.forEach((field) => {
    if (field === 'slabFace') set.slabFace = `/img/varieties/${slug}/slab-face.jpg`
    if (field === 'surfaceClose') set.surfaceClose = `/img/varieties/${slug}/surface-close.jpg`
    if (field === 'edgeProfile') set.edgeProfile = `/img/varieties/${slug}/edge-profile.jpg`
    if (field === 'workedFormat') set.workedFormat = `/img/varieties/${slug}/worked-format.jpg`
    if (field === 'sourceContext') set.sourceContext = `/img/varieties/${slug}/source-context.jpg`
  })

  return set
}

const LOCAL_VARIETY_IMAGES: Record<string, VarietyImageSet> = {
  'khadipur-grey': local('khadipur-grey', ['slabFace']),
  'kandla-grey': local('kandla-grey', ['slabFace', 'surfaceClose', 'edgeProfile', 'workedFormat', 'sourceContext']),
  'autumn-brown': local('autumn-brown', ['slabFace', 'surfaceClose', 'edgeProfile', 'workedFormat', 'sourceContext']),
  'raj-blend': local('raj-blend', ['slabFace', 'surfaceClose', 'edgeProfile', 'workedFormat', 'sourceContext']),
  'garda-green': local('garda-green', ['slabFace', 'surfaceClose']),
  'slate-grey': local('slate-grey', ['slabFace', 'surfaceClose']),
  'mint': local('mint', ['slabFace', 'surfaceClose']),
  'fossil-mint': local('fossil-mint', ['slabFace', 'surfaceClose']),
  'buff': local('buff', ['slabFace', 'surfaceClose']),
  'camel-dust': local('camel-dust', ['slabFace']),
  'red-choco': local('red-choco', ['slabFace']),
  'dual-tone': local('dual-tone', ['slabFace']),
  'multi-brown': local('multi-brown', ['slabFace', 'surfaceClose']),
  'multi-colours': local('multi-colours', ['slabFace']),
  'agra-red': local('agra-red', ['slabFace']),
  'basalt-black': local('basalt-black', ['slabFace']),
  'dholpur-beige': local('dholpur-beige', ['slabFace']),
  'dholpur-pink': local('dholpur-pink', ['slabFace']),
  'gwalior-mint': local('gwalior-mint', ['slabFace']),
  'jaisalmer-yellow': local('jaisalmer-yellow', ['slabFace']),
  'lalitpur-yellow': local('lalitpur-yellow', ['slabFace']),
  'sagar-black': local('sagar-black', ['slabFace']),
  'teakwood': local('teakwood', ['slabFace']),
}

export function getVarietyImage(
  slug: string,
  field: keyof VarietyImageSet,
  localFallback: string,
): string {
  const url = LOCAL_VARIETY_IMAGES[slug]?.[field] ?? VARIETY_IMAGES[slug]?.[field]
  return url && url.length > 0 ? url : localFallback
}
