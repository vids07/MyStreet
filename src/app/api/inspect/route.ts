import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rulesText, imageBase64, mimeType, customApiKey } = body;

    if (!rulesText) {
      return NextResponse.json(
        { success: false, error: 'Audit Framework Missing: Rule context cannot be blank.' },
        { status: 400 }
      );
    }

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Audit Asset Missing: Photograph base64 data is required.' },
        { status: 400 }
      );
    }

    if (!mimeType) {
      return NextResponse.json(
        { success: false, error: 'Audit Asset Missing: Photograph mime type is required.' },
        { status: 400 }
      );
    }

    // Determine API Key securely (prioritizing server-side environment key)
    const apiKey = process.env.GEMINI_API_KEY || customApiKey?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Authentication Missing: Gemini API Key must be configured in environment or provided manually.' },
        { status: 401 }
      );
    }

    const systemPrompt = `You are a strict municipal road construction quality inspector. Analyze this photo against the rules provided by the inspector. Return ONLY valid JSON, no markdown formatting blocks, no text explanations outside of the JSON. If there are no violations, return PASS, otherwise return FAIL with the exact array of violations. Return exactly this schema structure:
{
  "verdict": "PASS" or "FAIL",
  "violations": [
    {
      "rule": "Title of the rule or clause broken",
      "description": "Short explanation of what specifically was observed in the image",
      "severity": "CRITICAL" or "WARNING"
    }
  ],
  "summary": "A concise one-line summary verdict explanation"
}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nInspector Specifications / Rules:\n${rulesText}`
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errData.error?.message || 'Failed communicating with Gemini server.' },
        { status: response.status }
      );
    }

    const resultData = await response.json();
    let responseText = resultData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json(
        { success: false, error: 'Received an empty or malformed model response.' },
        { status: 502 }
      );
    }

    // Clean any possible Markdown code block wrapping if Gemini ignores generationConfig
    responseText = responseText.trim();
    if (responseText.startsWith('```json')) {
      responseText = responseText.substring(7);
    }
    if (responseText.endsWith('```')) {
      responseText = responseText.substring(0, responseText.length - 3);
    }

    try {
      const parsedReport = JSON.parse(responseText.trim());
      return NextResponse.json({ success: true, report: parsedReport }, { status: 200 });
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON. Raw response:', responseText);
      return NextResponse.json(
        { success: false, error: 'Model output could not be parsed as structured compliance JSON.', raw: responseText },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error('POST /api/inspect failed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unexpected server error while processing inspection.' },
      { status: 500 }
    );
  }
}
