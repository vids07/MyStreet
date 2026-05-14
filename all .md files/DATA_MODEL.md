# MyStreet — Data Model Reference

Plain English explanation of every table, field, and relationship.
Read this before touching any schema file.

---

## The Core Principle

Everything is an event. Work order issued, pothole found, RTI filed, payment released — all events. The timeline of events IS the road's permanent record. Nothing is deleted. Everything is public.

---

## Tables

### roads
The permanent identity of a road. Created when a work order is issued. Never deleted.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| roadSystemId | text | Public permanent ID — format: STATE-CITY-LAT-LNG e.g. UK-RKE-29.8723-77.8813 |
| roadDisplayName | text | Human readable location description |
| geometry | JSONB | GeoJSON shape of the road |
| healthStatus | enum | Cached current status — good/warning/critical/dangerous. Updated when health_status_changed event is added |
| healthStatusUpdatedAt | timestamp | When was status last updated — staleness is visible |
| healthStatusUpdatedBy | text | Who updated the status |

**Why healthStatus is cached**: Deriving status from timeline on every page load requires scanning all events. For 1000 roads this is unacceptable. Cache is updated intentionally on every status change event.

---

### segments
Physical sections of a road defined by permanent features — junctions, bends, changes in character. A T-shaped road has 3 segments: stem, left branch, right branch. Every road has minimum one segment — itself.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| roadId | UUID FK | Which road this segment belongs to |
| segmentDisplayName | text | Plain description e.g. "Main Stem" |
| segmentCoordinates | JSONB | Representative coordinates |
| geometry | JSONB | GeoJSON shape of segment |
| length | numeric | Metres |
| width | numeric | Metres |
| area | numeric | Square metres |
| surfaceThickness | numeric | Millimetres — contract specification |

**Segments are physical, not contractual**. They are defined by the road's shape, not the contractor's work zones. This prevents manipulation.

---

### drains
Drain records linked to specific segments. A segment may have zero, one, or multiple drains.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| segmentId | UUID FK | Which segment this drain belongs to |
| drainDisplayName | text | Plain description |
| length | numeric | Metres |
| width | numeric | Metres |
| depth | numeric | Metres — accountability field, shallow drain = contractor cut costs |
| area | numeric | Square metres |

**Drain condition** is never stored. It is derived from drain-related timeline events. A drain_blocked event means the drain is blocked. A new drain_blocked event with severity downgraded means it was cleared.

---

### events
The heart of the entire system. Every significant moment in a road's life. Cannot be deleted — only flagged as disputed.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| roadId | UUID FK | Which road |
| segmentId | UUID FK nullable | Which segment — null for road-wide events |
| eventType | enum | What kind of event — see EVENT_TYPES in src/types/road.ts |
| timestamp | timestamp | When this happened — from source documents, not upload time |
| description | text | Full plain English description of what happened |
| severity | enum nullable | low/medium/high/critical — only for condition events |
| evidence | JSONB | Structured proof — document names, financial figures, measurements |
| evidenceSource | enum | citizen/official/contractor/system/sensor |
| isFlagged | boolean | Is this event disputed |
| flaggedAt | timestamp nullable | When was it flagged |
| flaggedReason | text nullable | Why was it flagged |

**Evidence JSONB structure varies by event type**. See seed.ts for complete examples of each event type's evidence structure. The UI derives all financial figures from evidence JSONB — nothing is hardcoded.

**Key evidence fields by event type**:
- payment_released: netDisbursed, sanctionedBudget, ghostItems[], ghostTotal
- completion_claimed: areaClaimed, areaActual, discrepancyPercent, drainActuallyExists
- dlp_started: dlpStartDate, dlpEndDate, securityDeposit
- work_order_issued: sanctionedBudget, contractAmount, discountPercent

---

### event_participants
Links people to events with their specific role. One event can have many participants. One person can appear in many events across their career.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| eventId | UUID FK | Which event — cascades on delete |
| personId | UUID FK | Which person — restricts delete (cannot delete person if they have event records) |
| personType | enum | citizen/official/contractor/system/sensor |
| role | enum | reporter/certifier/authoriser/assignee/witness |

