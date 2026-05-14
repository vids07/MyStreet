# MYSTREET — DEFINITIVE DATA MAPPING
## Placeholder → Backend → How to derive
### Version 2.0 — Complete. No open questions. Ready to execute.

---

## HOW TO READ THIS DOCUMENT

**Part 1 — Schema Changes + Bug Fixes** — run before frontend touches a single query.
**Part 2 — Complete Placeholder Mapping** — every `{{placeholder}}` resolved to exact source.
**Part 3 — Computed Value Logic** — TypeScript functions, copy-paste ready.
**Quick Reference** — one-page cheat sheet for daily use.

**Status legend:**
- ✅ **Direct** — existing DB column, no change needed
- 🔄 **Computed** — derived from existing data, no schema change needed
- 🆕 **New column** — requires migration in Part 1
- ⏭️ **Skip MVP** — documented decision, not rendered in MVP build

**Rule:** If anything in this document needs to change — a field doesn't work, a schema gap is found, a design decision shifts — update this document first. Founder approves. Then code changes. Never the other way around.

---

---

# PART 1 — SCHEMA CHANGES + BUG FIXES

## Critical bugs — fix these first, before migrations

---

### Bug Fix 1 — N+1 query in `getFullRoadData` (CRITICAL)

**Location:** `src/server/queries/road.ts` — `getFullRoadData` function

**Problem:** The current implementation fires one DB query per event to fetch participants. 20 events = 21+ round-trips to the database. This will not scale and is measurably slow even with one road.

**Fix:** Fetch all participants for all events in a single query using `inArray`, then map them in memory.

```typescript
// BROKEN — current implementation (serial N+1):
const eventsWithParticipants = await Promise.all(
  events.map(async (event) => ({
    ...event,
    participants: await getParticipantsByEventId(event.id),
  }))
)

// FIXED — single query, in-memory mapping:
import { eq, inArray } from 'drizzle-orm'

export async function getFullRoadData(systemId: string) {
  const road = await getRoadBySystemId(systemId)
  if (!road) return null

  // Parallel fetch — all five in one round-trip
  const [roadSegments, roadEvents, roadPhotos, confirmationCount, roadDrains] = await Promise.all([
    getSegmentsByRoadId(road.id),
    getEventsByRoadId(road.id),
    getPhotosByRoadId(road.id),
    getConfirmationCount(road.id),
    getDrainsByRoadId(road.id),       // ← drains now included (was missing)
  ])

  // Fetch ALL participants for ALL events in ONE query
  const eventIds = roadEvents.map(e => e.id)
  const allParticipants = eventIds.length > 0
    ? await db
        .select()
        .from(eventParticipants)
        .leftJoin(persons, eq(eventParticipants.personId, persons.id))
        .where(inArray(eventParticipants.eventId, eventIds))
    : []

  // Map participants to their events in memory — zero additional DB calls
  const eventsWithParticipants = roadEvents.map(event => ({
    ...event,
    participants: allParticipants
      .filter(p => p.event_participants.eventId === event.id)
      .map(p => ({
        ...p.event_participants,
        person: p.persons,
      })),
  }))

  const heroPhoto = roadPhotos.find(p => p.isHero) ?? null

  return {
    road,
    segments: roadSegments,
    events: eventsWithParticipants,
    photos: roadPhotos,
    heroPhoto,
    confirmationCount,
    drains: roadDrains,                // ← now returned
  }
}
```

---

### Bug Fix 2 — `getDrainsByRoadId` wrong query

**Location:** `src/server/queries/road.ts`

**Problem:** Current code passes `roadId` where `segmentId` is expected. Returns zero results every time.

```typescript
// BROKEN:
export async function getDrainsByRoadId(roadId: string) {
  return db.select().from(drains).where(eq(drains.segmentId, roadId)) // ← wrong
}

// FIXED — two-step: get segment IDs first, then get drains:
export async function getDrainsByRoadId(roadId: string) {
  const roadSegments = await db
    .select({ id: segments.id })
    .from(segments)
    .where(eq(segments.roadId, roadId))

  const segmentIds = roadSegments.map(s => s.id)
  if (segmentIds.length === 0) return []

  return db
    .select()
    .from(drains)
    .where(inArray(drains.segmentId, segmentIds))
}
```

