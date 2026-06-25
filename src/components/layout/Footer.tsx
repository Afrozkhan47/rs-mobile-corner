'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.inner}>
        <p className={styles.credit}>
          Designed and Developed by <span className={styles.name}>Afroz Khan</span>
        </p>
      </div>
    </footer>
  );
}
