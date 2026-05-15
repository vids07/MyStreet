import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from './index';
import { photos } from './schema/photo';
import { roads } from './schema/road';
import { v2 as cloudinary } from 'cloudinary';
import { eq } from 'drizzle-orm';

const ROAD_SYSTEM_ID = 'UK-RKE-29.8723-77.8813';

// RK_ST_28: founder to supply correct Google Drive link before running.
const SECTION1_PHOTOS = [
  { segmentRef: 'RK_ST_02', driveId: '1I3KGq8KVEFwz8epS048jnFQno7OUjZnj', status: 'warning'  as const, isHero: false },
  { segmentRef: 'RK_ST_04', driveId: '1j_pFGFDj9acGWQmewrCO_IfMahwykXmI', status: 'warning'  as const, isHero: false },
  { segmentRef: 'RK_ST_21', driveId: '1OWwvPx7A5wz76wpF6UZWrUkM0i8kvv7_', status: 'critical' as const, isHero: false },
  { segmentRef: 'RK_ST_28', driveId: '1W-iOV30yhKmwnC8aqaBy4qonH7sAG-M7', status: 'critical' as const, isHero: false },
  { segmentRef: 'RK_ST_34', driveId: '17wZD1Yi4CAI9eAfSdmISz_ge7EyNz1hy', status: 'warning'  as const, isHero: false },
  { segmentRef: 'RK_ST_59', driveId: '1O7MQ2lGhVn1-RWsXRcnYN8C6du6P2uf2', status: 'critical' as const, isHero: false },
  { segmentRef: 'RK_ST_62', driveId: '1GxYTSgTDofJxkxCf8r_7jrOAOixIRmp-', status: 'critical' as const, isHero: false },
  { segmentRef: 'RK_ST_67', driveId: '10EJJYdWl_pKh3iVQQsPdFgwtoiw_GfDr', status: 'critical' as const, isHero: true  },
];

async function fetchDriveImage(driveId: string): Promise<Buffer> {
  const url = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&authuser=0&confirm=t`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.startsWith('text/html')) {
    throw new Error(`Got HTML instead of image — file may be private or require login`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1000) {
    throw new Error(`Suspiciously small response (${buffer.length} bytes) — likely not a real image`);
  }

  return buffer;
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

  let attempted = 0;
  let cloudinaryUploaded = 0;
  let dbInserted = 0;
  const failures: string[] = [];

  for (const photo of SECTION1_PHOTOS) {
    attempted++;
    console.log(`[${attempted}/8] ${photo.segmentRef} (status: ${photo.status}, isHero: ${photo.isHero})`);

    if (photo.driveId === 'REPLACE_WITH_CORRECT_DRIVE_ID') {
      const msg = `${photo.segmentRef}: skipped — founder must supply correct Google Drive link`;
      console.warn(`  SKIPPED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    let buffer: Buffer;
    try {
      buffer = await fetchDriveImage(photo.driveId);
      console.log(`  Fetched: ${buffer.length} bytes`);
    } catch (err) {
      const msg = `${photo.segmentRef}: fetch error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    let imageUrl: string;
    try {
      const dataUri = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'mystreet/ward28/section1',
        public_id: photo.segmentRef,
        overwrite: true,
      });
      imageUrl = result.secure_url;
      cloudinaryUploaded++;
      console.log(`  Cloudinary URL: ${imageUrl}`);
    } catch (err) {
      const msg = `${photo.segmentRef}: cloudinary upload error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
      console.log('');
      continue;
    }

    try {
      await db.insert(photos).values({
        roadId,
        url: imageUrl,
        source: 'citizen',
        capturedAt: new Date('2026-02-08'),
        uploadedBy: 'founder',
        isVerified: true,
        isHero: photo.isHero,
        status: photo.status,
        locationLabel: 'Ward 28, Roorkee — field survey 8 Feb 2026',
        eventId: null,
      });
      dbInserted++;
      console.log(`  Inserted into DB.`);
    } catch (err) {
      const msg = `${photo.segmentRef}: db insert error — ${err}`;
      console.error(`  FAILED — ${msg}`);
      failures.push(msg);
    }

    console.log('');
  }

  console.log('=== SUMMARY ===');
  console.log(`Attempted:              ${attempted}`);
  console.log(`Uploaded to Cloudinary: ${cloudinaryUploaded}`);
  console.log(`Inserted to DB:         ${dbInserted}`);
  if (failures.length > 0) {
    console.log(`Failures (${failures.length}):`);
    failures.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log('Failures:               0');
  }
}

main().catch(console.error);
