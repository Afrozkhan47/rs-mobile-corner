'use client';

import React from 'react';
import Section from '@/components/layout/Section';
import ScrollReveal from '@/components/animation/ScrollReveal';
import StatisticsGrid, { type Stat } from '@/components/ui/StatisticsGrid';
import styles from './StatsScene.module.css';

const STATS: Stat[] = [
  { value: '500+', label: 'Precision Repairs' },
  { value: '6+', label: 'Years of Expertise' },
  { value: '15m', label: 'Express Turnaround' },
  { value: '7d', label: 'Weekly Availability' },
];

export default function StatsScene() {
  return (
    <Section id="stats">
      <div className={styles.inner}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className={styles.headerLine} />
            <span className={styles.headerText}>By the Numbers</span>
            <span className={styles.headerLine} />
          </div>
        </ScrollReveal>

        <StatisticsGrid stats={STATS} />
      </div>
    </Section>
  );
}
