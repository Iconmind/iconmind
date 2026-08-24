# -*- coding: utf-8 -*-
"""Rencana eksekusi IconMind. Sumber tunggal untuk 18-timeline.md.

Setiap tugas punya BUKTI yang bisa diperiksa mesin, bukan centang manual.
Tracker yang statusnya diketik tangan selalu berbohong dalam dua minggu.
"""
from datetime import date

START = date(2026, 8, 23)      # minggu 1 dimulai
WEEKS_PER_PHASE = 13           # 4 × 13 = 52 minggu = 12 bulan

PHASES = [
    (1, "Fondasi",   "100 icon, package React, website, rilis senyap"),
    (2, "Launch",    "300 icon, Vue + MCP + Figma, peluncuran publik"),
    (3, "Ekosistem", "500 icon, komunitas, maintainer kedua"),
    (4, "Skala",     "1000 icon, plugin Figma, platform ketiga"),
]

# evidence:
#   ("path", p)        berkas/direktori ada
#   ("glob", pat, n)   minimal n berkas cocok
#   ("icons", n)       minimal n icon terbit di packages/icons
#   ("manual", note)   butuh konfirmasi manusia — selesai jika id ada di DONE_MANUAL
TASKS = [
 ("T1.1", 1,  1, "Repo skeleton: pnpm workspace, Turborepo, tsconfig", ("path", "turbo.json")),
 ("T1.2", 1,  1, "Package shared: constants, schema, parser SVG",      ("path", "packages/shared/src/schema.ts")),
 ("T1.3", 1,  1, "Struktur packages/icons + LICENSE MIT",              ("path", "packages/icons/icons/ai")),
 ("T1.6", 1,  1, "Klaim nama: npm, GitHub, domain, X",                 ("manual", "npm ok, GitHub ok, domain belum, X belum")),
 ("T1.4", 1,  2, "Lima workflow GitHub Actions",                       ("glob", ".github/workflows/*.yml", 5)),
 ("T1.5", 1,  2, "README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY",    ("glob", "CONTRIBUTING.md", 1)),

 ("T2.1", 1,  3, "Design system dibekukan",                            ("path", "docs/masterplan/03-design-system.md")),
 ("T2.2", 1,  3, "Spike validasi token desain",                        ("path", "spike/design-tokens/FINDINGS.md")),
 ("T2.3", 1,  4, "20 anchor icon selesai",                             ("icons", 20)),
 ("T2.4", 1,  4, "Anchor set dibekukan di __anchors__",                ("glob", "packages/icons/__anchors__/*.svg", 20)),

 ("T3.1", 1,  5, "Validator SVG (4 kelas rule)",                       ("path", "scripts/validate/run.ts")),
 ("T3.2", 1,  5, "Optimizer: SVGO + normalisasi kanonik",              ("path", "scripts/optimize/run.ts")),
 ("T3.3", 1,  6, "Deteksi duplikat lapis 1-2",                         ("path", "scripts/validate/duplicates.ts")),
 ("T3.4", 1,  6, "Generator metadata.json",                            ("path", "scripts/generate/metadata.ts")),
 ("T3.5", 1,  6, "Preview PR otomatis di CI",                          ("path", ".github/workflows/icon-check.yml")),

 ("T4.1", 1,  7, "50 icon terbit",                                     ("icons", 50)),
 ("T4.2", 1,  8, "Generator komponen React + Vue",                     ("path", "scripts/generate/components.ts")),
 ("T4.3", 1,  8, "Generator sprite",                                   ("path", "scripts/generate/sprite.ts")),
 ("T4.4", 1,  9, "100 icon terbit",                                    ("icons", 100)),

 ("T5.1", 1, 10, "Package React: create-icon, tsup, tree shaking",     ("path", "packages/react/src/create-icon.tsx")),
 ("T5.2", 1, 11, "Website: Home, Browse, Detail, Docs",                ("path", "apps/docs/app/page.tsx")),
 ("T5.3", 1, 11, "Index pencarian statis",                             ("path", "scripts/generate/search-index.ts")),
 ("T5.4", 1, 12, "Uji: Vitest + size-limit + snapshot visual",         ("glob", "packages/react/src/*.test.tsx", 1)),

 ("T6.1", 1, 13, "Rilis v0.1.0 ke npm",                                ("manual", "belum")),
 ("T6.2", 1, 13, "Dipakai di satu proyek nyata",                       ("manual", "belum")),

 ("P2.1", 2, 16, "Package Vue + modul Nuxt",                           ("path", "packages/vue/src/create-icon.ts")),
 ("P2.2", 2, 17, "MCP server",                                         ("path", "packages/mcp/src/index.ts")),
 ("P2.3", 2, 18, "250 icon terbit",                                    ("icons", 250)),
 ("P2.4", 2, 19, "File Figma Community",                               ("path", "packages/figma/src/build-figma-file.ts")),
 ("P2.5", 2, 20, "Website v2 + 10 halaman docs",                       ("glob", "apps/docs/content/docs/*.mdx", 10)),
 ("P2.6", 2, 21, "PELUNCURAN PUBLIK (6 kanal)",                        ("manual", "belum")),
 ("P2.7", 2, 26, "300 icon + rilis v1.0.0",                            ("icons", 300)),

 ("P3.1", 3, 30, "400 icon terbit",                                    ("icons", 400)),
 ("P3.2", 3, 31, "Search v2 + analitik query nol-hasil",               ("manual", "belum")),
 ("P3.3", 3, 33, "Halaman showcase, minimal 10 proyek",                ("path", "apps/docs/app/showcase/page.tsx")),
 ("P3.4", 3, 34, "Maintainer kedua dengan akses merge",                ("manual", "belum")),
 ("P3.5", 3, 39, "500 icon + audit konsistensi kuartalan",             ("icons", 500)),

 ("P4.1", 4, 43, "700 icon terbit",                                    ("icons", 700)),
 ("P4.2", 4, 44, "Plugin Figma",                                       ("path", "packages/figma/src/plugin")),
 ("P4.3", 4, 46, "Platform ketiga (Svelte atau Solid)",                ("manual", "belum")),
 ("P4.4", 4, 52, "1000 icon + rilis v2.0.0",                           ("icons", 1000)),
]

# Tugas manual yang sudah selesai — satu-satunya bagian yang diketik tangan.
DONE_MANUAL: set[str] = set()
