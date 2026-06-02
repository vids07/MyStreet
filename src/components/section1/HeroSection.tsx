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
    <section id="section1" className="w-full bg-black relative overflow-hidden" style={{ minHeight: '100vh' }}>
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
            <div className="absolute inset-0 z-10 pointer-events-none flex items-end">
              
              {/* Premium Netflix-Style Floating Content (Bottom Left) */}
              <div 
                className="absolute bottom-[60px] md:bottom-[80px] left-sm md:left-md right-sm md:right-auto z-20 max-w-3xl flex flex-col gap-xs md:gap-sm text-left pointer-events-auto select-none"
              >
                {/* 1. Status Tag & Date Row */}
                <div className="flex items-center gap-xs">
                  <div className="flex items-center gap-1.5 bg-failure text-white border border-white/10 px-2.5 py-0.5 rounded-xs text-[10px] font-black tracking-widest roboto uppercase shadow-[0_2px_8px_rgba(192,57,43,0.3)]">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    {photo.status ? `${photo.status.toUpperCase()} STATUS` : 'CRITICAL STATUS'}
                  </div>
                  {photo.capturedAt && (
                    <>
                      <span className="text-white/30 text-xs font-light">•</span>
                      <span className="text-xs font-bold tracking-wider roboto text-white/70 uppercase">
                        FILED: {formatDate(photo.capturedAt)}
                      </span>
                    </>
                  )}
                </div>

                {/* 2. Immersive Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] roboto text-white/60 font-black tracking-[0.25em] uppercase leading-none">
                    CITIZEN EVIDENCE FILE
                  </span>
                  <h1 className="text-headline md:text-display mona text-white font-black leading-[1.05] tracking-tight uppercase mt-1">
                    {line1}
                  </h1>
                </div>

                {/* 3. Horizontal Metadata Bullet Row */}
                <div className="flex flex-wrap items-center gap-x-xs md:gap-x-sm gap-y-1.5 text-xs roboto text-white/80 font-semibold tracking-wide uppercase mt-1">
                  {line2 && (
                    <span className="flex items-center gap-1">
                      <MapPin className="text-white/40 shrink-0" size={13} />
                      <span>{line2}</span>
                    </span>
                  )}
                  
                  {road.governingBody && (
                    <>
                      <span className="text-white/30 font-light">•</span>
                      <span className="flex items-center gap-1 text-white/90">
                        <Landmark className="text-red-400 shrink-0" size={13} />
                        <span>UNDER: <span className="font-black text-white">{road.governingBody}</span></span>
                      </span>
                    </>
                  )}
                </div>

                {/* 4. Elegant High-Contrast CTA Button */}
                {photo.url && (
                  <div className="mt-xs">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 active:scale-[0.98] text-black rounded px-md py-2.5 text-[11px] roboto font-black uppercase tracking-widest transition-all duration-200 pointer-events-auto text-center"
                    >
                      Inspect Raw Evidence Photo
                      <ExternalLink size={13} strokeWidth={2.5} />
                    </a>
                  </div>
                )}

              </div>

            </div>
          );
        }}
      />
    </section>
  );
}
