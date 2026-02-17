# ROADMAP: suno-forge

## Phases

- [ ] **Phase 1: Project Foundation** - Establish the foundational project structure, core technology stack, and basic UI framework.
- [ ] **Phase 2: Core Prompting & Generation** - Users can create, validate, submit prompts, view results, and save/load locally.
- [ ] **Phase 3: Prompt Templating & Management** - Users can use templates and export/import prompts.
- [ ] **Phase 4: Advanced Generation & Mutation** - Users can mutate prompts and generate in batches.

## Phase Details

### Phase 1: Project Foundation
**Goal**: Establish the foundational project structure, core technology stack, and basic UI framework to enable rapid development.
**Depends on**: Nothing
**Requirements**: TSR1, TSR2, TSR3, TSR4, TSR5, TSR6, NFR3.1, NFR3.3, NFR1.1
**Success Criteria** (what must be TRUE):
  1. Developer can start the local development server without errors.
  2. Basic Next.js pages can be rendered using TypeScript and Tailwind CSS.
  3. A simple Shadcn UI component (e.g., a Button) can be imported and displayed on a page.
  4. Zod schema validation can be applied to a basic form input (e.g., a text field) using React Hook Form.
**Plans**: TBD

### Phase 2: Core Prompting & Generation
**Goal**: Users can create a validated Suno prompt, send it for music generation via a secure proxy, view the generated tracks, and save/load their work locally.
**Depends on**: Phase 1
**Requirements**: FR1.1, FR1.2, FR1.3, FR1.4, FR2.1, FR2.2, FR2.3, FR2.4, FR3.1, FR3.2, FR3.3, FR3.4, NFR1.2, NFR1.3, NFR2.1, NFR3.2, NFR4.1, NFR5.1, TSR7, TSR8
**Success Criteria** (what must be TRUE):
  1. User can enter text into a structured prompt editor and a separate lyric editor.
  2. User receives real-time validation feedback for prompt inputs that don't conform to Suno's expected format.
  3. User can successfully submit a validated prompt and see a "generating" status, followed by an embedded player or link to the generated music track.
  4. User can save their current prompt, and it persists across browser sessions, appearing in a history list for later loading.
  5. Sensitive API keys are never exposed in client-side code or network requests when generating music.
**Plans**: TBD

### Phase 3: Prompt Templating & Management
**Goal**: Users can enhance their prompt creation workflow by using templates and securely exporting/importing their prompts for sharing and backup.
**Depends on**: Phase 2
**Requirements**: FR3.5, FR4.1
**Success Criteria** (what must be TRUE):
  1. User can create a prompt template with placeholders and apply it to generate new prompts.
  2. User can export their saved prompts as a file (e.g., JSON) to their local machine.
  3. User can import a previously exported prompt file, and the prompts become available in their local history.
**Plans**: TBD

### Phase 4: Advanced Generation & Mutation
**Goal**: Users can efficiently explore diverse creative options by generating variations of prompts and submitting multiple generation requests in a single action.
**Depends on**: Phase 3
**Requirements**: FR4.2, FR4.3
**Success Criteria** (what must be TRUE):
  1. User can select a base prompt and generate multiple intelligent variations based on defined mutation rules.
  2. User can initiate a batch generation process for multiple prompts or variations, and track the progress of each.
  3. The mutation engine produces musically coherent and distinct variations, not just random changes.
**Plans**: TBD

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Foundation | 0/0 | Not started | - |
| 2. Core Prompting & Generation | 0/0 | Not started | - |
| 3. Prompt Templating & Management | 0/0 | Not started | - |
| 4. Advanced Generation & Mutation | 0/0 | Not started | - |
