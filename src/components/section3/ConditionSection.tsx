'use client';

import { useState } from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import type { EventData, PhotoData, DrainData } from '@/types/road';
import { formatDate } from '@/lib/utils/road-display';
import PhotoCarousel from '@/components/shared/PhotoCarousel';

function statusColorClass(status: string | null | undefined): string {
  switch (status) {
    case 'critical': return 'text-failure';
    case 'warning': return 'text-warning';
    case 'good': return 'text-evidence';
    case 'dangerous': return 'text-dangerous';
    default: return 'text-text-muted';
  }
}

type ConditionCardProps = {
  headlineCount: string;
  headlineColor: string;
  bodyText: string;
  photos: PhotoData[];
  type: 'cracks' | 'potholes' | 'drains';
  drains?: DrainData[];
};

function ConditionCard({ headlineCount, headlineColor, bodyText, photos, type, drains }: ConditionCardProps) {
  const [activePhoto, setActivePhoto] = useState<PhotoData | null>(
    () => photos.find(p => !p.url.toLowerCase().endsWith('.heic')) ?? null
  );

  const billedDrains = drains?.length ?? 0;
  const actualDrains = drains?.filter(d => d.status !== null && d.status !== 'not_built').length ?? 0;

  const shortLocation = (label: string) => label.split(' — ')[0];

  return (
    <div className="bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow overflow-hidden grid"
         style={{ gridRow: 'span 6', gridTemplateRows: 'subgrid' }}>
      {/* PHOTO AREA + DOTS — PhotoCarousel renders as fragment: 2 grid rows */}
      <PhotoCarousel
        photos={photos}
        height="h-64"
        maxPhotos={5}
        onActivePhotoChange={setActivePhoto}
      />

      {/* CARD BODY */}
      <div className="p-sm grid gap-sm" style={{ gridTemplateRows: 'subgrid', gridRow: 'span 4' }}>

        {/* ROW 1 — Headline */}
        <h3 className={`text-headline mona font-extrabold self-start ${headlineColor}`}>
          {headlineCount}
        </h3>

        {/* ROW 2 — Body sentence */}
        <p className="text-body mona text-text-muted self-start">
          {bodyText}
        </p>

        {/* ROW 3 — Location + reported lines */}
        <div className="flex flex-col gap-xs">
          {activePhoto?.locationLabel && (
            <div className="flex items-center gap-xs">
              <MapPin size={20} strokeWidth={1.5} className="text-text-muted shrink-0" />
              <span className="text-meta roboto text-text-muted">
                {shortLocation(activePhoto.locationLabel)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-xs">
            <Clock size={20} strokeWidth={1.5} className="text-text-muted shrink-0" />
            <span className="text-meta roboto text-text-muted">
              Last reported: {formatDate(activePhoto?.capturedAt)}
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <User size={20} strokeWidth={1.5} className="text-text-muted shrink-0" />
            <span className="text-meta roboto text-text-muted">
              Last reported by: {activePhoto?.person?.fullName ?? activePhoto?.uploadedBy ?? 'Unknown'}
            </span>
          </div>
        </div>

        {/* ROW 4 — Drain stats or empty */}
        <div>
          {type === 'drains' && drains !== undefined ? (
            <div className="border-t border-[0.5px] border-border pt-sm grid grid-cols-2 gap-sm">
              <div className="flex flex-col gap-2xs">
                <p className="text-label roboto uppercase text-text-muted">Billed</p>
                <p className="text-body-bold mona text-text-primary">{billedDrains} Drain(s)</p>
              </div>
              <div className="flex flex-col gap-2xs">
                <p className="text-label roboto uppercase text-text-muted">Actual</p>
                <p className={`text-body-bold mona ${actualDrains < billedDrains ? 'text-failure' : 'text-evidence'}`}>
                  {actualDrains} Drains
                </p>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>

      </div>
    </div>
  );
}

type ConditionSectionProps = {
  events: EventData[];
  photos: PhotoData[];
  drains: DrainData[];
  builtAgo: string;
  sanctionedBudget: string;
  contractValue: string;
  healthStatus: string | null;
};

export default function ConditionSection({
  events,
  photos,
  drains,
  builtAgo,
  sanctionedBudget,
  contractValue,
  healthStatus,
}: ConditionSectionProps) {
  const crackEvents = events.filter(e => e.eventType === 'crack_found');
  const potholeEvents = events.filter(e => e.eventType === 'pothole_found');
  const drainEvents = events.filter(e => e.eventType === 'drain_blocked');

  const crackPhotos = photos.filter(p => crackEvents.some(e => e.id === p.eventId));
  const potholePhotos = photos.filter(p => potholeEvents.some(e => e.id === p.eventId));
  const drainPhotos = photos.filter(p => drainEvents.some(e => e.id === p.eventId));

  const drainsNotBuilt = drains.filter(d => d.status === 'not_built').length;
  const drainsUnverified = drains.filter(d => d.status === null).length;

  const documentedParts: string[] = [];
  if (crackEvents.length > 0) documentedParts.push(`${crackEvents.length} Crack${crackEvents.length !== 1 ? 's' : ''}`);
  if (potholeEvents.length > 0) documentedParts.push(`${potholeEvents.length} Pothole${potholeEvents.length !== 1 ? 's' : ''}`);
  if (drainsNotBuilt > 0) documentedParts.push(`${drainsNotBuilt} Ghost Drain${drainsNotBuilt !== 1 ? 's' : ''}`);
  const documentedStr = documentedParts.length > 0 ? documentedParts.join(' · ') : 'None';
  const hasIssues = documentedParts.length > 0;

  const crackHeadline = `${crackEvents.length} Surface Crack${crackEvents.length !== 1 ? 's' : ''}`;
  const potholeHeadline = `${potholeEvents.length} Pothole${potholeEvents.length !== 1 ? 's' : ''}`;

  let drainHeadline = `${drains.length} Drain${drains.length !== 1 ? 's' : ''}`;
  let drainHeadlineColor = 'text-text-primary';
  if (drainsNotBuilt > 0) {
    drainHeadline = `${drainsNotBuilt} Drain${drainsNotBuilt !== 1 ? 's' : ''} Not Built`;
    drainHeadlineColor = 'text-failure';
  } else if (drainsUnverified > 0) {
    drainHeadline = `${drainsUnverified} Drain${drainsUnverified !== 1 ? 's' : ''} — Status Unverified`;
    drainHeadlineColor = 'text-warning';
  }

  const safetyColor = statusColorClass(healthStatus);
  const safetyLabel = healthStatus
    ? healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)
    : '—';

  return (
    <section id="section3" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">
        {/* SECTION HEADER */}
        <h2 className="text-headline mona text-text-primary">Current Condition</h2>
        <p className="text-body mona text-text-muted mt-xs">Real-world evidence. Verified on site.</p>

        {/* TOP SUMMARY STRIP — same container as cards, flush left/right */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 w-full mt-md mb-xl">
          <div className="flex flex-col py-sm pr-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">BUILT</p>
            <p className="text-headline mona font-extrabold text-text-primary">{builtAgo}</p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">DOCUMENTED</p>
            <p className={`text-headline mona font-extrabold ${hasIssues ? 'text-failure' : 'text-text-primary'}`}>
              {documentedStr}
            </p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">ALLOCATED</p>
            <p className="text-headline mona font-extrabold text-text-primary">{sanctionedBudget}</p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">CONTRACTED</p>
            <p className="text-headline mona font-extrabold text-text-primary">{contractValue}</p>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col py-sm pl-md">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">SAFETY RATING</p>
            <p className={`text-headline mona font-extrabold ${safetyColor}`}>{safetyLabel}</p>
          </div>
        </div>

        {/* THREE CONDITION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md items-start"
             style={{ gridTemplateRows: 'auto' }}>
          <ConditionCard
            type="cracks"
            headlineCount={crackHeadline}
            headlineColor={crackEvents.length > 0 ? 'text-failure' : 'text-text-primary'}
            bodyText="Surface cracking documented across the road width."
            photos={crackPhotos}
          />
          <ConditionCard
            type="potholes"
            headlineCount={potholeHeadline}
            headlineColor={potholeEvents.length > 0 ? 'text-failure' : 'text-text-primary'}
            bodyText="Deep potholes forming on the road surface."
            photos={potholePhotos}
          />
          <ConditionCard
            type="drains"
            headlineCount={drainHeadline}
            headlineColor={drainHeadlineColor}
            bodyText="Drain billed and certified complete. Physical existence unverified."
            photos={drainPhotos}
            drains={drains}
          />
        </div>
      </div>
    </section>
  );
}
