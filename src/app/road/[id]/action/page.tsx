import { notFound } from 'next/navigation';
import { getFullRoadData } from '@/server/queries/road';
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

  const { road, photos, heroPhoto, confirmationCount } = data;

  const section1Photos = photos.filter(p => p.eventId === null);

  // Derive streetName from hero photo label or ward/city
  const firstLabelledPhoto = [heroPhoto, ...section1Photos].find(p => p?.locationLabel);
  const streetName = firstLabelledPhoto?.locationLabel
    ? firstLabelledPhoto.locationLabel.split(' — ')[0]
    : [road.ward, road.city].filter(Boolean).join(', ') || road.roadDisplayName;

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
        activeTab="action"
      />

      {/* CORE SPECIFIC CONTENT */}
      <EmpowermentSection
        confirmationCount={confirmationCount}
        roadSystemId={road.roadSystemId}
        streetName={streetName}
      />
    </main>
  );
}
