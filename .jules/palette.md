## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Interactive Custom Dropzones
**Learning:** When building custom interactive elements (like a clickable `div` file dropzone), nesting semantic interactive elements like `<button>` inside it creates invalid HTML that breaks accessibility trees and confuses screen readers. Furthermore, when converting that inner button to a `<span>` to fix the HTML, any interactive Tailwind hover utilities (like `hover:scale-105`) must be updated to rely on the parent group (`group-hover:scale-105`) since the user interacts with the container, not the span directly.
**Action:** Always verify that elements with `role="button"` or `onClick` handlers do not contain nested semantic interactive elements. Use `<span>` with `inline-block` for inner visual buttons and apply `group-hover` utilities to maintain original styling behaviors.
