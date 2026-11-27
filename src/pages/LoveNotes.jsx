import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import loveNotes from "../data/loveNotes";
import { pageTransition } from "../animations/variants";

const s = {
  header: { padding: "48px 20px 16px", textAlign: "center" },
  title: { fontSize: "clamp(1.6rem, 6vw, 2.2rem)", fontWeight: 700, marginBottom: 8 },
  sub: { fontSize: "0.85rem", color: "var(--text-muted)" },
  progress: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    padding: "12px 20px 24px",
    flexWrap: "wrap",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "all 0.3s",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "0 16px 32px",
  },
  card: {
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    cursor: "pointer",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
  },
  cardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  num: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF80AD, #B77AE8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: 700,
    flexShrink: 0,
  },
  reason: {
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "var(--accent-pink)",
  },
  chevron: {
    transition: "transform 0.3s",
    color: "var(--text-muted)",
    flexShrink: 0,
  },
  msgWrap: {
    overflow: "hidden",
  },
  msg: {
    padding: "0 16px 18px",
    fontSize: "0.85rem",
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    whiteSpace: "pre-line",
  },
  celebration: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(16,13,25,0.9)",
    backdropFilter: "blur(8px)",
    textAlign: "center",
    padding: 32,
  },
};

export default function LoveNotes() {
  const [expanded, setExpanded] = useState(new Set());
  const allRevealed = expanded.size === loveNotes.length;

  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <motion.div className="page-wrapper" {...pageTransition}>
      <header style={s.header}>
        <h1 style={s.title}><span className="gradient-text">10 Reasons I Love You</span></h1>
        <p style={s.sub}>Tap each card to discover</p>
      </header>

      <div style={s.progress}>
        {loveNotes.map((n) => (
          <div
            key={n.id}
            style={{
              ...s.dot,
              background: expanded.has(n.id) ? "#FF80AD" : "rgba(255,255,255,0.15)",
              transform: expanded.has(n.id) ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      <div style={s.list}>
        {loveNotes.map((note) => {
          const isOpen = expanded.has(note.id);
          return (
            <motion.div
              key={note.id}
              className="glass-card"
              style={s.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: note.id * 0.05 }}
              onClick={() => toggle(note.id)}
            >
              <img src={note.front} alt="" loading="lazy" style={s.cardImage} />

              <div style={s.cardHeader}>
                <div style={s.cardLeft}>
                  <div style={s.num}>
                    {isOpen ? <Heart size={14} fill="#fff" color="#fff" /> : note.id}
                  </div>
                  <span style={s.reason}>{note.reason}</span>
                </div>
                <ChevronDown
                  size={20}
                  style={{ ...s.chevron, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    style={s.msgWrap}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={s.msg}>{note.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            style={s.celebration}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(new Set())}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ fontSize: 64, marginBottom: 20 }}
            >
              💖
            </motion.div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>
              <span className="gradient-text">And a million more reasons…</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 300 }}>
              Every day I discover new reasons to love you. You are my everything.
            </p>
            <p style={{ marginTop: 24, fontSize: "0.75rem", color: "var(--text-muted)" }}>Tap anywhere to replay</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
