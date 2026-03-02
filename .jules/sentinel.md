## 2024-05-24 - Do Not Leak System Information

**Vulnerability:** System stack traces and errors returned via the details property of `createErrorResponse`.
**Learning:** Returning unhandled or unformatted internal API errors directly to users exposes details about our backend implementations.
**Prevention:** Always use safe, non-sensitive failure messages in external response mechanisms such as `createErrorResponse`.
