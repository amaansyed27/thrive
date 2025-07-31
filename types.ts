
export type GeneratedCode = {
  [filePath: string]: string;
};

export interface ChatFile {
  name: string;
  type: string; // MIME type
  data: string; // base64 encoded data
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  files?: ChatFile[];
  isCode?: boolean; // To know if the model message contains code to render
}