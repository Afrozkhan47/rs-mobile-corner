'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: React.ReactNode;
  id?: string;
  className?: string;
}

const MAGNETIC_STRENGTH = 0.35;
const SPRING_CONFIG = { damping: 15, stiffness: 150, mass: 0.5 };

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--color-whatsapp)',
    color: '#ffffff',
    border: '1px solid rgba(37, 211, 102, 0.3)',
    boxShadow: '0 4px 24px rgba(37, 211, 102, 0.2)',
  },
  secondary: {
    background: 'var(--glass-bg)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: 'var(--glass-shadow)',
  },
  tertiary: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
  },
};

export default function MagneticButton({
  children,
  href,
  target,
  rel,
  onClick,
  variant = 'secondary',
  icon,
  id,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * MAGNETIC_STRENGTH);
      y.set((e.clientY - centerY) * MAGNETIC_STRENGTH);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-caption)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: `background var(--duration-normal) var(--ease-smooth),
                 border-color var(--duration-normal) var(--ease-smooth),
                 box-shadow var(--duration-normal) var(--ease-smooth),
                 color var(--duration-normal) var(--ease-smooth)`,
    whiteSpace: 'nowrap' as const,
    ...variantStyles[variant],
  };

  const hoverOverride: React.CSSProperties = isHovered
    ? {
        ...(variant === 'secondary'
          ? { background: 'var(--glass-bg-hover)', borderColor: 'var(--glass-border-accent)' }
          : {}),
        ...(variant === 'tertiary'
          ? { borderColor: 'var(--color-amber)', color: 'var(--color-text-primary)' }
          : {}),
        ...(variant === 'primary'
          ? { boxShadow: '0 8px 32px rgba(37, 211, 102, 0.35)' }
          : {}),
      }
    : {};

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target, rel } : { onClick };

  return (
    <motion.div
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Tag
        ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        id={id}
        className={className}
        style={{ ...baseStyle, ...hoverOverride }}
        {...(linkProps as Record<string, unknown>)}
      >
        {icon && (
          <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {icon}
          </span>
        )}
        {children}
      </Tag>
    </motion.div>
  );
}
