## 2024-05-24 - API Error Response Leakage
**Vulnerability:** API routes leaked internal error details to clients.
**Learning:** The codebase-specific `createErrorResponse` helper was systematically misused across all route `catch` blocks to serialize raw `error.message` values into the `details` field.
**Prevention:** Always omit the `details` argument for server-side exceptions when using `createErrorResponse`, relying exclusively on `console.error` for internal debugging observability.
