# Architecture

**Analysis Date:** 2024-07-30

## Pattern Overview

**Overall:** Layered Architecture with Next.js App Router

**Key Characteristics:**
- **Client-Server Separation:** UI (React components) in `app/` and `components/` interacts with API endpoints defined in `app/api/`.
- **Modular Core Logic:** Business logic is encapsulated in "engines" within the `lib/` directory, promoting reusability and separation of concerns.
- **Type Safety:** Strong emphasis on TypeScript with shared type definitions in `types/`.

## Layers

**Presentation (UI):**
- Purpose: Handles user interaction, renders UI, and displays data.
- Location: `app/`, `components/`
- Contains: Next.js pages, layouts, and reusable React components.
- Depends on: API layer for data, `lib/utils.ts` for common client-side utilities.
- Used by: End-users via the web browser.

**API:**
- Purpose: Provides backend endpoints for data fetching and mutations, acting as a facade for core business logic.
- Location: `app/api/`
- Contains: Next.js API routes (e.g., `route.ts`).
- Depends on: Application Logic layer (`lib/`), Shared Types (`types/`).
- Used by: Presentation layer (UI components).

**Application Logic/Domain:**
- Purpose: Encapsulates core business rules and operations (e.g., prompt generation, mutation, vision processing).
- Location: `lib/`
- Contains: "Engine" modules like `promptEngine.ts`, `mutationEngine.ts`, `visionEngine.ts`.
- Depends on: Shared Types (`types/`), potentially external services (not detailed here).
- Used by: API layer.

**Shared/Utilities:**
- Purpose: Provides common utility functions and shared data structures across layers.
- Location: `lib/utils.ts`, `types/`
- Contains: Helper functions, common type definitions (e.g., `prompt.ts`).
- Depends on: None (fundamental utilities).
- Used by: All other layers as needed.

## Data Flow

**Typical Request Flow:**

1.  **User Interaction (UI):** User interacts with a component in `app/` or `components/` (e.g., submits a form, clicks a button).
2.  **API Call (UI to API):** The UI component makes an asynchronous request to a relevant API endpoint in `app/api/` (e.g., `fetch('/api/generate')`).
3.  **Business Logic Execution (API to Application Logic):** The API route handler (`route.ts`) receives the request, validates input, and invokes the appropriate function(s) from an engine in `lib/` (e.g., `buildPrompt` from `promptEngine.ts`).
4.  **Data Processing/External Calls (Application Logic):** The engine processes the data, potentially interacts with external services (e.g., an AI model for generation), and prepares a response.
5.  **Response (API to UI):** The API route handler formats the response from the engine and sends it back to the UI.
6.  **UI Update (UI):** The UI component receives the response and updates its state and rendering accordingly.

**State Management:**
- React's `useState` and `useRef` for local component state.
- Next.js provides mechanisms for data fetching and revalidation, implying server-side rendering or static generation for initial state, and client-side fetching for dynamic updates.

## Key Abstractions

**Engines:**
- Purpose: Modular units encapsulating specific business logic functionalities.
- Examples: `lib/promptEngine.ts`, `lib/mutationEngine.ts`, `lib/visionEngine.ts`
- Pattern: Export functions that perform specific operations related to their domain.

**UI Components (Custom):**
- Purpose: Encapsulate UI logic and rendering for specific features.
- Examples: `components/PromptEditor.tsx`, `components/BatchPanel.tsx`, `components/StyleControls.tsx`
- Pattern: Functional React components, often taking props and managing local state.

**UI Components (UI Library):**
- Purpose: Reusable, styled UI primitives.
- Examples: `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/input.tsx`
- Pattern: Composable components often built with `radix-ui` primitives and `class-variance-authority` for styling.

## Entry Points

**Web Application:**
- Location: `app/layout.tsx` (root layout), `app/page.tsx` (root page), `app/studio/page.tsx`, `app/batch/page.tsx`, `app/vision/page.tsx`
- Triggers: Browser navigation to `/`, `/studio`, `/batch`, `/vision` respectively.
- Responsibilities: Initialize the application, define global layout, render main content for specific routes.

**API Endpoints:**
- Location: `app/api/batch/route.ts`, `app/api/generate/route.ts`, `app/api/mutate/route.ts`, `app/api/vision/route.ts`
- Triggers: HTTP requests to `/api/batch`, `/api/generate`, `/api/mutate`, `/api/vision`.
- Responsibilities: Handle incoming API requests, invoke business logic, and return HTTP responses.

## Error Handling

**Strategy:** Not explicitly detailed in initial code exploration. Typically, API routes would catch errors from business logic and return appropriate HTTP status codes and error messages. UI components would handle these error responses to display feedback to the user.

**Patterns:**
- Standard JavaScript `try...catch` blocks are expected for synchronous and asynchronous error handling.

## Cross-Cutting Concerns

**Logging:** Not explicitly detailed, but standard `console.log` or a dedicated logging library would be used in both client and server environments.
**Validation:** Input validation is expected at the API layer (within `route.ts` handlers or within `lib/` engines) before processing business logic.
**Authentication:** Not explicitly detailed, but a Next.js application typically uses libraries like NextAuth.js or custom middleware for authentication, likely handled before API routes or within specific endpoints.

---

*Architecture analysis: 2024-07-30*
