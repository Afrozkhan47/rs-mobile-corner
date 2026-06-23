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

export default function FounderStoryScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !container || !cardsContainer || reduceMotion) return;

    const cards = gsap.utils.toArray<HTMLElement>(cardsContainer.children);
    if (cards.length === 0) return;

    const totalCards = cards.length;
    const scrollHeight = window.innerHeight * 1.6 * totalCards;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger for the story deck container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollHeight}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const index = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveIndex(index);
          },
        },
      });

      // Apple Wallet Style Stacking Logic (next card is always BEHIND active card)
      cards.forEach((card, index) => {
        // Set starting properties to establish the stack depth layers
        gsap.set(card, {
          zIndex: 50 - index, // earlier cards stay on top
          yPercent: index * 10,
          scale: 1 - index * 0.03,
          opacity: index === 0 ? 1 : 0.85 - index * 0.1,
          transformOrigin: 'center bottom',
        });

        if (index === 0) {
          // Card 0 slides up and out of the stack
          tl.to(card, {
            yPercent: -120,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power1.inOut',
          }, 0);
        } else {
          // Card index > 0 starts waiting, promotes to active (center), then slides out
          // Promotion:
          tl.to(card, {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut',
          }, index - 1);

          // Exit:
          tl.to(card, {
            yPercent: -120,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power1.inOut',
          }, index);
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 25 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section ref={sectionRef} className={styles.scene} id="story" aria-label="The Story of RS Mobile Corner">
      <div ref={containerRef} className={styles.container}>
        {/* Story Header */}
        <div className={styles.header}>
          <motion.span className={styles.eyebrow} {...fadeUp(0)}>
            Our Story
          </motion.span>
          <h2 className={styles.sectionTitle}>
            From a spark to a trusted local brand.
          </h2>
          <p className={styles.progressText}>
            Chapter {activeIndex + 1} of {founderMilestones.length}
          </p>
          <div className={styles.scrollIndicatorMobile} aria-hidden="true">
            <span>Scroll Down</span>
            <div className={styles.chevron} />
          </div>
        </div>

        {/* Story Cards Stack Deck */}
        <div ref={cardsRef} className={styles.deck}>
          {founderMilestones.map((ms, i) => {
            const isActive = i === activeIndex;
            const isPrevious = i < activeIndex;

            let cardClass = styles.card;
            if (isActive) cardClass += ` ${styles.activeCard}`;
            else if (isPrevious) cardClass += ` ${styles.previousCard}`;

            return (
              <div key={ms.id} className={cardClass}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>0{i + 1}</span>
                  {ms.year ? (
                    <span className={styles.cardYear}>{ms.year}</span>
                  ) : (
                    <span className={styles.cardIcon}>{ms.accent}</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{ms.title}</h3>
                  <p className={styles.cardDesc}>{ms.description}</p>
                </div>

                <div className={styles.cardVisual}>
                  {ms.id === 'milestone' ? (
                    <div className={styles.counterWrap}>
                      <AnimatedCounter target={500} suffix="+" className={styles.counterNum} />
                      <span className={styles.counterLabel}>Phones Repaired</span>
                    </div>
                  ) : ms.id === 'opening' ? (
                    <div className={styles.counterWrap}>
                      <span className={styles.counterNum}>{business.established}</span>
                      <span className={styles.counterLabel}>Shop Opened</span>
                    </div>
                  ) : ms.id === 'today' ? (
                    <div className={styles.counterWrap}>
                      <AnimatedCounter target={6} suffix="+" className={styles.counterNum} />
                      <span className={styles.counterLabel}>Years of Trust</span>
                    </div>
                  ) : (
                    <span className={styles.visualEmoji}>{ms.accent}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
