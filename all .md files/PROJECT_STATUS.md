# MyStreet — Project Status

Last updated: May 2026 (v3 — Sections 1, 3, 4, 5, 6 complete)
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
- New exported types: `PersonData`, `DrainData`, `ApprovedOfficial`, `ConditionCardData`, `FaceCardData` (all now in `src/types/road.ts` — not in component files)
- `ConditionCardData.countLabel` — optional override for the count row label (e.g. drains show "Sections damaged" instead of "Drains found")
- `FaceCardData.salaryPerDay` — formatted cost-per-day string derived from lower bound of payScale range via `formatSalaryPerDay()`
- `FaceCardData.salarySource` — source attribution string for the salary figure (nullable)

### Real Data Seeded ✓
- **Reseeded from verified RTI data. Source: `all .md files/ward28/` (5 files). ward28skill.md is the routing guide.**
- Ward 28, Roorkee — `UK-RKE-29.8723-77.8813`
- 14 persons — all verified against RTI documents. Technical chain corrected from RTI Page 11: Gurubayal Singh (Nirman Lipik/Construction Clerk — not an engineer), Prem Kumar Sharma (JE), P. Sharma (AE), Anand Singh Mishrawan (EE). PIO name confirmed absent from all 41 pages — placeholder used intentionally.
- 1 road — displayName exactly as written in RTI: "Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee"
- 1 segment — area 363.30 SQM, thickness 80mm. Length and width null (not in RTI documents).
- 1 drain — all dimension fields null (not in RTI documents). Status null — physical existence not yet field verified. Partial structural damage observed.
- 42 events — 11 original RTI events + 1 crack_found (8 photos) + 1 pothole_found (10 photos) + 1 drain_blocked (11 photos) + 14 additional crack_found (no photos, counts 2–15) + 9 additional pothole_found (no photos, counts 2–10) + 5 repair_done (May 2026: 2 pothole repairs + 3 crack repairs, privately funded by residents, contractor never acted during DLP).
- 54 event participants.
- 44 photos — 10 Section 1 + 8 crack + 10 pothole + 11 drain (all Nov 2025) + 5 repair photos (May 2026, status: good).
- Photo statuses individually assigned per photo. See seed.ts section 3 photo block for status per numbered photo. Repair photos: all `good`.
- Section 1 photos use hardcoded `SECTION1_PHOTOS` array in seed.ts — `status` and `locationLabel` are required typed fields per entry, enforced by TypeScript. No defaults. See SEED_GUIDE.md Step 8.
- `locationLabel` format: `"street name — ward, city, pincode"`. Split on ` — ` in HeroSection display.
- monthlySalary set: premKumar=55000, pSharma=70000, executiveEngineer=100000 — used for approvedBy sort order (JE→AE→EE) in Section 3 cards.

### Utility Functions ✓
- `src/lib/utils/road-display.ts` — all computed value logic lives here, not in `page.tsx`
- Functions: `formatCurrency`, `formatLakh`, `formatSalary`, `formatSalaryPerDay`, `builtMonthsAgo`, `daysLasted`, `formatDate`, `benchmarkBags`, `benchmarkMeals`, `benchmarkJeMonths`, `section4Title`, `photoSourceLabel`, `getAccountabilityLabel`, `getActionLabel`, `getInitials`, `dlpStatusLabel`, `formatFailureDuration`, `getHeroCrops`, `extractCompletionEvidence`, `extractPaymentEvidence`, `extractTenderEvidence`, `extractDlpEvidence`, `extractRepairEvidence`, `extractRtiEvidence`, `extractAppealEvidence`, `monthsApart`, `isSameDay`, `abbreviateDesignation`
- `formatLakh(amount)` — ≥1 lakh shows `₹X.XX Lakh`, below 1 lakh shows full `₹X,XXX` format. Used in Section 3 summary strip.
- `extractCompletionEvidence(evidence)` — parses `inspectionDate` from completion event evidence. Handles both ISO (YYYY-MM-DD) and Indian RTI format (DD.MM.YYYY).
- `abbreviateDesignation(designation)` — maps full designation to abbreviation: JE, AE, EE, MC.
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
| UK-RKE-29.8723-77.8813 | Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee | critical | 42 (11 RTI + 15 crack + 10 pothole + 1 drain + 5 repair_done) | 1 (status null — field verification required) |
