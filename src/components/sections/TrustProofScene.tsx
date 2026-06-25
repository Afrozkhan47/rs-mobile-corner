'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { business } from '@/content/business';
import styles from './TrustProofScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FACTS = [
  { value: business.experience, label: 'Years of Trust', sub: 'Dedicated mobile repair experience' },
  { value: business.repairs, label: 'Repairs Completed', sub: 'Phones restored at the bench' },
  { value: '100%', label: 'Personally Handled', sub: 'Every device repaired by Rahim Bhai' },
  { value: business.daysOpen, label: 'Weekly Availability', sub: `Open daily: ${business.hours}` },
];

export default function TrustProofScene() {
  const reduceMotion = useReducedMotion();
  const runwayRef = useRef<HTMLElement>(null);
  const factRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;
    
    const section = runwayRef.current;
    if (!section) return;

    const facts = factRefs.current.filter(Boolean) as HTMLDivElement[];
    const statement = statementRef.current;

    // Smooth staggered reveal animation as the section scrolls into view
    const entranceAnim = gsap.fromTo([statement, ...facts],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    return () => {
      entranceAnim.scrollTrigger?.kill();
      entranceAnim.kill();
    };
  }, [reduceMotion]);

  return (
    <section ref={runwayRef} className={styles.scene} id="proof" aria-label="Proof of Trust">
      <div className={styles.inner}>
        
        <div className={styles.statementZone}>
          <span className={styles.eyebrow}>Reputation</span>
          <h2 ref={statementRef} className={styles.statement}>
            Trust isn&apos;t claimed.<br />
            <span className={styles.statementAccent}>It&apos;s earned.</span>
          </h2>
        </div>

        <div className={styles.factsZone} aria-live="polite">
          {FACTS.map((fact, i) => (
            <div 
              key={fact.label}
              ref={el => { factRefs.current[i] = el; }}
              className={styles.factCard}
            >
              <span className={styles.factValue}>{fact.value}</span>
              <span className={styles.factLabel}>{fact.label}</span>
              <span className={styles.factSub}>{fact.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
