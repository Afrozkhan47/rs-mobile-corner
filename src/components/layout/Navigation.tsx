'use client';

import React from 'react';
import styles from './Navigation.module.css';
import Image from "next/image";
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>

          <span className={styles.brandText}><Image
            src="/logo.png"
            alt="RS Mobile Corner"
            width={48}
            height={48}
          /></span>
        </div>
      </div>
    </nav>
  );
}
