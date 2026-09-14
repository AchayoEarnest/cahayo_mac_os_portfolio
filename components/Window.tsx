"use client";

import { useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useWindowStore, AppId } from "@/store/windowStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronLeft } from "lucide-react";
import clsx from "clsx";

interface WindowProps {
  id: AppId;
  title: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  children: React.ReactNode;
  titleBarContent?: React.ReactNode;
  variant?: "default" | "finder" | "browser" | "terminal" | "notes" | "mail";
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

export function Window({
  id,
  title,
  width = 800,
  height = 560,
  minWidth = 400,
  minHeight = 300,
  children,
  titleBarContent,
  variant = "default",
}: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow, toggleMaximize, setPosition, isDark } = useWindowStore();
  const win = windows[id];
  const isMobile = useIsMobile();
  const dragControls = useDragControls();

  const handleClose = useCallback((e: React.MouseEvent) => { e.stopPropagation(); closeWindow(id); }, [closeWindow, id]);
  const handleMinimize = useCallback((e: React.MouseEvent) => { e.stopPropagation(); minimizeWindow(id); }, [minimizeWindow, id]);
  const handleMaximize = useCallback((e: React.MouseEvent) => { e.stopPropagation(); toggleMaximize(id); }, [toggleMaximize, id]);
  const handleFocus = useCallback(() => { if (!win.isFocused) focusWindow(id); }, [focusWindow, id, win.isFocused]);

  const titleBarBg = isDark
    ? variant === "terminal"
      ? "bg-[#1e1e1e] border-b border-white/5"
      : "bg-[#2a2a2e] border-b border-white/8"
    : variant === "terminal"
      ? "bg-[#2d2d2d] border-b border-black/10"
      : "bg-[#ebebeb] border-b border-black/8";

  const windowBg = isDark
    ? variant === "terminal"
      ? "bg-[#1a1a1a]"
      : "bg-[#1e1e20]"
    : variant === "terminal"
      ? "bg-[#1a1a1a]"
      : "bg-[#f8f8f8]";

  const shadowClass = isDark ? "window-shadow-dark" : "window-shadow-light";

  if (!win.isOpen) return null;

  const canDrag = !isMobile && !win.isMaximized;

  const positionStyle: React.CSSProperties = isMobile
    ? { position: "fixed", top: 28, left: 0, right: 0, bottom: 0, zIndex: win.zIndex }
    : win.isMaximized
      ? { position: "fixed", top: 32, left: 10, right: 10, bottom: 100, zIndex: win.zIndex }
      : { position: "fixed", left: win.position.x, top: win.position.y, width, minWidth, height, minHeight, zIndex: win.zIndex };

  return (
    <AnimatePresence>
      {win.isOpen && !win.isMinimized && (
        <motion.div
          key={id}
          drag={canDrag}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          onDragEnd={(_, info) => {
            if (!canDrag) return;
            const nextX = clamp(win.position.x + info.offset.x, -(width - 140), window.innerWidth - 140);
            const nextY = clamp(win.position.y + info.offset.y, 28, window.innerHeight - 48);
            setPosition(id, { x: nextX, y: nextY });
          }}
          initial={isMobile ? { opacity: 0, y: 24 } : { opacity: 0, scale: 0.85, y: 30 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={
            isMobile
              ? { opacity: 0, y: 24, transition: { duration: 0.2 } }
              : { opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } }
          }
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={positionStyle}
          onMouseDown={handleFocus}
          className={clsx(
            "flex flex-col overflow-hidden",
            !isMobile && "rounded-xl",
            windowBg,
            !isMobile && shadowClass,
            win.isFocused || isMobile ? "ring-0" : "opacity-95"
          )}
        >
          {/* Title bar */}
          {isMobile ? (
            <div className={clsx("h-12 flex items-center px-2 gap-2 flex-shrink-0", titleBarBg)}>
              <button
                onClick={handleClose}
                className={clsx(
                  "flex items-center gap-0.5 pl-1 pr-3 py-1.5 rounded-lg text-sm font-medium active:opacity-60",
                  isDark ? "text-blue-400" : "text-blue-600"
                )}
                aria-label="Back to home screen"
              >
                <ChevronLeft size={20} />
                Home
              </button>
              <div className={clsx("flex-1 text-center text-sm font-medium truncate pr-16", isDark ? "text-white/80" : "text-black/70")}>
                {title}
              </div>
            </div>
          ) : (
            <div
              onPointerDown={(e) => dragControls.start(e)}
              onDoubleClick={handleMaximize}
              className={clsx(
                "h-10 flex items-center px-3 gap-3 cursor-default select-none flex-shrink-0",
                titleBarBg
              )}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2 no-drag">
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleClose}
                  className="traffic-btn traffic-close"
                  aria-label="Close"
                />
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleMinimize}
                  className="traffic-btn traffic-minimize"
                  aria-label="Minimize"
                />
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleMaximize}
                  className="traffic-btn traffic-maximize"
                  aria-label={win.isMaximized ? "Restore" : "Maximize"}
                />
              </div>

              {/* Title */}
              <div className="flex-1 flex items-center justify-center pointer-events-none">
                {titleBarContent ?? (
                  <span className={clsx(
                    "text-xs font-medium",
                    isDark ? "text-white/60" : "text-black/50"
                  )}>
                    {title}
                  </span>
                )}
              </div>

              {/* Right spacer (same width as traffic lights) */}
              <div className="w-[52px]" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
