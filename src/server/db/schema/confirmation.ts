import { pgTable, uuid, numeric, timestamp, boolean, text } from 'drizzle-orm/pg-core';
import { roads } from './road';

export const confirmations = pgTable('confirmations', {
  id: uuid('id').defaultRandom().primaryKey(),
  roadId: uuid('road_id').notNull().references(() => roads.id, { onDelete: 'cascade' }),
  deviceFingerprint: text('device_fingerprint').notNull(),
  locationLat: numeric('location_lat'),
  locationLng: numeric('location_lng'),
  confirmedAt: timestamp('confirmed_at').defaultNow().notNull(),
  isFlagged: boolean('is_flagged').default(false).notNull(),
  flagReason: text('flag_reason'),
});

export type Confirmation = typeof confirmations.$inferSelect;
export type NewConfirmation = typeof confirmations.$inferInsert;
