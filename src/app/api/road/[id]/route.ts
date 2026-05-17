import { NextResponse } from 'next/server';
import { getFullRoadData } from '@/server/queries/road';

export const dynamic = 'force-dynamic';

const MAX_ID_LENGTH = 128;

type RouteContext = {
  params: Promise<{ id: string }>;
};

function isValidRoadSystemId(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_ID_LENGTH;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const roadSystemId = id?.trim();

  if (!isValidRoadSystemId(roadSystemId)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INVALID_ROAD_ID',
          message: 'Road id must be a non-empty string up to 128 characters.',
        },
      },
      { status: 400 },
    );
  }

  try {
    const data = await getFullRoadData(roadSystemId);

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ROAD_NOT_FOUND',
            message: `No road found for id: ${roadSystemId}`,
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('GET /api/road/[id] failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unexpected error while loading road data.',
        },
      },
      { status: 500 },
    );
  }
}
