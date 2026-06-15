## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Interactive Elements within role="button" Containers
**Learning:** When building accessible custom interactive elements (like a file dropzone `div` with `role="button"`), nesting semantic interactive elements (like `<button>`) inside them results in invalid HTML and unexpected screen reader behavior.
**Action:** Convert the visually-styled nested `<button>` to a `<span>`. To maintain the original layout and interactive styling, apply `inline-block` to the `<span>` and change interactive Tailwind utility classes (e.g., from `hover:scale-105` to `group-hover:scale-105`) so the effect correctly triggers when the parent container is focused or hovered.
