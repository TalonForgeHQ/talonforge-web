'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

type Accent = 'ember' | 'cyan';

const ACCENTS: Record<Accent, { border: string; glow: string; halo: string }> = {
  ember: {
    border: 'border-ember/25 hover:border-ember/60',
    glow: 'hover:shadow-[0_30px_80px_-20px_rgba(232,98,44,0.4),inset_0_0_0_1px_rgba(232,98,44,0.15)]',
    halo: 'from-ember/20 via-ember/5 to-transparent',
  },
  cyan: {
    border: 'border-[#3cc7ff]/25 hover:border-[#3cc7ff]/60',
    glow: 'hover:shadow-[0_30px_80px_-20px_rgba(60,199,255,0.4),inset_0_0_0_1px_rgba(60,199,255,0.15)]',
    halo: 'from-[#3cc7ff]/20 via-[#3cc7ff]/5 to-transparent',
  },
};

export function GlassCard({
  accent,
  children,
  className = '',
  tiltDirection = 'left',
}: {
  accent: Accent;
  children: ReactNode;
  className?: string;
  tiltDirection?: 'left' | 'right';
}) {
  const a = ACCENTS[accent];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 22 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);
  const maxRotate = 6;
  const rotY = useTransform(sx, [-0.5, 0.5], [
    tiltDirection === 'right' ? maxRotate : -maxRotate,
    tiltDirection === 'right' ? -maxRotate : maxRotate,
  ]);
  const rotX = useTransform(sy, [-0.5, 0.5], [maxRotate * 0.6, -maxRotate * 0.6]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      className={`group relative rounded-3xl backdrop-blur-xl bg-white/[0.03] border transition-shadow duration-500 ${a.border} ${a.glow} ${className}`}
    >
      {/* Halo */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${a.halo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ filter: 'blur(16px)' }}
      />
      {/* Edge highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-40"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}
      />
      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
