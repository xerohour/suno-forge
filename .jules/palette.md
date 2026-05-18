## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-10-26 - Custom Dropzone Accessibility
**Learning:** Custom interactive elements (like a clickable `div` acting as a dropzone) must include `role="button"`, `tabIndex={0}`, keyboard event handlers (for Enter/Space), and visible focus states to be fully accessible. Furthermore, embedding a semantic `<button>` inside another element acting as a button creates invalid HTML and breaks screen reader functionality.
**Action:** When building custom interactive areas, use ARIA roles and keyboard handlers instead of nesting interactive elements, and use semantic CSS like `inline-block` on a `span` to mimic the appearance of a button without the invalid semantics.
