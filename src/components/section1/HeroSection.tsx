'use client';

import React from 'react';
import type { RoadData, PhotoData } from '@/types/road';
import PhotoCarousel from '@/components/shared/PhotoCarousel';

type HeroSectionProps = {
  road: RoadData;
  heroPhoto: PhotoData | null;
  section1Photos: PhotoData[];
};

export default function HeroSection({ road, heroPhoto, section1Photos }: HeroSectionProps) {
  const allPhotos = [
    ...(heroPhoto ? [heroPhoto] : []),
    ...section1Photos,
  ];

  const isWardAvailable = Boolean(road.ward);
  const displayName = isWardAvailable
    ? (road.ward!.toLowerCase().startsWith('ward') ? road.ward : `Ward ${road.ward}`)
    : road.roadDisplayName;
  const nameClass = isWardAvailable
    ? 'text-title mona text-white font-bold'
    : 'text-title mona text-white font-bold line-clamp-1';

  return (
    <section id="section1" className="w-full bg-black">
      <PhotoCarousel
        photos={allPhotos}
        height="h-screen"
        variant="hero"
        renderSlideBottom={(photo) => (
          <div className="absolute bottom-0 left-0 w-full pb-xl pl-sm z-10 flex flex-col gap-2xs">
            <h2 className={nameClass}>{displayName}</h2>
            {photo.locationLabel && (
              <p className="text-label roboto text-white/60 uppercase tracking-widest">
                {photo.locationLabel}
              </p>
            )}
          </div>
        )}
      />
    </section>
  );
}
