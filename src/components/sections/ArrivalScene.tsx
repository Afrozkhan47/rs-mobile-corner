'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import SplitText from '@/components/ui/SplitText';
import RotatingText from '@/components/ui/RotatingText';
import { business, heroRotatingWords } from '@/content/business';
import styles from './ArrivalScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

// The 3 essential badges requested
const badges = [
  { text: 'Personally Repaired', icon: '✓' },
  { text: 'Honest Diagnosis', icon: '◆' },
  { text: 'Since 2021', icon: '★' },
];

export default function ArrivalScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitZoneRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const badgePositions = [styles.badge1, styles.badge2, styles.badge3];

  // Scroll Triggered Parallax on Portrait Zone to avoid conflict on portraitWrap
  useEffect(() => {
    const section = sectionRef.current;
    const portraitZone = portraitZoneRef.current;
    if (!section || !portraitZone || reduceMotion) return;

    const onScroll = () => {
      if (window.scrollY > 48) setScrollHintVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    gsap.to(portraitZone, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduceMotion]);

  // Pointer parallax (runs on wrapper level, GPU-accelerated)
  useEffect(() => {
    if (reduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reduceMotion]);

  const portraitMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30, scale: 1.02 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.8, ease: EASE, delay: 0.2 },
      };

  // Pointer parallax transform style with GPU acceleration layers
  const wrapStyle = {
    transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 6}px, 0)`,
    willChange: 'transform' as const,
  };

  const badgeStyle = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return {};
    return {
      transform: `translate3d(${parallax.x * (12 + index * 3)}px, ${parallax.y * (8 + index * 2)}px, 0)`,
      willChange: 'transform' as const,
    };
  };

  return (
    <section ref={sectionRef} className={styles.arrival} id="home" aria-label="Welcome to RS Mobile Corner">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.ambientLayer} aria-hidden="true">
        <motion.div
          className={styles.ambientGlow}
          animate={reduceMotion ? { opacity: 0.04 } : { opacity: [0.04, 0.1, 0.04], scale: [1, 1.02, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Copy Zone */}
      <div className={styles.copyZone}>
        {/* Handwritten signature draw-in animation */}
        <div className={styles.signatureWrap} aria-hidden="true">
          <svg viewBox="0 0 240 50" className={styles.handwrittenSvg}>
            <text
              x="5"
              y="32"
              fontFamily="'Instrument Serif', Georgia, serif"
              fontSize="24"
              fontStyle="italic"
              fill="none"
              stroke="var(--color-amber)"
              strokeWidth="1.2"
              className={styles.signatureText}
            >
              Meet Rahim Bhai
            </text>
          </svg>
        </div>

        <h1 className={styles.headline}>
          <SplitText
            mode="words"
            preset="fadeUp"
            stagger={0.05}
            duration={0.7}
            delay={0.3}
            trigger="mount"
            tag="span"
          >
            Every phone deserves a second life.
          </SplitText>
          <motion.span
            className={styles.headlineRotate}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: reduceMotion ? 0 : 1.0 }}
          >
            <RotatingText
              words={[...heroRotatingWords]}
              interval={3000}
              startDelay={reduceMotion ? 0 : 1100}
              className={styles.rotatingWord}
            />
          </motion.span>
        </h1>

        <motion.div
          className={styles.ctaRow}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : 0.8 }}
        >
          <MagneticButton
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            id="arrival-whatsapp"
            variant="primary"
            icon={<WhatsAppIcon />}
          >
            WhatsApp
          </MagneticButton>
          <MagneticButton
            href={`tel:${business.phone}`}
            id="arrival-call"
            variant="secondary"
            icon={<PhoneIcon />}
          >
            Call
          </MagneticButton>
          <MagneticButton
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="arrival-directions"
            variant="tertiary"
            icon={<MapIcon />}
          >
            Directions
          </MagneticButton>
        </motion.div>

        {/* Essential Address / Info */}
        <motion.div
          className={styles.miniMeta}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span>📍 {business.location}</span>
          <span>•</span>
          <span>9:30 AM – 9:30 PM</span>
        </motion.div>
      </div>

      {/* Right: Portrait Zone */}
      <div ref={portraitZoneRef} className={styles.portraitZone}>
        <motion.div
          ref={portraitWrapRef}
          className={styles.portraitWrap}
          {...portraitMotion}
          style={wrapStyle}
        >
          <div className={styles.portraitGlow} aria-hidden="true" />
          <div className={`${styles.portraitInner} ${styles.floatAnim}`}>
            <Image
              src="/founder.jpg"
              alt={`${business.founder} — Founder of ${business.name}`}
              fill
              preload={true}
              className={styles.portraitImage}
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 32vw"
            />
          </div>

          <div className={styles.badgesWrap}>
            {badges.map((badge, i) => (
              <motion.div
                key={badge.text}
                className={`${styles.trustBadge} ${badgePositions[i]} ${styles[`badgeFloat${i + 1}`]}`}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: reduceMotion ? 0 : 0.5 + i * 0.1,
                }}
                style={badgeStyle(i)}
              >
                <span className={styles.badgeIcon} aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {scrollHintVisible && (
          <motion.div
            className={styles.scrollHint}
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : 1.4 }}
          >
            <span className={styles.scrollLabel}>Scroll</span>
            <div className={styles.scrollTrack}>
              <motion.span
                className={styles.scrollDot}
                animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Inline SVG Icons ── */

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.18a19.79 19.79 0 01-3.07-8.67A2 2 0 012.76 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.1 6.1l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}
