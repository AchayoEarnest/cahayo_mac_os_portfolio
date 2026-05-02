"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Wifi, Battery, Volume2 } from "lucide-react";
import { useWindowStore } from "@/store/windowStore";

export function MenuBar() {
  const { isDark, toggleTheme } = useWindowStore();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const glassClass = isDark
    ? "glass-dark text-white/90"
    : "glass-light text-dark-text border-b border-black/10";

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] h-7 flex items-center px-4 ${glassClass}`}
      style={{ backdropFilter: "blur(24px) saturate(180%)" }}
    >
      {/* Left side — Apple logo + menus */}
      <div className="flex items-center gap-1 flex-1">
        {/* Cahayo OS logo */}
        <div className="menubar-item flex items-center gap-1.5">
          <div className="w-4 h-4 rounded flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <span className="text-white text-[8px] font-bold leading-none">C</span>
          </div>
          <span className="text-xs font-semibold">Cahayo OS</span>
        </div>

        <span className={`text-xs font-semibold menubar-item ${isDark ? "text-white" : "text-black"}`}>
          Finder
        </span>
        {["File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
          <span key={item} className={`menubar-item text-xs ${isDark ? "text-white/80" : "text-black/80"}`}>
            {item}
          </span>
        ))}
      </div>

      {/* Right side — system icons */}
      <div className="flex items-center gap-2">
        {/* System icons */}
        <div className="flex items-center gap-3 mr-2">
          <Wifi size={13} className="opacity-70" />
          <Volume2 size={13} className="opacity-70" />
          <Battery size={13} className="opacity-70" />
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="menubar-item flex items-center gap-1 text-xs"
          aria-label="Toggle theme"
        >
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </button>

        {/* Clock */}
        <div className="flex items-center gap-2 menubar-item text-xs">
          <span className="opacity-70">{date}</span>
          <span className="font-medium tabular-nums">{time}</span>
        </div>
      </div>
    </motion.div>
  );
}
