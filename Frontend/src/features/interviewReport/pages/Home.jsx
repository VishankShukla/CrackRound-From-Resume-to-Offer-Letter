import React from "react";

const Home = () => {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
      {/* Home */}
      <div className="w-full max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        {/* For Interview report input */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left */}
          <div>
            <label
              htmlFor="jobDescription"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Job Description
            </label>

            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="Enter Job Description here..."
              className="h-72 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            ></textarea>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            {/* Upload Resume */}
            <div>
              <p className="text-sm font-medium text-zinc-300">
                Resume
              </p>

              <small className="mb-3 block text-red-700">
                Use Resume and self description together for best result
              </small>

              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 text-sm text-zinc-300
                file:mr-4 file:rounded-md file:border-0
                file:bg-blue-600 file:px-4 file:py-2
                file:text-white file:cursor-pointer
                hover:file:bg-blue-700"
              />
            </div>

            {/* Self Description */}
            <div>
              <label
                htmlFor="selfDescription"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Self Description
              </label>

              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe Yourself in a few sentences..."
                className="h-36 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              ></textarea>
            </div>

            <button className="active:scale-95 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">
              Generate Interview Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;