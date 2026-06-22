'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Button({
  variant = 'primary',
  href,
  target,
  rel,
  icon,
  children,
  id,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const isLink = !!href;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.65rem',
    paddingInline: '1rem',
    paddingBlock: '0.9rem',
    borderRadius: '999px',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--duration-normal) var(--ease-out-expo)',
    minBlockSize: '52px',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    ...style,
  };

  const getVariantStyles = (v: ButtonVariant): React.CSSProperties => {
    switch (v) {
      case 'primary':
        return {
          background: 'var(--color-accent)',
          color: '#f7fff9',
          border: '1px solid var(--color-accent)',
          boxShadow: 'none',
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.72)',
          color: 'var(--color-text-primary)',
          border: '1px solid rgba(17, 17, 17, 0.08)',
          boxShadow: 'none',
        };
      case 'tertiary':
        return {
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid transparent',
        };
      case 'link':
        return {
          background: 'transparent',
          color: 'var(--color-accent)',
          border: 'none',
          paddingInline: 0,
          paddingBlock: 0,
          minBlockSize: 'auto',
        };
    }
  };

  const variantStyles = getVariantStyles(variant);
  const combinedStyle = { ...baseStyle, ...variantStyles };

  const hoverEffect = variant === 'primary'
    ? { scale: 1.01, backgroundColor: 'var(--color-accent-hover)' }
    : variant === 'secondary'
    ? { scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(17, 17, 17, 0.18)' }
    : variant === 'tertiary'
    ? { scale: 1.01, color: 'var(--color-text-primary)' }
    : { x: 4 };

  const tapEffect = { scale: 0.98 };

  if (isLink) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        id={id}
        className={className}
        style={combinedStyle}
        whileHover={hoverEffect}
        whileTap={tapEffect}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      id={id}
      className={className}
      style={combinedStyle}
      whileHover={hoverEffect}
      whileTap={tapEffect}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      {children}
    </motion.button>
  );
}
