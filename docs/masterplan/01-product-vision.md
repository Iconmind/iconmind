# 01 — Product Vision

> Semua angka & nama di dokumen ini mengacu ke [CANON.md](./CANON.md).

---

## 1.1 Vision

> **Menjadi bahasa visual standar untuk perangkat lunak era AI.**

Ketika seorang developer membangun agent, pipeline RAG, atau MCP server, dia tidak perlu lagi meng-improvisasi icon "robot" atau "database" untuk menjelaskan konsep yang punya nama sendiri. Ada icon yang tepat, konsisten, gratis, dan sudah dikenali orang lain.

## 1.2 Mission

Menyediakan **1000 icon SVG open source berkualitas produksi** dalam 12 bulan yang mencakup kosakata AI/LLM/Agents/MCP/RAG — dengan satu design system yang ketat, distribusi lewat React/Vue/SVG/Figma/MCP, dan proses kontribusi yang bisa dijalankan satu orang.

## 1.3 Problem Statement

Ada tiga masalah nyata, bukan satu.

**Masalah 1 — Kosakata baru tidak punya bentuk visual.**
Istilah seperti *context window*, *reranker*, *tool calling*, *guardrail*, *embedding*, *MCP resource*, *chunk overlap* muncul di UI produk setiap hari. Tidak ada icon library mainstream yang memilikinya. Developer akhirnya memakai icon generik yang salah arti: `Bot` untuk agent, `Database` untuk vector store, `Zap` untuk inference. Arti hilang, UI jadi ambigu.

**Masalah 2 — Improvisasi tidak konsisten.**
Solusi ad-hoc hari ini: comot dari beberapa library sekaligus, atau minta AI bikin SVG sekali pakai. Hasilnya stroke width beda, optical weight beda, corner radius beda. Satu layar bisa berisi 4 bahasa visual berbeda.

**Masalah 3 — Tidak ada yang menggarap niche ini serius.**
Icon AI yang ada sekarang tersebar di dribbble shot, Figma file berbayar, atau brand-logo set (`simple-icons` punya logo OpenAI, tapi itu logo, bukan konsep). Belum ada yang memperlakukan *konsep* AI sebagai domain taksonomi yang layak diberi 500+ icon.

## 1.4 Kenapa Library yang Ada Tidak Cukup

| Library | Kekuatan | Kenapa tidak menyelesaikan masalah |
|---------|----------|-------------------------------------|
| **Lucide** (~1600 icon) | Konsisten, tree-shakeable, komunitas besar | Generalist. Kosakata AI hampir nol. Menambah 500 icon AI ke Lucide akan ditolak sebagai *scope creep* — dan memang seharusnya begitu. |
| **Heroicons** (~300 icon) | Sangat rapi, dipakai ekosistem Tailwind | Sengaja kecil dan opinionated. Domain-specific tidak akan pernah masuk. |
| **Phosphor** (~9000 icon) | Volume besar, 6 weight | Luas tapi dangkal di AI. Punya `robot`, tidak punya `reranker`. |
| **Tabler** (~5900 icon) | Volume besar, gratis | Sama: coverage horizontal, bukan vertikal ke domain AI. |
| **Simple Icons** | Logo brand lengkap | Ini logo perusahaan, bukan konsep. Domain berbeda. |
| **Icon set berbayar (Streamline dll)** | Kualitas tinggi | Berbayar, lisensi restriktif, tidak bisa jadi standar komunitas. |

**Kesimpulan strategis**: Kita **tidak** bersaing dengan Lucide. Kita **melengkapi** Lucide.
Positioning resmi: *"Pakai Lucide untuk UI umum. Pakai IconMind untuk konsep AI."* Kompatibilitas visual dengan Lucide (grid 24, stroke 2, round cap) adalah **fitur**, bukan kebetulan — supaya keduanya bisa dipakai berdampingan di satu layar tanpa terlihat tabrakan.

## 1.5 AI Era Opportunity

Empat gelombang yang membuat timing ini masuk akal:

1. **Ledakan produk AI.** Ribuan startup AI/agent baru per tahun, semuanya butuh UI, semuanya butuh icon untuk konsep yang sama.
2. **MCP menjadi standar.** Model Context Protocol menciptakan kategori objek baru (server, client, resource, tool, prompt, sampling) yang butuh representasi visual — dan belum ada satu pun.
3. **Biaya produksi icon runtuh.** AI bisa menghasilkan kandidat SVG dalam hitungan detik. Bottleneck bergeser dari *menggambar* ke *menilai* dan *mengkonsistenkan*. Itu pekerjaan yang bisa dilakukan satu orang dengan tooling yang benar.
4. **Distribusi baru: agent sebagai konsumen.** MCP server membuat icon bisa ditemukan dan dipakai oleh AI coding assistant secara langsung. Ini kanal distribusi yang belum dimanfaatkan library icon mana pun. **Ini diferensiator paling tajam yang kita punya.**

**Window-nya terbatas.** Kalau Lucide atau Phosphor memutuskan menggarap AI category secara serius, keunggulan kita hilang. Karena itu roadmap mengejar *depth* dan *MCP-native distribution* — dua hal yang paling lambat ditiru.

