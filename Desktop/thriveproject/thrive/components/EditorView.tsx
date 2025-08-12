import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { GeneratedCode, ChatMessage } from '../types';
import CodeOutput from './CodeOutput';

// Icons
const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>);
const AttachmentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>);
const NewChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>);
const UserIcon = () => (<div className="h-8 w-8 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center font-bold text-white text-sm">U</div>);
const BotIcon = () => (<div className="h-8 w-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM15 11a1 1 0 100-2 1 1 0 000 2zM4.343 5.757a1 1 0 001.414-1.414l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM2 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011 1z" /><path d="M10 4a6 6 0 100 12 6 6 0 000-12zM10 14a4 4 0 110-8 4 4 0 010 8z" /></svg></div>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const FolderIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>);
const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>);
const LeafIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.23-6.913M3.77 14.087A9.004 9.004 0 0112 3" /></svg>);

// Main Component Interfaces
interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, files: File[]) => void;
  isLoading: boolean;
  error: string | null;
  generatedCode: GeneratedCode | null;
  onNewChat: () => void;
  onDownload: () => void;
}

interface ChatInputProps {
    onSendMessage: (text: string, files: File[]) => void;
    isLoading: boolean;
}

// Sub-components
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    const handleSend = () => {
        if (isLoading || (!text.trim() && files.length === 0)) return;
        onSendMessage(text, files);
        setText('');
        setFiles([]);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
        if(e.target) e.target.value = '';
    };

    return (
        <div className="p-4 bg-brand-background border-t border-gray-700">
            <div className="bg-brand-surface rounded-lg p-2 flex items-center border border-gray-600 focus-within:border-brand-primary transition-colors">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-brand-subtle-text hover:text-brand-text flex-shrink-0"
                    aria-label="Attach file"
                >
                    <AttachmentIcon />
                </button>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,text/plain,text/html,text/css,text/javascript"
                />
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask for a change or describe what to build..."
                    className="flex-grow bg-transparent text-brand-text placeholder-brand-subtle-text resize-none outline-none max-h-40"
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || (!text.trim() && files.length === 0)}
                    className="p-2 text-brand-primary hover:text-teal-400 disabled:text-gray-500 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Send message"
                >
                   <SendIcon />
                </button>
            </div>
             {files.length > 0 && (
                <div className="mt-2 text-xs text-brand-subtle-text truncate">
                    Attached: {files.map(f => f.name).join(', ')}
                    <button onClick={() => setFiles([])} className="ml-2 text-red-400 hover:text-red-300 font-semibold">[Clear]</button>
                </div>
            )}
        </div>
    );
};

