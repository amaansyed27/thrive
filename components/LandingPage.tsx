import React, { useState } from "react";
import Header from "./Header";

interface LandingPageProps {
  onStartBuilding: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
  "A landing page for a local bakery with a photo gallery.",
  "An interactive flashcard app for studying.",
  "A personal blog with a clean, minimalist layout.",
  "A recipe book website with a search feature.",
];

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handlePromptClick = (example: string) => {
    setPrompt(example);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset previous error

    //Checking API key in localStorage
    const apiKey = localStorage.getItem("geminiApiKey");
    if (!apiKey) {
      setError("Please set your Gemini API key in Settings before starting.");
      return;
    }

    if (prompt.trim() && !isLoading) {
      onStartBuilding(prompt);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center p-4 overflow-hidden relative">
      <Header />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-emerald-200/50 dark:bg-emerald-900/30 rounded-full -top-16 -left-16 animate-blob"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-teal-200/50 dark:bg-teal-900/30 rounded-full -bottom-16 -right-16 animate-blob"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute w-72 h-72 bg-sky-200/50 dark:bg-sky-900/30 rounded-full -bottom-24 left-20 animate-blob"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>
      <div className="absolute inset-0 w-full h-full backdrop-blur-xl"></div>

      <main className="z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight dark:text-white mb-4 animate-fade-in-down">
          Where Ideas <span className="text-brand-primary">Thrive</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
          From a spark of an idea to a fully functional web application.
          Describe your vision, and watch it come to life.
        </p>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A modern portfolio website with a dark mode toggle"
            className="w-full px-5 py-3 text-lg bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 text-gray-900 placeholder-gray-500"
            disabled={isLoading}
            aria-label="Project description"
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-brand-primary rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-brand-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !prompt.trim()}
            aria-live="polite"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Building...
              </>
            ) : (
              <>
                <span>Start Building</span>
                <ArrowRightIcon />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">Or try one of these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handlePromptClick(p)}
                className="px-4 py-2 text-sm bg-white/60 backdrop-blur-sm border border-gray-300 rounded-full hover:bg-white hover:border-brand-primary hover:text-brand-primary transition-all duration-200 text-gray-600"
                disabled={isLoading}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
