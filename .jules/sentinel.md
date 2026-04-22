## 2024-05-24 - Do Not Leak Error Details in API Responses
**Vulnerability:** API routes (`app/api/*/route.ts`) were extracting the raw error message (`error.message`) and sending it to clients via the `details` field in `createErrorResponse`.
**Learning:** This exposes internal server state and stack trace hints, which an attacker can use to understand the system and craft further exploits.
**Prevention:** Pass `undefined` instead of raw error messages to the `details` field in `createErrorResponse` to prevent information leakage while returning a generic server error to the client.
