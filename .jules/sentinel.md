## 2024-05-28 - Stop leaking internal error messages
**Vulnerability:** API routes were returning internal `error.message` to clients in the 500 error response details parameter.
**Learning:** Standardizing an error handler like `createErrorResponse` is good, but passing it unscrubbed internal error objects leaks implementation details.
**Prevention:** Explicitly pass `undefined` or a safe generic string to the details parameter in top-level API catch blocks.
