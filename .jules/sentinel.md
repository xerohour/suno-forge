## 2024-07-20 - Prevent Internal Error Details Leak
**Vulnerability:** API routes exposed internal error.message details to clients on 500 errors.
**Learning:** Returning unhandled exception messages to clients can leak sensitive internal system details (e.g., file paths, internal logic, or third-party API errors) in this app's architecture.
**Prevention:** Always log full errors server-side but return generic, sanitized failure messages to the client.
