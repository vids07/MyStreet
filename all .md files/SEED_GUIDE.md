# MyStreet — Seed Guide

How to add a new road to the database. Read this completely before starting.

---

## Before You Begin

Every value must come from a real document. RTI response, work order, measurement book, payment voucher. If you do not have the document — leave the field null. Never invent data. Never estimate. The system's credibility depends on every field being traceable to a source.

---

## Step 1 — Gather Your Documents

You need at minimum:
- Work order or tender document — contractor name, contract amount, sanctioned budget
- Completion certificate — area claimed, date, officials who signed
- Payment voucher — final amount paid, any itemised breakdown
- Physical measurements — your own measurement of the actual road

Useful additions:
- Lab test reports
- RTI application and responses
- Geo-tagged photos

---

## Step 2 — Generate the Road System ID

Format: `STATE-CITY-LAT-LNG`

- STATE: Two letter state code. Uttarakhand = UK, Uttar Pradesh = UP, Delhi = DL
- CITY: Three letter city code. Roorkee = RKE, Delhi = DEL, Lucknow = LKO
- LAT: Latitude of road start point rounded to 4 decimal places
- LNG: Longitude of road start point rounded to 4 decimal places

Example: `UK-RKE-29.8723-77.8813`

Get coordinates from Google Maps — long press on the road start point.

---

## Step 3 — Add Persons First

Add every official and contractor before adding events. You need their database UUIDs to link them to events.

For each person collect:
- Full name — exactly as on official documents
- Official designation — in Hindi/English as on document
- Plain language designation — what a non-expert would understand
- Department
- Jurisdiction — ward, city, district
- Monthly salary — look up UKPSC/relevant state pay commission for their level
- Photo — try official government website, news articles, RTI

```typescript
const [personVariable] = await db.insert(persons).values({
  fullName: 'Full Name Here',
  designation: 'Official Title',
  designationPlain: 'Plain language explanation of their role',
  department: 'Department Name',
  personCategory: 'official', // or 'contractor' or 'citizen'
  contactOrId: null, // GST number for contractors, service ID for officials if known
  jurisdiction: 'Ward X, City, State',
  monthlySalary: '55000', // numeric string
  salarySource: 'Source of salary information',
  photoUrl: null,
  photoSource: null,
}).returning();
```

---

## Step 4 — Add the Road

```typescript
const [road] = await db.insert(roads).values({
  roadSystemId: 'UK-RKE-XX.XXXX-XX.XXXX',
  roadDisplayName: 'Ward X, From [Landmark A] to [Landmark B], City',
  geometry: {
    type: 'LineString',
    coordinates: [[LNG, LAT]], // Note: GeoJSON is [longitude, latitude]
    note: 'Partial if coordinates are incomplete',
  },
  healthStatus: 'critical', // Set based on current physical observation
  healthStatusUpdatedAt: new Date('YYYY-MM-DD'),
  healthStatusUpdatedBy: 'your-identifier',
}).returning();
```

---

## Step 5 — Add Segments

Define segments by physical features — junctions, bends, where road character changes. Every road needs minimum one segment.

```typescript
const [segment] = await db.insert(segments).values({
  roadId: road.id,
  segmentDisplayName: 'Main Stem', // or 'Left Branch', 'Right Branch' etc.
  segmentCoordinates: { lat: XX.XXXX, lng: XX.XXXX },
  geometry: {
    type: 'LineString',
    coordinates: [[LNG, LAT]],
  },
  length: '0', // metres — '0' if not measured yet
  width: '0',  // metres
  area: '180.6', // square metres — from your physical measurement
  surfaceThickness: '80', // millimetres — from contract specification
}).returning();
```

---

## Step 6 — Add Events Chronologically

Add events in chronological order. Each event must have:
- A real timestamp from a real document
- A description that reads like a factual record
- Evidence JSONB with structured data the UI will use

### Minimum events for any road:
1. work_order_issued — when contract was awarded
2. completion_claimed — when officials certified completion
3. payment_released — when money was paid
4. dlp_started — when defect liability period began

### Evidence JSONB must include these fields for financial events:

**payment_released**:
```json
{
  "finalBill": "386086",
  "netDisbursed": "354581",
  "currency": "INR",
  "sanctionedBudget": "606000",
  "contractAmount": "387234",
  "ghostItems": [],
  "ghostTotal": "0"
}
```

**completion_claimed**:
```json
{
  "areaClaimed": "363.30",
  "areaActual": "180.6",
  "areaUnit": "SQM",
  "discrepancyPercent": "101",
  "drainActuallyExists": false,
  "completionDate": "2025-04-03"
}
```

**dlp_started**:
```json
{
  "dlpStartDate": "2025-04-03",
  "dlpEndDate": "2026-04-03",
  "dlpDurationMonths": "12",
  "securityDeposit": "200000",
  "securityDepositCurrency": "INR"
}
```

---

## Step 7 — Link Participants to Events

For each event where a specific person was involved — add an event_participant record.

```typescript
await db.insert(eventParticipants).values({
  eventId: completionEvent.id,
  personId: gurukeshSingh.id, // UUID from persons table — use .returning() result, never query by name
  personType: 'official',
  role: 'certifier',          // reporter/certifier/authoriser/assignee/witness
  dataConfidence: 'verified', // verified/probable/unconfirmed — see DATA_MODEL.md
});
```

**Always set `dataConfidence` explicitly.** Never rely on the default (`unconfirmed`). If the RTI document directly names the person for this event → `verified`. If role is clear but name is inferred → `probable`. If name is assumed from general project involvement → `unconfirmed`.

---

## Step 8 — Add Photos

At minimum add one hero photo — the most powerful image showing current road condition.

```typescript
await db.insert(photos).values({
  roadId: road.id,
  segmentId: segment.id,
  eventId: null,
  url: 'https://your-photo-url.com/photo.jpg',
  thumbnailUrl: null,
  source: 'citizen',
  capturedAt: new Date('YYYY-MM-DD'),
  locationLat: 'XX.XXXX',
  locationLng: 'XX.XXXX',
  uploadedBy: 'your-identifier',
  isVerified: true,
  verifiedAt: new Date('YYYY-MM-DD'),
  isHero: true, // Only one photo per road should be true
});
```

---

## Step 9 — Run the Seed

```bash
npx tsx src/server/db/seed.ts
```
