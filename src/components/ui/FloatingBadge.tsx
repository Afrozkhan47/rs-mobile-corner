'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode | string;
  className?: string;
  style?: any;
}

export default function FloatingBadge({ children, icon, className = '', style }: FloatingBadgeProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon ? <span style={{ fontSize: '0.9rem' }}>{icon}</span> : null}
        <span>{children}</span>
      </span>
    </motion.div>
  );
}
