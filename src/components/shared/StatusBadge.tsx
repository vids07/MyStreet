import React from 'react';

type StatusBadgeProps = {
  status: string | null | undefined;
  variant?: 'subtle' | 'solid';
};

export default function StatusBadge({ status, variant = 'subtle' }: StatusBadgeProps) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let bgClass = 'bg-surface';
  let textClass = 'text-text-muted';

  if (normalized === 'critical') {
    bgClass = variant === 'solid' ? 'bg-failure' : 'bg-failure-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-failure';
  } else if (normalized === 'dangerous') {
    bgClass = variant === 'solid' ? 'bg-dangerous' : 'bg-dangerous-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-dangerous';
  } else if (normalized === 'warning') {
    bgClass = variant === 'solid' ? 'bg-warning' : 'bg-warning-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-warning';
  } else if (normalized === 'good') {
    bgClass = variant === 'solid' ? 'bg-evidence' : 'bg-evidence-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-evidence';
  } else if (normalized === 'informational') {
    bgClass = variant === 'solid' ? 'bg-informational' : 'bg-informational-bg';
    textClass = variant === 'solid' ? 'text-white' : 'text-informational';
  }

  if (variant === 'solid') {
    // Pulse live warning beacons for active issue levels: critical, dangerous, warning
    const isPulsing = normalized === 'critical' || normalized === 'dangerous' || normalized === 'warning';
    const pulseDot = isPulsing ? (
      <span className="relative flex h-2 w-2 mr-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    ) : (
      <span className="h-2 w-2 mr-2 rounded-full bg-white shrink-0" />
    );

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-xs text-label roboto uppercase font-black tracking-wider ${bgClass} ${textClass} shadow-lg border border-white/10`}>
        {pulseDot}
        {status} STATUS
      </span>
    );
  }

  // variant === 'subtle' matches original compact and elegant badge layout
  return (
    <span className={`inline-flex items-center px-xs py-2xs rounded-xs text-label roboto uppercase font-bold ${bgClass} ${textClass}`}>
      {status}
    </span>
  );
}
