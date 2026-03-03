## Sentinel's Journal
## 2026-03-03 - Prevent error details leakage in API routes
**Vulnerability:** API routes were returning `error.message` directly in the error response, potentially leaking sensitive internal details like stack traces or file paths.
**Learning:** Returning unhandled error messages to the client is a security risk. Instead, log the detailed error internally and return a generic error message to the client.
**Prevention:** Always use generic error messages for client-facing API responses, and ensure error details are logged securely on the server.
