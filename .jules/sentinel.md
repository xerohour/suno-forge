## 2024-03-14 - Secure Error Handling
**Vulnerability:** API routes returned `error.message` directly in 500 responses, potentially leaking sensitive implementation details, stack traces, or internal system states to clients.
**Learning:** Exposing raw error details in client responses violates the "Fail securely" principle and can provide attackers with insights into the system's architecture or vulnerabilities.
**Prevention:** Catch blocks must log detailed errors securely on the server (e.g., via `console.error`) while returning only safe, generic error messages (or `undefined` for details) to the client.
