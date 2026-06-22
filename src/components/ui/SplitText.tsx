'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitMode = 'chars' | 'words' | 'lines';
type AnimPreset = 'fadeUp' | 'maskReveal' | 'blurIn';

interface SplitTextProps {
  children: string;
  mode?: SplitMode;
  preset?: AnimPreset;
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: 'scroll' | 'mount';
  scrollStart?: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  style?: React.CSSProperties;
}

function splitIntoTokens(text: string, mode: SplitMode): string[] {
  if (mode === 'chars') {
    return text.split('');
  }
  if (mode === 'words') {
    return text.split(/(\s+)/);
  }
  // lines mode — treat newlines as splits
  return text.split('\n');
}

const presetConfig: Record<AnimPreset, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  fadeUp: {
    from: { opacity: 0, y: 30, rotateX: 10 },
    to: { opacity: 1, y: 0, rotateX: 0 },
  },
  maskReveal: {
    from: { opacity: 0, y: '100%', skewY: 3 },
    to: { opacity: 1, y: '0%', skewY: 0 },
  },
  blurIn: {
    from: { opacity: 0, filter: 'blur(8px)', y: 12 },
    to: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
};

export default function SplitText({
  children,
  mode = 'words',
  preset = 'fadeUp',
  stagger = 0.03,
  duration = 0.7,
  delay = 0,
  trigger = 'scroll',
  scrollStart = 'top 85%',
  className = '',
  tag: Tag = 'div',
  style,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const tokens = useMemo(() => splitIntoTokens(children, mode), [children, mode]);

  useEffect(() => {
    const els = tokenRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (els.length === 0) return;

    const config = presetConfig[preset];
    const ctx = gsap.context(() => {
      if (trigger === 'scroll') {
        gsap.fromTo(els, config.from, {
          ...config.to,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: scrollStart,
            toggleActions: 'play none none none',
          },
        });
      } else {
        gsap.fromTo(els, config.from, {
          ...config.to,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preset, duration, stagger, delay, trigger, scrollStart]);

  const containerStyle: React.CSSProperties = {
    perspective: mode === 'chars' ? '800px' : undefined,
    ...style,
  };

  const tokenBaseStyle: React.CSSProperties = {
    display: 'inline-block',
    willChange: 'transform, opacity',
    ...(preset === 'maskReveal' ? { overflow: 'hidden' } : {}),
  };

  return (
    <Tag ref={containerRef as React.Ref<any>} className={className} style={containerStyle}>
      {tokens.map((token, i) => {
        // Preserve whitespace tokens
        if (/^\s+$/.test(token)) {
          return <span key={i}>&nbsp;</span>;
        }

        if (mode === 'chars') {
          return token.split('').map((char, j) => (
            <span
              key={`${i}-${j}`}
              ref={(el) => {
                tokenRefs.current[i * 100 + j] = el;
              }}
              style={tokenBaseStyle}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ));
        }

        return (
          <span
            key={i}
            ref={(el) => {
              tokenRefs.current[i] = el;
            }}
            style={tokenBaseStyle}
            aria-hidden={mode !== 'lines' ? 'true' : undefined}
          >
            {preset === 'maskReveal' ? (
              <span style={{ display: 'inline-block' }}>{token}</span>
            ) : (
              token
            )}
          </span>
        );
      })}
      {/* Screen reader fallback */}
      <span className="sr-only">{children}</span>
    </Tag>
  );
}
