## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-03-29 - Fixed Dropzone Accessibility
**Learning:** Custom interactive elements (like drag-and-drop zones) frequently lack keyboard accessibility (tabIndex, role, onKeyDown) and can inadvertently contain invalid nested interactive elements (like a `<button>` inside a clickable `<div>`), causing issues for screen readers.
**Action:** When making custom `<div>` containers clickable, always apply `role="button"`, `tabIndex={0}`, keyboard handlers, and `focus-visible` styles. Replace any visually-styled child `<button>`s with `<span>`s using `group-hover:` instead of `hover:` modifiers to preserve visual state and maintain HTML validity.
