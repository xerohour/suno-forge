## 2024-05-19 - API Route Error Handling Information Leakage
**Vulnerability:** API routes (`vision`, `batch`, `mutate`, `generate`) were leaking raw error messages (including stack traces or internal implementation details) to the client by passing `error.message` to `createErrorResponse` in their `catch` blocks.
**Learning:** `createErrorResponse` serializes its parameters into top-level properties in the response payload. Passing raw error messages directly exposes server-side details.
**Prevention:** Always explicitly pass `undefined` for the `details` parameter in client-facing error responses, while maintaining detailed server-side logging using `console.error`.
