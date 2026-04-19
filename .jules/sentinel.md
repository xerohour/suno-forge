## 2025-02-19 - Replacing Input Clamping with Fail-Fast Validation
**Vulnerability:** The `/api/batch` endpoint clamped the `count` parameter to fit within expected bounds instead of validating it, silently ignoring potentially malicious payloads and masking the error from the client.
**Learning:** Clamping is a form of silent mutation that can obscure malicious intent and make it harder to detect Denial of Service (DoS) attempts where users intentionally send excessively large values.
**Prevention:** Always prefer strict, fail-fast validation and return explicit `400 Bad Request` errors instead of silently fixing out-of-bounds input.
