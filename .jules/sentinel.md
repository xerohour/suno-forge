## 2024-06-02 - Information Exposure in API Error Responses
**Vulnerability:** API routes (batch, generate, mutate, vision) exposed internal error details (e.g., stack traces or internal messages from `Error.message`) to the client via `createErrorResponse`'s `details` parameter.
**Learning:** Catch blocks were extracting the internal `Error.message` and passing it to the client to provide more context, violating secure failure principles.
**Prevention:** Always omit internal error details in client-facing error responses. Securely log internal errors to the server console instead and return generic client-safe error messages.
