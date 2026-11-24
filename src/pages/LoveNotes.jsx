import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
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
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "all 0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 14,
    padding: "0 16px 32px",
  },
  cardWrap: {
    perspective: 800,
    cursor: "pointer",
  },
  cardInner: {
    position: "relative",
    width: "100%",
    paddingBottom: "130%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  face: {
    position: "absolute",
    inset: 0,
    borderRadius: "var(--radius-lg)",
    backfaceVisibility: "hidden",
    overflow: "hidden",
  },
  front: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  frontOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(16,13,25,0.85) 0%, transparent 60%)",
  },
  frontContent: {
    position: "relative",
    zIndex: 1,
    padding: "16px 12px",
    textAlign: "center",
    width: "100%",
  },
  num: {
    fontSize: "1.6rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #FF80AD, #B77AE8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  tap: {
    fontSize: "0.65rem",
    color: "var(--text-muted)",
    marginTop: 4,
  },
  back: {
    background: "linear-gradient(135deg, #1a1228, #231a33)",
    border: "1px solid rgba(255,128,173,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    textAlign: "center",
    transform: "rotateY(180deg)",
  },
  reason: {
    fontSize: "0.95rem",
    fontWeight: 600,
    marginBottom: 10,
    color: "var(--accent-pink)",
  },
  msg: {
    fontSize: "0.78rem",
    lineHeight: 1.6,
    color: "var(--text-secondary)",
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
  const [flipped, setFlipped] = useState(new Set());
  const allRevealed = flipped.size === loveNotes.length;

  const toggle = (id) => {
    setFlipped((prev) => {
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

      {/* Progress */}
      <div style={s.progress}>
        {loveNotes.map((n) => (
          <div
            key={n.id}
            style={{
              ...s.dot,
              background: flipped.has(n.id) ? "#FF80AD" : "rgba(255,255,255,0.15)",
              transform: flipped.has(n.id) ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Cards Grid */}
      <div style={s.grid}>
        {loveNotes.map((note) => {
          const isFlipped = flipped.has(note.id);
          return (
            <motion.div
              key={note.id}
              style={s.cardWrap}
              onClick={() => toggle(note.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: note.id * 0.05 }}
            >
              <div style={{ ...s.cardInner, transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)" }}>
                {/* Front */}
                <div style={{ ...s.face, ...s.front }}>
                  <img src={note.front} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={s.frontOverlay} />
                  <div style={s.frontContent}>
                    <Heart size={16} color="#FF80AD" fill="#FF80AD" style={{ marginBottom: 4 }} />
                    <div style={s.num}>#{note.id}</div>
                    <div style={s.tap}>Tap to discover</div>
                  </div>
                </div>
                {/* Back */}
                <div style={{ ...s.face, ...s.back }}>
                  <Heart size={20} color="#FF80AD" fill="#FF80AD" style={{ marginBottom: 12 }} />
                  <div style={s.reason}>{note.reason}</div>
                  <p style={s.msg}>{note.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All Revealed Celebration */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            style={s.celebration}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlipped(new Set())}
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
