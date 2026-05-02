# 🖥️ Cahayo OS — macOS-Inspired Portfolio

> A fully interactive macOS desktop experience built for **Earnest Odhiambo Achayo** — Data Analyst & Software Engineer.

![Cahayo OS Preview](https://via.placeholder.com/1200x630/1c1c1e/a78bfa?text=Cahayo+OS+%E2%80%94+Portfolio)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🖥️ macOS Desktop | Full desktop simulation with wallpaper, aurora effect, desktop icons |
| 🍎 Menu Bar | Live clock, WiFi/Battery icons, theme toggle |
| 🚀 Dock | Magnification hover effect (like real macOS), open/close indicators |
| 🪟 Windows | Draggable, closable, minimizable with `framer-motion` |
| 🔢 Window Focus | z-index stack management via Zustand |
| 🌓 Dark/Light Mode | Aurora blobs in dark, soft gradients in light |
| 💾 Boot Screen | Animated Cahayo OS logo + loading bar |
| 📱 Mobile Fallback | Responsive adjustments for smaller screens |

---

## 🗂️ Project Structure

```
cahayo-os/
├── app/
│   ├── globals.css          # All custom CSS (glass, terminal, dock, etc.)
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Entry point → <Desktop />
├── components/
│   ├── Desktop.tsx          # 🧠 Main orchestrator
│   ├── MenuBar.tsx          # Top macOS menu bar
│   ├── Dock.tsx             # Bottom dock with magnification
│   ├── Wallpaper.tsx        # Aurora wallpaper + desktop icons
│   ├── BootScreen.tsx       # Boot animation
│   ├── Window.tsx           # 🪟 Core draggable window component
│   └── apps/
│       ├── AboutWindow.tsx      # 👤 Finder-style — bio, education, certs
│       ├── ProjectsWindow.tsx   # 🌐 Browser-style — project cards + detail
│       ├── SkillsWindow.tsx     # ⌨️  Terminal — interactive CLI for skills
│       ├── ExperienceWindow.tsx # 📝 Notes-style — experience timeline
│       └── ContactWindow.tsx    # ✉️  Mail app — inbox + compose
├── lib/
│   └── portfolio.ts         # 📦 All your portfolio data (single source of truth)
├── store/
│   └── windowStore.ts       # 🗃️ Zustand state (windows, theme, boot)
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) and enjoy Cahayo OS!

---

## 🎨 Customization

### Update your data
All portfolio content lives in **`lib/portfolio.ts`** — one file to rule them all:
```ts
export const PORTFOLIO = {
  name: "Your Name",
  email: "you@email.com",
  avatar: "https://...",
  projects: [...],
  experience: [...],
  // etc.
}
```

### Change the wallpaper
In `app/globals.css`, edit the CSS variables:
```css
:root {
  --wallpaper-dark: radial-gradient(ellipse at 20% 50%, #1a0533 ...);
  --wallpaper-light: radial-gradient(ellipse at 20% 50%, #d4e8ff ...);
}
```

### Change aurora colors
```css
.aurora-blob:nth-child(1) { background: #5b21b6; }
.aurora-blob:nth-child(2) { background: #1d4ed8; }
.aurora-blob:nth-child(3) { background: #0e7490; }
```

---

## 🏗️ Architecture Decisions

### State Management (Zustand)
Window state is managed centrally in `store/windowStore.ts`:
- `openWindow(id)` — opens + brings to front
- `closeWindow(id)` — closes with exit animation
- `minimizeWindow(id)` — hides from desktop
- `focusWindow(id)` — raises z-index

### Window Component
`components/Window.tsx` is the core reusable primitive:
```tsx
<Window 
  id="about"          // Links to Zustand store
  title="About Me"    // Title bar label
  width={780}         // Default width
  height={520}        // Default height
  variant="finder"    // Affects styling
>
  {/* Your content */}
</Window>
```

### Dock Magnification
Uses `framer-motion`'s `useMotionValue` and `useTransform` to create the iconic macOS magnification:
```tsx
const distance = useTransform(mouseX, (mx) => Math.abs(mx - center));
const scale = useTransform(distance, [0, 80, 160], [1.55, 1.25, 1]);
```

---

## ⚡ Performance Tips

1. **Lazy-load windows** — Add `dynamic()` imports for each app window to reduce initial bundle
2. **Image optimization** — Replace avatar URL with Next.js `<Image>` component
3. **Reduce motion** — Add `prefers-reduced-motion` media query for accessibility
4. **Font optimization** — Self-host fonts instead of Google Fonts import

```tsx
// Example lazy loading
const AboutWindow = dynamic(() => import("@/components/apps/AboutWindow"), { ssr: false });
```

---

## 🎯 Suggested Enhancements

- [ ] **Spotlight Search** — `⌘ + Space` opens a search bar across all sections  
- [ ] **Window minimize animation** — Genie effect to dock icon  
- [ ] **Right-click context menu** — macOS-style contextual menus on desktop  
- [ ] **Multiple wallpapers** — Cycle through wallpaper options  
- [ ] **Notification center** — Slide-in toasts for interactions  
- [ ] **Screen saver** — Idle animation after 60 seconds  
- [ ] **Sound effects** — Subtle open/close/click sounds with Web Audio API  
- [ ] **Mobile app drawer** — Replaces dock on small screens  

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.x | App Router, SSR, optimizations |
| React | 18.x | UI framework |
| Framer Motion | 11.x | Animations, drag, spring physics |
| Zustand | 4.x | Window & theme state |
| Tailwind CSS | 3.x | Utility-first styling |
| TypeScript | 5.x | Type safety |
| Lucide React | Latest | Icons |

---

## 📄 License

MIT — Built with ❤️ for Earnest Achayo · Cahayo OS v1.0
