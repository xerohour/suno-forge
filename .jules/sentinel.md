## 2024-05-24 - Prevent Regex Injection in Mutation Engine
**Vulnerability:** Constructing a regular expression from dynamically joined dictionary keys without escaping them first.
**Learning:** Even when using hardcoded dictionary keys, directly passing `.join('|')` output into `new RegExp()` introduces a potential regex injection vulnerability if any special characters are present or added in the future.
**Prevention:** Always escape dictionary keys or external strings using a regex escaper like `.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')` before joining them dynamically into a `new RegExp()`.
