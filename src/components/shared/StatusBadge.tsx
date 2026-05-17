import React from 'react';
import { AlertCircle } from 'lucide-react';

type StatusBadgeProps = {
  status: string | null | undefined;
  variant?: 'subtle' | 'solid';
};

export default function StatusBadge({ status, variant = 'subtle' }: StatusBadgeProps) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let bgClass = 'bg-surface';
  let textClass = 'text-text-muted';
  let icon = null;

  if (normalized === 'critical') {
    bgClass = variant === 'solid' ? 'bg-failure' : 'bg-failure-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-failure';
    if (variant === 'solid') {
      icon = <AlertCircle size={12} strokeWidth={1.5} className="mr-1" />;
    }
  } else if (normalized === 'dangerous') {
    bgClass = variant === 'solid' ? 'bg-dangerous' : 'bg-dangerous-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-dangerous';
  } else if (normalized === 'warning') {
    bgClass = variant === 'solid' ? 'bg-warning' : 'bg-warning-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-warning';
  } else if (normalized === 'good') {
    bgClass = variant === 'solid' ? 'bg-evidence' : 'bg-evidence-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-evidence';
  }

  return (
    <span className={`inline-flex items-center px-xs py-2xs rounded-xs text-label roboto uppercase ${bgClass} ${textClass}`}>
      {icon}
      {status}{variant === 'solid' ? ' STATUS' : ''}
    </span>
  );
}
