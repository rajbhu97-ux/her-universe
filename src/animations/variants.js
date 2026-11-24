export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  viewport: { once: true, margin: "-50px" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  viewport: { once: true },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
