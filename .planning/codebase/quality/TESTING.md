# Testing Patterns

**Analysis Date:** 2026-02-17

## Test Framework

**Runner:**

- Jest 29.7.0
- Config: `jest.config.js` (`ts-jest` preset, `node` test environment, module name mapping for `@/` aliases)

**Assertion Library:**

- Jest (`expect`)

**Run Commands:**

```bash
npm test                 # Run all tests
jest                     # Run all tests (directly)
```

## Test File Organization

**Location:**

- Test files are co-located with the source files they test, typically in the same directory (e.g., `lib/promptEngine.test.ts` for `lib/promptEngine.ts`).

**Naming:**

- Test files are named with the suffix `.test.ts` (e.g., `promptEngine.test.ts`).

**Structure:**

```
[module-directory]/
├── [module-name].ts
└── [module-name].test.ts
```

## Test Structure

**Suite Organization:**

- Tests are grouped using `describe` blocks.
- Top-level `describe` for the module being tested (e.g., `describe('promptEngine')`).
- Nested `describe` blocks for specific functions or sub-units within the module (e.g., `describe('getMusicalStyle')`).

```typescript
describe("ModuleOrComponent", () => {
  // Setup (if any, often inline)

  describe("SpecificFunctionOrBehavior", () => {
    it("should describe a specific test case", () => {
      // Arrange
      // Act
      // Assert
    });
  });

  it("should describe another test case", () => {
    // ...
  });
});
```

**Patterns:**

- **Setup:** Typically done inline within each `it` block by defining test data or configurations. `beforeEach` / `afterEach` hooks were not explicitly observed in sampled files but are supported by Jest.
- **Teardown:** Not explicitly observed, implying tests are generally isolated and don't require explicit cleanup.
- **Assertion:** Uses `expect()` with various matchers.

## Mocking

**Framework:** Jest's built-in mocking capabilities.

**Patterns:**

```typescript
// File-level mock for an entire module
jest.mock("./dependencyModule", () => ({
  ...jest.requireActual("./dependencyModule"), // Optionally keep actual implementations
  functionToMock: jest.fn(() => "mocked value"), // Mock specific functions
}));

// Mocking return values for specific tests
(dependencyModule.functionToMock as jest.Mock).mockReturnValueOnce("specific mock");
```

- `jest.mock()` is used at the file level to mock entire modules (e.g., `lib/styleEngine`, `lib/lyricsEngine` in `lib/promptEngine.test.ts`).
- `jest.fn()` is used to create mock functions, allowing tracking of calls and custom return values.
- `mockReturnValueOnce()` or `mockImplementation()` are used to control the behavior of mocked functions for specific test scenarios.

**What to Mock:**

- External dependencies of the unit under test (e.g., other engine files, data fetching utilities).

**What NOT to Mock:**

- The primary unit of code being tested.

## Fixtures and Factories

**Test Data:**

```typescript
const config = {
  genre: "Synthwave",
  theme: "Neon City Night",
};
```

- Test data (e.g., configuration objects, expected return values) is typically defined directly within the `it` block where it is used.

**Location:**

- Test data is generated inline within the test function. No separate fixture files or factories were observed.

## Coverage

**Requirements:**

- Not explicitly configured for enforcement of minimum coverage percentages.
- Jest is capable of generating coverage reports.

**View Coverage:**

```bash
# Command to run tests with coverage reporting (if configured in package.json or jest.config.js)
# Example: jest --coverage
```

## Test Types

**Unit Tests:**

- The primary type of testing observed.
- Focus on isolated functions or small modules (e.g., `getMusicalStyle`, `buildStyle`, `buildPrompt`).
- Dependencies are mocked to ensure the unit under test is isolated.

**Integration Tests:**

- Implied where tests might interact with multiple internal modules without mocking all dependencies, or where higher-level components are tested using mocked external services.
- The `promptEngine` test interacting with `styleEngine` (even with a mock) borders on integration.

**E2E Tests:**

- No End-to-End testing framework or patterns were detected in the codebase.

## Common Patterns

**Async Testing:**

- Jest natively handles promises; `async/await` syntax is used within `it` blocks for asynchronous code.

```typescript
it("should handle async operations", async () => {
  const result = await someAsyncFunction();
  expect(result).toBeDefined();
});
```

**Error Testing:**

- `toThrow()` matcher is used to assert that a function call results in an expected error.

```typescript
it("should throw an error for invalid input", () => {
  expect(() => functionThatThrows("invalid")).toThrow("Expected error message");
});
```
