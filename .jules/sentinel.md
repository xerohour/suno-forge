## 2024-05-24 - Missing Security Headers Next.js

**Vulnerability:** Next.js `next.config.mjs` was missing security headers, specifically `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, and `Strict-Transport-Security`.
**Learning:** Next.js does not provide these out-of-the-box in `next.config.js`. They must be explicitly configured to prevent common web vulnerabilities like XSS, Clickjacking, and MIME-sniffing.
**Prevention:** Always verify that security headers are configured using `next.config.mjs` (or `.js`) `headers()` function when working with Next.js applications.
