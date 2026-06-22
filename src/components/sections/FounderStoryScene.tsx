'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { founderMilestones } from '@/content/story';
import { business } from '@/content/business';
import styles from './FounderStoryScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1] as const;
const viewOnce = { once: true, amount: 0.3 as const };

export default function FounderStoryScene() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState(0);

  // Scroll-driven progress line
  useEffect(() => {
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    if (!timeline || !progress || reduceMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        setProgressHeight(self.progress * 100);
      },
    });

    return () => trigger.kill();
  }, [reduceMotion]);

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: viewOnce,
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section className={styles.scene} id="story" aria-label="The Story of RS Mobile Corner">
      {/* Section Header */}
      <div className={styles.header}>
        <motion.span className={styles.eyebrow} {...fadeUp(0)}>
          Our Journey
        </motion.span>
        <motion.h2 className={styles.sectionTitle} {...fadeUp(0.1)}>
          From spark to trusted local brand.
        </motion.h2>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className={styles.timeline}>
        {/* Progress Line */}
        <div className={styles.progressLine} aria-hidden="true">
          <div
            ref={progressRef}
            className={styles.progressFill}
            style={{ height: `${progressHeight}%` }}
          />
        </div>

        {founderMilestones.map((ms, i) => (
          <motion.div
            key={ms.id}
            className={styles.milestone}
            {...fadeUp(0.05 * i)}
          >
            {/* Center Node */}
            <div className={styles.milestoneNode} aria-hidden="true">
              {ms.accent}
            </div>

            {/* Content */}
            <div className={styles.milestoneContent}>
              {ms.year && (
                <span className={styles.milestoneYear}>{ms.year}</span>
              )}
              <h3 className={styles.milestoneTitle}>{ms.title}</h3>
              <p className={styles.milestoneDesc}>{ms.description}</p>
            </div>

            {/* Visual Card */}
            <div className={styles.milestoneVisual}>
              <div className={styles.visualCard}>
                {ms.id === 'milestone' ? (
                  <AnimatedCounter
                    target={500}
                    suffix="+"
                    className={styles.visualNumber}
                    duration={2.5}
                    delay={0.2}
                  />
                ) : ms.id === 'opening' ? (
                  <span className={styles.visualNumber}>{business.established}</span>
                ) : ms.id === 'today' ? (
                  <AnimatedCounter
                    target={6}
                    suffix="+"
                    prefix=""
                    className={styles.visualNumber}
                    duration={1.5}
                  />
                ) : (
                  <span className={styles.visualEmoji}>{ms.accent}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div className={styles.bottomCta} {...fadeUp(0.1)}>
        <p className={styles.bottomLine}>
          &ldquo;The journey continues — one repair at a time.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
