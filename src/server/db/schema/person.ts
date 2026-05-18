import { pgTable, uuid, text, numeric, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const personCategoryEnum = pgEnum('person_category', [
  'official',
  'contractor',
  'citizen',
]);

export const accountabilityStatusEnum = pgEnum('accountability_status', [
  'waiting_for_audit',
  'response_pending',
  'responded',
  'charged',
]);

export const persons = pgTable('persons', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  designation: text('designation'),
  designationPlain: text('designation_plain'),
  department: text('department'),
  personCategory: personCategoryEnum('person_category').notNull(),
  contactOrId: text('contact_or_id'),
  jurisdiction: text('jurisdiction'),
  monthlySalary: numeric('monthly_salary'),
  payScale: text('pay_scale'),
  salarySource: text('salary_source'),
  photoUrl: text('photo_url'),
  photoSource: text('photo_source'),
  accountabilityStatus: accountabilityStatusEnum('accountability_status'),
  jobDescription: text('job_description'),
  licenseNumber: text('license_number'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Person = typeof persons.$inferSelect;
export type NewPerson = typeof persons.$inferInsert;
