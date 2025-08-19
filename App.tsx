import React, { useState, useCallback } from "react";
import type { GeneratedCode, ChatMessage } from "./types";
import {
  startChat,
  sendMessage,
  parseCodeResponse,
} from "./services/geminiService";
import { ChatView } from "./components/EditorView";
import LandingPage from "./components/LandingPage";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import useThemeStore from "./store";

const App: React.FC = () => {
  const { theme } = useThemeStore();
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSendMessage = useCallback(
    async (text: string, files: File[]) => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      const fileToChatFile = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const base64Data = (event.target.result as string).split(",")[1];
              resolve({ name: file.name, type: file.type, data: base64Data });
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };

      try {
        const chatFiles = await Promise.all(files.map(fileToChatFile));
        const userMessage: ChatMessage = {
          role: "user",
          text,
          files: chatFiles,
        };
        setMessages((prev) => [...prev, userMessage]);

        let historyText = "";
        if (generatedCode && Object.keys(generatedCode).length > 0) {
          historyText = "Here is the current project structure and code:\n\n";
          const sortedFiles = Object.keys(generatedCode).sort();
          for (const filePath of sortedFiles) {
            const content = generatedCode[filePath];
            const lang = filePath.split(".").pop() || "";
            historyText += `\`${filePath}\`:\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
          }
        }
        const fullPrompt = `${historyText}User request: ${text}`;

        const responseText = await sendMessage(fullPrompt, chatFiles);
        const code = parseCodeResponse(responseText);

        let modelResponseText = responseText;

        if (code) {
          setGeneratedCode(code);
          modelResponseText =
            "I've generated the project files as you requested. You can browse the code and see the preview in the workspace.";
        }

        const modelMessage: ChatMessage = {
          role: "model",
          text: modelResponseText,
          isCode: !!code,
        };
        setMessages((prev) => [...prev, modelMessage]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(errorMessage);
        // Also add an error message to chat
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: `Sorry, I encountered an error: ${errorMessage}`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, generatedCode]
  );

  const handleStartBuilding = (initialPrompt: string) => {
    if (!initialPrompt.trim() || isLoading) return;
    startChat(); // Start chat session when user submits first prompt
    setIsChatStarted(true);
    handleSendMessage(initialPrompt, []);
  };

  const handleNewChat = () => {
    setIsChatStarted(false);
    setMessages([]);
    setGeneratedCode(null);
    setError(null);
    setIsLoading(false);
  };

  const handleDownload = useCallback(() => {
    if (!generatedCode || Object.keys(generatedCode).length === 0) return;

    const zip = new JSZip();
    Object.entries(generatedCode).forEach(([path, content]) => {
      zip.file(path, content as string);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "thrive-project.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // A little celebration for a successful download!
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      const colors = ["#10b981", "#f9fafb", "#9ca3af"];

      (function frame() {
        // launch a few confetti from the left edge
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    });
  }, [generatedCode]);

  return (
    <div
      className={`h-full w-full ${
        theme === "dark"
          ? "bg-brand-background text-brand-text"
          : "bg-white text-gray-900"
      }`}
    >
      {!isChatStarted ? (
        <LandingPage
          onStartBuilding={handleStartBuilding}
          isLoading={isLoading}
        />
      ) : (
        <ChatView
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          error={error}
          generatedCode={generatedCode}
          onNewChat={handleNewChat}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default App;
