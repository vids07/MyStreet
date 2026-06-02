import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo,
  formatLakh,
  extractTenderEvidence,
  extractPaymentEvidence,
  extractCompletionEvidence,
} from '@/lib/utils/road-display';
import HeroSection from '@/components/section1/HeroSection';
import ConditionSection from '@/components/section3/ConditionSection';
import AuditFolderTabs from '@/components/shared/AuditFolderTabs';
import type { ApprovedOfficial, ConditionCardData, PhotoData } from '@/types/road';
import { EVENT_TYPES } from '@/types/road';

export const dynamic = 'force-dynamic';

export default async function RoadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, events, photos, heroPhoto, segments } = data;

  // --- DATA DERIVATIONS ---

  // Finding the Tender Event
  const tenderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && extractTenderEvidence(e.evidence).isTender
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  // Work order
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

  const workOrderDate = workOrderEvent ? formatDate(workOrderEvent.timestamp) : null;
  const constructionStartDate = constructionStartEvent ? formatDate(constructionStartEvent.timestamp) : null;

  // Segment specs
  const firstSegment = segments[0] ?? null;
  const specsLabel = firstSegment
    ? [
        firstSegment.area ? `${Number(firstSegment.area).toFixed(2)} SQM` : null,
        firstSegment.surfaceThickness ? `${firstSegment.surfaceThickness}mm thick` : null,
      ].filter(Boolean).join(' · ') || null
    : null;

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

  const contractorPerson = events
    .flatMap(e => e.participants)
    .find(p => p.personType === 'contractor' && p.role === 'assignee')?.person;
  const builtByName = contractorPerson?.department?.split(',')[0]?.trim()
    ?? contractorPerson?.fullName
    ?? null;

  function firstPhotoDate(arr: PhotoData[]): Date | null {
    const dates = arr.flatMap(p => p.capturedAt ? [new Date(p.capturedAt)] : []);
    if (dates.length === 0) return null;
    return new Date(Math.min(...dates.map(d => d.getTime())));
  }

  function isSameDay(a: Date | string, b: Date | string): boolean {
    const da = new Date(a);
    const db = new Date(b);
    return da.getFullYear() === db.getFullYear()
      && da.getMonth() === db.getMonth()
      && da.getDate() === db.getDate();
  }

  function monthsApart(from: Date, to: Date): string {
    const months = Math.floor(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
    );
    if (months < 1) return 'less than a month later';
    if (months === 1) return '1 month later';
    return `${months} months later`;
  }

  function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'Date unknown';
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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

  return (
    <main className="bg-surface min-h-screen">
      {/* PORTAL NAVIGATION TAB */}
      <AuditFolderTabs
        roadId={road.roadSystemId}
        activeTab="condition"
      />

      {/* HERO CONTEXT */}
      <HeroSection
        road={road}
        heroPhoto={heroPhoto}
        section1Photos={section1Photos}
      />

      {/* CORE SPECIFIC CONTENT */}
      <ConditionSection
        cards={conditionCards}
        builtAgo={builtMonthsAgo(completionEvent)}
        sanctionedBudget={formatLakh(sanctionedBudget)}
        contractValue={formatLakh(contractValue)}
        netDisbursed={formatLakh(netDisbursed)}
        healthStatus={road.healthStatus}
        specsLabel={specsLabel}
      />
    </main>
  );
}
