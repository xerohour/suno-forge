## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-05-06 - Interactive Dropzone Accessibility
**Learning:** Custom interactive elements, like clickable dropzones, require explicit accessibility attributes (`role="button"`, `tabIndex={0}`, and `onKeyDown` for Enter/Space). Additionally, placing a `<button>` inside such an element creates invalid HTML semantics (nested interactive elements).
**Action:** Use standard interactive elements where possible, or add appropriate ARIA roles/keyboard handlers. Always replace nested buttons within custom interactive containers with styled `<span>` tags (e.g., `inline-block`) to preserve visual appearance while maintaining valid semantics.
