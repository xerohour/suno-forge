# Repository Guidelines

## Architecture Overview
- `suno-forge` is a Next.js App Router project for building and refining Suno music prompts.
- Primary user flows:
  - `/studio`: single prompt authoring and generation
  - `/batch`: multi-prompt workflows
  - `/vision`: prompt generation from visual descriptions
- API routes in `app/api/*` expose backend actions such as generate, mutate, batch, and vision.
- Core prompt behavior is modularized in `lib/*Engine.ts`.

## Project Structure & Module Organization
- `app/`: Next.js App Router pages and API routes (`app/api/*/route.ts`).
- `components/`: Reusable UI and feature components (`components/ui/*` for primitives).
- `lib/`: Core prompt logic and engines (`styleEngine`, `promptEngine`, `lyricsEngine`, `mutationEngine`).
- `types/`: Shared TypeScript types (for prompt payloads and API contracts).
- `conductor/`: Product/planning docs and archived specs.
- Tests live beside logic in `lib/*.test.ts`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server.
- `npm run build`: production build (Next.js).
- `npm run start`: run built app.
- `npm test`: run Jest unit tests.
- `npx tsc --noEmit`: strict type-check pass (recommended before PR).

Example flow:
```bash
npm install
npm run dev
npx tsc --noEmit
npm test
```

## Coding Style & Naming Conventions
- Language: TypeScript (`strict` mode enabled in `tsconfig.json`).
- Indentation: 2 spaces; keep code formatted consistently with existing files.
- Components: PascalCase file/component names (`StyleControls.tsx`).
- Utilities/modules: camelCase filenames (`promptEngine.ts`, `styleEngine.ts`).
- Prefer small, focused functions and explicit types for request/response shapes.
- Keep business logic in `lib/` engines, not in API handlers or page components.

## Testing Guidelines
- Framework: Jest (`jest.config.js`, `ts-jest`).
- Test files: `*.test.ts` colocated with source under `lib/`.
- Cover behavior changes in engines and prompt-building paths.
- For UI-heavy changes, at minimum include typecheck + manual validation notes in PR.

## Commit & Pull Request Guidelines
- Use imperative commit messages (e.g., `Fix instrumental style conflict`).
- Keep commits scoped to one logical change when possible.
- PRs should include:
  - concise summary of behavior changes,
  - validation steps/results (`npx tsc --noEmit`, `npm test`, build notes),
  - screenshots/GIFs for Studio UI changes,
  - linked issue/task when available.

## Security & Configuration Tips
- Store secrets in `.env.local`; never commit `.env*` credentials.
- Review API route inputs in `app/api/*` and keep request types aligned in `types/prompt.ts`.
- OpenAI/Supabase integrations are scaffolded; treat keys and service URLs as required environment config.
