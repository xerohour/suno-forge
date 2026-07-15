## 2025-07-15 - Prevent Information Leakage in Error Handlers
**Vulnerability:** Internal error messages (such as `error.message`) were directly passed into error response details in multiple Next.js API routes (`batch/route.ts`, `generate/route.ts`, `mutate/route.ts`, `vision/route.ts`), which could leak sensitive internal state, file paths, or backend mechanics to end users.
**Learning:** Returning un-sanitized exception messages from the server side poses a risk of exposing implementation details that attackers can use to map the system.
**Prevention:** Always substitute actual `error.message` data with generic, secure error messages ("An unexpected error occurred") before returning 500 status codes in API handlers. Only log the sensitive specifics to the server console.
