# Coding Conventions

**Analysis Date:** 2026-02-17

## Naming Patterns

**Files:**

- `kebab-case.tsx` for React components (e.g., `components/ui/button.tsx`)
- `kebab-case.ts` for utility/engine files (e.g., `lib/promptEngine.ts`)
- `route.ts` for API route handlers (e.g., `app/api/generate/route.ts`)

**Functions:**

- `camelCase` (e.g., `buildPrompt`, `getMusicalStyle`)

**Variables:**

- `camelCase` (e.g., `buttonVariants`, `config`, `lyrics`)

**Types/Interfaces:**

- `PascalCase` (e.g., `GenerateRequest`, `ButtonProps`, `PromptDNA`)

**HTTP Handlers:**

- `UPPERCASE` for exported HTTP method functions in API routes (e.g., `POST` in `app/api/generate/route.ts`)

## Code Style

**Formatting:**

- No explicit tool (like Prettier or ESLint with formatting rules) or configuration file was detected.
- Code generally follows consistent indentation (appears to be 2 spaces) and spacing.

**Linting:**

- No explicit linter (like ESLint) or configuration file was detected.
- TypeScript compiler (`typescript` in `devDependencies`) provides type-checking and some basic linting.

## Import Organization

**Order:**

1.  Node.js/Standard library imports (e.g., `import * as React from "react"`)
2.  Third-party library imports (e.g., `import { Slot } from "@radix-ui/react-slot"`)
3.  Internal project imports using path aliases (e.g., `import { buildPrompt } from "@/lib/promptEngine"`)
4.  Relative imports (e.g., `import { buildStyle } from "./styleEngine"`)

**Path Aliases:**

- `@/` is used for internal project imports, configured via `tsconfig.json` and `jest.config.js` (`^@/(.*)$`). Examples: `src/` is mapped to `@/`.

## Error Handling

**Patterns:**

- API route handlers use `try...catch` blocks to catch errors and return a generic JSON error response with a `500` status (e.g., `app/api/generate/route.ts`).
- Functions can throw errors for invalid input, which are expected to be caught by callers (e.g., `getMusicalStyle` in `lib/styleEngine.ts`).

## Logging

**Framework:**

- No dedicated logging framework detected.
- `console.log` or similar standard console methods are likely used for debugging.

**Patterns:**

- No specific patterns for logging were explicitly observed in sampled files.

## Comments

**When to Comment:**

- JSDoc-style block comments are used to describe the purpose and parameters/return values of complex functions (e.g., `buildPrompt` in `lib/promptEngine.ts`).
- Inline comments are used to explain specific lines or blocks of logic (e.g., `// Use lyrics directly...` in `lib/promptEngine.ts`).

**JSDoc/TSDoc:**

- JSDoc-style comments are used for function documentation, providing a clear description.

## Function Design

**Size:**

- Functions generally appear focused on a single responsibility.

**Parameters:**

- Parameters are explicitly typed using TypeScript.
- Configuration objects are passed where multiple related parameters are needed (e.g., `config: PromptDNA`).

**Return Values:**

- Return values are explicitly typed using TypeScript.
- `Promise` return types are used for asynchronous functions.

## Module Design

**Exports:**

- Named exports are the primary pattern for exposing functions, components, and variables from modules (e.g., `export { Button, buttonVariants }`, `export async function buildPrompt`).
- `export const` is used for constants or variables to be exposed.

**Barrel Files:**

- Not explicitly detected, but `components/ui/index.ts` might serve this purpose if it existed. Individual component files are imported directly.
