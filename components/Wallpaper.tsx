"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PORTFOLIO } from "@/lib/portfolio";
import clsx from "clsx";

export function Wallpaper() {
  const { isDark } = useWindowStore();
  const isMobile = useIsMobile();

  return (
    <div
      className={clsx("fixed inset-0 z-0 overflow-hidden", isDark ? "wallpaper-dark" : "wallpaper-light")}
    >
      {/* Aurora blobs */}
      {isDark && (
        <div className="aurora">
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
      )}

      {/* Light mode gradient blobs */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { bg: "#dbeafe", x: "-10%", y: "-10%", size: 600 },
            { bg: "#ede9fe", x: "60%",  y: "30%",  size: 500 },
            { bg: "#d1fae5", x: "20%",  y: "60%",  size: 400 },
          ].map((blob, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: blob.size,
                height: blob.size,
                left: blob.x,
                top: blob.y,
                background: blob.bg,
                filter: "blur(80px)",
                opacity: 0.6,
              }}
              animate={{ scale: [1, 1.05, 1], x: [0, 20, 0] }}
              transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Desktop icons */}
      {!isMobile && <DesktopIcons isDark={isDark} />}
    </div>
  );
}

function DesktopIcons({ isDark }: { isDark: boolean }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selected, setSelected] = useState<string | null>(null);

  const items = [
    { icon: "📁", label: "Projects", x: "right-6", y: "top-16", action: () => openWindow("projects") },
    { icon: "📝", label: "Experience", x: "right-6", y: "top-36", action: () => openWindow("experience") },
    { icon: "📄", label: "Resume.pdf", x: "right-6", y: "top-56", action: () => window.open(PORTFOLIO.cvLink, "_blank", "noopener,noreferrer") },
  ];

  return (
    <div className="contents" onClick={() => setSelected(null)}>
      {items.map((item) => (
        <motion.button
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); setSelected(item.label); }}
          onDoubleClick={(e) => { e.stopPropagation(); item.action(); }}
          title="Double-click to open"
          className={clsx(
            "absolute flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors",
            selected === item.label
              ? isDark ? "bg-blue-500/30 ring-1 ring-blue-400/50" : "bg-blue-500/20 ring-1 ring-blue-400/50"
              : isDark ? "hover:bg-white/10" : "hover:bg-black/5",
            item.x, item.y
          )}
        >
          <div className="w-12 h-12 flex items-center justify-center text-3xl">
            {item.icon}
          </div>
          <span className={clsx(
            "text-xs px-2 py-0.5 rounded text-center leading-tight",
            isDark ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]" : "text-gray-800"
          )}>
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