---

### Bug Fix 3 — Events sort order

**Location:** `src/server/queries/road.ts` — `getEventsByRoadId`

**Problem:** Events are sorted ASC (oldest first). The timeline in Section 3 should show newest first (DESC).

```typescript
// BROKEN:
.orderBy(asc(events.timestamp))

// FIXED:
.orderBy(desc(events.timestamp))
```

Add `desc` to drizzle-orm imports.

---

### Bug Fix 4 — `WHISTLEBOWER_REPORT` typo

**Location:** `src/types/road.ts`

**Problem:** Missing letter 'L'. Any code referencing `EVENT_TYPES.WHISTLEBOWER_REPORT` silently returns `undefined`.

```typescript
// BROKEN:
WHISTLEBOWER_REPORT: 'whistleblower_report'

// FIXED:
WHISTLEBLOWER_REPORT: 'whistleblower_report'
```

---

## Schema migrations — run in this exact order: 4 → 1 → 3 → 2

**Why this order:** Migration 2 adds a FK on `photos` referencing `persons`. Migration 4 modifies `persons`. Persons must be fully updated before photos references it.

Create one file: `drizzle/migrations/002_mvp_fields.sql`
Run with: `npx drizzle-kit migrate`

---

### Migration 4 (run first) — `persons` table

```sql
CREATE TYPE accountability_status AS ENUM (
  'waiting_for_audit',
  'response_pending',
  'responded',
  'charged'
);

ALTER TABLE persons
  ADD COLUMN accountability_status accountability_status,
  ADD COLUMN job_description       TEXT,
  ADD COLUMN license_number        TEXT;
```

**Populate Ward 28 persons:**

```sql
-- Shubham Sharma (contractor)
-- license_number: NULL — no real license number in RTI documents. Do not invent one.
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for material quality, construction standards, and delivery timeline as per contract terms.',
  license_number = NULL
WHERE full_name = 'Shubham Sharma' AND person_category = 'contractor';

-- Gurudayal Singh (JE — certifier on completion)
UPDATE persons SET
  accountability_status = 'response_pending',
  job_description = 'Responsible for on-site quality verification and signing off construction as complete and standard-compliant.'
WHERE full_name = 'Gurudayal Singh';

-- Prem Kumar Sharma (AE — certifier on completion)
UPDATE persons SET
  accountability_status = 'response_pending',
  job_description = 'Responsible for supervising the Junior Engineer and verifying technical compliance before signing off.'
WHERE full_name = 'Prem Kumar Sharma';

-- Alok Singh Mishravaan (EE — authoriser on completion)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for final administrative authorisation of project completion and quality sign-off.'
WHERE full_name = 'Alok Singh Mishravaan';

-- Prashant Kumar (Finance — authoriser on payment)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for verifying financial records and authorising payment disbursement.'
WHERE full_name = 'Prashant Kumar';

-- Jitendra Kumar (Commissioner)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Municipal Commissioner. Ultimate administrative authority over all ward-level public works.'
WHERE full_name = 'Jitendra Kumar';
```

**Why manual status, not event-derived:** Accountability status changes through legal and administrative processes that may not produce system events. Manual is honest and auditable. Event-driven accountability is a future epic.

**Why license_number is NULL:** The RTI documents for Ward 28 do not contain a contractor license number. Do not populate with an invented value. Update when obtained via RTI or verification.

---

### Migration 1 (run second) — `roads` table

```sql
ALTER TABLE roads
  ADD COLUMN ward TEXT,
  ADD COLUMN city TEXT;

UPDATE roads
SET ward = 'Ward 28', city = 'Roorkee'
WHERE road_system_id = 'UK-RKE-29.8723-77.8813';
```

**Why not parse from road_display_name:** Display name format varies per road. Explicit columns are reliable and indexable.

---

### Migration 3 (run third) — `drains` table

```sql
CREATE TYPE drain_status AS ENUM ('not_built', 'broken', 'blocked', 'functional');

ALTER TABLE drains
  ADD COLUMN status drain_status;

UPDATE drains SET status = 'not_built'
WHERE segment_id = (
  SELECT id FROM segments
  WHERE road_id = (
    SELECT id FROM roads WHERE road_system_id = 'UK-RKE-29.8723-77.8813'
  )
);
```

