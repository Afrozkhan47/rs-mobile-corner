'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PillProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'muted';
  className?: string;
  style?: React.CSSProperties;
  dot?: boolean;
}

export default function Pill({
  children,
  variant = 'accent',
  className = '',
  style,
  dot = false,
}: PillProps) {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--color-text-primary)',
          color: 'var(--color-bg)',
          border: '1px solid var(--color-text-primary)',
        };
      case 'accent':
        return {
          background: 'var(--color-accent-muted)',
          color: 'var(--color-accent-hover)',
          border: '1px solid rgba(201, 169, 97, 0.15)',
        };
      case 'muted':
        return {
          background: 'var(--color-bg-deep)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        };
    }
  };

  const colors = getColors();

  return (
    <motion.div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        paddingInline: 'var(--space-md)',
        paddingBlock: 'var(--space-xs)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-micro)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        boxShadow: 'var(--shadow-sm)',
        width: 'fit-content',
        ...colors,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: 'var(--radius-full)',
            background: variant === 'accent' ? 'var(--color-accent)' : 'currentColor',
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
