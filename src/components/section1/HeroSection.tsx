'use client';

import type { RoadData, PhotoData } from '@/types/road';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { getHeroCrops, formatDate } from '@/lib/utils/road-display';
import { MapPin, Landmark, ExternalLink } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

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
          const fullLabel = photo.locationLabel || road.roadDisplayName || '';
          let line1 = fullLabel;
          let line2 = '';

          if (fullLabel.includes(' — ')) {
            const [streetPart, geoPart] = fullLabel.split(' — ');
            if (streetPart.includes(', Ward')) {
              const parts = streetPart.split(', Ward');
              line1 = parts[0];
              const wardPart = 'Ward' + parts[1];
              line2 = geoPart ? `${wardPart}, ${geoPart}` : wardPart;
            } else {
              line1 = streetPart;
              line2 = geoPart;
            }
          }

          return (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {photo.capturedAt && (
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-sm left-sm z-20 flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 pointer-events-auto shadow-lg"
                >
                  Photographed {formatDate(photo.capturedAt)}
                  <ExternalLink className="shrink-0" size={12} strokeWidth={1.5} />
                </a>
              )}

              {photo.status && (
                <div className="absolute top-sm right-sm z-20 pointer-events-auto">
                  <StatusBadge status={photo.status} variant="solid" />
                </div>
              )}

              <div 
                className="absolute bottom-12 left-0 w-full pb-xl px-sm md:px-md flex flex-col gap-xs pointer-events-auto"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }}
              >
                <h2 className="text-title md:text-headline mona text-white font-extrabold leading-tight tracking-wide">
                  {line1}
                </h2>

                {line2 && (
                  <p className="flex items-center gap-2xs text-body-bold md:text-title roboto text-white font-bold">
                    <MapPin className="text-white/80" size={18} strokeWidth={2} />
                    {line2}
                  </p>
                )}
                
                {road.governingBody && (
                  <p className="flex items-center gap-2xs text-body-bold md:text-title roboto text-[#FF4D4D] font-bold">
                    <Landmark className="text-[#FF4D4D]" size={18} strokeWidth={2} />
                    Under: {road.governingBody}
                  </p>
                )}
              </div>
            </div>
          );
        }}
      />
    </section>
  );
}
