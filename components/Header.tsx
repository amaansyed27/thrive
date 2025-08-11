import React from 'react';
import { Moon, Sun, Download, Plus, Settings } from 'lucide-react';
import { useTheme } from './ThemeContext';

// Thrive Logo Component
const ThriveLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    {/* Logo Icon */}
    <svg width="28" height="28" viewBox="0 0 32 32" className="flex-shrink-0">
      <defs>
        <linearGradient id="thrive-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-emerald-500" stopColor="currentColor" />
          <stop offset="100%" className="text-emerald-600" stopColor="currentColor" />
        </linearGradient>
      </defs>
      
      {/* Growth Arrow */}
      <path 
        d="M16 24 L16 8 M12 12 L16 8 L20 12 M10 16 Q16 12 22 16" 
        stroke="url(#thrive-gradient)" 
        strokeWidth="2.5" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Base */}
      <rect x="14" y="24" width="4" height="4" fill="url(#thrive-gradient)" rx="1"/>
    </svg>
    
    {/* Logo Text */}
    <span className="text-xl font-bold text-gray-900 dark:text-white">
      THRIVE
    </span>
    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
  </div>
);

interface HeaderProps {
  onNewChat?: () => void;
  onDownload?: () => void;
  onSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNewChat, 
  onDownload, 
  onSettings 
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <ThriveLogo />
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* New Chat Button */}
          {onNewChat && (
            <button
              onClick={onNewChat}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="Start new chat"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}

          {/* Download Button */}
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              title="Download project"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download ZIP</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {/* Settings Button */}
          {onSettings && (
            <button
              onClick={onSettings}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title="Settings"
              aria-label="Open settings"
            >
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;