# Technology Stack

**Project:** suno-forge
**Researched:** 2024-07-30

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | Latest stable (e.g., 14.x) | Full-stack React framework | Provides strong foundation for SSR/SSG, API routes, and a unified development experience, leveraging existing project setup. |
| React | Latest stable (e.g., 18.x) | Frontend UI library | Standard for building interactive user interfaces, good component model. |
| TypeScript | Latest stable | Type safety | Enhances code quality, maintainability, and developer experience, especially in a complex prompt engineering context. |

### AI Music Generation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Suno AI | Latest models (V3.5, V4, V5) | Core AI music generation | The explicit target for this toolkit, leveraging its advanced music creation capabilities. |
| Third-party Suno API | (Varies by provider) | Programmatic access to Suno AI | Suno AI lacks an official public API; a reliable third-party API is necessary for `suno-forge` to interact programmatically with Suno. This introduces a dependency risk. |

### Prompt Engineering & Data Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom Prompt Engine | N/A (Internal) | Logic for prompt construction, mutation, and management | Tailored to Suno's specific prompt structure and the project's goal of systematic prompt engineering. This will encompass templating, versioning, and mutation logic. |
| Zod | Latest stable | Schema validation | Provides robust runtime validation for prompt structures, user inputs, and API responses, ensuring data integrity. |
| Local Storage (Web Browser API) | N/A | Client-side persistence for prompts and history | Offers a simple, performant way to store user-specific prompts and their history directly in the browser, suitable for an initial MVP. This can be upgraded to a server-side database if collaborative features or multi-device sync are needed later. |
| React Hook Form / Zod Resolver | Latest stable | Form management and validation | Integrates seamlessly with Zod for declarative and efficient form handling, crucial for complex prompt input forms. |

### User Interface
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Shadcn UI | Latest stable | UI component library | Provides accessible, customizable, and aesthetically pleasing React components, accelerating UI development while adhering to modern design principles. |
| Tailwind CSS | Latest stable | Utility-first CSS framework | Enables rapid and consistent styling, easily customizable and highly performant, integrates well with Shadcn UI. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Prompt Management | Custom / Local Storage | External LLM Prompt Management Platforms (e.g., PromptLayer, Vellum) | Overkill for Suno-specific prompt engineering initially; these are often more geared towards generic LLM use cases or team collaboration with complex backend. `suno-forge` requires a highly specialized prompt structure and local focus initially. |
| Server-side Database | Local Storage | PostgreSQL, MongoDB | Not strictly necessary for an initial MVP focused on client-side prompt engineering. Introduces additional infrastructure complexity and cost without immediate clear benefits for a single-user, local-focused tool. Can be added in future phases. |
| AI Music API | Third-party Suno API | Direct Browser Automation (e.g., Playwright) | While possible, browser automation is generally less stable, harder to maintain, and more prone to breaking with UI changes compared to an API. Used only as a last resort. |

## Installation

```bash
# Core
npm install next react react-dom typescript zod shadcn-ui tailwindcss

# Dev dependencies
npm install -D @types/react @types/node @types/react-dom postcss autoprefixer
```

## Sources

- Suno AI official (for prompt structure research)
- Web search results for "Suno AI API access developer" (for third-party API context)
- Web search results for "prompt engineering tools for creative AI generation" (for general prompt management inspiration)
- Project's existing `package.json` for Next.js, React, Tailwind, and Shadcn usage.
