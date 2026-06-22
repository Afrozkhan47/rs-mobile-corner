'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  yOffset?: number;
  rotateVal?: number;
}

export default function FloatingCard({
  children,
  className = '',
  style,
  delay = 0,
  yOffset = 8,
  rotateVal = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      className={className}
      style={{
        position: 'absolute',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md) var(--space-lg)',
        boxShadow: 'var(--shadow-md)',
        ...style,
      }}
      animate={{
        y: [0, -yOffset, 0],
        rotate: [rotateVal, rotateVal + 1, rotateVal],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
