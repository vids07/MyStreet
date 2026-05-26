import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
import {
  formatSalaryPerDay,
  getActionLabel,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import type { PersonData, FaceCardData } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import FacesSection from '@/components/section5/FacesSection';
import AuditFolderTabs from '@/components/shared/AuditFolderTabs';

export const dynamic = 'force-dynamic';

export default async function SignOffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getFullRoadData(id);

  if (!data) notFound();

  const { road, photos, heroPhoto } = data;

  const section1Photos = photos.filter(p => p.eventId === null);

  // --- DATA DERIVATIONS ---
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
      {/* HERO CONTEXT */}
      <HeroSection
        road={road}
        heroPhoto={heroPhoto}
        section1Photos={section1Photos}
      />

      {/* PORTAL NAVIGATION TAB */}
      <AuditFolderTabs
        roadId={road.roadSystemId}
        activeTab="sign-off"
      />

      {/* CORE SPECIFIC CONTENT */}
      <FacesSection
        technicalChain={technicalChain}
        financialChain={financialChain}
        administrativeChain={administrativeChain}
        contractor={contractorCard}
      />
    </main>
  );
}
