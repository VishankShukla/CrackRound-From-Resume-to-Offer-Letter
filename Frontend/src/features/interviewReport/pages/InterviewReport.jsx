import React, { useState } from "react";
import { useInterviewReport } from "../hooks/useInterviewReport";
import Navbar from "../../../components/Navbar";

const NAV_ITEMS = [
  { id: "technical", label: "Technical questions" },
  { id: "behavioral", label: "Behavioral questions" },
  { id: "roadmap", label: "Prep roadmap" },
];

const SEVERITY_STYLES = {
  low: "bg-emerald-950 text-emerald-300 border-emerald-900",
  medium: "bg-amber-950 text-amber-300 border-amber-900",
  high: "bg-red-950 text-red-300 border-red-900",
};

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-zinc-900/60 transition"
      >
        <h3 className="font-medium text-zinc-100">
          <span className="text-indigo-400">Q{index + 1}:</span> {item.question}
        </h3>
        <span className="text-zinc-500 text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 bg-zinc-950/40 border-t border-zinc-800">
          <div>
            <h4 className="text-sm font-semibold text-indigo-400 mb-1 mt-4">
              Why it's asked
            </h4>
            <p className="text-zinc-300 leading-relaxed text-sm">{item.intention}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-1">
              How to answer
            </h4>
            <p className="text-zinc-300 leading-relaxed text-sm">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
    <h3 className="font-semibold text-zinc-100 mb-3">
      <span className="text-indigo-400">Day {day.day}</span> — {day.focus}
    </h3>
    <ul className="space-y-2">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex gap-2 text-zinc-300 text-sm">
          <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const InterviewReport = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, loading, error } = useInterviewReport();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-zinc-400 text-sm">Loading your interview plan…</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24">
          <h2 className="text-lg font-semibold text-white mb-2">
            Couldn't load this report
          </h2>
          <p className="text-zinc-400 text-sm">
            {error || "This interview report could not be found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold text-white mb-6">
          {report.title || "Interview plan"}
        </h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <aside className="col-span-12 md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-fit">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
              Sections
            </h3>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                    activeNav === item.id
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-6 space-y-4">
            {activeNav === "technical" && (
              <>
                <h2 className="text-lg font-semibold text-white">
                  Technical questions{" "}
                  <span className="text-sm text-zinc-500 font-normal">
                    ({report.technicalQuestions.length})
                  </span>
                </h2>
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </>
            )}

            {activeNav === "behavioral" && (
              <>
                <h2 className="text-lg font-semibold text-white">
                  Behavioral questions{" "}
                  <span className="text-sm text-zinc-500 font-normal">
                    ({report.behavioralQuestions.length})
                  </span>
                </h2>
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </>
            )}

            {activeNav === "roadmap" && (
              <>
                <h2 className="text-lg font-semibold text-white">
                  Preparation roadmap
                </h2>
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-12 md:col-span-3 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
              <h3 className="text-sm font-medium text-zinc-400">Match score</h3>
              <div className="text-5xl font-semibold text-indigo-400 my-3">
                {report.matchScore}%
              </div>
              <p className="text-zinc-500 text-sm">
                How closely your profile fits this role
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Skill gaps</h3>
              {report.skillGaps.length === 0 ? (
                <p className="text-zinc-500 text-sm">No major gaps found.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {report.skillGaps.map((gap, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs border ${SEVERITY_STYLES[gap.severity] || SEVERITY_STYLES.medium}`}
                    >
                      {gap.skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InterviewReport;