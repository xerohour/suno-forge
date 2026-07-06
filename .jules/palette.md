## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-06-11 - Make Custom Drag-and-Drop Zones Keyboard Accessible
**Learning:** In React components featuring custom drag-and-drop or upload zones wrapped in standard `div` elements, keyboard accessibility is often entirely missing, making it impossible for non-mouse users to trigger the file input.
**Action:** When adding `role="button"` and `tabIndex={0}` to custom `div` containers to make them keyboard focusable and interactive, I must ensure visible focus states are added using Tailwind utility classes (`focus-visible:ring-2`, `focus-visible:ring-primary`, `focus-visible:outline-none`). Additionally, any visually distinct "buttons" nested inside this custom container must be converted to non-interactive semantic equivalents (like a `<span>` styled as a button) to avoid creating invalid nested interactive element accessibility structures.
