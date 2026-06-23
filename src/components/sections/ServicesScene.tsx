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
    id: 'display',
    icon: <DisplayIcon />,
    title: 'Display & Screen',
    description:
      'Original and A-Grade display replacements for iPhone, Samsung, and all major brands. Clear, bright, and responsive.',
    features: ['Original OEM Displays', 'A-Grade Quality Panels', 'Face Unlock Compatible'],
    time: '≈ 15 Min',
    warranty: 'Up to 6 Months Warranty',
  },
  {
    id: 'battery',
    icon: <BatteryIcon />,
    title: 'Battery Renewal',
    description:
      "Genuine battery cells with premium health monitoring. Restore your phone's full day battery life quickly and safely.",
    features: ['Original Capacity Cells', 'Health Stats Verified', 'Overcharge Protection'],
    time: '≈ 15 Min',
    warranty: '3 Months Replacement Warranty',
  },
  {
    id: 'charging',
    icon: <ChargingIcon />,
    title: 'Charging Port',
    description:
      'From simple charging port lint cleaning to Charging IC and micro-soldering level repair.',
    features: ['Port Cleaning & Repair', 'Charging IC Replacements', 'Type-C & Lightning Jacks'],
    time: '≈ 15 Min',
    warranty: '3 Months Warranty',
  },
  {
    id: 'motherboard',
    icon: <BoardIcon />,
    title: 'Motherboard Surgery',
    description:
      'Complex micro-soldering repairs including dead phone recovery, network IC swap, and CPU reballing.',
    features: ['Micro-Soldering Support', 'Network IC Swap', 'Dead Device Recovery'],
    time: '≈ 1 Hour+',
    warranty: 'Diagnosed Case-by-Case',
  },
  {
    id: 'camera',
    icon: <CameraIcon />,
    title: 'Camera & Sensors',
    description:
      'Replacing cracked camera glass lenses, fixing autofocus failures, and restoring front sensor functions.',
    features: ['Camera Lens Replacement', 'Autofocus Recovery', 'Face ID Swaps'],
    time: '≈ 30 Min',
    warranty: '3 Months Warranty',
  },
  {
    id: 'software',
    icon: <SoftwareIcon />,
    title: 'Software & Flash',
    description:
      'Fixing boot loops, bricked firmware issues, unlocking, and performing secure memory backup.',
    features: ['Firmware Flash', 'Boot Loop Fix', 'Secure Backup attempts'],
    time: '≈ 45 Min',
    warranty: 'Software support included',
  },
  {
    id: 'water',
    icon: <WaterIcon />,
    title: 'Water Damage',
    description:
      'Ultrasonic bath component-level cleaning, corrosion removal, and power circuit diagnostic recovery.',
    features: ['Ultrasonic Cleaning', 'Corrosion Shielding', 'Short Circuit Diagnosis'],
    time: '≈ 2 Hours+',
    warranty: 'Restoration assurance',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesScene() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Dynamic poker card fan layout styling
  const getCardTransform = (index: number, active: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return {}; // Handled by CSS flex layout on mobile
    }

    const total = SERVICES.length;
    const isActive = index === active;
    const offset = index - active;
    const absOffset = Math.abs(offset);

    if (isActive) {
      return {
        transform: 'translateX(0) translateY(-40px) rotate(0deg) scale(1.15)',
        zIndex: 40,
        opacity: 1,
      };
    }

    const direction = offset > 0 ? 1 : -1;
    const translateX = direction * (70 + absOffset * 50) + (index - (total - 1) / 2) * 12;
    const translateY = absOffset * 15;
    const rotate = (index - (total - 1) / 2) * 5 + direction * 4;
    const scale = 1 - absOffset * 0.06;
    const opacity = Math.max(0.3, 1 - absOffset * 0.2);

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
      zIndex: 30 - absOffset,
      opacity,
    };
  };

  // Pinned section to scroll-scrub services active state
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

    const scrollHeight = window.innerHeight * 1.2 * SERVICES.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollHeight}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(
            SERVICES.length - 1,
            Math.floor(self.progress * SERVICES.length)
          );
          setActiveIndex(index);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className={styles.scene} id="services" aria-label="Repair Services">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Services</span>
          <h2 className={styles.heading}>The Stack Repair Deck</h2>
          <p className={styles.subtext}>
            Tap or scroll to examine Rahim Bhai&apos;s primary specialties.
          </p>
        </div>

        {/* Fanned Poker stacked card deck */}
        <div ref={deckRef} className={styles.deck}>
          {SERVICES.map((service, i) => {
            const isActive = i === activeIndex;
            const cardStyle = getCardTransform(i, activeIndex);

            return (
              <div
                key={service.id}
                className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                style={cardStyle}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>{service.icon}</div>
                  <span className={styles.index}>0{i + 1}</span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                </div>

                {/* Details revealed on active promotion */}
                <div className={styles.cardFooter}>
                  <div className={styles.tagWrap}>
                    {service.features.map((feature, idx) => (
                      <span key={idx} className={styles.tag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <ClockIcon />
                      <span>{service.time}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <ShieldIcon />
                      <span>{service.warranty}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Indicator Dots */}
        <div className={styles.dotsWrap} aria-label="Services Navigation">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to service chapter ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Custom SVGs ── */

function DisplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <line x1="22" y1="11" x2="22" y2="13" strokeWidth="2" />
    </svg>
  );
}

function ChargingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 18H19M12 4V14M12 14L9 11M12 14L15 11" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
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

function SoftwareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
