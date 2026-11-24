import { useEffect, useState } from "react";

const HEART_COUNT = 8;

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const arr = Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 10 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.25,
    }));
    setHearts(arr);
  }, []);

  if (!hearts.length) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            bottom: "-30px",
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `heart-float ${h.duration}s ${h.delay}s ease-in infinite`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
