'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
}

export default function ImageFrame({
  src,
  alt,
  className = '',
  style,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
}: ImageFrameProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        background: 'var(--color-surface)',
        aspectRatio: '3 / 4',
        width: '100%',
        ...style,
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%' }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </motion.div>
      {/* Editorial subtle inner shadow / ambient outline */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
          background: 'linear-gradient(to top, rgba(250, 249, 246, 0.1), transparent 30%)',
        }}
      />
    </div>
  );
}
