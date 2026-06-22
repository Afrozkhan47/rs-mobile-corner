'use client';

import React from 'react';
import styles from './Footer.module.css';

const socialLinks = [
  { label: 'Instagram', href: '#', id: 'footer-ig' },
  { label: 'X / Twitter', href: '#', id: 'footer-tw' },
  { label: 'LinkedIn', href: '#', id: 'footer-ln' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} RS Mobile Corner. All rights reserved.
        </p>
        <nav className={styles.socialNav} aria-label="Social media links">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={link.id}
              className={styles.socialLink}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className={styles.tagline}>Designed for Performance.</p>
      </div>
    </footer>
  );
}
