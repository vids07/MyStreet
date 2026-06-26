import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import { extractTenderEvidence } from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import ShieldWorkspace from '@/components/section7/ShieldWorkspace';

export const dynamic = 'force-dynamic';

export default async function ShieldWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, photos, events } = data;

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
  
  // Verify server-side Gemini API key configuration securely
  const hasSystemEnvKey = !!process.env.GEMINI_API_KEY;

  return (
    <main className="bg-surface min-h-screen text-slate-800">
      
      {/* SHIELD AI INSPECTOR WORKSPACE */}
      <ShieldWorkspace
        roadId={id}
        roadSystemId={road.roadSystemId}
        roadName={road.roadDisplayName}
        contractorName={contractorName}
        milestoneAmount={milestoneAmount}
        hasSystemEnvKey={hasSystemEnvKey}
      />
    </main>
  );
}
