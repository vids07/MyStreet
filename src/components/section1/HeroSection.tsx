import React from 'react';
import { MapPin, User, Calendar } from 'lucide-react';
import type { RoadData, PhotoData } from '@/types/road';
import { photoSourceLabel, formatDate } from '@/lib/utils/road-display';
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
  builtAgo,
  daysLasted,
  netDisbursed,
}: HeroSectionProps) {
  const isFailure = ['critical', 'dangerous', 'warning'].includes(road.healthStatus ?? '');
  const actionLabel = isFailure ? 'Who did this?' : 'Who built this right?';

  return (
    <section id="section1" className="relative min-h-screen w-full bg-black flex flex-col justify-end">
      {/* Background Hero Photo */}
      {heroPhoto && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroPhoto.url}
            alt={road.roadDisplayName}
            className="h-full w-full object-cover opacity-60"
          />
          {/* Gradient overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-sm md:px-lg pb-md pt-xl">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-xl">
          
          {/* Left Column: Glassmorphism Panel */}
          <div className="w-full lg:max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-md p-sm md:p-md shadow-card space-y-md">
            <div className="space-y-2xs">
              <h2 className="text-display mona text-white uppercase tracking-tight">
                {road.roadDisplayName}
              </h2>
            </div>

            <div className="space-y-2xs">
              <p className="text-headline mona text-white">
                {netDisbursed} spent here
              </p>
              <p className={`text-headline mona ${isFailure ? 'text-failure' : 'text-evidence'}`}>
                This road lasted {daysLasted}.
              </p>
            </div>

            <div className="pt-xs">
              <button className="bg-empowerment text-white text-body-bold px-lg py-xs md:py-sm rounded-sm hover:scale-105 transition-transform">
                {actionLabel}
              </button>
            </div>
          </div>

          {/* Right Column / Bottom Scroll: Photo Cards */}
          {section1Photos && section1Photos.length > 0 && (
            <div className="w-full lg:w-[600px] xl:w-[700px] flex overflow-x-auto gap-sm pb-xs snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {section1Photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="flex-none w-[280px] bg-card border border-border rounded-md overflow-hidden shadow-card snap-center flex flex-col"
                >
                  <div className="relative h-40 shrink-0 bg-surface">
                    <img
                      src={photo.thumbnailUrl ?? photo.url}
                      alt="Evidence"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-xs right-xs">
                      <StatusBadge status={photo.status} />
                    </div>
                    <div className="absolute top-xs left-xs bg-black/60 text-white text-label roboto px-xs py-2xs rounded-xs uppercase">
                      {photoSourceLabel(photo.source)}
                    </div>
                  </div>
                  
                  <div className="p-sm flex flex-col gap-xs grow">
                    {photo.locationLabel && (
                      <div className="flex items-start gap-xs">
                        <MapPin size={16} className="text-text-muted shrink-0 mt-2xs" />
                        <p className="text-meta roboto text-text-primary line-clamp-2">
                          {photo.locationLabel}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-xs text-text-muted mt-auto">
                      <Calendar size={16} className="shrink-0" />
                      <p className="text-meta roboto">
                        {formatDate(photo.capturedAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-xs text-text-muted">
                      <User size={16} className="shrink-0" />
                      <p className="text-meta roboto truncate">
                        {photo.person?.fullName ?? photo.uploadedBy ?? 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
