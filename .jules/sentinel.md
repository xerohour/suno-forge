## 2026-05-17 - Information Exposure in API Routes
**Vulnerability:** API routes (`vision`, `batch`, `mutate`, `generate`) passed `error.message` or stack traces directly to `createErrorResponse`'s `details` parameter.
**Learning:** Internal server errors and raw error messages from inner layers (`buildPrompt`, `mutatePrompt`) can expose sensitive system context and details when passed unprotected to a client-facing helper.
**Prevention:** Always omit or pass `undefined` to the `details` parameter in standard API error responders (`createErrorResponse`) while maintaining detailed error logging on the server-side via `console.error`.
