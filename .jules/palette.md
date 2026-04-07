## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-02-19 - Accessible Interactive Dropzones
**Learning:** Custom interactive elements like a stylized Dropzone container must have native keyboard interactions built in. Adding `role="button"` and `tabIndex={0}` is not enough; a keyboard listener `onKeyDown` catching 'Enter' and 'Space' presses must be implemented to proxy clicks. Additionally, converting internal decorative interactive elements like nested buttons to styled spans (using `inline-block` and `group-hover` for styles) prevents invalid DOM structures while keeping visual cues intact.
**Action:** Whenever converting non-native elements (e.g. div wrappers) to interactive hotspots, verify all accessibility vectors: keyboard operability, structural integrity, aria attributes, and focus styling.
