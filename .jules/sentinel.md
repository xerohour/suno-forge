## 2023-10-24 - Input Clamping Security Anti-Pattern
**Vulnerability:** The batch generation API was silently clamping out-of-bounds `count` values (e.g. from 1000 down to 50) and processing the clamped value instead of rejecting the invalid payload.
**Learning:** Normalizing or "fixing" input before validation is a security anti-pattern because it silently accepts potentially malicious payloads (DoS attempt via excessive resource request) instead of explicitly rejecting them. It also hides the true intent of the request and bypasses the fail-fast principle.
**Prevention:** Always validate the raw request payload strictly against bounds and types BEFORE making any modifications. Return a 400 Bad Request if validation fails to explicitly deny excessive or malformed requests.
