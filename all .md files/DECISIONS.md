# MyStreet — Architecture & Product Decision Log

Every significant decision made during design and development.
Format: Decision | Why | Tradeoff Accepted | Revisit Trigger

---

## DATABASE & SCHEMA

### Timeline is the single source of truth
- **Decision**: Every road condition, contract fact, and accountability event lives in the timeline. Nothing is stored as a separate status field except cached values for performance.
- **Why**: One truth, no sync issues. Prevents data lying accidentally.
- **Tradeoff**: Slightly more complex to query current state.
- **Revisit**: Never — this is architectural.

### Condition always derived from timeline, never stored
- **Decision**: Road health status, drain condition, pothole count — all derived from timeline events. Never stored as permanent fields.
- **Why**: Stored condition can go stale or be manually manipulated. Timeline events are immutable.
- **Tradeoff**: Query complexity increases slightly.
- **Revisit**: Never.

### healthStatus cached on roads table
- **Decision**: Despite deriving condition from timeline, `healthStatus` is cached on the roads table for performance.
- **Why**: Listing 1000 roads and scanning all their events to show status is unacceptable. Cache is updated when health_status_changed event is added.
- **Tradeoff**: Two places to update when status changes. Acceptable because it's a deliberate write operation.
- **Revisit**: If performance becomes non-issue at small scale — remove cache and derive always.

### Segments defined by physical features, not contract
- **Decision**: A segment is defined by permanent physical junctions — where roads meet, split, or change character. Not by contractor zones or arbitrary lengths.
- **Why**: Independent of contractor manipulation. A T-shaped road has a stem and two branches — that never changes regardless of who builds it.
- **Tradeoff**: Requires physical judgment call to define segments.
- **Revisit**: Never.

### Every road has minimum one segment — itself
- **Decision**: Even a straight road with no junctions has one segment covering the entire road.
- **Why**: Consistency. All condition events, photos, and drain records attach to segments. No segment means no precise location data.
- **Tradeoff**: Slightly redundant for simple roads.
- **Revisit**: Never.

### Counts derived not stored
- **Decision**: Number of segments, number of drains, number of potholes — always derived by counting records, never stored as fields.
- **Why**: Two places = out of sync risk. One source of truth always wins.
- **Tradeoff**: Slightly slower count queries at scale.
- **Revisit**: If count queries become performance bottleneck — add cached counts.

### Pavement type and drain type live in timeline events
- **Decision**: Pavement type (tiles, concrete, asphalt) and drain type (open, covered, closed) are not permanent fields. They live in timeline events as construction event evidence.
- **Why**: In India, road material changes over time. A tile road gets rebuilt in concrete. Storing as permanent field creates stale data.
- **Tradeoff**: Must query timeline to find current pavement type.
- **Revisit**: Never.

### personId in event_participants is UUID FK to persons table
- **Decision**: Changed from text slug to proper UUID foreign key referencing persons.id.
- **Why**: Text slugs cannot be joined to person details. The entire accountability chain — event → participant → person name, salary, designation — requires a proper FK.
- **Tradeoff**: Migration required clearing existing data.
- **Revisit**: Never.

### designationPlain is nullable
- **Decision**: The plain language designation field (e.g., "The engineer whose job was to check the work") is nullable.
- **Why**: Migration constraint — existing rows cannot have a default value forced. Will be populated during seeding and future data entry.
- **Tradeoff**: UI must handle null gracefully — fall back to formal designation.
- **Revisit**: Make non-null once all existing persons have plain language designations.

### Events have isFlagged not isDeleted
- **Decision**: Events can never be deleted. They can be flagged as disputed with a reason.
- **Why**: Public irreversibility principle. Once recorded, nothing disappears. Disputes are recorded as new events or flags, not deletions.
- **Tradeoff**: Database accumulates flagged events. UI must filter them.
- **Revisit**: Never — this is the core principle.

### Photos as separate table, not JSONB in events
- **Decision**: Photos live in their own `photos` table with roadId, segmentId, eventId, source, location, and isHero flag.
- **Why**: JSONB evidence field is unstructured. Photos need to be queryable by road, segment, event, and hero status. Separate table enables all of this.
- **Tradeoff**: Extra table to manage.
- **Revisit**: Never.

### Confirmations table with device fingerprint not login
- **Decision**: Citizen confirmations use device fingerprint, not user login. One confirmation per device per road.
- **Why**: Login creates friction. Sunita will not create an account. Device fingerprint provides basic manipulation protection without barrier to participation.
- **Tradeoff**: Same device = same person assumption. Not perfect. Supplemented by location signal and coordination detection.
- **Revisit**: If manipulation becomes serious problem — add optional phone verification.

---

## QUERY ARCHITECTURE

### Single data layer in src/server/queries/road.ts
- **Decision**: All database queries live in one file. Both the page (server component) and the API route import from this file.
- **Why**: No duplication. No HTTP round trip from server component to its own API. API route exists for external consumers only.
- **Tradeoff**: Single file grows large. Split by domain when it exceeds 300 lines.
- **Revisit**: Split into multiple query files when project grows.

