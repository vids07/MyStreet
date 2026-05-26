import FaceCard from './FaceCard';
import type { FaceCardData } from '@/types/road';
import { ArrowDown, HelpCircle, Users } from 'lucide-react';

export type { FaceCardData };

type FacesSectionProps = {
  technicalChain: FaceCardData[];
  financialChain: FaceCardData[];
  administrativeChain: FaceCardData[];
  contractor: FaceCardData | null;
};

type GateProps = {
  gateNumber: number;
  title: string;
  subtitle: string;
  description: string;
  cards: FaceCardData[];
};

function Gate({ gateNumber, title, subtitle, description, cards }: GateProps) {
  if (cards.length === 0) return null;
  return (
    <div className="relative pl-sm md:pl-md border-l-2 border-dashed border-slate-300/80 pb-xl last:pb-0 last:border-l-0 group/gate">
      {/* Visual timeline connector dot */}
      <span className="absolute -left-[15px] top-[-4px] w-7 h-7 rounded-full bg-slate-200/50 group-hover/gate:bg-slate-300/50 animate-pulse z-0 pointer-events-none transition-colors" />
      <div className="absolute -left-[13px] top-[-2px] w-6 h-6 rounded-full bg-card border-2 border-text-muted/50 group-hover/gate:border-text-primary flex items-center justify-center font-mono text-[10px] font-black text-text-primary z-10 shadow-sm transition-all duration-300">
        0{gateNumber}
      </div>

      {/* Gate Meta Header */}
      <div className="flex flex-col gap-2xs mb-md">
        <div className="flex flex-wrap items-baseline gap-2xs md:gap-xs">
          <span className="text-[10px] font-mono font-black text-text-muted bg-slate-50 border border-border/60 px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
            GATE 0{gateNumber}
          </span>
          <h3 className="text-title mona text-text-primary font-black uppercase tracking-tight">
            {title}
          </h3>
        </div>
        <p className="text-body-bold roboto text-text-muted text-xs uppercase tracking-[0.1em]">
          {subtitle}
        </p>
        <p className="text-meta roboto text-text-muted max-w-2xl leading-relaxed mt-2xs">
          {description}
        </p>
      </div>

      {/* Scrollable Dossier Track */}
      <div className="relative -mx-sm px-sm md:mx-0 md:px-0">
        <div className="overflow-x-auto flex gap-md pb-md snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border/80 scrollbar-track-transparent">
          {cards.map((card) => (
            <div 
              key={card.fullName} 
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start"
            >
              <FaceCard
                fullName={card.fullName}
                designation={card.designation}
                jobDescription={card.jobDescription}
                actionLabel={card.actionLabel}
                isFailureChain={card.isFailureChain}
                payScale={card.payScale}
                salaryPerDay={card.salaryPerDay}
                salarySource={card.salarySource}
                accountabilityStatus={card.accountabilityStatus}
                photoUrl={card.photoUrl}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Connection Arrow to Next Gate */}
      <div className="absolute left-[-11px] bottom-0 w-5 h-5 flex items-center justify-center text-text-muted/40 pointer-events-none">
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </div>
  );
}

export default function FacesSection({
  technicalChain,
  financialChain,
  administrativeChain,
  contractor,
}: FacesSectionProps) {
  const totalCount =
    technicalChain.length +
    financialChain.length +
    administrativeChain.length +
    (contractor ? 1 : 0);

  return (
    <section id="section5" className="py-xl bg-surface border-t border-border/40">
      <div className="max-w-5xl mx-auto px-sm md:px-md flex flex-col gap-md">

        {/* Section Header (Forensic / Case File Style) */}
        <div className="flex flex-col gap-2xs border-b border-border pb-sm">
          <p className="text-label roboto text-text-muted uppercase tracking-[0.2em] mb-2xs flex items-center gap-xs">
            <Users size={12} />
            <span>CITIZEN CASE FILE // SECTION 05</span>
          </p>
          <h2 className="text-headline mona text-text-primary uppercase tracking-tight font-black leading-none">
            THE SIGN-OFF CHAIN // RESPONSIBILITY RECONCILIATION
          </h2>
          <p className="text-body roboto text-text-muted max-w-3xl leading-relaxed mt-xs">
            <strong>{totalCount} municipal officials and representatives</strong> cleared your hard-earned taxes to pay for a road that crumbled in months. They got paid. You got potholed. Here is the gatekeeper trail of where your money went.
          </p>
        </div>

        {/* The Chronological Flow of Money & Authority */}
        <div className="flex flex-col ml-3 md:ml-4 py-sm relative">
          
          <Gate
            gateNumber={1}
            title="FIELD INSPECTION & TECH SANCTION"
            subtitle="The Engineers"
            description="They are personally responsible for surveying construction quality. They inspected the work and officially certified the workmanship as 'perfect' and compliant."
            cards={technicalChain}
          />

          <Gate
            gateNumber={2}
            title="FINANCIAL AUDIT & VOUCHER CLEARANCE"
            subtitle="The Finance Team"
            description="They cross-checked ledger values, verified structural sign-offs on paper, and cleared the release of public taxpayer funds from municipal coffers."
            cards={financialChain}
          />

          <Gate
            gateNumber={3}
            title="EXECUTIVE AUTHORIZATION & SIGNATURE"
            subtitle="The Commissioner"
            description="The administrative pinnacle. The single highest signature required to finalize, seal, and dispatch public citizen money to the contractor."
            cards={administrativeChain}
          />

          {contractor && (
            <div className="relative pl-sm md:pl-md pb-0">
              {/* Visual timeline connector dot for Gate 4 */}
              <span className="absolute -left-[15px] top-[-4px] w-7 h-7 rounded-full bg-failure/20 animate-ping z-0 pointer-events-none" />
              <div className="absolute -left-[13px] top-[-2px] w-6 h-6 rounded-full bg-failure text-white border-2 border-failure flex items-center justify-center font-mono text-[10px] font-black z-10 shadow-sm animate-pulse">
                04
              </div>

              {/* Gate Meta Header */}
              <div className="flex flex-col gap-2xs mb-md">
                <div className="flex flex-wrap items-baseline gap-2xs md:gap-xs">
                  <span className="text-[10px] font-mono font-black text-white bg-failure border border-failure px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                    GATE 04 // RECIPIENT
                  </span>
                  <h3 className="text-title mona text-failure font-black uppercase tracking-tight">
                    EXECUTION & CONTRACTOR PROFIT
                  </h3>
                </div>
                <p className="text-body-bold roboto text-failure text-xs uppercase tracking-wide">
                  The Contractor
                </p>
                <p className="text-meta roboto text-text-muted max-w-2xl leading-relaxed mt-2xs">
                  The private entity paid with public funds. They delivered a road that fell apart in months, leaving citizens to either repair defects themselves or navigate dangerous conditions.
                </p>
              </div>

              {/* Scrollable Dossier Track */}
              <div className="relative -mx-sm px-sm md:mx-0 md:px-0">
                <div className="overflow-x-auto flex gap-md pb-md snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border/80 scrollbar-track-transparent">
                  <div className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start">
                    <FaceCard
                      fullName={contractor.fullName}
                      designation={contractor.designation}
                      jobDescription={contractor.jobDescription}
                      actionLabel={contractor.actionLabel}
                      isFailureChain={contractor.isFailureChain}
                      payScale={contractor.payScale}
                      salaryPerDay={contractor.salaryPerDay}
                      salarySource={contractor.salarySource}
                      accountabilityStatus={contractor.accountabilityStatus}
                      photoUrl={contractor.photoUrl}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
