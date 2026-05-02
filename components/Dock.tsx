"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useWindowStore, AppId } from "@/store/windowStore";
import clsx from "clsx";

interface DockApp {
  id: AppId;
  label: string;
  icon: string;
  gradient: string;
}

const DOCK_APPS: DockApp[] = [
  { id: "about",      label: "About Me",   icon: "👤", gradient: "from-blue-500 to-cyan-400" },
  { id: "projects",   label: "Projects",   icon: "🚀", gradient: "from-purple-500 to-pink-400" },
  { id: "skills",     label: "Terminal",   icon: "⌨️", gradient: "from-gray-800 to-gray-600" },
  { id: "experience", label: "Experience", icon: "📝", gradient: "from-amber-500 to-orange-400" },
  { id: "contact",    label: "Contact",    icon: "✉️",  gradient: "from-blue-600 to-indigo-500" },
];

function DockItem({ app, mouseX }: { app: DockApp; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { windows, openWindow, isDark } = useWindowStore();
  const win = windows[app.id];

  // Distance from mouse → scale transform
  const distance = useTransform(mouseX, (mx) => {
    if (!ref.current) return 9999;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(mx - center);
  });

  const scale = useTransform(distance, [0, 80, 160], [1.55, 1.25, 1]);
  const y     = useTransform(distance, [0, 80, 160], [-18, -8, 0]);

  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });
  const ySpring     = useSpring(y,     { stiffness: 300, damping: 20 });

  const handleClick = () => {
    if (win.isOpen && !win.isMinimized) {
      // bounce animation handled by window
      openWindow(app.id); // re-focus
    } else {
      openWindow(app.id);
    }
  };

  return (
    <motion.div ref={ref} style={{ scale: scaleSpring, y: ySpring }} className="relative flex flex-col items-center">
      <button
        onClick={handleClick}
        className="relative w-14 h-14 rounded-[14px] flex items-center justify-center cursor-pointer focus:outline-none"
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
        aria-label={app.label}
      >
        {/* Icon background */}
        <div className={`w-full h-full rounded-[14px] bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{app.icon}</span>
        </div>

        {/* Tooltip */}
        <div className={clsx(
          "dock-tooltip text-xs font-medium px-2 py-1 rounded-md",
          isDark
            ? "bg-gray-800/90 text-white border border-white/10"
            : "bg-white/90 text-gray-800 border border-black/10",
          "backdrop-blur-sm shadow-lg"
        )}>
          {app.label}
        </div>
      </button>

      {/* Open indicator dot */}
      {win.isOpen && (
        <motion.div
          layoutId={`dot-${app.id}`}
          className={clsx(
            "dock-dot",
            isDark ? "bg-white/60" : "bg-black/40"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
    </motion.div>
  );
}

export function Dock() {
  const { isDark } = useWindowStore();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] flex items-end"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={clsx(
          "flex items-end gap-2 px-4 py-2 rounded-2xl",
          isDark
            ? "bg-white/10 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-white/60 border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
          "backdrop-blur-2xl"
        )}
      >
        {DOCK_APPS.map((app) => (
          <DockItem key={app.id} app={app} mouseX={mouseX} />
        ))}

        {/* Divider */}
        <div className={clsx(
          "w-px h-10 self-center mx-1",
          isDark ? "bg-white/20" : "bg-black/15"
        )} />

        {/* Trash icon */}
        <motion.div
          style={{ scale: 1 }}
          whileHover={{ scale: 1.35, y: -18 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center cursor-pointer"
        >
          <span className="text-2xl">🗑️</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
