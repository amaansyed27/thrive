# How Thrive Works

Thrive is a browser-based AI-powered web app generator. It uses Google Gemini to convert natural language prompts into full-fledged HTML/CSS/JS projects.

## Workflow
1. **User Input**: User describes a web page idea.
2. **Gemini API**: The prompt is sent to Google Gemini via `@google/generative-ai`.
3. **Code Generation**: Gemini returns structured code (HTML, CSS, JS).
4. **Live Preview**: The generated code is rendered in-browser.
5. **Iteration**: Users can modify the page by chatting with the AI.
6. **Download**: Final project can be exported as a ZIP.

## Key Features
- No backend server required
- Runs entirely in-browser
- Supports file uploads and downloads
