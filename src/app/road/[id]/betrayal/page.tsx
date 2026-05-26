import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  formatDate,
  formatLakh,
  section4Title,
  benchmarkJeMonths,
  extractTenderEvidence,
  extractPaymentEvidence,
  extractAppealEvidence,
  extractRepairEvidence,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import BetrayalSection from '@/components/section4/BetrayalSection';
import AuditFolderTabs from '@/components/shared/AuditFolderTabs';

export const dynamic = 'force-dynamic';

export default async function BetrayalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, events, photos, heroPhoto } = data;

  // --- DATA DERIVATIONS ---
  const tenderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && extractTenderEvidence(e.evidence).isTender
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  const completionEvent = events.find(e => e.eventType === EVENT_TYPES.COMPLETION_CLAIMED);
  const paymentEvent = events.find(e => e.eventType === EVENT_TYPES.PAYMENT_RELEASED);

  // Financial Values
  const { netDisbursed } = extractPaymentEvidence(paymentEvent?.evidence);
  const { estimatedValue: sanctionedBudget, contractValue } = extractTenderEvidence(tenderEvent?.evidence);

  // Finding primary certifier for salary comparison
  const completionParticipants = completionEvent?.participants ?? [];
  const certifiers = completionParticipants.filter(p => p.role === 'certifier');
  const officialCertifiers = certifiers.filter(p => p.person?.personCategory === 'official');
  const primaryCertifierParticipant = officialCertifiers.sort((a, b) => {
    const salA = a.person?.monthlySalary != null ? Number(a.person.monthlySalary) : Infinity;
    const salB = b.person?.monthlySalary != null ? Number(b.person.monthlySalary) : Infinity;
    return salA - salB;
  })[0];
  const certifierPerson = primaryCertifierParticipant?.person;

  const conditionEvents = events.filter(e => [
    'pothole_found', 'crack_found', 'drain_blocked', 'flooding_reported', 'structural_damage_found', 'material_degradation_observed'
  ].includes(e.eventType));

  const section1Photos = photos.filter(p => p.eventId === null);

  const crackEvents = events.filter(e => e.eventType === EVENT_TYPES.CRACK_FOUND);
  const potholeEvents = events.filter(e => e.eventType === EVENT_TYPES.POTHOLE_FOUND);
  const drainEvents = events.filter(e => e.eventType === EVENT_TYPES.DRAIN_BLOCKED);

  // DLP values
  const dlpEvent = events.find(e => e.eventType === EVENT_TYPES.DLP_STARTED);
  const { dlpEndDate } = extractDlpEvidence(dlpEvent?.evidence);
  const dlpExpired = dlpEndDate !== null && dlpEndDate < new Date();
  const dlpExpiryDate = dlpEndDate ? formatDate(dlpEndDate) : null;
  const dlpStartDate = dlpEvent ? formatDate(dlpEvent.timestamp) : null;

  // Private repairs
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
      ? '₹' + Math.round(netDisbursed / daysToFirstIssue).toLocaleString('en-IN')
      : null;

  const underbidPercent =
    sanctionedBudget > 0 && contractValue > 0
      ? ((1 - contractValue / sanctionedBudget) * 100).toFixed(1)
      : null;

  const underbidAmount =
    sanctionedBudget > 0 && contractValue > 0
      ? formatLakh(sanctionedBudget - contractValue)
      : null;

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

  const firstConditionDate = firstConditionEvent ? formatDate(firstConditionEvent.timestamp) : null;

  const failedInMonths: string | null = daysToFirstIssue !== null
    ? daysToFirstIssue < 30
      ? 'less than a month'
      : daysToFirstIssue < 60
        ? '1 month'
        : `${Math.floor(daysToFirstIssue / 30.44)} months`
    : null;

  const roadLocation = "Purvi deen dayal, ward 28, roorkee";

  function extractDlpEvidence(evidence: unknown): { dlpEndDate: Date | null } {
    const e = (evidence && typeof evidence === 'object' && !Array.isArray(evidence)) ? (evidence as Record<string, unknown>) : {};
    const raw = typeof e.dlpEndDate === 'string' ? e.dlpEndDate : null;
    if (!raw) return { dlpEndDate: null };
    if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
      const d = new Date(raw);
      if (!isNaN(d.getTime())) return { dlpEndDate: d };
    }
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) {
      const [day, month, year] = raw.split('.').map(Number);
      const d = new Date(year, month - 1, day);
      if (!isNaN(d.getTime())) return { dlpEndDate: d };
    }
    return { dlpEndDate: null };
  }

  return (
    <main className="bg-surface min-h-screen">
      {/* HERO CONTEXT */}
      <HeroSection
        road={road}
        heroPhoto={heroPhoto}
        section1Photos={section1Photos}
      />

      {/* PORTAL NAVIGATION TAB */}
      <AuditFolderTabs
        roadId={road.roadSystemId}
        activeTab="betrayal"
      />

      {/* CORE SPECIFIC CONTENT */}
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
    </main>
  );
}
