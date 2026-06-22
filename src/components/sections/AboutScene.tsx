'use client';

import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/animation/ScrollReveal';
import Label from '@/components/typography/Label';
import styles from './AboutScene.module.css';

export default function AboutScene() {
  return (
    <section className={styles.section} id="story">
      <div className={styles.inner}>
        {/* Left: Sticky visual */}
        <div className={styles.visualCol}>
          <div className={styles.stickyWrap}>
            <div className={styles.mainImage}>
              <Image
                src="/founder.jpg"
                alt="Rahim Bhai Shaikh (RBS) at RS Mobile Corner"
                fill
                className={styles.mainPhoto}
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className={styles.imageOverlay} />
            </div>
            {/* Small accent image */}
            <div className={styles.accentImage}>
              <Image
                src="/gallery-tools.png"
                alt="Precision mobile repair tools"
                fill
                className={styles.accentPhoto}
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>
          </div>
        </div>

        {/* Right: Scrollable text */}
        <div className={styles.textCol}>
          <ScrollReveal direction="up" delay={0.1}>
            <Label accent>The Man Behind RBS</Label>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className={styles.heading}>
              Honest Diagnostics & Expert Repair by Rahim Bhai.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className={styles.body}>
              RS Mobile Corner was established in 2021 in Dighi, Pune, by Rahim Bhai Shaikh (widely known as RBS). What began as a passionate hobby for mobile diagnostics and micro-soldering has evolved into one of Dighi's most trusted repair destinations.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <p className={styles.body}>
              As a dedicated one-man business, every repair is personally handled by Rahim himself. By skipping middle-men and third-party handlers, RS Mobile Corner guarantees honest diagnosis, transparent pricing, and direct, clear communication.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className={styles.divider} />
            <div className={styles.credentials}>
              <div className={styles.credential}>
                <span className={styles.credLabel}>Owner</span>
                <span className={styles.credValue}>Rahim Bhai Shaikh</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credLabel}>Established</span>
                <span className={styles.credValue}>2021 in Dighi</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credLabel}>Experience</span>
                <span className={styles.credValue}>6+ Years</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
