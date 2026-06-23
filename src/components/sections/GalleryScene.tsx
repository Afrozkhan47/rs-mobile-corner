'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import Section from '@/components/layout/Section';
import TiltCard from '@/components/ui/TiltCard';
import styles from './GalleryScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryScene() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion || typeof window === 'undefined') return;

    const images = container.querySelectorAll(`.${styles.galleryImage}`);
    images.forEach((el) => {
      const img = el.querySelector(`.${styles.galleryPhoto}`);
      if (!img) return;

      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }, [reduceMotion]);

  return (
    <Section id="gallery" variant="deep">
      <div ref={containerRef} className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Inside the Shop</span>
          <h2 className={styles.heading}>The Work Speaks for Itself.</h2>
          <p className={styles.subtext}>
            Real repairs. Real workspace. Real results.
          </p>
        </div>

        {/* Masonry Asymmetrical Collage Grid */}
        <div className={styles.masonryGrid}>
          {/* Workstation */}
          <div className={`${styles.item} ${styles.itemWorkstation}`}>
            <TiltCard maxTilt={4} className={styles.cardTilt}>
              <div className={styles.galleryImage}>
                <Image
                  src="/gallery-workstation.png"
                  alt="RS Mobile Corner repair workstation"
                  fill
                  className={styles.galleryPhoto}
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
                <span className={styles.galleryLabel}>Repair Workspace</span>
              </div>
            </TiltCard>
          </div>

          {/* Testimonial Quote */}
          <div className={`${styles.item} ${styles.itemSatisfaction}`}>
            <div className={styles.satisfactionCard}>
              <div className={styles.satisfactionStars}>★★★★★</div>
              <blockquote className={styles.satisfactionQuote}>
                &ldquo;RS Mobile Corner is known across Dighi for honest repairs and transparent service. RBS treats every device as if it were his own.&rdquo;
              </blockquote>
              <footer className={styles.satisfactionFooter}>
                <div className={styles.satisfactionDot} />
                <span>Local Community Trust — Dighi, Pune</span>
              </footer>
            </div>
          </div>

          {/* Tools */}
          <div className={`${styles.item} ${styles.itemTools}`}>
            <TiltCard maxTilt={4} className={styles.cardTilt}>
              <div className={styles.galleryImage}>
                <Image
                  src="/gallery-tools.png"
                  alt="Precision mobile repair tools at RS Mobile Corner"
                  fill
                  className={styles.galleryPhoto}
                  sizes="(max-width: 768px) 90vw, 25vw"
                />
                <span className={styles.galleryLabel}>Precision Tools</span>
              </div>
            </TiltCard>
          </div>

          {/* Screen Repair */}
          <div className={`${styles.item} ${styles.itemScreen}`}>
            <TiltCard maxTilt={4} className={styles.cardTilt}>
              <div className={styles.galleryImage}>
                <Image
                  src="/gallery-screen.png"
                  alt="Phone display being replaced at RS Mobile Corner"
                  fill
                  className={styles.galleryPhoto}
                  sizes="(max-width: 768px) 90vw, 25vw"
                />
                <span className={styles.galleryLabel}>Display Work</span>
              </div>
            </TiltCard>
          </div>

          {/* Privacy Card */}
          <div className={`${styles.item} ${styles.itemPrivacy}`}>
            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🔒</div>
              <h3 className={styles.privacyTitle}>Your Privacy is Respected</h3>
              <p className={styles.privacyText}>
                Your passwords and personal data remain confidential. Rahim Bhai never accesses customer data. For software repairs, you&rsquo;re always informed about potential data risks beforehand.
              </p>
              <p className={styles.privacySmall}>
                Repairs are performed responsibly and transparently.
              </p>
            </div>
          </div>

          {/* Soldering */}
          <div className={`${styles.item} ${styles.itemSoldering}`}>
            <TiltCard maxTilt={4} className={styles.cardTilt}>
              <div className={styles.galleryImage}>
                <Image
                  src="/gallery-soldering.png"
                  alt="Micro soldering mobile repair at RS Mobile Corner"
                  fill
                  className={styles.galleryPhoto}
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
                <span className={styles.galleryLabel}>Motherboard Micro-Soldering</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </Section>
  );
}
