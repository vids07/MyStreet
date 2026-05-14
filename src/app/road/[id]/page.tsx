import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo,
  daysLasted,
  formatCurrency,
  section4Title,
  benchmarkBags,
  benchmarkJeMonths,
  ISSUE_EVENT_TYPES,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import ConditionSection from '@/components/section3/ConditionSection';
import BetrayalSection from '@/components/section4/BetrayalSection';
import FacesSection from '@/components/section5/FacesSection';
import EmpowermentSection from '@/components/section6/EmpowermentSection';

export const dynamic = 'force-dynamic';

export default async function RoadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, events, photos, heroPhoto, confirmationCount, drains } = data;

  // --- DATA DERIVATIONS ---

  // Finding the Tender Event
  const tenderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && e.evidence?.isTender === true
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  const completionEvent = events.find(e => e.eventType === EVENT_TYPES.COMPLETION_CLAIMED);
  const paymentEvent = events.find(e => e.eventType === EVENT_TYPES.PAYMENT_RELEASED);

  // Financial Values
  const paymentEvidence = paymentEvent?.evidence as Record<string, unknown> | null;
  const netDisbursed = Number(paymentEvidence?.netDisbursed ?? 0);
  const sanctionedBudget = Number(tenderEvent?.evidence?.estimatedValue ?? 0);
  const contractValue = Number(tenderEvent?.evidence?.contractValue ?? 0);

  // Finding the Primary Certifier (Lowest rank official on completion)
  const completionParticipants = completionEvent?.participants ?? [];
  const certifiers = completionParticipants.filter(p => p.role === 'certifier');
  const officialCertifiers = certifiers.filter(p => p.person?.personCategory === 'official');
  const primaryCertifierParticipant = officialCertifiers.sort(
    (a, b) => Number(a.person?.monthlySalary ?? 0) - Number(b.person?.monthlySalary ?? 0)
  )[0];
  const certifierPerson = primaryCertifierParticipant?.person;

  // Finding the Contractor
  const contractorParticipant = events
    .flatMap(e => e.participants)
    .find(p => p.person?.personCategory === 'contractor');
  const contractorPerson = contractorParticipant?.person;

  const conditionEvents = events.filter(e => ISSUE_EVENT_TYPES.includes(e.eventType as any));

  return (
    <main className="bg-surface min-h-screen">
      {/* SECTION 1: THE HERO */}
      <HeroSection 
        road={road} 
        heroPhoto={heroPhoto}
        builtAgo={builtMonthsAgo(tenderEvent)}
        daysLasted={daysLasted(completionEvent, road.healthStatus)}
        netDisbursed={formatCurrency(netDisbursed)}
      />

      {/* SECTION 3: CURRENT CONDITION */}
      <ConditionSection 
        events={events} 
        photos={photos} 
        drains={drains} 
      />

      {/* SECTION 4: THE BETRAYAL */}
      <BetrayalSection 
        title={section4Title(road.healthStatus)}
        netDisbursed={formatCurrency(netDisbursed)}
        sanctionedBudget={formatCurrency(sanctionedBudget)}
        contractValue={formatCurrency(contractValue)}
        builtAgo={builtMonthsAgo(tenderEvent)}
        daysLasted={daysLasted(completionEvent, road.healthStatus)}
        issuesCount={conditionEvents.length}
        benchmarkBags={benchmarkBags(netDisbursed)}
        benchmarkJeMonths={benchmarkJeMonths(netDisbursed, certifierPerson)}
      />

      {/* SECTION 5: THE FACES */}
      <FacesSection 
        certifier={certifierPerson} 
        contractor={contractorPerson} 
      />

      {/* SECTION 6: EMPOWERMENT */}
      <EmpowermentSection 
        confirmationCount={confirmationCount} 
        roadId={road.id} 
      />
    </main>
  );
}
