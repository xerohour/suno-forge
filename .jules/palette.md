## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-08-02 - Vision Dropzone Accessibility Fix
**Learning:** Custom interactive elements (like the hexagonal dropzone) often miss critical accessibility features like `role="button"`, `tabIndex`, and keyboard handlers (`onKeyDown` for Enter/Space), making them unusable for keyboard-only or screen reader users. Furthermore, nesting a `<button>` inside another interactive element (the dropzone `div`) creates invalid HTML and confuses assistive technologies. Focus visibility can also be tricky with custom shapes like `clip-path` (hexagons) and requires careful application of `focus-visible` utility classes on the outermost interactive element.
**Action:** Always ensure custom dropzones or interactive areas have appropriate ARIA roles, keyboard event handlers, and `tabIndex`. Avoid nesting interactive elements like buttons inside other clickable areas; use `<span>` for visual buttons inside larger clickable containers.
