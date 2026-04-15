## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-03-01 - Interactive Custom Elements Accessibility
**Learning:** When creating a custom interactive element (like a clickable div dropzone) containing pseudo-buttons (like `<span className="inline-block hover:scale-105">SELECT FILE</span>`), the hover state on the internal item breaks sync with the focus state of the parent interactive boundary.
**Action:** When implementing custom interactive elements, always use `group` on the parent container and `group-hover:` on child elements to ensure the visual interaction states remain synchronized with the semantic boundary being focused or hovered.