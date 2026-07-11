## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-20 - Custom Container Keyboard Accessibility and Nested Interactive Elements
**Learning:** When making a custom container (like a drag-and-drop div) keyboard accessible by adding `role="button"` and `tabIndex={0}`, any nested interactive elements (such as inner `<button>`s) create invalid nested interactive accessibility structures. This can confuse screen readers and cause unexpected focus behavior.
**Action:** Always convert nested interactive elements within a newly accessible custom container into non-interactive semantic equivalents (e.g., replacing `<button>` with `<span>` styled identically) and ensure the container itself has visible focus states (e.g., `focus-visible:ring-2`).
