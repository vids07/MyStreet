import { pgTable, uuid, text, numeric, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { segments } from './segment';

export const drainStatusEnum = pgEnum('drain_status', [
  'not_built',
  'broken',
  'blocked',
  'functional',
]);

export const drains = pgTable('drains', {
  id: uuid('id').defaultRandom().primaryKey(),
  segmentId: uuid('segment_id').notNull().references(() => segments.id),
  drainDisplayName: text('drain_display_name').notNull(),
  length: numeric('length').notNull(),
  width: numeric('width').notNull(),
  depth: numeric('depth').notNull(),
  area: numeric('area').notNull(),
  status: drainStatusEnum('status'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Drain = typeof drains.$inferSelect;
export type NewDrain = typeof drains.$inferInsert;
