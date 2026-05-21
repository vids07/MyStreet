# MyStreet — Project Status

Last updated: May 2026
Current phase: Theme 1 — Truth Layer, Epic 1 — Road Identity System

---

## Where We Are Right Now

**Stage**: Backend complete. Design system locked. UI build phase in progress (Sections 1, 3, 4, 5, 6 built).

**Next immediate action**: Migrate photos from Google Drive to Vercel Blob/Cloudinary, link photos to events, and implement interactive features (sharing, downloading, witness tap).

---

## What Is Complete

### Database & Schema ✓
- 8 tables live in NeonDB: roads, segments, drains, events, event_participants, persons, photos, confirmations
- All relationships properly defined with foreign keys and cascade rules
- Event types, severity, health status — all typed as PostgreSQL enums
- TypeScript types exported from schema — no magic strings anywhere
- 6 schema migrations applied (see `drizzle/migrations/`):
  - `002_mvp_fields.sql`: `persons` accountability_status/job_description/license_number; `roads` ward/city; `drains` status enum; `photos` status/location_label/person_id
  - `003_nullable_person_fields.sql`: `persons.designation` and `persons.department` made nullable — citizens have no official designation
  - `004_data_confidence.sql`: `event_participants.data_confidence` enum (verified/probable/unconfirmed) — replaces confidence annotations that were only in code comments
- `roads.governing_body` column added via `drizzle-kit push` — text nullable. Stores the public body responsible for the road (e.g. "Nagar Nigam Roorkee"). First-class accountability field — not derivable from persons.

### Query Architecture ✓
- Centralized query layer: `src/server/queries/road.ts`
- Server components query database directly — no HTTP round trip
- API route exists for external consumers: `/api/road/[id]`
- N+1 bug fixed: `getFullRoadData` now fetches all participants across all events in a single `inArray` query, then maps in memory. Previously fired one DB query per event.
- `getDrainsByRoadId` bug fixed: was comparing `segmentId` to a `roadId` — returned zero results. Now two-step: get segment IDs first, then `inArray` on drains.
- Events sorted DESC (newest first) — was incorrectly sorted ASC.
- Full TypeScript safety — `npx tsc --noEmit` passes clean, zero errors.

### Type Safety ✓
- `EVENT_TYPES` constants in `src/types/road.ts` — `WHISTLEBLOWER_REPORT` typo fixed (was `WHISTLEBOWER_REPORT`)
- `HEALTH_STATUS` and `SEVERITY` constants
- All inferred types from Drizzle schema
- New exported types: `PersonData`, `DrainData` (added May 2026)

### Real Data Seeded ✓
- **Reseeded from verified RTI data. Source: `all .md files/ward28/` (5 files). ward28skill.md is the routing guide.**
- Ward 28, Roorkee — `UK-RKE-29.8723-77.8813`
- 13 persons — all verified against RTI documents. Names for JE (Gurukesh Singh), AE (Prem Kumar Sharma), EE (Aashray Singh Mishra) are HIGH confidence per Ward28 02 persons.md. PIO name confirmed absent from all 41 pages — placeholder used intentionally.
- 1 road — displayName exactly as written in RTI: "Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee"
- 1 segment — area 363.30 SQM, thickness 80mm. Length and width null (not in RTI documents).
- 1 drain — all dimension fields null (not in RTI documents). Status null — physical existence not yet field verified.
- 14 events — 11 original RTI events + 3 citizen field observation events added May 2026 (crack_found, pothole_found, drain_blocked — 8 Feb 2026, linked to segment).
- 24 event participants — 21 original + Vidushi added as reporter on all 3 condition events.
- 31 photos seeded — hosted on Cloudinary. 10 Section 1 (eventId null, re-uploaded with corrected URLs), 6 crack, 3 pothole, 12 drain. All captured 19 Nov 2025.
- Section 1 photos use hardcoded `SECTION1_PHOTOS` array in seed.ts — `status` and `locationLabel` are required typed fields per entry, enforced by TypeScript. No defaults. See SEED_GUIDE.md Step 8.
- `locationLabel` format: `"street name — ward, city, pincode"`. Split on ` — ` in HeroSection display.
- Sachin Kumar: jobDescription populated, accountabilityStatus set to waiting_for_audit, participant role corrected to reporter on payment_released.
- Gurukesh Singh: monthlySalary set to ₹55,000 — required for Section 4 JE benchmark calculation.

