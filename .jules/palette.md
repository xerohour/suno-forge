## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.
## 2025-04-19 - Accessible Upload Dropzones
**Learning:** Custom 'div' based upload dropzones often entirely lack keyboard accessibility and standard semantics, and nested 'button' elements within these dropzones violate HTML specs while disrupting standard interaction handling. Focus states also need to visually align with the parent app's standard ring styles rather than native browser defaults.
**Action:** When implementing or fixing custom interactive zones, prioritize assigning 'role="button"', 'tabIndex={0}', and 'onKeyDown' early. If a nested "button" visual is required for design, strictly use a 'span' with 'inline-block' and 'group-hover' utilities from Tailwind to preserve layout and synchronous state styling without violating markup validity.
