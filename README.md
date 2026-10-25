# Zero-Gravity Portfolio // Software & Hardware Engineering

> "Clean intelligence meets zero gravity." An editorial, high-performance portfolio engineered for software and hardware builders who operate from silicon registers and PCB traces up to reactive distributed cloud interfaces.

![Portfolio Banner Preview](https://raw.githubusercontent.com/kingsley805-tech/kingsport/main/public/IMG_20260108_145926_631~2.jpg)

---

## 🌟 Key Features

1. **3D WebGL Circuit Constellation (Hero)**:
   - Full-screen Three.js WebGL scene featuring a floating, slowly rotating microcontroller die (QFP-64 with gold silicon core and pin leads), satellite SMD chips, and 3D copper traces with animated photon pulses traveling along them.
   - Zero-gravity particle cloud that reacts dynamically to mouse parallax and repulsion.
   - Live boot sequence terminal with automated typing effect (`> initializing portfolio.sys v4.2.0 … OK`).

2. **Hardware / Software Duality (Interactive Split-Morph)**:
   - Interactive draggable slider and scroll-morphing pane between bare-metal firmware (C11 FreeRTOS driver with DMA ring-buffer) and a vector 4-layer PCB layout (with STM32H7, buck converters, CAN-FD transceivers, and live DRC status).

3. **Live GitHub REST API Telemetry**:
   - Fetches public repositories live in the browser (`/users/{username}/repos?per_page=100&sort=pushed`) with automatic pagination.
   - **Default sort: newest first** (`pushed_at` descending), plus toggles for *Recently updated*, *Newest created*, *Oldest first*, and *Most starred*.
   - Auto-classifies each repository as **Hardware** or **Software** based on topics, language, and keywords (STM32, ESP32, KiCad, PCB, embedded, etc.).
   - Featured top 3 repositories pinned in a Bento layout above the main grid.
   - 10-minute `localStorage` cache with graceful 403 rate-limit detection and fallback showcase.
   - Lazy-loaded slide-over README detail modal with language breakdown percentages.
   - GitHub statistics strip and contribution-style activity heatmap.

4. **Zero-Gravity Card Physics (Antigravity Mode)**:
   - 3D mouse tilt with specular glare highlights.
   - One-click **Antigravity Mode**: Releases all project cards into a free-floating physics canvas where cards drift with inertia, can be grabbed and tossed around the viewport, and cleanly snap back to the grid.

5. **Claude-Style Editorial Design System**:
   - Warm cream/off-white light theme and deep charcoal dark theme.
   - Terracotta/copper accent palette (`#E07A5F`), refined serif display type (`Instrument Serif`), crisp grotesk (`Inter`), and technical mono (`JetBrains Mono`).
   - Circular reveal theme transition animation originating from the toggle button.

6. **Command Palette (⌘K / Ctrl+K)**:
   - Floating keyboard-accessible palette for jumping to sections, toggling Antigravity physics, switching themes, copying direct email, and searching projects.

7. **Zero-Gravity Custom Cursor**:
   - Smooth lerped ring with center dot, particle spark trails, and automatic badge morph to `VIEW` over project cards and `TOSS` in Antigravity mode. Automatically disabled on touch devices.

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

```bash
# 1. Clone repository
git clone https://github.com/kingsley805-tech/kingsport.git
cd kingsport

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The site will be live at `http://localhost:5173`.

---

## 🛠️ Personalization & Placeholders to Replace

All personal data, links, bio texts, and GitHub credentials live in two synchronized, highly documented files:

- **Root Config**: `config.js`
- **Source Config**: `src/config.ts`

### Exact Placeholders to Update in `config.js` / `src/config.ts`:

| Placeholder Field | Description | Default / Example Value |
| :--- | :--- | :--- |
| `name` | Your full display name | `"Kingsley Atta Yeboah"` |
| `shortName` | Your first name or brand moniker | `"Kingsley"` |
| `title` | Professional subtitle / engineering specialty | `"Software & Hardware Engineer"` |
| `githubUsername` | **Crucial:** Used to fetch your live repos | `"kingsley805-tech"` |
| `email` | Your primary contact email | `"kingsleyattayeboah@gmail.com"` |
| `socials.github` | URL to your GitHub profile | `"https://github.com/kingsley805-tech"` |
| `socials.linkedin`| URL to your LinkedIn profile | `"https://linkedin.com/in/..."` |
| `socials.twitter` | URL to your X / Twitter handle | `"https://x.com/..."` |
| `bio` | 2-3 sentence punchy summary | Customized in `src/config.ts` |
| `about.paragraphs`| Long-form narrative about your journey | Customized in `src/config.ts` |
| `skills.hardware` | Microcontrollers, EDA tools, protocols | List of skills & proficiency % |
| `skills.software` | Languages, frameworks, cloud tools | List of skills & proficiency % |
| `experience` | Timeline items with company & stack | List of roles & achievements |

---

## 📦 Production Build & Deployment

### Build for Production:
```bash
npm run build
```
This compiles and bundles an optimized distribution into the `dist/` directory.

### Deploy to Vercel:
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages:
Run `npm run build` and push the `dist/` folder to the `gh-pages` branch, or configure GitHub Actions to build automatically on push.

---

## 🏛️ Architecture Overview

```text
kingsport/
├── config.js               # Root-level configuration for immediate editing
├── index.html              # HTML shell, Instrument Serif & Inter fonts, JSON-LD
├── src/
│   ├── config.ts           # Central typed configuration & fallback projects
│   ├── index.css           # Claude editorial palette, dark mode, keyframes
│   ├── main.tsx            # React root mount
│   ├── App.tsx             # Root routing and query provider
│   ├── components/
│   │   ├── Preloader.tsx        # Self-drawing SVG circuit preloader
│   │   ├── CustomCursor.tsx     # Zero-gravity cursor with trailing ring & particles
│   │   ├── Navbar.tsx           # Floating glass pill, circuit trace, circular theme
│   │   ├── HeroScene.tsx        # Three.js 3D silicon die & photon pulse constellation
│   │   ├── HeroSection.tsx      # Terminal boot sequence, headline, live telemetry
│   │   ├── DualitySection.tsx   # Interactive C code vs. vector PCB layout morph
│   │   ├── ProjectsSection.tsx  # Live GitHub API, Bento, Antigravity mode, heatmap
│   │   ├── ProjectCard.tsx      # 3D tilt card with specular glare
│   │   ├── ProjectDetailModal.tsx # Slide-over lazy README & language breakdown
│   │   ├── AboutSection.tsx     # Parallax photo frame, impact stats, skills matrix
│   │   ├── ExperienceSection.tsx # Horizontal-scroll timeline
│   │   ├── ContactSection.tsx   # Magnetic email CTA, dispatch form, subnets
│   │   ├── Footer.tsx           # Live local time (Accra/UTC), solder fumes
│   │   └── CommandPalette.tsx   # ⌘K / Ctrl+K quick navigation palette
│   └── lib/
│       ├── github.ts            # GitHub REST API client, cache, classification
│       └── lenis.ts             # Inertia smooth scrolling scroller
```

---

## 🛡️ Performance & Accessibility
- **Lighthouse Targeted**: Optimized assets, capped `devicePixelRatio` at 2.
- **Motion Accessibility**: Fully respects `prefers-reduced-motion` (pauses WebGL particle physics and falls back to clean transitions).
- **SEO & Social**: OpenGraph, Twitter Cards, and schema.org `Person` JSON-LD metadata.
