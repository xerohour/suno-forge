## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-05-18 - Keyboard Accessible Drag & Drop Zones
**Learning:** Custom visual components acting as upload targets (like the hexagon in Vision) often use heavily styled `div` elements with `onClick` handlers. However, they lack inherent keyboard interactivity. Additionally, nesting a semantic `<button>` inside an interactive `div` (with `role="button"`) creates invalid nested interactive controls for screen readers.
**Action:** When implementing custom upload zones or interactive areas, always assign `role="button"`, `tabIndex={0}`, handle `onKeyDown` for 'Enter'/'Space', apply explicit `focus-visible` styles, and replace purely visual inner buttons with non-interactive elements like `<span>` to maintain a valid accessibility tree.
