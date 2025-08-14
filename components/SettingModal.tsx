import React, { useRef, useEffect, useState } from "react";

interface SettingModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ open, onClose }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("geminiApiKey") || "");
  const [input, setInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Outside click handler
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  // saving API key to localStorage
  const handleSave = () => {
    setApiKey(input);
    localStorage.setItem("geminiApiKey", input);
    setSaved(true);
    setTimeout(() => {
        window.location.reload(); // manually reload the app, for geminiApiKey change to take place in local storage
    }, 500); 
    setTimeout(() => setSaved(false), 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm relative shadow-lg"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-brand-primary"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Settings
        </h2>

        {/* API Key section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Gemini API Key
          </label>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
            placeholder="Enter API key"
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 rounded bg-brand-primary text-white hover:bg-emerald-600 transition w-full"
            disabled={!input}
          >
            Save
          </button>
          {saved && (
            <span className="block mt-1 text-sm text-green-600">
              API key saved!
            </span>
          )}
        </div>
        <div>
            <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-300">
            Get your Gemini API key from{" "}       {/*the {" "} adds space after 'from', as tsx ignores trailing text spaces */}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:text-emerald-600"
            >
              Google AI Studio
            </a>
            </label>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
