# CANON — Single Source of Truth

Semua dokumen master plan **wajib** memakai nilai di file ini. Kalau ada dokumen yang berbeda dari CANON, **CANON yang benar** dan dokumen itu bug.

Ubah nilai di sini dulu, baru propagasi ke dokumen lain. Jalankan `docs/masterplan/check-consistency.sh` setelah setiap perubahan.

---

## C1. Identitas

| Key | Nilai |
|-----|-------|
| Nama project | `IconMind` |
| npm scope | `@iconmind` |
| GitHub | `github.com/iconmind/iconmind` |
| Domain (rencana) | `iconmind.dev` |
| Lisensi | `MIT` (kode **dan** aset icon, file `LICENSE` tunggal) |

## C2. Toolchain (pinned)

| Tool | Versi |
|------|-------|
| Node.js | `24 LTS` (Active LTS; `.nvmrc` di root repo) |
| pnpm | `10` |
| Turborepo | `2` |
| TypeScript | `5.9` |
| Next.js | `16` |
| React | `19` |
| Vue | `3.5` |
| Tailwind CSS | `4` |
| UI kit | `shadcn/ui` |
| Docs UI | `Fumadocs` |
| Content layer | `Content Collections` |
| SVG optimizer | `SVGO 4` |
| Unit test | `Vitest 3` |
| E2E / visual | `Playwright` |
| Release | `Changesets` |
| Fuzzy search | `uFuzzy` |
| Raster (untuk dedup) | `@resvg/resvg-js` |

**Keputusan Contentlayer vs Fumadocs**: Contentlayer tidak dirawat aktif. Kita pakai **Fumadocs** untuk UI + routing dokumentasi MDX, dan **Content Collections** sebagai type-safe content layer untuk metadata icon & MDX. Kedua-duanya, bukan salah satu.

## C3. Package yang di-publish

| Package | Publish? | Isi |
|---------|----------|-----|
| `@iconmind/icons` | ✅ npm | SVG mentah + `metadata.json` + sprite |
| `@iconmind/react` | ✅ npm | Komponen React 19 |
| `@iconmind/vue` | ✅ npm | Komponen Vue 3.5 |
| `@iconmind/mcp` | ✅ npm | MCP server (`npx @iconmind/mcp`) |
| `@iconmind/shared` | ❌ internal | Tipe, schema, util dipakai lintas package |
| `@iconmind/figma` | ❌ internal | Script export ke Figma |
| `apps/docs` | ❌ | Website Next.js |

## C4. Design tokens (mengikat)

| Token | Nilai |
|-------|-------|
| Canvas | `24 × 24` |
| viewBox | `0 0 24 24` |
| Live area | tinta `1 – 23`, **anchor `2 – 22`** |
| Stroke width | `2` |
| Stroke linecap | `round` |
| Stroke linejoin | `round` |
| Fill | `none` (default) |
| Stroke color | `currentColor` |
| **Chamfer wadah** | **potong 45° sepanjang `4`** — tanda tangan rumah |
| Corner radius (wadah non-chamfer) | `3` |
| Corner radius dalam | `1` |
| Grid snap | `0.5px` |
| Elemen terkecil | `2px` |
| Jarak antar-stroke minimum | `2px` |
| Varian Tahun 1 | `outline` saja |
| Sudut segmen lurus | dianjurkan 0/30/45/60/90°, **peringatan bukan galat** |

## C5. Taksonomi — 12 domain (urutan baku)

`ai` · `agents` · `mcp` · `rag` · `data` · `devops` · `cloud` · `security` · `automation` · `analytics` · `devtools` · `interface`

## C6. Angka target (dipakai di doc 01, 16, 17)

| Metrik | M3 | M6 | M9 | M12 |
|--------|----|----|----|-----|
| Icon **shipped** (kumulatif) | 100 | 300 | 500 | 1000 |
| Icon **concept** di backlog | 520 | 1200 | 2500 | 4000 |
| GitHub stars | 500 | 2000 | 4000 | 8000 |
| npm downloads / minggu | 200 | 1000 | 5000 | 15000 |
| Kontributor unik | 3 | 12 | 30 | 60 |
| Figma file duplicates | — | 500 | 2000 | 6000 |

