import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import { extractTenderEvidence } from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import EmpowermentSection from '@/components/section6/EmpowermentSection';
import AuditFolderTabs from '@/components/shared/AuditFolderTabs';

export const dynamic = 'force-dynamic';

export default async function ActionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, photos, heroPhoto, confirmationCount, events } = data;

  const section1Photos = photos.filter(p => p.eventId === null);

  // Derive streetName from hero photo label or ward/city
  const firstLabelledPhoto = [heroPhoto, ...section1Photos].find(p => p?.locationLabel);
  const streetName = firstLabelledPhoto?.locationLabel
    ? firstLabelledPhoto.locationLabel.split(' — ')[0]
    : [road.ward, road.city].filter(Boolean).join(', ') || road.roadDisplayName;

  // --- DATA DERIVATIONS ---

  // Finding the Contractor Name
  const contractorPerson = events
    .flatMap(e => e.participants)
    .find(p => p.personType === 'contractor' && p.role === 'assignee')?.person;
  
  const contractorName = contractorPerson?.fullName 
    || contractorPerson?.department?.split(',')[0]?.trim() 
    || 'Shri Ganesh Construction Co.';

  // Finding the Milestone 3 Payment Amount (calculated as ~15% of contract value or default 24.5 Lakhs)
  const tenderEvent = events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && extractTenderEvidence(e.evidence).isTender
  ) ?? events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  const { contractValue } = extractTenderEvidence(tenderEvent?.evidence);
  const milestoneAmount = contractValue ? Math.round(contractValue * 0.15) : 2450000;

  return (
    <main className="bg-surface min-h-screen">
      {/* PORTAL NAVIGATION TAB */}
      <AuditFolderTabs
        roadId={road.roadSystemId}
        activeTab="action"
      />

      {/* HERO CONTEXT */}
      <HeroSection
        road={road}
        heroPhoto={heroPhoto}
        section1Photos={section1Photos}
      />

      {/* CORE SPECIFIC CONTENT */}
      <EmpowermentSection
        confirmationCount={confirmationCount}
        roadSystemId={road.roadSystemId}
        streetName={streetName}
        contractorName={contractorName}
        milestoneAmount={milestoneAmount}
        roadDisplayName={road.roadDisplayName}
      />
    </main>
  );
}
