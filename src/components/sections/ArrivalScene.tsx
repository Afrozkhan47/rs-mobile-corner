'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { business } from '@/content/business';
import { LightRays } from '@/components/ui/LightRays/LightRays';
import styles from './ArrivalScene.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArrivalScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text || reduceMotion || !mounted) return;

    // Subtle parallax and scale on the image as user scrolls down
    const imageTween = gsap.fromTo(image,
      {
        yPercent: 0,
        scale: 1.1,
      },
      {
        yPercent: 15, // Move down slightly slower than scroll
        scale: 1.15, // Slight zoom
        force3D: true, // Keep on GPU compositor layer during tween
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Fade and move text up as user scrolls
    const textTween = gsap.to(text, {
      y: -50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      imageTween.scrollTrigger?.kill();
      imageTween.kill();
      textTween.scrollTrigger?.kill();
      textTween.kill();
    };
  }, [reduceMotion, mounted]);

  return (
    <section ref={sectionRef} className={styles.arrival} id="home" aria-label={`Welcome to ${business.name}`}>
      <div className={styles.imageContainer}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#F5F5F2"
          raysSpeed={0.18}
          lightSpread={0.35}
          rayLength={0.9}
          pulsating={false}
          fadeDistance={2.0}
          saturation={0.15}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.015}
          distortion={0.005}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <Image
          ref={imageRef}
          src="/founder.jpg"
          alt={`${business.founder} at the workbench`}
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
        />
      </div>

      <div ref={textRef} className={styles.textContent}>
        <div className={styles.titleGroup}>
          <span className={styles.eyebrow}>Since {business.established} · Dighi</span>
          <h1 className={styles.headline}>
            Rahim Bhai.
            <span className={styles.headlineSub}>Master Craftsman.</span>
          </h1>
        </div>
        <p className={styles.lead}>
          Every phone deserves a second life.
        </p>

      </div>
    </section>
  );
}
