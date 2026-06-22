'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.css';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services', id: 'nav-services' },
  { label: 'Our Story', href: '#story', id: 'nav-story' },
  { label: 'Gallery', href: '#gallery', id: 'nav-gallery' },
  { label: 'Location', href: '#contact', id: 'nav-contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={styles.nav}
        style={{
          backdropFilter: hasScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: hasScrolled ? 'blur(20px)' : 'none',
          backgroundColor: hasScrolled ? 'rgba(250, 250, 248, 0.85)' : 'transparent',
          borderBottom: hasScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className={styles.inner}>
          <a href="#" className={styles.logo} id="nav-logo">
            RS MOBILE CORNER
          </a>

          {/* Desktop Links */}
          <div className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                id={link.id}
                className={styles.navLink}
                style={
                  link.id === 'nav-contact'
                    ? {
                        textDecoration: 'underline',
                        textUnderlineOffset: '8px',
                        textDecorationColor: 'var(--color-accent)',
                      }
                    : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            id="nav-menu-toggle"
          >
            <div className={styles.menuIcon}>
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <motion.div
                className={styles.mobileFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <p style={{ fontSize: 'var(--text-caption)', opacity: 0.4 }}>
                  © 2026 RS Mobile Corner
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
