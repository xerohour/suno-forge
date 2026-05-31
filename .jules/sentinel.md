## 2024-05-31 - Information Exposure in API Error Responses
**Vulnerability:** API routes were leaking internal error details to clients via the `details` field in `createErrorResponse`.
**Learning:** The error response helper design inadvertently encouraged passing the raw exception message to the client when a 500 error occurred, exposing backend internals.
**Prevention:** Always sanitize client-facing error messages by passing `undefined` or a generic message for internal errors, while ensuring the original error is logged securely on the server.
