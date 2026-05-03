## 2025-02-27 - Information Leakage in API Error Responses
**Vulnerability:** API endpoints (`/api/vision`, `/api/batch`, `/api/generate`, `/api/mutate`) were passing raw `error.message` strings directly to the client-facing `createErrorResponse` helper when exceptions occurred.
**Learning:** This exposed internal application state or downstream service errors directly to clients, which is an information disclosure risk. The `createErrorResponse` helper supports a `details` parameter that was inadvertently being used for this raw error string.
**Prevention:** Always pass `undefined` to the `details` argument of `createErrorResponse` in production API endpoints, while maintaining internal visibility by using `console.error` for the raw error object before returning the response.
