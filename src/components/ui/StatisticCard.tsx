'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatisticCard.module.css';

gsap.registerPlugin(ScrollTrigger);

interface StatisticCardProps {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatisticCard({ value, label, className = '', style }: StatisticCardProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    // Parse value (e.g. "500+" -> 500, "+")
    const rawNum = value.replace(/[^0-9.]/g, '');
    const suffix = value.replace(/[0-9.]/g, '');
    const numValue = parseFloat(rawNum);

    if (isNaN(numValue)) return;

    const countObj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(countObj, {
        val: numValue,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = Math.round(countObj.val) + suffix;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div className={`${styles.card} ${className}`} style={style} ref={containerRef}>
      <span className={styles.value} ref={numRef}>
        0
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
