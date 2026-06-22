'use client';

import React from 'react';
import Timeline, { type TimelineStep } from '@/components/ui/Timeline';
import ScrollReveal from '@/components/animation/ScrollReveal';
import styles from './JourneyScene.module.css';

const STEPS: TimelineStep[] = [
  {
    index: '01',
    phase: 'THE SPARK',
    title: 'Passion Before Profession',
    description:
      'Rahim Bhai already owned another successful business. Mobile repairing was not a plan — it was a hobby. Late nights, curiosity, and a drive to understand every chip on every motherboard.',
  },
  {
    index: '02',
    phase: '6 YEARS',
    title: 'Mastering the Craft',
    description:
      'Six years of learning, practicing, and perfecting. From basic screen replacements to complex IC-level soldering. Every device was a new challenge; every challenge made him better.',
  },
  {
    index: '03',
    phase: '2021',
    title: 'RS Mobile Corner Opens',
    description:
      'What started as passion officially became a business. Shop No. 5, Aurum Vrundavan, Dighi. A corner shop built on trust, run by one man who personally handles every device that walks through the door.',
  },
  {
    index: '04',
    phase: 'COMMUNITY',
    title: 'Known Across Dighi as RBS',
    description:
      'Word spreads fast when you do honest work. Rahim Bhai Shaikh (RBS) quickly became a trusted name in Dighi — not because of marketing, but because of results. Returning customers are the real reward.',
  },
  {
    index: '05',
    phase: 'TODAY',
    title: '500+ Devices & Counting',
    description:
      'Over 500 devices repaired. Every one personally handled by RBS. The shop is open 7 days a week, 9:30 AM – 9:30 PM. Emergency repairs available because devices don\'t break on schedule.',
  },
];

export default function JourneyScene() {
  return (
    <section className={styles.section} id="story">
      <div className={styles.inner}>
        {/* Sticky title */}
        <div className={styles.titleCol}>
          <div className={styles.stickyTitle}>
            <ScrollReveal direction="left">
              <span className={styles.eyebrow}>Our Story</span>
              <h2 className={styles.heading}>
                From Hobby to{' '}
                <span className={styles.headingAccent}>Dighi&rsquo;s Most Trusted Shop.</span>
              </h2>
              <p className={styles.subtitle}>
                RS Mobile Corner wasn&rsquo;t built to be a business. It was built out of genuine passion for repair, electronics, and helping people.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timelineCol}>
          <Timeline steps={STEPS} />
        </div>
      </div>
    </section>
  );
}
