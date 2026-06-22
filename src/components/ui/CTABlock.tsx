'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CTABlock.module.css';

interface CTAAction {
  label: string;
  href: string;
  id: string;
  icon?: React.ReactNode;
}

interface CTABlockProps {
  heading: string;
  description: string;
  actions: CTAAction[];
  meta?: Array<{ label: string; value: string }>;
}

export default function CTABlock({ heading, description, actions, meta }: CTABlockProps) {
  return (
    <div className={styles.block}>
      {/* Background decorative arrow */}
      <div className={styles.bgDecor} aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M7 7l10 10M17 7v10H7" />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>

          {meta && (
            <div className={styles.metaGrid}>
              {meta.map((item, i) => (
                <div key={i} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{item.label}</span>
                  <span className={styles.metaValue}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.right}>
          {actions.map((action) => (
            <motion.a
              key={action.id}
              href={action.href}
              id={action.id}
              className={styles.actionRow}
              whileHover={{ backgroundColor: 'var(--color-white-100)', color: 'var(--color-black-950)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.actionLabel}>{action.label}</span>
              <motion.span
                className={styles.actionIcon}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {action.icon ?? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
