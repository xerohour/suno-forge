## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Keyboard Accessible Custom File Uploaders
**Learning:** When making a custom div keyboard-accessible (like a drag-and-drop file uploader) by adding `role="button"` and `tabIndex={0}`, any nested interactive elements (like a visible 'Select File' `<button>`) must be converted to non-interactive semantic equivalents (like a `<span>`). Otherwise, screen readers and keyboard navigation may struggle with invalid nested interactive accessibility structures.
**Action:** When building complex custom interactive zones, ensure only the outer container is semantically interactive, styling inner elements to look like buttons without using actual `<button>` tags.
