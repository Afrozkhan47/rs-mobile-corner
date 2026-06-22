'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  words: string[];
  interval?: number; // ms
  startDelay?: number; // ms before cycling begins
  className?: string;
}

export default function RotatingText({
  words,
  interval = 2500,
  startDelay = 0,
  className = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;

    let intervalId: ReturnType<typeof setInterval>;

    const delayId = setTimeout(() => {
      intervalId = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    }, startDelay);

    return () => {
      clearTimeout(delayId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [words, interval, startDelay]);

  return (
    <span aria-live="polite" className={className} style={{ display: 'inline-block' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