**Note:** `partial` is intentionally excluded. No design spec or placeholder exists for it. Add only when a full design decision exists behind it.

**Why non-optional:** The Ward 28 story is the ghost drain — ₹98,293 billed for a drain that does not exist. Without drain status, Section 3 Card 3 cannot render its core evidence.

---

### Migration 2 (run last) — `photos` table

**Note on photo_status vs health_status:** These are intentionally separate types. `health_status` applies to a road as a whole. `photo_status` applies to what a specific photo shows. Never use one where the other is expected — they are different TypeScript types and will not compile if swapped.

```sql
CREATE TYPE photo_status AS ENUM ('critical', 'warning', 'good', 'informational');

ALTER TABLE photos
  ADD COLUMN status        photo_status,
  ADD COLUMN location_label TEXT,
  ADD COLUMN person_id     UUID REFERENCES persons(id) ON DELETE SET NULL;

-- Populate all 5 Ward 28 photos
UPDATE photos SET
  status = 'critical',
  location_label = 'Ward 28, Near Ajay Raj House, Roorkee',
  person_id = NULL
WHERE road_id = (SELECT id FROM roads WHERE road_system_id = 'UK-RKE-29.8723-77.8813');
```

---

## Seed updates required (src/server/db/seed.ts)

After running migrations, update seed.ts for the following:

**1. Add `isTender: true` to first `work_order_issued` event evidence:**
```typescript
// In the first work_order_issued event (Dec 2024 — the tender):
evidence: {
  isTender: true,           // ← ADD THIS
  estimatedValue: 606000,
  contractValue: 387234,
  // ... rest of evidence
}
```
This makes tender identification explicit and safe for all future roads. Without it, the fallback fires and relies on event array position — fragile.

**2. Link photos to events:**
Section 3 condition cards (cracks, potholes, drains) show photos filtered by `photos.event_id`. Until photos are linked to events, all 5 Ward 28 photos appear in Section 1 hero scroll only. Section 3 cards render with zero images.

```typescript
// After inserting photos and condition events, link them:
await db.update(photos)
  .set({ eventId: crackEventId })
  .where(eq(photos.id, crackPhotoId))
```

The frontend team should not build Section 3 cards until at least one photo is linked to a condition event.

---

## Drizzle schema files to update

| File | Changes |
|---|---|
| `src/server/db/schema/person.ts` | Add `accountability_status` enum + column, `job_description` text, `license_number` text |
| `src/server/db/schema/road.ts` | Add `ward` text, `city` text |
| `src/server/db/schema/drain.ts` | Add `drain_status` enum + `status` column |
| `src/server/db/schema/photo.ts` | Add `photo_status` enum + `status` column, `location_label` text, `person_id` UUID FK |

---

## New file required: `src/lib/utils/road-display.ts`

Create this file. All functions from Part 3 go here. Frontend imports from this file. No display logic lives in `page.tsx`.

---

---

# PART 2 — COMPLETE PLACEHOLDER MAPPING

---

