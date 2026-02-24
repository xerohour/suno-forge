## 2024-05-22 - [Exposing Internal Error Details]
**Vulnerability:** API endpoints were returning raw `error.message` to the client in 500 responses.
**Learning:** This can leak sensitive internal details (stack traces, library errors, database connection info) to potential attackers.
**Prevention:** Always catch errors at the API boundary, log them server-side, and return a generic "Internal Server Error" message to the client.
