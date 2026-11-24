import { NavLink, useLocation } from "react-router-dom";
import { Home, BookHeart, Images, Heart, Gift } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/story", icon: BookHeart, label: "Our Story" },
  { to: "/memories", icon: Images, label: "Memories" },
  { to: "/love-notes", icon: Heart, label: "Love Notes" },
  { to: "/surprise", icon: Gift, label: "Surprise" },
];

const s = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 90,
    background: "rgba(16,13,25,0.92)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
  inner: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    maxWidth: 480,
    margin: "0 auto",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.4)",
    textDecoration: "none",
    position: "relative",
    padding: "6px 12px",
    transition: "color 0.2s",
  },
  active: {
    color: "#FF80AD",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#FF80AD",
    position: "absolute",
    top: 0,
  },
};

export default function BottomNavigation({ hidden }) {
  const { pathname } = useLocation();
  if (hidden) return null;

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} style={{ ...s.link, ...(active ? s.active : {}) }}>
              {active && <motion.span layoutId="nav-dot" style={s.dot} />}
              <Icon size={20} strokeWidth={active ? 2.2 : 1.5} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
