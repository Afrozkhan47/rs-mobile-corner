'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import RotatingText from '@/components/ui/RotatingText';
import FloatingBadge from '@/components/ui/FloatingBadge';
import presets from '@/components/animation/motionPresets';
import styles from './HeroScene.module.css';

const TRUST_BADGES = [
  { text: 'Personally Repaired', icon: '✓', class: 'badge1' },
  { text: 'Honest Diagnosis', icon: '🔍', class: 'badge2' },
  { text: '500+ Repairs', icon: '⭐', class: 'badge3' },
  { text: 'Since 2021', icon: '🏁', class: 'badge4' },
];

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Scroll link hook for lightweight parallax & shifts
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll animations for various elements
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 40]);
  
  const yBadgeLeft1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBadgeRight1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBadgeLeft2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yBadgeRight2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section className={styles.hero} id="home" ref={containerRef}>
      {/* Light subtle grid texture & ambient light layers */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left Column: Magazine Typography Layout */}
        <motion.div
          className={styles.left}
          style={{ y: yHeader, opacity: opacityHeader }}
        >
          <div className={styles.pillBox}>
            <Pill variant="accent" dot>
              Dighi's Tech Repair Studio
            </Pill>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>Expert</span>
            <span className={`${styles.headlineLine} ${styles.accentText}`}>
              <RotatingText
                words={[
                  'Display Repair',
                  'Battery Replacement',
                  'Charging Port',
                  'Motherboard Repair',
                  'Accessories',
                  'Water Damage',
                  'Software Repair',
                  'Fast Repairs',
                ]}
                interval={2600}
              />
            </span>
          </h1>

          <div className={styles.quickScanGrid}>
            <div className={styles.scanItem}>
              <span className={styles.scanNum}>500+</span>
              <span className={styles.scanLabel}>Devices Saved</span>
            </div>
            <div className={styles.scanItem}>
              <span className={styles.scanNum}>6+ Yrs</span>
              <span className={styles.scanLabel}>Expertise</span>
            </div>
            <div className={styles.scanItem}>
              <span className={styles.scanNum}>15m</span>
              <span className={styles.scanLabel}>Express Screen</span>
            </div>
            <div className={styles.scanItem}>
              <span className={styles.scanNum}>7 Days</span>
              <span className={styles.scanLabel}>Open Daily</span>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
            <Button
              variant="primary"
              href="https://wa.me/918788148687?text=Hi%20Rahim%20Bhai,%20I'd%20like%20to%20inquire%20about%20a%20mobile%20repair."
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp"
              icon={<WhatsAppIcon />}
            >
              WhatsApp RBS
            </Button>
            <Button
              variant="secondary"
              href="tel:8788148687"
              id="hero-call"
              icon={<PhoneIcon />}
            >
              Call Studio
            </Button>
            <Button
              variant="tertiary"
              href="https://maps.app.goo.gl/3s1sDQeMnLWmcfJB7"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-directions"
              icon={<MapIcon />}
            >
              Find Shop
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Layered Editorial Portrait */}
        <div className={styles.right}>
          <motion.div
            className={styles.portraitContainer}
            ref={portraitRef}
            style={{ y: yPortrait }}
          >
            {/* Elegant glass-bordered photo frame */}
            <div className={styles.photoFrame}>
              <motion.div style={{ scale: scalePortrait, width: '100%', height: '100%' }}>
                <Image
                  src="/founder.jpg"
                  alt="Rahim Bhai Shaikh (RBS) - Owner of RS Mobile Corner"
                  fill
                  priority
                  className={styles.founderPhoto}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </motion.div>
              <div className={styles.photoVignette} aria-hidden="true" />
            </div>

            {/* Meet Rahim Bhai signature card */}
            <motion.div
              className={styles.signatureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.sigHeader}>
                <span className={styles.sigStatus} />
                <h3 className={styles.sigName}>Meet Rahim Bhai</h3>
              </div>
              <p className={styles.sigTitle}>Founder & Mobile Repair Specialist</p>
              <div className={styles.sigMeta}>
                <span>Trusted as RBS</span>
                <span className={styles.sigDivider} />
                <span>6+ Years Exp</span>
              </div>
            </motion.div>

            {/* Micro Trust Cards Layered on Scroll */}
            {TRUST_BADGES.map((b, i) => {
              const badgeYs = [yBadgeLeft1, yBadgeRight1, yBadgeLeft2, yBadgeRight2];
              return (
                <FloatingBadge
                  key={b.text}
                  className={`${styles.floatingBadge} ${styles[b.class] ?? ''}`}
                  style={{ y: badgeYs[i] }}
                >
                  <span className={styles.badgeIcon}>{b.icon}</span>
                  <span>{b.text}</span>
                </FloatingBadge>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Premium Animated Scroll hint */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>Explore RS Studio</span>
        <div className={styles.mouseScroll}>
          <motion.div
            className={styles.mouseWheel}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.18a19.79 19.79 0 01-3.07-8.67A2 2 0 012.76 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.1 6.1l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}
