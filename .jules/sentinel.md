## 2025-01-20 - Prevent Error Message Leakage in API Routes
**Vulnerability:** Raw error messages and internal details were being leaked to the client through the `createErrorResponse` helper in catch blocks of API routes (e.g., `app/api/vision/route.ts`, `app/api/batch/route.ts`, `app/api/mutate/route.ts`, `app/api/generate/route.ts`).
**Learning:** The `createErrorResponse` helper includes the provided `details` string in the client response. When passing `error.message` or stack traces as the `details` argument in API catch blocks, sensitive internal information could be exposed to users or attackers.
**Prevention:** API catch blocks must pass `undefined` for the details field instead of raw `error.message` strings or stack traces to `createErrorResponse`.
