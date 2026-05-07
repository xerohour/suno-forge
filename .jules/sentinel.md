
## 2024-05-24 - Information Leakage in API Error Responses
**Vulnerability:** Raw error messages and stack traces were being passed directly to the client via `createErrorResponse` in API route catch blocks.
**Learning:** It is important to separate server-side logging from client-facing error messages to prevent exposing sensitive internal implementation details.
**Prevention:** Always pass `undefined` for the details parameter in client-facing error responses in catch blocks, and rely on server-side logging (`console.error`) for debugging.
