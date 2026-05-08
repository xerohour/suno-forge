## 2024-05-24 - Custom Dropzone Accessibility
**Learning:** Custom interactive elements like file dropzones often miss keyboard accessibility (role, tabIndex, onKeyDown) and mistakenly nest interactive elements (like buttons inside a clickable div), causing invalid HTML and poor screen reader experience.
**Action:** Always ensure custom interactive divs have role="button", tabIndex={0}, and an onKeyDown handler for Enter/Space. Replace nested buttons with span elements styled as buttons to prevent nested interactive elements.