## ROAD-LEVEL PLACEHOLDERS

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{road.name}}` | ✅ Direct | `roads` | `road_display_name` | `road.roadDisplayName` | "Ward 28, Bijendra Shop to Ajay Raj House, Roorkee" |
| `{{road.ward}}` | 🆕 New | `roads` | `ward` | `road.ward` | "Ward 28" |
| `{{road.city}}` | 🆕 New | `roads` | `city` | `road.city` | "Roorkee" |
| `{{road.record_id}}` | ✅ Direct | `roads` | `road_system_id` | `road.roadSystemId` | "UK-RKE-29.8723-77.8813" — **not rendered in MVP** |
| `{{road.status}}` | ✅ Direct | `roads` | `health_status` | `road.healthStatus` | "critical" |
| `{{road.safety_rating}}` | ✅ Direct | `roads` | `health_status` | `road.healthStatus?.toUpperCase()` | "CRITICAL" |
| `{{road.witness_count}}` | 🔄 Computed | `confirmations` | COUNT where `is_flagged = false` | `confirmationCount` | 847 |
| `{{road.money_spent}}` | 🔄 Computed | `events` | `paymentEvent.evidence.netDisbursed` | `formatCurrency(netDisbursed)` | "₹3,54,581" |
| `{{road.amount_allocated}}` | 🔄 Computed | `events` | `tenderEvent.evidence.estimatedValue` | `formatCurrency(sanctionedBudget)` | "₹6,06,000" |
| `{{road.amount_contracted}}` | 🔄 Computed | `events` | `tenderEvent.evidence.contractValue` | `formatCurrency(contractValue)` | "₹3,87,234" |
| `{{road.months_ago}}` | 🔄 Computed | `events` | `tenderEvent.timestamp` → months to today | `builtMonthsAgo(tenderEvent)` | "8 months ago" |
| `{{road.days_lasted}}` | 🔄 Computed | `events` | `completionEvent.timestamp` → days to today | `daysLasted(completionEvent, road.healthStatus)` | "212 days" |
| `{{road.issues_count}}` | 🔄 Computed | `events` | COUNT events where type IN issue set (see Part 3) | `conditionEvents.length` | 14 |
| `{{road.benchmark_bags}}` | 🔄 Computed | — | `Math.round(netDisbursed / 300)` | `benchmarkBags(netDisbursed)` | "1,182" |
| `{{road.benchmark_je_months}}` | 🔄 Computed | `persons` | `netDisbursed / certifier.monthlySalary` | `benchmarkJeMonths(netDisbursed, certifierPerson)` | "6" |
| `{{section4.title}}` | 🔄 Computed | `roads` | `health_status IN (critical, dangerous, warning)` → "The Betrayal" | `section4Title(road.healthStatus)` | "The Betrayal" |

---

## IMAGE PLACEHOLDERS

Per photo. Fetched via `getPhotosByRoadId(road.id)`, ordered `captured_at DESC`. Hero via `getHeroPhoto(road.id)`.

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{image.status}}` | 🆕 New | `photos` | `status` | `photo.status?.toUpperCase()` | "CRITICAL" |
| `{{image.location}}` | 🆕 New | `photos` | `location_label` | `photo.locationLabel` | "Near Ajay Raj House, Roorkee" |
| `{{image.source}}` | 🔄 Computed | `photos` | `source` → `photoSourceLabel()` | `photoSourceLabel(photo.source)` | "FIELD VERIFIED" |
| `{{image.reported_date}}` | ✅ Direct | `photos` | `captured_at` | `formatDate(photo.capturedAt)` | "8 Feb 2026" |
| `{{image.reported_by}}` | 🔄 Computed | `photos` + `persons` | `person_id → persons.full_name`, fallback `uploaded_by` | `photo.person?.fullName ?? photo.uploadedBy ?? 'Unknown'` | "Field Surveyor" |
| `{{image.updated_date}}` | ⏭️ Skip MVP | — | No update tracking on photos. Not rendered. | — | — |
| `{{image.updated_by}}` | ⏭️ Skip MVP | — | Same. Not rendered. | — | — |

**Condition card image filtering:** Cracks card = photos where `event_id` matches `crack_found` events. Potholes card = `pothole_found` events. Drains card = photos linked to drain segment events. Photos with null `event_id` appear in Section 1 scroll only.

---

## DRAIN PLACEHOLDERS

Fetched via fixed `getDrainsByRoadId`. Uses the corrected two-step query from Part 1.

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{drain.count}}` | 🔄 Computed | `drains` | `drains.length` | `drains.length` | 1 |
| `{{drain.not_built}}` | 🔄 Computed | `drains` | `drains.filter(d => d.status === 'not_built').length` | `drainsNotBuilt` | 1 |
| `{{drain.broken}}` | 🔄 Computed | `drains` | `drains.filter(d => d.status === 'broken').length` | `drainsBroken` | 0 |
| `{{drain.blocked}}` | 🔄 Computed | `drains` | `drains.filter(d => d.status === 'blocked').length` | `drainsBlocked` | 0 |
| `{{drain.functional}}` | 🔄 Computed | `drains` | `drains.filter(d => d.status === 'functional').length` | `drainsFunctional` | 0 |

---

## CONDITION CARD PLACEHOLDERS (Section 3)

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{cracks.subheading}}` | 🔄 Computed | `events` | COUNT `crack_found` events | `` `${crackEvents.length} cracks documented` `` | "2 cracks documented" |
| `{{potholes.subheading}}` | 🔄 Computed | `events` | COUNT `pothole_found` events | `` `${potholeEvents.length} potholes documented` `` | "3 potholes documented" |

