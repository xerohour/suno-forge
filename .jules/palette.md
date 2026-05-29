## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-29 - Custom Dropzone Accessibility
**Learning:** Custom clickable `div` elements used as file dropzones completely break keyboard navigation if they lack proper ARIA roles and keyboard event handlers. Additionally, nesting a semantic `<button>` inside a clickable `div` creates invalid HTML that confuses screen readers.
**Action:** Always add `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers (for Enter/Space) to interactive `div`s, ensure visible focus states (`focus-visible:ring-2`), and replace nested `<button>` elements with `<span>` when the parent `div` is the actual interactive element.
