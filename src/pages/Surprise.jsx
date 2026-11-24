import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import birthdayConfig from "../data/birthdayConfig";
import PhotoCard from "../components/PhotoCard";
import AnimatedButton from "../components/AnimatedButton";
import { pageTransition } from "../animations/variants";

const s = {
  wrap: {
    minHeight: "calc(100dvh - 80px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px 32px",
    textAlign: "center",
  },
  preTitle: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  title: {
    fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
    fontWeight: 700,
    marginBottom: 8,
  },
  sub: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    marginBottom: 40,
    maxWidth: 280,
  },
  giftBox: {
    width: 140,
    height: 140,
    borderRadius: 28,
    background: "linear-gradient(135deg, #FF80AD, #B77AE8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    marginBottom: 32,
  },
  ribbon: {
    position: "absolute",
    width: "100%",
    height: 4,
    background: "rgba(255,255,255,0.4)",
    top: "50%",
    transform: "translateY(-50%)",
  },
  ribbonV: {
    position: "absolute",
    width: 4,
    height: "100%",
    background: "rgba(255,255,255,0.4)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  revealed: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  photo: {
    width: "100%",
    height: 300,
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },
  letter: {
    width: "100%",
    padding: 24,
    textAlign: "left",
  },
  letterText: {
    fontSize: "0.9rem",
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    whiteSpace: "pre-line",
  },
};

function fireConfetti() {
  const defaults = { origin: { y: 0.7 }, zIndex: 200 };
  confetti({ ...defaults, particleCount: 80, spread: 70, startVelocity: 40 });
  setTimeout(() => confetti({ ...defaults, particleCount: 50, spread: 100, startVelocity: 30 }), 300);
}

export default function Surprise() {
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
    fireConfetti();
  }, []);

  const replay = useCallback(() => setOpened(false), []);

  return (
    <motion.div className="page-wrapper" {...pageTransition}>
      <div style={s.wrap}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -40 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <p style={s.preTitle}>✨ A Special Moment</p>
              <h1 style={s.title}>
                <span className="gradient-text">Something special is waiting for you</span>
              </h1>
              <p style={s.sub}>Tap the gift to unwrap your surprise</p>

              <motion.div
                style={s.giftBox}
                className="animate-glow"
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={open}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
              >
                <div style={s.ribbon} />
                <div style={s.ribbonV} />
                <Gift size={48} color="#fff" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              style={s.revealed}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                style={{ fontSize: 48, marginBottom: 8 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: 3, duration: 0.6 }}
              >
                🎉
              </motion.div>

              <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                <span className="gradient-text">Happy Birthday, {birthdayConfig.wifeName}!</span>
              </h2>

              <PhotoCard
                src={birthdayConfig.images.surprise}
                alt="Birthday surprise"
                style={s.photo}
              />

              <div className="glass-card" style={s.letter}>
                <p style={s.letterText}>{birthdayConfig.surpriseLetter}</p>
              </div>

              <AnimatedButton onClick={replay} glow={false} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <RotateCcw size={16} /> Experience Again
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
