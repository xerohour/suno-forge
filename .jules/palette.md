## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2024-05-23 - Semantic Navigation for Icon Buttons
**Learning:** Navigational elements presented as icon-only buttons (like "Back") should use semantic `<Link>` components instead of `<button>` with click handlers, and must always include an `aria-label` for screen reader context.
**Action:** Replace non-functional `<button>` back arrows with `<Link href="...">` and add descriptive `aria-label` attributes to all icon-only actions.
