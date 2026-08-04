## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2025-05-22 - Clipped Focus Rings on Clip-Path Shapes
**Learning:** When styling custom shapes using clip-path with Tailwind, standard focus rings on the parent container get clipped and hidden.
**Action:** Apply focus styles to an inner, unclipped element using the group-focus-visible utility class (e.g., group-focus-visible:border-primary) on the inner element and focus-visible:outline-none on the parent.
