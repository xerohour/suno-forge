## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-02-21 - Custom Toggle Focus & Slider Semantics
**Learning:** Custom toggle switches (hidden checkbox + visual div) often miss keyboard focus states, making them inaccessible. Also, range inputs for qualitative concepts (like complexity) are meaningless to screen readers without `aria-valuetext`.
**Action:** Always add `peer-focus:ring` to the visual sibling of a hidden checkbox, and ensure `aria-valuetext` maps numerical values to human-readable strings on sliders.
