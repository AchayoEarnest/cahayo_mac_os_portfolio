"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";

export function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "loading" | "done">("logo");
  const setBootComplete = useWindowStore((s) => s.setBootComplete);

  useEffect(() => {
    // Phase 1: show logo
    const t1 = setTimeout(() => setPhase("loading"), 1200);
    // Phase 2: animate progress
    const t2 = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 12 + 3;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setPhase("done");
          setTimeout(setBootComplete, 600);
        }
        setProgress(p);
      }, 120);
      return () => clearInterval(interval);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setBootComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Apple-like logo area */}
      <AnimatePresence mode="wait">
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo mark */}
            <div className="relative">
              <div className="w-20 h-20 rounded-[22px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
                  boxShadow: "0 0 60px rgba(139, 92, 246, 0.6)"
                }}
              >
                <span className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "SF Pro Display, -apple-system, sans-serif" }}>
                  C
                </span>
              </div>
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-[22px]"
                style={{ boxShadow: "0 0 0 2px rgba(139,92,246,0.4)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
              Cahayo OS
            </p>
          </motion.div>
        )}

        {phase !== "logo" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Logo smaller */}
            <div className="w-16 h-16 rounded-[18px] flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
              }}
            >
              <span className="text-3xl font-bold text-white">C</span>
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p className="text-white text-xl font-semibold tracking-wide">Cahayo OS</p>
              <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">
                Earnest Achayo · Portfolio
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48">
              <div className="boot-progress">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
                    width: `${progress}%`,
                    transition: "width 0.15s ease",
                  }}
                />
              </div>
              <p className="text-white/25 text-xs text-center mt-3 font-mono">
                {Math.round(progress)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom credits */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 text-white text-xs tracking-widest"
      >
        CAHAYO OS v1.0
      </motion.p>
    </motion.div>
  );
}
