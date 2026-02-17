# Feature Landscape

**Domain:** AI Music Generation Prompt Engineering
**Researched:** 2024-07-30

## Table Stakes

Features users expect in a prompt engineering tool for Suno AI. Missing these would make the product feel incomplete or difficult to use.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Structured Prompt Editor** | Users need a guided way to build complex Suno prompts, ensuring all key elements (genre, mood, instrumentation, vocal style, production) are covered. | Medium | Should provide input fields and guidance based on Suno's prompt best practices. |
| **Separate Lyric Editor** | Suno requires lyrics and musical style to be separate. A dedicated, user-friendly interface for lyrics, supporting metatags, is essential. | Medium | Must support insertion and visualization of metatags (`[Verse]`, `[Chorus]`, etc.). |
| **Suno AI Generation** | The core function is to generate music. This involves sending the constructed prompt (style + lyrics) to the chosen third-party Suno API. | Medium | Requires robust API integration and error handling. |
| **Generated Track Display** | Users need to see and access their generated music. This would typically be embedded players or links back to Suno. | Low | Displaying Suno's output links/embedded players. |
| **Prompt Saving & Loading** | Users will want to save their successful prompts and load them later for reuse or modification. | Low | Basic client-side persistence (e.g., Local Storage for MVP). |
| **Prompt History & Versioning** | Essential for iterative prompt engineering, allowing users to review, revert to, or fork previous prompt versions. | Medium | Store prompt text, generated outputs, and creation timestamps. |

## Differentiators

Features that would set `suno-forge` apart, enhancing the user experience and creative workflow for music makers.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|------------|
| **Prompt Templating System** | Allows users to create, save, and reuse templates for common genres, styles, or song structures, accelerating prompt creation and ensuring consistency. | Medium | Users define placeholders, which are then filled to generate specific prompts. |
| **Prompt Mutation/Variation Engine** | Automatically generates intelligent variations of a base prompt (e.g., slight genre shifts, instrument swaps, mood adjustments, different metatag combinations). This directly addresses the "mutate" goal. | High | Requires sophisticated logic to understand and intelligently alter prompt components while maintaining coherence. |
| **Batch Generation** | Enables users to generate multiple prompt variations (from templates or mutation engine) in a single request, facilitating A/B testing and rapid experimentation. | Medium | Manages multiple API calls and displays results clearly. |
| **"Smart" Metatag Placement** | Suggests or visually aids in placing metatags (`[Verse]`, `[Chorus]`, `[Instrumental]`) within lyrics or style descriptions, potentially based on lyric analysis or predefined structures. | Medium | Can be as simple as context-aware insertion or as complex as AI-driven suggestions. |
| **Prompt Analysis & Suggestions** | Provides real-time feedback or suggestions on prompt quality based on Suno's best practices, helping users craft more effective prompts. | High | Could involve checking for vagueness, suggesting specific descriptors, or warning about common pitfalls (e.g., artist names). |
| **Export Prompt to JSON/Text** | Allows users to easily share prompts or use them outside `suno-forge`. | Low | Standard export functionality. |

## Anti-Features

Features to explicitly NOT build, staying true to the project's scope as a "prompt engineering toolkit."

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Digital Audio Workstation (DAW) Functionality** | `suno-forge` is not a music production suite. It generates *prompts* for music, not the final polished audio. | Focus on robust prompt generation; for audio manipulation, users should export to their preferred DAW. |
| **AI Model Training/Fine-tuning** | Out of scope for a user-facing prompt engineering tool. Suno AI handles the model. | Focus on optimizing *input* to the existing AI models. |
| **Extensive Music Library Management** | While prompt saving is needed, managing a full library of generated tracks (beyond basic history) is not the core mission. | Provide clear links to generated tracks on Suno for their native library features. |
| **Copyright Enforcement/Tracking** | A complex legal issue, not a software feature of a prompt tool. | Educate users on general AI music copyright considerations where appropriate, but don't attempt to implement legal controls. |

## Feature Dependencies

```
Structured Prompt Editor → Suno AI Generation → Generated Track Display
Prompt Saving & Loading → Prompt History & Versioning
Prompt Templating System → Batch Generation
Prompt Mutation/Variation Engine → Batch Generation
```

## MVP Recommendation

Prioritize:
1.  **Structured Prompt Editor** (basic version)
2.  **Separate Lyric Editor** (basic metatag support)
3.  **Suno AI Generation**
4.  **Generated Track Display**
5.  **Prompt Saving & Loading**
6.  **Prompt History** (basic list)

Defer:
*   **Prompt Templating System**: Defer to a later phase once core prompt generation is stable.
*   **Prompt Mutation/Variation Engine**: This is a key differentiator but complex, defer beyond initial MVP.
*   **Batch Generation**: Depends on mutation/templating, defer.
*   **"Smart" Metatag Placement & Prompt Analysis**: High complexity, defer.

## Sources

- Web search results for "Suno AI prompt engineering best practices"
- Web search results for "Music makers challenges AI music generation OR musician needs AI tools"
- `PROJECT.md` overview.