## 1.6 Strategi Open Source

**Lisensi MIT untuk kode dan aset.** Satu file `LICENSE`, tanpa dual-licensing. Alasan: friksi nol. Dual license (MIT + CC-BY) terdengar rapi tapi memaksa setiap pengguna memutuskan bagian mana yang mana. Icon set yang menang (Lucide/ISC, Heroicons/MIT, Tabler/MIT) semuanya permisif dan sederhana.

**Yang kami janjikan:**
- Selamanya gratis, seluruhnya, untuk komersial.
- Tidak ada tier berbayar untuk icon.
- Tidak ada telemetry, tidak ada akun, tidak ada gating.

**Model keberlanjutan** (kalau perlu, mulai Phase 3+): GitHub Sponsors, satu baris sponsor di README dan footer situs. Tidak lebih. Monetisasi agresif akan membunuh adopsi komunitas sebelum sempat tumbuh.

## 1.7 Strategi Pertumbuhan Komunitas

Tiga tingkat friksi kontribusi, sengaja dibuat berjenjang:

**Tier 1 — Request icon (friksi ~1 menit).**
GitHub Issue Form: nama konsep, deskripsi 1 kalimat, referensi opsional. Tidak perlu bisa desain. Ini pintu masuk terbanyak dan sumber roadmap paling berharga — *request adalah data permintaan pasar*.

**Tier 2 — Submit SVG (friksi ~15 menit).**
PR berisi satu file SVG + satu file JSON. CI langsung memberi umpan balik: validasi grid, stroke, optimasi, deteksi duplikat, plus **preview render otomatis sebagai komentar PR**. Kontributor melihat hasilnya tanpa clone repo.

**Tier 3 — Maintainer kategori (friksi tinggi, undangan).**
Setelah 10 PR icon yang di-merge, kontributor diundang jadi *category owner* — punya wewenang review untuk satu domain. Ini satu-satunya cara bus factor naik dari 1.

**Aturan yang menjaga kualitas tetap tinggi sambil ramah**: review menilai *icon*, bukan orang. Template penolakan selalu menyertakan alasan konkret + referensi ke aturan di [03](./03-design-system.md) + tawaran revisi. Tidak pernah "ditutup tanpa penjelasan".

## 1.8 Strategi Pertumbuhan GitHub

Star bukan tujuan; star adalah *sinyal kepercayaan* yang membuat orang berani memasang dependency. Taktik konkret:

- **README adalah landing page.** Grid preview icon di atas (PNG statis, ter-generate otomatis), install snippet, satu GIF pemakaian. Di bawah 3 layar scroll.
- **Auto-generated preview per release.** Setiap release memposting grid icon baru — konten visual yang mudah dibagikan.
- **`good first issue` selalu ≥ 10.** Setiap icon di backlog yang sudah punya definisi jelas otomatis menjadi issue siap-ambil.
- **Balas PR < 48 jam.** Ini metrik yang paling menentukan apakah kontributor kedua datang.
- **Topics GitHub**: `icons`, `svg`, `react`, `vue`, `ai`, `llm`, `agents`, `mcp`, `rag`, `icon-library`, `design-system`.
- **Kaitkan ke ekosistem**: buka PR kecil ke `awesome-mcp-servers`, `awesome-ai-tools`, daftar icon di direktori komunitas. Ini backlink berkualitas dan gratis.
- **Rilis berirama**: minor release tiap 2 minggu. Repo yang terlihat hidup mendapat kepercayaan; repo dengan commit terakhir 4 bulan lalu tidak.

Target: 500 star di M3 → 8000 di M12 ([C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17)).

## 1.9 Long-Term Vision (Tahun 2–3)

Diurutkan berdasarkan keyakinan, dari paling pasti ke paling spekulatif:

1. **Weights & variants** — `filled`, `duotone`, dan stroke weight 1/1.5/2/2.5 (ditunda dari Tahun 1 secara sadar; lihat [03](./03-design-system.md)).
2. **Platform lain** — Svelte, Angular, Solid, Flutter, SwiftUI, Android XML. Semuanya codegen dari sumber yang sama, biaya marginal rendah.
3. **Icon animasi** — micro-animation Lottie/CSS untuk state agent (thinking, calling tool, streaming). Sangat cocok dengan produk AI.
4. **MCP menjadi kanal utama.** Kalau AI coding assistant bisa memilih icon yang tepat sendiri saat men-generate UI, IconMind menjadi default tanpa developer pernah membuka website. Ini taruhan jangka panjang terbesar.
5. **Standar de-facto taksonomi.** Nilai jangka panjang mungkin bukan file SVG-nya, melainkan **taksonomi konsep AI-nya** — daftar nama kanonik yang disepakati industri.

**Anti-goals — hal yang secara eksplisit tidak akan kami kerjakan:** marketplace, editor icon online, akun pengguna, plugin berbayar, backend, aset non-SVG (3D/ilustrasi), dan logo brand.
