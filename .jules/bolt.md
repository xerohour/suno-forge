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

## 2025-02-18 - RegExp Callbacks vs Multiple Passes
**Learning:** Performing multiple `String.prototype.replace()` passes with a placeholder system for cyclical replacements (O(N*M)) is slow. Using a single pre-compiled regular expression with a callback mapping function (O(N)) provides an immediate ~300% performance boost and is more memory efficient.
**Action:** Always prefer a single pre-compiled regex with a callback over iterative placeholder replacements for multiple simultaneous string substitutions.

## 2025-02-18 - Object Allocation in Hot Paths
**Learning:** Re-allocating static configuration objects (like `MUTATION_HANDLERS` in `mutatePrompt`) inside functions called frequently wastes CPU cycles and stresses the garbage collector.
**Action:** Extract static configuration objects and maps to module-level constants.

## 2025-02-18 - String Formatting Overhead
**Learning:** Formatting timestamps via `new Date().toISOString().replace(...)` with regex on hot paths is noticeably slower (~30-50%) than extracting components (`.getUTCFullYear()`, etc.) and concatenating strings, because it avoids allocating intermediate strings and running regex parsing.
**Action:** Always prefer manual string concatenation over `Date` prototype methods + regex replace chains when strictly formatting timestamps on performance-critical paths.

## 2025-02-18 - Intermediate Array Allocations
**Learning:** Using `.filter(tag => tag.trim().length > 0).join(', ')` for simple string building operations creates unnecessary intermediate arrays and iterates multiple times.
**Action:** Avoid chaining array iteration methods and instead use standard `for` loops to construct strings directly, avoiding garbage collector overhead.
