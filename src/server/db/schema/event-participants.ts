import { pgTable, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { events } from './event';
import { persons } from './person';

export const personTypeEnum = pgEnum('person_type', [
  'citizen',
  'official',
  'contractor',
  'system',
  'sensor',
]);

export const participantRoleEnum = pgEnum('participant_role', [
  'reporter',
  'certifier',
  'authoriser',
  'assignee',
  'witness',
]);

export const eventParticipants = pgTable('event_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  personId: uuid('person_id').notNull().references(() => persons.id, { onDelete: 'restrict' }),
  personType: personTypeEnum('person_type').notNull(),
  role: participantRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type EventParticipant = typeof eventParticipants.$inferSelect;
export type NewEventParticipant = typeof eventParticipants.$inferInsert;