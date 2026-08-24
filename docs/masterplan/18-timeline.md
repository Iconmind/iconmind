# 18 — Timeline Eksekusi

> **Jangan edit berkas ini dengan tangan.** Dihasilkan `_data/gen_timeline.py` dari `_data/timeline.py`.
> Status setiap tugas **diturunkan dari isi repo**, bukan dari centang. Tracker yang diketik tangan selalu berbohong dalam dua minggu.
> Lapisan strategis (target, risiko, metrik) ada di [16 — Roadmap](./16-roadmap.md). Berkas ini lapisan operasionalnya.

```bash
./update-timeline.sh      # regenerasi dari keadaan repo saat ini
```

---

## Posisi Sekarang

**2026-08-24 · Minggu 1 dari 52 · Phase 1**

| | |
|---|---|
| Mulai proyek | 2026-08-23 |
| Minggu berjalan | W1 (2026-08-23 – 2026-08-29) |
| Icon terbit | **53** |
| Tugas selesai | 21 / 41 keseluruhan · 21 / 25 di Phase 1 |

### Progres per Phase

| Phase | Rentang | Tanggal | Progres | |
|-------|---------|---------|---------|---|
| **P1 Fondasi** ← | W1–13 | 2026-08-23 – 2026-11-21 | `████████████████████░░░░` | 21/25 |
| **P2 Launch** | W14–26 | 2026-11-22 – 2027-02-20 | `░░░░░░░░░░░░░░░░░░░░░░░░` | 0/7 |
| **P3 Ekosistem** | W27–39 | 2027-02-21 – 2027-05-22 | `░░░░░░░░░░░░░░░░░░░░░░░░` | 0/5 |
| **P4 Skala** | W40–52 | 2027-05-23 – 2027-08-21 | `░░░░░░░░░░░░░░░░░░░░░░░░` | 0/4 |

*P1: 100 icon, package React, website, rilis senyap, P2: 300 icon, Vue + MCP + Figma, peluncuran publik, P3: 500 icon, komunitas, maintainer kedua, P4: 1000 icon, plugin Figma, platform ketiga*

## Tiga Tindakan Berikutnya

1. **Klaim nama: npm, GitHub, domain, X** · `T1.6` · dijadwalkan W1 (2026-08-23)
   Bukti selesai: manual — npm ok, GitHub ok, domain belum, X belum
2. **100 icon terbit** · `T4.4` · dijadwalkan W9 (2026-10-18)
   Bukti selesai: icon terbit ≥ 100 *(sekarang 53)*
3. **Rilis v0.1.0 ke npm** · `T6.1` · dijadwalkan W13 (2026-11-15)
   Bukti selesai: manual — belum

---

## Rencana Mingguan

### Phase 1 — Fondasi  ·  W1–13

| | Minggu | Mulai | Tugas | Bukti |
|---|--------|-------|-------|-------|
| ✅ | W1 | 2026-08-23 | `T1.1` Repo skeleton: pnpm workspace, Turborepo, tsconfig | `turbo.json` |
| ✅ | W1 | 2026-08-23 | `T1.2` Package shared: constants, schema, parser SVG | `packages/shared/src/schema.ts` |
| ✅ | W1 | 2026-08-23 | `T1.3` Struktur packages/icons + LICENSE MIT | `packages/icons/icons/ai` |
| ▫️ | W1 | 2026-08-23 | `T1.6` Klaim nama: npm, GitHub, domain, X | manual — npm ok, GitHub ok, domain belum, X belum |
| ✅ | W2 | 2026-08-30 | `T1.4` Lima workflow GitHub Actions | `.github/workflows/*.yml` ≥ 5 |
| ✅ | W2 | 2026-08-30 | `T1.5` README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY | `CONTRIBUTING.md` ≥ 1 |
| ✅ | W3 | 2026-09-06 | `T2.1` Design system dibekukan | `docs/masterplan/03-design-system.md` |
| ✅ | W3 | 2026-09-06 | `T2.2` Spike validasi token desain | `spike/design-tokens/FINDINGS.md` |
| ✅ | W4 | 2026-09-13 | `T2.3` 20 anchor icon selesai | icon terbit ≥ 20 *(sekarang 53)* |
| ✅ | W4 | 2026-09-13 | `T2.4` Anchor set dibekukan di __anchors__ | `packages/icons/__anchors__/*.svg` ≥ 20 |
| ✅ | W5 | 2026-09-20 | `T3.1` Validator SVG (4 kelas rule) | `scripts/validate/run.ts` |
| ✅ | W5 | 2026-09-20 | `T3.2` Optimizer: SVGO + normalisasi kanonik | `scripts/optimize/run.ts` |
| ✅ | W6 | 2026-09-27 | `T3.3` Deteksi duplikat lapis 1-2 | `scripts/validate/duplicates.ts` |
| ✅ | W6 | 2026-09-27 | `T3.4` Generator metadata.json | `scripts/generate/metadata.ts` |
| ✅ | W6 | 2026-09-27 | `T3.5` Preview PR otomatis di CI | `.github/workflows/icon-check.yml` |
| ✅ | W7 | 2026-10-04 | `T4.1` 50 icon terbit | icon terbit ≥ 50 *(sekarang 53)* |
| ✅ | W8 | 2026-10-11 | `T4.2` Generator komponen React + Vue | `scripts/generate/components.ts` |
| ✅ | W8 | 2026-10-11 | `T4.3` Generator sprite | `scripts/generate/sprite.ts` |
| ▫️ | W9 | 2026-10-18 | `T4.4` 100 icon terbit | icon terbit ≥ 100 *(sekarang 53)* |
| ✅ | W10 | 2026-10-25 | `T5.1` Package React: create-icon, tsup, tree shaking | `packages/react/src/create-icon.tsx` |
| ✅ | W11 | 2026-11-01 | `T5.2` Website: Home, Browse, Detail, Docs | `apps/docs/app/page.tsx` |
| ✅ | W11 | 2026-11-01 | `T5.3` Index pencarian statis | `scripts/generate/search-index.ts` |
| ✅ | W12 | 2026-11-08 | `T5.4` Uji: Vitest + size-limit + snapshot visual | `packages/react/src/*.test.tsx` ≥ 1 |
| ▫️ | W13 | 2026-11-15 | `T6.1` Rilis v0.1.0 ke npm | manual — belum |
| ▫️ | W13 | 2026-11-15 | `T6.2` Dipakai di satu proyek nyata | manual — belum |

