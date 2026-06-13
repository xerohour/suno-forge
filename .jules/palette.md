## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-05-24 - Keyboard Accessibility for File Dropzones
**Learning:** When building custom interactive file dropzones (like a clickable div), nesting a visual `<button>` inside it creates invalid HTML. Furthermore, relying only on `onClick` makes the dropzone inaccessible to keyboard users.
**Action:** Use `role="button"` and `tabIndex={0}` with an `onKeyDown` handler (for Enter/Space) on the dropzone. Replace any nested `<button>` with a `<span>` using `inline-block` and `group-hover` utility classes to maintain layout and visual feedback while ensuring valid, accessible HTML.
