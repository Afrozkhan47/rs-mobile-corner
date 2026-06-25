'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { repairServices } from '@/content/services';
import { LightRays } from '@/components/ui/LightRays/LightRays';
import styles from './ServicesFloatingDeck.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesFloatingDeck() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;
    
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[];
    
    const isDesktop = window.innerWidth >= 900;

    // We want to scrub the opacity of items as they cross the center of the viewport
    items.forEach((item) => {
      // Fade In
      gsap.to(item, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: isDesktop ? 'top 75%' : 'top 60%',
          end: isDesktop ? 'top 50%' : 'top 40%',
          scrub: true,
        },
      });

      // Fade Out (stay bright in the center)
      gsap.to(item, {
        opacity: 0.2,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: isDesktop ? 'top 25%' : 'bottom 40%',
          end: isDesktop ? 'top 5%' : 'bottom 20%',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (items.includes(st.trigger as HTMLLIElement)) {
          st.kill();
        }
      });
    };
  }, [reduceMotion]);

  return (
    <section ref={containerRef} className={styles.scene} id="expertise" aria-label="Repair Expertise">
      <div style={{ position: 'absolute', inset: '10%', zIndex: 0 }}>
        <LightRays
          raysOrigin="center"
          lightSpread={0.5} /* Tighter spread to frame the center */
          rayLength={0.7}   /* Shorter rays so they don't hit the edges */
          style={{ opacity: 0.02, maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}
        />
      </div>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>The Craft</span>
          <h2 className={styles.title}>The Anatomy of a Repair.</h2>
          <p className={styles.lead}>
            No guesses. No quick fixes. Every repair is diagnosed, explained, and executed with precision.
          </p>
        </header>

        <ul ref={listRef} className={styles.indexList}>
          {repairServices.map((service, i) => (
            <li 
              key={service.id} 
              ref={el => { itemsRef.current[i] = el; }}
              className={styles.indexItem}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemNumber}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.itemTitle}>{service.title}</h3>
              </div>
              <p className={styles.itemDesc}>{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
