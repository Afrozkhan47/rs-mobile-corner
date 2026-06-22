'use client';

import React from 'react';
import styles from './PlaceholderImage.module.css';

interface PlaceholderImageProps {
  label?: string;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'portrait' | 'landscape' | 'square';
}

const aspectMap = {
  default: '4 / 3',
  portrait: '3 / 4',
  landscape: '16 / 9',
  square: '1 / 1',
};

export default function PlaceholderImage({
  label,
  aspectRatio,
  className = '',
  style,
  variant = 'portrait',
}: PlaceholderImageProps) {
  const ratio = aspectRatio ?? aspectMap[variant];

  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={label ?? 'Image placeholder'}
    >
      {/* Cinematic gradient shimmer */}
      <div className={styles.shimmer} />
      <div className={styles.grid} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
