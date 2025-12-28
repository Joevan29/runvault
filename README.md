# RUNVAULT | AeroPulse Microsite

![Project Status](https://img.shields.io/badge/status-production_ready-success)
![Next.js](https://img.shields.io/badge/next.js-14+-black)
![Tailwind](https://img.shields.io/badge/tailwind-3.0-blue)
![Three.js](https://img.shields.io/badge/three.js-r3f-orange)

A high-performance, immersive 3D microsite for the **AeroPulse Runner**. This project demonstrates strict frontend architecture, "Scrollytelling" mechanics, and interactive WebGL assets optimized for production.

## 🚀 Key Features

### 🧊 Immersive 3D Experience
-   **Core Viewer**: Standardized `ShoeViewer` component with auto-centering and precise bounding-box normalization.
-   **Scrollytelling**: Scroll-driven camera choreography with keyframe interpolation (Home Page).
-   **Interactive Inspection**: 360° product viewer with zoom/orbit controls (Product & Modal).
-   **Performance**: On-demand rendering, `contactShadows`, and aggressive DPR clamping (`1.25`) for 60fps on mobile.

### ⚡ Modern Frontend Tech
-   **Framework**: Next.js 14 (App Router) for server-side optimization.
-   **Styling**: Tailwind CSS with a scalable design system (Vertical Rhythm, `max-w-7xl` containers).
-   **Motion**: Framer Motion for smooth UI transitions and efficient entering animations.
-   **Hygiene**: Strict TypeScript typing, component modularity, and clean project structure.

## 🛠️ Tech Stack

| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | Next.js 14, TypeScript | App architecture and type safety |
| **3D** | @react-three/fiber, Drei | WebGL Canvas and Helpers |
| **Styles** | Tailwind CSS | Utility-first styling |
| **State** | React Hooks | Local interaction state |

## 📦 Project Structure

```bash
runvault/
├── app/                  # Next.js App Router Pages
│   ├── about/            # Responsive About Page
│   ├── gallery/          # 3D Gallery Grid
│   └── product/          # E-commerce Layout
├── components/           # Reusable UI Blocks
│   ├── 3d/               # ShoeViewer, Three.js Logic
│   ├── home/             # Hero, ScrollyShowcase
│   └── ui/               # Buttons, Badges, Containers
├── public/               # Static Assets
│   └── shoe.glb          # 3D Model (Keep small!)
└── ...config files
```

## 🏁 Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/your-username/runvault.git
    cd runvault
    npm install
    # or
    yarn install
    ```

2.  **Run Development**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

3.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 🎨 Asset Workflow

-   **GLB Models**: Place in `/public`. Ensure models are compressed (Draco/Meshopt) if >2MB.
-   **Images**: Use Next.js `<Image/>` for auto-optimization.
-   **3D Viewer**: The `<ShoeViewer />` component handles normalization automatically. No need to manual center models in Blender.

## 🔐 Deployment & Hygiene

-   **Secrets**: This project currently uses **NO** environment variables(`process.env`).
-   **Git**: `.env` files and `node_modules` are strictly ignored.
-   **Vercel**: Zero-config deployment recommended.

---

**© 2025 RUNVAULT**. Concept Project.
