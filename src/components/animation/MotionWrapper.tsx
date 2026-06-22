'use client';

import React from 'react';
import { motion, type MotionProps } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  hover?: {
    scale?: number;
    y?: number;
  };
  tap?: {
    scale?: number;
  };
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'span' | 'a' | 'button';
}

export default function MotionWrapper({
  children,
  hover,
  tap,
  initial,
  animate,
  transition,
  className = '',
  style,
  as = 'div',
}: MotionWrapperProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        ...transition,
      }}
      whileHover={hover ? { ...hover, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : undefined}
      whileTap={tap ? { ...tap, transition: { duration: 0.15 } } : undefined}
    >
      {children}
    </Component>
  );
}
