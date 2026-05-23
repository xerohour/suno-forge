## 2024-05-23 - Prevent Information Exposure in API Error Responses
**Vulnerability:** Internal error messages were being leaked to the client through the `details` parameter in API catch blocks (e.g., in `app/api/vision/route.ts`, `app/api/batch/route.ts`, `app/api/mutate/route.ts`, `app/api/generate/route.ts`).
**Learning:** Returning `error.message` or `error.stack` as part of standard API error responses exposes implementation details, which could aid attackers in discovering system architecture, underlying libraries, or database structures.
**Prevention:** Always omit or explicitly set to `undefined` any error details meant for internal logging when constructing client-facing HTTP error responses, ensuring only generic error messages and codes are returned.
