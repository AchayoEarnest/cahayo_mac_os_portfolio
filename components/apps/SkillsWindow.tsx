"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Window } from "@/components/Window";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO } from "@/lib/portfolio";
import clsx from "clsx";

const SKILL_CATEGORIES = [
  { key: "programming",   label: "programming",   color: "#22c55e" },
  { key: "dataTools",     label: "data_tools",    color: "#3b82f6" },
  { key: "visualization", label: "visualization", color: "#a855f7" },
  { key: "databases",     label: "databases",     color: "#f59e0b" },
  { key: "systems",       label: "systems",       color: "#ec4899" },
  { key: "tools",         label: "dev_tools",     color: "#14b8a6" },
];

const PROMPT = "earnest@cahayo-os:~$ ";

const BOOT_LINES = [
  { text: "Cahayo OS v1.0 — Skills Terminal", color: "#a78bfa", delay: 0 },
  { text: `Welcome, ${PORTFOLIO.firstName}. Loading skill manifest...`, color: "#6b7280", delay: 400 },
  { text: "✓ Python, SQL, JavaScript modules loaded", color: "#22c55e", delay: 900 },
  { text: "✓ Power BI, Pandas, NumPy initialized", color: "#22c55e", delay: 1300 },
  { text: "✓ PostgreSQL, MySQL drivers ready", color: "#22c55e", delay: 1700 },
  { text: "Ready.", color: "#22c55e", delay: 2100 },
];

interface TermLine {
  text: string;
  color?: string;
  isPrompt?: boolean;
  isOutput?: boolean;
}

export function SkillsWindow() {
  const { isDark } = useWindowStore();
  const [lines, setLines] = useState<TermLine[]>([]);
  const [phase, setPhase] = useState<"boot" | "interactive">("boot");
  const [input, setInput] = useState("");
  const [currentCmd, setCurrentCmd] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new lines
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    BOOT_LINES.forEach(({ text, color, delay }) => {
      setTimeout(() => {
        if (cancelled) return;
        setLines((prev) => [...prev, { text, color }]);
      }, delay);
    });
    setTimeout(() => {
      if (cancelled) return;
      setPhase("interactive");
      typeCommand("ls --skills");
    }, 2600);
    return () => { cancelled = true; };
  }, []);

  const typeCommand = (cmd: string) => {
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCurrentCmd(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(interval);
        setTyping(false);
        setTimeout(() => {
          executeCommand(cmd);
          setCurrentCmd("");
        }, 200);
      }
    }, 60);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { text: PROMPT + cmd, isPrompt: true }]);

    if (trimmed === "ls --skills" || trimmed === "ls") {
      const output: TermLine[] = [
        { text: "Available skill categories:", color: "#6b7280" },
        ...SKILL_CATEGORIES.map((cat) => ({
          text: `  ${cat.label}`,
          color: cat.color,
        })),
        { text: "Run: cat <category> to view details", color: "#6b7280" },
      ];
      setLines((prev) => [...prev, ...output]);
    } else if (trimmed.startsWith("cat ")) {
      const catName = trimmed.slice(4).trim();
      const cat = SKILL_CATEGORIES.find((c) => c.label === catName || c.key === catName);
      if (cat) {
        const skills = PORTFOLIO.skills[cat.key as keyof typeof PORTFOLIO.skills] as string[];
        const out: TermLine[] = [
          { text: `# ${cat.label}`, color: cat.color },
          ...skills.map((skill) => ({
            text: `  → ${skill}`,
            color: "#e2e8f0",
          })),
        ];
        setLines((prev) => [...prev, ...out]);
      } else {
        setLines((prev) => [...prev, { text: `cat: ${catName}: No such file`, color: "#ef4444" }]);
      }
    } else if (trimmed === "whoami") {
      setLines((prev) => [...prev,
        { text: PORTFOLIO.name, color: "#a78bfa" },
        { text: PORTFOLIO.title, color: "#6b7280" },
      ]);
    } else if (trimmed === "clear") {
      setLines([]);
      return;
    } else if (trimmed === "help") {
      setLines((prev) => [...prev,
        { text: "Commands:", color: "#a78bfa" },
        { text: "  ls              - list skill categories", color: "#6b7280" },
        { text: "  cat <category>  - view skills in category", color: "#6b7280" },
        { text: "  whoami          - about me", color: "#6b7280" },
        { text: "  clear           - clear terminal", color: "#6b7280" },
      ]);
    } else if (trimmed !== "") {
      setLines((prev) => [...prev, { text: `bash: ${trimmed}: command not found. Try 'help'`, color: "#ef4444" }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  const TitleBar = (
    <div className="flex items-center gap-2">
      <span className="text-white/30 text-xs font-mono">bash</span>
      <span className="text-white/20 text-xs">—</span>
      <span className="text-white/50 text-xs font-mono">80×24</span>
    </div>
  );

  return (
    <Window id="skills" title="Terminal — Skills" width={720} height={500} variant="terminal" titleBarContent={TitleBar}>
      <div
        className="h-full flex flex-col bg-[#1a1a1a] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Output area */}
        <div className="flex-1 overflow-y-auto window-scroll p-4 font-mono text-[13px] leading-relaxed window-content">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{ color: line.isPrompt ? "#22c55e" : line.color ?? "#e2e8f0" }}>
                {line.text}
              </span>
              <br />
            </motion.div>
          ))}

          {/* Current typing line */}
          {phase === "interactive" && !typing && (
            <div className="flex items-center">
              <span className="text-green-400">{PROMPT}</span>
              <span className="text-white">{input}</span>
              <span className="terminal-cursor" />
            </div>
          )}
          {typing && (
            <div className="flex items-center">
              <span className="text-green-400">{PROMPT}</span>
              <span className="text-white">{currentCmd}</span>
              <span className="terminal-cursor" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Hidden input for keyboard capture */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute h-0 w-0"
          disabled={phase !== "interactive" || typing}
          aria-label="Terminal input"
        />

        {/* Status bar */}
        <div className="h-6 flex items-center px-4 gap-4 bg-[#252525] border-t border-white/5 flex-shrink-0">
          <span className="text-green-400 text-[10px] font-mono">●</span>
          <span className="text-white/30 text-[10px] font-mono">cahayo-os — bash</span>
          <span className="ml-auto text-white/20 text-[10px] font-mono">Type 'help' for commands</span>
        </div>
      </div>
    </Window>
  );
}
