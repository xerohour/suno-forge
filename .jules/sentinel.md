## 2024-08-20 - Prevent Error Message Leakage in API Routes
**Vulnerability:** API routes (`app/api/*/route.ts`) were catching unexpected errors and returning `error.message` directly in the HTTP 500 JSON response.
**Learning:** This is a systemic pattern across the Next.js API layer. In production, unhandled errors can contain sensitive system details, internal stack traces, or database connection strings within their `.message` property.
**Prevention:** Implement a secure-by-default error handler that logs the actual error securely (e.g., via `console.error`) but returns a generic, static message (like "Internal Server Error") to the client.
