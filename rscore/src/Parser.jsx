import { useState } from "react";
import Result from "./Result";

export default function Demo() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !text) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload failed", err);
      alert("ATS analysis failed");
    } finally {
      setLoading(false);
    }
  };

  // RESULT PAGE
  if (result) {
    return (
      <Result
        data={result}
        onRestart={() => {
          setResult(null);
          setFile(null);
          setText("");
        }}
      />
    );
  }

  // UPLOAD PAGE
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-10 border border-slate-800">

        <h2 className="text-4xl font-extrabold mb-10">
          Resume & Job Description
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FILE UPLOAD */}
          <div>
            <label className="block mb-3 text-lg font-semibold">
              Upload Resume (PDF / DOCX)
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition
                ${dragActive ? "border-emerald-500 bg-slate-800" : "border-slate-700"}
              `}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-3 file:px-5
                  file:rounded-xl file:border-0
                  file:text-sm file:font-semibold
                  file:bg-slate-800 file:text-white
                  hover:file:bg-slate-700"
              />

              <p className="mt-4 text-sm text-slate-400">
                Drag & drop your resume here, or click to upload
              </p>

              {file && (
                <p className="text-sm text-emerald-400 mt-3">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div>
            <label className="block mb-3 text-lg font-semibold">
              Job Description
            </label>

            <textarea
              rows="8"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full p-4 bg-slate-800 rounded-2xl border border-slate-700 resize-none text-slate-200"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!file || !text || loading}
          className="mt-12 bg-emerald-600 hover:bg-emerald-700 px-12 py-4 rounded-2xl 
                     text-lg font-semibold disabled:opacity-40 flex items-center justify-center gap-3"
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}

          {loading ? "Analyzing..." : "Run ATS Analysis"}
        </button>

      </div>
    </div>
  );
}
