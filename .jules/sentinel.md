## 2024-05-08 - Prevent Information Leakage in API Routes
**Vulnerability:** API routes were leaking raw server-side error messages (e.g., `error.message`) to the client through the `createErrorResponse` helper's `details` parameter.
**Learning:** Returning raw error messages or stack traces in API responses exposes internal implementation details and potential system states to end-users, which can be leveraged for further attacks.
**Prevention:** Always omit or set the `details` parameter to `undefined` when creating client-facing error responses from server-side catch blocks, while continuing to securely log the full details server-side via `console.error`.
