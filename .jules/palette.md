## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Keyboard Navigation and Focus Styles on Custom Elements
**Learning:** When building custom interactive elements like dropzones using standard HTML `div` tags, applying explicit role (`role="button"`), tab indexing (`tabIndex={0}`), and keyboard event handlers (`onKeyDown` for Enter/Space) is necessary. Programmatic focus triggers via testing tools may fail to visually represent CSS focus-visible states correctly if the interaction paradigm is not matched by keyboard navigation (e.g. `Tab` sequence). Nested interactive HTML elements (like a `<button>` inside an interactive `<div>`) will cause screen reader confusion, and such patterns should be simplified to a single interactive wrapper with interior elements styled as visual components (like `<span>`).
**Action:** When building interactive layout containers, always explicitly provide the necessary a11y scaffolding (`role`, `tabIndex`, `onKeyDown`). If applying interactive features to an element that visually encapsulates other UI components, ensure that inner components do not declare conflicting native semantic interactive roles like `<button>`. Use `span` or `div` tags styled similarly instead.
