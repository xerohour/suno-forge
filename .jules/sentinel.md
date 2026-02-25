## 2024-03-24 - API Error Information Leakage
**Vulnerability:** API endpoints were catching exceptions and returning `error.message` directly to the client in the response body.
**Learning:** This pattern exposes internal implementation details (stack traces, database errors, file paths) when unexpected errors occur, aiding potential attackers in reconnaissance.
**Prevention:** Implemented a `handleServerError` helper that logs full details server-side but returns a generic "Internal Server Error" message to the client. All API catch blocks now use this sanitizer.
