## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-19 - Keyboard Focus on Clipped Elements & Nested Buttons
**Learning:** When styling custom shapes using `clip-path` (like a hexagon dropzone), standard focus rings (e.g., `focus-visible:ring-2`) on the parent container get clipped and hidden. Additionally, nesting `<button>` elements inside a parent container that is turned into a keyboard-accessible interactive element (using `role="button"` and `tabIndex={0}`) violates ARIA validation rules.
**Action:** To ensure keyboard accessibility is visually apparent on clipped elements, apply focus styles to an inner, unclipped element using the `group-focus-visible` utility class. Also, replace any nested purely visual buttons within interactive parent containers with non-interactive elements like `<span>`.

## 2025-02-20 - Contextual aria-describedby for Complex Toggles
**Learning:** When a toggle switch has an associated description or subtitle (e.g., "Unstable but creative rhythms" below "Experimental Mode"), screen readers may only announce the main label if `aria-describedby` is not properly linked, leaving users without crucial context.
**Action:** Always assign an ID to subtitle or description elements related to a toggle and link them using `aria-describedby`. If `aria-labelledby` is already used, you can combine multiple IDs in `aria-describedby` if needed, or maintain both.
