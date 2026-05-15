import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from './index';
import { photos } from './schema/photo';
import { events } from './schema/event';
import { roads } from './schema/road';
import { v2 as cloudinary } from 'cloudinary';
import { eq, like } from 'drizzle-orm';

const ROAD_SYSTEM_ID = 'UK-RKE-29.8723-77.8813';
const SURVEY_DATE    = new Date('2026-02-08');

type EventType  = 'pothole_found' | 'crack_found' | 'drain_blocked';
type Severity   = 'critical' | 'high' | 'medium' | 'low';
type PhotoStatus = 'critical' | 'warning' | 'good' | 'informational';

const SEVERITY_TO_PHOTO_STATUS: Record<Severity, PhotoStatus> = {
  critical: 'critical',
  high:     'critical',
  medium:   'warning',
  low:      'good',
};

const ISSUE_LABEL: Record<EventType, string> = {
  pothole_found: 'Pothole',
  crack_found:   'Surface crack',
  drain_blocked: 'Drain blockage',
};

function makeDescription(eventType: EventType, segmentRef: string): string {
  return `${ISSUE_LABEL[eventType]} documented at ${segmentRef}, Ward 28, Roorkee. Field survey 8 February 2026.`;
}

function makeEvidence(segmentRef: string) {
  return { segmentRef, currentStatus: 'not_fixed', surveyDate: '2026-02-08' };
}

// ─────────────────────────────────────────────────────────────────────────────
// PART 1 — Already in Cloudinary + photos table.
// Create condition event → link photo. Idempotent: skips if already linked.
// ─────────────────────────────────────────────────────────────────────────────

const PART1: { segmentRef: string; eventType: EventType; severity: Severity }[] = [
  { segmentRef: 'RK_ST_04', eventType: 'pothole_found', severity: 'medium'   },
  { segmentRef: 'RK_ST_21', eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_59', eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_62', eventType: 'drain_blocked', severity: 'critical' },
  { segmentRef: 'RK_ST_65', eventType: 'crack_found',   severity: 'critical' },
];

