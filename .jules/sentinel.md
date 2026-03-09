## 2026-03-09 - Prevent internal error leakage in API responses
**Vulnerability:** API routes were passing `error.message` from caught exceptions directly into the response payload via `createErrorResponse()`, potentially exposing internal stack traces, paths, or execution details to the client.
**Learning:** Returning explicit internal error strings circumvents security-in-depth principles. Attackers can leverage detailed error output to infer application state, internal logic, or structure.
**Prevention:** In `catch` blocks of API endpoints, replace explicit internal strings such as `errorMessage` with `undefined` when constructing public-facing error responses. Use generalized messages and rely on internal server logging for debugging.
