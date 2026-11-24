import { motion } from "framer-motion";

const base = {
  padding: "14px 32px",
  borderRadius: "var(--radius-xl)",
  background: "linear-gradient(135deg, #FF80AD, #B77AE8)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.95rem",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

export default function AnimatedButton({ children, onClick, style = {}, glow = true }) {
  return (
    <motion.button
      style={{ ...base, ...style }}
      className={glow ? "animate-glow" : ""}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
