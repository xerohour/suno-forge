## 2025-02-18 - Bun Test Requirement
**Learning:** `npm test` fails in this environment due to network restrictions and configuration issues with `ts-jest`. `bun test` works out of the box and is significantly faster.
**Action:** Always use `bun test` for running tests in this repository.

## 2025-02-18 - Static String Pre-computation
**Learning:** `GENRE_DATA` contained static arrays that were joined into strings on every `buildStyle` call. Pre-computing these strings saves CPU cycles on a hot path.
**Action:** Look for other static data structures that are transformed at runtime and pre-compute them if possible.

## 2025-02-18 - Exceptions as Control Flow
**Learning:** `getMusicalStyle` was throwing an Error for unknown genres, which is a common case for user input. This causes performance overhead due to stack unwinding.
**Action:** Return `undefined` or `null` for expected "not found" cases instead of throwing, and handle it gracefully in the caller.
