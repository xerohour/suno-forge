## 2025-02-27 - Insecure Input Clamping Bypass

**Vulnerability:** The batch API endpoint (`app/api/batch/route.ts`) attempted to enforce limits on the `count` parameter by silently clamping it (`Math.max(1, Math.min(50, rawCount))`). However, this bypasses validation if `rawCount` is passed as `NaN`, since `typeof NaN === 'number'`, but `Math` operations with `NaN` return `NaN`, violating bounds and causing downstream errors.

**Learning:** Normalizing or "fixing" input before validation is a security anti-pattern. Silent clamping not only hides invalid requests from clients but introduces edge cases (like `NaN` bypass) where validation boundaries are defeated.

**Prevention:** Always validate raw request bodies strictly *before* doing any processing. If parameters are out-of-bounds or of the wrong type (including explicit `Number.isNaN` checks), return a 400 Bad Request to fail-fast. Default fallbacks should only be applied to undefined/missing values, not to override malformed input.
