"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/Window";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO } from "@/lib/portfolio";
import { ChevronLeft, ChevronRight, RotateCw, Lock, ExternalLink, Github } from "lucide-react";
import clsx from "clsx";

const FAKE_URL = "https://cahayo.dev/projects";

export function ProjectsWindow() {
  const { isDark } = useWindowStore();
  const [selected, setSelected] = useState<number | null>(null);
  const [urlBar] = useState(FAKE_URL);
  const projects = PORTFOLIO.projects;

  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/50" : "text-gray-500";
  const toolbarBg = isDark ? "bg-[#2d2d30] border-b border-white/6" : "bg-[#ececec] border-b border-black/6";
  const urlBg = isDark ? "bg-[#1a1a1c] text-white/80" : "bg-white text-gray-700";
  const cardHover = isDark ? "hover:bg-white/8 border-white/6" : "hover:bg-gray-100 border-black/6";

  const TitleBar = (
    <div className="flex items-center gap-2 text-xs">
      <Lock size={10} className={textMuted} />
      <span className={clsx("font-mono text-[11px]", textMuted)}>{urlBar}</span>
    </div>
  );

  return (
    <Window id="projects" title="Projects" width={860} height={580} variant="browser" titleBarContent={TitleBar}>
      <div className="flex flex-col h-full">
        {/* Browser toolbar */}
        <div className={clsx("flex items-center gap-2 px-3 py-2 flex-shrink-0", toolbarBg)}>
          <button className={clsx("p-1 rounded hover:bg-white/10 transition-colors", textMuted)}>
            <ChevronLeft size={14} />
          </button>
          <button className={clsx("p-1 rounded hover:bg-white/10 transition-colors", textMuted)}>
            <ChevronRight size={14} />
          </button>
          <button className={clsx("p-1 rounded hover:bg-white/10 transition-colors", textMuted)}>
            <RotateCw size={14} />
          </button>

          {/* URL bar */}
          <div className={clsx("flex-1 flex items-center gap-2 px-3 py-1 rounded-md text-xs mx-2", urlBg)}>
            <Lock size={11} className={textMuted} />
            <span className="font-mono">{urlBar}</span>
          </div>
        </div>

        {/* Tab bar */}
        <div className={clsx("flex items-end gap-1 px-3 pt-1.5", toolbarBg)}>
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setSelected(i)}
              className={clsx(
                "px-3 py-1.5 text-xs rounded-t-lg border border-b-0 transition-colors max-w-32 truncate",
                selected === i
                  ? isDark
                    ? "bg-[#1e1e20] border-white/8 text-white"
                    : "bg-white border-black/8 text-gray-900"
                  : isDark
                    ? "border-transparent text-white/40 hover:text-white/70"
                    : "border-transparent text-gray-400 hover:text-gray-700"
              )}
            >
              {p.icon} {p.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={clsx("flex-1 overflow-hidden", isDark ? "bg-[#1e1e20]" : "bg-white")}>
          <AnimatePresence mode="wait">
            {selected === null ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full overflow-y-auto window-scroll window-content p-6"
              >
                <div className="mb-6">
                  <h2 className={clsx("text-xl font-bold", textPrimary)}>Portfolio Projects</h2>
                  <p className={clsx("text-sm mt-1", textMuted)}>Click a project to view details</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setSelected(i)}
                      className={clsx(
                        "text-left p-5 rounded-xl border transition-all group cursor-pointer",
                        isDark ? "bg-white/3 border-white/6 hover:border-white/15 hover:bg-white/6" : "bg-gray-50 border-black/6 hover:border-black/12 hover:bg-white"
                      )}
                    >
                      {/* Color accent + icon */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}>
                          {project.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={clsx("font-semibold text-sm truncate", textPrimary)}>{project.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {project.tools.slice(0, 2).map(t => (
                              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{ background: `${project.color}20`, color: project.color }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className={clsx("text-xs leading-relaxed line-clamp-3", textMuted)}>
                        {project.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`detail-${selected}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full overflow-y-auto window-scroll window-content p-6"
              >
                <button
                  onClick={() => setSelected(null)}
                  className={clsx("flex items-center gap-1 text-xs mb-6 hover:opacity-70 transition-opacity", textMuted)}
                >
                  <ChevronLeft size={14} /> Back to Projects
                </button>

                {(() => {
                  const p = projects[selected];
                  return (
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{ background: `${p.color}20`, border: `1px solid ${p.color}40` }}>
                          {p.icon}
                        </div>
                        <div>
                          <h1 className={clsx("text-2xl font-bold", textPrimary)}>{p.title}</h1>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {p.tools.map(t => (
                              <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                                style={{ background: `${p.color}20`, color: p.color }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={clsx("p-5 rounded-xl mb-4", isDark ? "bg-white/5 border border-white/8" : "bg-gray-50 border border-black/6")}>
                        <h3 className={clsx("text-sm font-semibold mb-2", textPrimary)}>Description</h3>
                        <p className={clsx("text-sm leading-relaxed", textMuted)}>{p.description}</p>
                      </div>

                      {/* Mock stats for visual richness */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                          { label: "Status", value: "Completed" },
                          { label: "Type", value: "Data Project" },
                          { label: "Impact", value: "High" },
                        ].map((s) => (
                          <div key={s.label} className={clsx("p-3 rounded-xl text-center", isDark ? "bg-white/4" : "bg-gray-50")}>
                            <div className={clsx("text-xs font-semibold", textPrimary)}>{s.value}</div>
                            <div className={clsx("text-xs mt-0.5", textMuted)}>{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
                        style={{ background: p.color }}>
                        <Github size={15} /> View on GitHub <ExternalLink size={12} />
                      </a>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}
