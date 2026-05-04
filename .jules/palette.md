## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-18 - Keyboard Accessible Custom Dropzones
**Learning:** When creating custom interactive elements like a full-element click/drop area (e.g. a large div), placing nested `<button>` tags inside creates invalid HTML semantics and accessibility issues. It also typically breaks when a user tabs onto the main element and presses Enter, if the correct events are not captured.
**Action:** Replace nested `<button>` tags with styled `<span>` elements using `inline-block` to preserve layout. Ensure the parent clickable container has `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler to listen for 'Enter' and 'Space' keys to trigger the primary action. Apply `focus-visible` utility classes for standard focus indicators.