---

## OFFICIAL PLACEHOLDERS (Sections 4 and 5)

**Which official:** The lowest-rank certifier on the `completion_claimed` event — the person who physically verified the road on the ground. Lowest rank = lowest `monthly_salary` among certifiers with `person_category = 'official'`.

In Ward 28: Gurudayal Singh (JE, ₹55,000/month). Prem Kumar Sharma (AE) is shown as a second face card in Section 5.

**Selection logic:**
```typescript
const completionParticipants = completionEvent.participants
const certifiers = completionParticipants.filter(p => p.role === 'certifier')
const officials = certifiers.filter(p => p.person?.personCategory === 'official')
const primaryCertifier = officials.sort(
  (a, b) => Number(a.person?.monthlySalary ?? 0) - Number(b.person?.monthlySalary ?? 0)
)[0]
const certifierPerson = primaryCertifier?.person
```

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{official.name}}` | ✅ Direct | `persons` | `full_name` of primary certifier | `certifierPerson.fullName` | "Gurudayal Singh" |
| `{{official.initials}}` | 🔄 Computed | `persons` | `getInitials(fullName)` | `getInitials(certifierPerson.fullName)` | "GS" |
| `{{official.role}}` | ✅ Direct | `persons` | `designation_plain ?? designation` | `certifierPerson.designationPlain ?? certifierPerson.designation` | "Junior Engineer" |
| `{{official.department}}` | ✅ Direct | `persons` | `department` | `certifierPerson.department` | "PWD Roorkee" |
| `{{official.salary}}` | 🔄 Computed | `persons` | `monthly_salary` → `formatSalary()` | `formatSalary(certifierPerson.monthlySalary)` | "₹55,000/month" |
| `{{official.action}}` | 🔄 Computed | `event_participants` + `events` | `getActionLabel(role, eventType)` | `getActionLabel('certifier', 'completion_claimed')` | "Signed completion certificate" |
| `{{official.action_date}}` | 🔄 Computed | `events` | `completionEvent.timestamp` | `formatDate(completionEvent.timestamp)` | "3 Apr 2025" |
| `{{official.accountability_status}}` | 🆕 New | `persons` | `accountability_status` → `getAccountabilityLabel()` | `getAccountabilityLabel(certifierPerson.accountabilityStatus)` | "RESPONSE PENDING" |
| `{{official.job_description}}` | 🆕 New | `persons` | `job_description` | `certifierPerson.jobDescription` | "Responsible for on-site quality verification..." |

---

## CONTRACTOR PLACEHOLDERS (Section 5)

Contractor = person where `person_category = 'contractor'` linked to the road via `event_participants`.

| Placeholder | Status | Table | Column / Derivation | TypeScript accessor | Example |
|---|---|---|---|---|---|
| `{{contractor.name}}` | ✅ Direct | `persons` | `full_name` | `contractor.fullName` | "Shubham Sharma" |
| `{{contractor.initials}}` | 🔄 Computed | `persons` | `getInitials(fullName)` | `getInitials(contractor.fullName)` | "SS" |
| `{{contractor.company}}` | ✅ Direct | `persons` | `department` | `contractor.department` | "M/s R.D. Infra" |
| `{{contractor.license}}` | 🆕 New | `persons` | `license_number` — NULL for Ward 28 | `contractor.licenseNumber ?? 'Not disclosed'` | "Not disclosed" |
| `{{contractor.amount_paid}}` | 🔄 Computed | `events` | `paymentEvent.evidence.netDisbursed` | `formatCurrency(netDisbursed)` | "₹3,54,581" |
| `{{contractor.dlp_status}}` | 🔄 Computed | `events` | `dlpEvent` → `dlpStatusLabel()` | `dlpStatusLabel(dlpEvent)` | "DLP active until 3 Apr 2026" |
| `{{contractor.accountability_status}}` | 🆕 New | `persons` | `accountability_status` → `getAccountabilityLabel()` | `getAccountabilityLabel(contractor.accountabilityStatus)` | "WAITING FOR AUDIT" |
| `{{contractor.job_description}}` | 🆕 New | `persons` | `job_description` | `contractor.jobDescription` | "Responsible for material quality, construction standards..." |

**OPEN ↗ link on face cards:** Omit entirely in MVP. No `/person/[id]` page exists yet. Do not show a broken or disabled link. Add when person profile page is built.

---

## MAP PLACEHOLDERS (Section 2 — Skip MVP)

| Placeholder | Status | Note |
|---|---|---|
| `{{map.roads[]}}` | ⏭️ Skip MVP | `getAllRoads()` already exists. Returns geometry (jsonb). Use when Section 2 is built. |
| `{{map.center_lat}}` | ⏭️ Skip MVP | Derive from road geometry centroid when Section 2 is built. |
| `{{map.center_lng}}` | ⏭️ Skip MVP | Same. |
| `{{map.zoom_level}}` | ⏭️ Skip MVP | Hardcode 15 when Section 2 is built. |

---

---

# PART 3 — COMPUTED VALUE LOGIC

**File location:** `src/lib/utils/road-display.ts`
All functions exported from this file. Import into `src/app/road/[id]/page.tsx`. No display logic in page.tsx.

---

## Finding the right events

```typescript
// tenderEvent — first work_order_issued where evidence.isTender === true
// Fallback: earliest work_order_issued (safe after seed is updated with isTender flag)
const tenderEvent = events.find(
  e => e.eventType === 'work_order_issued' && e.evidence?.isTender === true
) ?? events.find(e => e.eventType === 'work_order_issued')

