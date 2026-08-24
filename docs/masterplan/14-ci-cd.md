# 14 — CI/CD

> Lima workflow, nama file baku: [CANON C8](./CANON.md#c8-github-actions-5-workflow-nama-file-baku). Lokasi: `.github/workflows/` ([05 §5.2](./05-repository-architecture.md#52-struktur-lengkap)).

---

## 14.1 Prinsip

1. **CI adalah reviewer pertama.** Untuk solo maintainer, CI harus menangkap semua yang bisa ditangkap mesin sehingga waktu manusia hanya dipakai untuk penilaian rasa.
2. **Umpan balik < 3 menit.** Kontributor yang menunggu 15 menit akan berhenti mengontribusi.
3. **Preview visual di setiap PR icon.** Ini fitur CI paling bernilai di seluruh proyek — reviewer bisa menilai tanpa clone.
4. **Rilis tidak pernah manual.** Merge ke `main` dengan changeset → npm dan situs ter-update sendiri.

## 14.2 `ci.yml` — Pemeriksaan Utama

Berjalan pada setiap PR dan push ke `main`.

```yaml
name: CI
on:
  pull_request:
  push: { branches: [main] }

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }

      - run: pnpm install --frozen-lockfile

      - name: Restore turbo cache
        uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-${{ runner.os }}-${{ github.sha }}
          restore-keys: turbo-${{ runner.os }}-

      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
      - run: pnpm test
```

Satu job, bukan matriks. Pada repo sebesar ini, biaya start job lebih besar daripada penghematan paralelisasi. `cancel-in-progress` mencegah antrean menumpuk saat kontributor mem-push berkali-kali.

## 14.3 `icon-check.yml` — Gerbang Kualitas Icon

Berjalan hanya ketika file di `packages/icons/icons/**` berubah.

```yaml
name: Icon Check
on:
  pull_request:
    paths: ["packages/icons/icons/**"]

permissions:
  contents: read
  pull-requests: write

jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile

      - name: Validate SVG
        run: pnpm icons:validate

      - name: Optimizer harus idempoten
        run: |
          pnpm icons:optimize
          if ! git diff --quiet; then
            echo "::error::SVG belum dioptimasi. Jalankan 'pnpm icons:optimize' lalu commit."
            git --no-pager diff --stat
            exit 1
          fi

      - name: Deteksi duplikat (lapis 1 & 2)
        run: pnpm icons:duplicates

      - name: Render preview PNG
        run: pnpm icons:preview --changed-only --base origin/${{ github.base_ref }}

      - name: Komentar preview di PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('.preview/comment.md', 'utf8');
            const { data: comments } = await github.rest.issues.listComments({
              ...context.repo, issue_number: context.issue.number,
            });
            const mine = comments.find(c =>
              c.user.type === 'Bot' && c.body.includes('<!-- iconmind-preview -->'));
            const params = { ...context.repo, body };
            if (mine) await github.rest.issues.updateComment({ ...params, comment_id: mine.id });
            else await github.rest.issues.createComment({ ...params, issue_number: context.issue.number });
```

**Isi komentar preview** — inilah yang membuat review icon bisa cepat:

```markdown
<!-- iconmind-preview -->
## Preview icon

| Icon | 16px | 24px | 48px | Terang | Gelap |
|------|------|------|------|--------|-------|
| `agents/agent-memory` | ![](…) | ![](…) | ![](…) | ![](…) | ![](…) |

### Dalam konteks
Bersanding dengan icon lain di sub-kategori `memory`:

![konteks](…)

### Pemeriksaan otomatis
- ✅ Validasi struktur, atribut, geometri
- ✅ Optimizer idempoten
- ✅ Tidak ada duplikat (jarak Hamming terdekat: 22 dengan `scratchpad`)
- ⚠️ Berat optis 18% di atas rata-rata sub-kategori

### Sisa untuk reviewer manusia
- [ ] Makna bisa ditebak tanpa label?
- [ ] Menyatu dengan tetangganya?
- [ ] Metafora sesuai [design system](https://iconmind.dev/docs/design-guidelines)?
```

Baris "Dalam konteks" adalah bagian terpenting: menilai icon sendirian hampir tidak mungkin; menilainya di antara tetangganya mudah.

**PNG di-upload ke mana?** Ke branch `assets` di repo yang sama, di bawah `pr-<number>/`, lalu dirujuk lewat `raw.githubusercontent.com`. Tanpa layanan eksternal, tanpa biaya. Branch dibersihkan `nightly.yml` untuk PR yang sudah tertutup.

## 14.4 `release.yml` — Publikasi npm

```yaml
name: Release
on:
  push: { branches: [main] }

concurrency: release-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  id-token: write          # untuk npm provenance

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm, registry-url: "https://registry.npmjs.org" }
      - run: pnpm install --frozen-lockfile

      - uses: changesets/action@v1
        id: changesets
        with:
          version: pnpm changeset version
          publish: pnpm release
          commit: "chore: version packages"
          title: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_CONFIG_PROVENANCE: true

      - name: Grid icon baru untuk catatan rilis
        if: steps.changesets.outputs.published == 'true'
        run: pnpm icons:preview --release-grid --tag ${{ steps.changesets.outputs.publishedPackages }}
```

Alur Changesets: PR dengan changeset di-merge → bot membuka PR "version packages" → merge PR itu → publikasi berjalan. Dua langkah merge, tapi memberi kesempatan meninjau changelog sebelum rilis benar-benar keluar.

Keempat package publik ([CANON C3](./CANON.md#c3-package-yang-di-publish)) di-rilis bersama dengan versi terkunci — `@iconmind/react@0.5.2` selalu cocok dengan `@iconmind/icons@0.5.2`. Versi mandiri per package akan membuat matriks kompatibilitas yang tidak perlu.

## 14.5 `deploy-docs.yml` — Deploy Situs

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]
    paths: ["apps/docs/**", "packages/icons/**", ".github/workflows/deploy-docs.yml"]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile

      - run: pnpm build --filter=docs...
      - run: pnpm icons:index

      - name: Lighthouse CI
        run: pnpm dlx @lhci/cli autorun --collect.staticDistDir=apps/docs/out

      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          command: pages deploy apps/docs/out --project-name=iconmind
```

Cloudflare Pages dipilih karena bandwidth tidak berbayar pada tier gratis — situs icon menyajikan banyak aset kecil, dan itu pola yang paling cepat menghabiskan kuota di platform lain.

Lighthouse CI gagal kalau skor turun di bawah 95 ([08 §8.13](./08-website.md#813-performa)). Ambangnya di-commit di `lighthouserc.json` supaya regresi performa ketahuan pada PR yang menyebabkannya, bukan tiga bulan kemudian.

## 14.6 `nightly.yml` — Audit Berkala

```yaml
name: Nightly
on:
  schedule: [{ cron: "0 3 * * *" }]
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Duplikat perceptual (lapis 3)
        run: pnpm icons:duplicates --perceptual

      - name: Anggaran ukuran bundle
        run: pnpm dlx size-limit

      - name: Kualitas metadata
        run: pnpm icons:validate --metadata-quality

      - name: Snapshot visual seluruh set
        run: pnpm test --filter=visual

      - name: Cek tautan mati di docs
        run: pnpm dlx linkinator apps/docs/out --recurse --silent

      - name: Bersihkan aset preview PR yang sudah tertutup
        run: pnpm tsx scripts/lib/cleanup-preview-assets.ts

      - name: Buka issue kalau ada yang gagal
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              ...context.repo,
              title: `Nightly audit gagal — ${new Date().toISOString().slice(0,10)}`,
              body: `Run: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
              labels: ["maintenance"],
            });
```

Pemeriksaan mahal diletakkan di sini, bukan di PR, supaya umpan balik PR tetap di bawah 3 menit.

## 14.7 Perlindungan Branch

| Aturan | Nilai |
|--------|-------|
| Pemeriksaan wajib | `verify` dan (jika berlaku) `check` |
| Butuh review | 1 approval — dikecualikan untuk maintainer di repo satu orang |
| Riwayat linear | Wajib (squash merge) |
| Force push | Dilarang |
| Penghapusan branch | Dilarang |
| Berlaku untuk admin | Ya, kecuali untuk hotfix |

Squash merge menjaga riwayat `main` tetap satu commit per icon — yang membuat `git log` menjadi changelog icon yang bisa dibaca, dan membuat `addedIn`/`updatedIn` ([06 §6.6](./06-svg-engine.md#66-generator-metadata)) akurat.

## 14.8 Manajemen Secret

| Secret | Dipakai di | Cakupan |
|--------|-----------|---------|
| `NPM_TOKEN` | `release.yml` | Automation token, terbatas pada scope `@iconmind` |
| `CF_API_TOKEN` | `deploy-docs.yml` | Hanya izin Pages |
| `CF_ACCOUNT_ID` | `deploy-docs.yml` | Bukan rahasia sungguhan |
| `GITHUB_TOKEN` | semua | Otomatis, izin minimum per workflow |

Semua workflow menetapkan `permissions:` secara eksplisit. Default GitHub terlalu longgar, dan PR dari fork tidak boleh punya akses tulis.

**PR dari fork tidak menerima secret** — itu perilaku GitHub dan memang yang diinginkan. Konsekuensinya: komentar preview pada PR fork dijalankan lewat `pull_request_target` dengan checkout eksplisit ke SHA PR **tanpa menjalankan kode dari PR tersebut** (hanya membaca file SVG dan me-render-nya dengan kode dari `main`). Ini satu-satunya cara aman memberi preview ke kontributor eksternal.

## 14.9 Anggaran Waktu

| Workflow | Target | Isi terlama |
|----------|--------|-------------|
| `ci.yml` | < 3 mnt | build + test |
| `icon-check.yml` | < 2 mnt | render preview |
| `release.yml` | < 5 mnt | build + publish 4 package |
| `deploy-docs.yml` | < 6 mnt | build Next.js 1000+ halaman |
| `nightly.yml` | < 30 mnt | perceptual hash + snapshot visual |

Kalau `deploy-docs.yml` melewati 15 menit, tindakan pertama adalah membatasi prerender ([08 §8.2](./08-website.md#82-rendering--data)), bukan menaikkan timeout.

## 14.10 Pemantauan Kesehatan CI

Yang perlu diperhatikan, dan ambang bertindaknya:

| Sinyal | Ambang | Tindakan |
|--------|--------|----------|
| Tingkat kegagalan CI di `main` | > 5% | Ada test flaky; perbaiki atau hapus |
| Durasi CI rata-rata | Naik > 50% dalam sebulan | Audit langkah yang membengkak |
| Waktu antre | > 2 mnt | Kurangi matriks atau tambah concurrency group |
| Menit Actions terpakai | > 70% kuota gratis | Pindahkan lebih banyak ke `nightly.yml` |

Repo publik mendapat menit Actions tak terbatas untuk runner standar, jadi baris terakhir hanya relevan kalau repo pernah dijadikan privat.
