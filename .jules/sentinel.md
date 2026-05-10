## 2024-05-10 - Prevent Error Message Leakage
**Vulnerability:** API routes were leaking internal error messages and potentially stack traces to the client by passing `error.message` directly to the `createErrorResponse` helper.
**Learning:** Raw error objects can contain sensitive internal information, file paths, or implementation details that an attacker could use to understand the system's architecture.
**Prevention:** Never pass raw error messages directly to client-facing error responses. Explicitly omit the `details` parameter in standard error helpers or provide a sanitized, generic error string instead, while maintaining detailed logging on the server side.