const completionEvent = events.find(e => e.eventType === 'completion_claimed')
const paymentEvent    = events.find(e => e.eventType === 'payment_released')
const dlpEvent        = events.find(e => e.eventType === 'dlp_started')
const rtiEvent        = events.find(e => e.eventType === 'rti_filed')

// Issue event types — all six count as a public issue
const ISSUE_EVENT_TYPES = [
  'pothole_found',
  'crack_found',
  'drain_blocked',
  'flooding_reported',
  'structural_damage_found',
  'material_degradation_observed',
] as const

const conditionEvents = events.filter(e => ISSUE_EVENT_TYPES.includes(e.eventType as any))
const crackEvents     = events.filter(e => e.eventType === 'crack_found')
const potholeEvents   = events.filter(e => e.eventType === 'pothole_found')
```

---

## Financial values

```typescript
// Drizzle returns numeric columns as strings. Always wrap in Number() before arithmetic.
const netDisbursed:     number = Number(paymentEvent?.evidence?.netDisbursed    ?? 0)
const sanctionedBudget: number = Number(tenderEvent?.evidence?.estimatedValue   ?? 0)
const contractValue:    number = Number(tenderEvent?.evidence?.contractValue    ?? 0)
const ghostTotal:       number = Number(paymentEvent?.evidence?.ghostTotal      ?? 0)
```

---

## Currency formatting

```typescript
export function formatCurrency(amount: number): string {
  if (!amount || amount === 0) return '₹0'
  return '₹' + amount.toLocaleString('en-IN')
}

// monthlySalary from Drizzle is numeric — may arrive as string or number.
export function formatSalary(monthly: number | string | null): string {
  if (!monthly) return 'Salary not disclosed'
  const n = Number(monthly)
  if (isNaN(n)) return 'Salary not disclosed'
  return '₹' + n.toLocaleString('en-IN') + '/month'
}
```

---

## Time calculations

```typescript
export function builtMonthsAgo(tenderEvent: EventData | undefined): string {
  if (!tenderEvent) return 'Date unknown'
  const start = new Date(tenderEvent.timestamp)
  const now   = new Date()
  const months = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  )
  if (months < 1) return 'Less than a month ago'
  if (months === 1) return '1 month ago'
  return `${months} months ago`
}

