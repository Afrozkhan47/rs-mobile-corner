'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatisticsGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface Stat {
  value: string;
  label: string;
}

interface StatisticsGridProps {
  stats: Stat[];
}

function StatItem({ stat }: { stat: Stat }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    // Extract numeric part for animation
    const raw = stat.value.replace(/[^0-9.]/g, '');
    const suffix = stat.value.replace(/[0-9.]/g, '');
    const num = parseFloat(raw);
    if (isNaN(num)) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: num,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stat.value]);

  return (
    <div className={styles.statItem}>
      <div className={styles.statBorder} />
      <span className={styles.statValue} ref={numRef}>
        {stat.value}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function StatisticsGrid({ stats }: StatisticsGridProps) {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} />
      ))}
    </div>
  );
}
