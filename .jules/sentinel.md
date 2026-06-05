## 2024-06-05 - Information Exposure in API Responses
**Vulnerability:** API routes consistently leaked internal error messages (e.g., `error.message`) to clients via the `details` field of error responses.
**Learning:** This widespread pattern suggests a lack of centralized, safe error handling, increasing the risk of exposing sensitive system internals or stack traces.
**Prevention:** Avoid passing raw `error.message` directly into `createErrorResponse`. Implement a global error handler or enforce a strict policy of providing generic error details to clients while maintaining detailed server-side logging.
