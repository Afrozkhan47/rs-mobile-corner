'use client';

import React from 'react';
import styles from './StarBorder.module.css';

interface StarBorderProps {
  href: string;
  children: React.ReactNode;
  id?: string;
  target?: string;
  rel?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function StarBorder({
  href,
  children,
  id,
  target,
  rel,
  className = '',
  icon,
}: StarBorderProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true">
        <span className={styles.ringSpin} />
      </span>
      <a
        href={href}
        id={id}
        target={target}
        rel={rel}
        className={styles.inner}
      >
        {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
        {children}
      </a>
    </div>
  );
}
