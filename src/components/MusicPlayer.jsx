import { useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import useMusic from "../hooks/useMusic";

const s = {
  wrap: {
    position: "fixed",
    top: 16,
    right: 16,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    transition: "background 0.2s",
  },
  slider: {
    width: 70,
    height: 4,
    accentColor: "#FF80AD",
    cursor: "pointer",
  },
};

export default function MusicPlayer() {
  const { playing, toggle, volume, setVolume } = useMusic();
  const [showVol, setShowVol] = useState(false);

  return (
    <div style={s.wrap}>
      {showVol && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
          style={s.slider}
        />
      )}
      <button style={s.btn} onClick={() => setShowVol((v) => !v)} aria-label="Volume">
        {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <button
        style={{ ...s.btn, background: playing ? "rgba(255,128,173,0.2)" : s.btn.background }}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <Music size={18} />
      </button>
    </div>
  );
}
