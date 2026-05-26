## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-26 - Accessible Custom Interactive Elements
**Learning:** Custom interactive elements (like `div` based dropzones) that act as buttons lack innate keyboard accessibility and can lead to invalid HTML if semantic interactive elements (`<button>`) are nested inside them.
**Action:** Always add `role="button"`, `tabIndex={0}`, a keyboard handler (for Enter/Space), and `focus-visible` styles to custom clickable elements. Ensure no interactive semantics (like buttons or links) are nested within them.
