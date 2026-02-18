## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2024-05-24 - Icon-Only Button Labels
**Learning:** Dense toolbars with icon-only buttons (like history, delete, copy) create significant barriers for screen reader users if `aria-label` is missing. Grouping them visually doesn't help assistive technology.
**Action:** Always pair `aria-label` with `title` for icon-only buttons to support both screen readers and mouse hover users.
