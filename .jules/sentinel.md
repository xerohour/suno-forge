## 2024-07-14 - Information Leakage in API Routes
**Vulnerability:** API routes were returning internal error messages (`error.message`) in the `details` field of the error response when catching unhandled exceptions.
**Learning:** It's a common pattern to pass the caught error message back to the client for debugging, but in production, this can expose sensitive internal logic, stack traces, or configuration details. This is especially risky in a Next.js environment where backend and frontend logic can blur.
**Prevention:** Always sanitize error messages returned to the client. Use a generic message like "An unexpected error occurred" for server errors while logging the detailed, raw error message server-side for debugging.
