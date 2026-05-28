
## 2024-05-24 - Information Disclosure in API Error Responses
**Vulnerability:** The API routes (`vision`, `batch`, `mutate`, `generate`) were catching internal errors and passing the `error.message` directly into the `details` field of the `createErrorResponse` helper, which returns it to the client. This could leak sensitive internal application state, stack traces, or external service details.
**Learning:** When standardizing error responses using a helper like `createErrorResponse(message, status, details, code)`, it is easy to accidentally leak internal error strings into the `details` field during catch blocks. The original error should only be logged to the server console.
**Prevention:** Always omit or explicitly set to `undefined` the error details in client-facing responses for 500 Internal Server Errors, while maintaining secure logging (e.g., `console.error`) on the backend.
