## 2025-02-27 - NaN Bypass in JavaScript Validation
**Vulnerability:** In JavaScript, `typeof NaN === 'number'` evaluates to `true`, allowing `NaN` values to bypass naive `typeof !== 'number'` type checks. Furthermore, relational comparisons involving `NaN` (e.g., `NaN < 1` or `NaN > 50`) evaluate to `false`, allowing `NaN` to silently bypass range checks as well.
**Learning:** Naive `typeof` checks for numbers are insufficient in JavaScript for robust validation when dealing with potentially malicious or malformed input payloads.
**Prevention:** Always pair `typeof !== 'number'` with `Number.isNaN(value)` when validating numeric inputs in JavaScript to ensure strict type safety.
