# File Descriptions

## Root Files
- `index.html`: Entry point for the app.
- `vite.config.ts`: Vite configuration (minimal, since bundling is not used).
- `package.json`: Lists dependencies and scripts.

## `src/`
- `App.tsx`: Main React component managing UI and state.
- `index.tsx`: Renders the app into the DOM.
- `constants.ts`: Contains static values like default prompts or UI strings.
- `types.ts`: TypeScript interfaces and types used across the app.

## `src/components/`
- `ChatBox.tsx`: UI for chatting with Gemini.
- `CodeViewer.tsx`: Displays generated code with syntax highlighting.
- `PreviewPane.tsx`: Renders the live preview of the generated site.

## `src/services/`
- `geminiService.ts`: Handles communication with Google Gemini API.
- `fileService.ts`: Manages file uploads and downloads.

## `public/`
- Assets like icons, logos, or default images.
