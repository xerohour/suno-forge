## 2025-02-17 - Information Leakage in API Error Responses
**Vulnerability:** Internal `error.message` strings were being passed to `createErrorResponse`'s `details` parameter in API catch blocks and exposed directly to the client.
**Learning:** Returning raw stack traces or internal error details to the client in HTTP responses is a common security pitfall that can aid attackers by exposing sensitive system information.
**Prevention:** Always pass `undefined` or generic, safe messages for the error details parameter in API endpoints when communicating error states to external users.
