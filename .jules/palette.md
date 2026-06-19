## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2024-06-19 - Accessible Interactive Dropzones and Valid HTML
**Learning:** Wrapping a visually-styled `<button>` inside a clickable `div` used as a file dropzone creates invalid HTML and breaks accessibility. Interactive container elements need proper roles and keyboard events.
**Action:** When building custom interactive elements like dropzones, apply `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler to the parent. Convert nested semantic interactive elements (like `<button>`) to `<span>` with `inline-block` to maintain layout, and shift interaction-triggered styling (like `hover:scale-105`) to `group-hover:scale-105` relying on the parent container.
