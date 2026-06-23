'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { business } from '@/content/business';
import styles from './ServicesScene.module.css';

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: 'display',
    title: 'Display Repair',
    description: 'A-Grade display replacements for iPhone & Samsung. Bright, responsive, and durable.',
    time: '30–60 min',
    warranty: '6 Months Warranty',
    illustration: 'display',
  },
  {
    id: 'battery',
    title: 'Battery Renewal',
    description: 'Original capacity battery cells with stable charging control and warranty checks.',
    time: '15–30 min',
    warranty: '3 Months Warranty',
    illustration: 'battery',
  },
  {
    id: 'charging',
    title: 'Charging Port',
    description: 'Restoring jack connectivity, micro-cleaning, and IC swap soldering fixes.',
    time: '15–45 min',
    warranty: '3 Months Warranty',
    illustration: 'charging',
  },
  {
    id: 'motherboard',
    title: 'Motherboard',
    description: 'Complex micro-soldering motherboard recovery, chips, and dead swap.',
    time: '1–3 Hours',
    warranty: 'Case-by-Case Warranty',
    illustration: 'board',
  },
  {
    id: 'camera',
    title: 'Camera Repair',
    description: 'Replacing cracked lenses, autofocus sensors, and front camera module chips.',
    time: '30–45 min',
    warranty: '3 Months Warranty',
    illustration: 'camera',
  },
  {
    id: 'software',
    title: 'Software Repair',
    description: 'Bootloop flash recovery, system updates, locks, and recovery backup.',
    time: '30–60 min',
    warranty: 'System restoration',
    illustration: 'software',
  },
  {
    id: 'water',
    title: 'Water Damage',
    description: 'Ultrasonic bath deep cleaning, circuit dry diagnostic, and corrosion shields.',
    time: '2–4 Hours',
    warranty: 'Diagnostic assurance',
    illustration: 'water',
  },
];

export default function ServicesScene() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile Touch Swipe Handlers
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
      setActiveIndex((prev) => Math.min(prev + 1, SERVICES.length - 1));
    } else if (diff < -50) {
      // Swipe Right - Prev Card
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Scroll Trigger mapping for desktop
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) return;

    const scrollHeight = window.innerHeight * 1.4 * SERVICES.length;

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

  // Card transform math: promoted active on left, inactive fanned cabinet-style to right
  const getCardStyle = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return {}; // Handled by CSS on mobile
    }

    const isActive = index === activeIndex;

    if (isActive) {
      return {
        transform: 'translate3d(0, 0, 0) scale(1.05)',
        zIndex: 50,
        opacity: 1,
      };
    }

    // Inactive fanned positions to the right
    // Arrange in order:
    let displayIndex = index;
    if (index < activeIndex) {
      displayIndex = index + SERVICES.length;
    }
    const relativeOrder = displayIndex - activeIndex;

    const x = 380 + relativeOrder * 42;
    const zIndex = 40 - relativeOrder;
    const opacity = Math.max(0.4, 0.95 - relativeOrder * 0.1);

    return {
      transform: `translate3d(${x}px, 20px, 0) scale(0.96)`,
      zIndex,
      opacity,
    };
  };

  return (
    <section ref={sectionRef} className={styles.scene} id="services" aria-label="Repair Services">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Specialties</span>
          <h2 className={styles.heading}>Interactive Repair Deck</h2>
        </div>

        {/* Fanned Cabinet Deck */}
        <div
          ref={deckRef}
          className={styles.deck}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {SERVICES.map((service, i) => {
            const isActive = i === activeIndex;
            const cardStyle = getCardStyle(i);

            return (
              <div
                key={service.id}
                className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
                style={cardStyle}
                onClick={() => setActiveIndex(i)}
              >
                {/* Vertical title on card edge for inactive cards (spine tab) */}
                <div className={styles.verticalTab} aria-hidden={isActive ? 'true' : 'false'}>
                  <span>{service.title}</span>
                </div>

                {/* Normal Card Face (only rendered / fully visible when active) */}
                <div className={styles.cardFace}>
                  <div className={styles.cardHeader}>
                    <span className={styles.index}>0{i + 1}</span>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.cardDesc}>{service.description}</p>
                    
                    {/* Visual Schematic illustration */}
                    <div className={styles.schematicWrap}>
                      {service.illustration === 'display' && <DisplaySchematic />}
                      {service.illustration === 'battery' && <BatterySchematic />}
                      {service.illustration === 'charging' && <ChargingSchematic />}
                      {service.illustration === 'board' && <BoardSchematic />}
                      {service.illustration === 'camera' && <CameraSchematic />}
                      {service.illustration === 'software' && <SoftwareSchematic />}
                      {service.illustration === 'water' && <WaterSchematic />}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.meta}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Time</span>
                        <span className={styles.metaVal}>{service.time}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Warranty</span>
                        <span className={styles.metaVal}>{service.warranty}</span>
                      </div>
                    </div>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                    >
                      Book Repair
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile carousel page indicator */}
        <div className={styles.pageIndicator} aria-hidden="true">
          <span>{activeIndex + 1} / {SERVICES.length}</span>
        </div>
      </div>
    </section>
  );
}

