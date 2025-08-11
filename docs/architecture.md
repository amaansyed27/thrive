# Architecture Overview

## Design Philosophy
Thrive is designed to be lightweight, fast, and entirely client-side. It leverages modern browser capabilities and AI APIs to deliver a seamless experience.

## Layers
1. **UI Layer**: Built with React + Tailwind CSS.
2. **Logic Layer**: Handles prompt processing, file management, and state.
3. **AI Layer**: Communicates with Gemini API for code generation.
4. **Rendering Layer**: Displays live preview using iframe or sandboxed DOM.

## Data Flow

User Prompt → Gemini API → Code Response → Render + Display → User Iteration

## No Backend
All operations are done in-browser. This reduces latency and simplifies deployment.
