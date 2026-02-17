# Requirements: suno-forge

## 1. Functional Requirements (FR)

### FR1: Prompt Creation and Editing
*   **FR1.1: Structured Prompt Editor**: The system SHALL provide a structured editor for constructing Suno prompts, guiding users through key elements (genre, mood, instrumentation, vocal style, production).
*   **FR1.2: Lyric Editor**: The system SHALL provide a dedicated lyric editor that supports metatag insertion and visualization (e.g., `[Verse]`, `[Chorus]`).
*   **FR1.3: Prompt Validation**: The system SHALL validate user-entered prompt data against expected Suno formats and internal schemas using Zod.
*   **FR1.4: Prompt Structuring**: The system SHALL structure raw user input into a coherent prompt object suitable for the Suno AI API.

### FR2: Music Generation
*   **FR2.1: Suno AI Generation**: The system SHALL enable users to send constructed prompts to a third-party Suno AI API to generate music.
*   **FR2.2: API Proxy**: The system SHALL use a server-side API proxy to secure sensitive API keys and mediate all requests to the third-party Suno AI API.
*   **FR2.3: Rate Limit Handling**: The system SHALL implement client-side throttling and retry mechanisms to manage API rate limits from the third-party Suno API.
*   **FR2.4: Error Handling**: The system SHALL handle errors from the Suno AI API and provide informative feedback to the user.

### FR3: Output Management and Persistence
*   **FR3.1: Generated Track Display**: The system SHALL display generated music tracks, including embedded players or links to the tracks on Suno.
*   **FR3.2: Prompt Saving and Loading**: The system SHALL allow users to save and load their prompts for reuse or modification.
*   **FR3.3: Prompt History**: The system SHALL maintain a history of generated prompts and their corresponding outputs.
*   **FR3.4: Client-side Persistence**: The system SHALL persist user prompts, templates, and generation history using client-side Local Storage for the MVP.
*   **FR3.5: Export/Import Prompts**: The system SHALL provide functionality to export and import prompts (e.g., as JSON or text files) to mitigate local storage limitations.

### FR4: Advanced Prompt Features (Future Phases)
*   **FR4.1: Prompt Templating System**: The system SHOULD allow users to create, save, and reuse templates with placeholders.
*   **FR4.2: Prompt Mutation/Variation Engine**: The system SHOULD provide functionality to generate intelligent variations of a base prompt based on rule-based mutations.
*   **FR4.3: Batch Generation**: The system SHOULD enable batch generation of multiple prompt variations.

## 2. Non-Functional Requirements (NFR)

### NFR1: Usability and User Experience
*   **NFR1.1: Intuitive UI**: The system SHALL feature an intuitive and inspiring user interface, designed with progressive disclosure to avoid overwhelming users.
*   **NFR1.2: Clear Feedback**: The system SHALL provide clear visual cues and feedback to the user on prompt changes, generation status, and API interactions.
*   **NFR1.3: Prose Style Adherence**: The application's language SHALL blend creative, evocative language with technical precision, adhering to the "musical instrument and precision tool" guiding principle.

### NFR2: Security
*   **NFR2.1: API Key Protection**: The system SHALL ensure that sensitive API keys for the third-party Suno AI API are never exposed client-side.

### NFR3: Maintainability and Extensibility
*   **NFR3.1: Modular Architecture**: The system SHALL adhere to a layered, component-based architecture for maintainability and extensibility.
*   **NFR3.2: API Abstraction**: The `API_Proxy` SHALL be designed with a high level of abstraction to facilitate switching between different third-party Suno AI providers or adapting to an official API.
*   **NFR3.3: Type Safety**: The codebase SHALL utilize TypeScript to enhance code quality, maintainability, and developer experience.

### NFR4: Performance
*   **NFR4.1: Responsive UI**: The user interface SHALL remain responsive during prompt construction and generation processes.

### NFR5: Reliability
*   **NFR5.1: Third-Party API Monitoring**: The system (or its development process) SHALL actively monitor the chosen third-party API provider for stability and changes.

## 3. Technology Stack Requirements (TSR)

*   **TSR1: Frontend Framework**: The system SHALL be built using Next.js and React.
*   **TSR2: Language**: The system SHALL be developed using TypeScript.
*   **TSR3: UI Components**: The system SHALL utilize Shadcn UI components for the user interface.
*   **TSR4: Styling**: The system SHALL use Tailwind CSS for styling.
*   **TSR5: Form Management**: The system SHALL use React Hook Form with Zod Resolver for form handling and validation.
*   **TSR6: Data Validation**: The system SHALL use Zod for schema validation.
*   **TSR7: Suno AI Integration**: The system SHALL integrate with Suno AI via a third-party API.
*   **TSR8: Custom Prompt Engine**: The system SHALL incorporate a custom internal prompt engine for core logic.

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FR1.1 | Phase 2 | Pending |
| FR1.2 | Phase 2 | Pending |
| FR1.3 | Phase 2 | Pending |
| FR1.4 | Phase 2 | Pending |
| FR2.1 | Phase 2 | Pending |
| FR2.2 | Phase 2 | Pending |
| FR2.3 | Phase 2 | Pending |
| FR2.4 | Phase 2 | Pending |
| FR3.1 | Phase 2 | Pending |
| FR3.2 | Phase 2 | Pending |
| FR3.3 | Phase 2 | Pending |
| FR3.4 | Phase 2 | Pending |
| FR3.5 | Phase 3 | Pending |
| FR4.1 | Phase 3 | Pending |
| FR4.2 | Phase 4 | Pending |
| FR4.3 | Phase 4 | Pending |
| NFR1.1 | Phase 1 | Pending |
| NFR1.2 | Phase 2 | Pending |
| NFR1.3 | Phase 2 | Pending |
| NFR2.1 | Phase 2 | Pending |
| NFR3.1 | Phase 1 | Pending |
| NFR3.2 | Phase 2 | Pending |
| NFR3.3 | Phase 1 | Pending |
| NFR4.1 | Phase 2 | Pending |
| NFR5.1 | Phase 2 | Pending |
| TSR1 | Phase 1 | Pending |
| TSR2 | Phase 1 | Pending |
| TSR3 | Phase 1 | Pending |
| TSR4 | Phase 1 | Pending |
| TSR5 | Phase 1 | Pending |
| TSR6 | Phase 1 | Pending |
| TSR7 | Phase 2 | Pending |
| TSR8 | Phase 2 | Pending |
