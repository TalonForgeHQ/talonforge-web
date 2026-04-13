'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

// Thin ember→cyan gradient bar at the top of viewport, tracks scroll depth.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 18, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-gradient-to-r from-ember via-[#ff8a3c] to-[#3cc7ff] shadow-[0_0_8px_rgba(232,98,44,0.6)]"
    />
  );
}
