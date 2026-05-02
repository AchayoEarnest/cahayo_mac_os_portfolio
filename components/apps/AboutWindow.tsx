"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Window } from "@/components/Window";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO } from "@/lib/portfolio";
import { Github, Linkedin, Mail, MapPin, Download, ChevronRight } from "lucide-react";
import clsx from "clsx";

const SIDEBAR_ITEMS = [
  { icon: "⭐", label: "Favorites", section: "overview", color: "#FFD60A" },
  { icon: "📁", label: "Desktop",   section: "overview", color: "#007AFF" },
  { icon: "📄", label: "Summary",   section: "summary",  color: "#34C759" },
  { icon: "🎓", label: "Education", section: "education", color: "#FF9F0A" },
  { icon: "🏆", label: "Certs",     section: "certs",    color: "#BF5AF2" },
];

type Section = "overview" | "summary" | "education" | "certs";

export function AboutWindow() {
  const { isDark } = useWindowStore();
  const [section, setSection] = useState<Section>("overview");
  const p = PORTFOLIO;

  const sidebarBg = isDark ? "bg-[#252528] border-r border-white/6" : "bg-[#f0f0f0] border-r border-black/8";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/50" : "text-gray-500";

  return (
    <Window id="about" title="About — Earnest Achayo" width={780} height={520} variant="finder">
      <div className="flex h-full">
        {/* Finder sidebar */}
        <div className={clsx("w-44 flex-shrink-0 py-3 flex flex-col gap-0.5", sidebarBg)}>
          <p className={clsx("text-[10px] font-semibold uppercase tracking-wider px-3 mb-1", textMuted)}>
            Favorites
          </p>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setSection(item.section as Section)}
              className={clsx(
                "finder-sidebar-item w-full text-left",
                section === item.section
                  ? isDark ? "bg-blue-600/80 text-white" : "bg-blue-500 text-white"
                  : isDark ? "text-white/75 hover:bg-white/8" : "text-gray-700 hover:bg-black/6"
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[13px]">{item.label}</span>
            </button>
          ))}

          {/* Locations */}
          <p className={clsx("text-[10px] font-semibold uppercase tracking-wider px-3 mt-4 mb-1", textMuted)}>
            Locations
          </p>
          {["GitHub", "LinkedIn", "Email"].map((loc) => (
            <button key={loc} className={clsx(
              "finder-sidebar-item w-full text-left",
              isDark ? "text-white/60 hover:bg-white/8" : "text-gray-600 hover:bg-black/6"
            )}>
              <span className="text-base">{loc === "GitHub" ? "🐙" : loc === "LinkedIn" ? "💼" : "✉️"}</span>
              <span className="text-[13px]">{loc}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className={clsx("flex-1 overflow-y-auto window-scroll", isDark ? "bg-[#1e1e20]" : "bg-white")}>
          {section === "overview" && <OverviewSection isDark={isDark} p={p} />}
          {section === "summary" && <SummarySection isDark={isDark} p={p} />}
          {section === "education" && <EducationSection isDark={isDark} p={p} />}
          {section === "certs" && <CertsSection isDark={isDark} p={p} />}
        </div>
      </div>
    </Window>
  );
}

function OverviewSection({ isDark, p }: { isDark: boolean; p: typeof PORTFOLIO }) {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/55" : "text-gray-500";
  const cardBg = isDark ? "bg-white/5 border border-white/8" : "bg-gray-50 border border-black/6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 window-content"
    >
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative flex-shrink-0">
          <img
            src={p.avatar}
            alt={p.name}
            className="w-24 h-24 rounded-2xl object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&size=96&background=6366f1&color=fff&bold=true`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1e1e20] flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className={clsx("text-2xl font-bold tracking-tight", textPrimary)}>{p.name}</h1>
          <p className="text-blue-400 font-medium mt-1">{p.title}</p>
          <div className={clsx("flex items-center gap-1.5 mt-2 text-sm", textMuted)}>
            <MapPin size={13} />
            <span>{p.location}</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 mt-3">
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/80 transition-colors">
              <Github size={12} /> GitHub
            </a>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 transition-colors">
              <Linkedin size={12} /> LinkedIn
            </a>
            <a href={`mailto:${p.email}`}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-green-600/30 hover:bg-green-600/50 text-green-300 transition-colors">
              <Mail size={12} /> Email
            </a>
            <a href={p.cvLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 transition-colors">
              <Download size={12} /> CV
            </a>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {p.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={clsx("rounded-xl p-4 text-center", cardBg)}
          >
            <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
            <div className={clsx("text-xs mt-1", textMuted)}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className={clsx("rounded-xl p-5", cardBg)}>
        <h3 className={clsx("text-sm font-semibold mb-2", textPrimary)}>About</h3>
        <p className={clsx("text-sm leading-relaxed", textMuted)}>{p.summary}</p>
      </div>
    </motion.div>
  );
}

function SummarySection({ isDark, p }: { isDark: boolean; p: typeof PORTFOLIO }) {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/55" : "text-gray-500";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 window-content">
      <h2 className={clsx("text-lg font-bold mb-6", textPrimary)}>Professional Summary</h2>
      <div className={clsx("p-5 rounded-xl border", isDark ? "border-white/8 bg-white/4" : "border-black/6 bg-gray-50")}>
        <p className={clsx("text-sm leading-7", textMuted)}>{p.summary}</p>
      </div>

      <h3 className={clsx("text-base font-semibold mt-8 mb-4", textPrimary)}>Key Achievements</h3>
      <div className="space-y-3">
        {p.stats.map((stat) => (
          <div key={stat.label} className={clsx("flex items-center gap-3 p-3 rounded-lg", isDark ? "bg-white/4" : "bg-gray-50")}>
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-sm">
              {stat.value}
            </div>
            <span className={clsx("text-sm", textPrimary)}>{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EducationSection({ isDark, p }: { isDark: boolean; p: typeof PORTFOLIO }) {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/55" : "text-gray-500";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 window-content">
      <h2 className={clsx("text-lg font-bold mb-6", textPrimary)}>Education</h2>
      <div className="space-y-4">
        {p.education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={clsx("flex items-start gap-4 p-4 rounded-xl", isDark ? "bg-white/5 border border-white/8" : "bg-gray-50 border border-black/6")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl flex-shrink-0">
              🎓
            </div>
            <div>
              <p className={clsx("font-semibold text-sm", textPrimary)}>{edu.degree}</p>
              <p className="text-blue-400 text-xs mt-0.5">{edu.school}</p>
              <p className={clsx("text-xs mt-1", textMuted)}>{edu.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CertsSection({ isDark, p }: { isDark: boolean; p: typeof PORTFOLIO }) {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/55" : "text-gray-500";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 window-content">
      <h2 className={clsx("text-lg font-bold mb-6", textPrimary)}>Certifications</h2>
      <div className="grid grid-cols-2 gap-4">
        {p.certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={clsx("p-4 rounded-xl", isDark ? "bg-white/5 border border-white/8" : "bg-gray-50 border border-black/6")}
          >
            <div className="text-2xl mb-2">🏆</div>
            <p className={clsx("font-semibold text-sm", textPrimary)}>{cert.name}</p>
            <p className="text-purple-400 text-xs mt-1">{cert.issuer}</p>
            <p className={clsx("text-xs mt-1", textMuted)}>{cert.year}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
