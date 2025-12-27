export default function Result({ data, onRestart }) {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          Analysis Result
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          
          {/* ATS SCORE */}
          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-slate-400">ATS Score</p>
            <p className="text-5xl font-bold text-indigo-400">
              {Math.round(data.atsScore)}%
            </p>
          </div>

          {/* MATCHED SKILLS */}
          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="font-semibold mb-2">Matched Skills</p>
            <ul className="list-disc ml-5 text-slate-300">
              {data.matchedSkills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* MISSING SKILLS */}
          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="font-semibold mb-2">Missing Skills</p>
            <ul className="list-disc ml-5 text-slate-300">
              {data.missingSkills?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SUGGESTIONS */}
        <div className="bg-slate-900 p-6 rounded-2xl mb-10">
          <p className="font-semibold mb-2">Suggestions</p>
          <ul className="list-disc ml-5 text-slate-300">
            {data.suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={onRestart}
          className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-2xl"
        >
          Analyze Another Resume
        </button>

      </div>
    </div>
  );
}
