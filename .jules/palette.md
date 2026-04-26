## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Making Custom Dropzones Accessible
**Learning:** Custom div-based file upload dropzones are completely inaccessible by default. They require a `role="button"`, a `tabIndex={0}`, an explicit `onKeyDown` handler for Enter and Space, clear `focus-visible` styles, and must NOT contain nested interactive elements like `<button>` tags within them, as this creates invalid HTML that confuses screen readers and traps focus.
**Action:** Always verify keyboard focusability and interactivity on custom interactive containers, and swap internal `<button>` visual elements to `<span>` with `inline-block` to avoid invalid nested interactive tags.
