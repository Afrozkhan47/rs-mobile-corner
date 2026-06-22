'use client';

import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Label({
  children,
  accent = false,
  className = '',
  style,
}: LabelProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        fontSize: 'var(--text-micro)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        color: accent ? 'var(--color-accent)' : undefined,
        opacity: accent ? 1 : 0.4,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
