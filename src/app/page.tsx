import { redirect } from 'next/navigation';
import { db } from '@/server/db';
import { roads } from '@/server/db/schema/road';

export default async function Home() {
  const result = await db
    .select({ roadSystemId: roads.roadSystemId })
    .from(roads)
    .limit(1);

  if (result[0]) {
    redirect(`/road/${result[0].roadSystemId}`);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">No roads found in database.</p>
    </main>
  );
}
