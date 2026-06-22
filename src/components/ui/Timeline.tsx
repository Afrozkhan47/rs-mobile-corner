'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineStep {
  index: string;
  phase: string;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const items = container.querySelectorAll('[data-timeline-item]');

    // Animate progress line
    const lineTween = gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: true,
        },
      }
    );

    // Stagger items
    const itemTweens = Array.from(items).map((item, i) =>
      gsap.fromTo(
        item,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.05,
        }
      )
    );

    return () => {
      lineTween.scrollTrigger?.kill();
      lineTween.kill();
      itemTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* Vertical connector line */}
      <div className={styles.lineTrack}>
        <div className={styles.lineFill} ref={lineRef} />
      </div>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div
            key={i}
            data-timeline-item
            className={styles.step}
          >
            {/* Dot */}
            <div className={styles.dotWrapper}>
              <div className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`} />
            </div>

            {/* Content */}
            <div className={styles.content}>
              <span className={styles.stepIndex}>
                {step.index} / {step.phase}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
