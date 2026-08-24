# 09 — Search System

> Zero backend ([00](./00-index.md#prinsip-non-negotiable)). Semua pencarian berjalan di browser atas index yang dibangun saat build oleh `scripts/generate/search-index.ts` ([06 §6.7](./06-svg-engine.md#67-generator-lain)).

---

## 9.1 Kenapa Tanpa Backend

Algolia dan Typesense bagus, tapi keduanya melanggar dua batasan sekaligus: menambah biaya bulanan dan menambah layanan yang bisa mati. Untuk 1000 dokumen kecil, pencarian sisi klien lebih cepat (tanpa perjalanan jaringan), lebih murah ($0), dan tidak pernah down.

Angka yang membuat keputusan ini mudah: 1000 icon × ~120 byte per entri index = **~120 KB**, sekitar **35 KB setelah gzip**. Itu lebih kecil daripada satu font, dan hanya dimuat sekali.

Batas kelayakan pendekatan ini sekitar 10.000 dokumen. Kita punya banyak ruang.

## 9.2 Arsitektur

```
build time                          runtime (browser)
──────────                          ─────────────────
metadata.json
    │
    ▼
generate/search-index.ts
    │  normalisasi, bobot, pangkas
    ▼
public/search-index.json  ──fetch──▶ SearchProvider
   (~35 KB gzip)             (idle)      │
                                          ├─ prefix index (Map)  → instan
                                          └─ uFuzzy             → typo-tolerant
```

**Dua mesin, bukan satu.** Prefix match jalan dulu karena mayoritas kueri adalah prefix dari nama icon dan hasilnya harus muncul tanpa jeda sama sekali. Fuzzy dijalankan setelahnya untuk menangkap salah ketik. Menggabungkan keduanya jadi satu mesin akan membuat kasus umum membayar biaya kasus langka.

## 9.3 Bentuk Index

Array-of-array, bukan array-of-object — menghemat ~40% ukuran karena nama field tidak diulang 1000 kali.

```jsonc
{
  "v": "0.5.2",
  "f": ["slug", "name", "cat", "sub", "tags", "aliases", "kw"],
  "i": [
    ["agent-memory", "Agent Memory", 1, 5, "agent memory state recall context storage",
     "agent-state agent-recall", "ingatan agent"]
  ],
  "c": ["ai", "agents", "mcp", "rag", "data", "devops", "cloud",
        "security", "automation", "analytics", "devtools", "interface"],
  "s": ["model", "inference", "prompt", "…"]
}
```

Kategori dan sub-kategori disimpan sebagai indeks integer ke array `c` dan `s`. Tags digabung jadi satu string dipisah spasi — cukup untuk pencocokan substring dan jauh lebih ringkas daripada array.

Field yang **tidak** masuk index: `description` (panjang, jarang menjadi jalur pencarian yang tepat, dan menggandakan ukuran index), semua field turunan, dan `related`.

## 9.4 Anggaran Ukuran Index

| Icon | Mentah | Gzip | Status |
|------|--------|------|--------|
| 100 | 12 KB | 4 KB | Phase 1 |
| 500 | 60 KB | 18 KB | Phase 3 |
| 1000 | 120 KB | 35 KB | Phase 4 |
| 5000 | 600 KB | 170 KB | Batas nyaman |

**Batas keras: 150 KB gzip.** Kalau terlampaui, urutan tindakannya: buang `keywords` dari index utama → pangkas tags ke 6 teratas → pisahkan index per kategori dan muat sesuai permintaan. Menambah backend adalah pilihan terakhir, bukan pertama.

## 9.4b Kapan Index Mulai Benar-Benar Dibutuhkan

Situs versi pertama **belum memakai index ini**. Pada 53 icon, `/icons` cukup menyematkan seluruh SVG langsung ke HTML dan menyaringnya di memori — hasilnya 9,5 KB gzip untuk seluruh halaman, lebih cepat daripada memuat berkas index terpisah.

Itu tidak berlaku selamanya. Ekstrapolasi linier dari pengukuran nyata:

| Icon | Perkiraan `/icons` (gzip) | Status |
|------|---------------------------|--------|
| 53 | 9,5 KB | terukur — nyaman |
| 300 | ~54 KB | mulai terasa |
| 500 | ~90 KB | batas wajar |
| 1000 | ~180 KB | terlalu besar |

**Ambang pindah: sekitar 300 icon.** Di titik itu `/icons` berhenti menyematkan SVG dan beralih ke index + render sesuai permintaan seperti dijelaskan di bawah. Generatornya sudah ada dan sudah berjalan di setiap build (`pnpm icons:index`), jadi peralihannya adalah perubahan di satu komponen, bukan pekerjaan baru.

Membangun mesin index lebih dulu lalu memakainya untuk 53 icon akan menjadi optimasi tanpa masalah yang dioptimasi. Membiarkan generatornya jalan sejak sekarang berarti angka anggarannya terpantau sebelum jadi masalah.

## 9.5 Strategi Pemuatan

```ts
// 1. Halaman render dengan search bar aktif tapi index belum ada
// 2. Muat index saat salah satu terjadi lebih dulu:
//    - requestIdleCallback
//    - pengguna fokus ke input search
//    - pengguna menekan ⌘K
// 3. Sebelum index siap: input tetap menerima ketikan,
//    kueri di-buffer, dijalankan begitu index tiba
```

Ketikan tidak pernah hilang. Pengguna yang mengetik cepat setelah memuat halaman tidak boleh kehilangan karakter pertamanya — detail kecil yang sangat terasa.

Index di-cache di `localStorage` dengan kunci versi. Kunjungan berikutnya membaca dari cache dan memvalidasi versi di latar belakang.

## 9.6 Algoritma Peringkat

Kueri dinormalisasi: huruf kecil, trim, hapus tanda baca, dan `-`/`_`/spasi diperlakukan setara. Jadi `agent memory`, `agent-memory`, dan `AgentMemory` menghasilkan kueri yang sama.

Skor per icon:

| Kecocokan | Skor |
|-----------|------|
| Slug persis | 1000 |
| Alias persis | 900 |
| Slug diawali kueri | 800 − (panjang slug × 2) |
| Nama diawali kueri | 700 − (panjang nama × 2) |
| Kata dalam slug diawali kueri | 600 |
| Tag persis | 500 |
| Tag diawali kueri | 400 |
| Nama mengandung kueri | 300 |
| Tag mengandung kueri | 200 |
| Keyword cocok | 150 |
| Kecocokan fuzzy | 100 − (jarak edit × 20) |

Pengubah skor:

- **+50** kalau kategori icon termasuk empat domain diferensiasi (`ai`, `agents`, `mcp`, `rag`). Ketika `memory` cocok dengan `agent-memory` dan `memory-ram`, yang pertama hampir selalu yang dimaksud pengunjung situs ini.
- **+30** kalau icon ada di 50 besar tersalin (dari analitik, dibekukan saat build).
- **−200** kalau `deprecated` tidak null.
- **Penalti panjang** `−(panjang slug ÷ 4)` — mendahulukan `agent` di atas `agent-negotiation` untuk kueri `agent`.

Kueri multi-kata: setiap kata dicari terpisah, skor dijumlahkan, dan icon harus cocok dengan **semua** kata (AND). `vector search` harus memunculkan `vector-search`, bukan segala hal yang mengandung `vector`.

## 9.7 Fuzzy Matching

`uFuzzy` dipilih karena ~5 KB, tidak membangun index tambahan, dan dirancang untuk daftar pendek dengan latensi sangat rendah. Fuse.js sekitar 4× lebih besar dan lebih lambat pada beban ini.

Aturan penerapan:
- Fuzzy **hanya** dijalankan kalau prefix match menghasilkan < 5 hasil. Kalau sudah ada 20 hasil tepat, hasil fuzzy hanya menambah kebisingan.
- Toleransi jarak edit maksimum 2, dan hanya untuk kueri ≥ 4 karakter. Kueri 2 huruf yang fuzzy akan cocok dengan segalanya.
- Hasil fuzzy selalu di bawah hasil tepat, dengan pemisah visual "Hasil serupa".

Kasus yang harus ditangani: `embeding` → `embedding`, `retreiver` → `retriever`, `kubernets` → `namespace-cluster` (lewat tag).

## 9.8 Pencarian Kategori dan Tag

**Sintaks filter dalam kueri** — untuk pengguna mahir, tidak dipromosikan tapi didokumentasikan:

| Sintaks | Arti |
|---------|------|
| `category:mcp` | Batasi ke domain |
| `sub:memory` | Batasi ke sub-kategori |
| `tag:vector` | Kecocokan tag persis |
| `-tag:deprecated` | Kecualikan |

`category:agents memory` → semua icon memory di domain agents.

Untuk pengguna umum, hal yang sama tercapai lewat chip filter di sidebar ([08 §8.4](./08-website.md#84-browse--icons)). Keduanya menulis ke URL yang sama.

## 9.9 Perilaku Nol Hasil

Dijelaskan dari sisi UX di [08 §8.7](./08-website.md#87-search--search). Sisi teknisnya:

1. Jalankan ulang dengan toleransi fuzzy 3 → "mungkin maksud Anda".
2. Cari kata kueri di dalam **deskripsi** kategori (kueri konseptual seperti `chatbot` mungkin tidak cocok dengan slug mana pun tapi cocok dengan domain `ai`).
3. Kirim peristiwa analitik `search_zero_result` dengan kueri yang sudah dinormalisasi.
4. Tampilkan tombol request dengan judul issue terisi.

Query nol-hasil yang muncul ≥ 5 kali dalam sebulan otomatis menjadi kandidat backlog ([04 §4.3](./04-ai-generation-workflow.md#43-tahap-1--idea)).

## 9.10 Palet Perintah ⌘K

Dibangun di atas `cmdk` (bagian dari shadcn/ui). Bisa dibuka dari halaman mana pun.

| Tindakan | Tombol |
|----------|--------|
| Buka | `⌘K` / `Ctrl+K` |
| Navigasi | `↑` `↓` |
| Buka halaman icon | `Enter` |
| Salin SVG | `⌘Enter` |
| Salin JSX | `⌘⇧Enter` |
| Tutup | `Esc` |

Palet juga mengindeks halaman docs dan kategori, bukan hanya icon — sehingga ⌘K menjadi navigasi menyeluruh untuk situs.

## 9.11 Anggaran Performa

| Operasi | Target | 1000 icon |
|---------|--------|-----------|
| Parse index | < 20 ms | JSON.parse murni |
| Bangun prefix map | < 15 ms | Sekali saat muat |
| Prefix search | < 1 ms | Lookup Map |
| Fuzzy search | < 15 ms | Hanya kalau perlu |
| Render hasil | < 16 ms | Virtualized, maks 60 terlihat |
| **Ketik → tampil** | **< 30 ms** | Terasa instan |

Debounce **0 ms** untuk prefix (cukup cepat untuk dijalankan tiap ketikan) dan **120 ms** untuk fuzzy. Debounce pada pencarian yang sudah instan justru membuatnya terasa lambat.

## 9.12 Pengujian

- Uji unit peringkat: daftar (kueri → slug yang diharapkan di posisi 1) — misalnya `mcp` → `mcp`, `vector db` → `vector-database`, `remember` → `agent-memory` (lewat tag).
- Uji regresi: kalau icon baru menggeser hasil yang diharapkan dari posisi 1, test gagal dan skor perlu ditinjau.
- Uji performa: index 1000 entri sintetis, pastikan anggaran [§9.11](#911-anggaran-performa) terpenuhi di CI.
