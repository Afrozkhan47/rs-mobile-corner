'use client';

import React from 'react';

type SectionVariant = 'default' | 'surface' | 'deep';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
}

const bgMap: Record<SectionVariant, string> = {
  default: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  deep: 'var(--color-bg-deep)',
};

export default function Section({
  children,
  variant = 'default',
  id,
  className = '',
  style,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: 'relative',
        paddingBlock: noPadding ? undefined : 'var(--space-section)',
        paddingInline: 'var(--section-padding-x)',
        backgroundColor: bgMap[variant],
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </section>
  );
}