### Utility Functions ✓
- `src/lib/utils/road-display.ts` — all computed value logic lives here, not in `page.tsx`
- Functions: `formatCurrency`, `formatSalary`, `builtMonthsAgo`, `daysLasted`, `formatDate`, `benchmarkBags`, `benchmarkJeMonths`, `section4Title`, `photoSourceLabel`, `getAccountabilityLabel`, `getActionLabel`, `getInitials`, `dlpStatusLabel`, `formatFailureDuration`, `getHeroCrops`
- `getHeroCrops(url)` — generates 3 Cloudinary crop URLs from a stored photo URL. Mobile: original (no crop). Laptop: `c_fill,ar_1.6,g_auto`. Desktop: `c_fill,ar_1.78,g_auto`. Handles both `q_auto/f_auto` (slash) and `q_auto,f_auto` (comma) URL formats.
- `ISSUE_EVENT_TYPES` constant exported — used to derive `conditionEvents` count
- Every placeholder in MAPPING.md Part 2 has a corresponding function or direct accessor

### Basic Road Page Exists ✓
- Route: `/road/[id]` — dynamic, works for any road
- Pulls real data from database — zero hardcoding
- Refactored to component-composition pattern (Sections 1, 3, 4, 5, 6)
- Uses centralized `road-display.ts` utilities for all data derivations
- Fully follows the locked Design System Foundations v1.1

### Design System Locked ✓
- Typography (Mona Sans + Roboto), Colors (Locked hex scale), Spacing, Radius, and Shadows all defined in `design_system.md` and applied via `tailwind.config.ts`.
- `FRONTEND.md` created as the definitive technical reference for the frontend team.

---

## What Is In Progress

### UI Interactions — IN PROGRESS
- Witness tap, Share, and Document buttons exist but are currently static.

---

## What Is Not Built Yet

### UI Sections (designed, not built)
- Section 2 — Map comparison — requires multiple roads, build last
- Full Timeline Section — currently partially built, needs standalone component

### Features (designed, not built)
- Citizen confirmation API endpoint
- Download report as PDF
- Share button with pre-written message
- Condition cards with scrollable photos per issue
- Gamified accountability journey with tap progression

### Epic 1 Remaining Tasks
- Task 5: Make URL shareable and test
- Task 6: Non-developer road entry form (planned post-UI)

### Epic 2 — Health Status (not started)
- Manual health status update mechanism
- Status change history

### Epic 3 — Public Timeline (partially done)
- Timeline exists and displays
- Water clogging events — citizen reported, in timeline
- Export as PDF — not built

---

## Foundation Document Alignment Check

| Epic 1 Definition of Done | Status |
|---------------------------|--------|
| One real road live at permanent public URL | ✓ Done |
| Every schema field populated with real data | ✓ Done |
| URL works for anyone — no login | ✓ Done |
| Non-developer can add second road without code | ✗ Not built — Task 6 |
| Page readable on mobile | Partial — basic page exists |
| URL shareable and loads correctly when shared | ✗ Not tested |

---

## Architecture Decisions

All locked decisions documented in DECISIONS.md.

---

## Design Decisions

All locked in DESIGN_SYSTEM.md (in progress — being locked now).

---

## Known Issues

1. `designationPlain` is nullable — needs to be populated for all persons before UI goes live.

4. Migration strategy — currently using `drizzle-kit push`. Should switch to generate + migrate before any production deployment.

---

## Tech Stack

- Framework: Next.js 15+ App Router
- Language: TypeScript (strict)
- Database: PostgreSQL via NeonDB serverless
- ORM: Drizzle ORM
- Styling: Tailwind CSS 4.0
- Fonts: TBD — being locked in design system
- Deployment: Vercel

---

## Road in Database

| Road System ID | Display Name | Health Status | Events | Drains |
|----------------|-------------|---------------|--------|--------|
| UK-RKE-29.8723-77.8813 | Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee | critical | 14 (incl. 3 citizen field observations) | 1 (status null — field verification required) |