### Phase 2 — Launch  ·  W14–26

| | Minggu | Mulai | Tugas | Bukti |
|---|--------|-------|-------|-------|
| ▫️ | W16 | 2026-12-06 | `P2.1` Package Vue + modul Nuxt | `packages/vue/src/create-icon.ts` |
| ▫️ | W17 | 2026-12-13 | `P2.2` MCP server | `packages/mcp/src/index.ts` |
| ▫️ | W18 | 2026-12-20 | `P2.3` 250 icon terbit | icon terbit ≥ 250 *(sekarang 53)* |
| ▫️ | W19 | 2026-12-27 | `P2.4` File Figma Community | `packages/figma/src/build-figma-file.ts` |
| ▫️ | W20 | 2027-01-03 | `P2.5` Website v2 + 10 halaman docs | `apps/docs/content/docs/*.mdx` ≥ 10 |
| ▫️ | W21 | 2027-01-10 | `P2.6` PELUNCURAN PUBLIK (6 kanal) | manual — belum |
| ▫️ | W26 | 2027-02-14 | `P2.7` 300 icon + rilis v1.0.0 | icon terbit ≥ 300 *(sekarang 53)* |

### Phase 3 — Ekosistem  ·  W27–39

| | Minggu | Mulai | Tugas | Bukti |
|---|--------|-------|-------|-------|
| ▫️ | W30 | 2027-03-14 | `P3.1` 400 icon terbit | icon terbit ≥ 400 *(sekarang 53)* |
| ▫️ | W31 | 2027-03-21 | `P3.2` Search v2 + analitik query nol-hasil | manual — belum |
| ▫️ | W33 | 2027-04-04 | `P3.3` Halaman showcase, minimal 10 proyek | `apps/docs/app/showcase/page.tsx` |
| ▫️ | W34 | 2027-04-11 | `P3.4` Maintainer kedua dengan akses merge | manual — belum |
| ▫️ | W39 | 2027-05-16 | `P3.5` 500 icon + audit konsistensi kuartalan | icon terbit ≥ 500 *(sekarang 53)* |

### Phase 4 — Skala  ·  W40–52

| | Minggu | Mulai | Tugas | Bukti |
|---|--------|-------|-------|-------|
| ▫️ | W43 | 2027-06-13 | `P4.1` 700 icon terbit | icon terbit ≥ 700 *(sekarang 53)* |
| ▫️ | W44 | 2027-06-20 | `P4.2` Plugin Figma | `packages/figma/src/plugin` |
| ▫️ | W46 | 2027-07-04 | `P4.3` Platform ketiga (Svelte atau Solid) | manual — belum |
| ▫️ | W52 | 2027-08-15 | `P4.4` 1000 icon + rilis v2.0.0 | icon terbit ≥ 1000 *(sekarang 53)* |

---

## Cara Kerja Tracker Ini

Setiap tugas menyatakan **bukti** yang membuktikannya selesai, dan generator memeriksa bukti itu langsung ke repo:

| Jenis bukti | Cara diperiksa |
|-------------|----------------|
| `path` | Berkas atau direktori itu ada |
| `glob` | Jumlah berkas yang cocok mencapai ambang |
| `icons` | Jumlah SVG di `packages/icons/icons/*/` mencapai ambang |
| `manual` | Satu-satunya yang diketik tangan, di himpunan `DONE_MANUAL` |

Konsekuensinya: **tugas tidak bisa ditandai selesai tanpa benar-benar selesai.** Hanya tugas yang memang tak terperiksa mesin — klaim domain, peluncuran, rekrut maintainer — yang bergantung pada kejujuran manusia, dan jumlahnya sengaja dijaga sedikit.

Menambah atau menggeser tugas: sunting `_data/timeline.py`, lalu jalankan `./update-timeline.sh`.
