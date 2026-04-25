## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-05-18 - Keyboard Accessible Custom Dropzones
**Learning:** Custom interactive elements (like hexagonal drag-and-drop file upload zones) must not contain nested `<button>` tags if the parent container acts as the clickable area. Without an explicit `role="button"`, `tabIndex`, and `onKeyDown` handlers for Enter/Space, these custom zones are completely inaccessible to keyboard-only users. Nesting a button inside a clickable div is invalid HTML and causes screen reader confusion.
**Action:** When implementing custom interactive UI elements, always add `role="button"`, `tabIndex={0}`, an `aria-label`, and an `onKeyDown` handler that triggers the action on 'Enter' and 'Space'. Replace internal `<button>` tags with styled `<span>` elements using `group-hover` utility classes to preserve visual interaction states synchronously without breaking accessibility.
