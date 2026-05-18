import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo,
  daysLasted,
  formatCurrency,
  section4Title,
  benchmarkBags,
  benchmarkJeMonths,
  formatFailureDuration,
  getActionLabel,
  ISSUE_EVENT_TYPES,
  extractTenderEvidence,
  extractPaymentEvidence,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import type { PersonData } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import ConditionSection from '@/components/section3/ConditionSection';
import BetrayalSection from '@/components/section4/BetrayalSection';
import FacesSection from '@/components/section5/FacesSection';
import type { FaceCardData } from '@/components/section5/FacesSection';
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
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && extractTenderEvidence(e.evidence).isTender
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  const completionEvent = events.find(e => e.eventType === EVENT_TYPES.COMPLETION_CLAIMED);
  const paymentEvent = events.find(e => e.eventType === EVENT_TYPES.PAYMENT_RELEASED);

  // Financial Values
  const { netDisbursed } = extractPaymentEvidence(paymentEvent?.evidence);
  const { estimatedValue: sanctionedBudget, contractValue } = extractTenderEvidence(tenderEvent?.evidence);

  // Finding the Primary Certifier (Lowest rank official on completion)
  const completionParticipants = completionEvent?.participants ?? [];
  const certifiers = completionParticipants.filter(p => p.role === 'certifier');
  const officialCertifiers = certifiers.filter(p => p.person?.personCategory === 'official');
  const primaryCertifierParticipant = officialCertifiers.sort((a, b) => {
    const salA = a.person?.monthlySalary != null ? Number(a.person.monthlySalary) : Infinity;
    const salB = b.person?.monthlySalary != null ? Number(b.person.monthlySalary) : Infinity;
    return salA - salB;
  })[0];
  const certifierPerson = primaryCertifierParticipant?.person;

  const conditionEvents = events.filter(e => ISSUE_EVENT_TYPES.includes(e.eventType as any));
  const section1Photos = photos.filter(p => p.eventId === null);

  // --- SECTION 5 DERIVATIONS ---

  const failureDuration = formatFailureDuration(completionEvent?.timestamp);

  // All persons that appear in any event's participant list.
  // Persons seeded but not linked to an event (Mohan Singh, Narendra Singh Rawat,
  // Karmendra Singh) are not in this list — they render as absent cards.
  const allPersons: PersonData[] = data.events.flatMap(e =>
    e.participants
      .map(p => p.person)
      .filter((p): p is PersonData => p !== null),
  );

  const findPerson = (name: string): PersonData | null =>
    allPersons.find(p => p.fullName === name) ?? null;

  const toFaceCard = (
    person: PersonData | null,
    role: string,
    eventType: string,
    isFailureChain: boolean,
  ): FaceCardData | null => {
    if (!person) return null;
    return {
      fullName: person.fullName,
      designation: person.designationPlain ?? person.designation,
      jobDescription: person.jobDescription,
      actionLabel: getActionLabel(role, eventType),
      isFailureChain,
      payScale: person.payScale ?? null,
      accountabilityStatus: person.accountabilityStatus ?? null,
      photoUrl: null,
    };
  };

  const technicalChain: FaceCardData[] = [
    toFaceCard(findPerson('Gurukesh Singh'),    'certifier',  EVENT_TYPES.COMPLETION_CLAIMED, true),
    toFaceCard(findPerson('Prem Kumar Sharma'), 'certifier',  EVENT_TYPES.COMPLETION_CLAIMED, true),
    toFaceCard(findPerson('Aashray Singh Mishra'), 'authoriser', EVENT_TYPES.COMPLETION_CLAIMED, true),
  ].filter((c): c is FaceCardData => c !== null);

  const financialChain: FaceCardData[] = [
    toFaceCard(findPerson('Prashant Kumar'), 'authoriser', EVENT_TYPES.PAYMENT_RELEASED, false),
    toFaceCard(findPerson('Sachin Kumar'),   'reporter',   EVENT_TYPES.PAYMENT_RELEASED, false),
    toFaceCard(findPerson('Mohan Singh'),    'certifier',  EVENT_TYPES.PAYMENT_RELEASED, false),
    toFaceCard(findPerson('Narendra Singh Rawat'), 'certifier', EVENT_TYPES.PAYMENT_RELEASED, false),
  ].filter((c): c is FaceCardData => c !== null);

  const administrativeChain: FaceCardData[] = [
    toFaceCard(findPerson('Jitendra Kumar'),   'authoriser', EVENT_TYPES.COMPLETION_CLAIMED, false),
    toFaceCard(findPerson('Karmendra Singh'),  'authoriser', EVENT_TYPES.WORK_ORDER_ISSUED,  false),
  ].filter((c): c is FaceCardData => c !== null);

  const contractorPerson = allPersons.find(p => p.personCategory === 'contractor') ?? null;
  const contractorCard: FaceCardData | null = contractorPerson
    ? {
        fullName: contractorPerson.fullName,
        designation: contractorPerson.designationPlain ?? contractorPerson.designation,
        jobDescription: contractorPerson.jobDescription,
        actionLabel: getActionLabel('assignee', EVENT_TYPES.WORK_ORDER_ISSUED),
        isFailureChain: true,
        payScale: null,
        accountabilityStatus: contractorPerson.accountabilityStatus ?? null,
        photoUrl: null,
      }
    : null;

  return (
    <main className="bg-surface min-h-screen">
      {/* SECTION 1: THE HERO */}
      <HeroSection
        road={road}
        heroPhoto={heroPhoto}
        section1Photos={section1Photos}
      />

      {/* SECTION 3: CURRENT CONDITION */}
      <ConditionSection
        events={events}
        photos={photos}
        drains={drains}
        builtAgo={builtMonthsAgo(tenderEvent)}
        sanctionedBudget={formatCurrency(sanctionedBudget)}
        contractValue={formatCurrency(contractValue)}
        healthStatus={road.healthStatus}
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
        technicalChain={technicalChain}
        financialChain={financialChain}
        administrativeChain={administrativeChain}
        contractor={contractorCard}
        failureDuration={failureDuration}
      />

      {/* SECTION 6: EMPOWERMENT */}
      <EmpowermentSection 
        confirmationCount={confirmationCount} 
        roadId={road.id} 
      />
    </main>
  );
}
