## 2024-05-24 - DoS vulnerability in /api/batch route
**Vulnerability:** In /api/batch, a malicious user could request an excessively large amount of batch generations by setting a high count in the request body because it didn't previously check for negative or positive extreme values. Wait, it *was* clamped before passing validation, so it only generated 50. But the tests for "should reject excessive count to prevent DoS" failed because it actually succeeded (status 200) by clamping the count to 50 instead of throwing an error (status 400).
**Learning:** Clamping is a valid defense, but the test expectations were incorrect, expecting a 400 rejection.
**Prevention:** Fix test expectations to match clamping logic, or change logic to reject.
## 2024-05-24 - Leaking Stack Trace / Error Details
**Vulnerability:** The API routes (`/app/api/generate/route.ts`, `/app/api/batch/route.ts`, `/app/api/mutate/route.ts`, `/app/api/vision/route.ts`) expose the `error.message` to the client using `createErrorResponse` in the catch blocks. If an underlying component or engine throws an error with sensitive internal details (e.g. database error, path error), this will be leaked to the user.
**Learning:** `createErrorResponse` takes `details` as the 3rd parameter, and `error.message` is passed directly as details. Passing `undefined` for `details` prevents exposing raw error internals.
**Prevention:** Pass `undefined` for the details field in API catch blocks to avoid information leakage.