**This table is the accountability chain**. Gurudayal Singh → certifier → completionEvent → drain certified as built → drain does not exist. That chain exists because of this table.

---

### persons
Everyone who has ever touched a road's accountability chain. Officials, contractors, citizens.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| fullName | text | Full name as on official documents |
| designation | text | Official title e.g. "Sahayak Abhiyanta" |
| designationPlain | text nullable | Plain language e.g. "The engineer whose job was to check the work" — for Sunita layer |
| department | text | Which department or company |
| personCategory | enum | official/contractor/citizen |
| contactOrId | text nullable | Government service ID for officials, GST for contractors |
| jurisdiction | text nullable | Ward, city, district they operate in |
| monthlySalary | numeric nullable | Monthly salary in INR — public information for government officials |
| salarySource | text nullable | Where salary figure came from e.g. "UKPSC 7th Pay Commission Level 7" |
| photoUrl | text nullable | Official photo URL |
| photoSource | text nullable | Where photo was obtained |

**designationPlain is nullable** until populated. UI falls back to formal designation when null. Make non-null once all persons have plain language descriptions.

**monthlySalary is public information** for government officials — pay scales are published by UKPSC under 7th Pay Commission. This is not private data.

---

### photos
Visual evidence linked to roads, segments, and events.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| roadId | UUID FK | Which road — required |
| segmentId | UUID FK nullable | Which segment |
| eventId | UUID FK nullable | Which event this photo documents |
| url | text | Photo URL — currently Google Drive, future: proper storage |
| thumbnailUrl | text nullable | Compressed version for grid display |
| source | enum | citizen/official/contractor/system/sensor |
| capturedAt | timestamp nullable | When photo was taken — from EXIF or manual entry |
| locationLat | numeric nullable | GPS latitude |
| locationLng | numeric nullable | GPS longitude |
| deviceInfo | JSONB nullable | Device metadata — for future sensor integration |
| uploadedBy | text nullable | person_id or system identifier |
| isVerified | boolean | Has this photo been verified by a trusted source |
| verifiedAt | timestamp nullable | When verified |
| isHero | boolean | Is this the primary photo for Section 1 — The Mirror. One per road should be true. |

---

### confirmations
Citizen confirmations that a road affects their daily life. One per device per road.

| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Internal primary key |
| roadId | UUID FK | Which road |
| deviceFingerprint | text | Browser/device identifier — prevents duplicate confirmations |
| locationLat | numeric nullable | Where they confirmed from — for proximity weighting |
| locationLng | numeric nullable | Where they confirmed from |
| confirmedAt | timestamp | When they confirmed |
| isFlagged | boolean | Suspicious confirmation — coordinated pattern detected |
| flagReason | text nullable | Why flagged |

**Flagged confirmations are never deleted** — they remain in the record but are excluded from the public count. The pattern itself is evidence.

---

## Relationships Diagram
roads
├── segments (one to many)
│     └── drains (one to many)
├── events (one to many)
│     └── event_participants (one to many)
│           └── persons (many to one)
├── photos (one to many)
└── confirmations (one to many)

---

## Adding a New Road

See SEED_GUIDE.md for step by step instructions.

---

## Event Type Reference

See src/types/road.ts for the complete EVENT_TYPES constant object.

**Contract events**: work_order_issued, construction_started, inspection_conducted, completion_claimed, budget_sanctioned, budget_released, payment_released, dlp_started, dlp_ended, road_rebuilt

**Condition events**: health_status_changed, pothole_found, crack_found, flooding_reported, drain_blocked, structural_damage_found, material_degradation_observed, repair_done

**Accountability events**: rti_filed, rti_response_received, rti_ignored, ticket_raised, ticket_resolved, escalation_triggered, whistleblower_report, accident_or_injury_recorded

**Verification events**: lab_test_report_submitted, third_party_inspection_conducted, sensor_reading_recorded
