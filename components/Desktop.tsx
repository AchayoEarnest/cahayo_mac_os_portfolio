"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import { BootScreen } from "@/components/BootScreen";
import { MenuBar } from "@/components/MenuBar";
import { Dock } from "@/components/Dock";
import { Wallpaper } from "@/components/Wallpaper";
import { AboutWindow } from "@/components/apps/AboutWindow";
import { ProjectsWindow } from "@/components/apps/ProjectsWindow";
import { SkillsWindow } from "@/components/apps/SkillsWindow";
import { ExperienceWindow } from "@/components/apps/ExperienceWindow";
import { ContactWindow } from "@/components/apps/ContactWindow";

export function Desktop() {
  const { bootComplete, isDark, openWindow } = useWindowStore();

  // Apply dark class to HTML
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Open About window after boot
  useEffect(() => {
    if (bootComplete) {
      const t = setTimeout(() => openWindow("about"), 400);
      return () => clearTimeout(t);
    }
  }, [bootComplete, openWindow]);

  // Escape closes the focused (frontmost) window
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const state = useWindowStore.getState();
      const open = (Object.values(state.windows) as (typeof state.windows)[keyof typeof state.windows][]).filter(
        (w) => w.isOpen && !w.isMinimized
      );
      if (open.length === 0) return;
      const target = open.find((w) => w.isFocused) ?? open.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
      state.closeWindow(target.id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={isDark ? "dark" : ""} style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Boot screen */}
      <AnimatePresence>
        {!bootComplete && <BootScreen key="boot" />}
      </AnimatePresence>

      {/* Desktop */}
      <AnimatePresence>
        {bootComplete && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* Wallpaper */}
            <Wallpaper />

            {/* Menu bar — z-100 */}
            <MenuBar />

            {/* App windows — rendered in their own z layers */}
            <AboutWindow />
            <ProjectsWindow />
            <SkillsWindow />
            <ExperienceWindow />
            <ContactWindow />

            {/* Dock — z-90 */}
            <Dock />

            {/* Welcome overlay — fades in then out */}
            <WelcomeToast isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeToast({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 0.8 }}
      // Auto-hide after 4 seconds
      onAnimationComplete={() => {}}
      style={{ zIndex: 80 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 pointer-events-none"
    >
      <motion.div
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ times: [0, 0.1, 0.7, 1], duration: 4, delay: 0.8 }}
        className={`px-6 py-3 rounded-2xl text-sm flex items-center gap-3 ${
          isDark
            ? "bg-white/10 border border-white/15 text-white backdrop-blur-xl"
            : "bg-black/8 border border-black/10 text-gray-800 backdrop-blur-xl"
        }`}
      >
        <span className="text-lg">👋</span>
        <div>
          <p className="font-semibold">Welcome to Cahayo OS</p>
          <p className={`text-xs mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
            Click apps in the dock to explore my portfolio
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
