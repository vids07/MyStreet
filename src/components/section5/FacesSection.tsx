import React from 'react';
import FaceCard from './FaceCard';
import type { FaceCardData } from '@/types/road';

export type { FaceCardData };

type FacesSectionProps = {
  technicalChain: FaceCardData[];
  financialChain: FaceCardData[];
  administrativeChain: FaceCardData[];
  contractor: FaceCardData | null;
  failureDuration: string;
};

type ChainGroupProps = {
  label: string;
  cards: FaceCardData[];
  failureDuration: string;
};

function ChainGroup({ label, cards, failureDuration }: ChainGroupProps) {
  if (cards.length === 0) return null;
  return (
    <div>
      <p className="text-label roboto uppercase text-text-muted mt-xl mb-sm">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {cards.map((card) => (
          <FaceCard
            key={card.fullName}
            fullName={card.fullName}
            designation={card.designation}
            jobDescription={card.jobDescription}
            actionLabel={card.actionLabel}
            failureDuration={card.isFailureChain ? failureDuration : null}
            payScale={card.payScale}
            accountabilityStatus={card.accountabilityStatus}
            photoUrl={card.photoUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default function FacesSection({
  technicalChain,
  financialChain,
  administrativeChain,
  contractor,
  failureDuration,
}: FacesSectionProps) {
  return (
    <section id="section5" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">

        <h2 className="text-headline mona text-text-primary">The Faces</h2>
        <p className="text-body mona text-text-muted mt-xs">
          Every person whose signature is on this project.
        </p>

        <ChainGroup
          label="Technical Chain"
          cards={technicalChain}
          failureDuration={failureDuration}
        />

        <ChainGroup
          label="Financial Chain"
          cards={financialChain}
          failureDuration={failureDuration}
        />

        <ChainGroup
          label="Administrative Chain"
          cards={administrativeChain}
          failureDuration={failureDuration}
        />

        {contractor && (
          <div className="mt-xl pt-xl border-t border-border">
            <p className="text-label roboto uppercase text-text-muted mb-sm">Contractor</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              <FaceCard
                fullName={contractor.fullName}
                designation={contractor.designation}
                jobDescription={contractor.jobDescription}
                actionLabel={contractor.actionLabel}
                failureDuration={contractor.isFailureChain ? failureDuration : null}
                payScale={contractor.payScale}
                accountabilityStatus={contractor.accountabilityStatus}
                photoUrl={contractor.photoUrl}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
