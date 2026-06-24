## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-06-24 - Interactive Divs and Nested Buttons Accessibility
**Learning:** When creating custom interactive elements like dropzones with a `div` that triggers a file input, nesting a semantic `<button>` inside for styling causes invalid HTML and potential event bubbling issues. Additionally, these custom elements often lack keyboard navigation support.
**Action:** Always add `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers for Enter/Space to the parent `div`. Replace any visually-styled nested `<button>` with a `<span>` using `inline-block` and `group-hover` utilities to maintain appearance without compromising HTML validity.
