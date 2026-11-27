import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import memories, { categories } from "../data/memories";
import PhotoCard from "../components/PhotoCard";
import { pageTransition } from "../animations/variants";

const s = {
  header: { padding: "48px 20px 16px", textAlign: "center" },
  title: { fontSize: "clamp(1.6rem, 6vw, 2.2rem)", fontWeight: 700, marginBottom: 8 },
  sub: { fontSize: "0.85rem", color: "var(--text-muted)" },
  filters: {
    display: "flex",
    gap: 8,
    padding: "16px 20px",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  chip: {
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: "0.78rem",
    whiteSpace: "nowrap",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.2s",
    flexShrink: 0,
  },
  chipActive: {
    background: "linear-gradient(135deg, #FF80AD, #B77AE8)",
    color: "#fff",
    border: "1px solid transparent",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
    padding: "8px 16px",
  },
  gridItem: {
    breakInside: "avoid",
    marginBottom: 10,
    cursor: "pointer",
  },
  caption: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    padding: "6px 4px 0",
  },
  modal: {
    position: "fixed",
    inset: 0,
    zIndex: 150,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImg: {
    maxWidth: "92vw",
    maxHeight: "70vh",
    borderRadius: "var(--radius-lg)",
    objectFit: "contain",
  },
  modalCaption: {
    marginTop: 16,
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    textAlign: "center",
    padding: "0 24px",
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
};



export default function Memories() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "All" ? memories : memories.filter((m) => m.category === filter);

  const openModal = useCallback((id) => setSelected(id), []);
  const closeModal = useCallback(() => setSelected(null), []);

  const currentIdx = filtered.findIndex((m) => m.id === selected);
  const current = filtered[currentIdx];

  const navigate = useCallback(
    (dir) => {
      const next = currentIdx + dir;
      if (next >= 0 && next < filtered.length) setSelected(filtered[next].id);
    },
    [currentIdx, filtered]
  );

  return (
    <motion.div className="page-wrapper" {...pageTransition}>
      <header style={s.header}>
        <h1 style={s.title}><span className="gradient-text">Memories</span></h1>
        <p style={s.sub}>Our beautiful moments together</p>
      </header>

      {/* Filters */}
      <div style={s.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{ ...s.chip, ...(filter === cat ? s.chipActive : {}) }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div style={s.grid}>
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            style={s.gridItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            layout
          >
            <PhotoCard
              src={m.src}
              alt={m.caption}
              contain
              onClick={() => openModal(m.id)}
            />
            <p style={s.caption}>{m.caption}</p>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            style={s.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button style={s.closeBtn} onClick={closeModal} aria-label="Close">
              <X size={20} />
            </button>

            <motion.img
              key={current.id}
              src={current.src}
              alt={current.caption}
              style={s.modalImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p style={s.modalCaption}>{current.caption}</p>

            {currentIdx > 0 && (
              <button
                style={{ ...s.navBtn, left: 12 }}
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {currentIdx < filtered.length - 1 && (
              <button
                style={{ ...s.navBtn, right: 12 }}
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
