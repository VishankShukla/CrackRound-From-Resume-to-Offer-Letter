import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterviewReport } from "../hooks/useInterviewReport";
import Navbar from "../../../components/Navbar";


const Home = () => {
  const { loading, generateReport, reports, error: reportsError } = useInterviewReport();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  const resumeInputRef = useRef();

  const handleGenerateReport = async () => {
    setError("");

    const resumeFile = resumeInputRef.current.files[0];

    if (!jobDescription.trim()) {
      setError("Paste the job description first.");
      return;
    }
    if (!resumeFile && !selfDescription.trim()) {
      setError("Add a resume or a quick self-description — at least one is required.");
      return;
    }

    setGenerating(true);
    const result = await generateReport({ jobDescription, selfDescription, resumeFile });
    setGenerating(false);

    if (result.success) {
      navigate(`/interview/${result.interviewReport._id}`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Build your <span className="text-indigo-400">interview plan</span>
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            Paste a job description and your resume — get tailored questions,
            skill gaps, and a day-by-day prep plan.
          </p>
        </header>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 rounded-lg border border-red-900 bg-red-950/60 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 grid md:grid-cols-2 gap-8">
          {/* Job Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                Target job description
              </h2>
              <span className="px-2 py-0.5 text-xs rounded-full bg-red-950 text-red-300 border border-red-900">
                Required
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              maxLength={5000}
              className="w-full h-64 resize-none rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-zinc-500 text-right">
              {jobDescription.length}/5000
            </p>
          </div>

          {/* Profile */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Your profile</h2>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Upload resume
              </label>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf"
                className="w-full text-sm text-zinc-300 border border-zinc-700 rounded-xl p-3 bg-zinc-950 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-white file:text-sm hover:file:bg-indigo-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px bg-zinc-800 flex-1" />
              <span className="text-zinc-500 text-sm font-medium">OR</span>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Quick self-description
              </label>
              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Describe your experience, skills..."
                className="w-full h-28 resize-none rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="rounded-xl bg-indigo-950/50 border border-indigo-900 text-indigo-300 p-3 text-sm">
              Either a resume or a self-description is required.
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-medium text-lg hover:bg-indigo-500 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {generating ? "Generating your plan…" : "Generate my interview strategy"}
          </button>
        </div>

        {/* Reports */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white mb-5">
            Your recent interview plans
          </h2>

          {loading && !generating && (
            <p className="text-zinc-500 text-sm">Loading your reports…</p>
          )}

          {!loading && reportsError && (
            <p className="text-red-400 text-sm">{reportsError}</p>
          )}

          {!loading && !reportsError && reports?.length === 0 && (
            <p className="text-zinc-500 text-sm">
              You haven't generated any interview plans yet. Create your first one above.
            </p>
          )}

          {reports?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5">
              {reports.map((r) => (
                <button
                  key={r._id}
                  onClick={() => navigate(`/interview/${r._id}`)}
                  className="text-left bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/70 transition"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {r.title || "Untitled position"}
                  </h3>
                  <p className="text-zinc-500 mt-2 text-sm">
                    Generated on {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-3 font-medium text-indigo-400">
                    Match score: {r.matchScore}%
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
