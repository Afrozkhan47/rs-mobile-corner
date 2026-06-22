'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverGlow?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  style,
  hoverGlow = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      style={style}
      whileHover={
        hoverGlow
          ? {
              borderColor: 'rgba(201, 169, 97, 0.3)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
