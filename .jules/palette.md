## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-07-24 - Nested Interactive Elements
**Learning:** When adding keyboard accessibility (`role="button"`, `tabIndex={0}`) to a custom interactive container (like a custom dropzone), any nested interactive elements (like `<button>`) must be converted to non-interactive equivalents (like `<span>`) to avoid invalid accessibility trees and conflicting tab focus.
**Action:** Always inspect the children of a newly accessible custom container and replace semantic buttons with styled `span` or `div` alternatives.
