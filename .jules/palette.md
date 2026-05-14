## 2024-05-14 - Keyboard accessibility for dropzones
**Learning:** Custom interactive elements like dropzones need explicit keyboard support (`role="button"`, `tabIndex={0}`, `onKeyDown`) and cannot contain nested `<button>` tags, as it creates invalid HTML and breaks screen readers.
**Action:** Always add keyboard event handlers and focus styles to custom clickable `div` elements, and replace nested buttons with styled `span` elements to preserve layout while maintaining valid DOM structure.
