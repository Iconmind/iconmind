# IconMind — Master Plan

> **Nama project**: IconMind · **Repo**: `github.com/iconmind/iconmind` · **npm**: `@iconmind/*`
> Open source SVG icon library untuk era AI: LLM, Agents, MCP, RAG, Automation, SaaS, DevOps, Cloud, Data Engineering, Developer Tools.

**Status dokumen**: v1.0 — Master Plan (pre-code)
**Ditulis untuk**: 1 solo founder + AI generation + komunitas open source
**Prinsip**: Open Source First · Developer First · Community Driven · AI Era Design System

---

## Prinsip Non-Negotiable

Empat batasan ini memutuskan hampir semua keputusan teknis di dokumen berikutnya. Kalau sebuah ide melanggar salah satunya, ide itu ditolak — tidak peduli seberapa menarik.

| # | Prinsip | Konsekuensi teknis |
|---|---------|--------------------|
| 1 | **Zero backend** | Tidak ada database, tidak ada API server, tidak ada auth. Search jalan di browser. Website 100% static export. |
| 2 | **Source of truth = filesystem** | Satu icon = satu file `.svg` + satu blok metadata. Semua package di-generate dari itu. Tidak ada state ganda. |
| 3 | **Semua yang bisa diotomasi, diotomasi** | Validasi, optimasi, codegen, changelog, release. Manusia hanya melakukan *taste review*. |
| 4 | **Bus factor 1 harus aman** | Kalau founder hilang 3 bulan, repo tetap bisa di-build, di-release, dan di-review oleh orang lain dari dokumen ini. |

**Biaya operasional target: $0–15/bulan** (domain + Vercel/Cloudflare free tier + GitHub free tier).

---

## Daftar Isi

### Bagian 0 — Acuan

| Doc | Judul | Isi inti |
|-----|-------|----------|
| [CANON](./CANON.md) | **Single Source of Truth** | Semua nama, versi, angka target, path, dan token desain. Dokumen lain wajib mengacu ke sini. |

**Menjaga dokumen tetap sinkron.** Angka dan daftar tidak disalin antar dokumen — ada satu sumber untuk masing-masing, dan satu pemeriksa yang memverifikasinya:

| Berkas | Peran |
|--------|-------|
| [CANON.md](./CANON.md) | Sumber untuk nama, versi, target, path, token desain |
| `_data/catalog.py` | Sumber untuk 621 icon concept, 91 sub-kategori, dan pembagian phase |
| `_data/gen_catalog.py` | Merender [02b](./02b-icon-catalog.md) dari `catalog.py` — **02b tidak pernah diedit manual** |
| `_data/timeline.py` | Sumber untuk rencana eksekusi: 52 minggu, 41 tugas, dan bukti selesainya |
| `_data/gen_timeline.py` | Merender [18](./18-timeline.md) dengan memeriksa bukti langsung ke repo — **18 tidak pernah diedit manual** |
| `check-consistency.sh` | Memverifikasi seluruh dokumen terhadap ketiga sumber di atas |

```bash
./check-consistency.sh     # verifikasi semua dokumen sinkron
./update-timeline.sh       # perbarui status timeline dari keadaan repo
```

