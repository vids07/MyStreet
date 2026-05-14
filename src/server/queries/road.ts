import { db } from '@/server/db';
import { roads } from '@/server/db/schema/road';
import { segments } from '@/server/db/schema/segment';
import { drains } from '@/server/db/schema/drain';
import { events } from '@/server/db/schema/event';
import { eventParticipants } from '@/server/db/schema/event-participants';
import { persons } from '@/server/db/schema/person';
import { photos } from '@/server/db/schema/photo';
import { confirmations } from '@/server/db/schema/confirmation';
import { eq, desc, count, and, inArray } from 'drizzle-orm';

// --- TYPE EXPORTS ---
export type RoadWithRelations = Awaited<ReturnType<typeof getRoadBySystemId>>;
export type EventWithParticipants = Awaited<ReturnType<typeof getEventsByRoadId>>[number];
export type ParticipantWithPerson = Awaited<ReturnType<typeof getParticipantsByEventId>>[number];

// --- CORE QUERIES ---

export async function getRoadBySystemId(systemId: string) {
  const road = await db
    .select()
    .from(roads)
    .where(eq(roads.roadSystemId, systemId))
    .limit(1);

  return road[0] ?? null;
}

export async function getSegmentsByRoadId(roadId: string) {
  return db
    .select()
    .from(segments)
    .where(eq(segments.roadId, roadId));
}

// Fixed: two-step query — get segmentIds first, then drains via inArray.
// Previous code passed roadId where segmentId was expected — returned zero results.
export async function getDrainsByRoadId(roadId: string) {
  const roadSegments = await db
    .select({ id: segments.id })
    .from(segments)
    .where(eq(segments.roadId, roadId));

  const segmentIds = roadSegments.map(s => s.id);
  if (segmentIds.length === 0) return [];

  return db
    .select()
    .from(drains)
    .where(inArray(drains.segmentId, segmentIds));
}

// Fixed: sorted DESC — newest events first for timeline display.
export async function getEventsByRoadId(roadId: string) {
  return db
    .select()
    .from(events)
    .where(eq(events.roadId, roadId))
    .orderBy(desc(events.timestamp));
}

export async function getParticipantsByEventId(eventId: string) {
  return db
    .select({
      id: eventParticipants.id,
      eventId: eventParticipants.eventId,
      personId: eventParticipants.personId,
      personType: eventParticipants.personType,
      role: eventParticipants.role,
      person: {
        id: persons.id,
        fullName: persons.fullName,
        designation: persons.designation,
        designationPlain: persons.designationPlain,
        department: persons.department,
        personCategory: persons.personCategory,
        jurisdiction: persons.jurisdiction,
        monthlySalary: persons.monthlySalary,
        salarySource: persons.salarySource,
        photoUrl: persons.photoUrl,
        photoSource: persons.photoSource,
        accountabilityStatus: persons.accountabilityStatus,
        jobDescription: persons.jobDescription,
        licenseNumber: persons.licenseNumber,
      },
    })
    .from(eventParticipants)
    .leftJoin(persons, eq(eventParticipants.personId, persons.id))
    .where(eq(eventParticipants.eventId, eventId));
}

export async function getPhotosByRoadId(roadId: string) {
  return db
    .select()
    .from(photos)
    .where(eq(photos.roadId, roadId))
    .orderBy(desc(photos.capturedAt));
}

export async function getHeroPhoto(roadId: string) {
  const result = await db
    .select()
    .from(photos)
    .where(and(eq(photos.roadId, roadId), eq(photos.isHero, true)))
    .limit(1);

  return result[0] ?? null;
}

export async function getConfirmationCount(roadId: string) {
  const result = await db
    .select({ count: count() })
    .from(confirmations)
    .where(and(eq(confirmations.roadId, roadId), eq(confirmations.isFlagged, false)));

  return result[0]?.count ?? 0;
}

export async function getAllRoads() {
  return db
    .select({
      id: roads.id,
      roadSystemId: roads.roadSystemId,
      roadDisplayName: roads.roadDisplayName,
      geometry: roads.geometry,
      healthStatus: roads.healthStatus,
      healthStatusUpdatedAt: roads.healthStatusUpdatedAt,
    })
    .from(roads)
    .orderBy(roads.createdAt);
}

// --- FULL ROAD PAGE DATA ---
// Single entry point for the road page. All DB calls parallelized.
// Fixed: single allParticipants query replaces per-event N+1 fetching.
// Fixed: drains now included in parallel fetch.

export async function getFullRoadData(systemId: string) {
  const road = await getRoadBySystemId(systemId);
  if (!road) return null;

  const [roadSegments, roadEvents, roadPhotos, confirmationCount, roadDrains] = await Promise.all([
    getSegmentsByRoadId(road.id),
    getEventsByRoadId(road.id),
    getPhotosByRoadId(road.id),
    getConfirmationCount(road.id),
    getDrainsByRoadId(road.id),
  ]);

  // Single query for ALL participants across ALL events — eliminates N+1.
  const eventIds = roadEvents.map(e => e.id);
  const allParticipants = eventIds.length > 0
    ? await db
        .select()
        .from(eventParticipants)
        .leftJoin(persons, eq(eventParticipants.personId, persons.id))
        .where(inArray(eventParticipants.eventId, eventIds))
    : [];

  // Group participants by event in memory — zero additional DB calls.
  const eventsWithParticipants = roadEvents.map(event => ({
    ...event,
    participants: allParticipants
      .filter(p => p.event_participants.eventId === event.id)
      .map(p => ({ ...p.event_participants, person: p.persons })),
  }));

  const heroPhoto = roadPhotos.find(p => p.isHero) ?? null;

  return {
    road,
    segments: roadSegments,
    events: eventsWithParticipants,
    photos: roadPhotos,
    heroPhoto,
    confirmationCount,
    drains: roadDrains,
  };
}
