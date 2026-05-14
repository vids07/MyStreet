import { pgTable, uuid, text, numeric, timestamp, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { roads } from './road';
import { segments } from './segment';
import { events } from './event';
import { persons } from './person';

export const photoSourceEnum = pgEnum('photo_source', [
  'citizen',
  'official',
  'contractor',
  'system',
  'sensor',
]);

// Note: photo_status and health_status are distinct types.
// photo_status describes what a specific photo shows.
// health_status describes the road as a whole.
// Never use one where the other is expected.
export const photoStatusEnum = pgEnum('photo_status', [
  'critical',
  'warning',
  'good',
  'informational',
]);

export const photos = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  roadId: uuid('road_id').notNull().references(() => roads.id, { onDelete: 'cascade' }),
  segmentId: uuid('segment_id').references(() => segments.id, { onDelete: 'set null' }),
  eventId: uuid('event_id').references(() => events.id, { onDelete: 'set null' }),
  personId: uuid('person_id').references(() => persons.id, { onDelete: 'set null' }),
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  source: photoSourceEnum('source').notNull(),
  status: photoStatusEnum('status'),
  locationLabel: text('location_label'),
  capturedAt: timestamp('captured_at'),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  locationLat: numeric('location_lat'),
  locationLng: numeric('location_lng'),
  deviceInfo: jsonb('device_info'),
  uploadedBy: text('uploaded_by'),
  isVerified: boolean('is_verified').default(false).notNull(),
  verifiedAt: timestamp('verified_at'),
  isHero: boolean('is_hero').default(false).notNull(),
});

export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;
