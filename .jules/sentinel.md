
## 2024-05-01 - Prevent Information Disclosure in API Routes
**Vulnerability:** API routes were leaking internal error messages and stack traces to clients in their catch blocks by passing raw error messages to the `createErrorResponse` helper.
**Learning:** Returning `error.message` from a try/catch block can expose sensitive system internals. The `createErrorResponse` helper accepts a `details` parameter which should be omitted or set to `undefined` to ensure security.
**Prevention:** Always sanitize error messages returned to the client and avoid passing raw error details to client-facing helper functions.
