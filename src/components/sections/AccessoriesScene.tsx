'use client';

import React from 'react';
import Section from '@/components/layout/Section';
import { motion } from 'framer-motion';
import styles from './AccessoriesScene.module.css';

const CATEGORIES = [
  {
    emoji: '🔌',
    label: 'Chargers & Power',
    items: ['Fast Chargers', 'Type-C Power Delivery', 'Lightning Cables', 'Power Banks', 'Wireless Pads'],
  },
  {
    emoji: '🛡️',
    label: 'Shield Protection',
    items: ['Tempered Glass', 'Frosted Back Covers', 'Privacy Protectors', 'Camera Glass Seals'],
  },
  {
    emoji: '🎧',
    label: 'Premium Audio',
    items: ['Hi-Fi Earbuds', 'Noise Neckbands', 'Mini Bluetooth Speakers'],
  },
  {
    emoji: '💾',
    label: 'Storage & Mounts',
    items: ['Memory Cards', 'High-Speed Pen Drives', 'Magnetic Car Mounts'],
  },
];

const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Realme', 'Boat', 'JBL', 'Noise', 'Ambrane'];

export default function AccessoriesScene() {
  return (
    <Section variant="default" id="accessories">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Selected Stock</span>
          <h2 className={styles.heading}>The Premium Accessories Shelves</h2>
          <p className={styles.subtext}>
            Personally curated, high-quality accessories from top-tier brands.
          </p>
        </div>

        {/* Visual Shelving Layout */}
        <div className={styles.shelfGrid}>
          {CATEGORIES.map((cat, i) => (
            <div key={i} className={styles.shelfUnit}>
              <div className={styles.shelfInfo}>
                <span className={styles.shelfEmoji}>{cat.emoji}</span>
                <h3 className={styles.shelfTitle}>{cat.label}</h3>
              </div>

              {/* Wooden-textured/Amber minimal shelf line */}
              <div className={styles.shelfDisplay}>
                <div className={styles.itemsRow}>
                  {cat.items.map((item, j) => (
                    <motion.div
                      key={j}
                      className={styles.productPill}
                      whileHover={{ y: -8, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                <div className={styles.woodLine} />
              </div>
            </div>
          ))}
        </div>

        {/* Brand Row Marquee */}
        <div className={styles.brandsWrapper}>
          <span className={styles.brandsTitle}>Curated Brands</span>
          <div className={styles.marquee}>
            <div className={styles.marqueeInner}>
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <span key={i} className={styles.brandChip}>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
