'use client';

import { animate, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Counts from 0 to `value` when scrolled into view. Supports prefix/suffix.
// Non-numeric values pass through as-is.
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className = '',
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const mv = useMotionValue(0);
  const formatted = useTransform(mv, (v) =>
    typeof value === 'number' ? Math.round(v).toLocaleString() : String(value)
  );

  useEffect(() => {
    if (!inView || typeof value !== 'number') return;
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, value, duration, mv]);

  useEffect(() => {
    if (typeof value !== 'number') {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const unsub = formatted.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest}${suffix}`;
    });
    return unsub;
  }, [formatted, prefix, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {typeof value === 'number' ? 0 : value}
      {suffix}
    </span>
  );
}
