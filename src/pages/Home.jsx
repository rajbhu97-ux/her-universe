import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookHeart, Images, Gift, Play, Sparkles } from "lucide-react";
import birthdayConfig from "../data/birthdayConfig";
import AnimatedButton from "../components/AnimatedButton";
import PhotoCard from "../components/PhotoCard";
import CinematicViewer from "../components/CinematicViewer";
import { pageTransition, slideUp, staggerContainer, staggerItem } from "../animations/variants";

const navCards = [
  { to: "/story", icon: BookHeart, title: "Our Journey", sub: "Our love story", color: "#B77AE8" },
  { to: "/memories", icon: Images, title: "Beautiful Memories", sub: "Photo gallery", color: "#FF80AD" },
  { to: "/surprise", icon: Gift, title: "Special Surprise", sub: "A gift for you", color: "#E8A87C" },
];

const previewImages = [
  birthdayConfig.images.wedding,
  birthdayConfig.images.couple,
  birthdayConfig.images.family,
];

const s = {
  hero: {
    position: "relative",
    height: "85vh",
    minHeight: 500,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(16,13,25,1) 0%, rgba(16,13,25,0.4) 50%, rgba(16,13,25,0.2) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    padding: "0 24px 40px",
    width: "100%",
  },
  heading: {
    fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 12,
  },
  sub: {
    fontSize: "0.95rem",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    maxWidth: 340,
    marginBottom: 24,
  },
  previews: {
    position: "absolute",
    top: 80,
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 2,
  },
  previewThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    border: "2px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },
  section: {
    padding: "32px 20px",
  },
  sectionTitle: {
    fontSize: "1.15rem",
    fontWeight: 600,
    marginBottom: 20,
  },
  cardGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 16,
    cursor: "pointer",
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: { fontWeight: 600, fontSize: "0.95rem" },
  cardSub: { fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 },
  cinBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "16px",
    margin: "0 20px 24px",
    borderRadius: "var(--radius-lg)",
    background: "linear-gradient(135deg, rgba(183,122,232,0.15), rgba(255,128,173,0.15))",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [cinematic, setCinematic] = useState(false);

  return (
    <motion.div className="page-wrapper" {...pageTransition}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroImg} className="animate-slow-zoom">
          <PhotoCard
            src={birthdayConfig.images.hero}
            alt={birthdayConfig.wifeName}
            style={{ width: "100%", height: "100%", borderRadius: 0 }}
          />
        </div>
        <div style={s.overlay} />

        {/* Small floating previews */}
        <div style={s.previews}>
          {previewImages.map((img, i) => (
            <motion.div
              key={i}
              className="animate-float"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <PhotoCard src={img} style={s.previewThumb} />
            </motion.div>
          ))}
        </div>

        <div style={s.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Sparkles size={16} color="#FF80AD" />
              <span style={{ fontSize: "0.78rem", color: "var(--accent-pink)", letterSpacing: 2, textTransform: "uppercase" }}>
                {birthdayConfig.birthdayDate}
              </span>
            </div>
            <h1 style={s.heading}>
              <span className="gradient-text">{birthdayConfig.heroHeading}</span>
            </h1>
            <p style={s.sub}>{birthdayConfig.heroSubtext}</p>
            <AnimatedButton onClick={() => navigate("/surprise")}>
              <Gift size={18} /> Open Your Surprise
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Mode */}
      <motion.button
        style={s.cinBtn}
        whileTap={{ scale: 0.97 }}
        onClick={() => setCinematic(true)}
      >
        <Play size={18} /> Experience Cinematic Mode
      </motion.button>

      {/* Navigation Cards */}
      <motion.section style={s.section} {...staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
        <h2 style={s.sectionTitle}>Explore</h2>
        <div style={s.cardGrid}>
          {navCards.map(({ to, icon: Icon, title, sub, color }) => (
            <motion.div
              key={to}
              className="glass-card"
              style={s.card}
              variants={staggerItem}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(to)}
            >
              <div style={{ ...s.cardIcon, background: `${color}20`, color }}>
                <Icon size={22} />
              </div>
              <div>
                <div style={s.cardTitle}>{title}</div>
                <div style={s.cardSub}>{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <CinematicViewer open={cinematic} onClose={() => setCinematic(false)} />
    </motion.div>
  );
}
