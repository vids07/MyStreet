require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const payload = {
  contents: [
    {
      parts: [{ text: "Respond with 'HELLO WORLD'" }],
    },
  ],
  generation_config: {
    response_mime_type: "text/plain",
  },
};

const candidates = [
  {
    name: "gemini-2.5-flash (v1beta)",
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  },
  {
    name: "gemini-2.5-flash (v1)",
    url: `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  },
  {
    name: "gemini-1.5-flash (v1beta)",
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  },
  {
    name: "gemini-1.5-flash (v1)",
    url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  },
];

async function test() {
  let successData = null;
  let lastError = null;

  for (const candidate of candidates) {
    try {
      console.log(`Trying candidate ${candidate.name}...`);
      const res = await fetch(candidate.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        // Only break on actual key-level authorization or quota issues, NOT on 400 Bad Request
        if (res.status === 403 || res.status === 429) {
          break;
        }
      }
    } catch (err) {
      lastError = err.message || err;
      console.warn(`Failed fetching candidate ${candidate.name}:`, lastError);
    }
  }

  if (successData) {
    console.log(
      "FINAL RESULT: SUCCESS!",
      JSON.stringify(successData.candidates?.[0]?.content?.parts?.[0]?.text)
    );
  } else {
    console.error("FINAL RESULT: FAILED with error:", lastError);
  }
}

test();
