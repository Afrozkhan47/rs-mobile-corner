'use client';

import React from 'react';
import Image from 'next/image';
import Section from '@/components/layout/Section';
import ScrollReveal from '@/components/animation/ScrollReveal';
import styles from './GalleryScene.module.css';

export default function GalleryScene() {
  return (
    <Section id="gallery" variant="deep">
      <div className={styles.inner}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Inside the Shop</span>
            <h2 className={styles.heading}>
              The Work Speaks for Itself.
            </h2>
            <p className={styles.subtext}>
              Real repairs. Real workspace. Real results.
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className={styles.masonryGrid}>
          {/* Tall portrait — workstation */}
          <ScrollReveal direction="up" delay={0.0} className={styles.item} style={{ gridRow: 'span 2' }}>
            <div className={styles.galleryImage} style={{ height: '100%' }}>
              <Image
                src="/gallery-workstation.png"
                alt="RS Mobile Corner repair workstation"
                fill
                className={styles.galleryPhoto}
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              <span className={styles.galleryLabel}>Repair Workspace</span>
            </div>
          </ScrollReveal>

          {/* Customer Satisfaction card */}
          <ScrollReveal direction="up" delay={0.08} className={styles.item}>
            <div className={styles.satisfactionCard}>
              <div className={styles.satisfactionStars}>
                {'★★★★★'}
              </div>
              <blockquote className={styles.satisfactionQuote}>
                &ldquo;RS Mobile Corner is known across Dighi for honest repairs and transparent service. RBS treats every device as if it were his own.&rdquo;
              </blockquote>
              <footer className={styles.satisfactionFooter}>
                <div className={styles.satisfactionDot} />
                <span>Local Community Trust — Dighi, Pune</span>
              </footer>
            </div>
          </ScrollReveal>

          {/* Wide landscape — tools */}
          <ScrollReveal direction="up" delay={0.12} className={styles.item}>
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
          </ScrollReveal>

          {/* Screen repair */}
          <ScrollReveal direction="up" delay={0.16} className={styles.item}>
            <div className={styles.galleryImage}>
              <Image
                src="/gallery-screen.png"
                alt="Phone display being replaced at RS Mobile Corner"
                fill
                className={styles.galleryPhoto}
                sizes="(max-width: 768px) 90vw, 20vw"
              />
              <span className={styles.galleryLabel}>Display Work</span>
            </div>
          </ScrollReveal>

          {/* Privacy trust card */}
          <ScrollReveal direction="up" delay={0.2} className={styles.item}>
            <div className={styles.privacyCard}>
              <div className={styles.privacyIcon}>🔒</div>
              <h3 className={styles.privacyTitle}>Your Privacy is Respected</h3>
              <p className={styles.privacyText}>
                Your passwords and personal data remain confidential. Rahim Bhai never accesses customer data intentionally. For software repairs, you&rsquo;re always informed about potential data risks beforehand.
              </p>
              <p className={styles.privacySmall}>
                Repairs are performed responsibly and transparently.
              </p>
            </div>
          </ScrollReveal>

          {/* Soldering */}
          <ScrollReveal direction="up" delay={0.24} className={styles.item}>
            <div className={styles.galleryImage}>
              <Image
                src="/gallery-soldering.png"
                alt="IC component soldering on smartphone motherboard"
                fill
                className={styles.galleryPhoto}
                sizes="(max-width: 768px) 90vw, 20vw"
              />
              <span className={styles.galleryLabel}>Component Repair</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Google Reviews CTA */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.reviewsCta}>
            <div className={styles.reviewsLeft}>
              <span className={styles.reviewsStars}>★★★★★</span>
              <h3 className={styles.reviewsTitle}>Trusted by Dighi Locals</h3>
              <p className={styles.reviewsText}>
                RS Mobile Corner has built a loyal customer base through honest service and consistent quality. Check our Google Reviews for real customer experiences.
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/3s1sDQeMnLWmcfJB7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviewsBtn}
              id="gallery-google-reviews"
            >
              View on Google Maps
            </a>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
