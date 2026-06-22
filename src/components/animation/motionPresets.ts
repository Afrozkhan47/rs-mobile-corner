const presets = {
  fadeInUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  floatSlow: {
    animate: { y: [0, -6, 0] },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
  press: { scale: 0.98, transition: { duration: 0.12 } },
};

export default presets;
