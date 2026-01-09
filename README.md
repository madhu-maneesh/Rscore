🚀 RScore – AI ATS Resume Analyzer

RScore is a full-stack AI-powered ATS (Applicant Tracking System) Resume Analyzer that evaluates resumes against job descriptions and provides an ATS score, matched skills, missing skills, and actionable improvement suggestions.

This project simulates how modern ATS systems screen resumes and helps candidates optimize their profiles for better shortlisting.

🔗 Live Demo

Frontend (Vercel):
👉 https://rscore.vercel.app

Backend (Render):
👉 https://rscore-backend.onrender.com

🧠 Key Features

📄 Upload resumes in PDF or DOCX format

🧾 Paste job descriptions for comparison

🤖 AI-powered ATS analysis using LLMs

📊 ATS score calculation (realistic scoring logic)

✅ Matched skills extraction

❌ Missing skills identification

💡 Resume improvement suggestions

🖱️ Drag & Drop resume upload

🌐 Fully deployed (Frontend + Backend)

🏗️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Deployed on Vercel

Backend

Node.js

Express.js

Multer (file upload)

unpdf (PDF text extraction)

Mammoth (DOCX parsing)

OpenRouter API (LLM for ATS analysis)

Deployed on Render

📁 Project Structure
Rscore/
├── rscore/                 # Frontend (Vite + React)
│   ├── src/
│   │   ├── Parser.jsx
│   │   ├── Result.jsx
│   │   └── ...
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── backend/                # Backend (Express)
    ├── index.js
    ├── .env
    ├── package.json
    └── ...

⚙️ Environment Variables
Backend (backend/.env)
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000

Frontend (rscore/.env)
VITE_API_URL=https://rscore-backend.onrender.com


⚠️ Frontend environment variables must start with VITE_
⚠️ .env files are ignored from GitHub for security

🧪 Local Development
1️⃣ Clone the Repository
git clone https://github.com/madhu-maneesh/Rscore.git
cd Rscore

2️⃣ Run Backend Locally
cd rscore/backend
npm install
node index.js


Backend runs on:

http://localhost:5000

3️⃣ Run Frontend Locally
cd rscore
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔄 How ATS Scoring Works

Resume text and Job Description are compared using an LLM

AI extracts:

Matched skills

Missing skills

Suggestions

ATS score is calculated using:

matchedSkills / (matchedSkills + missingSkills)


Score is normalized to a realistic range (35–95)

🚀 Deployment

Backend: Render (Node Web Service)

Frontend: Vercel (Vite preset)

Uses environment-based API URLs for local & production builds

🧠 What This Project Demonstrates

Real-world full-stack deployment

Frontend–backend separation

Handling production environment variables

File upload & parsing

AI integration with strict JSON handling

Debugging real production issues (ports, envs, CORS, builds)

📌 Future Improvements

ATS keyword weighting per role

Resume vs Resume comparison

PDF export of ATS report

Authentication & user profiles

Resume version history

Rate limiting & caching
