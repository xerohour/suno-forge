## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2025-08-08 - Keyboard Navigation for custom clipped Dropzones
**Learning:** When using `clip-path` (e.g. for hexagon shapes) with Tailwind, applying standard focus rings (`focus-visible:ring-2`) to the outer container hides the focus state as it gets clipped.
**Action:** When adding keyboard support to a clipped shape, use `group` and `focus:outline-none` on the interactive parent, then apply `group-focus-visible` to an inner border element to ensure the focus ring is visually apparent for keyboard users.
