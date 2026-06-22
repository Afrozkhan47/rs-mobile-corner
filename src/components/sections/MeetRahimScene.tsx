'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { business } from '@/content/business';
import { meetRahimContent } from '@/content/story';
import styles from './MeetRahimScene.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

const viewOnce = { once: true, amount: 0.35 as const };

export default function MeetRahimScene() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: viewOnce,
          transition: { duration: 0.64, ease: EASE, delay },
        };

  return (
    <section className={styles.section} id="meet-rahim" aria-label="Meet Rahim Bhai">
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div className={styles.statsEditorial} aria-label="Experience and trust" {...fadeUp(0)}>
          {meetRahimContent.credentials.map((item, i) => (
            <motion.div
              key={item.label}
              className={styles.stat}
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 28 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: viewOnce,
                    transition: { duration: 0.72, ease: EASE, delay: 0.06 + i * 0.08 },
                  })}
            >
              <span className={styles.statValue}>{item.value}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.heroRow}>
          <motion.div className={styles.portraitWrap} {...fadeUp(0.1)}>
            <Image
              src="/founder.jpg"
              alt={`${business.founder} — ${business.name}`}
              fill
              className={styles.portraitImage}
              sizes="(max-width: 768px) 82vw, 36vw"
            />
          </motion.div>

          <motion.div className={styles.identity} {...fadeUp(0.18)}>
            <ScrollFloat className={styles.nameFloat} strength={10}>
              <h2 className={styles.name}>{business.founder}</h2>
            </ScrollFloat>
            <p className={styles.role}>{meetRahimContent.role}</p>
            <p className={styles.humanLine}>{meetRahimContent.humanLine}</p>
          </motion.div>
        </div>

        <div className={styles.bottomRow}>
          <motion.ol
            className={styles.timeline}
            aria-label="Rahim Bhai's journey"
            {...fadeUp(0.12)}
          >
            {meetRahimContent.timeline.map((step, i) => (
              <motion.li
                key={step}
                className={styles.timelineItem}
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 8 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: viewOnce,
                      transition: { duration: 0.48, ease: EASE, delay: 0.2 + i * 0.05 },
                    })}
              >
                <span className={styles.timelineWord}>{step}</span>
                {i < meetRahimContent.timeline.length - 1 && (
                  <span className={styles.timelineArrow} aria-hidden="true">
                    →
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>

          <motion.div className={styles.workshopAccent} {...fadeUp(0.22)}>
            <Image
              src="/gallery-tools.png"
              alt="Precision repair tools at RS Mobile Corner"
              fill
              className={styles.workshopImage}
              sizes="(max-width: 768px) 240px, 200px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
