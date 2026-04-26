## 2026-04-26 - Prevent Information Disclosure in Error Responses
**Vulnerability:** API routes were leaking internal error messages and potentially stack traces directly to the client via the `createErrorResponse` helper.
**Learning:** Exception handling `catch (error)` blocks often naively pass `error.message` to unified error formatting utilities, creating an unintentional vector for disclosing sensitive system structures or API failures.
**Prevention:** Always sanitize client-facing error responses. Explicitly separate detailed server-side error logging (`console.error(error)`) from the sanitized, generic messages returned to the client (e.g., passing `undefined` or generic string literals for details).
