'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './WorkshopScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const REPAIR_STEPS = [
  {
    number: '01',
    title: 'Diagnosis',
    description:
      'Every repair starts with a thorough diagnosis. Rahim Bhai examines your device, identifies all issues, and explains everything transparently before starting any work.',
    icon: '🔍',
    image: null,
  },
  {
    number: '02',
    title: 'Opening the Device',
    description:
      'Using precision tools, the device is carefully opened in a clean workspace. Every screw and component is organized to ensure nothing is missed during reassembly.',
    icon: '🔧',
    image: '/gallery-tools.png',
  },
  {
    number: '03',
    title: 'Replacing Components',
    description:
      'Damaged components are replaced with original or A-grade quality parts. From display panels to IC chips — each replacement is done with surgical precision.',
    icon: '⚙️',
    image: '/gallery-soldering.png',
  },
  {
    number: '04',
    title: 'Testing',
    description:
      'After repair, the device undergoes rigorous testing — display touch, battery, charging, cameras, speakers, and all sensors are verified before handover.',
    icon: '✅',
    image: '/gallery-screen.png',
  },
  {
    number: '05',
    title: 'Cleaning',
    description:
      'The device is thoroughly cleaned inside and out. Dust, fingerprints, and any residue from the repair process are carefully removed.',
    icon: '✨',
    image: null,
  },
  {
    number: '06',
    title: 'Delivery',
    description:
      'Your device is returned looking and working like new. Rahim Bhai walks you through the repair, explains what was done, and answers any questions.',
    icon: '📱',
    image: '/gallery-workstation.png',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const viewOnce = { once: true, amount: 0.2 as const };

export default function WorkshopScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Horizontal scroll pinning (desktop only)
  useEffect(() => {
    if (reduceMotion || isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newStep = Math.min(
              REPAIR_STEPS.length - 1,
              Math.floor(self.progress * REPAIR_STEPS.length)
            );
            setActiveStep(newStep);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion, isMobile]);

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
    <section ref={sectionRef} className={styles.scene} id="workshop" aria-label="Repair Process">
      {/* Header */}
      <div className={styles.header}>
        <motion.span className={styles.eyebrow} {...fadeUp(0)}>
          The Process
        </motion.span>
        <motion.h2 className={styles.heading} {...fadeUp(0.05)}>
          How we repair your device.
        </motion.h2>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className={styles.track}>
        {REPAIR_STEPS.map((step, i) => (
          <motion.div
            key={i}
            className={styles.step}
            {...(isMobile ? fadeUp(i * 0.05) : {})}
          >
            <div className={styles.stepInner}>
              <div className={styles.stepContent}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
              <div className={styles.stepVisual}>
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className={styles.stepImage}
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                ) : (
                  <div className={styles.stepIconFallback} aria-hidden="true">
                    {step.icon}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicators */}
      {!isMobile && (
        <div className={styles.progressContainer} aria-label="Repair step progress">
          {REPAIR_STEPS.map((_, i) => (
            <button
              key={i}
              className={`${styles.progressStep} ${i === activeStep ? styles.activeStep : ''}`}
              aria-label={`Step ${i + 1}: ${REPAIR_STEPS[i].title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
