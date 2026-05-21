## 2024-05-24 - API Error Information Disclosure
**Vulnerability:** API route error handlers (`app/api/*/route.ts`) were passing raw internal `error.message` strings directly to the `details` parameter of `createErrorResponse`.
**Learning:** Centralized error utilities like `createErrorResponse` often have optional `details` fields that developers misuse to pass raw internal errors without considering information exposure to the client. The standard signature is `(message, status, details, code)`.
**Prevention:** When catching internal errors, explicitly pass `undefined` or omit the `details` parameter in `createErrorResponse` to prevent leaking internal logic or stack details to clients.
