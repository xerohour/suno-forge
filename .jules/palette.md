## 2024-05-22 - Semantic Headings as Labels
**Learning:** When visual design uses section headings (h2) as the primary label for an input, use `aria-labelledby` to associate them programmatically without duplicating text in a hidden label.
**Action:** In future forms with section-based layouts, check if the section header serves as the label and link it via ID instead of adding redundant `sr-only` labels.

## 2024-05-23 - Qualitative Range Sliders Need `aria-valuetext`
**Learning:** When using `<input type="range">` where the numerical value maps to qualitative labels (like Low, Medium, High), screen readers will by default only announce the raw number (e.g., "82") which loses the semantic context presented visually to the user.
**Action:** Always add an `aria-valuetext` attribute to range inputs that compute the visual label dynamically based on the current numeric value, ensuring screen readers receive the exact semantic representation.
