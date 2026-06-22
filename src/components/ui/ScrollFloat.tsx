'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ScrollFloatProps {
  children: React.ReactNode;
  className?: string;
  /** Max vertical shift in px — capped for mobile calm */
  strength?: number;
}

export default function ScrollFloat({
  children,
  className = '',
  strength = 12,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.15'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength * 0.5, -strength * 0.5]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform' }} className={className}>
      {children}
    </motion.div>
  );
}
