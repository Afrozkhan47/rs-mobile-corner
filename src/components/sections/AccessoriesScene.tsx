'use client';

import React from 'react';
import Section from '@/components/layout/Section';
import ScrollReveal from '@/components/animation/ScrollReveal';
import { motion } from 'framer-motion';
import styles from './AccessoriesScene.module.css';

const CATEGORIES = [
  {
    emoji: '⚡',
    label: 'Chargers & Cables',
    items: ['Fast Chargers', 'Type-C Cables', 'Lightning Cables', 'Car Chargers', 'Adapters', 'OTG'],
  },
  {
    emoji: '🛡️',
    label: 'Protection',
    items: ['Tempered Glass', 'Cases & Back Covers', 'Screen Guards'],
  },
  {
    emoji: '🔋',
    label: 'Power',
    items: ['Power Banks', 'Wireless Chargers'],
  },
  {
    emoji: '🎧',
    label: 'Audio',
    items: ['Bluetooth Earbuds', 'Neckbands', 'Bluetooth Speakers'],
  },
  {
    emoji: '⌚',
    label: 'Wearables',
    items: ['Smart Watches', 'Fitness Bands'],
  },
  {
    emoji: '💾',
    label: 'Storage & Mounts',
    items: ['Memory Cards', 'Pen Drives', 'Mobile Holders'],
  },
];

const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Realme', 'Boat', 'JBL', 'Noise', 'Fire-Boltt', 'Ambrane'];

export default function AccessoriesScene() {
  return (
    <Section variant="default">
      <div className={styles.inner}>
        {/* Header */}
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Premium Accessories</span>
            <h2 className={styles.heading}>
              Everything Your Phone Needs.
            </h2>
            <p className={styles.subtext}>
              From protective cases to premium audio — we stock a wide range of genuine accessories from top brands. All in one shop.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Cards */}
        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.06} stagger={0}>
              <motion.div
                className={styles.categoryCard}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(231, 180, 74, 0.08)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.categoryEmoji}>{cat.emoji}</span>
                <h3 className={styles.categoryLabel}>{cat.label}</h3>
                <ul className={styles.itemList}>
                  {cat.items.map((item, j) => (
                    <li key={j} className={styles.itemTag}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Brands */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.brandsRow}>
            <span className={styles.brandsLabel}>Available Brands</span>
            <div className={styles.brands}>
              {BRANDS.map((brand, i) => (
                <span key={i} className={styles.brandChip}>{brand}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
