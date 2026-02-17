# GEMINI Project Overview: suno-forge

## Project Overview

This project, `suno-forge`, is a Next.js application designed to act as a powerful prompt engineering toolkit for the Suno music generation AI. It provides a user interface and a backend API to systematically construct, mutate, and generate prompts for creating music.

The architecture is modular, with a clear separation of concerns:
-   **`app/`**: Contains the Next.js pages (UI) and API routes. The UI is built with React and includes pages for single prompt generation (`/studio`), batch generation (`/batch`), and a "vision" feature to generate prompts from image descriptions (`/vision`).
-   **`lib/`**: The core "engine" of the application. It contains the logic for building prompts by combining different components like musical style (`styleEngine.ts`), lyrics (`lyricsEngine.ts`), and applying mutations (`mutationEngine.ts`).
-   **`components/`**: Contains placeholder React components for a more advanced UI, including editors and control panels.
-   **`types/`**: Defines the TypeScript types used throughout the project, such as `PromptConfig`.

The project is configured to use OpenAI for potential AI-driven enhancements and Supabase for backend services like authentication and database storage, although these are not fully implemented in the current scaffold.

## Building and Running

The project uses `npm` as the package manager and includes standard Next.js scripts.

-   **To install dependencies:**
    ```bash
    npm install
    ```
-   **To run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

-   **To build for production:**
    ```bash
    npm run build
    ```

-   **To start the production server:**
    ```bash
    npm run start
    ```

## Development Conventions

-   **Framework:** The project is built with Next.js and the App Router.
-   **Language:** The entire codebase is written in TypeScript.
-   **API:** Backend logic is exposed via Next.js API Routes (e.g., `/api/generate`).
-   **Styling:** Currently uses inline styles, but is structured to easily accommodate a utility-first CSS framework like Tailwind CSS.
-   **Modularity:** Core logic is organized into "engine" modules within the `lib/` directory, promoting reusability and separation of concerns.
-   **Environment:** Environment variables for services like OpenAI and Supabase are managed in `.env.local`.
