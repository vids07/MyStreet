import { pgTable, uuid, text, jsonb, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { roads } from './road';
import { segments } from './segment';

export const eventTypeEnum = pgEnum('event_type', [
  'work_order_issued',
  'construction_started',
  'inspection_conducted',
  'completion_claimed',
  'budget_sanctioned',
  'budget_released',
  'payment_released',
  'dlp_started',
  'dlp_ended',
  'road_rebuilt',
  'health_status_changed',
  'pothole_found',
  'crack_found',
  'flooding_reported',
  'drain_blocked',
  'structural_damage_found',
  'material_degradation_observed',
  'repair_done',
  'rti_filed',
  'rti_response_received',
  'rti_ignored',
  'ticket_raised',
  'ticket_resolved',
  'escalation_triggered',
  'whistleblower_report',
  'accident_or_injury_recorded',
  'lab_test_report_submitted',
  'third_party_inspection_conducted',
  'sensor_reading_recorded',
]);

export const severityEnum = pgEnum('severity', [
  'low',
  'medium',
  'high',
  'critical',
]);

export const evidenceSourceEnum = pgEnum('evidence_source', [
  'citizen',
  'official',
  'contractor',
  'system',
  'sensor',
]);

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  roadId: uuid('road_id').notNull().references(() => roads.id, { onDelete: 'cascade' }),
  segmentId: uuid('segment_id').references(() => segments.id, { onDelete: 'set null' }),
  eventType: eventTypeEnum('event_type').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  description: text('description').notNull(),
  severity: severityEnum('severity'),
  evidence: jsonb('evidence'),
  evidenceSource: evidenceSourceEnum('evidence_source'),
  isFlagged: boolean('is_flagged').default(false).notNull(),
  flaggedAt: timestamp('flagged_at'),
  flaggedReason: text('flagged_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;