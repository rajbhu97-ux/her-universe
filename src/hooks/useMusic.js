import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import birthdayConfig from "../data/birthdayConfig";

let globalHowl = null;
let autoStarted = false;

export default function useMusic() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!globalHowl) {
        globalHowl = new Howl({
          src: [birthdayConfig.music],
          loop: true,
          volume: 0.5,
          html5: true,
          onplay: () => setPlaying(true),
          onpause: () => setPlaying(false),
          onstop: () => setPlaying(false),
        });
      }

      // Auto-play on first user interaction
      if (!autoStarted) {
        const startMusic = () => {
          if (globalHowl && !globalHowl.playing()) {
            globalHowl.play();
            autoStarted = true;
          }
          document.removeEventListener("click", startMusic);
          document.removeEventListener("touchstart", startMusic);
        };
        document.addEventListener("click", startMusic, { once: true });
        document.addEventListener("touchstart", startMusic, { once: true });
      }
    }
  }, []);

  const toggle = useCallback(() => {
    if (!globalHowl) return;
    if (globalHowl.playing()) {
      globalHowl.pause();
    } else {
      globalHowl.play();
    }
  }, []);

  const setVolume = useCallback((v) => {
    if (!globalHowl) return;
    globalHowl.volume(v);
    setVolumeState(v);
  }, []);

  return { playing, toggle, volume, setVolume };
}
