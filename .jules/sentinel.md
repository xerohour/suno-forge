## 2024-05-22 - Missing Input Validation
**Vulnerability:** API endpoints lacked length validation for string inputs, exposing the application to potential DoS attacks via large payloads.
**Learning:** Default validation often overlooks string length. Explicit limits (MAX_TITLE_LENGTH, etc.) must be enforced at the validation layer.
**Prevention:** Always define and enforce maximum lengths for user-controlled string inputs in `lib/validation.ts`.
