'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{
        borderColor: 'rgba(201, 169, 97, 0.3)',
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.featureList} aria-label={`${title} features`}>
        {features.map((feature, i) => (
          <li key={i} className={styles.featureItem}>
            <span className={styles.featureDot} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
