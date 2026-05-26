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
  specsLabel: string | null;
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
      className="bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow overflow-hidden flex flex-col h-full"
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
              className="absolute bottom-xs left-xs flex items-center gap-1 bg-black/30 hover:bg-black/60 backdrop-blur-[2px] border border-white/10 text-white/60 hover:text-white rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 z-10 w-fit"
            >
              Photographed {formatDate(photo.capturedAt)}
              <ExternalLink size={10} strokeWidth={1.5} className="opacity-70" />
            </a>
          ) : null
        }
      />

      {/* FORENSIC DIAGNOSTIC HUD */}
      <div className="p-md flex flex-col gap-sm relative">
        {/* Technical HUD Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.2px, transparent 0)', backgroundSize: '16px 16px' }} />
        
        {/* Corner Accents for HUD look */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/30" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/30" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-text-muted/30" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-text-muted/30" />

        {/* Heading - THE CASE FILE */}
        <div className="relative z-10 pt-2">
          <h3 className="text-xl mona font-black text-text-primary uppercase tracking-tighter leading-none border-b-2 border-text-primary/10 pb-2">
            {card.heading}
          </h3>
        </div>

        {/* PRIMARY TRUTH - SLEEK UNIFIED FORENSIC STRIP */}
        <div className="relative z-10 flex items-center justify-between bg-slate-50 border border-border/60 rounded-sm px-4 py-3 shadow-sm divide-x divide-border/60">
          <div className="flex-1 flex flex-col justify-center pr-2">
            <span className="text-[10px] roboto text-text-muted font-black uppercase tracking-[0.15em] mb-1">ISSUES FOUND</span>
            <p className="text-xl mona font-black text-failure leading-none">{card.count}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center pl-4">
            <span className="text-[10px] roboto text-text-muted font-black uppercase tracking-[0.15em] mb-1">TAX WASTED</span>
            <p className="text-xl mona font-black text-text-primary leading-none">
              {formatLakh(card.budgetAmount)}
            </p>
          </div>
        </div>

        {/* VERDICT TICKER - THE DIGITAL ALERT */}
        <div className="relative z-10 bg-failure-bg/80 px-4 py-3 rounded-sm shadow-sm flex flex-col gap-1 border-l-4 border-failure">
          <div className="flex items-center justify-between">
            <p className="text-xl mona font-black text-failure uppercase tracking-tight leading-none">
              FAILED IN MONTHS
            </p>
            <span className="text-[10px] roboto text-failure/55 font-black tracking-widest animate-pulse">ALERT_FAILED</span>
          </div>
          <p className="text-xs roboto text-failure/85 font-bold uppercase tracking-wider">
            Evidence reported in 7 months
          </p>
        </div>

        {/* CHAIN OF CUSTODY - THE FORENSIC TIMELINE */}
        <div className="relative z-10 flex flex-col gap-3 py-1">
          <p className="text-[11px] roboto text-text-muted font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-text-muted rounded-full" />
            CHAIN OF CUSTODY / PROOF
          </p>
          <div className="flex flex-col gap-4.5 relative ml-2.5">
            <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-border/80" />
            {[
              { label: 'WORK ORDER ISSUED', date: card.workOrderDate },
              { label: 'CONSTRUCTION STARTED', date: card.constructionStartDate },
              { label: 'OFFICIALLY CERTIFIED', date: formatDate(card.certifiedDate) },
              { label: 'FORENSIC INSPECTION', date: formatDate(card.inspectedDate ?? card.certifiedDate) }
            ].map((step, i) => (
              <div key={i} className="flex flex-col relative pl-6">
                <div className="absolute left-0 top-[3px] w-2.5 h-2.5 bg-white border-2 border-text-primary rounded-full z-10" />
                <p className="text-[10px] roboto text-text-muted font-black uppercase tracking-wider leading-none mb-1">{step.label}</p>
                <p className="text-[13px] roboto text-text-primary font-bold leading-none">{step.date ?? '---'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACCOUNTABILITY SEAL - THE OFFICIAL SIGN-OFF */}
        <div className="relative z-10">
          <div className="bg-slate-50 border-t-2 border-text-primary p-4 rounded-sm relative overflow-hidden border border-border/60 shadow-sm">
            <p className="text-xs roboto uppercase text-text-primary font-black tracking-[0.15em] mb-3">
              APPROVED BY (GOVT OFFICIALS)
            </p>
            <div className="flex flex-col gap-3">
              {card.approvedBy.map((official, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-sm roboto text-text-primary font-black leading-tight uppercase tracking-tight">
                    {official.name}
                  </p>
                  <p className="text-[10px] roboto text-text-muted font-bold uppercase tracking-wider leading-none mt-1">
                    {official.designation}
                  </p>
                </div>
              ))}
            </div>
            {/* HUD Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-primary/[0.02] to-transparent h-[50%] animate-pulse" />
          </div>
        </div>

        {/* Footer - TECHNICAL SPEC */}
        {card.builtBy && (
          <div className="relative z-10 flex items-center justify-between pt-sm border-t border-border/40">
            <p className="text-[11px] roboto text-text-muted font-black uppercase tracking-wider">BUILT BY</p>
            <p className="text-xs roboto text-text-primary font-black uppercase tracking-tight">{card.builtBy}</p>
          </div>
        )}

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
  specsLabel,
}: ConditionSectionProps) {
  const safetyColor = statusColorClass(healthStatus);
  const safetyLabel = healthStatus
    ? healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)
    : '—';

  // Pulse logic for Point 05 (Safety Rating)
  const isPulsing = healthStatus === 'critical' || healthStatus === 'dangerous' || healthStatus === 'warning';
  const beaconColor = healthStatus === 'critical' || healthStatus === 'dangerous' ? 'bg-failure' : healthStatus === 'warning' ? 'bg-warning' : 'bg-evidence';

  const auditPoints = [
    { label: 'BUILT', value: builtAgo, color: 'text-text-primary' },
    { label: 'ALLOCATED', value: sanctionedBudget, color: 'text-text-primary' },
    { label: 'CONTRACTED', value: contractValue, color: 'text-text-primary' },
    { label: 'NET PAID', value: netDisbursed, color: 'text-text-primary' },
    { 
      label: 'SAFETY RATING', 
      value: safetyLabel, 
      color: safetyColor,
      hasBeacon: true 
    }
  ];

  return (
    <section id="section3" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">
        <h2 className="text-headline mona text-text-primary uppercase tracking-tight font-black">Current Condition</h2>
        <p className="text-body mona text-text-muted mt-xs uppercase tracking-widest text-xs font-bold">
          FORENSIC AUDIT RECORD: ROAD CONDITION DIAGNOSTIC
        </p>

        {/* NUMBERED AUDIT LEDGER - 5 POINT TRUTH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px w-full mt-xl mb-xl bg-border/40 border border-border/50 rounded-md overflow-hidden shadow-sm">
          {auditPoints.map((point, idx) => (
            <div 
              key={point.label} 
              className="relative flex flex-col justify-start p-md lg:p-lg bg-white/70 backdrop-blur-md min-h-[130px] group transition-colors hover:bg-white/90"
            >
              {/* Massive Forensic Watermark Number */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[7rem] mona font-black pointer-events-none select-none text-slate-900/[0.08] leading-none transition-all duration-500 group-hover:text-slate-900/[0.12]">
                0{idx + 1}
              </span>
              
              <div className="relative z-10 flex flex-col gap-sm">
                <p className="text-[12px] roboto uppercase text-text-primary font-black tracking-[0.25em] leading-none">
                  {point.label}
                </p>
                
                <div className="flex items-start gap-3 mt-1">
                  {point.hasBeacon && (
                    <span className="relative flex h-3.5 w-3.5 shrink-0 mt-1">
                      {isPulsing && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${beaconColor} opacity-75`}></span>}
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${beaconColor}`}></span>
                    </span>
                  )}
                  <p className={`text-2xl md:text-[1.65rem] mona font-black leading-[1.15] ${point.color} tracking-tight`}>
                    {point.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* THREE CONDITION CARDS */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-md items-start"
          style={{ gridTemplateRows: 'auto' }}
        >
          {cards.map((card) => (
            <div key={card.type} className="relative group">
              <ConditionCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
