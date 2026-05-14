import React from 'react';
import type { RoadData, PhotoData } from '@/types/road';

type HeroSectionProps = {
  road: RoadData;
  heroPhoto: PhotoData | null;
  builtAgo: string;
  daysLasted: string;
  netDisbursed: string;
};

export default function HeroSection({
  road,
  heroPhoto,
  builtAgo,
  daysLasted,
  netDisbursed,
}: HeroSectionProps) {
  const isFailure = ['critical', 'dangerous', 'warning'].includes(road.healthStatus ?? '');
  const actionLabel = isFailure ? 'Who did this?' : 'Who built this right?';

  return (
    <section id="section1" className="relative h-screen w-full overflow-hidden bg-black">
      {/* 
        MVP: Full bleed hero photo instead of video as per DECISIONS.md.
        Aesthetically premium: object-fit cover to fill the viewport.
      */}
      {heroPhoto && (
        <img
          src={heroPhoto.url}
          alt={road.roadDisplayName}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      {/* Glassmorphism Panel — bottom-left anchored */}
      <div className="absolute bottom-12 left-6 md:left-12 max-w-[90%] md:max-w-2xl">
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-md p-6 md:p-8 space-y-6">
          <div className="space-y-2 animate-in fade-in duration-700">
            <h2 className="text-headline mona text-white uppercase tracking-tight">
              {road.roadDisplayName}
            </h2>
          </div>

          <div className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <p className="text-display mona text-white">
              {netDisbursed} spent here
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
            <p className={`text-headline mona ${isFailure ? 'text-failure' : 'text-evidence'}`}>
              This road lasted {daysLasted}.
            </p>
          </div>

          <div className="animate-in fade-in zoom-in-95 duration-700 delay-2000">
            <button className="bg-empowerment text-white text-body-bold px-8 py-4 rounded-sm hover:scale-105 transition-transform">
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
