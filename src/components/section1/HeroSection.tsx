import React from 'react';
import type { RoadData, PhotoData } from '@/types/road';
import StatusBadge from '@/components/shared/StatusBadge';

type HeroSectionProps = {
  road: RoadData;
  heroPhoto: PhotoData | null;
  section1Photos: PhotoData[];
  builtAgo: string;
  daysLasted: string;
  netDisbursed: string;
};

export default function HeroSection({
  road,
  heroPhoto,
  section1Photos,
}: HeroSectionProps) {
  // If heroPhoto exists, prepend it to the front of the array so it appears as the first card
  const allPhotos = heroPhoto ? [heroPhoto, ...section1Photos] : section1Photos;

  return (
    <section id="section1" className="w-full bg-black">
      <div 
        className="flex overflow-x-auto gap-sm snap-x snap-mandatory" 
        style={{ scrollbarWidth: 'none' }}
      >
        {allPhotos.map((photo, index) => {
          const imageUrl = photo.thumbnailUrl ?? photo.url;
          
          return (
            <div 
              key={photo.id || index} 
              className="relative flex-none w-[85vw] md:w-[600px] h-screen md:h-[80vh] snap-center overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={road.roadDisplayName}
                className="absolute inset-0 h-full w-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute top-sm right-sm z-10">
                <StatusBadge status={photo.status} />
              </div>
              
              <div className="absolute bottom-sm left-sm z-10 flex flex-col gap-xs pr-sm">
                <h2 className="text-headline mona text-white">
                  {road.roadDisplayName}
                </h2>
                {photo.locationLabel && (
                  <p className="text-label roboto text-white/70 uppercase">
                    {photo.locationLabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
