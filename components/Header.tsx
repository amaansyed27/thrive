import useThemeStore from "@/store";
import React, { useState } from "react";
import SettingModal from "./SettingModal";

// Custom theme toggle icons
const MoonIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-45deg)' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 2.98-.4 4.24-1.1C14.51 19.76 12 16.1 12 12s2.51-7.76 6.24-9.1C17.98 2.4 16.54 2 15 2H12z" 
          fill="none" 
          stroke="#10B948" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
);

const SunIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central circle */}
    <circle cx="12" cy="12" r="4" fill="#10B948"/>
    
    {/* Eight thick, rounded rectangular rays */}
    {/* Top ray */}
    <rect x="11" y="2" width="2" height="3" rx="1" fill="#10B948"/>
    
    {/* Bottom ray */}
    <rect x="11" y="19" width="2" height="3" rx="1" fill="#10B948"/>
    
    {/* Left ray */}
    <rect x="2" y="11" width="3" height="2" rx="1" fill="#10B948"/>
    
    {/* Right ray */}
    <rect x="19" y="11" width="3" height="2" rx="1" fill="#10B948"/>
    
    {/* Top-left diagonal ray */}
    <rect x="4" y="4" width="3" height="2" rx="1" fill="#10B948" transform="rotate(-45 5.5 5)"/>
    
    {/* Top-right diagonal ray */}
    <rect x="17" y="4" width="3" height="2" rx="1" fill="#10B948" transform="rotate(45 18.5 5)"/>
    
    {/* Bottom-left diagonal ray */}
    <rect x="4" y="18" width="3" height="2" rx="1" fill="#10B948" transform="rotate(45 5.5 19)"/>
    
    {/* Bottom-right diagonal ray */}
    <rect x="17" y="18" width="3" height="2" rx="1" fill="#10B948" transform="rotate(-45 18.5 19)"/>
  </svg>
);

const Header = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-end p-4 gap-4">
      <button
        type="button"
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
          theme === "light" 
            ? "text-green-500 bg-white border border-green-500 hover:bg-green-500 hover:text-white" 
            : "text-green-400 bg-black border border-green-400 hover:bg-green-400 hover:text-black"
        }`}
        onClick={() => setModalOpen(true)}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        Enter Gemini API Key
      </button>
      <SettingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <button
        onClick={handleThemeChange}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="text-gray-800 dark:text-gray-200"
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default Header;
