

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import type { ChatFile, GeneratedCode } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat;

export const startChat = () => {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

const fileToGenerativePart = (file: ChatFile) => {
  return {
    inlineData: {
      mimeType: file.type,
      data: file.data,
    },
  };
};

export const sendMessage = async (message: string, files?: ChatFile[]): Promise<string> => {
  if (!chat) {
    startChat();
  }

  try {
    const messageParts: any[] = [{ text: message }];
    
    if (files && files.length > 0) {
      files.forEach(file => {
        messageParts.push(fileToGenerativePart(file));
      });
    }
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: messageParts });

    return response.text;
  } catch (error) {
    console.error("Error sending message:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to get response. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while sending the message.");
  }
};

export const parseCodeResponse = (responseText: string): GeneratedCode | null => {
    try {
        // Regex to find JSON in markdown ```json ... ``` or as a raw string
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
        if (!jsonMatch) return null;

        const jsonString = jsonMatch[1] || jsonMatch[2];
        if (!jsonString) return null;
        
        const parsed = JSON.parse(jsonString);
        
        // Basic validation: is it an object, and are its values strings?
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
            // Check if all values are strings (file content)
            const allValuesAreStrings = Object.values(parsed).every(value => typeof value === 'string');
            if(Object.keys(parsed).length > 0 && allValuesAreStrings) {
                return parsed as GeneratedCode;
            }
        }
        return null;
    } catch (e) {
        console.warn("Failed to parse AI response as JSON code:", responseText, e);
        return null;
    }
};