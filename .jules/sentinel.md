## 2025-02-17 - Error Message Information Disclosure
**Vulnerability:** API routes were returning raw error messages from internal catch blocks directly to the client via `createErrorResponse`.
**Learning:** The `createErrorResponse` helper allows passing optional details which were mistakenly populated with internal error messages, potentially leaking stack traces or sensitive internal implementation details.
**Prevention:** Always pass `undefined` as the details parameter to client-facing error helpers inside catch blocks while keeping internal server logs (`console.error`).
