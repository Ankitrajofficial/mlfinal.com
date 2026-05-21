import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── MLS v1.0 PALETTE ───────────────────────────────────────
        // The institutional/parent site colours.
        mls: {
          cream: '#EEEBE0', // Sandstone Cream — primary surface
          tobacco: '#4A3520', // Tobacco — accent / contact bands
          gold: '#B8962E', // Quarry Gold — SHARED with KHADANE; only crossover
          slate: '#999690', // Slate Grey — muted text
          ink: '#1A1410', // Deep Brown / Ink — primary text
          bracket: '#C8A84B', // Bracket Gold — secondary gold
          rust: '#7A5038', // Rust Earth — depth accent
          buff: '#C8B48A', // Buff Sand — soft warm
        },
        // ─── KHADANE™ v1.0 PALETTE ──────────────────────────────────
        // The trade brand. Darker, more refined, buyer-facing.
        khadane: {
          obsidian: '#111111',
          linen: '#E8E3D7', // Stone Linen — primary surface
          tobacco: '#3D2B1A', // Distinct from MLS tobacco; deeper
          gold: '#B8962E', // Quarry Gold — shared with MLS
          warm: '#F0EDE6', // Warm White
        },
        // ─── V1 COMPATIBILITY ALIASES ───────────────────────────────
        // Preserves v1 component class names (text-obsidian, bg-warm-white,
        // etc.) so the 13 v1 components + 14 v1 pages work unchanged.
        // KHADANE v1 site is institutionally locked — these aliases
        // protect it from accidental drift.
        obsidian: '#111111',
        'stone-linen': '#E8E3D7',
        tobacco: '#3D2B1A',
        'quarry-gold': '#B8962E',
        'warm-white': '#F0EDE6',
        graphite: '#3D3933',
        'mls-cream': '#EEEBE0',
        'mls-tobacco': '#4A3520',
        'mls-slate-grey': '#999690',
        'mls-deep-brown': '#1A1410',
        'mls-bracket-gold': '#C8A84B',
        'mls-rust-earth': '#7A5038',
        'mls-buff-sand': '#C8B48A',
        // ─── VYANJANAM v1.0 PALETTE ─────────────────────────────────
        // B&W minimalist food brand within MLS.
        // Extracted from source styles.css lines 6335-6450.
        vyanjanam: {
          black: '#000000',
          dark: '#1A1A1A', // hero gradient lower bound
          white: '#FFFFFF',
          offwhite: '#F5F5F5', // content sections background
          subtle: '#E8E8E8', // borders
          light: '#CCCCCC', // secondary text on dark surfaces
          medium: '#666666', // body text on light surfaces
          deep: '#333333', // strong body text
        },
      },
      fontFamily: {
        // Cross-site shared typography.
        // Display: Cormorant Garamond
        // Body: Inter Tight (with Inter fallback)
        // Mono: JetBrains Mono
        display: [
          'Cormorant Garamond',
          'Cormorant',
          'Garamond',
          'Georgia',
          'serif',
        ],
        body: [
          'Inter Tight',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        // V1 alias — many KHADANE v1 components use `font-sans`
        sans: [
          'Inter Tight',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        eyebrow: '0.16em',
        marker: '0.18em',
      },
      lineHeight: {
        prose: '1.55',
      },
      maxWidth: {
        prose: '720px',
        proseWide: '760px',
        proseHero: '580px',
      },
      backgroundImage: {
        'vyanjanam-hero':
          'linear-gradient(180deg, #000000 0%, #1A1A1A 100%)',
        'vyanjanam-section':
          'linear-gradient(180deg, #1A1A1A 0%, #000000 100%)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
