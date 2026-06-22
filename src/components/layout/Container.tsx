'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  narrow?: boolean;
}

export default function Container({
  children,
  className = '',
  style,
  narrow = false,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: narrow ? '64rem' : '90rem',
        marginInline: 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
