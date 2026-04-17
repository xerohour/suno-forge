## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2024-05-23 - Nested Buttons and Hover Sync
**Learning:** When fixing nested interactive elements by converting an inner `<button>` to a `<span>` inside a clickable `<div role="button">`, the inner `<span>` defaults to `inline` display. This breaks vertical margins/padding that the button natively supported. Also, removing the hover state from the inner element breaks visual feedback if the outer element handles interaction.
**Action:** Always add `inline-block` to the new `<span>` to preserve layout, and replace inner `hover:` utility classes with `group-hover:` (ensuring the parent has the `group` class) to keep interaction states fully synchronized.
