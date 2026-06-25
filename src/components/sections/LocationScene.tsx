'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { business } from '@/content/business';
import styles from './LocationScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;
    
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // A slow, dramatic fade-up for the final destination
    gsap.fromTo(content, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className={styles.scene} id="location" aria-label="Location and Contact">
      <div ref={contentRef} className={styles.inner}>
        
        <div className={styles.topSection}>
          <h2 className={styles.heading}>The Workshop.</h2>
          <p className={styles.lead}>Where repairs happen.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.addressBlock}>
            <span className={styles.label}>Location</span>
            <address className={styles.value}>
              {business.location.split(',').map((line, i) => (
                <span key={i} className={styles.addressLine}>{line.trim()}{i < 2 ? ',' : ''}</span>
              ))}
            </address>
            <a className={styles.mapLink} href={business.mapsUrl} target="_blank" rel="noreferrer noopener">
              Open in Maps
            </a>
          </div>

          <div className={styles.hoursBlock}>
            <span className={styles.label}>Hours</span>
            <p className={styles.value}>{business.hours}</p>
            <p className={styles.subValue}>Open {business.daysOpen}</p>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h3 className={styles.ctaHeading}>Need a repair?</h3>
          <div className={styles.actions}>
            <a href={`tel:${business.phone}`} className={styles.primaryAction}>
              Call {business.phoneDisplay}
            </a>
            <a href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`} className={styles.secondaryAction} target="_blank" rel="noreferrer noopener">
              Message Rahim Bhai
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
