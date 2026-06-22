'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ServicesScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    icon: <DisplayIcon />,
    title: 'Display & Screen Repair',
    description:
      'Original and A-Grade display replacements for iPhone, Samsung, and all major brands. Clear, bright, and responsive — just like the day you bought it.',
    features: ['Original OEM Displays', 'A-Grade Quality Panels', 'Face Unlock Compatible'],
    time: '≈ 15 Min',
  },
  {
    icon: <BatteryIcon />,
    title: 'Battery Replacement',
    description:
      "Genuine battery cells with 3-month warranty. Restore your phone's full day battery life quickly and affordably.",
    features: ['Original Capacity Cells', '3 Months Warranty', '≈ 15 Min Turnaround'],
    time: '≈ 15 Min',
  },
  {
    icon: <ChargingIcon />,
    title: 'Charging & Power Issues',
    description:
      'From charging port cleaning to Charging IC and Power IC replacement — all charging faults diagnosed and fixed.',
    features: ['Charging Port Repair', 'Charging IC Replacement', 'Power IC Level Repair'],
    time: '≈ 15 Min',
  },
  {
    icon: <BoardIcon />,
    title: 'Motherboard & IC Repairs',
    description:
      'Complex motherboard-level repairs including micro-soldering, IC chip replacement, dead phone recovery, and water damage restoration.',
    features: ['Dead Phone Recovery', 'Water Damage Repair', 'IC & Chip Replacement'],
    time: '≈ 1 Hour+',
  },
  {
    icon: <SoftwareIcon />,
    title: 'Software & Flash',
    description:
      'Software problems, boot loops, factory flash, and data recovery. We inform you upfront about any data risks before starting.',
    features: ['Flash & Software Fix', 'Boot Loop Recovery', 'Data Recovery (Where Possible)'],
    time: '≈ 1 Hour',
  },
  {
    icon: <CameraIcon />,
    title: 'Camera & Network',
    description:
      'Camera issues, network problems, speaker & microphone faults, button repairs, and Face Unlock diagnosis.',
    features: ['Camera Repair', 'Network Issues', 'Speaker & Mic Repair'],
    time: '≈ 30 Min',
  },
  {
    icon: <WaterIcon />,
    title: 'Water Damage Recovery',
    description:
      'Specialized water damage treatment with ultrasonic cleaning, component-level drying, and IC replacement when needed.',
    features: ['Ultrasonic Cleaning', 'IC Level Repair', 'Full Recovery Attempt'],
    time: '≈ 1 Hour+',
  },
  {
    icon: <SpeakerIcon />,
    title: 'Speaker & Mic Fix',
    description:
      'Muffled audio, no sound, microphone not working during calls — all audio issues diagnosed and repaired.',
    features: ['Speaker Replacement', 'Mic Repair', 'Audio IC Fix'],
    time: '≈ 20 Min',
  },
];

const REPAIR_TIMES = [
  { service: 'Display Replacement', time: '≈ 15 Min' },
  { service: 'Battery Replacement', time: '≈ 15 Min' },
  { service: 'Charging Port', time: '≈ 15 Min' },
  { service: 'Software / Flash', time: '≈ 1 Hour' },
  { service: 'Water Damage', time: '≈ 1 Hour+' },
  { service: 'Initial Diagnosis', time: 'Free & Quick' },
];

const WARRANTY = [
  { item: 'Battery', warranty: '3 Months Warranty' },
  { item: 'Display', warranty: 'Depends on grade selected' },
  { item: 'Accessories', warranty: 'Brand specific' },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const viewOnce = { once: true, amount: 0.2 as const };

export default function ServicesScene() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  // Card positioning: fan layout
  const getCardTransform = (index: number, active: number) => {
    const offset = index - active;
    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    if (isActive) {
      return {
        transform: 'translateX(0) translateY(-12px) rotateY(0deg) scale(1)',
        zIndex: 10,
        opacity: 1,
        filter: 'blur(0px)',
      };
    }

    const direction = offset > 0 ? 1 : -1;
    const translateX = direction * (60 + absOffset * 30);
    const translateY = absOffset * 8;
    const rotateY = direction * -4;
    const scale = 1 - absOffset * 0.06;
    const opacity = Math.max(0.3, 1 - absOffset * 0.25);
    const blur = Math.min(absOffset * 1.5, 3);

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 10 - absOffset,
      opacity,
      filter: `blur(${blur}px)`,
    };
  };

  // Scroll-driven card switching
  useEffect(() => {
    if (reduceMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: deckRef.current,
      start: 'top 40%',
      end: 'bottom 60%',
      scrub: 0.5,
      onUpdate: (self) => {
        const newIndex = Math.min(
          SERVICES.length - 1,
          Math.floor(self.progress * SERVICES.length)
        );
        setActiveIndex(newIndex);
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
    <section className={styles.scene} id="services" aria-label="Repair Services">
      {/* Header */}
      <div className={styles.header}>
        <motion.span className={styles.eyebrow} {...fadeUp(0)}>
          What We Fix
        </motion.span>
        <motion.h2 className={styles.heading} {...fadeUp(0.05)}>
          Complete Mobile Repair Services
        </motion.h2>
        <motion.p className={styles.subtext} {...fadeUp(0.1)}>
          From screen cracks to motherboard surgery — RS Mobile Corner handles every repair. Every job is personally done by Rahim Bhai.
        </motion.p>
      </div>

      {/* Card Deck */}
      <div className={styles.deckContainer} ref={deckRef}>
        <div className={styles.deck}>
          {SERVICES.map((service, i) => {
            const cardStyle = getCardTransform(i, activeIndex);
            const isActive = i === activeIndex;

            return (
              <div
                key={i}
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                style={cardStyle}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`${service.title} - click to view details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                <div className={styles.cardIcon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                {isActive && (
                  <>
                    <p className={styles.cardDescription}>{service.description}</p>
                    <div className={styles.cardFeatures}>
                      {service.features.map((f, j) => (
                        <span key={j} className={styles.featureTag}>{f}</span>
                      ))}
                    </div>
                    <div className={styles.cardTime}>
                      <ClockIcon />
                      <span>{service.time}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className={styles.deckNav} aria-label="Service navigation">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              className={`${styles.deckDot} ${i === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <motion.div className={styles.infoSection} {...fadeUp(0.1)}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Repair Turnaround</h3>
          {REPAIR_TIMES.map((row, i) => (
            <div key={i} className={styles.timeRow}>
              <span className={styles.timeService}>{row.service}</span>
              <span className={styles.timeBadge}>{row.time}</span>
            </div>
          ))}
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Honest Warranty</h3>
          <p className={styles.warrantyNote}>
            No fake promises — just clear, upfront terms.
          </p>
          {WARRANTY.map((w, i) => (
            <div key={i} className={styles.warrantyRow}>
              <span className={styles.warrantyItem}>{w.item}</span>
              <span className={styles.warrantyValue}>{w.warranty}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Accent Bar */}
      <div className={styles.accentBar} aria-hidden="true">
        <div className={styles.accentLine} />
        <span className={styles.accentText}>
          Open All 7 Days · 9:30 AM – 9:30 PM · Emergency Repairs Available
        </span>
        <div className={styles.accentLine} />
      </div>
    </section>
  );
}

/* ── SVG Icons ── */

function DisplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <line x1="22" y1="11" x2="22" y2="13" strokeWidth="2" />
      <line x1="6" y1="12" x2="12" y2="12" />
    </svg>
  );
}

function ChargingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2" />
    </svg>
  );
}

function SoftwareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
