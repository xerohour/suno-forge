## 2025-02-26 - Information Exposure in Error Handling
**Vulnerability:** API routes passed raw `error.message` directly into the `details` parameter of the `createErrorResponse` helper, exposing internal error details to the client.
**Learning:** The `createErrorResponse` helper standardizes error responses but inadvertently acts as a vector for information disclosure when used to relay raw exceptions.
**Prevention:** Always omit or pass `undefined` to the `details` parameter in client-facing error responses inside catch blocks, while keeping detailed error logging on the server-side.
