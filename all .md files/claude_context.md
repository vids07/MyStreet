# MyStreet Project Context

## Project Overview
**MyStreet** is a civic infrastructure transparency platform designed to track public works, specifically roads and drains, to ensure accountability and expose corruption. It provides a permanent, public record of every rupee spent and every official involved.

---

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL via NeonDB
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4.0
- **Fonts**: Google Fonts (Outfit)

---

## Architecture Decisions
1. **Centralized Queries**: All database access is consolidated in `src/server/queries/` to ensure consistency and minimize redundant data fetching.
2. **Unified Types**: Domain-specific types and constants (Event Types, Health Status) are centralized in `src/types/` to avoid magic strings.
3. **Server Components**: The road dashboard is a Server Component that fetches all necessary data in parallel using `getFullRoadData`.
4. **Minimalist UI**: Focused on high-impact derived metrics (Paid money, Ghost items, DLP status) for immediate clarity on potential corruption.

---

## Directory Structure
```text
MyStreet/
├── src/
│   ├── app/
│   │   ├── api/road/[id]/route.ts  # Clean API using centralized queries
│   │   ├── road/[id]/page.tsx      # Overhauled minimalist dashboard
│   ├── db/
│   │   ├── schema/                 # Drizzle table definitions
│   │   │   ├── road.ts, segment.ts, event.ts, person.ts, etc.
│   │   └── index.ts                # DB client
│   ├── lib/
│   │   └── queries/
│   │       └── road.ts             # Centralized road & relation queries
│   ├── types/
│   │   └── road.ts                 # Unified types and constants
```

---

## Core Logic & Queries

### `src/server/queries/road.ts`
Assembles complete road data including segments, events (with participant/person relations), photos, and confirmation counts.

### `src/types/road.ts`
Defines `EVENT_TYPES`, `HEALTH_STATUS`, and `SEVERITY` constants and derived types.

### `src/app/road/[id]/page.tsx`
Computes all derived metrics (Built months ago, DLP expiry, Ghost item totals, Discrepancies) in a single server-side pass.

---

## Database Schema Highlights
- **Events & Participants**: Tracks exactly who signed what (JE, AE, Commissioner) for every milestone.
- **Photos**: Supports geo-tagged verification and "Hero" photos for visual evidence.
- **Confirmations**: Tracks citizen confirmation of road usage and impact.

---
*Note: Full source code for the overhaul is available in the respective files.*
