'use client';

import React from 'react';
import styles from './MarqueeTicker.module.css';

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
}

export default function MarqueeTicker({ items, speed = 30 }: MarqueeTickerProps) {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items, ...items];

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div
        className={styles.track}
        style={{ animationDuration: `${speed}s` }}
      >
        {allItems.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
