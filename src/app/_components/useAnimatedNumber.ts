'use client';

import { useEffect, useRef, useState } from 'react';

// Animates a number from its previous value to `target` over `duration` ms
// using easeOutQuad. Returns the current displayed number.
export function useAnimatedNumber(target: number, duration = 1200): number {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (target === prevRef.current) return;

    const from = prevRef.current;
    const to = target;
    const delta = to - from;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - t) * (1 - t); // easeOutQuad
      const current = from + delta * eased;
      setDisplay(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
        startRef.current = 0;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}
