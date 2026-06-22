'use client';

import React, { useRef, useCallback, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  tag?: 'div' | 'article' | 'li';
}

export default function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  tag: Tag = 'div',
}: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt * 2;
      const rotateY = (x - 0.5) * maxTilt * 2;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glare) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;
        setGlareStyle({
          position: 'absolute' as const,
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none' as const,
          background: `linear-gradient(${angle}deg, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: 1,
          transition: 'opacity 0.3s ease',
        });
      }
    },
    [maxTilt, perspective, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setIsHovered(false);
    if (glare) {
      setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [glare]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    transform: isHovered ? transform : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    transition: isHovered
      ? 'transform 0.1s ease-out'
      : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
    transformStyle: 'preserve-3d',
    ...style,
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {glare && <div style={glareStyle} aria-hidden="true" />}
    </Tag>
  );
}
