## 2024-03-14 - Prevent Information Leakage in API Routes
**Vulnerability:** API routes were leaking potential stack traces and sensitive error details in the `details` field of error responses for unexpected errors.
**Learning:** `createErrorResponse` helper passes the `details` field directly to the client response. When catching unknown errors in API routes, `error.message` was being passed as the `details` argument, which could leak stack traces or internal implementation details.
**Prevention:** Always pass `undefined` or a generic string as the `details` field for unexpected errors in API routes, avoiding `error.message` or `error.stack` exposure.
