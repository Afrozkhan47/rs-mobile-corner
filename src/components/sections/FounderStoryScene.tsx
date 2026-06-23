'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { founderMilestones } from '@/content/story';
import { business } from '@/content/business';
import styles from './FounderStoryScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FounderStoryScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Touch Swipe Handlers for Mobile First Carousel
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swipe Left - Next Card
      setActiveIndex((prev) => Math.min(prev + 1, founderMilestones.length - 1));
    } else if (diff < -50) {
      // Swipe Right - Prev Card
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // GSAP desktop scroll trigger fanning animation
  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck || reduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

    const cards = gsap.utils.toArray<HTMLElement>(deck.children);
    if (cards.length === 0) return;

    const total = cards.length;
    const scrollHeight = window.innerHeight * 1.5 * total;

    const ctx = gsap.context(() => {
      // Pin the section and map scroll to activeIndex
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollHeight}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(
            total - 1,
            Math.floor(self.progress * total)
          );
          setActiveIndex(index);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  // Calculate card layout coordinates on desktop
  const getCardStyle = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return {}; // Handled by CSS on mobile
    }

    const total = founderMilestones.length;
    const isActive = index === activeIndex;
    const isPast = index < activeIndex;
    const isFuture = index > activeIndex;

    let x = 0;
    let y = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 50 - index;

    if (isActive) {
      x = 0;
      y = -40;
      scale = 1.05;
      opacity = 1;
      zIndex = 100;
    } else if (isPast) {
      // Slid left and faded out
      const diff = activeIndex - index;
      x = -160 - diff * 30;
      y = 20;
      scale = 0.9;
      opacity = 0.2;
    } else if (isFuture) {
      // Stacked horizontally to the right
      const diff = index - activeIndex;
      x = 100 + diff * 50;
      y = diff * 8;
      scale = 1 - diff * 0.03;
      opacity = Math.max(0.3, 0.95 - diff * 0.15);
    }

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <section ref={sectionRef} className={styles.scene} id="story" aria-label="The Story of RS Mobile Corner">
      <div className={styles.container}>
        {/* Story Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.sectionTitle}>
            From a spark to a trusted local brand.
          </h2>
          <div className={styles.progressTracker}>
            <span className={styles.progressIndex}>0{activeIndex + 1}</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((activeIndex + 1) / founderMilestones.length) * 100}%` }}
              />
            </div>
            <span className={styles.progressTotal}>0{founderMilestones.length}</span>
          </div>
        </div>

        {/* Story Cards Stack Deck */}
        <div
          ref={deckRef}
          className={styles.deck}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {founderMilestones.map((ms, i) => {
            const isActive = i === activeIndex;
            const cardStyle = getCardStyle(i);

            return (
              <div
                key={ms.id}
                className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                style={cardStyle}
                onClick={() => setActiveIndex(i)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>Chapter 0{i + 1}</span>
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

        {/* Mobile Swipe indicators */}
        <div className={styles.swipeTip} aria-hidden="true">
          <span>← Swipe Left / Right to Read →</span>
        </div>
      </div>
    </section>
  );
}
