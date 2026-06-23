## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-24 - Custom Dropzone Accessibility & Valid HTML
**Learning:** The custom file dropzone component in the Vision app uses nested interactive elements (a button inside a clickable div), leading to invalid HTML and a lack of keyboard accessibility.
**Action:** When creating custom interactive dropzone containers, use `role="button"`, `tabIndex={0}`, and handle `onKeyDown` for Enter/Space on the parent container. Convert visually-nested interactive elements like `<button>` to styled `<span>`s with `inline-block` and use `group-hover` utilities to preserve layout, maintain valid HTML semantics, and ensure full accessibility.
