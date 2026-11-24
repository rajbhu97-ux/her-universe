import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoCard({ src, alt = "", style = {}, className = "", onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-md)", ...style }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {!loaded && !error && (
        <div className="img-placeholder shimmer-bg" style={{ position: "absolute", inset: 0 }} />
      )}
      {error ? (
        <div className="img-placeholder" style={{ width: "100%", height: "100%" }}>
          📷
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="img-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </motion.div>
  );
}
