# 🎵 GEMINI Project Overview: suno-forge

> Quick-reference guide for AI agents working with the suno-forge codebase

---

## 📖 Project Summary

**suno-forge** is a Next.js application that serves as a comprehensive prompt engineering toolkit for the Suno AI music generation platform. It empowers users to systematically construct, mutate, and generate high-fidelity music prompts through both an intuitive user interface and a robust backend API.

### Core Purpose

Transform the art of music prompt engineering from guesswork into a systematic, repeatable process with:

- **Structured prompt construction** using specialized engines
- **Intelligent variation generation** through mutation algorithms
- **Visual-to-musical translation** via AI-powered image analysis
- **Batch processing capabilities** for efficient workflow scaling

---

## 🏗️ Architecture Overview

### Layered Design

The application follows a **clean layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│  Presentation Layer (React/Next.js)         │
│  - Pages: /studio, /batch, /vision          │
│  - Components: UI primitives, editors       │
├─────────────────────────────────────────────┤
│  API Layer (Next.js API Routes)             │
│  - /api/generate  - Single generation       │
│  - /api/mutate    - Variation creation      │
│  - /api/batch     - Batch operations        │
│  - /api/vision    - Image analysis          │
├─────────────────────────────────────────────┤
│  Application Logic (Engine Modules)         │
│  - promptEngine   - Prompt assembly         │
│  - styleEngine    - Style management        │
│  - lyricsEngine   - Lyrics handling         │
│  - mutationEngine - Variation generation    │
│  - visionEngine   - Image processing        │
├─────────────────────────────────────────────┤
│  External Services                          │
│  - OpenAI API (GPT-4, Vision)               │
│  - Supabase (future: auth, storage)         │
└─────────────────────────────────────────────┘
```

### Directory Structure

```
suno-forge/
├── app/                    # Next.js App Router
│   ├── api/                # Backend API endpoints
│   ├── studio/             # Studio mode page
│   ├── batch/              # Batch generation page
│   ├── vision/             # Vision mode page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
│
├── components/             # React components
│   ├── ui/                 # Radix UI primitives
│   ├── PromptEditor.tsx    # Main prompt editor
│   ├── StyleControls.tsx   # Style configuration
│   ├── LyricsEditor.tsx    # Lyrics editor
│   └── BatchPanel.tsx      # Batch interface
│
├── lib/                    # Core business logic (engines)
│   ├── promptEngine.ts     # Prompt assembly & validation
│   ├── styleEngine.ts      # Genre, mood, instrumentation
│   ├── lyricsEngine.ts     # Structural tags, formatting
│   ├── mutationEngine.ts   # Intelligent variations
│   ├── visionEngine.ts     # Image-to-prompt conversion
│   └── utils.ts            # Shared utilities
│
├── types/                  # TypeScript definitions
│   ├── prompt.ts           # Prompt configuration types
│   └── api.ts              # API request/response types
│
├── .agent/                 # AI agent resources
│   ├── skills/             # Development skills
│   └── workflows/          # Automated workflows
│
├── .planning/              # Project planning docs
│   ├── codebase/           # Architecture analysis
│   └── research/           # Research & specs
│
└── conductor/              # Product guidelines
    ├── product.md          # Product vision
    ├── tech-stack.md       # Technical decisions
    └── workflow.md         # Development workflow
