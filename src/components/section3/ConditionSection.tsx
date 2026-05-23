'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ConditionCardData, PhotoData } from '@/types/road';
import { formatDate, formatLakh, abbreviateDesignation } from '@/lib/utils/road-display';
import PhotoCarousel from '@/components/shared/PhotoCarousel';

type ConditionSectionProps = {
  cards: ConditionCardData[];
  builtAgo: string;
  sanctionedBudget: string;
  contractValue: string;
  netDisbursed: string;
  healthStatus: string | null;
};

function statusColorClass(status: string | null | undefined): string {
  switch (status) {
    case 'critical':   return 'text-failure';
    case 'warning':    return 'text-warning';
    case 'good':       return 'text-evidence';
    case 'dangerous':  return 'text-dangerous';
    default:           return 'text-text-muted';
  }
}

function ConditionCard({ card }: { card: ConditionCardData }) {
  const [, setActivePhoto] = useState<PhotoData | null>(
    () => card.photos.find(p => !p.url.toLowerCase().endsWith('.heic')) ?? null,
  );

  return (
    <div
      className="bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow overflow-hidden grid"
      style={{ gridRow: 'span 8', gridTemplateRows: 'subgrid' }}
    >
      {/* ROWS 1–2: photo + dots (PhotoCarousel fragment) */}
      <PhotoCarousel
        photos={card.photos}
        height="h-64"
        onActivePhotoChange={setActivePhoto}
        renderSlideBottom={(photo) =>
          photo.capturedAt ? (
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-xs left-xs flex items-center gap-2xs text-label roboto text-white/60 uppercase tracking-widest hover:text-white/90 transition-colors z-10 w-fit"
            >
              Photographed {formatDate(photo.capturedAt)}
              <ExternalLink size={12} strokeWidth={1.5} />
            </a>
          ) : null
        }
      />

      {/* ROWS 3–8: card body */}
      <div className="p-sm grid gap-sm" style={{ gridTemplateRows: 'subgrid', gridRow: 'span 6' }}>

        {/* ROW 3 — Heading */}
        <h3 className="text-body-bold mona text-text-primary self-start">{card.heading}</h3>

        {/* ROW 4 — Budget */}
        <div>
          {card.budgetAmount !== null && card.budgetLabel !== null ? (
            <div>
              <p className="text-label roboto uppercase text-text-muted">{card.budgetLabel} money spent</p>
              <p className="text-headline mona font-extrabold text-text-primary mt-2xs">
                {formatLakh(card.budgetAmount)}
              </p>
            </div>
          ) : <div />}
        </div>

        {/* ROW 5 — Count */}
        <div>
          <p className="text-label roboto uppercase text-text-muted">{card.countLabel ?? `${card.heading} found`}</p>
          <p className="text-headline mona font-extrabold text-failure mt-2xs">{card.count}</p>
        </div>

        {/* ROW 6 — Timeline */}
        <div>
          {card.certifiedDate !== null ? (
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-label roboto text-text-muted">Certified</span>
                <span className="text-label roboto text-text-primary">{formatDate(card.certifiedDate)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-label roboto text-text-muted">Inspected</span>
                <span className="text-label roboto text-text-primary">
                  {formatDate(card.inspectedDate ?? card.certifiedDate)}
                  {card.inspectedSameDay && (
                    <span className="text-text-muted ml-2xs">(same day)</span>
                  )}
                </span>
              </div>
              {card.monthsAfterCertification !== null && (
                <div className="flex justify-between items-baseline">
                  <span className="text-label roboto text-text-muted">Damage found</span>
                  <span className="text-label roboto text-failure">{card.monthsAfterCertification}</span>
                </div>
              )}
            </div>
          ) : <div />}
        </div>

        {/* ROW 7 — Approved by */}
        <div>
          {card.approvedBy.length > 0 ? (
            <div>
              <p className="text-label roboto uppercase text-text-muted mb-xs">Approved by</p>
              <div className="flex flex-col gap-2xs">
                {card.approvedBy.map((official, i) => (
                  <p key={i} className="text-meta roboto text-text-primary">
                    {official.name}
                    <span className="text-text-muted ml-2xs">
                      ({abbreviateDesignation(official.designation)})
                    </span>
                  </p>
                ))}
                
              </div>
            </div>
          ) : <div />}
        </div>

        {/* ROW 8 — Built by */}
        <div>
          {card.builtBy !== null ? (
            <div>
              <p className="text-label roboto uppercase text-text-muted">Built by</p>
              <p className="text-meta roboto text-text-primary mt-2xs">{card.builtBy}</p>
            </div>
          ) : <div />}
        </div>

      </div>
    </div>
  );
}

export default function ConditionSection({
  cards,
  builtAgo,
  sanctionedBudget,
  contractValue,
  netDisbursed,
  healthStatus,
}: ConditionSectionProps) {
  const safetyColor = statusColorClass(healthStatus);
  const safetyLabel = healthStatus
    ? healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)
    : '—';

  return (
    <section id="section3" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">
        <h2 className="text-headline mona text-text-primary">Current Condition</h2>
        <p className="text-body mona text-text-muted mt-xs">Real-world evidence. Verified on site.</p>

        {/* SUMMARY STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 w-full mt-md mb-xl">
          <div className="flex flex-col py-sm pr-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">BUILT</p>
            <p className="text-headline mona font-extrabold text-text-primary">{builtAgo}</p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">ALLOCATED</p>
            <p className="text-headline mona font-extrabold text-text-primary">{sanctionedBudget}</p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">CONTRACTED</p>
            <p className="text-headline mona font-extrabold text-text-primary">{contractValue}</p>
          </div>
          <div className="flex flex-col py-sm px-md md:border-r md:border-[0.5px] md:border-border">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">NET PAID</p>
            <p className="text-headline mona font-extrabold text-text-primary">{netDisbursed}</p>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col py-sm pl-md">
            <p className="text-label roboto uppercase text-text-muted mb-2xs">SAFETY RATING</p>
            <p className={`text-headline mona font-extrabold ${safetyColor}`}>{safetyLabel}</p>
          </div>
        </div>

        {/* THREE CONDITION CARDS */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-md items-start"
          style={{ gridTemplateRows: 'auto' }}
        >
          {cards.map(card => (
            <ConditionCard key={card.type} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
