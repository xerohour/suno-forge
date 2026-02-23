# Sentinel's Journal

## 2025-02-23 - Batch API Test Mismatch
**Vulnerability:** The `app/api/batch` tests expected the API to clamp excessive counts (DoS prevention via sanitization), but the implementation strictly rejected them (DoS prevention via validation). This left the tests broken and the behavior misunderstood.
**Learning:** Tests can drift from implementation or be written with incorrect assumptions, masking the true behavior. Strict validation is generally safer than silent clamping for APIs as it avoids ambiguity.
**Prevention:** Always verify that tests pass and match the implementation's security logic. prefer strict validation over sanitization for API limits.
