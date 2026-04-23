## 2025-02-14 - Prevent Type coercion/NaN bypass in numeric validation
**Vulnerability:** Input validation that relies strictly on `typeof count !== 'number'` can be bypassed because `typeof NaN === 'number'`, leading to downstream issues (e.g., allocating extremely large empty arrays).
**Learning:** `typeof` checks are insufficient for JavaScript numeric inputs.
**Prevention:** Always pair `typeof x !== 'number'` with `Number.isNaN(x)` when validating numeric inputs to ensure they are true numbers before performing range checks.
