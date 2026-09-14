# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Cahayo OS" — a single-page Next.js portfolio site styled as a macOS desktop (boot screen, menu bar, dock, draggable/resizable windows). Each "app" in the dock is a portfolio section (About, Projects, Terminal/Skills, Experience, Contact) rendered as a themed window (Finder, Browser, Terminal, Notes, Mail respectively).

## Commands

```bash
npm install       # install deps
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build (also runs type-checking + lint)
npm start         # serve the production build
npm run lint      # next lint
npx tsc --noEmit  # type-check only, faster than a full build
```

There is no test framework configured in this repo (no jest/vitest present) — don't assume one exists.

**Dev server + prod build conflict**: `next dev` and `next build` both write to `.next/`. Running `npm run build` while a `next dev` server is still running from a previous session will corrupt the dev server's assets (it starts 404ing on its JS/CSS chunks and the page hangs on the boot screen). If that happens, kill the dev server, `rm -rf .next`, and restart `npm run dev`.

## Architecture

**Everything is client-side.** `app/page.tsx` renders a single `<Desktop />` component; there are no other routes. All interactive components are `"use client"`.

**Data flows one way, from a single source of truth**: `lib/portfolio.ts` exports a `PORTFOLIO` object with everything shown on the site (name, bio, skills, experience, projects, education, certs, contact info). Every app window imports from here — there is no CMS or API. Update this file to change content; don't hunt for hardcoded copy in components.

**Window state lives in one Zustand store**: `store/windowStore.ts` tracks, per app id (`about | projects | skills | experience | contact`), `isOpen`, `isMinimized`, `isMaximized`, `isFocused`, `position`, and `zIndex`, plus global `isDark` (theme) and `bootComplete`. Actions (`openWindow`, `closeWindow`, `minimizeWindow`, `focusWindow`, `toggleMaximize`, `setPosition`, `toggleTheme`) are the only way components should mutate window state — don't reach into the store's internals from a component.

**`components/Window.tsx` is the shared window chrome** every app window wraps itself in (traffic lights, title bar, drag, maximize/restore). It branches on three states rather than being three components:
- Desktop, normal: draggable via the title bar only (`dragListener={false}` + `dragControls.start()` on the title bar's `onPointerDown` — dragging is intentionally *not* possible by grabbing window content), position comes from the store, clamped in `onDragEnd` so a window can't be dragged off-screen or under the menu bar.
- Desktop, maximized (`win.isMaximized`): fixed inset covering the desktop between the menu bar and dock; double-clicking the title bar toggles this.
- Mobile (`useIsMobile()` from `hooks/useIsMobile.ts`, breakpoint 768px): the window goes full-screen *below* the menu bar (`top: 28`, not `inset: 0` — the always-on-top `MenuBar` would otherwise cover a flush-to-top header) with a "← Home" back button instead of traffic lights.

Each file in `components/apps/` (`AboutWindow.tsx`, `ProjectsWindow.tsx`, `SkillsWindow.tsx`, `ExperienceWindow.tsx`, `ContactWindow.tsx`) renders its own internal layout (sidebar, tabs, terminal input, etc.) inside a `<Window>`, keyed by the matching `AppId`. `SkillsWindow.tsx` simulates a shell (`ls`, `cat <category>`, `whoami`, `clear`, `help`) over the skills data in `PORTFOLIO.skills` — it's always dark-themed regardless of the global theme, matching a real terminal.

**Theming**: `isDark` from the store is applied as a `dark` class on the root div in `Desktop.tsx`. Components branch manually on `isDark` per-element with Tailwind classes (there's no `dark:` variant convention in use) — when adding UI, style both branches explicitly rather than hardcoding one theme's colors, since a hardcoded color that only makes sense in dark mode silently breaks in light mode (and vice versa).

**Dock icons** (`components/Dock.tsx`) use `lucide-react` icons on gradient squircle backgrounds, not emoji (emoji render inconsistently across platforms/fonts). Hover magnification is driven by a `framer-motion` `useMotionValue`/`useTransform` distance-from-cursor calculation, disabled on mobile. Tooltips use Tailwind's `group`/`group-hover`, not a bespoke CSS class.

**Contact form** (`ContactWindow.tsx`) has no backend — "sending" builds a `mailto:` URL from the form fields and hands off to the user's mail client via `window.location.href`. Don't reintroduce a fake "message sent" simulation without real delivery.

## Content/UI conventions worth preserving

- New "apps" get an `AppId` entry in `store/windowStore.ts` (`DEFAULT_POSITIONS`, `windows`), a dock entry in `Dock.tsx`, and a window component in `components/apps/`.
- Projects listed in `PORTFOLIO.projects` should link to real, verified GitHub repos (check they resolve, e.g. via `gh api repos/<owner>/<repo>` or the public REST API) rather than a generic profile URL, when a matching repo exists.
- The project intentionally avoids external image assets for icons/favicons — the favicon in `app/layout.tsx` is an inline SVG data URI so the app has no `public/` dependency.
