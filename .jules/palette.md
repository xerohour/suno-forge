## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-06-10 - Accessible Dropzones & Valid HTML
**Learning:** Custom clickable `div`s used as file dropzones must implement full keyboard accessibility (`role="button"`, `tabIndex={0}`, and `onKeyDown` for Enter/Space). Furthermore, any visually-styled "buttons" nested inside them must be converted to `span`s (with `inline-block` to maintain layout) to ensure valid HTML and avoid nested interactive elements.
**Action:** When building custom interactive containers, always provide full keyboard support on the container itself and ensure no semantic interactive elements (like `<button>`) are nested inside. Update hover states to rely on the parent container (e.g., `group-hover`).
