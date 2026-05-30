## 2024-05-24 - Information Exposure in API Error Responses
**Vulnerability:** API routes were passing internal error messages to `createErrorResponse`, exposing sensitive internal details to the client.
**Learning:** Passing the actual error message as the `details` parameter to the error response helper inadvertently leaked internal system state, while server-side logging was already correctly implemented.
**Prevention:** Always omit internal error details when generating client-facing API responses, instead passing `undefined` for details, while relying on `console.error` for backend debugging.