/* ── High-Fidelity SVG Repair Schematics ── */

function DisplaySchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      <rect x="10" y="10" width="120" height="160" rx="12" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Notch */}
      <rect x="50" y="10" width="40" height="8" rx="4" fill="var(--color-amber)" />
      {/* Screen cracks */}
      <path d="M 20,40 L 60,100 L 120,70 M 60,100 L 90,140 M 60,100 L 30,150" stroke="rgba(201, 169, 97, 0.4)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="60" cy="100" r="3" fill="var(--color-amber)" />
    </svg>
  );
}

function BatterySchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      <rect x="35" y="30" width="70" height="120" rx="8" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      <rect x="55" y="22" width="30" height="8" rx="2" fill="var(--color-amber)" />
      {/* Charge level lines */}
      <rect x="45" y="110" width="50" height="30" rx="2" fill="var(--color-amber)" opacity="0.8" />
      <rect x="45" y="75" width="50" height="30" rx="2" fill="var(--color-amber)" opacity="0.4" />
      {/* Lightning bolt */}
      <path d="M 70,55 L 60,85 L 80,85 L 70,115" stroke="var(--color-amber)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function ChargingSchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      <rect x="10" y="10" width="120" height="160" rx="12" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" opacity="0.3" />
      {/* Charging Port Zoom */}
      <circle cx="70" cy="150" r="22" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Type C jack */}
      <rect x="58" y="145" width="24" height="10" rx="3" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      <line x1="63" y1="150" x2="77" y2="150" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Lightning wires */}
      <path d="M 70,110 L 70,128 M 70,110 L 50,90 M 70,110 L 90,90" stroke="var(--color-amber)" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

function BoardSchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      <rect x="15" y="15" width="110" height="150" rx="6" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* CPU Chip */}
      <rect x="50" y="70" width="40" height="40" rx="4" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      <text x="58" y="94" fontFamily="sans-serif" fontSize="9" fill="var(--color-amber)" fontWeight="bold">CPU</text>
      {/* Pins and circuit lines */}
      <path d="M 30,30 L 50,30 M 30,50 L 50,50 M 90,30 L 110,30 M 90,50 L 110,50 M 70,30 L 70,70 M 70,110 L 70,150 M 50,90 L 25,90 M 90,90 L 115,90" stroke="var(--color-amber)" strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="2" fill="var(--color-amber)" />
      <circle cx="110" cy="30" r="2" fill="var(--color-amber)" />
    </svg>
  );
}

function CameraSchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      {/* Camera Module */}
      <rect x="35" y="40" width="70" height="100" rx="10" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Lenses */}
      <circle cx="70" cy="65" r="16" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      <circle cx="70" cy="65" r="8" fill="none" stroke="var(--color-amber)" strokeWidth="1" />
      <circle cx="70" cy="110" r="12" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Aperture lines */}
      <line x1="58" y1="53" x2="82" y2="77" stroke="var(--color-amber)" strokeWidth="1" opacity="0.6" />
      <line x1="82" y1="53" x2="58" y2="77" stroke="var(--color-amber)" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function SoftwareSchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      <rect x="15" y="30" width="110" height="120" rx="8" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Code window bar */}
      <line x1="15" y1="50" x2="125" y2="50" stroke="var(--color-amber)" strokeWidth="1.2" />
      <circle cx="27" cy="40" r="2" fill="var(--color-amber)" />
      <circle cx="35" cy="40" r="2" fill="var(--color-amber)" />
      {/* Code lines */}
      <text x="25" y="75" fontFamily="monospace" fontSize="10" fill="var(--color-amber)" opacity="0.9">{`class Device {`}</text>
      <text x="35" y="95" fontFamily="monospace" fontSize="10" fill="var(--color-amber)" opacity="0.9">{`restore() {`}</text>
      <text x="45" y="115" fontFamily="monospace" fontSize="10" fill="var(--color-amber)" opacity="0.6">{`flash(firmware);`}</text>
      <text x="35" y="135" fontFamily="monospace" fontSize="10" fill="var(--color-amber)" opacity="0.9">{`}`}</text>
    </svg>
  );
}

function WaterSchematic() {
  return (
    <svg viewBox="0 0 140 180" className={styles.schematic}>
      {/* Droplet */}
      <path d="M 70,30 C 70,30 100,75 100,95 C 100,111.5 86.5,125 70,125 C 53.5,125 40,111.5 40,95 C 40,75 70,30 70,30 Z" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
      {/* Diagnostic ripple waves */}
      <path d="M 30,150 Q 70,135 110,150" fill="none" stroke="var(--color-amber)" strokeWidth="1.2" opacity="0.8" />
      <path d="M 20,162 Q 70,147 120,162" fill="none" stroke="var(--color-amber)" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}
