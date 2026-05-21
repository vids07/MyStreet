'use client';

import type { RoadData, PhotoData } from '@/types/road';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { getHeroCrops, formatDate } from '@/lib/utils/road-display';
import { MapPin, Landmark, ExternalLink } from 'lucide-react';

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
        renderSlideBottom={(photo) => {
          const [streetName, locationText] = photo.locationLabel
            ? photo.locationLabel.split(' — ')
            : [displayName, null];
          return (
            <div className="absolute bottom-0 left-0 w-full pb-xl pl-sm z-10 flex flex-col gap-2xs">
              <h2 className="text-headline mona text-white">{streetName}</h2>
              {locationText && (
                <p className="flex items-center gap-2xs text-label roboto text-white/60">
                  <MapPin size={12} strokeWidth={1.5} />
                  {locationText}
                </p>
              )}
              {road.governingBody && (
                <p className="flex items-center gap-2xs text-label roboto text-white/80">
                  <Landmark size={12} strokeWidth={1.5} />
                  Under: {road.governingBody}
                </p>
              )}
              {photo.capturedAt && (
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2xs text-label roboto text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors w-fit"
                >
                  Photographed {formatDate(photo.capturedAt)}
                  <ExternalLink size={12} strokeWidth={1.5} />
                </a>
              )}
            </div>
          );
        }}
      />
    </section>
  );
}
