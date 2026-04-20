## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2026-04-20 - Accessible Custom Dropzones
**Learning:** When creating custom drag-and-drop zones (`div`) that open file dialogs, they often lack keyboard accessibility and can lead to invalid nested interactive elements if an inner `<button>` is used. Adding standard button behavior (role, tabIndex, Enter/Space handlers) directly to the outer dropzone wrapper and converting inner buttons to styled `<span>`s solves this while maintaining the expected visual layout.
**Action:** Always verify keyboard interaction for custom file dropzones. Apply `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler to the outer wrapper, sync focus ring styles (`focus-visible:ring-2 ...`), and ensure inner interactive elements are converted to non-interactive inline blocks (e.g., `<span className="inline-block ...">`) to prevent nesting issues.
