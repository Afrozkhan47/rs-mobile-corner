'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import styles from './AccessoriesScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCESSORIES = [
  {
    name: 'Tempered Glass',
    detail: 'Full-cover protection. Applied in-shop, bubble-free.',
  },
  {
    name: 'Mobile Covers',
    detail: 'Slim, rugged, and designed for the model you carry.',
  },
  {
    name: 'Fast Chargers',
    detail: 'Certified adapters. No cheap knockoffs.',
  },
  {
    name: 'Type-C Cables',
    detail: 'Braided. Tested. Built for daily use.',
  },
  {
    name: 'Lightning Cables',
    detail: 'MFi-grade cables for Apple devices.',
  },
  {
    name: 'Earbuds',
    detail: 'Wired and wireless. Clear sound, real price.',
  },
  {
    name: 'Neckbands',
    detail: 'All-day wear. Reliable Bluetooth. No nonsense.',
  },
  {
    name: 'Power Banks',
    detail: 'Compact and high-capacity. For long days.',
  },
  {
    name: 'Bluetooth Speakers',
    detail: 'Portable audio that actually sounds good.',
  },
  {
    name: 'Memory Cards',
    detail: 'Class 10. Fast write speeds. Multiple sizes.',
  },
];

export default function AccessoriesScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || reduceMotion) return;

    const header = headerRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLLIElement[];

    if (header) {
      gsap.fromTo(
        header.children,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
          },
        }
      );
    }

    items.forEach((item) => {
      // Subtle reveal for each row
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%', // triggers just as it enters viewport
          },
        }
      );

      // Scroll-driven active state (Golden color & animation when crossing exact center)
      ScrollTrigger.create({
        trigger: item,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleClass: styles.indexItemActive,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (header && st.trigger === header) st.kill();
        if (items.includes(st.trigger as HTMLLIElement)) st.kill();
      });
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.scene}
      id="accessories"
      aria-label="Curated Accessories"
    >
      <div className={styles.inner}>
        
        {/* Sticky Sidebar on Desktop */}
        <div className={styles.stickyColumn}>
          <header ref={headerRef} className={styles.header}>
            <span className={styles.eyebrow}>In Stock · Dighi</span>
            <h2 className={styles.heading}>
              The right tool<br />
              <em>for the right phone.</em>
            </h2>
            <p className={styles.subtext}>
              Everything stocked here is tested by Rahim Bhai before it goes on the shelf. No grey-market imports. No inflated prices.
            </p>
          </header>
        </div>

        {/* Scrolling Typographic Index */}
        <div className={styles.scrollColumn}>
          <ul className={styles.indexList}>
            {ACCESSORIES.map((item, i) => (
              <li
                key={item.name}
                ref={el => { itemsRef.current[i] = el; }}
                className={styles.indexItem}
              >
                <div className={styles.itemContent}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDetail}>{item.detail}</p>
                </div>
                <div className={styles.itemHoverGlow} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}
