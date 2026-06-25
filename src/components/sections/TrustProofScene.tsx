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
  { value: business.experience, label: 'Years in business' },
  { value: business.repairs, label: 'Repairs completed' },
  { value: '100%', label: 'Personally handled' },
];

export default function TrustProofScene() {
  const reduceMotion = useReducedMotion();
  const runwayRef = useRef<HTMLElement>(null);
  const factRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;
    
    const runway = runwayRef.current;
    if (!runway) return;

    const facts = factRefs.current.filter(Boolean) as HTMLDivElement[];
    
    // Total scroll distance based on number of facts
    const vh = window.innerHeight;
    const totalScrollPx = vh * 1.5;
    runway.style.height = `${Math.round(totalScrollPx + vh)}px`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: runway,
        start: 'top top',
        end: `+=${Math.round(totalScrollPx)}`,
        scrub: 1,
      }
    });

    // Fade out the main statement slightly
    tl.to(statementRef.current, { opacity: 0.2, scale: 0.95, duration: 1 }, 0);

    // Stagger the facts
    facts.forEach((fact, i) => {
      // Fade in and up
      tl.fromTo(fact, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        i * 0.8 // stagger start times
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduceMotion]);

  return (
    <section ref={runwayRef} className={styles.scene} id="proof" aria-label="Proof of Trust">
      <div className={styles.stickyViewport}>
        <div className={styles.inner}>
          
          <div className={styles.statementZone}>
            <span className={styles.eyebrow}>Reputation</span>
            <h2 ref={statementRef} className={styles.statement}>
              Trust isn't claimed.<br />
              <span className={styles.statementAccent}>It's earned.</span>
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
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
