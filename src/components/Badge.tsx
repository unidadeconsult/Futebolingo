import type { ReactNode } from 'react';
import './Badge.css';

interface BadgeProps {
  variant?: 'streak' | 'level' | 'notification';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'level', children, className = '' }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}
