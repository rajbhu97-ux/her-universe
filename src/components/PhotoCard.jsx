import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoCard({ src, alt = "", style = {}, className = "", onClick, contain = false }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const wrapStyle = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "var(--radius-md)",
    minHeight: contain ? 200 : undefined,
    ...style,
  };

  return (
    <motion.div className={className} style={wrapStyle} whileHover={{ scale: 1.02 }} onClick={onClick}>
      {!loaded && !error && (
        <div
          className="img-placeholder shimmer-bg"
          style={{ position: "absolute", inset: 0, minHeight: 200 }}
        />
      )}
      {error ? (
        <div className="img-placeholder" style={{ width: "100%", height: 200 }}>
          📷
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: contain ? "auto" : "100%",
            objectFit: contain ? "contain" : "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </motion.div>
  );
}
