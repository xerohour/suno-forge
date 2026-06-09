## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-19 - Semantic HTML in Interactive Containers
**Learning:** When creating a custom interactive container (like a clickable `div` used as a file dropzone) that requires `role="button"` and `tabIndex={0}` for accessibility, you must not nest semantic interactive elements (like `<button>`) inside it to maintain valid HTML.
**Action:** When converting a nested visually-styled `<button>` to a non-semantic element like `<span>`, explicitly add `inline-block` to ensure it retains its original box model layout (padding, transforms) and adjust hover states to use group hover (`group-hover:scale-105`) if triggered by the parent.
