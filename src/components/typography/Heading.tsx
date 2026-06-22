'use client';

import React from 'react';

type HeadingVariant = 'hero' | 'display' | 'heading' | 'subhead';
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

interface HeadingProps {
  variant?: HeadingVariant;
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const variantStyles: Record<HeadingVariant, React.CSSProperties> = {
  hero: {
    fontSize: 'var(--text-hero)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-tighter)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
  },
  display: {
    fontSize: 'var(--text-display)',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-tight)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
  },
  heading: {
    fontSize: 'var(--text-heading)',
    lineHeight: 'var(--leading-snug)',
    letterSpacing: 'var(--tracking-tight)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
  },
  subhead: {
    fontSize: 'var(--text-subhead)',
    lineHeight: 'var(--leading-snug)',
    letterSpacing: 'var(--tracking-normal)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 400,
  },
};

const defaultTags: Record<HeadingVariant, HeadingTag> = {
  hero: 'h1',
  display: 'h2',
  heading: 'h3',
  subhead: 'h4',
};

export default function Heading({
  variant = 'heading',
  as,
  children,
  className = '',
  style,
  id,
}: HeadingProps) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag
      id={id}
      className={className}
      style={{
        ...variantStyles[variant],
        textWrap: 'balance',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
