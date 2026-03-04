## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Keyboard Accessibility for Custom Dropzones
**Learning:** When creating custom file upload dropzones out of structural elements like `div`, they are implicitly hidden from screen readers and lack keyboard events. Adding `role="button"`, `tabIndex={0}`, an `aria-label`, and an `onKeyDown` handler (to capture Space/Enter) is critical. Additionally, rendering a `<button>` *inside* an interactive dropzone `div` creates invalid HTML that can break accessibility tree interpretation.
**Action:** Always test custom interactive `div` elements with a keyboard (Tab, Enter, Space). Ensure they have focus styles (`focus-visible`) and avoid nesting interactive elements (e.g., replace an internal visual-only `<button>` with a styled `<span>`).
