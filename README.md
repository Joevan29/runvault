# RUNVAULT | AeroPulse Runner 3D Microsite

![status](https://img.shields.io/badge/status-production_ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three.js](https://img.shields.io/badge/Three.js-R3F-orange)
![license](https://img.shields.io/badge/license-MIT-green)

Microsite 3D bertema produk sepatu lari dengan pengalaman **WebGL scrollytelling** yang tetap rapi, cepat, dan responsif untuk mobile, tablet, dan desktop.

- **Demo:** https://YOUR-VERCEL-LINK-HERE  
- **Repo:** https://github.com/YOUR-USERNAME/runvault

> Ganti link demo setelah deploy.

![Preview](public/images/preview.png)

> Rekomendasi: ganti `public/images/preview.png` dengan screenshot asli, atau GIF pendek yang menampilkan hero dan scrollytelling.

---

## Ringkasan

RUNVAULT adalah project portfolio yang menggabungkan:
- Presentasi produk yang minimal dan clean
- Viewer 3D berbasis GLB
- Scrollytelling (gerak kamera atau model mengikuti scroll)
- Theme toggle (dark dan light)
- Konten produk (product, gallery, about, contact)

Project ini sengaja dibuat tanpa backend agar fokus ke kualitas UI, interaksi 3D, dan performa.

---

## Fitur Utama

### 1) 3D dan Scrollytelling
- **GLB Viewer:** render model sepatu `.glb` dengan auto-centering dan fit-to-frame agar ukuran model stabil di berbagai layar.
- **Scrollytelling Section:** sequence berbasis progress scroll, konten card berubah per step.
- **Performance-aware rendering:** pixel ratio clamping, render loop dinyalakan hanya saat diperlukan, lighting ringan.

### 2) UI dan UX
- **Responsive layout:** grid dan spacing konsisten untuk mobile, tablet, dan desktop.
- **Dark dan light mode:** theme toggle via `next-themes`, state tersimpan saat refresh.
- **Motion halus:** transisi fokus pada keterbacaan, bukan efek berlebihan.

### 3) Konten Produk
- **Product page:** tech highlights, specs, dan CTA (pre-order).
- **Gallery:** grid thumbnail, modal preview opsional (bisa 3D).
- **About:** penjelasan desain, material, dan nilai produk.
- **Contact:** form dengan validasi client-side dan submit via `mailto:` (tanpa server).

---

## Tech Stack

> Daftar final bergantung pada isi `package.json` kamu.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **3D:** React Three Fiber (R3F), Drei
- **Styling:** Tailwind CSS
- **Theme:** next-themes
- **Animation:** Framer Motion dan atau GSAP (jika terpasang)
- **Icons:** Lucide React (jika terpasang)
- **UI primitives:** Radix UI (jika terpasang)

---

## Struktur Project

```bash
runvault/
├── app/                   # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── product/           # Product page
│   ├── gallery/           # Gallery page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout (Navbar, Footer, Theme)
├── components/
│   ├── three/             # Komponen 3D (Canvas, loader, helpers)
│   ├── home/              # Hero, scrolly story, sections homepage
│   └── ui/                # Button, Card, Badge, dsb
├── public/
│   ├── models/
│   │   └── shoe.glb       # Asset 3D utama
│   └── images/            # Screenshot, action-shot, preview
└── lib/                   # Helpers, constants, util scroll, util math
```

---

## Menjalankan Project

### Prasyarat
- Node.js 18+

### Install
Gunakan salah satu package manager saja.

#### Opsi A: npm
```bash
npm install
npm run dev
```

#### Opsi B: pnpm (disarankan kalau repo kamu pakai `pnpm-lock.yaml`)
```bash
pnpm install
pnpm dev
```

Buka:
- http://localhost:3000

### Build produksi
```bash
npm run build
npm run start
```

---

## Workflow Asset

### Model 3D (GLB)
Taruh model di:
- `public/models/shoe.glb`

Rekomendasi optimasi:
- Gunakan `gltfpack` atau `gltf-transform` untuk memperkecil ukuran file.
- Jaga ukuran tekstur agar realistis untuk web.

### Gambar dan Preview
- Screenshot, banner, action-shot: `public/images/`
- Gunakan `next/image` untuk gambar yang tampil di UI.

---

## Environment Variables

Jika kamu pakai env, jangan pernah commit nilai rahasia. Buat file contoh:

`.env.example`
```env
# NEXT_PUBLIC_ANALYTICS_ID=
```

Lalu untuk lokal:
```bash
cp .env.example .env.local
```

---

## Deployment

Direkomendasikan deploy ke Vercel:
1. Push repo ke GitHub
2. Import project di Vercel
3. Set environment variables jika ada
4. Deploy
5. Update link Demo di bagian atas README

---

## Troubleshooting cepat

### 3D tidak tampil atau blank
- Pastikan path model benar: `public/models/shoe.glb` dan dipanggil sebagai `/models/shoe.glb`
- Pastikan canvas tidak ketutup overlay. Cek `z-index` dan `pointer-events`
- Turunkan pixel ratio jika terasa berat di mobile

### Theme toggle tidak bisa diklik
- Pastikan toggle adalah client component dan tidak ketutup layer lain
- Pastikan `ThemeProvider` membungkus app dan `darkMode: "class"` di Tailwind config

---

## Contributing

Kontribusi terbuka untuk perbaikan UI, performa, dan kualitas scrollytelling.
1. Fork repository
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/nama-fitur`
5. Buat Pull Request

---

## License

MIT License. Lihat file `LICENSE` jika tersedia.

---

## Credits

© 2025 RUNVAULT  
Concept dan implementasi oleh **Jvnprmnachmd**.
