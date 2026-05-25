import FaceCard from './FaceCard';
import type { FaceCardData } from '@/types/road';

export type { FaceCardData };

type FacesSectionProps = {
  technicalChain: FaceCardData[];
  financialChain: FaceCardData[];
  administrativeChain: FaceCardData[];
  contractor: FaceCardData | null;
};

type ChainGroupProps = {
  label: string;
  subtitle: string;
  cards: FaceCardData[];
};

function ChainGroup({ label, subtitle, cards }: ChainGroupProps) {
  if (cards.length === 0) return null;
  return (
    <div>
      <div className="mt-xl mb-sm">
        <p className="text-label roboto uppercase text-text-muted">{label}</p>
        <p className="text-meta roboto text-text-muted mt-2xs">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
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
    <section id="section5" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">

        <h2 className="text-headline mona text-text-primary">The Faces</h2>
        <p className="text-body mona text-text-muted mt-xs">
          {totalCount} people signed off on this road.
        </p>

        <ChainGroup
          label="The Engineers"
          subtitle="Each had to certify the work before money could move."
          cards={technicalChain}
        />
        <ChainGroup
          label="The Finance Team"
          subtitle="They verified the numbers and cleared the payment."
          cards={financialChain}
        />
        <ChainGroup
          label="The Commissioner"
          subtitle="The final signature. The one that released your money."
          cards={administrativeChain}
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
                isFailureChain={contractor.isFailureChain}
                payScale={contractor.payScale}
                salaryPerDay={contractor.salaryPerDay}
                salarySource={contractor.salarySource}
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
