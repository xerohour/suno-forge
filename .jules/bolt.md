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
## 2025-02-18 - String Cleaning Optimization
**Learning:** `split('\n')` combined with iterative array mapping and joining is surprisingly slow for string cleaning tasks, as it causes massive object allocations for large strings. Native Regular Expressions (`replace` with global flags) are much faster and more memory-efficient.
**Action:** Replace line-by-line string parsing loops with single-pass Regex replacements on the full string block in performance-critical text processing.
## 2025-02-18 - Single Pass Loop String Building
**Learning:** In highly called functions like `buildStyle`, building an array, filtering it, converting it to a `Set` for uniqueness, converting back to an array, and finally `.join()`ing is slow and creates many temporary objects.
**Action:** Use a single `for` loop to build a string dynamically with a `Set` for tracking uniqueness to significantly reduce overhead in hot paths.
