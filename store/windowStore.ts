"use client";

import { create } from "zustand";

export type AppId = "about" | "projects" | "skills" | "experience" | "contact";

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  zIndex: number;
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  topZIndex: number;
  isDark: boolean;
  bootComplete: boolean;

  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  setPosition: (id: AppId, position: { x: number; y: number }) => void;
  toggleTheme: () => void;
  setBootComplete: () => void;
}

const DEFAULT_POSITIONS: Record<AppId, { x: number; y: number }> = {
  about:      { x: 80,  y: 60  },
  projects:   { x: 120, y: 80  },
  skills:     { x: 160, y: 100 },
  experience: { x: 200, y: 70  },
  contact:    { x: 240, y: 90  },
};

const makeWindow = (id: AppId, zIndex: number): WindowState => ({
  id,
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  isFocused: false,
  position: DEFAULT_POSITIONS[id],
  zIndex,
});

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {
    about:      makeWindow("about", 10),
    projects:   makeWindow("projects", 11),
    skills:     makeWindow("skills", 12),
    experience: makeWindow("experience", 13),
    contact:    makeWindow("contact", 14),
  },
  topZIndex: 20,
  isDark: true,
  bootComplete: false,

  openWindow: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((state) => ({
      topZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          isFocused: true,
          zIndex: newZ,
        },
        // unfocus others
        ...Object.fromEntries(
          (Object.keys(state.windows) as AppId[])
            .filter((k) => k !== id)
            .map((k) => [k, { ...state.windows[k], isFocused: false }])
        ),
      },
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false, isMinimized: false, isMaximized: false, isFocused: false },
      },
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true, isFocused: false },
      },
    }));
  },

  focusWindow: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((state) => ({
      topZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isFocused: true, zIndex: newZ },
        ...Object.fromEntries(
          (Object.keys(state.windows) as AppId[])
            .filter((k) => k !== id)
            .map((k) => [k, { ...state.windows[k], isFocused: false }])
        ),
      },
    }));
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    }));
  },

  setPosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    }));
  },

  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

  setBootComplete: () => set({ bootComplete: true }),
}));
