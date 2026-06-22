'use client';

import React from 'react';

type TextSize = 'sm' | 'base' | 'lg';

interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  muted?: boolean;
  subtle?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: 'p' | 'span' | 'div';
}

const sizeMap: Record<TextSize, string> = {
  sm: 'var(--text-caption)',
  base: 'var(--text-body)',
  lg: 'var(--text-body-lg)',
};

export default function Text({
  children,
  size = 'base',
  muted = false,
  subtle = false,
  className = '',
  style,
  as: Tag = 'p',
}: TextProps) {
  const opacity = subtle ? 0.4 : muted ? 0.6 : 1;

  return (
    <Tag
      className={className}
      style={{
        fontSize: sizeMap[size],
        lineHeight: 'var(--leading-relaxed)',
        opacity,
        fontWeight: 300,
        textWrap: 'pretty',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
