
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeOutputProps {
  title: string;
  language: string;
  code: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const CodeOutput: React.FC<CodeOutputProps> = ({ title, language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900/50">
        <h3 className="font-semibold text-brand-text">{title}</h3>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
            isCopied
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 hover:bg-gray-500 text-brand-text'
          }`}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-0 flex-grow" style={{ minHeight: 0 }}>
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{ margin: 0, height: '100%', overflowY: 'auto' }}
          wrapLines={true}
          wrapLongLines={true}
          showLineNumbers={true}
        >
          {code || `// No ${language} code generated.`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeOutput;
