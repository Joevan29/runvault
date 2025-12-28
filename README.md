# RUNVAULT | AeroPulse Runner 3D Microsite

![Project Status](https://img.shields.io/badge/status-production_ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three.js](https://img.shields.io/badge/Three.js-R3F-orange)
![License](https://img.shields.io/badge/license-MIT-green)

An immersive 3D product microsite concept for **AeroPulse Runner**, built to showcase modern WebGL storytelling with a clean, performance-minded UI.

**Live Demo:** https://YOUR-VERCEL-LINK-HERE  
**Repository:** https://github.com/YOUR-USERNAME/runvault

> Replace the link above after deployment.

![Preview](public/images/preview.png)
> Replace this image with a real screenshot or short GIF (recommended: hero + scrollytelling frame).

---

## About

RUNVAULT is a portfolio-grade microsite that blends minimalist e-commerce presentation with interactive 3D storytelling. The goal is to demonstrate how a modern product landing page can feel premium, responsive, and performant while using real-time WebGL visuals.

This project focuses on:
- A smooth scrollytelling section (scroll-driven 3D choreography).
- A product view that stays readable on mobile and desktop.
- A gallery experience that feels consistent and polished.
- Dark and light theme support.

---

## Key Features

### 3D Experience
- **3D Viewer (GLB):** Renders a `.glb` shoe model with auto-centering and fit-to-frame camera logic.
- **Scrollytelling:** Scroll progress drives model and camera motion with subtle transitions.
- **Performance Mindset:** Pixel ratio clamping, conditional render loops, and lightweight lighting.

### UI and UX
- **Responsive Layout:** Mobile-first grid system and consistent spacing across sections.
- **Dark and Light Theme:** Theme toggle using `next-themes` (persisted across refresh).
- **Clean Motion:** Minimal animations to keep the UI smooth and readable.

### Product and Content
- **Product Showcase:** Specs and tech highlights presented in a clean layout.
- **Gallery:** Thumbnail grid with optional modal preview.
- **About Section:** Structured product narrative with a consistent responsive grid.
- **Contact:** Premium contact layout with client-side validation and mailto submit (no backend).

---

## Tech Stack

| Category | Technology |
|---------|------------|
| Core | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D | React Three Fiber (R3F), Drei |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP (optional, based on your repo) |
| UI Primitives | Radix UI (optional, based on your repo) |
| Icons | Lucide React |

> Keep only the tools that actually exist in your `package.json`.

---

## Project Structure

```bash
runvault/
├── app/                  # Next.js App Router pages
│   ├── product/          # Product page
│   ├── gallery/          # Gallery page
│   ├── about/            # About page
│   ├── contact/          # Contact page (or section)
│   └── layout.tsx        # Root layout (Navbar/Footer/Theme)
├── components/           # Reusable components
│   ├── three/            # Three.js / R3F components (Canvas, Model, Controls)
│   ├── home/             # Hero + Scrollytelling sections
│   └── ui/               # UI atoms (Button, Card, Badge)
├── public/
│   ├── models/           # 3D assets (GLB)
│   │   └── shoe.glb
│   └── images/           # Screenshots, action shots, preview
└── lib/                  # Helpers (math, scroll utils, constants)
```

Getting Started
Prerequisites
Node.js 18+

Installation
```
git clone https://github.com/YOUR-USERNAME/runvault.git
cd runvault
npm install
```
Run Development Server
```
npm run dev
```
Open:

http://localhost:3000
Production Build
```
npm run build
npm run start
```
Assets
3D Model
Place your GLB file here:

public/models/shoe.glb

Recommended optimization:

Keep textures small enough for web delivery.

Use GLB optimization tools such as gltfpack or gltf-transform for smaller bundle sizes.

Images
Put screenshots and marketing images inside public/images/.

Use next/image where possible for responsive optimization.

Environment Variables
If your project uses environment variables:

```
cp .env.example .env.local
```
Example .env.example (only if required):
```
# NEXT_PUBLIC_ANALYTICS_ID=
```
Important:

Never commit .env.local or secrets to GitHub.

Deployment
Recommended: Vercel

Push the repository to GitHub

Import the repo in Vercel

Add environment variables if needed

Deploy

After deployment, replace:

Live Demo link at the top of this README

Preview image path if you use a different screenshot

Contributing
This is a portfolio project, but contributions are welcome.

Fork this repository

Create a new branch:

```
git checkout -b feature/your-feature
```
Commit your changes:
```
git commit -m "Add your feature"
```
Push your branch:
```
git push origin feature/your-feature
```
Open a Pull Request

License
Distributed under the MIT License. See LICENSE for details.

Credits
© 2025 RUNVAULT
Concept and implementation by Jvnprmnachmd.




