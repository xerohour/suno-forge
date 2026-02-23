## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2026-02-23 - Semantic Value Text for Sliders
**Learning:** Range inputs often represent qualitative values (e.g., complexity: low/medium/high) but only announce numbers by default.
**Action:** Use `aria-valuetext` to map the numeric value to the semantic label so screen reader users get the same context as visual users.
