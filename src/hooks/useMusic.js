import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import birthdayConfig from "../data/birthdayConfig";

let globalHowl = null;

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
