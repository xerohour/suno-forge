## 2024-05-15 - Prevent Information Leakage in API Error Responses
**Vulnerability:** The API routes (`batch`, `generate`, `mutate`, `vision`) were leaking raw `error.message` details directly to the client via the `createErrorResponse` helper's `details` argument.
**Learning:** Detailed error messages can inadvertently expose internal server paths, database queries, or underlying system architecture, which attackers can use to gather intelligence for further attacks.
**Prevention:** In API catch blocks, ensure that the `details` field (or equivalent) in generic 500 responses is set to `undefined` (or intentionally sanitized) to prevent raw error strings from reaching the client.
