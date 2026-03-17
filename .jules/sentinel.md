## 2025-02-14 - Information Leakage in API Error Responses
**Vulnerability:** Internal error details (like stack traces or error messages) were being passed to the client through the `createErrorResponse` helper function in API `catch` blocks.
**Learning:** Returning unhandled error messages to the client can leak sensitive information about the backend infrastructure and the inner workings of the codebase to malicious users.
**Prevention:** Always pass `undefined` as the `details` field to functions like `createErrorResponse` for generic error reporting in `catch` blocks of client-facing APIs instead of raw `error.message` strings or stack traces.
