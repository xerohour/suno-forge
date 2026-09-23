## 2024-07-29 - Regex Injection Vulnerability in Dynamic Regex Construction
**Vulnerability:** A regular expression (`MOOD_REGEX`) was constructed dynamically from object keys without escaping them, creating a potential regex injection vulnerability if those keys ever included special regex characters.
**Learning:** Dynamically constructing regex from array or object keys without escaping values can introduce subtle and dangerous vulnerabilities that might remain hidden until the underlying data structures are modified.
**Prevention:** Always escape string values (e.g., using a replacer like `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`) before joining them to form a dynamic regular expression, even if the current static keys appear safe.