async function runPart1(roadId: string) {
  console.log('── PART 1: link existing photos to condition events ──\n');

  let eventsCreated = 0;
  let photosLinked  = 0;
  const failures: string[] = [];

  for (let i = 0; i < PART1.length; i++) {
    const item = PART1[i];
    console.log(`[${i + 1}/${PART1.length}] ${item.segmentRef} — ${item.eventType} (${item.severity})`);

    const photoRows = await db
      .select({ id: photos.id, eventId: photos.eventId })
      .from(photos)
      .where(like(photos.url, `%${item.segmentRef}%`));

    if (photoRows.length === 0) {
      const msg = `${item.segmentRef}: photo not found in DB — skipped (handle in Part 2)`;
      console.warn(`  SKIPPED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    const photo = photoRows[0];

    if (photo.eventId) {
      console.log(`  Already linked to event ${photo.eventId} — skipping.`);
      console.log('');
      continue;
    }

    let eventId: string;
    try {
      const [inserted] = await db.insert(events).values({
        roadId,
        segmentId:      null,
        eventType:      item.eventType,
        timestamp:      SURVEY_DATE,
        description:    makeDescription(item.eventType, item.segmentRef),
        severity:       item.severity,
        evidence:       makeEvidence(item.segmentRef),
        evidenceSource: 'citizen',
        isFlagged:      false,
      }).returning({ id: events.id });
      eventId = inserted.id;
      eventsCreated++;
      console.log(`  Event created: ${eventId}`);
    } catch (err) {
      const msg = `${item.segmentRef}: event insert error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    try {
      await db.update(photos).set({ eventId }).where(eq(photos.id, photo.id));
      photosLinked++;
      console.log(`  Photo linked:  ${photo.id}`);
    } catch (err) {
      const msg = `${item.segmentRef}: photo link error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
    }

    console.log('');
  }

  return { eventsCreated, photosLinked, failures };
}

// ─────────────────────────────────────────────────────────────────────────────
// PART 2 — New photos. Download → upload → insert event → insert photo.
// ─────────────────────────────────────────────────────────────────────────────

const PART2: { segmentRef: string; driveId: string; eventType: EventType; severity: Severity }[] = [
  // Potholes card
  { segmentRef: 'RK_ST_03', driveId: '1hTnrY98ZJJ2tUDIPh3Q9DBPcnBxtI_vJ',  eventType: 'pothole_found', severity: 'medium'   },
  { segmentRef: 'RK_ST_10', driveId: '17dCpR4S09vvj8i7k7OQ5el0IO2rdXQDI',   eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_14', driveId: '13uyEIH1w_3kQ_Klg-i86qrpk_jMzyYfA',  eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_20', driveId: '10g272Xzh2PoGXdON4RGtFxOdjiWPRT7L',   eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_40', driveId: '1MhJe8ybJPnYP-lmx46f8LPQrsngxNLva',  eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_51', driveId: '1LWROkJWcCZ1XczTNUcpvThE2YBnzBcBd',   eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_52', driveId: '1olLOGUBidINh-k-RsWTFeGqL3CUC6XIU',  eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_57', driveId: '1XDy4cs1FuMpA0I5sA5HacHtSiN8ARFUM',   eventType: 'pothole_found', severity: 'high'     },
  { segmentRef: 'RK_ST_61', driveId: '12GXLkEJ_3HrpyyJVIwtOHcoPdsxc8ui8',   eventType: 'pothole_found', severity: 'critical' },
  // Cracks card
  { segmentRef: 'RK_ST_08', driveId: '1mA7vwY__wldVDCoC8RQFodVF3-VlHiTg',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_19', driveId: '1tr4gPgktKO1-Glu-rbk7dfKMGm6w8r9Q',  eventType: 'crack_found',   severity: 'medium'   },
  { segmentRef: 'RK_ST_23', driveId: '17OIofA8cjI6PamnAeYlOgmQnatv-1yFM',  eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_25', driveId: '125gQpiN4dFypUFNakMjHy4HfWhM7xrF3',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_27', driveId: '1xtdtetwXW-Ebxl-I-S3F7w73jGz7Cj4n', eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_33', driveId: '1D4YwOwOh5plWLTneGHamdwGiQxuLz5Ox',   eventType: 'crack_found',   severity: 'medium'   },
  { segmentRef: 'RK_ST_41', driveId: '1hYa5AxgnWCuVDKkPQfPy8JjImVPF6lZe',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_43', driveId: '1PG0H7YHN2kgubvtaoeo51AtEBVusN8gq',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_45', driveId: '1YN4U17x3TEup6pc54DPVrYjICDm7sDvg',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_60', driveId: '1ofbPR74Hf5lpJs7Are6CQFHhVwE35Sh6',   eventType: 'crack_found',   severity: 'high'     },
  { segmentRef: 'RK_ST_64', driveId: '1dvdwNyopx-5xyAm-5FgO4BK6Ka6u4GiA', eventType: 'crack_found',   severity: 'critical' },
  { segmentRef: 'RK_ST_65', driveId: '1B5XLChs81uFbfWRzkYsJrrNnU9iuJu0p',   eventType: 'crack_found',   severity: 'critical' },
  { segmentRef: 'RK_ST_66', driveId: '1PrSFsodXf-oaW-11vpwgxLCeG2QPepFb',  eventType: 'crack_found',   severity: 'critical' },
  // Drains card
  { segmentRef: 'RK_ST_24', driveId: '1bngbH5m0knXGIBwksV4IG0mnLCsrBB9_',   eventType: 'drain_blocked', severity: 'high'     },
  { segmentRef: 'RK_ST_26', driveId: '1N0p4eQb3_VH6Wrpxw5ki5Fz3LGHrbhpe',   eventType: 'drain_blocked', severity: 'low'      },
];

async function fetchDriveImage(driveId: string): Promise<Buffer> {
  const url = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&authuser=0&confirm=t`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.startsWith('text/html')) throw new Error('Got HTML — file may be private or require login');
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1000) throw new Error(`Suspiciously small response (${buffer.length} bytes)`);
  return buffer;
}

async function runPart2(roadId: string) {
  console.log('── PART 2: upload new photos and create condition events ──\n');

  let uploaded   = 0;
  let inserted   = 0;
  let skipped    = 0;
  const failures: string[] = [];

  for (let i = 0; i < PART2.length; i++) {
    const item = PART2[i];
    const photoStatus = SEVERITY_TO_PHOTO_STATUS[item.severity];
    console.log(`[${i + 1}/${PART2.length}] ${item.segmentRef} — ${item.eventType} (${item.severity} → photo status: ${photoStatus})`);

    // Idempotency: skip if already in DB
    const existing = await db
      .select({ id: photos.id })
      .from(photos)
      .where(like(photos.url, `%${item.segmentRef}%`));
    if (existing.length > 0) {
      console.log(`  Already in DB — skipping.`);
      skipped++;
      console.log('');
      continue;
    }

    // 1. Download from Google Drive
    let buffer: Buffer;
    try {
      buffer = await fetchDriveImage(item.driveId);
      console.log(`  Fetched: ${buffer.length} bytes`);
    } catch (err) {
      const msg = `${item.segmentRef}: fetch error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    // 2. Upload to Cloudinary
    let imageUrl: string;
    try {
      const dataUri = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder:     'mystreet/ward28/section3',
        public_id:  item.segmentRef,
        overwrite:  true,
      });
      imageUrl = result.secure_url;
      uploaded++;
      console.log(`  Cloudinary: ${imageUrl}`);
    } catch (err) {
      const msg = `${item.segmentRef}: cloudinary upload error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    // 3. Insert condition event
    let eventId: string;
    try {
      const [newEvent] = await db.insert(events).values({
        roadId,
        segmentId:      null,
        eventType:      item.eventType,
        timestamp:      SURVEY_DATE,
        description:    makeDescription(item.eventType, item.segmentRef),
        severity:       item.severity,
        evidence:       makeEvidence(item.segmentRef),
        evidenceSource: 'citizen',
        isFlagged:      false,
      }).returning({ id: events.id });
      eventId = newEvent.id;
      console.log(`  Event created: ${eventId}`);
    } catch (err) {
      const msg = `${item.segmentRef}: event insert error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    // 4. Insert photo row linked to event
    try {
      await db.insert(photos).values({
        roadId,
        eventId,
        url:           imageUrl,
        source:        'citizen',
        capturedAt:    SURVEY_DATE,
        uploadedBy:    'founder',
        isVerified:    true,
        isHero:        false,
        status:        photoStatus,
        locationLabel: 'Ward 28, Roorkee — field survey 8 Feb 2026',
      });
      inserted++;
      console.log(`  Photo inserted and linked.`);
    } catch (err) {
      const msg = `${item.segmentRef}: photo insert error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
    }

    console.log('');
  }

  return { uploaded, inserted, skipped, failures };
}

async function main() {
  const missing = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'DATABASE_URL']
    .filter(k => !process.env[k]);
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(', ')} — aborting.`);
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const roadRows = await db
    .select({ id: roads.id })
    .from(roads)
    .where(eq(roads.roadSystemId, ROAD_SYSTEM_ID))
    .limit(1);

  if (!roadRows[0]) {
    console.error(`Road not found for roadSystemId: ${ROAD_SYSTEM_ID} — run seed.ts first.`);
    process.exit(1);
  }
  const roadId = roadRows[0].id;
  console.log(`Road UUID: ${roadId}\n`);

  const p1 = await runPart1(roadId);
  console.log('');
  const p2 = await runPart2(roadId);

  const allFailures = [...p1.failures, ...p2.failures];

  console.log('═══════════════════════════════════════');
  console.log('SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`Part 1 — existing photos linked:  ${p1.photosLinked}`);
  console.log(`Part 1 — events created:          ${p1.eventsCreated}`);
  console.log(`Part 2 — already done (skipped):  ${p2.skipped}`);
  console.log(`Part 2 — new photos uploaded:     ${p2.uploaded}`);
  console.log(`Part 2 — new photos inserted:     ${p2.inserted}`);
  console.log(`Part 2 — events created:          ${p2.inserted}`);
  if (allFailures.length > 0) {
    console.log(`Failures (${allFailures.length}):`);
    allFailures.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log('Failures:                         0');
  }
}

main().catch(console.error);
