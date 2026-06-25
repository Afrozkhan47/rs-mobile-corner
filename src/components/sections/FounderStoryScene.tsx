'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { founderMilestones } from '@/content/story';
import { LightRays } from '@/components/ui/LightRays/LightRays';
import styles from './FounderStoryScene.module.css';

/* ── Human-authored card copy ─────────────────────────────── */
const HUMAN_CARD_COPY: Record<string, { headline: string; detail: string }> = {
  learning: {
    headline: 'Started by taking apart whatever was broken.',
    detail: 'No formal school. Just old phones, a screwdriver, and the kind of patience that only grows when you have nothing to lose.',
  },
  practice: {
    headline: 'The bench became the classroom.',
    detail: 'Every repeat repair shaved a minute off the time. Hands learn what eyes cannot teach. 2020 was the year the hands got fast.',
  },
  opening: {
    headline: 'A small shop on a quiet lane in Dighi.',
    detail: 'No big launch. No signboard ceremony. Just a bench, a toolbox, and the first neighbour who walked in with a cracked screen.',
  },
  community: {
    headline: 'People started sending their people.',
    detail: 'A fixed phone carries a story. That story got told. The walk-ins became regulars. Regulars became the foundation.',
  },
  advanced: {
    headline: 'The hard repairs stopped going elsewhere.',
    detail: 'Board-level faults. Micro-solder work. The kind of problem other shops return unfixed. This bench started taking those on.',
  },
  today: {
    headline: 'Still at the same bench. Same hands.',
    detail: 'Rahim Bhai opens the shop, runs diagnostics, and does the repair himself. That has not changed and will not change.',
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ── Smooth Momentum Slider ───────────────────────────────── */
function useSlider(count: number) {
  const currentX = useRef(0);
  const targetX = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startTarget = useRef(0);
  const rafId = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const CARD_WIDTH = useRef(0);

  const clamp = useCallback((val: number) => {
    const max = -(count - 1) * (CARD_WIDTH.current + 24);
    return Math.max(max, Math.min(0, val));
  }, [count]);

  const tick = useCallback(function tickFn() {
    currentX.current = lerp(currentX.current, targetX.current, 0.07);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentX.current}px)`;
    }
    // Update active index based on which card center is closest to viewport center
    if (CARD_WIDTH.current > 0) {
      const rawIndex = Math.round(-currentX.current / (CARD_WIDTH.current + 24));
      setActiveIndex(Math.max(0, Math.min(count - 1, rawIndex)));
    }
    rafId.current = requestAnimationFrame(tickFn);
  }, [count]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDown.current = true;
    startX.current = e.clientX;
    startTarget.current = targetX.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDown.current) return;
    const delta = (e.clientX - startX.current) * 1.4;
    targetX.current = clamp(startTarget.current + delta);
  }, [clamp]);

  const onPointerUp = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    // Snap to nearest card
    if (CARD_WIDTH.current > 0) {
      const snap = Math.round(-targetX.current / (CARD_WIDTH.current + 24));
      const clamped = Math.max(0, Math.min(count - 1, snap));
      targetX.current = -clamped * (CARD_WIDTH.current + 24);
    }
  }, [count]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    targetX.current = clamp(targetX.current - e.deltaX * 0.8 - e.deltaY * 0.4);
  }, [clamp]);

  const goTo = useCallback((i: number) => {
    if (CARD_WIDTH.current === 0) return;
    targetX.current = -i * (CARD_WIDTH.current + 24);
  }, []);

  return { trackRef, onPointerDown, onPointerMove, onPointerUp, onWheel, activeIndex, goTo, CARD_WIDTH };
}

/* ── Main component ────────────────────────────────────────── */
export default function FounderStoryScene() {
  const reduceMotion = useReducedMotion();
  const [cards] = useState(() =>
    founderMilestones.map((ms: typeof founderMilestones[number]) => ({
      ...ms,
      copy: HUMAN_CARD_COPY[ms.id] || { headline: ms.title, detail: ms.description },
    }))
  );

  const {
    trackRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    activeIndex,
    goTo,
    CARD_WIDTH,
  } = useSlider(cards.length);

  // Measure card width after mount
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        CARD_WIDTH.current = cardRef.current.getBoundingClientRect().width;
      }
    };
    // Small delay ensures CSS has painted
    const t = setTimeout(measure, 60);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [CARD_WIDTH]);

  return (
    <>
      {/* Chapter Title Page */}
      <section className={styles.introScene} aria-label="Story Introduction">
        <LightRays raysOrigin="top-center" style={{ opacity: 0.015 }} />
        <div className={styles.introInner}>
          <span className={styles.introEyebrow}>The Journey</span>
          <h2 className={styles.introHeading}>
            Every repair shop has a beginning.
            <br />
            <span className={styles.introHeadingSub}>This one started with patience.</span>
          </h2>
        </div>
      </section>

      {/* Interactive Story Gallery */}
      <div
        className={styles.galleryContainer}
        onWheel={onWheel}
        aria-label="The Story of RS Mobile Corner"
      >
        <LightRays raysOrigin="center" style={{ opacity: 0.01 }} />

        {/* Draggable track */}
        <div
          className={styles.sliderViewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div ref={trackRef} className={styles.sliderTrack}>
            {cards.map((ms, i) => (
              <div
                key={ms.id}
                ref={i === 0 ? cardRef : undefined}
                className={`${styles.storyCard} ${activeIndex === i ? styles.storyCardActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Story milestone: ${ms.title}`}
              >
                {/* Year badge */}
                <span className={styles.cardYear}>{ms.year}</span>

                {/* Main content */}
                <div className={styles.cardBody}>
                  <p className={styles.cardHeadline}>{ms.copy.headline}</p>
                  <p className={styles.cardDetail}>{ms.copy.detail}</p>
                </div>

                {/* Quote footer */}
                <blockquote className={styles.cardQuote}>
                  &ldquo;{ms.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <nav className={styles.dotNav} aria-label="Story navigation">
          {cards.map((ms, i) => (
            <button
              key={ms.id}
              className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${ms.year}`}
            />
          ))}
        </nav>

        <p className={styles.galleryHint}>drag or swipe to explore</p>
      </div>
    </>
  );
}
