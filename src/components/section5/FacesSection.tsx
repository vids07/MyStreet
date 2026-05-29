'use client';

import { useState } from 'react';
import FaceCard from './FaceCard';
import type { FaceCardData } from '@/types/road';
import { Users, ChevronDown, FolderClosed, FolderOpen, DollarSign } from 'lucide-react';

export type { FaceCardData };

type FacesSectionProps = {
  technicalChain: FaceCardData[];
  financialChain: FaceCardData[];
  administrativeChain: FaceCardData[];
  contractor: FaceCardData | null;
  contractValue: string;
};

type DossierFolderProps = {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  cards: FaceCardData[];
  isOpen: boolean;
  onToggle: () => void;
  isContractor?: boolean;
};

function DossierFolder({
  stepNumber,
  title,
  subtitle,
  description,
  cards,
  isOpen,
  onToggle,
  isContractor = false,
}: DossierFolderProps) {
  if (cards.length === 0) return null;

  return (
    <div 
      className={`bg-card rounded-md border transition-all duration-300 overflow-hidden shadow-card hover:shadow-card-hover ${
        isOpen ? 'border-text-primary/20 bg-card' : 'border-border/60 hover:translate-y-[-1px]'
      }`}
    >
      {/* Clickable Header */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between p-sm md:p-md gap-sm relative group focus:outline-none"
      >
        {/* Sleek left color accent line */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300 ${
            isOpen ? (isContractor ? 'bg-failure' : 'bg-text-primary') : 'bg-transparent group-hover:bg-border'
          }`} 
        />

        <div className="flex items-center gap-sm">
          {/* Circular Folder Icon with Number */}
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 border ${
              isOpen 
                ? (isContractor ? 'bg-failure/10 border-failure text-failure' : 'bg-text-primary border-text-primary text-white') 
                : 'bg-slate-50 border-border/80 text-text-muted group-hover:border-text-muted/60'
            }`}
          >
            {isOpen ? (
              <FolderOpen size={16} strokeWidth={1.5} />
            ) : (
              <FolderClosed size={16} strokeWidth={1.5} />
            )}
          </div>

          {/* Folder Metadata */}
          <div className="flex flex-col gap-[2px]">
            <div className="flex flex-wrap items-center gap-2xs">
              <span className={`text-[9px] font-mono font-black px-1.5 py-[1px] rounded-xs tracking-wider uppercase border ${
                isOpen
                  ? (isContractor ? 'border-failure/30 text-failure bg-failure-bg/30' : 'border-text-primary/20 text-text-primary bg-slate-50')
                  : 'border-border/60 text-text-muted bg-slate-50'
              }`}>
                STEP 0{stepNumber}
              </span>
              <span className="text-[10px] roboto text-text-muted uppercase font-bold tracking-wider">
                {subtitle}
              </span>
            </div>
            <h3 className={`text-body-bold md:text-title mona transition-colors duration-200 uppercase font-black tracking-tight leading-tight ${
              isOpen ? (isContractor ? 'text-failure' : 'text-text-primary') : 'text-text-primary group-hover:text-text-muted'
            }`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Expand / Collapse Indicator */}
        <div className="flex items-center gap-xs">
          <span className="hidden sm:inline text-[10px] roboto font-black tracking-widest text-text-muted uppercase bg-slate-50 border border-border/40 px-2 py-0.5 rounded-xs">
            [{cards.length} {cards.length === 1 ? (isContractor ? 'RECIPIENT' : 'SIGNATURE') : 'SIGNATURES'}]
          </span>
          <ChevronDown 
            size={18} 
            strokeWidth={1.5}
            className={`text-text-muted/60 group-hover:text-text-primary transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-text-primary' : ''
            }`} 
          />
        </div>
      </button>

      {/* Smoothly Animating Drawer Content */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-border/40' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-sm md:p-md bg-surface/35 flex flex-col gap-sm">
            {/* Folder description */}
            <p className="text-body-bold roboto text-text-muted max-w-2xl leading-relaxed text-xs border-b border-border/30 pb-xs">
              {description}
            </p>

            {/* Rendered cards in a beautiful, neat list */}
            <div className="flex flex-col gap-sm">
              {cards.map((card) => (
                <FaceCard
                  key={card.fullName}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FacesSection({
  technicalChain,
  financialChain,
  administrativeChain,
  contractor,
  contractValue,
}: FacesSectionProps) {
  const totalCount =
    technicalChain.length +
    financialChain.length +
    administrativeChain.length +
    (contractor ? 1 : 0);

  // Default step 1 to be expanded initially
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  return (
    <section id="section5" className="py-xl bg-surface border-t border-border/40">
      <div className="max-w-3xl mx-auto px-sm md:px-md flex flex-col gap-md">

        {/* Section Header (Forensic / Case File Style) */}
        <div className="flex flex-col gap-2xs border-b border-border pb-sm">
          <p className="text-label roboto text-text-muted uppercase tracking-[0.2em] mb-2xs flex items-center gap-xs">
            <Users size={12} strokeWidth={1.5} />
            <span>CITIZEN CASE FILE // SECTION 05</span>
          </p>
          <h2 className="text-headline mona text-text-primary uppercase tracking-tight font-black leading-none">
            WHO SIGNED THE PAPERS? // THE RESPONSIBILITY TRAIL
          </h2>
          <p className="text-body roboto text-text-muted max-w-3xl leading-relaxed mt-xs">
            <strong>{totalCount} officials and builders</strong> approved your hard-earned tax money for a road that broke in months. Tap any steps below to inspect their files, salaries, and sign-offs.
          </p>
        </div>

        {/* Mini Payout Summary Header Widget */}
        <div className="bg-card rounded-md border border-border/50 p-xs sm:p-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-sm relative overflow-hidden shadow-card">
          <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-amber-500" />
          <div className="flex flex-col gap-2xs pl-xs">
            <span className="text-[10px] roboto text-text-muted font-bold uppercase tracking-wider">💸 PUBLIC FUNDS DEBITED</span>
            <div className="flex items-baseline gap-2xs">
              <h2 className="text-xl md:text-2xl mona text-text-primary font-black leading-none">
                ₹{contractValue}
              </h2>
              <span className="text-[10px] roboto text-text-muted uppercase font-bold">from Citizen Pool</span>
            </div>
          </div>
          <div className="flex items-center gap-2xs text-[10px] roboto text-text-muted bg-slate-50 border border-border/60 px-2 py-1 rounded-xs">
            <DollarSign size={12} strokeWidth={1.5} />
            <span>STATUS: WORK COMMITTED & COMPLETED</span>
          </div>
        </div>

        {/* Interactive Dossier Stack (Concept B) */}
        <div className="flex flex-col gap-sm">
          <DossierFolder
            stepNumber={1}
            title="Who Checked the Quality"
            subtitle="THE ENGINEERS"
            description="Their job was to inspect the road construction quality and make sure it is safe. They signed a paper saying the work was perfect—but it broke in months."
            cards={technicalChain}
            isOpen={expandedStep === 1}
            onToggle={() => toggleStep(1)}
          />

          <DossierFolder
            stepNumber={2}
            title="Who Paid Out the Money"
            subtitle="THE FINANCE TEAM"
            description="They checked the municipal ledger files and officially approved releasing your hard-earned tax money from the public bank accounts."
            cards={financialChain}
            isOpen={expandedStep === 2}
            onToggle={() => toggleStep(2)}
          />

          <DossierFolder
            stepNumber={3}
            title="Who Gave Final Approval"
            subtitle="THE COMMISSIONER"
            description="The administrative pinnacle. This single highest signature officially locked the decision, sealed the transaction, and dispatched citizens' tax money."
            cards={administrativeChain}
            isOpen={expandedStep === 3}
            onToggle={() => toggleStep(3)}
          />

          {contractor && (
            <DossierFolder
              stepNumber={4}
              title="Who Built the Road"
              subtitle="THE CONTRACTOR"
              description="The private builder paid with public tax funds. They delivered a road that broke in months, keeping your hard-earned tax rupees as profit."
              cards={[contractor]}
              isOpen={expandedStep === 4}
              onToggle={() => toggleStep(4)}
              isContractor={true}
            />
          )}
        </div>

      </div>
    </section>
  );
}
