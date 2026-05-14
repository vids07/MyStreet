import { pgTable, uuid, text, jsonb, numeric, timestamp } from 'drizzle-orm/pg-core';
import { roads } from './road';

export const segments = pgTable('segments', {
    id: uuid('id').defaultRandom().primaryKey(),
    roadId: uuid('road_id').notNull().references(() => roads.id),
    segmentDisplayName: text('segment_display_name').notNull(),
    segmentCoordinates: jsonb('segment_coordinates').notNull(),
    geometry: jsonb('geometry').notNull(),
    length: numeric('length').notNull(),
    width: numeric('width').notNull(),
    area: numeric('area').notNull(),
    surfaceThickness: numeric('surface_thickness').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Segment = typeof segments.$inferSelect;
export type NewSegment = typeof segments.$inferInsert;