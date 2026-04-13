## 2024-04-13 - Insecure Input Clamping vs Rejecting
**Vulnerability:** The batch API (`/api/batch`) was previously clamping out-of-bounds `count` inputs (e.g., `count: 1000`) into a valid range (`1-50`) instead of rejecting them.
**Learning:** Normalizing or "fixing" input before validation is a security anti-pattern because it masks malicious intent or bad integrations. An excessively large batch count is a potential DoS vector; silently clamping it obscures the fact that a client is sending invalid data.
**Prevention:** Always validate the raw request bodies and return a `400 Bad Request` to fail fast, preserving any default fallback logic for optional parameters (e.g., defaulting missing `count` to 1).
