import "dotenv/config";
import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { extractText } from "unpdf";
import mammoth from "mammoth";

// CHECK
if (!process.env.OPENROUTER_API_KEY) {
  return res.status(500).json({ error: "AI service not configured" });
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

//promt for the model

function buildPrompt(resumeText, jdText) {
  const MAX_CHARS = 4500;
  if (resumeText.length > MAX_CHARS) {
    resumeText = resumeText.slice(0, MAX_CHARS);
  }

  return `
You are an ATS scoring engine.

Compare the RESUME and JOB DESCRIPTION.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}

Return ONLY valid JSON in the following format.
Do NOT add markdown, explanations, or extra text.

{
  "atsScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Rules:
- Be strict
- Do not invent skills
- JSON only
`;
}


//call the open router

async function callOpenRouter(prompt) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "RScore ATS",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  const data = await response.json();

  // console.log("OPENROUTER response");
  // console.log(JSON.stringify(data, null, 2));

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.choices[0].message.content;
}

//json extractor 


function extractJSON(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON found in AI response");
  }
  return text.slice(firstBrace, lastBrace + 1);
}

// /upload

app.get("/",(req,res)=>{
  res.status(200).send("Rscore backend is working");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const jd = req.body.text;

    if (!file || !jd) {
      return res.status(400).send("File or JD missing");
    }

    let resumeText = "";

// upload pdf

    if (file.originalname.toLowerCase().endsWith(".pdf")) {
      const buffer = fs.readFileSync(file.path);
      const uint8Array = new Uint8Array(buffer);
      const result = await extractText(uint8Array);
      resumeText = result.text.join("\n");

// upload docx

    } else if (file.originalname.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: file.path });
      resumeText = result.value;

    } else {
      return res.status(400).send("Unsupported file type");
    }

    const prompt = buildPrompt(resumeText, jd);
    const aiResponse = await callOpenRouter(prompt);

    let parsed;
    try {
      const jsonString = extractJSON(aiResponse);
      parsed = JSON.parse(jsonString);

// ats score 

          const matchedCount = parsed.matchedSkills?.length || 0;
          const missingCount = parsed.missingSkills?.length || 0;

          let calculatedScore = 0;

          if (matchedCount + missingCount > 0) {
            calculatedScore = Math.round(
              (matchedCount / (matchedCount + missingCount)) * 100
            );
          }

// convert score to realistic range

          calculatedScore = Math.max(35, Math.min(calculatedScore, 95));

        parsed.atsScore = calculatedScore;
    } catch (e) {
      // console.error("AI returned invalid JSON:", aiResponse);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    res.json(parsed);

  } catch (err) {
    console.error("BACKEND ERROR:", err.message);
    res.status(500).send(err.message);
  }
});

// backend server

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
