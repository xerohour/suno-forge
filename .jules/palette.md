## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2026-08-07 - Make Dropzone Accessible
**Learning:** Focus rings on custom CSS shapes (like clip-path hexagons) can get visually clipped by the parent container. To make keyboard focus visible, the focus indicator must be applied to an inner, unclipped element using group focus utilities.
**Action:** When implementing custom shape dropzones or buttons, always apply focus styles to an inner element via `group-focus-visible` if the parent clips its bounds, and ensure nested visual buttons receive `tabIndex={-1}`.