Yang diperiksa: nama project, seluruh link & anchor internal, scope npm, urutan 12 domain di lima tempat berbeda, tabel coverage [02 §2.6](./02-icon-taxonomy.md#26-roadmap-coverage-per-domain) terhadap `catalog.py`, keunikan slug, daftar sub-kategori, jumlah yang disebut di prosa, nama workflow CI, versi toolchain, peta halaman, dan tabel target [16 §16.6](./16-roadmap.md#166-ringkasan-kuartalan). Jalankan setiap kali mengubah CANON atau katalog — dokumen yang tidak sinkron akan gagal dengan pesan yang menyebut berkas dan barisnya.

### Bagian I — Strategi

| Doc | Judul | Isi inti |
|-----|-------|----------|
| [01](./01-product-vision.md) | **Product Vision** | Vision, mission, problem statement, kenapa Lucide/Heroicons tidak cukup, AI era opportunity, strategi open source & growth GitHub |
| [02](./02-icon-taxonomy.md) | **Icon Taxonomy** | 12 domain, 91 sub-kategori, arsitektur penamaan |
| [02b](./02b-icon-catalog.md) | **Icon Catalog** | Daftar konkret **621 icon concept** siap dieksekusi, dipetakan ke phase (auto-generated) |

### Bagian II — Craft

| Doc | Judul | Isi inti |
|-----|-------|----------|
| [03](./03-design-system.md) | **Design System** | Grid 24px, stroke 2, radius, viewBox, SVG rules, naming convention, a11y |
| [04](./04-ai-generation-workflow.md) | **AI Generation Workflow** | Pipeline Idea→Publish, prompt template, quality bar, human review checklist |

### Bagian III — Engineering

| Doc | Judul | Isi inti |
|-----|-------|----------|
| [05](./05-repository-architecture.md) | **Repository Architecture** | Struktur monorepo Turborepo + pnpm, lengkap sampai file level |
| [06](./06-svg-engine.md) | **SVG Engine** | Validator, optimizer, linter, duplicate detection (perceptual hash), metadata generator |
| [07](./07-metadata-system.md) | **Metadata System** | JSON Schema penuh, aturan tags/aliases, versioning per-icon |
| [08](./08-website.md) | **Website** | 9 halaman, komponen, layout, SEO, UX flow |
| [09](./09-search-system.md) | **Search System** | Static + fuzzy search tanpa backend, index budget, ranking |
| [10](./10-react-package.md) | **React Package** | Tree shaking, dynamic import, SSR, type safety |
| [11](./11-vue-package.md) | **Vue Package** | Paralel dengan React, functional component, Nuxt |
| [12](./12-figma-strategy.md) | **Figma Strategy** | Community file, struktur page, naming, plugin export |
| [13](./13-mcp-server.md) | **MCP Server** | Resources, tools, prompts, implementasi TypeScript |
| [14](./14-ci-cd.md) | **CI/CD** | GitHub Actions lengkap: validate, build, test, release, deploy |

### Bagian IV — Community & Growth

| Doc | Judul | Isi inti |
|-----|-------|----------|
| [15](./15-open-source-strategy.md) | **Open Source Strategy** | Lisensi, contributor guide, PR rules, review process, governance |
| [16](./16-roadmap.md) | **Roadmap** | 4 phase × 12 bulan, deliverables, milestone, risk, metrics |
| [17](./17-launch-strategy.md) | **Launch Strategy** | GitHub, Product Hunt, HN, Reddit, X, Figma Community |
| [18](./18-timeline.md) | **Timeline Eksekusi** | 52 minggu bertanggal, 41 tugas, status diturunkan otomatis dari repo *(auto-generated)* |

---

## Struktur Navigasi Dokumentasi Publik (Website)

Master plan ini (internal) ≠ dokumentasi publik. Situs publik memakai struktur berikut:

```
/                          Home
/icons                     Browse (grid + filter + instant search)
/icons/[slug]              Icon Detail
/categories                Category Index
/categories/[category]     Category Listing
/search                    Search (deep-linkable, ?q=)
/docs/introduction         Apa itu IconMind
/docs/installation         Install per-framework
/docs/react                React usage
/docs/vue                  Vue usage
/docs/svg                  Raw SVG / CDN / sprite
/docs/figma                Figma file
/docs/mcp                  MCP server
/docs/design-guidelines    Aturan desain untuk kontributor
/docs/contributing         Cara kontribusi
/docs/faq                  FAQ
/changelog                 Changelog
/roadmap                   Roadmap
/showcase                  Showcase (mulai Phase 3)
```

Peta ini identik dengan [CANON C7](./CANON.md#c7-peta-halaman-website-baku). Doc [08](./08-website.md) menjabarkan tiap halaman.

---

## Cara Membaca Dokumen Ini

- **Mau mulai coding hari ini?** → [05](./05-repository-architecture.md) lalu [03](./03-design-system.md) lalu [06](./06-svg-engine.md).
- **Mau mulai bikin icon hari ini?** → [03](./03-design-system.md) lalu [04](./04-ai-generation-workflow.md) lalu [02b](./02b-icon-catalog.md).
- **Mau validasi ide dulu?** → [01](./01-product-vision.md) lalu [16](./16-roadmap.md) lalu [17](./17-launch-strategy.md).

**Urutan eksekusi yang disarankan**: Design System → SVG Engine → 100 icon pertama → React package → Website → Launch → baru MCP/Vue/Figma.
Rasional: launch butuh bukti (icon nyata + package terpakai), bukan surface area yang lebar.

---

## Status Penamaan

Nama project **dikunci: IconMind**. Semua dokumen, package, dan aset memakai nama ini — tidak ada codename alternatif.

| Artefak | Nilai | Harus diamankan sebelum publish |
|---------|-------|--------------------------------|
| npm scope | `@iconmind` | [ ] klaim scope di npm |
| GitHub org | `iconmind` | [ ] buat org |
| Domain | `iconmind.dev` | [ ] beli domain |
| X / Twitter | `@iconmind` | [ ] klaim handle |
| Trademark | — | [ ] cek tidak bentrok di kelas software |

Empat baris pertama sebaiknya diklaim **di hari yang sama**, sebelum satu baris kode publik ditulis. Nama yang sudah tersebar di README lalu harus diganti adalah kerugian yang tidak perlu.
