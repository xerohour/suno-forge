---
name: TypeScript Patterns
description: TypeScript best practices and patterns for the suno-forge codebase
---

# TypeScript Patterns Skill

This skill covers TypeScript conventions and patterns used in suno-forge.

## Type Definitions

### Location
All shared types are in `types/` directory:
- `types/prompt.ts` - Prompt configuration and API types

### Creating New Types

```typescript
// types/prompt.ts
export interface PromptConfig {
  style?: StyleConfig;
  lyrics?: string;
  instrumental?: boolean;
  mutations?: MutationType[];
}

export interface StyleConfig {
  genre: string;
  mood?: string;
  tempo?: string;
  instruments?: string[];
}

export type MutationType = 
  | 'instrumental'
  | 'tempo-shift'
  | 'mood-invert'
  | 'genre-blend';
```

### Type vs Interface
```typescript
// Use interface for object shapes (extendable)
interface UserConfig {
  name: string;
  preferences: Preferences;
}

// Use type for unions, intersections, primitives
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;
type ConfigWithMeta = Config & { metadata: Meta };
```

## Strict Mode Patterns

The project uses TypeScript strict mode (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Handling Null/Undefined
```typescript
// Bad: Assumes value exists
function processConfig(config: Config) {
  return config.style.genre; // Error if style is undefined
}

// Good: Check for existence
function processConfig(config: Config) {
  if (!config.style) return 'default';
  return config.style.genre;
}

// Better: Use optional chaining
function processConfig(config: Config) {
  return config.style?.genre ?? 'default';
}
```

### Type Guards
```typescript
function isStyleConfig(obj: any): obj is StyleConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'genre' in obj
  );
}

// Usage
if (isStyleConfig(input)) {
  // TypeScript knows input is StyleConfig here
  console.log(input.genre);
}
```

## API Route Types

### Request/Response Types
```typescript
// types/api.ts
export interface GenerateRequest {
  style: string;
  mood?: string;
  instrumental?: boolean;
}

export interface GenerateResponse {
  prompt: string;
  metadata: {
    generatedAt: string;
    version: string;
  };
}

export interface ErrorResponse {
  error: string;
  code?: string;
}
```

### Using in API Routes
```typescript
// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GenerateRequest, GenerateResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  const body: GenerateRequest = await request.json();
  
  // Type-safe processing
  const response: GenerateResponse = {
    prompt: generatePrompt(body),
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0'
    }
  };
  
  return NextResponse.json(response);
}
```

## Generic Patterns

### Generic Functions
```typescript
// Utility for safe array access
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Usage
const firstGenre = getFirst(['jazz', 'rock']); // string | undefined
const firstNumber = getFirst([1, 2, 3]); // number | undefined
```

### Generic Components
```typescript
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select value={getLabel(value)} onChange={(e) => {
      const option = options.find(o => getLabel(o) === e.target.value);
      if (option) onChange(option);
    }}>
      {options.map(option => (
        <option key={getLabel(option)} value={getLabel(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

## Utility Types

### Common Patterns
```typescript
// Make all properties optional
type PartialConfig = Partial<PromptConfig>;

// Make all properties required
type RequiredConfig = Required<PromptConfig>;

// Pick specific properties
type StyleOnly = Pick<PromptConfig, 'style'>;

// Omit specific properties
type NoMutations = Omit<PromptConfig, 'mutations'>;

// Extract union member
type InstrumentalOnly = Extract<MutationType, 'instrumental'>;

// Exclude union member
type NoInstrumental = Exclude<MutationType, 'instrumental'>;
```

### Custom Utility Types
```typescript
// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Function return type
type PromptResult = ReturnType<typeof generatePrompt>;
```

## Enum Alternatives

Prefer string literal unions over enums:
```typescript
// Avoid: Traditional enum
enum Genre {
  Jazz = 'jazz',
  Rock = 'rock'
}

// Prefer: String literal union
type Genre = 'jazz' | 'rock' | 'electronic' | 'classical';

// With const object for runtime access
const GENRES = {
  JAZZ: 'jazz',
  ROCK: 'rock',
  ELECTRONIC: 'electronic',
  CLASSICAL: 'classical'
} as const;

type Genre = typeof GENRES[keyof typeof GENRES];
```

## Type Inference

### Let TypeScript Infer
```typescript
// No need to specify type (inferred as string)
const genre = 'jazz';

// Inferred as { name: string; tempo: number }
const config = {
  name: 'My Song',
  tempo: 120
};

// Inferred from function return type
const prompt = generatePrompt(config);
```

### When to Annotate
```typescript
// Annotate function parameters
function buildPrompt(config: PromptConfig): string {
  // ...
}

// Annotate when inference is wrong
const genres: string[] = []; // Not const genres = []

// Annotate complex return types
function getConfig(): PromptConfig | null {
  // ...
}
```

## Error Handling

### Type-Safe Error Handling
```typescript
class PromptError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'PromptError';
  }
}

function generatePrompt(config: PromptConfig): string {
  if (!config.style) {
    throw new PromptError(
      'Style is required',
      'MISSING_STYLE',
      { config }
    );
  }
  // ...
}

// Usage
try {
  const prompt = generatePrompt(config);
} catch (error) {
  if (error instanceof PromptError) {
    console.error(`Error ${error.code}: ${error.message}`);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Best Practices

### 1. Avoid `any`
```typescript
// Bad
function process(data: any) { }

// Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is string here
  }
}
```

### 2. Use Const Assertions
```typescript
// Inferred as string[]
const genres = ['jazz', 'rock'];

// Inferred as readonly ['jazz', 'rock']
const genres = ['jazz', 'rock'] as const;
```

### 3. Discriminated Unions
```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript knows result.data exists
    console.log(result.data);
  } else {
    // TypeScript knows result.error exists
    console.error(result.error);
  }
}
```

### 4. Readonly When Possible
```typescript
interface Config {
  readonly id: string;
  readonly createdAt: Date;
  name: string; // Mutable
}

// Readonly array
function getGenres(): readonly string[] {
  return ['jazz', 'rock'];
}
```

## Type Checking

### Command Line
```bash
# Type check without building
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

### In VS Code
- Errors appear inline with red squiggles
- Hover for type information
- `Ctrl+Space` for autocomplete
- `F12` to go to definition
