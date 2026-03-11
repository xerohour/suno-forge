
## 2024-03-11 - Prevent Internal Error Details Exposure
**Vulnerability:** API routes (`/api/generate`, `/api/batch`, `/api/mutate`, `/api/vision`) caught server-side errors and explicitly extracted `error.message` (or "Unknown error") and passed it to the client via `createErrorResponse`.
**Learning:** This practice unintentionally leaks potentially sensitive internal operational details, stack trace remnants, or backend infrastructure info to external users when a 500 server error occurs. While the `createErrorResponse` helper accepts a `details` string parameter, populating it with raw `error.message` circumvents secure failure principles.
**Prevention:** In API route top-level `catch` blocks, log the detailed error internally using `console.error` but pass `undefined` as the `details` parameter to `createErrorResponse`. The response should provide a generic message like "Failed to generate prompt" without specific execution details.
