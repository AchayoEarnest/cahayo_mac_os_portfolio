"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useWindowStore, AppId } from "@/store/windowStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { User, Rocket, Terminal, NotebookText, Mail, Trash2, type LucideIcon } from "lucide-react";
import clsx from "clsx";

interface DockApp {
  id: AppId;
  label: string;
  icon: LucideIcon;
  gradient: string;
}

const DOCK_APPS: DockApp[] = [
  { id: "about",      label: "About Me",   icon: User,         gradient: "from-sky-400 to-blue-600" },
  { id: "projects",   label: "Projects",   icon: Rocket,       gradient: "from-fuchsia-500 to-purple-600" },
  { id: "skills",     label: "Terminal",   icon: Terminal,     gradient: "from-slate-600 to-slate-900" },
  { id: "experience", label: "Experience", icon: NotebookText, gradient: "from-amber-400 to-orange-600" },
  { id: "contact",    label: "Contact",    icon: Mail,         gradient: "from-indigo-500 to-blue-700" },
];

function DockIconShell({
  gradient,
  sizeClass,
  isDark,
  children,
}: {
  gradient: string;
  sizeClass: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br shadow-lg",
        gradient,
        sizeClass,
        isDark ? "ring-1 ring-white/15 shadow-black/40" : "ring-1 ring-black/10 shadow-black/25"
      )}
    >
      {/* Glossy highlight for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)" }}
      />
      {/* Bottom inner shadow for grounding */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 -6px 10px -4px rgba(0,0,0,0.35)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function DockItem({ app, mouseX, isMobile }: { app: DockApp; mouseX: ReturnType<typeof useMotionValue<number>>; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { windows, openWindow, isDark } = useWindowStore();
  const win = windows[app.id];
  const Icon = app.icon;

  // Distance from mouse → scale transform
  const distance = useTransform(mouseX, (mx) => {
    if (!ref.current) return 9999;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(mx - center);
  });

  const scale = useTransform(distance, [0, 80, 160], isMobile ? [1, 1, 1] : [1.55, 1.25, 1]);
  const y     = useTransform(distance, [0, 80, 160], isMobile ? [0, 0, 0] : [-18, -8, 0]);

  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });
  const ySpring     = useSpring(y,     { stiffness: 300, damping: 20 });

  const handleClick = () => {
    openWindow(app.id);
  };

  const sizeClass = isMobile ? "w-12 h-12 rounded-[26%]" : "w-14 h-14 rounded-[24%]";

  return (
    <motion.div ref={ref} style={{ scale: scaleSpring, y: ySpring }} className="group relative flex flex-col items-center">
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center cursor-pointer focus:outline-none"
        aria-label={app.label}
      >
        <DockIconShell gradient={app.gradient} sizeClass={sizeClass} isDark={isDark}>
          <Icon
            size={isMobile ? 22 : 26}
            strokeWidth={2}
            className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
          />
        </DockIconShell>

        {/* Tooltip */}
        <div className={clsx(
          "pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap",
          "text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150",
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
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-[90] flex items-end max-w-[95vw]"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={clsx(
          "flex items-end gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl overflow-x-auto",
          isDark
            ? "bg-white/10 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-white/60 border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
          "backdrop-blur-2xl"
        )}
      >
        {DOCK_APPS.map((app) => (
          <DockItem key={app.id} app={app} mouseX={mouseX} isMobile={isMobile} />
        ))}

        {/* Divider */}
        <div className={clsx(
          "w-px h-10 self-center mx-1 flex-shrink-0",
          isDark ? "bg-white/20" : "bg-black/15"
        )} />

        {/* Trash */}
        <motion.div
          className="group relative flex flex-col items-center flex-shrink-0"
          whileHover={isMobile ? undefined : { scale: 1.35, y: -18 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative flex items-center justify-center cursor-pointer">
            <DockIconShell
              gradient="from-slate-400 to-slate-600"
              sizeClass={isMobile ? "w-12 h-12 rounded-[26%]" : "w-14 h-14 rounded-[24%]"}
              isDark={isDark}
            >
              <Trash2
                size={isMobile ? 20 : 24}
                strokeWidth={2}
                className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
              />
            </DockIconShell>
            <div className={clsx(
              "pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap",
              "text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150",
              isDark
                ? "bg-gray-800/90 text-white border border-white/10"
                : "bg-white/90 text-gray-800 border border-black/10",
              "backdrop-blur-sm shadow-lg"
            )}>
              Trash
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