```

---

## 🎯 Key Features & User Flows

### 1. Studio Mode (`/studio`)

**Purpose**: Single prompt authoring with maximum control

**Features**:

- Real-time prompt validation
- Style descriptor management (genre, mood, BPM, instrumentation)
- Lyrics editor with structural tags
- Vocal direction controls
- Preview and export functionality

**Typical Flow**:

1. User selects genre and mood
2. Configures instrumentation and BPM
3. Writes lyrics with structural tags (`[Verse]`, `[Chorus]`, etc.)
4. Adds vocal directions (`[Whisper]`, `[Powerful]`, etc.)
5. Validates and exports prompt

### 2. Batch Generation (`/batch`)

**Purpose**: Create multiple variations efficiently

**Features**:

- Template-based generation
- Systematic mutation application
- Parallel generation tracking
- Result comparison and export

**Typical Flow**:

1. User creates or loads a base prompt
2. Defines mutation parameters (genre variations, BPM ranges, etc.)
3. Generates batch of variations
4. Reviews and selects best results
5. Exports selected prompts

### 3. Vision Mode (`/vision`)

**Purpose**: Transform visual inspiration into musical prompts

**Features**:

- Image upload and analysis
- Mood and atmosphere extraction
- Color-to-sound mapping
- AI-powered musical descriptor generation

**Typical Flow**:

1. User uploads an image
2. AI analyzes visual elements (colors, composition, mood)
3. System generates musical descriptors
4. User refines and exports to Studio

---

## ⚙️ Engine Architecture

### Core Engines

**1. `promptEngine.ts`** - Unified Prompt Assembly

- Combines style and lyrics into final prompt
- Validates prompt structure and content
- Ensures Suno-compatible formatting
- Handles edge cases and error states

**2. `styleEngine.ts`** - Style Management

- Genre and subgenre handling
- Mood and energy descriptors
- Instrumentation selection
- BPM and tempo management
- Production quality hints

**3. `lyricsEngine.ts`** - Lyrics & Structure

- Structural tag validation (`[Verse]`, `[Chorus]`, etc.)
- Vocal direction formatting (`[Whisper]`, `[Powerful]`, etc.)
- Lyric content validation
- Section ordering and spacing

**4. `mutationEngine.ts`** - Variation Generation

- Genre-aware mutations
- Mood preservation logic
- Instrumentation substitution
- BPM range variations
- Musical coherence validation

**5. `visionEngine.ts`** - Image Analysis

- OpenAI Vision API integration
- Color palette extraction
- Mood and atmosphere interpretation
- Musical descriptor mapping

### Engine Principles

1. **Pure Functions**: No side effects, deterministic outputs
2. **Single Responsibility**: Each engine handles one domain
3. **Comprehensive Validation**: All inputs validated before processing
4. **Well-Documented**: JSDoc comments for all public functions
5. **Fully Tested**: High test coverage (80%+ target)

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 18+
- **Component Primitives**: Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useContext)

### Backend

- **API**: Next.js API Routes
- **Validation**: Zod schemas
- **AI Services**: OpenAI API (GPT-4, Vision)
- **Database**: Supabase (planned for auth/storage)

### Development Tools

- **Testing**: Jest + ts-jest
- **Type Checking**: TypeScript compiler
- **Linting**: ESLint
- **Formatting**: Prettier (via ESLint)

---

## 🚀 Building and Running

### Development Setup

```bash
# Install dependencies
npm install

# Configure environment
# Create .env.local with:
# - OPENAI_API_KEY
# - NEXT_PUBLIC_SUPABASE_URL (optional)
# - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)

# Start development server
npm run dev
# → Application available at http://localhost:3000
```

### Testing

```bash
# Run all tests
npm test

# Watch mode (recommended during development)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Type checking
npx tsc --noEmit
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📋 Development Conventions

### Code Organization

1. **Separation of Concerns**
   - UI components in `components/`
   - Business logic in `lib/` engines
   - API routes in `app/api/`
   - Type definitions in `types/`

2. **Colocated Tests**
   - Test files live next to source: `*.test.ts`
   - Ensures tests are easy to find and maintain

3. **Type Safety**
   - All code written in TypeScript
   - Strict mode enabled
   - Explicit types for all public APIs

4. **Documentation**
   - Planning docs in `.planning/`
   - Product specs in `conductor/`
   - Development skills in `.agent/skills/`

### Naming Conventions

| Type       | Convention       | Example             |
| ---------- | ---------------- | ------------------- |
| Components | PascalCase       | `StyleControls.tsx` |
| Utilities  | camelCase        | `promptEngine.ts`   |
| Types      | PascalCase       | `PromptConfig`      |
| Constants  | UPPER_SNAKE_CASE | `MAX_PROMPT_LENGTH` |
| Functions  | camelCase        | `buildPrompt()`     |

