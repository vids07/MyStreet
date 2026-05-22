import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo,
  daysLasted,
  formatCurrency,
  formatLakh,
  section4Title,
  benchmarkBags,
  benchmarkJeMonths,
  formatFailureDuration,
  getActionLabel,
  ISSUE_EVENT_TYPES,
  extractTenderEvidence,
  extractPaymentEvidence,
  extractCompletionEvidence,
  monthsApart,
  isSameDay,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import type { PersonData, PhotoData, ApprovedOfficial, ConditionCardData } from '@/types/road';
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
  const { netDisbursed, roadSurfaceBudget, drainBudget } = extractPaymentEvidence(paymentEvent?.evidence);
  const { estimatedValue: sanctionedBudget, contractValue } = extractTenderEvidence(tenderEvent?.evidence);
  const { inspectionDate } = extractCompletionEvidence(completionEvent?.evidence);

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

  // --- CONDITION CARDS ---

  const crackEvents = events.filter(e => e.eventType === EVENT_TYPES.CRACK_FOUND);
  const potholeEvents = events.filter(e => e.eventType === EVENT_TYPES.POTHOLE_FOUND);
  const drainEvents = events.filter(e => e.eventType === EVENT_TYPES.DRAIN_BLOCKED);

  const crackPhotos = photos.filter(p => crackEvents.some(e => e.id === p.eventId));
  const potholePhotos = photos.filter(p => potholeEvents.some(e => e.id === p.eventId));
  const drainPhotos = photos.filter(p => drainEvents.some(e => e.id === p.eventId));

  const certifiedDate = completionEvent?.timestamp ?? null;
  const inspectedSameDay = certifiedDate && inspectionDate
    ? isSameDay(certifiedDate, inspectionDate)
    : false;

  const completionApprovers: ApprovedOfficial[] = (completionEvent?.participants ?? [])
    .filter(p => (p.role === 'certifier' || p.role === 'authoriser') && p.person?.personCategory === 'official')
    .sort((a, b) => {
      const salA = a.person?.monthlySalary != null ? Number(a.person.monthlySalary) : Infinity;
      const salB = b.person?.monthlySalary != null ? Number(b.person.monthlySalary) : Infinity;
      return salA - salB;
    })
    .map(p => ({
      name: p.person!.fullName,
      designation: p.person!.designationPlain ?? p.person!.designation ?? '',
    }));

  const contractorPerson2 = events
    .flatMap(e => e.participants)
    .find(p => p.personType === 'contractor' && p.role === 'assignee')?.person;
  const builtByName = contractorPerson2?.department?.split(',')[0]?.trim()
    ?? contractorPerson2?.fullName
    ?? null;

  function firstPhotoDate(arr: PhotoData[]): Date | null {
    const dates = arr.flatMap(p => p.capturedAt ? [new Date(p.capturedAt)] : []);
    if (dates.length === 0) return null;
    return new Date(Math.min(...dates.map(d => d.getTime())));
  }

  const conditionCards: ConditionCardData[] = [
    {
      type: 'cracks',
      heading: 'Surface Cracks',
      count: crackEvents.length,
      photos: crackPhotos,
      budgetAmount: roadSurfaceBudget,
      budgetLabel: roadSurfaceBudget !== null ? 'Road surface' : null,
      certifiedDate: certifiedDate ? new Date(certifiedDate) : null,
      inspectedDate: inspectionDate,
      inspectedSameDay,
      monthsAfterCertification: certifiedDate && crackPhotos.length > 0
        ? monthsApart(new Date(certifiedDate), firstPhotoDate(crackPhotos) ?? new Date())
        : null,
      approvedBy: completionApprovers,
      builtBy: builtByName,
    },
    {
      type: 'potholes',
      heading: 'Potholes',
      count: potholeEvents.length,
      photos: potholePhotos,
      budgetAmount: roadSurfaceBudget,
      budgetLabel: roadSurfaceBudget !== null ? 'Road surface' : null,
      certifiedDate: certifiedDate ? new Date(certifiedDate) : null,
      inspectedDate: inspectionDate,
      inspectedSameDay,
      monthsAfterCertification: certifiedDate && potholePhotos.length > 0
        ? monthsApart(new Date(certifiedDate), firstPhotoDate(potholePhotos) ?? new Date())
        : null,
      approvedBy: completionApprovers,
      builtBy: builtByName,
    },
    {
      type: 'drains',
      heading: 'Drains',
      count: drainEvents.length,
      photos: drainPhotos,
      budgetAmount: drainBudget,
      budgetLabel: drainBudget !== null ? 'Drain construction' : null,
      certifiedDate: certifiedDate ? new Date(certifiedDate) : null,
      inspectedDate: inspectionDate,
      inspectedSameDay,
      monthsAfterCertification: certifiedDate && drainPhotos.length > 0
        ? monthsApart(new Date(certifiedDate), firstPhotoDate(drainPhotos) ?? new Date())
        : null,
      approvedBy: completionApprovers,
      builtBy: builtByName,
    },
  ];

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
    toFaceCard(findPerson('Prem Kumar Sharma'),     'certifier',  EVENT_TYPES.COMPLETION_CLAIMED, true),
    toFaceCard(findPerson('P. Sharma'),             'certifier',  EVENT_TYPES.COMPLETION_CLAIMED, true),
    toFaceCard(findPerson('Anand Singh Mishrawan'), 'authoriser', EVENT_TYPES.COMPLETION_CLAIMED, true),
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
        cards={conditionCards}
        builtAgo={builtMonthsAgo(completionEvent)}
        sanctionedBudget={formatLakh(sanctionedBudget)}
        contractValue={formatLakh(contractValue)}
        netDisbursed={formatLakh(netDisbursed)}
        healthStatus={road.healthStatus}
      />

      {/* SECTION 4: THE BETRAYAL */}
      <BetrayalSection 
        title={section4Title(road.healthStatus)}
        netDisbursed={formatCurrency(netDisbursed)}
        sanctionedBudget={formatCurrency(sanctionedBudget)}
        contractValue={formatCurrency(contractValue)}
        builtAgo={builtMonthsAgo(completionEvent)}
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
