# Codebase Structure

**Analysis Date:** 2024-07-30

## Directory Layout

```
project-root/
├── .gemini/              # Gemini agent configuration and tools
├── .next/                # Next.js build output and cache
├── .planning/            # GSD planning documents
├── app/                  # Next.js App Router for UI pages and API routes
│   ├── api/              # Next.js API Routes
│   ├── batch/            # Batch processing UI page
│   ├── studio/           # Main studio/editor UI page
│   └── vision/           # Vision processing UI page
├── components/           # Reusable React components
│   └── ui/               # UI primitive components (e.g., Shadcn UI)
├── conductor/            # Project documentation and guidelines
├── lib/                  # Core business logic (engines) and utilities
├── node_modules/         # Node.js dependencies
└── types/                # TypeScript global type definitions
```

## Directory Purposes

**app/:**

- Purpose: Contains all Next.js App Router specific files, including UI pages, layouts, and API routes. This is the entry point for the web application.
- Contains: `page.tsx` for route segments, `layout.tsx` for shared UI, `route.ts` for API endpoints.
- Key files: `app/layout.tsx`, `app/page.tsx`, `app/api/*/route.ts`

**components/:**

- Purpose: Houses all reusable React components used across the application.
- Contains: Higher-order components like `PromptEditor.tsx`, `BatchPanel.tsx`, and `MutationPanel.tsx`.
- Key files: `components/PromptEditor.tsx`, `components/BatchPanel.tsx`

**components/ui/:**

- Purpose: Dedicated to primitive, style-agnostic UI components, likely generated or adapted from a UI library (e.g., Shadcn UI).
- Contains: `button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, etc.
- Key files: `components/ui/button.tsx`, `components/ui/input.tsx`

**lib/:**

- Purpose: Stores core application logic, business rules, and utility functions that are independent of the UI or API layer. These are often referred to as "engines" in this codebase.
- Contains: `promptEngine.ts`, `mutationEngine.ts`, `visionEngine.ts`, `utils.ts`.
- Key files: `lib/promptEngine.ts`, `lib/mutationEngine.ts`

**types/:**

- Purpose: Centralizes TypeScript interface and type definitions for shared data structures across the application.
- Contains: `prompt.ts` for prompt-related types.
- Key files: `types/prompt.ts`

**conductor/:**

- Purpose: Contains documentation, product guidelines, and notes related to the project and its development process.
- Contains: Markdown files like `product.md`, `workflow.md`, `tech-stack.md`.
- Key files: `conductor/product.md`, `conductor/workflow.md`

## Key File Locations

**Entry Points:**

- `app/layout.tsx`: Root layout for the entire application.
- `app/page.tsx`: The main page for the root route (`/`).
- `app/studio/page.tsx`: The main page for the `/studio` route.
- `app/api/generate/route.ts`: API endpoint for prompt generation.
- `app/api/mutate/route.ts`: API endpoint for prompt mutation.

**Configuration:**

- `package.json`: Project metadata and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.
- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration.
- `jest.config.js`: Jest test runner configuration.

**Core Logic:**

- `lib/promptEngine.ts`: Logic for building and processing prompts.
- `lib/mutationEngine.ts`: Logic for mutating prompts.
- `lib/visionEngine.ts`: Logic for processing visual input.

**Testing:**

- `lib/promptEngine.test.ts`: Unit tests for the prompt engine.
- `lib/styleEngine.test.ts`: Unit tests for the style engine.
- `jest.config.js`: Jest configuration for running tests.

## Naming Conventions

**Files:**

- **React Components:** `PascalCase` (e.g., `PromptEditor.tsx`, `Button.tsx`).
- **Utility/Engine Modules:** `camelCase` (e.g., `promptEngine.ts`, `utils.ts`).
- **Next.js Route Files:** `page.tsx` for UI pages, `route.ts` for API endpoints.
- **Test Files:** `[moduleName].test.ts` (e.g., `promptEngine.test.ts`).

**Directories:**

- **Feature/Module Directories:** `kebab-case` or `camelCase` (e.g., `app/studio/`, `components/ui/`, `lib/`). `kebab-case` is preferred for clarity in file system.

## Where to Add New Code

**New Feature (UI Page):**

- Primary code: Create a new directory `app/[feature-name]/` and add `page.tsx` inside it.
- Components: Add new or existing components to `components/[ComponentName].tsx`.
- Tests: `app/[feature-name]/__tests__/page.test.tsx` (if page-specific logic) or `components/[ComponentName].test.tsx`.

**New API Endpoint:**

- Implementation: Create a new directory `app/api/[endpoint-name]/` and add `route.ts` inside it.
- Logic: Implement core logic in a new or existing module in `lib/`.

**New Component/Module:**

- Custom UI Component: `components/[ComponentName].tsx`
- UI Primitive Component: `components/ui/[component-name].tsx`
- Core Logic Module: `lib/[moduleName]Engine.ts` or `lib/[moduleName]Utils.ts`

**Utilities:**

- Shared helpers: `lib/utils.ts` for generic utilities, or a new file `lib/[specific-utility].ts` for more domain-specific helpers.

**New Type Definition:**

- Shared type: `types/[typeName].ts`, then export from `types/index.ts` if a barrel file is desired (not currently present but good practice).

## Special Directories

**`.next/`:**

- Purpose: Generated by Next.js for build output, cache, and development server files.
- Generated: Yes
- Committed: No (should be in `.gitignore`)

**`.planning/`:**

- Purpose: Contains GSD (Get Shit Done) generated planning documents.
- Generated: Yes (by GSD)
- Committed: Yes

**`.gemini/`:**

- Purpose: Stores configuration and tools related to the Gemini agent.
- Generated: Yes (by Gemini)
- Committed: No (should be in `.gitignore`)

**`node_modules/`:**

- Purpose: Contains all installed Node.js dependencies.
- Generated: Yes (by `npm install` or `yarn install`)
- Committed: No (should be in `.gitignore`)

---

_Structure analysis: 2024-07-30_
