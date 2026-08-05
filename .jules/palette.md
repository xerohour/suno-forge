## 2023-10-27 - Clip-Path Accessibility Limitations
**Learning:** Using `clip-path` for custom shapes (like the hexagon dropzone) natively clips and hides standard browser focus rings (e.g., `focus-visible:ring`). This makes interactive elements appear completely inaccessible to keyboard users, even if `tabIndex` and `onKeyDown` are correctly implemented.
**Action:** When making custom clipped shapes interactive, always apply the focus ring to an inner, unclipped child element using Tailwind's `group-focus-visible` to ensure keyboard navigation remains visually apparent.
