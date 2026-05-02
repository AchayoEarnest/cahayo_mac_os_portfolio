"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useWindowStore, AppId } from "@/store/windowStore";
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
  const { windows, closeWindow, minimizeWindow, focusWindow, setPosition, isDark } = useWindowStore();
  const win = windows[id];
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleClose    = useCallback((e: React.MouseEvent) => { e.stopPropagation(); closeWindow(id); }, [closeWindow, id]);
  const handleMinimize = useCallback((e: React.MouseEvent) => { e.stopPropagation(); minimizeWindow(id); }, [minimizeWindow, id]);
  const handleMaximize = useCallback((e: React.MouseEvent) => { e.stopPropagation(); /* future: maximize */ }, []);
  const handleFocus    = useCallback(() => { if (!win.isFocused) focusWindow(id); }, [focusWindow, id, win.isFocused]);

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

  return (
    <AnimatePresence>
      {win.isOpen && !win.isMinimized && (
        <motion.div
          key={id}
          drag
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          onDragEnd={(_, info) => {
            setPosition(id, {
              x: win.position.x + info.offset.x,
              y: win.position.y + info.offset.y,
            });
          }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            position: "fixed",
            left: win.position.x,
            top: win.position.y,
            width,
            minWidth,
            height,
            minHeight,
            zIndex: win.zIndex,
          }}
          onMouseDown={handleFocus}
          className={clsx(
            "rounded-xl overflow-hidden flex flex-col",
            windowBg,
            shadowClass,
            win.isFocused ? "ring-0" : "opacity-95"
          )}
        >
          {/* Title bar */}
          <div
            onPointerDown={(e) => dragControls.start(e)}
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
                aria-label="Maximize"
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

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
