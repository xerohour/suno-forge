## 2024-05-15 - Information Exposure via API Error Responses
**Vulnerability:** API routes (`generate`, `batch`, `vision`, `mutate`) were returning `error.message` directly in 500 error responses via `createErrorResponse`.
**Learning:** `createErrorResponse` parameter `details` was exposing internal errors, potentially leaking implementation details or sensitive information to the client.
**Prevention:** Do not pass the caught error message into the `details` parameter of `createErrorResponse`. Pass `undefined` instead.