### Server components query database directly
- **Decision**: Road page server component imports getFullRoadData() directly. Does not fetch from /api/road/[id].
- **Why**: Server components calling their own API via HTTP adds unnecessary network latency and requires NEXT_PUBLIC_BASE_URL to be set correctly everywhere.
- **Tradeoff**: API route and page use shared query function — must keep in sync.
- **Revisit**: Never — this is Next.js App Router best practice.

### No magic strings — EVENT_TYPES constants
- **Decision**: All event type strings are defined as constants in src/types/road.ts and imported everywhere.
- **Why**: Typos in event type strings fail silently. Constants give compile-time safety and autocomplete.
- **Tradeoff**: Extra import in every file that uses event types.
- **Revisit**: Never.

---

## PRODUCT & DESIGN

### One timeline, filtered views on display
- **Decision**: All events live in one chronological timeline. The UI provides filtered views — Sunita sees the story, journalist sees the evidence, official sees their record.
- **Why**: Separating timelines loses the connection between contractor payment and road failure. That connection is the most powerful accountability mechanism.
- **Tradeoff**: Display complexity increases.
- **Revisit**: Never.

### Severity only on condition events
- **Decision**: Severity field is only populated for condition events — pothole_found, crack_found, etc. Contract events like work_order_issued have null severity.
- **Why**: Contract event severity is derived from the gap between events, not the event itself. A work order not acted upon for 60 days is severe — but that's a derived calculation, not a stored value.
- **Tradeoff**: Severity for contract failures must be calculated dynamically.
- **Revisit**: Never.

### No ratings, no likes, no dislikes
- **Decision**: MyStreet has no rating system for officials or contractors.
- **Why**: Ratings can be manipulated. The permanent record cannot. Gurudayal Singh's rating doesn't matter. His signature on a false oath on 3 April 2025 is what matters.
- **Tradeoff**: Less engagement-friendly.
- **Revisit**: Never — this is a truth platform not a social platform.

### Citizen confirmation is one directional
- **Decision**: Citizens can confirm "this road affects my daily life." There is no support/oppose button.
- **Why**: Road condition is not an opinion. The drain either exists or it doesn't. Supporting an official does not change physical evidence.
- **Tradeoff**: Less "balanced" feeling to some users.
- **Revisit**: Never.

### Light background, not dark mode
- **Decision**: MyStreet uses a warm cream light background.
- **Why**: Light communicates openness and transparency. Nothing hidden, nothing in shadows. Correct for a truth platform.
- **Tradeoff**: Dark mode users may find it uncomfortable.
- **Revisit**: Add dark mode preference in future if user demand is clear.

### Empowerment section — no gamification in Theme 1
- **Decision**: Block 5 shows a simple confirmation tap. Badge system and reputation system are logged for Theme 2/3 but not built now.
- **Why**: Theme 1 scope. Foundation document says citizen complaint system is not being built yet.
- **Tradeoff**: Less engaging for citizens in Theme 1.
- **Revisit**: Theme 2 — transparency layer implementation.

### Stage 1 verified source is founder only
- **Decision**: Only the founder adds verified timeline events and persons in Stage 1.
- **Why**: Trust must be established before opening to others. One verified source is infinitely better than zero records. Scale comes when trust is established.
- **Tradeoff**: System growth depends on one person.
- **Revisit**: When trust mechanisms are built — verified journalist tier, citizen reporter tier.

### Map section shown only when multiple roads exist
- **Decision**: Section 2 — the map comparison — is hidden until the database has more than one road.
- **Why**: A map with one road colored red has no comparison value. The emotional impact requires seeing your road among many others.
- **Tradeoff**: Ward 28 page launches without the map section.
- **Revisit**: When second road is added.

---

## STACK

### Drizzle ORM over Prisma
- **Decision**: Using Drizzle ORM with NeonDB serverless.
- **Why**: 90% smaller bundle than Prisma. Cold starts drop from 1-3 seconds to under 500ms on Vercel. Critical for a public civic platform where citizens open links on 2G connections.
- **Tradeoff**: Less hand-holding than Prisma. More SQL knowledge required.
- **Revisit**: Never at current scale.

### NeonDB serverless PostgreSQL
- **Decision**: Using NeonDB as the database.
- **Why**: Serverless, free tier generous, works perfectly with Vercel and Next.js. PostgreSQL gives us full relational power, JSONB for flexible evidence storage, and enums for type safety.
- **Tradeoff**: Serverless cold starts on free tier. Acceptable for current stage.
- **Revisit**: Upgrade to paid tier when traffic warrants.

### Monorepo — frontend and backend together
- **Decision**: Frontend, API routes, and database all in one Next.js project.
- **Why**: One person, one deployment, Theme 1 scope. Separating adds complexity with zero benefit at this stage.
- **Tradeoff**: Must split when project scales to multiple teams.
- **Revisit**: When dedicated backend team joins or traffic requires independent scaling.
