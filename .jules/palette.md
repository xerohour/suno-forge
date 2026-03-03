## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Keyboard Accessible Custom Dropzones
**Learning:** Custom file upload dropzones implemented with `div` elements and hidden file inputs are inaccessible to keyboard users unless explicitly managed. Furthermore, placing a visual `<button>` inside a clickable `div` (that triggers the input) creates nested interactive elements, which is invalid HTML and confuses screen readers.
**Action:** Always add `role="button"`, `tabIndex={0}`, an `aria-label`, an `onKeyDown` handler (listening for 'Enter'/'Space' to trigger the click), and `focus-visible` ring styles to the main container. Change any inner visual buttons to non-interactive semantic elements (like `<span>`) with `group-hover` styles.
