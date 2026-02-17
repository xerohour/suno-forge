# suno-forge

**suno-forge** is a powerful prompt engineering toolkit designed for the Suno music generation AI. It provides a structured interface and backend API to systematically construct, mutate, and generate high-fidelity music prompts.

## Features

-   **Studio Mode** (`/studio`): An advanced interface for authoring and refining single prompts with granular control over style and lyrics.
-   **Batch Generation** (`/batch`): Tools for creating and managing multiple prompt variations simultaneously.
-   **Vision-to-Prompt** (`/vision`): Generate detailed musical prompts from visual descriptions using AI analysis.
-   **Modular Engine Architecture**: Core logic is separated into specialized engines (`styleEngine`, `lyricsEngine`, `mutationEngine`) for robust and reusable prompt construction.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend**: Next.js API Routes
-   **Services**: OpenAI (for AI enhancements), Supabase (planned for auth/storage)
-   **Testing**: Jest

## Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd suno-forge
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    -   Create a `.env.local` file in the root directory.
    -   Add your API keys (e.g., `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Running Tests

Run the test suite using Jest:

```bash
npm test
```

## Project Structure

-   **`app/`**: Application routes and API endpoints.
    -   `api/`: Backend logic for generation, mutation, and vision tasks.
    -   `studio/`, `batch/`, `vision/`: Feature-specific pages.
-   **`components/`**: Reusable UI components.
    -   `ui/`: Primitive components (buttons, inputs, etc.).
-   **`lib/`**: Core business logic and prompt engines.
    -   `styleEngine.ts`, `lyricsEngine.ts`, `promptEngine.ts`, `mutationEngine.ts`.
-   **`types/`**: Shared TypeScript definitions.
-   **`conductor/`**: Product planning documents and specifications.

## Documentation

-   **Development Guidelines**: See [AGENTS.md](./AGENTS.md) for coding standards, architectural details, and contribution workflows.
-   **Project Overview**: See [GEMINI.md](./GEMINI.md) for a high-level summary of the project's goals and structure.
-   **Prompting Guide**: See [suno-prompting-compendium.md](./suno-prompting-compendium.md) for a deep dive into crafting effective Suno prompts, including style descriptors, structural tags, and advanced techniques.

## License

This project is private and proprietary.
