# 07 — Metadata System

> Skema hidup sebagai kode di `packages/shared/src/schema.ts` (Zod), dan JSON Schema di bawah **di-generate darinya** — bukan ditulis dua kali.
> Field turunan diisi oleh [06 §6.6](./06-svg-engine.md#66-generator-metadata).

---

## 7.1 Prinsip

1. **Metadata co-located dengan SVG.** `agent-memory.svg` dan `agent-memory.json` bersebelahan. Satu PR menyentuh satu folder. Kontributor tidak perlu mencari file indeks terpusat.
2. **Manusia menulis sedikit, mesin mengisi banyak.** Kontributor mengisi 6 field; 8 field sisanya diturunkan otomatis. Field turunan yang ditulis tangan akan menjadi tidak akurat, dan metadata yang tidak akurat lebih berbahaya daripada tidak ada metadata.
3. **Satu skema, satu sumber.** Zod di `shared` → tipe TypeScript, validasi runtime, dan JSON Schema untuk editor. Tidak ada versi kedua yang bisa melenceng.
4. **Metadata melayani pencarian.** Nilai terbesar metadata adalah membuat icon **ditemukan** ([09](./09-search-system.md)). Setiap keputusan field diuji dengan pertanyaan: apakah ini membantu orang menemukan icon yang tepat?

## 7.2 Yang Ditulis Manusia

```jsonc
// packages/icons/icons/agents/agent-memory.json
{
  "$schema": "https://iconmind.dev/schema/icon.json",
  "slug": "agent-memory",
  "category": "agents",
  "subcategory": "memory",
  "name": "Agent Memory",
  "description": "Memory an agent writes to and reads back",
  "tags": ["agent", "memory", "state", "recall", "context", "storage"],
  "aliases": ["agent-state", "agent-recall"],
  "keywords": ["retrieval augmented memory"],
  "contributors": ["github-handle"]
}
```

Enam field wajib (`slug`, `category`, `subcategory`, `name`, `description`, `tags`), tiga opsional (`aliases`, `keywords`, `contributors`). `pnpm icons:new` sudah mengisi empat yang pertama, jadi kontributor praktis hanya menulis `description` dan `tags`.

## 7.3 Yang Ditambahkan Mesin

```jsonc
{
  "componentName": "AgentMemory",
  "contentHash": "sha256:8f2a…",
  "structuralHash": "path:M,L,C|circle|rect",
  "elementCount": 4,
  "byteSize": 412,
  "related": ["memory-long-term", "memory-short-term", "scratchpad"],
  "addedIn": "0.3.0",
  "updatedIn": "0.5.2",
  "deprecated": null
}
```

## 7.4 Aturan Field

### `slug`
`^[a-z0-9]+(-[a-z0-9]+)*$`, panjang 2–40, **unik lintas seluruh domain**. Bukan sekadar unik dalam kategori — karena import komponen tidak bertingkat (`import { AgentMemory }`, bukan `agents.AgentMemory`). Slug adalah **API publik**: mengubahnya adalah breaking change.

### `category` dan `subcategory`
`category` ∈ 12 domain [CANON C5](./CANON.md#c5-taksonomi--12-domain-urutan-baku), harus sama dengan nama folder.
`subcategory` harus ada di daftar domain terkait ([02 §2.4](./02-icon-taxonomy.md#24-peta-sub-kategori)). Berbeda dari `category`, sub-kategori **boleh diubah tanpa breaking change** karena tidak memengaruhi path file maupun nama komponen — itulah alasan sub-kategori sengaja tidak masuk struktur folder.

### `name`
Title Case, 1–4 kata, tanpa titik. Ini yang tampil di UI dan hasil pencarian.

### `description`
Satu kalimat **berbahasa Inggris** ([CANON C11](./CANON.md#c11-kebijakan-bahasa)), 5–120 karakter, tanpa titik penutup. Menjelaskan **konsepnya**, bukan gambarnya.
✅ `Memory an agent writes to and reads back`
❌ `A circle with three dots inside it`
❌ `Ingatan yang dimiliki dan diakses oleh agent` — bahasa selain Inggris

### `tags` — field terpenting
Minimal 3, maksimal 12, huruf kecil, satu kata atau frasa pendek. Tag adalah jalur penemuan utama.

Empat jenis tag yang harus ada:

| Jenis | Contoh untuk `agent-memory` |
|-------|------------------------------|
| Kata dalam nama | `agent`, `memory` |
| Sinonim | `recall`, `state`, `storage` |
| Konsep terkait | `context`, `persistence` |
| Kata yang mungkin diketik orang | `remember`, `history` |

Yang **tidak** boleh jadi tag: nama kategori (redundan, sudah di `category`), kata terlalu umum (`icon`, `svg`, `ui`), nama brand, dan variasi ejaan yang bisa ditangani fuzzy search ([09](./09-search-system.md)).

Tag dalam bahasa Inggris. `keywords` menampung bahasa lain.

### `aliases`
Nama alternatif yang **menghasilkan komponen deprecated yang benar-benar bisa diimpor**. Bukan sekadar bantuan pencarian — kalau hanya untuk pencarian, itu tag.

Alias dipakai untuk dua hal saja:
1. Nama yang pernah dipakai lalu diubah (jalur migrasi).
2. Istilah yang benar-benar setara dan pasti dicari orang (`llm` ↔ `large-language-model`).

Alias masuk ruang nama global yang sama dengan slug, jadi tidak boleh bertabrakan dengan slug atau alias mana pun.

### `keywords`
Istilah jargon panjang, ejaan alternatif, dan singkatan yang tidak layak jadi tag karena terlalu spesifik — semuanya **dalam bahasa Inggris**. Tidak dipakai untuk penamaan komponen, hanya masuk index pencarian dengan bobot lebih rendah.

**Bukan tempat menampung bahasa lain.** Menaruh terjemahan di sini terasa gratis, tapi menciptakan cakupan yang timpang: sepuluh icon punya kata Indonesia dan 990 tidak, sehingga pencarian bekerja sekali lalu gagal sembilan kali dan pengguna menyimpulkan fiturnya rusak. Lokalisasi adalah keputusan Phase 3+ yang digarap per-bahasa secara menyeluruh, dengan berkas terpisah dan pemilik terpisah — bukan tambahan sukarela per icon.

### `related`
Diturunkan otomatis dari perceptual hash ([06 §6.5](./06-svg-engine.md#65-deteksi-duplikat)) jarak Hamming 9–14, dibatasi 6 teratas. Boleh ditimpa manual dengan field `relatedOverride` jika kurasi manusia lebih baik.

### `deprecated`
```jsonc
"deprecated": { "since": "1.2.0", "replacedBy": "agent-recall", "reason": "Nama disederhanakan" }
```
Icon deprecated tetap dipublikasikan minimal satu versi major, tetap muncul di pencarian dengan badge, dan komponennya memancarkan peringatan konsol sekali per proses di mode development.

## 7.5 JSON Schema

Di-generate dari Zod, dipublikasikan di `https://iconmind.dev/schema/icon.json` sehingga editor memberi autocomplete saat kontributor mengetik.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://iconmind.dev/schema/icon.json",
  "title": "IconMind Icon Metadata",
  "type": "object",
  "additionalProperties": false,
  "required": ["slug", "category", "subcategory", "name", "description", "tags"],
  "properties": {
    "$schema": { "type": "string" },

    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$",
      "minLength": 2, "maxLength": 40,
      "description": "Pengenal unik global. API publik — mengubahnya breaking change."
    },
    "category": {
      "type": "string",
      "enum": ["ai","agents","mcp","rag","data","devops","cloud",
               "security","automation","analytics","devtools","interface"]
    },
    "subcategory": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$" },
    "name": { "type": "string", "minLength": 2, "maxLength": 40 },
    "description": { "type": "string", "minLength": 5, "maxLength": 120 },

    "tags": {
      "type": "array", "minItems": 3, "maxItems": 12, "uniqueItems": true,
      "items": { "type": "string", "pattern": "^[a-z0-9]+([ -][a-z0-9]+)*$", "maxLength": 30 }
    },
    "aliases": {
      "type": "array", "maxItems": 5, "uniqueItems": true, "default": [],
      "items": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$" }
    },
    "keywords": {
      "type": "array", "maxItems": 20, "uniqueItems": true, "default": [],
      "items": { "type": "string", "maxLength": 40 }
    },
    "contributors": {
      "type": "array", "uniqueItems": true, "default": [],
      "items": { "type": "string", "pattern": "^[A-Za-z0-9-]{1,39}$" }
    },
    "relatedOverride": {
      "type": "array", "maxItems": 6, "uniqueItems": true,
      "items": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$" }
    },
    "deprecated": {
      "type": ["object", "null"], "default": null,
      "additionalProperties": false,
      "required": ["since", "reason"],
      "properties": {
        "since": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
        "replacedBy": { "type": "string", "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$" },
        "reason": { "type": "string", "maxLength": 200 }
      }
    },

    "componentName": { "type": "string", "pattern": "^[A-Z][A-Za-z0-9]*$", "readOnly": true },
    "contentHash": { "type": "string", "pattern": "^sha256:[a-f0-9]{64}$", "readOnly": true },
    "structuralHash": { "type": "string", "readOnly": true },
    "elementCount": { "type": "integer", "minimum": 1, "maximum": 12, "readOnly": true },
    "byteSize": { "type": "integer", "minimum": 1, "maximum": 1500, "readOnly": true },
    "related": { "type": "array", "items": { "type": "string" }, "maxItems": 6, "readOnly": true },
    "addedIn": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$", "readOnly": true },
    "updatedIn": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$", "readOnly": true }
  }
}
```

`additionalProperties: false` disengaja: field yang salah ketik harus gagal keras, bukan diam-diam diabaikan.

## 7.6 Agregat `metadata.json`

```jsonc
{
  "version": "0.5.2",
  "generatedAt": "2026-08-23T00:00:00Z",
  "counts": { "total": 512, "byCategory": { "ai": 78, "agents": 61 } },
  "categories": [
    { "slug": "ai", "name": "AI & LLM", "count": 78,
      "subcategories": [ { "slug": "model", "count": 14 } ] }
  ],
  "icons": [ /* objek icon lengkap */ ]
}
```

Dipakai oleh: website ([08](./08-website.md)), MCP server ([13](./13-mcp-server.md)), builder Figma ([12](./12-figma-strategy.md)), dan generator index pencarian ([09](./09-search-system.md)). Diekspor dari `@iconmind/icons` sebagai `metadata` sehingga konsumen bisa membangun browser icon sendiri.

Ukuran perkiraan pada 1000 icon: ~700 KB tanpa kompresi, ~90 KB dengan gzip. Ini **tidak** dikirim ke browser sebagai satu berkas — website memakai index pencarian yang jauh lebih ramping ([09 §9.4](./09-search-system.md#94-anggaran-ukuran-index)).

## 7.7 Versioning

Tidak ada versi per-icon. Versi hanya ada di tingkat package ([CANON C3](./CANON.md#c3-package-yang-di-publish)), dengan `addedIn` dan `updatedIn` sebagai jejak per-icon.

| Perubahan | Bump | Alasan |
|-----------|------|--------|
| Icon baru | `minor` | Penambahan API |
| Perbaikan visual pada icon lama | `minor` | Pengguna melihat perubahan; `patch` menyesatkan |
| Perbaikan tag/description | `patch` | Tidak terlihat di UI |
| Menambah alias | `patch` | Aditif murni |
| Menandai deprecated | `minor` | Ada peringatan baru |
| Menghapus icon / alias | `major` | Breaking |
| Rename slug | `major` | Breaking, wajib sertakan alias |

## 7.8 Kualitas Metadata sebagai Metrik

Metadata membusuk diam-diam. Empat pemeriksaan otomatis di `nightly.yml` ([14](./14-ci-cd.md)):

| Cek | Ambang |
|-----|--------|
| Rata-rata jumlah tag per icon | ≥ 5 |
| Icon dengan tepat 3 tag (minimum) | < 15% dari total |
| Deskripsi duplikat | 0 |
| Tag yang hanya muncul pada 1 icon | < 20% dari kosakata tag |

Baris terakhir yang paling berguna: tag yang tidak pernah dipakai ulang biasanya adalah tag yang tidak akan pernah diketik orang. Tag semacam itu menambah ukuran index tanpa menambah penemuan.
