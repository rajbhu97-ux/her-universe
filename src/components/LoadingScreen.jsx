import { motion, AnimatePresence } from "framer-motion";

const s = {
  wrap: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "var(--bg-primary)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  heart: { fontSize: 48 },
  text: { fontSize: "1.1rem", color: "var(--text-secondary)", letterSpacing: 2 },
};

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={s.wrap}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            style={s.heart}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            💖
          </motion.div>
          <p style={s.text}>Preparing your surprise…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
