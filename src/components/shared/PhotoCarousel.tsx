'use client';

import React, { useState, useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PhotoData } from '@/types/road';
import StatusBadge from './StatusBadge';

/**
 * PhotoCarousel — shared scroll carousel used in every section that shows photos.
 *
 * variant="card"  → photo area + dots rendered as a fragment (in flow, for subgrid cards)
 * variant="hero"  → single container with absolute dots (for full-bleed hero sections)
 *
 * Card variant returns a React fragment: <photo div> + optional <dots div>.
 * Both elements become direct children of the parent grid, occupying rows 1 and 2
 * in the ConditionCard subgrid layout.
 *
 * Hero variant wraps everything in one relative div. Pass renderSlideBottom to inject
 * per-slide content (road name, location label) over the gradient.
 *
 * HEIC files are silently filtered out internally. Callers never need to pre-filter.
 * onActivePhotoChange is called on every scroll/navigation change (not on mount) —
 * initialise the parent's activePhoto state from photos[0] to avoid flash.
 */

export type PhotoCarouselVariant = 'card' | 'hero';

type Props = {
  photos: PhotoData[];
  /** Tailwind height class applied to the photo area. Default: 'h-64' */
  height?: string;
  /** Slice limit after HEIC filter. Omit for no limit. */
  maxPhotos?: number;
  variant?: PhotoCarouselVariant;
  /** Hero only: bottom overlay rendered inside each slide (road name, ward, etc.) */
  renderSlideBottom?: (photo: PhotoData) => React.ReactNode;
  /**
   * Called synchronously when the visible photo changes (scroll or arrow click).
   * Not called on mount — initialise parent state from photos[0] instead.
   */
  onActivePhotoChange?: (photo: PhotoData | null) => void;
};

export default function PhotoCarousel({
  photos,
  height = 'h-64',
  maxPhotos,
  variant = 'card',
  renderSlideBottom,
  onActivePhotoChange,
}: Props) {
  const filtered = photos
    .filter(p => !p.url.toLowerCase().endsWith('.heic'))
    .slice(0, maxPhotos ?? photos.length);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activePhoto = filtered[activeIndex] ?? null;

  const isHero = variant === 'hero';

  function handleScroll() {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
    const next = Math.min(idx, Math.max(0, filtered.length - 1));
    setActiveIndex(next);
    onActivePhotoChange?.(filtered[next] ?? null);
  }

  function scrollToIndex(index: number) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: index * scrollRef.current.offsetWidth, behavior: 'smooth' });
    setActiveIndex(index);
    onActivePhotoChange?.(filtered[index] ?? null);
  }

  if (filtered.length === 0) {
    return (
      <div className={`${height} flex items-center justify-center bg-surface`}>
        <Camera size={32} strokeWidth={1.5} className="text-text-muted opacity-20" />
      </div>
    );
  }

  const slides = (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex overflow-x-auto snap-x snap-mandatory h-full"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
    >
      {filtered.map((photo, i) => (
        <div key={photo.id ?? i} className="relative flex-none w-full h-full snap-start overflow-hidden">
          <img
            src={photo.thumbnailUrl ?? photo.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {isHero ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          ) : (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          )}
          {renderSlideBottom ? (
            renderSlideBottom(photo)
          ) : (
            !isHero && photo.locationLabel && (
              <span className="absolute bottom-xs left-xs text-label roboto text-white/80 uppercase z-10">
                {photo.locationLabel.split(' — ')[0]}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );

  const badge = (
    <div className={`absolute z-10 ${isHero ? 'top-sm right-sm' : 'top-xs left-xs'}`}>
      <StatusBadge status={activePhoto?.status ?? null} variant={isHero ? 'solid' : undefined} />
    </div>
  );

  const prevArrow = activeIndex > 0 && (
    <button
      onClick={() => scrollToIndex(activeIndex - 1)}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-black/40 text-white transition-colors ${
        isHero
          ? 'left-sm w-10 h-10 rounded-full hover:bg-black/70'
          : 'left-xs rounded-full p-2xs hover:bg-black/60'
      }`}
      aria-label="Previous photo"
    >
      <ChevronLeft size={isHero ? 24 : 20} strokeWidth={1.5} />
    </button>
  );

  const nextArrow = activeIndex < filtered.length - 1 && (
    <button
      onClick={() => scrollToIndex(activeIndex + 1)}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-black/40 text-white transition-colors ${
        isHero
          ? 'right-sm w-10 h-10 rounded-full hover:bg-black/70'
          : 'right-xs rounded-full p-2xs hover:bg-black/60'
      }`}
      aria-label="Next photo"
    >
      <ChevronRight size={isHero ? 24 : 20} strokeWidth={1.5} />
    </button>
  );

  if (isHero) {
    return (
      <div className={`relative w-full ${height} overflow-hidden`}>
        {slides}
        {badge}
        {prevArrow}
        {nextArrow}
        {filtered.length > 1 && (
          <div className="absolute bottom-sm left-1/2 -translate-x-1/2 z-20 flex gap-xs">
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2xs rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'w-md bg-white' : 'w-xs bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Card variant: photo area then dots in flow — both become direct grid children
  return (
    <>
      <div className={`relative ${height} rounded-sm overflow-hidden`}>
        {slides}
        {badge}
        {prevArrow}
        {nextArrow}
      </div>
      {filtered.length > 1 && (
        <div className="flex justify-center gap-2xs pt-xs">
          {filtered.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2xs rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-sm bg-text-primary' : 'w-xs bg-text-muted/30'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
