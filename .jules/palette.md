## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-18 - Keyboard Accessible File Dropzones
**Learning:** Custom interactive elements (like a `div` dropzone) lacking keyboard accessibility prevent screen reader and keyboard-only users from completing core flows. Nesting a semantic `<button>` inside an interactive container creates invalid HTML and accessibility tree conflicts.
**Action:** Always add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (for 'Enter' and 'Space') to custom interactive containers. Replace nested semantic `<button>` tags with visually identical inline-block `<span>` elements using `group-hover` utilities to maintain layout and interactivity without breaking semantic rules.
