## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-10-24 - Dropzone Accessibility and Nested Interactive Elements
**Learning:** When making custom shapes (like a clip-path hexagon) keyboard accessible, standard focus rings on the parent container often get clipped. Additionally, converting a container to `role="button"` prohibits nesting other interactive elements like actual `<button>` tags within it.
**Action:** Apply the `group` class to the outer accessible container, and use `group-focus-visible` to style an inner, unclipped element for the focus ring. Replace any visually nested buttons with non-interactive elements like `<span>` or `<div>` to maintain ARIA compliance.
