## 2024-06-15 - Prevent Error Detail Leakage in API Routes
**Vulnerability:** API routes (`vision`, `batch`, `mutate`, `generate`) were catching internal errors and passing the raw `error.message` (or stack trace) directly to the client via `createErrorResponse`.
**Learning:** Developers often pass `error.message` to client responses for debugging purposes during development, but this leaks internal server details and potential system paths in production.
**Prevention:** In production, catch blocks should log the detailed error internally (`console.error`) but return generic, safe messages to the client without exposing the underlying implementation details. Pass `undefined` for `details` in `createErrorResponse` to ensure no sensitive information is leaked.
