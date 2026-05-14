import React from 'react';
import { Camera, MapPin, User, Clock } from 'lucide-react';
import type { EventData, PhotoData, DrainData } from '@/types/road';
import { formatDate, photoSourceLabel } from '@/lib/utils/road-display';

type ConditionCardProps = {
  title: string;
  subheading: string;
  description: string;
  photos: PhotoData[];
  type: 'cracks' | 'potholes' | 'drains';
  drains?: DrainData[];
};

function ConditionCard({ title, subheading, description, photos, type, drains }: ConditionCardProps) {
  const heroPhoto = photos[0];

  return (
    <div className="bg-card shadow-card rounded-md overflow-hidden">
      {/* Photo Container */}
      <div className="p-sm">
        <div className="relative h-48 md:h-64 rounded-sm overflow-hidden bg-gray-100">
          {heroPhoto ? (
            <img 
              src={heroPhoto.url} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-muted">
              <Camera className="w-8 h-8 opacity-20" />
            </div>
          )}
          {heroPhoto && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-failure-bg text-failure rounded-xs text-label roboto uppercase">
              {heroPhoto.status ?? 'CRITICAL'}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-sm pt-0 space-y-md">
        <div>
          <p className="text-label roboto text-text-muted uppercase mb-1">{subheading}</p>
          <h3 className="text-title mona text-text-primary uppercase">{title}</h3>
        </div>

        <p className="text-body mona text-text-muted text-sm line-clamp-3">
          {description}
        </p>

        {/* Drain Stats if applicable */}
        {type === 'drains' && drains && drains.length > 0 && (
          <div className="grid grid-cols-2 gap-sm pt-2 border-t border-border">
            <div>
              <p className="text-label roboto text-text-muted">BILLED</p>
              <p className="text-body-bold mona text-text-primary">{drains.length} Drain(s)</p>
            </div>
            <div>
              <p className="text-label roboto text-text-muted">ACTUAL</p>
              <p className="text-body-bold mona text-failure">0 Drains</p>
            </div>
          </div>
        )}

        <div className="pt-md border-t border-border flex justify-between items-center text-meta roboto text-text-muted">
          <div className="flex items-center gap-xs">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">{heroPhoto?.locationLabel ?? 'Location unknown'}</span>
          </div>
          <div className="flex items-center gap-xs">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{heroPhoto ? formatDate(heroPhoto.capturedAt) : 'Date unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type ConditionSectionProps = {
  events: EventData[];
  photos: PhotoData[];
  drains: DrainData[];
};

export default function ConditionSection({ events, photos, drains }: ConditionSectionProps) {
  const crackEvents = events.filter(e => e.eventType === 'crack_found');
  const potholeEvents = events.filter(e => e.eventType === 'pothole_found');
  
  // Filtering photos by events — as per MAPPING.md Part 1 logic
  const crackPhotos = photos.filter(p => crackEvents.some(e => e.id === p.eventId));
  const potholePhotos = photos.filter(p => potholeEvents.some(e => e.id === p.eventId));
  const drainPhotos = photos.filter(p => p.locationLabel?.toLowerCase().includes('drain') || p.locationLabel?.toLowerCase().includes('naali'));

  return (
    <section id="section3" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-container-mobile md:px-container-desktop">
        <div className="space-y-lg mb-xl">
          <h2 className="text-headline mona text-text-primary uppercase">Current Condition</h2>
          <p className="text-body mona text-text-muted max-w-2xl">
            Real-world evidence of structural failures, verified on site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Surface Cracks */}
          <ConditionCard 
            type="cracks"
            title="Surface Cracks"
            subheading={`${crackEvents.length} cracks documented`}
            description={crackEvents[0]?.description ?? 'Extensive surface cracking across the road width.'}
            photos={crackPhotos}
          />

          {/* Potholes */}
          <ConditionCard 
            type="potholes"
            title="Potholes"
            subheading={`${potholeEvents.length} potholes documented`}
            description={potholeEvents[0]?.description ?? 'Deep potholes forming on the main stem.'}
            photos={potholePhotos}
          />

          {/* Drains */}
          <ConditionCard 
            type="drains"
            title="Ghost Drain"
            subheading={`${drains.filter(d => d.status === 'not_built').length} missing drains`}
            description="₹98,293 billed for a drain that physically does not exist at site. JE and AE certified this as complete."
            photos={drainPhotos}
            drains={drains}
          />
        </div>
      </div>
    </section>
  );
}
