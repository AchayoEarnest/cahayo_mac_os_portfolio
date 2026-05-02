"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/Window";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO } from "@/lib/portfolio";
import { Search, CheckCircle2, Calendar, MapPin } from "lucide-react";
import clsx from "clsx";

export function ExperienceWindow() {
  const { isDark } = useWindowStore();
  const [selected, setSelected] = useState(0);
  const experiences = PORTFOLIO.experience;

  const sidebarBg = isDark ? "bg-[#252528]" : "bg-[#f5f5f0]";
  const mainBg = isDark ? "bg-[#1e1e20]" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/50" : "text-gray-500";
  const divider = isDark ? "divide-white/6" : "divide-black/6";
  const borderColor = isDark ? "border-white/6" : "border-black/6";

  const exp = experiences[selected];

  return (
    <Window id="experience" title="Notes — Experience" width={800} height={540} variant="notes">
      <div className="flex h-full">
        {/* Notes list sidebar */}
        <div className={clsx("w-56 flex-shrink-0 flex flex-col border-r", sidebarBg, borderColor)}>
          {/* Search */}
          <div className="p-3">
            <div className={clsx(
              "flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs",
              isDark ? "bg-white/8 text-white/40" : "bg-black/6 text-gray-400"
            )}>
              <Search size={11} />
              <span>Search</span>
            </div>
          </div>

          {/* Notes list */}
          <div className={clsx("flex-1 overflow-y-auto divide-y window-scroll", divider)}>
            {experiences.map((e, i) => (
              <button
                key={e.company}
                onClick={() => setSelected(i)}
                className={clsx(
                  "w-full text-left p-4 transition-colors",
                  selected === i
                    ? isDark ? "bg-yellow-500/15" : "bg-yellow-400/20"
                    : isDark ? "hover:bg-white/5" : "hover:bg-black/4"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: e.color }} />
                  <span className={clsx("text-xs font-semibold truncate", textPrimary)}>{e.position}</span>
                </div>
                <p className={clsx("text-[11px] truncate", textMuted)}>{e.company}</p>
                <p className={clsx("text-[10px] mt-1 truncate font-mono", textMuted)}>{e.period}</p>
              </button>
            ))}
          </div>

          {/* Bottom count */}
          <div className={clsx("p-2 text-center text-[10px]", textMuted, borderColor, "border-t")}>
            {experiences.length} Notes
          </div>
        </div>

        {/* Note content */}
        <div className={clsx("flex-1 overflow-hidden", mainBg)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto window-scroll window-content p-8"
            >
              {/* Date at top (Notes style) */}
              <div className={clsx("text-center mb-6", textMuted)}>
                <p className="text-xs">{exp.period}</p>
              </div>

              {/* Title */}
              <h1 className={clsx("text-2xl font-bold text-center mb-1", textPrimary)}>
                {exp.position}
              </h1>

              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-sm font-medium" style={{ color: exp.color }}>
                  {exp.company}
                </span>
                <span className={textMuted}>·</span>
                <div className={clsx("flex items-center gap-1 text-sm", textMuted)}>
                  <MapPin size={12} />
                  {exp.location}
                </div>
              </div>

              {/* Divider — notes-style ruled lines */}
              <div className={clsx("border-t mb-6", borderColor)} />

              {/* Color band timeline */}
              <div className="flex items-center gap-3 mb-6 p-3 rounded-xl"
                style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}25` }}>
                <Calendar size={14} style={{ color: exp.color }} />
                <span className="text-sm font-mono" style={{ color: exp.color }}>{exp.period}</span>
              </div>

              {/* Achievements — handwritten note style */}
              <div className="space-y-3">
                <h3 className={clsx("text-xs font-semibold uppercase tracking-wider mb-3", textMuted)}>
                  Key Achievements
                </h3>
                {exp.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                    <p className={clsx("text-sm leading-relaxed", textPrimary)}>{achievement}</p>
                  </motion.div>
                ))}
              </div>

              {/* Ruled lines background (Notes aesthetic) */}
              <div className={clsx("mt-8 pt-6 border-t", borderColor)}>
                <p className={clsx("text-xs italic", textMuted)}>
                  — Earnest Odhiambo Achayo · {PORTFOLIO.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}
