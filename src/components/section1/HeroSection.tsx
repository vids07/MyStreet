'use client';

import type { RoadData, PhotoData } from '@/types/road';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { getHeroCrops } from '@/lib/utils/road-display';

type HeroSectionProps = {
  road: RoadData;
  heroPhoto: PhotoData | null;
  section1Photos: PhotoData[];
};

export default function HeroSection({ road, heroPhoto, section1Photos }: HeroSectionProps) {
  const allPhotos = [
    ...(heroPhoto ? [heroPhoto] : []),
    ...section1Photos.filter(p => p.id !== heroPhoto?.id),
  ]
    .filter(p => !p.url.toLowerCase().endsWith('.heic'))
    .sort((a, b) => {
      if (a.status === 'critical' && b.status !== 'critical') return -1;
      if (b.status === 'critical' && a.status !== 'critical') return 1;
      return 0;
    });

  const displayName = road.ward
    ? (road.ward.toLowerCase().startsWith('ward') ? road.ward : `Ward ${road.ward}`)
    : road.roadDisplayName;

  if (allPhotos.length === 0) return null;

  return (
    <section id="section1" className="w-full bg-black" style={{ minHeight: '100vh' }}>
      <PhotoCarousel
        photos={allPhotos}
        height="h-screen"
        variant="hero"
        renderPhoto={(photo) => {
          const crops = getHeroCrops(photo.url);
          return (
            <picture className="absolute inset-0 w-full h-full">
              <source media="(min-width: 1280px)" srcSet={crops.desktop} />
              <source media="(min-width: 768px)"  srcSet={crops.laptop} />
              <img src={crops.mobile} alt="" className="w-full h-full object-cover" />
            </picture>
          );
        }}
        renderSlideBottom={(photo) => (
          <div className="absolute bottom-0 left-0 w-full pb-xl pl-sm z-10 flex flex-col gap-2xs">
            <h2 className="text-headline mona text-white">{displayName}</h2>
            {photo.locationLabel && (
              <p className="text-label roboto text-white/60 uppercase tracking-widest">
                {photo.locationLabel.split(' — ')[0]}
              </p>
            )}
          </div>
        )}
      />
    </section>
  );
}
