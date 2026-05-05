## 2024-05-05 - Do not expose error.message to external clients
**Vulnerability:** API routes were capturing raw `error.message` (from caught Exceptions/Errors) and passing it directly as the `details` field to the client-facing `createErrorResponse` helper.
**Learning:** This leaks internal error details, stack traces, or potentially sensitive system information to external clients when unexpected failures occur.
**Prevention:** Pass `undefined` (or omit) the `details` parameter in public-facing error responses while preserving the detailed `console.error` logs on the server side for debugging.
