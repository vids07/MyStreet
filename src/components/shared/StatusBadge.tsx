import React from 'react';

type StatusBadgeProps = {
  status: string | null | undefined;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null;
  
  const normalized = status.toLowerCase();
  
  let bgClass = 'bg-surface';
  let textClass = 'text-text-muted';
  
  if (normalized === 'critical') {
    bgClass = 'bg-failure-bg';
    textClass = 'text-failure';
  } else if (normalized === 'dangerous') {
    bgClass = 'bg-dangerous-bg';
    textClass = 'text-dangerous';
  } else if (normalized === 'warning') {
    bgClass = 'bg-warning-bg';
    textClass = 'text-warning';
  } else if (normalized === 'good') {
    bgClass = 'bg-evidence-bg';
    textClass = 'text-evidence';
  }

  return (
    <span className={`inline-flex items-center px-xs py-2xs rounded-xs text-label roboto uppercase ${bgClass} ${textClass}`}>
      {status}
    </span>
  );
}
