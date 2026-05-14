import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { roads } from '@/server/db/schema/road';
import { segments } from '@/server/db/schema/segment';
import { drains } from '@/server/db/schema/drain';
import { events } from '@/server/db/schema/event';
import { eventParticipants } from '@/server/db/schema/event-participants';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const road = await db.query.roads.findFirst({
      where: eq(roads.roadSystemId, id),
    });

    if (!road) {
      return NextResponse.json({ error: 'Road not found' }, { status: 404 });
    }

    const roadSegments = await db.query.segments.findMany({
      where: eq(segments.roadId, road.id),
    });

    const roadEvents = await db.query.events.findMany({
      where: eq(events.roadId, road.id),
      orderBy: (events, { asc }) => [asc(events.timestamp)],
    });

    const roadParticipants = await Promise.all(
      roadEvents.map(event =>
        db.query.eventParticipants.findMany({
          where: eq(eventParticipants.eventId, event.id),
        })
      )
    );

    return NextResponse.json({
      road,
      segments: roadSegments,
      events: roadEvents.map((event, index) => ({
        ...event,
        participants: roadParticipants[index],
      })),
    });
  } catch (error) {
    console.error('Error fetching road:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
