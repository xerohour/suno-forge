## 2024-05-25 - Prevented Stack Trace Leakage
**Vulnerability:** API routes were leaking internal error messages from the try/catch block to clients.
**Learning:** Found a consistent pattern where `error.message` was extracted and passed to `createErrorResponse` as `details`.
**Prevention:** Remove error details in production, pass undefined, and add `// Security: Do not expose internal error details to the client`.
