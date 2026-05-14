import { pgTable, uuid, text, jsonb, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const healthStatusEnum = pgEnum('health_status', [
  'good',
  'warning',
  'critical',
  'dangerous',
]);

export const roads = pgTable('roads', {
  id: uuid('id').defaultRandom().primaryKey(),
  roadSystemId: text('road_system_id').notNull().unique(),
  roadDisplayName: text('road_display_name').notNull(),
  ward: text('ward'),
  city: text('city'),
  geometry: jsonb('geometry').notNull(),
  healthStatus: healthStatusEnum('health_status'),
  healthStatusUpdatedAt: timestamp('health_status_updated_at'),
  healthStatusUpdatedBy: text('health_status_updated_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Road = typeof roads.$inferSelect;
export type NewRoad = typeof roads.$inferInsert;
