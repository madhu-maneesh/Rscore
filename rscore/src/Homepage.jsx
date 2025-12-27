import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { title: "ATS Score", desc: "Resume compatibility score" },
    { title: "JD Matching", desc: "Keyword alignment check" },
    { title: "Skill Gaps", desc: "Missing skills detection" },
    { title: "AI Tips", desc: "Actionable improvements" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-16 md:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            AI Resume <br />
            <span className="text-indigo-400">ATS Analyzer</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-slate-300 mb-8 max-w-xl">
            Analyze your resume against job descriptions and beat modern
            Applicant Tracking Systems.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl text-base md:text-lg font-semibold transition shadow-lg"
          >
            Try Demo
          </button>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-indigo-500 transition"
            >
              <p className="text-lg font-semibold mb-1">
                {item.title}
              </p>
              <p className="text-sm text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
