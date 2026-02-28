## 2025-02-18 - Bun Test Requirement
**Learning:** `npm test` fails in this environment due to network restrictions and configuration issues with `ts-jest`. `bun test` works out of the box and is significantly faster.
**Action:** Always use `bun test` for running tests in this repository.

## 2025-02-18 - Static String Pre-computation
**Learning:** `GENRE_DATA` contained static arrays that were joined into strings on every `buildStyle` call. Pre-computing these strings saves CPU cycles on a hot path.
**Action:** Look for other static data structures that are transformed at runtime and pre-compute them if possible.

## 2025-02-18 - Exception Handling Overhead
**Learning:** Using `try-catch` for expected control flow (e.g., handling unknown genres) introduces unnecessary overhead. Returning `undefined` and checking for it is significantly faster.
**Action:** Avoid exceptions for non-exceptional cases; use `undefined` or `Result` types for expected failures.

## 2025-02-18 - Array Chaining vs Loops
**Learning:** Chaining `.filter().map()` creates intermediate arrays and iterates multiple times. For hot paths, a single `for` loop is more memory efficient and faster.
**Action:** Prefer single loops over array method chains in performance-critical code sections.

## 2025-02-28 - Mutation Engine Optimization
**Learning:** `mutatePrompt` in `lib/mutationEngine.ts` reconstructed its `mutations` configuration object (including multiple `RegExp`s and a 10-item mapping) on every invocation. The `mood-invert` mutation was particularly slow (~550ms per 10k calls) because it iterated over keys and performed two passes with placeholders to avoid circular replacements.
**Action:** Extract static data structures (`MOOD_MAP`, `MUTATION_HANDLERS`) outside the function scope. Use a single pre-compiled regex with a replacer function for `mood-invert` to process multiple words in one pass and avoid circular replacements natively. This reduced the time for 10k calls from 550ms to 14ms (a 97% reduction) while passing all existing tests.
