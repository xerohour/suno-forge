## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2025-07-27 - Fixing Invalid Nested Interactive Elements in Custom Triggers
**Learning:** When making a custom container (like a custom file dropzone `div`) keyboard-accessible by adding `role="button"` and `tabIndex={0}`, you cannot have native interactive elements (like a nested `<button>`) inside it, as this creates an invalid nested interactive accessibility structure.
**Action:** When creating custom interactive containers, convert any nested child elements meant to look like buttons into non-interactive semantic equivalents (e.g., a `<span>` styled with button classes) to preserve visual intent while maintaining valid accessibility trees.
