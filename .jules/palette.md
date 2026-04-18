## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2026-03-02 - Nested Interactive Elements inside Dropzones
**Learning:** Placing a `<button>` inside a clickable `<div>` used as a custom dropzone creates an invalid nested interactive element structure. This causes event bubbling issues and creates confusing, duplicated focus rings for assistive technologies.
**Action:** When designing clickable dropzones with internal "upload" buttons, convert the internal visual button into a non-interactive `<span>` styled to look like a button (using `inline-block`), and let the parent wrapper handle the interactive semantics (`role="button"`, `tabIndex`, `onKeyDown`). Link hover states using `group` and `group-hover:`.