const ChatHistory: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    return (
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'model' && <BotIcon />}
                    <div className={`max-w-xl p-3 rounded-lg text-white ${msg.role === 'user' ? 'bg-brand-primary' : 'bg-brand-surface'}`}>
                        <div className="text-base leading-relaxed break-words">{msg.text}</div>
                         {msg.files && msg.files.length > 0 && (
                             <div className="mt-2 border-t border-teal-300/50 pt-2">
                                {msg.files.map(file => (
                                    <div key={file.name} className="text-xs italic">
                                        Attached: {file.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                     {msg.role === 'user' && <UserIcon />}
                </div>
            ))}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

const WorkspacePanel: React.FC<{
    generatedCode: GeneratedCode | null;
    onDownload: () => void;
}> = ({ generatedCode, onDownload }) => {
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [previewKey, setPreviewKey] = useState(Date.now());

    const handleReloadPreview = () => {
        setPreviewKey(Date.now());
    };

    useEffect(() => {
        if (generatedCode && Object.keys(generatedCode).length > 0) {
            const files = Object.keys(generatedCode);
            if (!selectedFile || !files.includes(selectedFile)) {
                 setSelectedFile(files.includes('index.html') ? 'index.html' : files[0]);
            }
        } else {
            setSelectedFile(null);
        }
    }, [generatedCode, selectedFile]);

    const previewSrcDoc = useMemo(() => {
        if (!generatedCode || !generatedCode['index.html']) return '';
        
        let htmlContent = generatedCode['index.html'];

        const replaceLinkedAssets = (source: string, regex: RegExp, wrapper: (code: string) => string) => {
            let replacedSource = source;
            let match;
            while ((match = regex.exec(source)) !== null) {
                const fullMatch = match[0];
                const path = match[1];

                // Normalize path: remove leading "./" or "/"
                const normalizedPath = path.replace(/^\.?\//, '');
                
                if (generatedCode[normalizedPath]) {
                    const inlineContent = wrapper(generatedCode[normalizedPath]);
                    // Use a more robust replacement to avoid replacing parts of other words
                    replacedSource = replacedSource.replace(fullMatch, inlineContent);
                }
            }
            return replacedSource;
        };
        
        // This regex finds <link> tags for CSS
        const cssRegex = /<link[^>]*href="([^"]+\.css)"[^>]*>/g;
        // This regex finds <script> tags with a src attribute for JS
        const jsRegex = /<script[^>]*src="([^"]+\.js)"[^>]*><\/script>/g;

        htmlContent = replaceLinkedAssets(htmlContent, cssRegex, code => `<style>${code}</style>`);
        htmlContent = replaceLinkedAssets(htmlContent, jsRegex, code => `<script type="module">${code}</script>`);

        return htmlContent;
    }, [generatedCode, previewKey]);

    const fileTree = useMemo(() => {
        if (!generatedCode) return {};
        const tree: any = {};
        Object.keys(generatedCode).forEach(path => {
            let currentLevel = tree;
            path.split('/').forEach((part, index, arr) => {
                if (index === arr.length - 1) {
                    currentLevel[part] = path;
                } else {
                    currentLevel[part] = currentLevel[part] || {};
                    currentLevel = currentLevel[part];
                }
            });
        });
        return tree;
    }, [generatedCode]);

    const FileTree: React.FC<{tree: object, onSelect: (path: string) => void, level?: number}> = ({ tree, onSelect, level = 0 }) => {
        return (
            <div style={{ paddingLeft: `${level * 0.5}rem` }}>
                {Object.entries(tree).sort(([aKey, aVal], [bKey, bVal]) => {
                    const aIsFile = typeof aVal === 'string';
                    const bIsFile = typeof bVal === 'string';
                    if (aIsFile === bIsFile) return aKey.localeCompare(bKey);
                    return aIsFile ? 1 : -1;
                }).map(([name, content]) => (
                    <div key={name}>
                        {typeof content === 'string' ? (
                            <button onClick={() => onSelect(content)} className={`w-full text-left flex items-center p-1 rounded transition-colors duration-150 ${selectedFile === content ? 'bg-brand-primary/80 text-white' : 'hover:bg-brand-secondary text-brand-subtle-text'}`}>
                                <FileIcon />
                                <span className="text-sm truncate">{name}</span>
                            </button>
                        ) : (
                            <div>
                                <div className="flex items-center p-1 text-brand-text">
                                    <FolderIcon />
                                    <span className="text-sm font-semibold">{name}</span>
                                </div>
                                <FileTree tree={content} onSelect={onSelect} level={level + 1} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const TabButton: React.FC<{ tabName: any, children: React.ReactNode }> = ({ tabName, children }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tabName ? 'border-brand-primary text-brand-text' : 'border-transparent text-brand-subtle-text hover:border-gray-600 hover:text-brand-text'}`}
        >{children}</button>
    );

    const renderWorkspaceContent = () => {
        if (!generatedCode || Object.keys(generatedCode).length === 0) {
            return (
                <div className="h-full flex items-center justify-center text-brand-subtle-text p-4 text-center">
                    <p>Your generated project will appear here. <br/>Start by describing what you want to build!</p>
                </div>
            );
        }

        if (activeTab === 'preview') {
            return generatedCode['index.html'] 
                ? <iframe key={previewKey} srcDoc={previewSrcDoc} title="Preview" className="w-full h-full bg-white border-0" sandbox="allow-scripts allow-same-origin" />
                : <div className="h-full flex items-center justify-center text-brand-subtle-text"><p>No index.html found to preview.</p></div>;
        }

        return (
            <div className="flex h-full min-h-0 bg-gray-900/20">
                <div className="w-1/3 max-w-xs bg-brand-surface/30 p-2 overflow-y-auto">
                    <h3 className="text-base font-bold p-1 mb-2 border-b border-gray-700 text-brand-text">Files</h3>
                    <FileTree tree={fileTree} onSelect={setSelectedFile} />
                </div>
                <div className="flex-grow min-w-0">
                    {selectedFile && generatedCode[selectedFile] !== undefined ? (
                        <CodeOutput
                            title={selectedFile}
                            language={selectedFile.split('.').pop() || 'text'}
                            code={generatedCode[selectedFile]}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-brand-subtle-text"><p>Select a file to view its code.</p></div>
                    )}
                </div>
            </div>
        );
    };
    
    return (
        <div className="bg-brand-background flex flex-col min-h-0 h-full">
            <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-700 px-2">
                <div className="flex items-center">
                    <TabButton tabName="code">Code</TabButton>
                    <TabButton tabName="preview">Preview</TabButton>
                    {activeTab === 'preview' && (
                        <button
                            onClick={handleReloadPreview}
                            className="ml-2 p-1.5 rounded-md text-brand-subtle-text hover:bg-brand-surface hover:text-brand-text transition-colors"
                            title="Reload Preview"
                            aria-label="Reload preview"
                        >
                            <RefreshIcon />
                        </button>
                    )}
                </div>
                <button 
                  onClick={onDownload} 
                  disabled={!generatedCode || Object.keys(generatedCode).length === 0}
                  className="flex items-center px-3 py-1.5 text-sm bg-brand-primary hover:bg-teal-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <DownloadIcon />
                  Download ZIP
                </button>
            </div>
            <div className="flex-grow p-1 min-h-0">
                {renderWorkspaceContent()}
            </div>
        </div>
    );
};


export const ChatView: React.FC<ChatViewProps> = ({ messages, onSendMessage, isLoading, error, generatedCode, onNewChat, onDownload }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <header className="flex-shrink-0 bg-brand-background border-b border-gray-700 flex justify-between items-center px-4 py-2">
                 <div className="flex items-center space-x-2">
                    <LeafIcon />
                    <h1 className="text-xl font-bold text-brand-text">Thrive</h1>
                 </div>
                 <button onClick={onNewChat} disabled={isLoading} className="flex items-center px-3 py-2 text-sm bg-brand-surface hover:bg-brand-secondary text-brand-text rounded-md transition-colors disabled:opacity-50"><NewChatIcon />New Chat</button>
            </header>
            <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-px bg-gray-700 min-h-0">
                <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-brand-background flex flex-col overflow-hidden">
                    <ChatHistory messages={messages} />
                    {isLoading && <div className="px-4 pb-2 text-sm text-brand-subtle-text flex items-center gap-2"><div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div><span>AI is thinking...</span></div>}
                     {error && <div className="p-4"><div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert"><strong>Error: </strong><span>{error}</span></div></div>}
                    <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
                </div>
                <main className="col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden">
                    <WorkspacePanel generatedCode={generatedCode} onDownload={onDownload} />
                </main>
            </div>
        </div>
    );
};

export default ChatView;