#!/usr/bin/env tsx
/**
 * scripts/audit-facts.ts
 *
 * Build-time audit per build prompt §4.9.
 * Scans the codebase for fact-strings that should be sourced from lib/facts.ts.
 * Fails the build if hardcoded contradictions are detected.
 *
 * Run via: npm run audit:facts
 */

import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()

// Directories to scan
const SCAN_DIRS = ['app', 'components', 'lib']

// Files to exclude from scanning
const EXCLUDE_FILES = new Set([
  'lib/facts.ts', // The source of truth itself
  'lib/site-mls.ts', // Imports from facts
  'lib/site-khadane.ts', // Imports from facts
  'lib/enquiry-schema.ts',
  'lib/seo.ts',
])

// Fact strings that should ONLY appear in lib/facts.ts
// (or imported from there). Hardcoded usage outside facts.ts = bug.
const FACT_NEEDLES: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b1,?200\+/g, label: 'OLD workforce 1,200+ (should be 500+ per v2.0)' },
  { pattern: /\b54 years\b/g, label: 'Hardcoded "54 years" — should be from FOUNDING' },
  { pattern: /BS EN 1341\b/g, label: 'BS EN 1341 — REMOVED v2.0, must not appear' },
  { pattern: /BS EN 12058\b/g, label: 'BS EN 12058 — REMOVED v2.0, must not appear' },
  { pattern: /BS EN 1343\b/g, label: 'BS EN 1343 — REMOVED v2.0, must not appear' },
  { pattern: /\bMONOLITH/g, label: 'MONOLITH India — RETIRED, must not appear' },
  // Raj Green: catch standalone usage but allow "(formerly Raj Green)" for buyer search discoverability
  {
    pattern: /(?<!formerly )\bRaj Green\b/g,
    label: 'Raj Green — RENAMED to Sage Green v2.0 (use "Sage Green" or "(formerly Raj Green)" for discoverability)',
  },
  { pattern: /Forty rooms/g, label: 'Forty rooms — changed to "Boutique scale" in claim copy v2.0' },
  { pattern: /ISO 9001/g, label: 'ISO 9001 — DO NOT CLAIM without documentation' },
  { pattern: /CE marking/g, label: 'CE marking — DO NOT CLAIM without documentation' },
  { pattern: /\bETI\b/g, label: 'ETI — DO NOT CLAIM without documentation' },
]

async function walk(dir: string, fileList: string[] = []): Promise<string[]> {
  const fullDir = path.join(ROOT, dir)
  try {
    const entries = await readdir(fullDir)
    for (const entry of entries) {
      const entryPath = path.join(fullDir, entry)
      const stats = await stat(entryPath)
      if (stats.isDirectory()) {
        const subDir = path.relative(ROOT, entryPath)
        if (!subDir.includes('node_modules') && !subDir.includes('.next')) {
          await walk(subDir, fileList)
        }
      } else if (/\.(tsx?|jsx?|mdx?)$/.test(entry)) {
        fileList.push(path.relative(ROOT, entryPath))
      }
    }
  } catch (err) {
    // Directory may not exist yet (e.g. before first build)
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
  }
  return fileList
}

async function main() {
  console.log('🔍 Auditing codebase for hardcoded facts...\n')

  const allFiles: string[] = []
  for (const dir of SCAN_DIRS) {
    await walk(dir, allFiles)
  }

  const issues: Array<{ file: string; label: string; lineNo: number; line: string }> = []

  for (const file of allFiles) {
    if (EXCLUDE_FILES.has(file)) continue

    const content = await readFile(path.join(ROOT, file), 'utf-8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      // Skip lines that are version-history comments documenting v2.0 changes
      const trimmed = line.trim()
      if (
        trimmed.startsWith('//') &&
        (trimmed.includes('v2.0') || trimmed.includes('CORRECTED') || trimmed.includes('REMOVED') || trimmed.includes('RETIRED'))
      ) {
        return
      }

      for (const needle of FACT_NEEDLES) {
        if (needle.pattern.test(line)) {
          issues.push({
            file,
            label: needle.label,
            lineNo: idx + 1,
            line: line.trim(),
          })
        }
        // Reset regex state (global flag)
        needle.pattern.lastIndex = 0
      }
    })
  }

  if (issues.length === 0) {
    console.log('✅ No hardcoded facts detected. Audit passed.\n')
    process.exit(0)
  }

  console.log(`❌ Found ${issues.length} hardcoded fact(s) outside lib/facts.ts:\n`)
  for (const issue of issues) {
    console.log(`  ${issue.file}:${issue.lineNo}`)
    console.log(`    ${issue.label}`)
    console.log(`    > ${issue.line}\n`)
  }
  console.log('Fix: import the value from lib/facts.ts instead of hardcoding.\n')
  process.exit(1)
}

main().catch((err) => {
  console.error('Audit script error:', err)
  process.exit(2)
})
