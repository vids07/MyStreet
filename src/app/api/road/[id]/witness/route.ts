import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { confirmations } from '@/server/db/schema/confirmation';
import { roads } from '@/server/db/schema/road';
import { eq, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

const MAX_FINGERPRINT_LENGTH = 256;

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const systemId = id?.trim();

    if (!systemId || systemId.length > 128) {
      return NextResponse.json(
        { success: false, error: 'INVALID_ROAD_ID' },
        { status: 400 },
      );
    }

    const body: unknown = await req.json();
    if (
      typeof body !== 'object' ||
      body === null ||
      typeof (body as Record<string, unknown>).deviceFingerprint !== 'string'
    ) {
      return NextResponse.json(
        { success: false, error: 'MISSING_FINGERPRINT' },
        { status: 400 },
      );
    }

    const deviceFingerprint = (
      (body as Record<string, unknown>).deviceFingerprint as string
    ).slice(0, MAX_FINGERPRINT_LENGTH);

    // Resolve system ID → UUID
    const [road] = await db
      .select({ id: roads.id })
      .from(roads)
      .where(eq(roads.roadSystemId, systemId))
      .limit(1);

    if (!road) {
      return NextResponse.json(
        { success: false, error: 'ROAD_NOT_FOUND' },
        { status: 404 },
      );
    }

    // One confirmation per device per road
    const [existing] = await db
      .select({ id: confirmations.id })
      .from(confirmations)
      .where(
        and(
          eq(confirmations.roadId, road.id),
          eq(confirmations.deviceFingerprint, deviceFingerprint),
          eq(confirmations.isFlagged, false),
        ),
      )
      .limit(1);

    if (existing) {
      return NextResponse.json({ success: true, alreadyConfirmed: true }, { status: 200 });
    }

    await db.insert(confirmations).values({
      roadId: road.id,
      deviceFingerprint,
    });

    return NextResponse.json({ success: true, alreadyConfirmed: false }, { status: 201 });
  } catch (error) {
    console.error('POST /api/road/[id]/witness failed:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