### Code Style

- **Indentation**: 2 spaces
- **Line Length**: 100 characters (soft limit)
- **Imports**: Organized (external → internal → relative)
- **Functions**: Small and focused (< 50 lines ideal)
- **Comments**: JSDoc for public APIs, inline for complex logic

---

## 🔌 API Routes

### Available Endpoints

**`POST /api/generate`** - Generate single prompt

- **Input**: `{ style, lyrics, options? }`
- **Output**: `{ success, data: { prompt } }`

**`POST /api/mutate`** - Create prompt variations

- **Input**: `{ basePrompt, mutations }`
- **Output**: `{ success, data: { variations } }`

**`POST /api/batch`** - Batch generation

- **Input**: `{ prompts[], options }`
- **Output**: `{ success, data: { results } }`

**`POST /api/vision`** - Image-to-prompt conversion

- **Input**: `{ image, options? }`
- **Output**: `{ success, data: { prompt, analysis } }`

### API Patterns

1. **Request Validation**: All inputs validated with Zod schemas
2. **Error Handling**: Consistent error response format
3. **Status Codes**: Proper HTTP status codes (200, 400, 500)
4. **Logging**: Errors logged, but internals not exposed to clients
5. **Delegation**: Route handlers delegate to engines

---

## 🧪 Testing Strategy

### What to Test

**✅ High Priority**:

- Engine business logic
- Validation functions
- Data transformations
- API route handlers
- Edge cases and error handling

**⚠️ Medium Priority**:

- Complex UI component logic
- Integration between engines
- External API interactions (mocked)

**❌ Low Priority**:

- Simple getters/setters
- Third-party library internals
- Basic UI rendering

### Test Structure

```typescript
describe("engineName", () => {
  describe("functionName", () => {
    it("should handle normal case", () => {
      /* ... */
    });
    it("should handle edge case", () => {
      /* ... */
    });
    it("should reject invalid input", () => {
      /* ... */
    });
  });
});
```

---

## 🔐 Environment Configuration

### Required Variables

```bash
# OpenAI API (required for vision and AI features)
OPENAI_API_KEY=sk-...

# Application URL (for redirects, webhooks)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables

```bash
# Supabase (future features)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Development
NODE_ENV=development
```

### Security Notes

- **Never commit** `.env.local` or `.env` files
- **Always use** environment variables for secrets
- **Validate** required variables at application startup
- **Review** `.gitignore` includes `.env*`

---

## 📚 Additional Documentation

### For Developers

- **[AGENTS.md](./AGENTS.md)** - Comprehensive development guidelines
- **[.agent/skills/](./.agent/skills/)** - Specialized development skills
- **[.planning/](./.planning/)** - Architecture and planning docs

### For Prompt Engineers

- **[suno-prompting-compendium.md](./suno-prompting-compendium.md)** - Complete Suno prompting guide

### For Product

- **[conductor/product.md](./conductor/product.md)** - Product vision and guidelines
- **[.planning/ROADMAP.md](./.planning/ROADMAP.md)** - Development roadmap

---

## 🎯 Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm test             # Run tests
npm test -- --watch  # Watch mode
npx tsc --noEmit     # Type check
npm run build        # Production build
npm start            # Start production server
```

### Common Patterns

**Creating a new engine**:

1. Create `lib/newEngine.ts`
2. Create `lib/newEngine.test.ts`
3. Define types in `types/prompt.ts`
4. Export functions with JSDoc
5. Write comprehensive tests

**Creating a new API route**:

1. Create `app/api/endpoint/route.ts`
2. Define Zod validation schema
3. Implement POST/GET handler
4. Delegate to engine functions
5. Return consistent response format

**Creating a new component**:

1. Create `components/ComponentName.tsx`
2. Define TypeScript interface for props
3. Use Radix UI primitives from `components/ui/`
4. Apply Tailwind classes for styling
5. Handle loading and error states

---

**Last Updated**: 2026-02-17
**For Questions**: See [AGENTS.md](./AGENTS.md) or [.agent/skills/](./.agent/skills/)
