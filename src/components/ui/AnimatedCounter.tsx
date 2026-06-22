'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  delay = 0,
  className = '',
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value: target,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => setHasAnimated(true),
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, suffix, prefix, duration, delay, hasAnimated]);

  const counterStyle: React.CSSProperties = {
    fontVariantNumeric: 'tabular-nums',
    ...style,
  };

  return (
    <span ref={ref} className={className} style={counterStyle}>
      {prefix}0{suffix}
    </span>
  );
}
