## 2024-05-24 - API Information Exposure
**Vulnerability:** Internal error messages were directly passed to `createErrorResponse` and leaked to the client via API endpoints.
**Learning:** Returning `error.message` directly in a catch block can expose stack traces, database structure, or internal keys to malicious actors.
**Prevention:** Always sanitize or omit internal error details when generating client-facing HTTP responses, relying instead on secure server-side logging (`console.error`).
