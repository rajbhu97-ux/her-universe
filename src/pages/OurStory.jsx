import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import chapters from "../data/chapters";
import PhotoCard from "../components/PhotoCard";
import { pageTransition, slideUp } from "../animations/variants";

const s = {
  header: {
    padding: "48px 24px 24px",
    textAlign: "center",
  },
  title: {
    fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
    fontWeight: 700,
    marginBottom: 8,
  },
  sub: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
  },
  timeline: {
    position: "relative",
    padding: "24px 20px 40px",
  },
  line: {
    position: "absolute",
    left: 30,
    top: 0,
    bottom: 0,
    width: 2,
    background: "linear-gradient(to bottom, transparent, var(--accent-pink), var(--accent-violet), transparent)",
  },
  chapter: {
    position: "relative",
    paddingLeft: 52,
    marginBottom: 40,
  },
  dot: {
    position: "absolute",
    left: 23,
    top: 8,
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "var(--gradient-pink)",
    border: "3px solid var(--bg-primary)",
    zIndex: 1,
  },
  card: {
    padding: 0,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
    overflow: "hidden",
  },
  content: {
    padding: "16px 18px 20px",
  },
  chTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: 8,
  },
  meta: {
    display: "flex",
    gap: 16,
    marginBottom: 12,
    fontSize: "0.75rem",
    color: "var(--text-muted)",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  msg: {
    fontSize: "0.88rem",
    lineHeight: 1.7,
    color: "var(--text-secondary)",
  },
};

export default function OurStory() {
  return (
    <motion.div className="page-wrapper" {...pageTransition}>
      <header style={s.header}>
        <h1 style={s.title}><span className="gradient-text">Our Story</span></h1>
        <p style={s.sub}>Every chapter written with love</p>
      </header>

      <div style={s.timeline}>
        <div style={s.line} />
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.id}
            style={s.chapter}
            {...slideUp}
            whileInView={{ ...slideUp.whileInView, transition: { ...slideUp.whileInView.transition, delay: i * 0.05 } }}
            viewport={slideUp.viewport}
          >
            <div style={s.dot} />
            <div className="glass-card" style={s.card}>
              <PhotoCard src={ch.image} alt={ch.title} style={s.img} contain />
              <div style={s.content}>
                <h3 style={s.chTitle}>{ch.title}</h3>
                <div style={s.meta}>
                  <span style={s.metaItem}><Calendar size={12} /> {ch.date}</span>
                  {ch.location && <span style={s.metaItem}><MapPin size={12} /> {ch.location}</span>}
                </div>
                <p style={s.msg}>{ch.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
