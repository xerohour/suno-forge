## 2024-06-01 - Prevent Information Exposure in API Error Responses
**Vulnerability:** API routes were passing internal error messages to the client in the `details` field of error responses.
**Learning:** Returning raw error messages can leak sensitive internal details to attackers. The `createErrorResponse` helper serializes all provided arguments into the JSON response.
**Prevention:** Always log detailed errors securely on the server, and omit or pass `undefined` for the `details` parameter in client-facing error responses.
