---
name: Testing with Jest
description: Writing and running tests for the suno-forge codebase
---

# Testing with Jest Skill

This skill covers testing practices for the suno-forge project using Jest and ts-jest.

## Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run specific test file
npm test -- promptEngine.test.ts

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run tests matching a pattern
npm test -- --testNamePattern="should generate"
```

### Debugging Tests
```bash
# Run tests with verbose output
npm test -- --verbose

# Run a single test file with debugging
node --inspect-brk node_modules/.bin/jest lib/styleEngine.test.ts
```

## Writing Tests

### Test File Structure
Tests are colocated with source files in `lib/`:
- `promptEngine.ts` → `promptEngine.test.ts`
- `styleEngine.ts` → `styleEngine.test.ts`

### Basic Test Template
```typescript
import { functionToTest } from './moduleName';

describe('ModuleName', () => {
  describe('functionToTest', () => {
    it('should handle basic case', () => {
      const result = functionToTest('input');
      expect(result).toBe('expected output');
    });

    it('should handle edge cases', () => {
      expect(() => functionToTest(null)).toThrow();
    });
  });
});
```

### Testing Prompt Engines

Example from `styleEngine.test.ts`:
```typescript
import { buildStylePrompt, GENRES } from './styleEngine';

describe('styleEngine', () => {
  it('should generate jazz style prompt', () => {
    const config = {
      genre: 'jazz',
      mood: 'relaxed',
      tempo: 'slow'
    };
    const result = buildStylePrompt(config);
    expect(result).toContain('jazz');
    expect(result).toContain('relaxed');
  });

  it('should handle missing optional fields', () => {
    const config = { genre: 'rock' };
    const result = buildStylePrompt(config);
    expect(result).toBeTruthy();
  });
});
```

### Testing API Routes

For API routes, test the underlying logic separately:
```typescript
// Test the engine logic, not the HTTP layer
import { generatePrompt } from '@/lib/promptEngine';

describe('Generate API Logic', () => {
  it('should create valid prompt from config', () => {
    const config = {
      style: 'ambient',
      instrumental: true
    };
    const prompt = generatePrompt(config);
    expect(prompt).toContain('ambient');
    expect(prompt).toContain('[instrumental]');
  });
});
```

## Common Testing Patterns

### Testing Mutations
```typescript
import { applyMutation } from './mutationEngine';

describe('mutationEngine', () => {
  it('should convert to instrumental', () => {
    const original = '[lyrics: verse 1] Hello world';
    const result = applyMutation(original, 'instrumental');
    expect(result).not.toContain('lyrics');
    expect(result).toContain('[instrumental]');
  });
});
```

### Testing with Mock Data
```typescript
const mockPromptConfig = {
  style: 'test-style',
  mood: 'test-mood',
  lyrics: 'test lyrics',
  instrumental: false
};

it('should handle mock config', () => {
  const result = promptEngine.build(mockPromptConfig);
  expect(result).toBeDefined();
});
```

### Snapshot Testing
```typescript
it('should match prompt snapshot', () => {
  const config = { genre: 'jazz', mood: 'upbeat' };
  const prompt = buildStylePrompt(config);
  expect(prompt).toMatchSnapshot();
});
```

## Coverage Guidelines

### Checking Coverage
```bash
npm test -- --coverage
```

Coverage reports are generated in `coverage/` directory.

### What to Test
- ✅ All engine functions (`lib/*Engine.ts`)
- ✅ Prompt building logic
- ✅ Mutation transformations
- ✅ Edge cases (null, undefined, empty strings)
- ⚠️ UI components (manual validation acceptable)
- ❌ Next.js framework code (not necessary)

### Coverage Targets
- Aim for >80% coverage on engine files
- 100% coverage on critical prompt logic
- Document any intentionally untested code

## Troubleshooting

### TypeScript Errors in Tests
```bash
# Ensure ts-jest is configured
# Check jest.config.js has:
{
  preset: 'ts-jest',
  testEnvironment: 'node'
}
```

### Tests Failing After Changes
1. Check if test expectations need updating
2. Run `npx tsc --noEmit` to catch type errors
3. Clear Jest cache: `npm test -- --clearCache`

### Slow Tests
- Avoid external API calls in tests
- Use mocks for heavy operations
- Run specific test files during development

## Best Practices

1. **Test behavior, not implementation** - Focus on inputs/outputs
2. **Keep tests simple** - One assertion per test when possible
3. **Use descriptive names** - `it('should generate instrumental tag when instrumental is true')`
4. **Test edge cases** - Empty strings, null, undefined, invalid inputs
5. **Update tests with code** - Tests should evolve with the codebase
