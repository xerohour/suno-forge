## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-07-20 - Make custom file dropzones accessible
**Learning:** When turning a custom `div` (like a drag-and-drop zone) into an interactive element (`role="button"`, `tabIndex={0}`), any nested visually-styled buttons (like `<button>SELECT FILE</button>`) must be converted to non-interactive semantics (e.g., `<span>`) to avoid invalid nested interactive accessibility structures.
**Action:** When implementing custom interactive dropzones, always convert nested visually-styled buttons to `<span>` or `<div>` to maintain valid accessibility trees while preserving visual styling.
