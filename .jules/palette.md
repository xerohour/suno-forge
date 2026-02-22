## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2025-05-23 - Interactive Element Semantics & Accessibility
**Learning:** Generic `button` elements used for navigation break standard web behavior (e.g., open in new tab) and often lack accessibility labels. Custom toggle switches built with hidden inputs require explicit focus styles on the visual sibling (e.g., `peer-focus:ring`) to be usable by keyboard.
**Action:** Replace navigation buttons with `Link` components and ensure all custom form controls have visible focus indicators.
