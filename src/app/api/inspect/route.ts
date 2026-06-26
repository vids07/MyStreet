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
      // DEMO MODE / OFFLINE FALLBACK
      // If no API key is specified, we automatically return a realistic simulated compliance report
      // based on the selected scenario, or a successful PASS for custom uploaded files.
      // This ensures the demo runs 100% reliably without requiring credentials or internet!
      
      const lowerRules = rulesText.toLowerCase();
      let demoReport = {
        verdict: "PASS" as "PASS" | "FAIL",
        violations: [] as any[],
        summary: "Nagar Nigam Dehradun compliance check: Excellent interlocking paver tile alignment, sturdy side borders, and dry sand bedding cushion verified. Payout approved!"
      };

      if (lowerRules.includes("perfect road") || lowerRules.includes("compliant")) {
        demoReport = {
          verdict: "PASS",
          violations: [],
          summary: "Perfect Road! The contractor used a proper sand cushion and solid side borders. Payout Approved!"
        };
      } else if (lowerRules.includes("tall hump") || lowerRules.includes("speed-breaker") || lowerRules.includes("speed hump height")) {
        demoReport = {
          verdict: "FAIL",
          violations: [
            {
              rule: "Speed Hump Height Limit (IRC:99)",
              description: "Hump is 185mm tall (legal maximum is 100mm).",
              severity: "CRITICAL",
              requirement: "Must be short and smoothly rounded."
            },
            {
              rule: "Missing Warning Stripes (IRC:99)",
              description: "No yellow-black hazard stripes painted on the hump.",
              severity: "WARNING",
              requirement: "Must have high-visibility painted lines."
            }
          ],
          summary: "Failed: Hump is dangerously steep and high (185mm vs 100mm limit). It will damage car bumpers! Payout Frozen."
        };
      } else if (lowerRules.includes("bare mud") || lowerRules.includes("paver-base") || lowerRules.includes("sand bedding")) {
        demoReport = {
          verdict: "FAIL",
          violations: [
            {
              rule: "Missing Sand Bedding Cushion (IRC:SP:63)",
              description: "Blocks laid directly on raw muddy soil.",
              severity: "CRITICAL",
              requirement: "Must have a 20-40mm clean sand bedding cushion underneath tiles."
            }
          ],
          summary: "Failed: Contractor skipped the clean sand bedding layer to save money. Tiles are shifting, sinking, and unstable! Payout Frozen."
        };
      } else if (lowerRules.includes("open pit") || lowerRules.includes("no-barricading") || lowerRules.includes("construction fencing")) {
        demoReport = {
          verdict: "FAIL",
          violations: [
            {
              rule: "Missing Construction Fencing (IRC:SP:55)",
              description: "6-foot deep pit left completely open with no safety barriers.",
              severity: "CRITICAL",
              requirement: "Must be enclosed with rigid black-and-yellow safety fencing."
            }
          ],
          summary: "Failed: A 6-foot deep construction hole left completely open on a busy street with no safety barriers! Very dangerous. Payout Frozen."
        };
      }

      // Add a realistic 1.5-second processing delay to let the tricolor laser scan animation play out beautifully
      await new Promise(resolve => setTimeout(resolve, 1500));

      return NextResponse.json({ success: true, report: demoReport, isDemo: true }, { status: 200 });
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
      generation_config: {
        response_mime_type: "application/json"
      }
    };

    const candidates = [
      { name: 'gemini-2.5-flash (v1beta)', url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}` },
      { name: 'gemini-2.5-flash (v1)', url: `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}` },
      { name: 'gemini-1.5-flash (v1beta)', url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}` },
      { name: 'gemini-1.5-flash (v1)', url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}` }
    ];

    let successData: any = null;
    let lastError: string = '';
    let errorStatus: number = 502;

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const resData = await res.json().catch(() => ({}));

        if (res.ok) {
          successData = resData;
          break;
        } else {
          lastError = resData.error?.message || `HTTP ${res.status} error`;
          errorStatus = res.status;
          console.warn(`Candidate ${candidate.name} failed:`, lastError);
          // Only break on actual key authorization or quota limits, NOT on payload errors (status 400)
          if (res.status === 403 || res.status === 429) {
            break;
          }
        }
      } catch (err: any) {
        lastError = err.message || String(err);
        console.warn(`Failed fetching candidate ${candidate.name}:`, lastError);
      }
    }

    if (!successData) {
      return NextResponse.json(
        { success: false, error: lastError || 'Failed communicating with all Gemini model candidates.' },
        { status: errorStatus }
      );
    }

    let responseText = successData.candidates?.[0]?.content?.parts?.[0]?.text;

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
