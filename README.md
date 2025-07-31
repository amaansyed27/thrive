# Thrive

This tool uses the Google Gemini API to generate complete, modern, and responsive web applications (HTML, CSS, and JavaScript) from a natural language description.

## Features

- **AI-Powered Code Generation**: Describe your web page idea, and the AI will generate the HTML, CSS, and JavaScript for you.
- **Iterative Development**: Refine and modify your web page by simply asking the AI for changes in the chat interface.
- **Live Preview**: See a live, interactive preview of your generated web page directly in the app.
- **Code Editor**: View and browse all the generated files with syntax highlighting.
- **File Uploads**: Provide images or other files as context for the AI.
- **Download Project**: Download the complete, self-contained project as a ZIP file, ready to be deployed.

## How to Use

1.  **Describe Your Idea**: On the landing page, type a description of the web page you want to create. Be as descriptive as you like.
2.  **Generate**: Click "Start Building". The AI will generate the initial version of your project.
3.  **Iterate**: Use the chat prompt to ask for changes. For example, "Change the background color to dark grey" or "Add a contact form".
4.  **Preview**: Switch to the "Preview" tab to see your changes in real-time. You can reload the preview if needed.
5.  **Download**: Once you're happy with the result, click the "Download ZIP" button to get all the project files.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Backend**: Google Gemini API (`@google/genai`)
- **Bundling**: None! This project runs entirely in the browser without any build steps, using ES Modules.