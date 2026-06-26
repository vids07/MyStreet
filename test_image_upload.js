const fs = require('fs');
const path = require('path');

// Read key manually from .env because dotenv may not be in global devDependencies
function getApiKeyFromEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return null;
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

const apiKey = getApiKeyFromEnv();
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is not defined in .env!");
  process.exit(1);
}

const imagePath = path.join(__dirname, 's5-bot.png'); // Using a real project image to test
if (!fs.existsSync(imagePath)) {
  console.error(`ERROR: Test image not found at ${imagePath}`);
  process.exit(1);
}

const imageBase64 = fs.readFileSync(imagePath).toString('base64');
const mimeType = 'image/png';

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

const rulesText = "IRC:SP:63 (Bedding layer must be clean dry sand, even tile alignment, side borders present).";

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

async function runTest() {
  console.log("Starting Image Upload Verification Test...");
  console.log(`Using Image: ${imagePath} (${(fs.statSync(imagePath).size / 1024).toFixed(1)} KB)`);
  console.log(`API Key loaded: ${apiKey.substring(0, 8)}...`);

  let successData = null;
  let lastError = "";

  for (const candidate of candidates) {
    try {
      console.log(`Trying candidate: ${candidate.name}...`);
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
        console.log(`Candidate ${candidate.name} SUCCEEDED!`);
        break;
      } else {
        lastError = resData.error?.message || `HTTP ${res.status} error`;
        console.warn(`Candidate ${candidate.name} failed:`, lastError);
        if (res.status === 403 || res.status === 429) {
          break;
        }
      }
    } catch (err) {
      lastError = err.message || String(err);
      console.warn(`Failed fetching candidate ${candidate.name}:`, lastError);
    }
  }

  if (successData) {
    console.log("\n====================================");
    console.log("TEST STATUS: SUCCESS!");
    console.log("====================================");
    const text = successData.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("RAW GEMINI RESPONSE:");
    console.log(text);
    console.log("====================================");
    try {
      const parsed = JSON.parse(text);
      console.log("Parsed JSON successfully!", parsed);
    } catch (e) {
      console.log("Parsed JSON failed, trying to clean Markdown formatting blocks...");
      let cleaned = text.trim();
      if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
      if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
      try {
        const parsedCleaned = JSON.parse(cleaned.trim());
        console.log("Parsed cleaned JSON successfully!", parsedCleaned);
      } catch (e2) {
        console.error("JSON parsing still failed:", e2.message);
      }
    }
  } else {
    console.error("\n====================================");
    console.error("TEST STATUS: FAILED!");
    console.error("Error Details:", lastError);
    console.error("====================================");
  }
}

runTest();
