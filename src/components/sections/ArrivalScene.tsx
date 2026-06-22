'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import SplitText from '@/components/ui/SplitText';
import RotatingText from '@/components/ui/RotatingText';
import { business, heroRotatingWords, trustBadges } from '@/content/business';
import styles from './ArrivalScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

const BADGE_FLOAT_CONFIG = [
  { duration: 6200, amplitudeY: -5, delay: 200 },
  { duration: 8100, amplitudeY: 6, delay: 500 },
  { duration: 9400, amplitudeY: -4, delay: 800 },
  { duration: 11100, amplitudeY: 5, delay: 1100 },
] as const;

export default function ArrivalScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const floatRef = useRef<HTMLDivElement>(null);

  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const badgePositions = [styles.badge1, styles.badge2, styles.badge3, styles.badge4];

  // Portrait floating breath animation
  useEffect(() => {
    if (!floatRef.current || reduceMotion) return;
    const el = floatRef.current;
    const anim = anime({
      targets: el,
      translateY: [0, -8, 0, 8, 0],
      duration: 9200,
      easing: 'easeInOutSine',
      loop: true,
    });
    return () => {
      anim.pause();
      anime.remove(el);
    };
  }, [reduceMotion]);

  // Badge floating animations
  useEffect(() => {
    if (reduceMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    badgeRefs.current.forEach((badge, index) => {
      if (!badge) return;
      const cfg = BADGE_FLOAT_CONFIG[index];

      const timer = setTimeout(() => {
        anime({
          targets: badge,
          translateY: [0, cfg.amplitudeY, -cfg.amplitudeY * 0.4, cfg.amplitudeY * 0.2, 0],
          duration: cfg.duration,
          easing: 'easeInOutSine',
          loop: true,
        });
      }, cfg.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
      badgeRefs.current.forEach((badge) => {
        if (badge) anime.remove(badge);
      });
    };
  }, [reduceMotion]);

  // Scroll hint hide & GSAP parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const onScroll = () => {
      if (window.scrollY > 48) setScrollHintVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const portrait = portraitRef.current;
    if (portrait) {
      gsap.to(portrait, {
        y: -20,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          scrub: true,
        },
      });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === section) t.kill();
      });
    };
  }, [reduceMotion]);

  // Pointer parallax
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
        initial: { opacity: 0, y: 40, scale: 1.03 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.9, ease: EASE, delay: 0.15 },
      };

  const portraitStyle = {
    transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 6}px, 0)`,
    willChange: 'transform' as const,
  };

  const badgeStyle = (index: number) => ({
    transform: `translate3d(${parallax.x * (14 + index * 3)}px, ${parallax.y * (8 + index * 2)}px, 0)`,
    willChange: 'transform' as const,
  });

  return (
    <section ref={sectionRef} className={styles.arrival} id="home" aria-label="Welcome to RS Mobile Corner">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.ambientLayer} aria-hidden="true">
        <motion.div
          className={styles.ambientGlow}
          animate={reduceMotion ? { opacity: 0.18 } : { opacity: [0.18, 0.3, 0.18], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.ambientGlowSecondary}
          animate={reduceMotion ? { opacity: 0.1 } : { opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Left: Editorial Copy */}
      <div className={styles.copyZone}>
        <motion.div
          className={styles.metaRow}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : 0.3 }}
        >
          <span>RS Mobile Corner</span>
          <span>Est. {business.established}</span>
        </motion.div>

        <h1 className={styles.headline}>
          <SplitText
            mode="words"
            preset="fadeUp"
            stagger={0.06}
            duration={0.8}
            delay={0.4}
            trigger="mount"
            tag="span"
          >
            Every phone deserves a second life.
          </SplitText>
          <motion.span
            className={styles.headlineRotate}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: reduceMotion ? 0 : 1.2 }}
          >
            <RotatingText
              words={[...heroRotatingWords]}
              interval={3200}
              startDelay={reduceMotion ? 0 : 1400}
              className={styles.rotatingWord}
            />
          </motion.span>
        </h1>

        <motion.div
          className={styles.infoPanel}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: reduceMotion ? 0 : 0.9 }}
        >
          <div>
            <p className={styles.infoName}>{business.founder}</p>
            <p className={styles.infoRole}>Founder</p>
          </div>
          <div className={styles.infoMeta}>
            <span>{business.name}</span>
            <span>{business.location}</span>
            <span>Since {business.established}</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.ctaRow}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : 1.0 }}
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
      </div>

      {/* Right: Portrait */}
      <div className={styles.portraitZone}>
        <motion.div
          ref={portraitRef}
          className={styles.portraitWrap}
          {...portraitMotion}
          style={portraitStyle}
        >
          <div className={styles.portraitGlow} aria-hidden="true" />
          <div ref={floatRef} className={styles.portraitInner}>
            <Image
              src="/founder.jpg"
              alt={`${business.founder} — Founder of ${business.name}`}
              fill
              preload
              className={styles.portraitImage}
              sizes="(max-width: 900px) 55vw, 32vw"
            />
          </div>

          <motion.div
            className={styles.caption}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: reduceMotion ? 0 : 0.8 }}
          >
            <span>{business.founder}</span>
            <span>{business.location}</span>
          </motion.div>

          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.text}
              ref={(node) => {
                badgeRefs.current[i] = node;
              }}
              className={`${styles.trustBadge} ${badgePositions[i]}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: reduceMotion ? 0 : 0.7 + i * 0.08,
              }}
              style={badgeStyle(i)}
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                {badge.icon}
              </span>
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {scrollHintVisible && (
          <motion.div
            className={styles.scrollHint}
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : 1.8 }}
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
