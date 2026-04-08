## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-18 - Syncing Visual and ARIA Labels
**Learning:** When using a helper function to generate a dynamic visual label (e.g., "High", "Medium", "Low" for a range input), reuse that same helper for the `aria-valuetext` attribute to ensure the screen reader experience perfectly matches the visual experience and stays in sync during maintenance.
**Action:** Extract label logic into a helper function and use it for both the visual element and the `aria-valuetext` prop.

## 2025-04-08 - Accessible Div as Button with Nested Span
**Learning:** When turning a generic layout element (like a custom dropzone div) into an interactive button, it is critical to provide full keyboard accessibility using `role="button"`, `tabIndex={0}`, an `aria-label`, and `onKeyDown` handling for Enter and Space keys. Furthermore, placing an actual `<button>` element inside this interactive wrapper violates standard HTML constraints and causes screen reader issues; using a `<span className="inline-block group-hover:...">` styled to look like a button solves the nested interactive element anti-pattern while preserving visual fidelity and interactivity through the parent's `group` classes.
**Action:** When creating custom interactive areas, use parent div a11y attributes and replace inner nested `<button>` tags with `<span>` tags, applying Tailwind's `inline-block` to maintain layout behavior and `group-hover` for hover states triggered by the parent.
