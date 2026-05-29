
## 2024-05-29 - Prevent Information Exposure in API Responses
**Vulnerability:** API routes (`batch`, `generate`, `mutate`, `vision`) exposed internal error messages directly to the client via the `details` field of `createErrorResponse`.
**Learning:** Detailed error messages can leak sensitive system information (e.g., database connection strings, stack traces) to malicious actors, aiding them in further attacks.
**Prevention:** Always sanitize or omit internal error details in client-facing responses. Use generic error messages for the client while securely logging the detailed internal errors on the server.