// Copy adapts by health status:
// critical/dangerous/warning → "X days" (implies failure)
// good → "X days and counting" (neutral framing)
export function daysLasted(
  completionEvent: EventData | undefined,
  healthStatus: string | null
): string {
  if (!completionEvent) return 'Unknown'
  const certified = new Date(completionEvent.timestamp)
  const now = new Date()
  const days = Math.floor(
    (now.getTime() - certified.getTime()) / (1000 * 60 * 60 * 24)
  )
  const isFailure = ['critical', 'dangerous', 'warning'].includes(healthStatus ?? '')
  return isFailure ? `${days} days` : `${days} days and counting`
}
```

---

## Date formatting

```typescript
// Output: "3 Apr 2025"
// Verify on Vercel deployed preview — en-IN locale is supported on Vercel's Node runtime.
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'Date unknown'
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
```

---

## Benchmark calculations

```typescript
const SCHOOL_BAG_COST = 300 // ₹300 — locked benchmark. Do not change without design approval.

export function benchmarkBags(netDisbursed: number): string {
  if (!netDisbursed) return '0'
  return Math.round(netDisbursed / SCHOOL_BAG_COST).toLocaleString('en-IN')
}

// Uses actual certifier salary from DB — never hardcoded.
// monthlySalary from Drizzle is numeric — wrap in Number().
export function benchmarkJeMonths(
  netDisbursed: number,
  certifierPerson: PersonData | undefined
): string {
  const salary = Number(certifierPerson?.monthlySalary ?? 0)
  if (!salary || isNaN(salary)) return 'Unknown'
  return String(Math.round(netDisbursed / salary))
}
```

---

## Section 4 title

```typescript
export function section4Title(healthStatus: string | null): string {
  if (['critical', 'dangerous', 'warning'].includes(healthStatus ?? '')) {
    return 'The Betrayal'
  }
  return 'Your Money, Well Spent'
}
```

---

## Photo source label

```typescript
export function photoSourceLabel(source: string | null): string {
  const map: Record<string, string> = {
    citizen:    'CITIZEN REPORTED',
    official:   'FIELD VERIFIED',
    contractor: 'CONTRACTOR SUBMITTED',
    system:     'SYSTEM RECORDED',
    sensor:     'SENSOR DATA',
  }
  return map[source ?? ''] ?? 'SOURCE UNKNOWN'
}
```

---

## Accountability status display

```typescript
export function getAccountabilityLabel(status: string | null): string {
  const map: Record<string, string> = {
    waiting_for_audit: 'WAITING FOR AUDIT',
    response_pending:  'RESPONSE PENDING',
    responded:         'RESPONDED',
    charged:           'CHARGED',
  }
  return map[status ?? ''] ?? 'STATUS UNKNOWN'
}
```

---

## Action label — role + event type composite key

```typescript
// Composite key required: same role means different things on different events.
// Fallback: safe citizen-facing string — never raw debug output.
export function getActionLabel(role: string, eventType: string): string {
  const key = `${role}::${eventType}`
  const map: Record<string, string> = {
    'certifier::completion_claimed':               'Signed completion certificate',
    'certifier::lab_test_report_submitted':        'Certified lab test results',
    'certifier::inspection_conducted':             'Signed inspection report',
    'certifier::third_party_inspection_conducted': 'Certified third-party inspection',
    'authoriser::payment_released':                'Authorised payment disbursement',
    'authoriser::budget_sanctioned':               'Sanctioned project budget',
    'authoriser::budget_released':                 'Released project funds',
    'authoriser::completion_claimed':              'Authorised project completion',
    'authoriser::work_order_issued':               'Authorised work order',
    'assignee::work_order_issued':                 'Assigned as lead contractor',
    'assignee::repair_done':                       'Assigned to carry out repairs',
    'reporter::rti_filed':                         'Filed RTI application',
    'reporter::pothole_found':                     'Reported pothole',
    'reporter::crack_found':                       'Reported surface crack',
    'reporter::flooding_reported':                 'Reported road flooding',
    'witness::completion_claimed':                 'Witnessed completion sign-off',
    'witness::inspection_conducted':               'Witnessed inspection',
  }
  return map[key] ?? 'Involved in this project'
}
```

---

## Initials from full name

```typescript
export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  )
}
```

---

## DLP status label

```typescript
export function dlpStatusLabel(dlpEvent: EventData | undefined): string {
  if (!dlpEvent) return 'No DLP recorded'
  const evidence = dlpEvent.evidence as Record<string, unknown> | null
  const expiryDate: string | undefined = evidence?.dlpEndDate as string | undefined
  if (!expiryDate) return 'DLP active'
  const expiry    = new Date(expiryDate)
  const now       = new Date()
  const formatted = expiry.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  return expiry > now
    ? `DLP active until ${formatted}`
    : `DLP expired ${formatted}`
}
```

---

## Hero visual — MVP decision

**Spec calls for full-screen video. No video table exists. No video filmed.**

**MVP: use `photos` where `is_hero = true`.** Text animation sequence plays over hero photo exactly as designed. No design change needed.

**When video is ready:** Add `videos` table (`road_id`, `url`, `thumbnail_url`, `is_hero`, `captured_at`). Section 1 component checks for hero video first, falls back to hero photo. One component change, no design impact.

**Logged in DECISIONS.md:** "Section 1 Hero — MVP uses hero photo, not video."

---

---

# QUICK REFERENCE

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
road.name          → roads.road_display_name
road.ward          → roads.ward                     [NEW]
road.city          → roads.city                     [NEW]
road.record_id     → roads.road_system_id  [not rendered MVP]
road.status        → roads.health_status
road.witness_count → COUNT(confirmations WHERE is_flagged=false)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONEY & TIME (all from events)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
money_spent        → paymentEvent.evidence.netDisbursed
allocated          → tenderEvent.evidence.estimatedValue
contracted         → tenderEvent.evidence.contractValue
months_ago         → today - tenderEvent.timestamp → months
days_lasted        → today - completionEvent.timestamp → days
issues_count       → COUNT(events WHERE type IN issue set)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
image.status       → photos.status                  [NEW]
image.location     → photos.location_label           [NEW]
image.source       → photos.source → photoSourceLabel()
image.reported_by  → photos.person_id → persons.full_name [NEW FK]
                     fallback: photos.uploaded_by
image.reported_at  → photos.captured_at
image.updated_*    → SKIP MVP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DRAINS (use fixed getDrainsByRoadId)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
drain.count        → drains.length
drain.not_built    → drains.filter(status='not_built').length
drain.broken       → drains.filter(status='broken').length
drain.blocked      → drains.filter(status='blocked').length
drain.functional   → drains.filter(status='functional').length
drain.[status]     → drains.status                  [NEW]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OFFICIAL (lowest-rank certifier on completion_claimed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
official.name      → persons.full_name
official.role      → persons.designation_plain ?? designation
official.dept      → persons.department
official.salary    → persons.monthly_salary → formatSalary()
official.action    → getActionLabel(role, eventType)
official.date      → completionEvent.timestamp → formatDate()
official.status    → persons.accountability_status  [NEW]
official.job_desc  → persons.job_description        [NEW]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRACTOR (person_category='contractor')
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
contractor.name    → persons.full_name
contractor.company → persons.department
contractor.license → persons.license_number → NULL='Not disclosed' [NEW]
contractor.paid    → paymentEvent.evidence.netDisbursed
contractor.dlp     → dlpStatusLabel(dlpEvent)
contractor.status  → persons.accountability_status  [NEW]
contractor.job_desc→ persons.job_description        [NEW]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPUTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
benchmark.bags     → Math.round(netDisbursed / 300)
benchmark.months   → Math.round(netDisbursed / certifier.monthlySalary)
section4.title     → health IN(critical,dangerous,warning) → 'The Betrayal'
OPEN ↗ link        → OMIT in MVP. Add when /person/[id] exists.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUGS FIXED IN THIS VERSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. N+1 query in getFullRoadData — fixed with single inArray query
2. getDrainsByRoadId wrong segmentId param — fixed + inArray import added
3. Events sorted ASC — fixed to DESC
4. WHISTLEBOWER_REPORT typo — fixed to WHISTLEBLOWER_REPORT
5. Drains missing from getFullRoadData — now included in parallel fetch
6. isTender flag — add to seed before tenderEvent logic is relied on
7. Photos not linked to events in seed — required before Section 3 renders
```

---

*Version 2.0 — single source of truth.*
*Schema changes first. Bugs fixed. Then frontend.*
*Any change to schema or derivation logic: update this document first, get approval, then change the code.*
*
