"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/Window";
import { useWindowStore } from "@/store/windowStore";
import { PORTFOLIO } from "@/lib/portfolio";
import { Send, Inbox, Star, Trash2, Archive, PenSquare, Mail, Github, Linkedin, Phone } from "lucide-react";
import clsx from "clsx";

type View = "inbox" | "compose" | "sent";

const INBOX_ITEMS = [
  { from: "GitHub Notifications", subject: "New star on learnflow repository", time: "2m ago", read: false },
  { from: "LinkedIn", subject: "You have 3 new connection requests", time: "1h ago", read: false },
  { from: "ALX Africa", subject: "Data Science Specialization — Module 8 Complete", time: "3h ago", read: true },
  { from: "Center for Health Solutions", subject: "Q3 Dashboard Review Meeting", time: "Yesterday", read: true },
];

export function ContactWindow() {
  const { isDark } = useWindowStore();
  const [view, setView] = useState<View>("inbox");
  const [form, setForm] = useState({ from: "", subject: "", body: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sidebarBg = isDark ? "bg-[#252528] border-r border-white/6" : "bg-[#f5f5f5] border-r border-black/6";
  const mainBg = isDark ? "bg-[#1e1e20]" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/50" : "text-gray-500";
  const borderColor = isDark ? "border-white/6" : "border-black/6";
  const inputStyle = isDark
    ? "bg-white/5 border-white/8 text-white placeholder:text-white/25 focus:border-blue-500/50 focus:bg-white/8"
    : "bg-gray-50 border-black/8 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white";

  const handleSend = () => {
    if (!form.from || !form.body) return;
    setSending(true);

    const subject = form.subject || `Portfolio message from ${form.from}`;
    const body = `${form.body}\n\n— Reply to: ${form.from}`;
    const mailtoUrl = `mailto:${PORTFOLIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setSending(false);
      setSent(true);
      setForm({ from: "", subject: "", body: "" });
      setTimeout(() => setSent(false), 4000);
    }, 500);
  };

  const SIDEBAR_ITEMS = [
    { icon: Inbox,   label: "Inbox",  view: "inbox" as View,   count: 2 },
    { icon: PenSquare, label: "Compose", view: "compose" as View, count: 0 },
    { icon: Star,    label: "Starred", view: "sent" as View,   count: 0 },
    { icon: Archive, label: "Archive", view: "sent" as View,   count: 0 },
    { icon: Trash2,  label: "Trash",  view: "sent" as View,    count: 0 },
  ];

  return (
    <Window id="contact" title="Mail — Contact Earnest" width={820} height={560} variant="mail">
      <div className="flex h-full">
        {/* Mail sidebar */}
        <div className={clsx("w-44 flex-shrink-0 py-3 flex flex-col gap-0.5", sidebarBg)}>
          {/* Account */}
          <div className="px-3 py-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mb-2">
              EA
            </div>
            <p className={clsx("text-xs font-semibold truncate", textPrimary)}>{PORTFOLIO.firstName}</p>
            <p className={clsx("text-[10px] truncate", textMuted)}>{PORTFOLIO.email}</p>
          </div>

          <div className={clsx("mx-3 border-t mb-2", borderColor)} />

          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={clsx(
                "finder-sidebar-item mx-2 justify-between",
                view === item.view
                  ? isDark ? "bg-blue-600/80 text-white" : "bg-blue-500 text-white"
                  : isDark ? "text-white/75 hover:bg-white/8" : "text-gray-700 hover:bg-black/5"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon size={13} />
                <span>{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={clsx(
                  "text-[10px] font-bold rounded-full px-1.5 min-w-[18px] text-center",
                  view === item.view ? "bg-white text-blue-600" : "bg-red-500 text-white"
                )}>
                  {item.count}
                </span>
              )}
            </button>
          ))}

          {/* Social links */}
          <div className={clsx("mx-3 border-t mt-2 pt-3", borderColor)}>
            <p className={clsx("text-[10px] font-semibold uppercase tracking-wider mb-2 px-1", textMuted)}>Connect</p>
            <a href={PORTFOLIO.github} target="_blank" rel="noopener noreferrer"
              className={clsx("finder-sidebar-item", isDark ? "text-white/60 hover:bg-white/8" : "text-gray-600 hover:bg-black/5")}>
              <Github size={12} /> <span className="text-[12px]">GitHub</span>
            </a>
            <a href={PORTFOLIO.linkedin} target="_blank" rel="noopener noreferrer"
              className={clsx("finder-sidebar-item", isDark ? "text-white/60 hover:bg-white/8" : "text-gray-600 hover:bg-black/5")}>
              <Linkedin size={12} /> <span className="text-[12px]">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className={clsx("flex-1 overflow-hidden flex flex-col", mainBg)}>
          <AnimatePresence mode="wait">
            {view === "inbox" && (
              <motion.div key="inbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className={clsx("flex items-center gap-2 px-4 py-2 border-b flex-shrink-0", borderColor)}>
                  <span className={clsx("text-sm font-semibold", textPrimary)}>Inbox</span>
                  <span className={clsx("text-xs ml-auto", textMuted)}>4 messages</span>
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto window-scroll divide-y window-content"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  {INBOX_ITEMS.map((msg, i) => (
                    <motion.div
                      key={msg.subject}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={clsx(
                        "flex items-start gap-3 px-4 py-3 cursor-default hover:transition-colors",
                        !msg.read ? (isDark ? "bg-blue-500/8" : "bg-blue-50") : "",
                        isDark ? "hover:bg-white/4" : "hover:bg-gray-50"
                      )}
                    >
                      <div className={clsx("w-2 h-2 rounded-full mt-2 flex-shrink-0", !msg.read ? "bg-blue-500" : "bg-transparent")} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={clsx("text-[13px] font-semibold truncate", textPrimary, !msg.read ? "font-bold" : "")}>
                            {msg.from}
                          </span>
                          <span className={clsx("text-[10px] flex-shrink-0 ml-2", textMuted)}>{msg.time}</span>
                        </div>
                        <p className={clsx("text-xs truncate mt-0.5", !msg.read ? (isDark ? "text-white/80" : "text-gray-700") : textMuted)}>
                          {msg.subject}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact info bar */}
                <div className={clsx("p-4 border-t flex items-center gap-4", borderColor)}>
                  <div className="flex items-center gap-2 text-xs">
                    <Mail size={12} className="text-blue-400" />
                    <a href={`mailto:${PORTFOLIO.email}`} className="text-blue-400 hover:underline">{PORTFOLIO.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone size={12} className="text-green-400" />
                    <span className={textMuted}>{PORTFOLIO.phone[0]}</span>
                  </div>
                  <button onClick={() => setView("compose")}
                    className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <PenSquare size={12} /> New Message
                  </button>
                </div>
              </motion.div>
            )}

            {view === "compose" && (
              <motion.div key="compose" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                {/* Compose toolbar */}
                <div className={clsx("flex items-center px-4 py-2 border-b flex-shrink-0", borderColor)}>
                  <span className={clsx("text-sm font-semibold", textPrimary)}>New Message</span>
                  <button onClick={() => setView("inbox")} className={clsx("ml-auto text-xs", textMuted, "hover:opacity-70")}>✕</button>
                </div>

                <div className="flex-1 flex flex-col p-4 gap-3 window-content overflow-y-auto window-scroll">
                  {/* To field */}
                  <div className={clsx("flex items-center gap-2 pb-2 border-b", borderColor)}>
                    <span className={clsx("text-xs font-medium w-12 flex-shrink-0", textMuted)}>To:</span>
                    <span className="text-xs text-blue-400">{PORTFOLIO.email}</span>
                  </div>

                  {/* From */}
                  <div className={clsx("flex items-center gap-2 pb-2 border-b", borderColor)}>
                    <span className={clsx("text-xs font-medium w-12 flex-shrink-0", textMuted)}>From:</span>
                    <input
                      type="email"
                      value={form.from}
                      onChange={(e) => setForm({ ...form, from: e.target.value })}
                      placeholder="your@email.com"
                      className={clsx("flex-1 text-xs bg-transparent outline-none", textPrimary, "placeholder:opacity-40")}
                    />
                  </div>

                  {/* Subject */}
                  <div className={clsx("flex items-center gap-2 pb-2 border-b", borderColor)}>
                    <span className={clsx("text-xs font-medium w-12 flex-shrink-0", textMuted)}>Subject:</span>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Let's connect..."
                      className={clsx("flex-1 text-xs bg-transparent outline-none", textPrimary, "placeholder:opacity-40")}
                    />
                  </div>

                  {/* Body */}
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    placeholder={`Hi Earnest,\n\nI'd love to discuss...`}
                    className={clsx("flex-1 resize-none text-sm bg-transparent outline-none leading-relaxed min-h-32", textPrimary, "placeholder:opacity-30")}
                    rows={8}
                  />
                </div>

                {/* Send bar */}
                <div className={clsx("p-3 border-t flex items-center gap-3 flex-shrink-0", borderColor)}>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckSendIcon /> Opening your email client…
                      </motion.div>
                    ) : (
                      <motion.button key="send" onClick={handleSend} disabled={sending || !form.from || !form.body}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                        {sending ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                            <Send size={14} />
                          </motion.div>
                        ) : <Send size={14} />}
                        {sending ? "Preparing..." : "Send"}
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span className={clsx("text-xs ml-auto", textMuted)}>
                    {form.body.length} chars
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}

function CheckSendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
