# 🤖 Developer Guidelines for suno-forge

> Comprehensive development standards, architectural patterns, and contribution workflows for AI agents and human developers

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [API Development](#api-development)
7. [UI Component Development](#ui-component-development)
8. [Engine Development](#engine-development)
9. [Git & Commit Guidelines](#git--commit-guidelines)
10. [Security Best Practices](#security-best-practices)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

### System Design

**suno-forge** follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│     Presentation Layer (UI)         │  ← React Components, Pages
├─────────────────────────────────────┤
│     API Layer (Backend)             │  ← Next.js API Routes
├─────────────────────────────────────┤
│     Application Logic (Engines)     │  ← Business Logic, Prompt Generation
├─────────────────────────────────────┤
│     Data/Services Layer             │  ← External APIs, Future DB
└─────────────────────────────────────┘
```

### Core User Flows

1. **`/studio`** - Single prompt authoring and generation
   - Real-time prompt validation
   - Style and lyrics editing
   - Preview and export functionality

2. **`/batch`** - Multi-prompt workflows
   - Batch generation from templates
   - Systematic mutation application
   - Result tracking and comparison

3. **`/vision`** - Visual-to-prompt conversion
   - Image analysis and interpretation
   - Mood and atmosphere extraction
   - Musical descriptor generation

### API Architecture

All backend operations are exposed through Next.js API routes:

- **`/api/generate`** - Single prompt generation
- **`/api/mutate`** - Prompt variation and mutation
- **`/api/batch`** - Batch operations
- **`/api/vision`** - Image-to-prompt conversion

### Engine Architecture

Core business logic is modularized in specialized engines:

- **`promptEngine.ts`** - Unified prompt assembly and validation
- **`styleEngine.ts`** - Genre, mood, and instrumentation management
- **`lyricsEngine.ts`** - Structural tags and lyric formatting
- **`mutationEngine.ts`** - Intelligent variation generation
- **`visionEngine.ts`** - Image analysis and musical interpretation

---

## 📁 Project Structure

```
suno-forge/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API endpoints
│   │   ├── generate/route.ts     # Single generation
│   │   ├── mutate/route.ts       # Mutation operations
│   │   ├── batch/route.ts        # Batch processing
│   │   └── vision/route.ts       # Vision processing
│   ├── studio/page.tsx           # Studio UI
│   ├── batch/page.tsx            # Batch UI
│   ├── vision/page.tsx           # Vision UI
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # React components
│   ├── ui/                       # Radix UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── PromptEditor.tsx          # Main editor
│   ├── StyleControls.tsx         # Style panel
│   ├── LyricsEditor.tsx          # Lyrics editor
│   └── BatchPanel.tsx            # Batch interface
│
├── lib/                          # Core business logic
│   ├── promptEngine.ts           # Prompt assembly
│   ├── promptEngine.test.ts      # Tests
│   ├── styleEngine.ts            # Style management
│   ├── styleEngine.test.ts       # Tests
│   ├── lyricsEngine.ts           # Lyrics handling
│   ├── mutationEngine.ts         # Variation generation
│   ├── visionEngine.ts           # Image processing
│   └── utils.ts                  # Shared utilities
│
├── types/                        # TypeScript definitions
│   ├── prompt.ts                 # Prompt types
│   └── api.ts                    # API contracts
│
├── .agent/                       # AI agent resources
│   ├── skills/                   # Development skills
│   └── workflows/                # Automated workflows
│
├── .planning/                    # Project planning
│   ├── codebase/                 # Codebase analysis
│   └── research/                 # Research docs
│
└── conductor/                    # Product guidelines
    ├── product.md
    ├── tech-stack.md
    └── workflow.md
```

### Module Organization Principles

1. **Colocate tests** - Test files live next to source files (`*.test.ts`)
2. **Separate concerns** - Business logic in `lib/`, UI in `components/`, routes in `app/`
3. **Type safety** - Shared types in `types/`, imported across layers
4. **Documentation** - Planning docs in `.planning/`, product specs in `conductor/`

---

## 🔄 Development Workflow

### Initial Setup

```bash
# Clone and install
git clone <repository-url>
cd suno-forge
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Daily Development Cycle

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Start dev server
npm run dev

# 4. Make changes and test continuously
npm test -- --watch

# 5. Type check before committing
npx tsc --noEmit

# 6. Run full test suite
npm test

# 7. Commit and push
git add .
git commit -m "Add feature: description"
git push origin feature/your-feature-name
```

### Pre-Commit Checklist

- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npx tsc --noEmit`)
- [ ] Code follows style conventions
- [ ] No console.log statements (use proper logging)
- [ ] Environment variables not hardcoded
- [ ] Documentation updated if needed

### Pre-PR Checklist

- [ ] Branch is up to date with main
- [ ] All commits are meaningful and well-described
- [ ] Tests added for new features
- [ ] API changes documented in types
- [ ] UI changes include screenshots
- [ ] Breaking changes noted in PR description

---

## 💻 Coding Standards

### TypeScript Guidelines

**Strict Mode**: All code must pass TypeScript strict mode checks.

```typescript
// ✅ GOOD: Explicit types, clear intent
interface PromptConfig {
  style: string;
  lyrics: string;
  metadata?: {
    bpm?: number;
    key?: string;
  };
}

function buildPrompt(config: PromptConfig): string {
  // Implementation
}

// ❌ BAD: Implicit any, unclear types
function buildPrompt(config) {
  // Implementation
}
```

### Naming Conventions

| Type                  | Convention                  | Example                                 |
| --------------------- | --------------------------- | --------------------------------------- |
| **Components**        | PascalCase                  | `StyleControls.tsx`, `PromptEditor.tsx` |
| **Utilities/Modules** | camelCase                   | `promptEngine.ts`, `styleEngine.ts`     |
| **Types/Interfaces**  | PascalCase                  | `PromptConfig`, `StyleOptions`          |
| **Constants**         | UPPER_SNAKE_CASE            | `MAX_PROMPT_LENGTH`, `DEFAULT_BPM`      |
| **Functions**         | camelCase                   | `buildPrompt()`, `validateStyle()`      |
| **React Hooks**       | camelCase with `use` prefix | `usePromptState()`, `useStyleOptions()` |

### Code Style

**Indentation**: 2 spaces (enforced by ESLint/Prettier)

```typescript
// ✅ GOOD: Consistent 2-space indentation
function processPrompt(config: PromptConfig): Result {
  if (config.style) {
    return {
      success: true,
      data: buildPrompt(config),
    };
  }
  return { success: false, error: "Missing style" };
}
```

**Function Size**: Keep functions small and focused (< 50 lines ideal)

```typescript
// ✅ GOOD: Small, focused functions
function validateStyle(style: string): boolean {
  return style.length > 0 && style.length < 500;
}

function validateLyrics(lyrics: string): boolean {
  return lyrics.length > 0 && lyrics.length < 5000;
}

function validatePrompt(config: PromptConfig): ValidationResult {
  return {
    styleValid: validateStyle(config.style),
    lyricsValid: validateLyrics(config.lyrics),
  };
}

// ❌ BAD: Large, monolithic function
function validatePrompt(config: PromptConfig): ValidationResult {
  // 100+ lines of validation logic
}
```

### Import Organization

```typescript
// 1. External dependencies
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 2. Internal modules (absolute imports)
import { buildPrompt } from "@/lib/promptEngine";
import { PromptConfig } from "@/types/prompt";

// 3. Relative imports (if needed)
import { localHelper } from "./helpers";
```

---

## 🧪 Testing Guidelines

### Testing Framework

- **Framework**: Jest with ts-jest
- **Location**: Colocated with source files (`*.test.ts`)
- **Coverage Target**: 80%+ for engine modules

### Test Structure

```typescript
// lib/promptEngine.test.ts
import { buildPrompt, validatePrompt } from "./promptEngine";
import { PromptConfig } from "@/types/prompt";

describe("promptEngine", () => {
  describe("buildPrompt", () => {
    it("should combine style and lyrics correctly", () => {
      const config: PromptConfig = {
        style: "synthwave, nostalgic, 88 bpm",
        lyrics: "[Verse]\nTest lyrics",
      };

      const result = buildPrompt(config);

      expect(result).toContain("synthwave");
      expect(result).toContain("Test lyrics");
    });

    it("should handle empty lyrics", () => {
      const config: PromptConfig = {
        style: "ambient",
        lyrics: "",
      };

      const result = buildPrompt(config);

      expect(result).toBeTruthy();
    });
  });

  describe("validatePrompt", () => {
    it("should reject prompts with missing style", () => {
      const config: PromptConfig = {
        style: "",
        lyrics: "Test",
      };

      const result = validatePrompt(config);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("style");
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (recommended during development)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Test specific file
npm test -- promptEngine.test.ts

# Debug tests
node --inspect-brk node_modules/.bin/jest --runInBand
```

### What to Test

**✅ DO Test:**

- Engine business logic
- Validation functions
- Data transformations
- Edge cases and error handling
- API route handlers (integration tests)

**❌ DON'T Test:**

- Third-party library internals
- Simple getters/setters
- UI component rendering (unless critical)

See **[.agent/skills/testing/SKILL.md](./.agent/skills/testing/SKILL.md)** for detailed testing patterns.

---

## 🔌 API Development

### API Route Pattern

```typescript
// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildPrompt } from "@/lib/promptEngine";
import { GenerateRequest, GenerateResponse } from "@/types/api";

// Request validation schema
const generateSchema = z.object({
  style: z.string().min(1).max(500),
  lyrics: z.string().min(0).max(5000),
  options: z
    .object({
      bpm: z.number().optional(),
      key: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request
    const body = await request.json();
    const validated = generateSchema.parse(body);

    // 2. Execute business logic
    const prompt = buildPrompt(validated);

    // 3. Return success response
    return NextResponse.json<GenerateResponse>({
      success: true,
      data: { prompt },
    });
  } catch (error) {
    // 4. Handle errors gracefully
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Generation error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
```

### API Best Practices

1. **Always validate input** with Zod schemas
2. **Use proper HTTP status codes** (200, 400, 500, etc.)
3. **Return consistent response shapes** (defined in `types/api.ts`)
4. **Log errors** but don't expose internals to clients
5. **Keep route handlers thin** - delegate to engines

---

## 🎨 UI Component Development

### Component Pattern

```typescript
// components/StyleControls.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StyleOptions } from '@/types/prompt';

interface StyleControlsProps {
  initialStyle?: string;
  onChange: (style: string) => void;
}

export function StyleControls({ initialStyle = '', onChange }: StyleControlsProps) {
  const [style, setStyle] = useState(initialStyle);

  const handleChange = (value: string) => {
    setStyle(value);
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <Input
        value={style}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter style descriptors..."
      />
      <Button onClick={() => handleChange('')}>
        Clear
      </Button>
    </div>
  );
}
```

### UI Best Practices

1. **Use Radix UI primitives** from `components/ui/`
2. **Apply Tailwind classes** for styling
3. **Keep components focused** - single responsibility
4. **Use TypeScript interfaces** for props
5. **Handle loading and error states**

See **[.agent/skills/ui-components/SKILL.md](./.agent/skills/ui-components/SKILL.md)** for detailed UI patterns.

---

## ⚙️ Engine Development

### Engine Pattern

```typescript
// lib/styleEngine.ts
import { StyleOptions, StyleDescriptor } from "@/types/prompt";

/**
 * Builds a style prompt from structured options
 */
export function buildStylePrompt(options: StyleOptions): string {
  const descriptors: string[] = [];

  // Add genre
  if (options.genre) {
    descriptors.push(options.genre);
  }

  // Add mood
  if (options.mood) {
    descriptors.push(options.mood);
  }

  // Add BPM
  if (options.bpm) {
    descriptors.push(`${options.bpm} bpm`);
  }

  // Add instrumentation
  if (options.instruments && options.instruments.length > 0) {
    descriptors.push(...options.instruments);
  }

  return descriptors.join(", ");
}

/**
 * Validates style options
 */
export function validateStyleOptions(options: StyleOptions): ValidationResult {
  const errors: string[] = [];

  if (!options.genre || options.genre.trim().length === 0) {
    errors.push("Genre is required");
  }

  if (options.bpm && (options.bpm < 20 || options.bpm > 300)) {
    errors.push("BPM must be between 20 and 300");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

### Engine Best Practices

1. **Pure functions** - no side effects
2. **Single responsibility** - each engine handles one domain
3. **Comprehensive validation** - validate all inputs
4. **Well-documented** - JSDoc comments for public functions
5. **Fully tested** - high test coverage

See **[.agent/skills/prompt-engineering/SKILL.md](./.agent/skills/prompt-engineering/SKILL.md)** for engine-specific patterns.

---

## 📝 Git & Commit Guidelines

### Branch Naming

```bash
feature/add-mutation-engine      # New features
fix/style-validation-bug         # Bug fixes
refactor/simplify-prompt-engine  # Refactoring
docs/update-readme               # Documentation
test/add-lyrics-engine-tests     # Test additions
```

### Commit Messages

Use **imperative mood** (as if giving a command):

```bash
# ✅ GOOD
Add mutation engine with variation generation
Fix style validation for empty inputs
Refactor prompt assembly logic
Update README with testing guidelines

# ❌ BAD
Added mutation engine
Fixed a bug
Changes to prompt engine
Updated docs
```

### Commit Structure

```
<type>: <subject>

<body>

<footer>
```

**Example:**

```
feat: Add intelligent mutation engine

Implement systematic prompt variation generation with:
- Genre-aware mutations
- Mood preservation logic
- Instrumentation substitution
- BPM range variations

Closes #42
```

### Pull Request Guidelines

**Title**: Clear, descriptive, imperative mood

**Description Template**:

```markdown
## Changes

- Brief bullet points of what changed

## Motivation

Why this change was needed

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if UI changes)

[Add screenshots here]

## Breaking Changes

[List any breaking changes]

## Related Issues

Closes #123
```

See **[.agent/skills/git-workflow/SKILL.md](./.agent/skills/git-workflow/SKILL.md)** for detailed Git workflows.

---

## 🔐 Security Best Practices

### Environment Variables

**✅ DO:**

```typescript
// Use environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Validate at startup
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}
```

**❌ DON'T:**

```typescript
// Never hardcode secrets
const apiKey = "sk-abc123...";

// Never commit .env files
// Add to .gitignore
```

### API Security

1. **Validate all inputs** with Zod schemas
2. **Sanitize user content** before processing
3. **Rate limit API routes** (implement in production)
4. **Use HTTPS** in production
5. **Keep dependencies updated** (`npm audit`)

### Sensitive Data

- **Never log** API keys, tokens, or user data
- **Never expose** internal error details to clients
- **Always use** environment variables for secrets
- **Review** `.env.local` is in `.gitignore`

---

## ⚡ Performance Optimization

### General Guidelines

1. **Lazy load** components when possible
2. **Memoize** expensive computations
3. **Debounce** user input handlers
4. **Optimize** images and assets
5. **Code split** large bundles

### React Performance

```typescript
// Use React.memo for expensive components
export const StyleControls = React.memo(function StyleControls(props) {
  // Component logic
});

// Use useMemo for expensive calculations
const processedStyle = useMemo(() => {
  return buildStylePrompt(options);
}, [options]);

// Use useCallback for event handlers
const handleChange = useCallback(
  (value: string) => {
    onChange(value);
  },
  [onChange]
);
```

---

## 🔧 Troubleshooting

### Common Issues

**TypeScript Errors:**

```bash
# Clear TypeScript cache
rm -rf .next
npx tsc --noEmit
```

**Test Failures:**

```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

**Dev Server Issues:**

```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Dependency Issues:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. Check **[.agent/skills/](./.agent/skills/)** for specific topics
2. Review **[.planning/](./.planning/)** for architecture docs
3. Search existing issues on GitHub
4. Ask in team chat with context and error messages

---

## 📚 Additional Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework reference
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Language guide
- **[Jest Documentation](https://jestjs.io/)** - Testing framework
- **[Radix UI](https://www.radix-ui.com/)** - Component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework

---

**Last Updated**: 2026-02-17
