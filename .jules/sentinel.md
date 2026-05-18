## 2025-02-28 - API Error Information Leakage
**Vulnerability:** API routes (`generate`, `batch`, `mutate`, `vision`) were directly passing caught `error.message` to `createErrorResponse`'s `details` parameter, exposing potentially sensitive internal server stack traces or logic details to clients.
**Learning:** By default, error handlers were treating `error.message` as safe for client consumption. This is a common pattern that fails securely because errors thrown by lower-level libraries or DBs often include sensitive structural data.
**Prevention:** Always omit or pass `undefined` to the `details` parameter in client-facing error responses inside catch blocks, while maintaining detailed logging on the server via `console.error`.
