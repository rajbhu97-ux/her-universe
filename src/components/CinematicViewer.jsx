import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import birthdayConfig from "../data/birthdayConfig";
import chapters from "../data/chapters";

const slides = chapters.map((c) => ({ image: c.image, text: c.message }));

export default function CinematicViewer({ open, onClose }) {
  const [idx, setIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const slide = slides[idx];

  useEffect(() => {
    if (!open) return;
    setDisplayedText("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayedText(slide.text.slice(0, i));
      if (i >= slide.text.length) clearInterval(iv);
    }, 35);
    return () => clearInterval(iv);
  }, [idx, open, slide?.text]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setIdx((p) => (p + 1 < slides.length ? p + 1 : (onClose(), 0)));
    }, Math.max(slide.text.length * 35 + 2500, 5000));
    return () => clearTimeout(timer);
  }, [idx, open, slide?.text.length, onClose]);

  const handleClose = useCallback(() => {
    setIdx(0);
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200, background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <img src={slide.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: "relative", zIndex: 1, padding: "24px", textAlign: "center", maxWidth: 400,
      }}>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#fff", minHeight: 100 }}>
          {displayedText}
          <span style={{ animation: "typewriter-blink 0.8s infinite" }}>|</span>
        </p>
        <div style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          {idx + 1} / {slides.length}
        </div>
      </div>

      <button
        onClick={handleClose}
        style={{
          position: "absolute", top: 16, right: 16, zIndex: 2,
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", display: "flex",
          alignItems: "center", justifyContent: "center", color: "#fff",
        }}
        aria-label="Close cinematic mode"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
}
