---
name: Suno Prompt Engineering
description: Working with the prompt engines and music generation logic
---

# Suno Prompt Engineering Skill

This skill covers the core prompt engineering logic in the suno-forge codebase.

## Engine Architecture

The prompt system is modular with specialized engines in `lib/`:

- **`promptEngine.ts`** - Main orchestrator, combines all components
- **`styleEngine.ts`** - Musical style and genre logic
- **`lyricsEngine.ts`** - Lyrics generation and formatting
- **`mutationEngine.ts`** - Prompt variation and mutation logic
- **`visionEngine.ts`** - Image-to-prompt generation
- **`promptPacks.ts`** - Predefined prompt templates and packs

## Working with Engines

### Adding New Style Options

1. Edit `lib/styleEngine.ts`
2. Add to the appropriate category (genre, mood, tempo, etc.)
3. Update tests in `lib/styleEngine.test.ts`
4. Run tests: `npm test`

Example:

```typescript
// In styleEngine.ts
export const GENRES = {
  // ... existing genres
  synthwave: {
    name: "Synthwave",
    tags: ["synthwave", "retro", "80s"],
    description: "Nostalgic 80s electronic sound",
  },
};
```

### Creating New Mutations

Mutations modify existing prompts. Add to `lib/mutationEngine.ts`:

```typescript
export function applyMutation(prompt: string, mutation: MutationType): string {
  switch (mutation) {
    case "instrumental":
      return prompt.replace(/\[lyrics:.*?\]/g, "[instrumental]");
    case "your-new-mutation":
      // Your logic here
      return modifiedPrompt;
    default:
      return prompt;
  }
}
```

### Testing Prompt Generation

```bash
# Run all tests
npm test

# Run specific test file
npm test -- styleEngine.test.ts

# Watch mode for development
npm test -- --watch
```

## API Integration

### Generate Endpoint

```typescript
// POST /api/generate
{
  "style": "jazz",
  "mood": "upbeat",
  "lyrics": "custom lyrics here",
  "instrumental": false
}
```

### Batch Endpoint

```typescript
// POST /api/batch
{
  "basePrompt": "...",
  "variations": 5,
  "mutationTypes": ["instrumental", "tempo-shift"]
}
```

### Vision Endpoint

```typescript
// POST /api/vision
{
  "imageDescription": "sunset over mountains",
  "style": "ambient"
}
```

## Common Tasks

### Adding a New Prompt Pack

1. Edit `lib/promptPacks.ts`
2. Add to the `PROMPT_PACKS` object:

```typescript
export const PROMPT_PACKS = {
  // ... existing packs
  "cinematic-epic": {
    name: "Cinematic Epic",
    description: "Grand orchestral compositions",
    baseStyle: {
      genre: "orchestral",
      mood: "epic",
      tempo: "moderate",
    },
    variations: [
      { name: "Battle Theme", tags: ["intense", "drums"] },
      { name: "Victory March", tags: ["triumphant", "brass"] },
    ],
  },
};
```

### Debugging Prompt Output

1. Check the generated prompt in browser console
2. Verify each engine's contribution:
   ```typescript
   console.log("Style:", styleEngine.build(config.style));
   console.log("Lyrics:", lyricsEngine.format(config.lyrics));
   console.log("Final:", promptEngine.build(config));
   ```
3. Check for conflicts (e.g., instrumental + lyrics)

### Performance Optimization

- Keep prompt generation synchronous (it's fast)
- Cache prompt packs if loading from external source
- Batch API calls when generating multiple variations

## Reference Documentation

See `suno-prompting-compendium.md` for:

- Suno-specific syntax and tags
- Best practices for prompt structure
- Genre-specific recommendations
- Advanced techniques and examples