> **Penting — "concept" ≠ "shipped".** *Concept* = nama + definisi + kategori di backlog (murah, hasil brainstorming AI). *Shipped* = SVG jadi, lolos review manusia, ada di npm. Target tahun pertama 2000–5000 **concept** dan **1000 shipped**. Dua angka ini tidak boleh dipertukarkan.

## C7. Peta halaman website (baku)

```
/                          Home
/icons                     Browse
/icons/[slug]              Icon Detail
/categories                Category Index
/categories/[category]     Category Listing
/search                    Search (deep-linkable, ?q=)
/docs/[...slug]            Docs (10 halaman)
/changelog                 Changelog
/roadmap                   Roadmap
/showcase                  Showcase (mulai Phase 3)
```

## C8. GitHub Actions (5 workflow, nama file baku)

`ci.yml` · `icon-check.yml` · `release.yml` · `deploy-docs.yml` · `nightly.yml`

## C9. Konvensi penamaan

| Artefak | Bentuk | Contoh |
|---------|--------|--------|
| Slug icon | `kebab-case` | `agent-memory` |
| File SVG | `<slug>.svg` | `agent-memory.svg` |
| File metadata | `<slug>.json` (co-located) | `agent-memory.json` |
| Komponen React/Vue | `PascalCase` | `AgentMemory` |
| Alias komponen | `PascalCase` + `Icon` | `AgentMemoryIcon` |
| Nama layer Figma | `category/slug` | `agents/agent-memory` |
| Branch | `icon/<slug>`, `feat/<topik>`, `fix/<topik>` | `icon/agent-memory` |

## C10. Anggaran

| Item | Biaya / bulan |
|------|---------------|
| Domain `.dev` | ~$1 (amortisasi) |
| Hosting (Vercel / Cloudflare Pages free tier) | $0 |
| GitHub (public repo) | $0 |
| npm | $0 |
| Figma | $0 |
| **Total** | **≤ $15** |

## C11. Kebijakan Bahasa

Ada satu garis, dan letaknya bukan pada jenis berkas melainkan pada **siapa pembacanya**.

| Permukaan | Bahasa | Alasan |
|-----------|--------|--------|
| Field `name`, `description`, `tags`, `aliases` di metadata icon | **Inggris** | Tampil di website, npm, keluaran MCP, dan deskripsi component Figma |
| Semua komentar dan pesan di dalam kode | **Inggris** | Kontributor global membaca `scripts/` dan `packages/` |
| Pesan validator & anotasi PR | **Inggris** | Muncul di PR kontributor mana pun |
| README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY | **Inggris** | Permukaan pertama proyek |
| Issue & PR template | **Inggris** | Diisi kontributor global |
| Salinan website dan dokumentasi publik | **Inggris** | Audiens global |
| Deskripsi tool & prompt MCP | **Inggris** | Dibaca model, dikirim ke pengguna |
| Nama slug, sub-kategori, nama komponen | **Inggris** | API publik |
| Commit message dan catatan rilis | **Inggris** | Riwayat publik |
| **Master plan di `docs/masterplan/`** | **Indonesia** | Dokumen kerja internal founder, tidak dipublikasikan |
| **Catatan spike di `spike/`** | **Indonesia** | Sekali pakai, internal |

**Aturan praktis**: kalau ada satu orang di luar founder yang mungkin membacanya, tulis dalam bahasa Inggris.

**Field `keywords` bukan tempat menampung bahasa Indonesia.** Lihat [07 §7.4](./07-metadata-system.md#74-aturan-field). Lokalisasi non-Inggris adalah keputusan Phase 3+ yang harus digarap per-bahasa secara menyeluruh oleh komunitas — lokalisasi separuh jalan pada 1000 icon lebih buruk daripada tidak ada sama sekali, karena pencarian jadi bekerja untuk sebagian icon saja dan pengguna menyimpulkan fiturnya rusak.

