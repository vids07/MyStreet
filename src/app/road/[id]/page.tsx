import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo,
  daysLasted,
  formatCurrency,
  formatLakh,
  formatDate,
  section4Title,
  benchmarkJeMonths,
  formatFailureDuration,
  getActionLabel,
  ISSUE_EVENT_TYPES,
  extractTenderEvidence,
  extractPaymentEvidence,
  extractCompletionEvidence,
  extractDlpEvidence,
  extractRepairEvidence,
  extractRtiEvidence,
  extractAppealEvidence,
  monthsApart,
  isSameDay,
  formatSalaryPerDay,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import type { PersonData, PhotoData, ApprovedOfficial, ConditionCardData, FaceCardData } from '@/types/road';
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

  const { road, events, photos, heroPhoto, confirmationCount, drains, segments } = data;

  // --- DATA DERIVATIONS ---

  // Finding the Tender Event
  const tenderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && extractTenderEvidence(e.evidence).isTender
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  // Work order: latest non-tender work_order_issued (events are DESC so .find gives newest first)
  const workOrderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && !extractTenderEvidence(e.evidence).isTender,
  );
  const constructionStartEvent = events.find(e => e.eventType === EVENT_TYPES.CONSTRUCTION_STARTED);

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

  const workOrderDate = workOrderEvent ? formatDate(workOrderEvent.timestamp) : null;
  const constructionStartDate = constructionStartEvent ? formatDate(constructionStartEvent.timestamp) : null;

  // Segment specs — area (SQM) and surface thickness (mm)
  const firstSegment = segments[0] ?? null;
  const specsLabel = firstSegment
    ? [
        firstSegment.area ? `${Number(firstSegment.area).toFixed(2)} SQM` : null,
        firstSegment.surfaceThickness ? `${firstSegment.surfaceThickness}mm thick` : null,
      ].filter(Boolean).join(' · ') || null
    : null;

  const conditionEvents = events.filter(e => (ISSUE_EVENT_TYPES as readonly string[]).includes(e.eventType));
  const section1Photos = photos.filter(p => p.eventId === null);

  // Street name for citizen-facing messages — hero photo label before " — ", fallback to ward/city
  const firstLabelledPhoto = [heroPhoto, ...section1Photos].find(p => p?.locationLabel);
  const streetName = firstLabelledPhoto?.locationLabel
    ? firstLabelledPhoto.locationLabel.split(' — ')[0]
    : [road.ward, road.city].filter(Boolean).join(', ') || road.roadDisplayName;

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
      countLabel: null,
      photos: crackPhotos,
      budgetAmount: roadSurfaceBudget,
      budgetLabel: roadSurfaceBudget !== null ? 'Road surface' : null,
      workOrderDate,
      constructionStartDate,
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
      countLabel: null,
      photos: potholePhotos,
      budgetAmount: roadSurfaceBudget,
      budgetLabel: roadSurfaceBudget !== null ? 'Road surface' : null,
      workOrderDate,
      constructionStartDate,
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
      countLabel: 'Sections damaged',
      photos: drainPhotos,
      budgetAmount: drainBudget,
      budgetLabel: drainBudget !== null ? 'Drain construction' : null,
      workOrderDate,
      constructionStartDate,
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

  // --- SECTION 4 DERIVATIONS ---

  const dlpEvent = events.find(e => e.eventType === EVENT_TYPES.DLP_STARTED);
  const { dlpEndDate } = extractDlpEvidence(dlpEvent?.evidence);
  const dlpExpired = dlpEndDate !== null && dlpEndDate < new Date();
  const dlpExpiryDate = dlpEndDate ? formatDate(dlpEndDate) : null;
  const dlpStartDate = dlpEvent ? formatDate(dlpEvent.timestamp) : null;

  // Private repairs: repair_done events where evidence.privatelyFunded === true
  const privateRepairEvents = events.filter(
    e => e.eventType === EVENT_TYPES.REPAIR_DONE && extractRepairEvidence(e.evidence).privatelyFunded,
  );

  // Days from certification to first recorded damage
  const firstConditionEvent = conditionEvents.length > 0
    ? [...conditionEvents].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      )[0]
    : null;
  const daysToFirstIssue = completionEvent && firstConditionEvent
    ? Math.floor(
        (new Date(firstConditionEvent.timestamp).getTime() - new Date(completionEvent.timestamp).getTime())
        / (1000 * 60 * 60 * 24),
      )
    : null;

  const costPerDay =
    daysToFirstIssue !== null && daysToFirstIssue > 0 && netDisbursed > 0
      ? formatCurrency(Math.round(netDisbursed / daysToFirstIssue))
      : null;

  // ((estimatedValue - contractValue) / estimatedValue) * 100, rounded to 1dp
  const underbidPercent =
    sanctionedBudget > 0 && contractValue > 0
      ? ((1 - contractValue / sanctionedBudget) * 100).toFixed(1)
      : null;

  // Rupee difference between estimate and contract — shown in money block for Sunita
  const underbidAmount =
    sanctionedBudget > 0 && contractValue > 0
      ? formatLakh(sanctionedBudget - contractValue)
      : null;

  const completionDateFormatted = completionEvent ? formatDate(completionEvent.timestamp) : null;

  // RTI: filed date + days the response was overdue (30-day legal window)
  const rtiEvent = events.find(e => e.eventType === EVENT_TYPES.RTI_FILED);
  const rtiResponseEvent = events.find(e => e.eventType === EVENT_TYPES.RTI_RESPONSE_RECEIVED);
  const rtiFiledDate = rtiEvent ? formatDate(rtiEvent.timestamp) : null;
  const rtiDaysOverdue =
    rtiEvent && rtiResponseEvent
      ? Math.max(
          0,
          Math.floor(
            (new Date(rtiResponseEvent.timestamp).getTime() - new Date(rtiEvent.timestamp).getTime())
            / (1000 * 60 * 60 * 24),
          ) - 30,
        )
      : null;
  // RTI appeals — from DB escalation_triggered events, sorted by timestamp
  const appealEvents = events
    .filter(e => e.eventType === EVENT_TYPES.ESCALATION_TRIGGERED)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const appeal1Event = appealEvents[0] ?? null;
  const appeal2Event = appealEvents[1] ?? null;
  const appeal1Date = appeal1Event ? formatDate(appeal1Event.timestamp) : null;
  const appeal2Date = appeal2Event ? formatDate(appeal2Event.timestamp) : null;
  const appeal1Evidence = extractAppealEvidence(appeal1Event?.evidence);
  const appeal2Evidence = extractAppealEvidence(appeal2Event?.evidence);
  const appeal1SentMode = appeal1Evidence.sentMode;
  const appeal1ReplyStatus = appeal1Evidence.replyStatus;
  const appeal2SentMode = appeal2Evidence.sentMode;
  const appeal2ReplyStatus = appeal2Evidence.replyStatus;
  const appealCount = appealEvents.length;
  const daysSilent = rtiEvent
    ? Math.floor((new Date().getTime() - new Date(rtiEvent.timestamp).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // First condition event date — for "First documented:" in card 2
  const firstConditionDate = firstConditionEvent ? formatDate(firstConditionEvent.timestamp) : null;

  // Months from certification to first recorded damage — dynamic "Failed in X months" label
  const failedInMonths: string | null = daysToFirstIssue !== null
    ? daysToFirstIssue < 30
      ? 'less than a month'
      : daysToFirstIssue < 60
        ? '1 month'
        : `${Math.floor(daysToFirstIssue / 30.44)} months`
    : null;

  // Road location string for Netherlands comparison block
  const roadLocation = "Purvi deen dayal, ward 28, roorkee";

  // --- SECTION 5 DERIVATIONS ---


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
      fullName:  person.fullName,
      designation: person.designationPlain ?? person.designation,
      jobDescription: person.jobDescription,
      actionLabel: getActionLabel(role, eventType),
      isFailureChain,
      payScale: person.payScale ?? null,
      salaryPerDay: formatSalaryPerDay(person.payScale),
      salarySource: person.salarySource ?? null,
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
    toFaceCard(findPerson('Shailendra Singh Rawat'), 'certifier', EVENT_TYPES.PAYMENT_RELEASED, false),
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
        salaryPerDay: null,
        salarySource: null,
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
        specsLabel={specsLabel}
      />

      {/* SECTION 4: THE BETRAYAL */}
      <BetrayalSection
        title={section4Title(road.healthStatus)}
        netDisbursed={formatLakh(netDisbursed)}
        sanctionedBudget={formatLakh(sanctionedBudget)}
        contractValue={formatLakh(contractValue)}
        issuesCount={conditionEvents.length}
        benchmarkJeMonths={benchmarkJeMonths(netDisbursed, certifierPerson)}
        crackCount={crackEvents.length}
        potholeCount={potholeEvents.length}
        drainCount={drainEvents.length}
        underbidPercent={underbidPercent}
        underbidAmount={underbidAmount}
        failedInMonths={failedInMonths}
        firstConditionDate={firstConditionDate}
        costPerDay={costPerDay}
        dlpExpired={dlpExpired}
        dlpStartDate={dlpStartDate}
        dlpExpiryDate={dlpExpiryDate}
        rtiFiledDate={rtiFiledDate}
        rtiDaysOverdue={rtiDaysOverdue}
        appeal1Date={appeal1Date}
        appeal1SentMode={appeal1SentMode}
        appeal1ReplyStatus={appeal1ReplyStatus}
        appeal2Date={appeal2Date}
        appeal2SentMode={appeal2SentMode}
        appeal2ReplyStatus={appeal2ReplyStatus}
        appealCount={appealCount}
        daysSilent={daysSilent}
        roadLocation={roadLocation}
        privateRepairCount={privateRepairEvents.length}
      />

      {/* SECTION 5: THE FACES */}
      <FacesSection
        technicalChain={technicalChain}
        financialChain={financialChain}
        administrativeChain={administrativeChain}
        contractor={contractorCard}
      />

      {/* SECTION 6: EMPOWERMENT */}
      <EmpowermentSection
        confirmationCount={confirmationCount}
        roadSystemId={road.roadSystemId}
        streetName={streetName}
      />
    </main>
  );
}
