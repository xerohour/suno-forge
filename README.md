# 🎵 suno-forge

> A powerful prompt engineering toolkit for Suno AI music generation

**suno-forge** is a comprehensive Next.js application that empowers music creators to systematically construct, mutate, and generate high-fidelity music prompts for the Suno AI platform. Built with a modular engine architecture, it provides both a sophisticated user interface and a robust backend API for professional-grade prompt engineering.

---

## ✨ Features

### 🎹 **Studio Mode** (`/studio`)

An advanced interface for authoring and refining individual prompts with granular control over:

- Musical style and genre selection
- Lyrical content and structure
- Instrumentation and arrangement
- Vocal characteristics and delivery
- Real-time prompt validation and preview

### 📦 **Batch Generation** (`/batch`)

Powerful tools for creating and managing multiple prompt variations:

- Generate dozens of variations from a single base prompt
- Apply systematic mutations across prompt collections
- Track and compare generation results
- Export and import prompt libraries

### 👁️ **Vision-to-Prompt** (`/vision`)

Transform visual inspiration into musical prompts:

- Analyze images to extract mood, color, and atmosphere
- Generate contextually appropriate musical descriptions
- AI-powered interpretation of visual elements
- Seamless integration with Studio and Batch workflows

### ⚙️ **Modular Engine Architecture**

Core logic separated into specialized, testable engines:

- **`styleEngine`**: Genre, mood, and instrumentation management
- **`lyricsEngine`**: Structural tags, vocal directions, and lyric formatting
- **`promptEngine`**: Unified prompt assembly and validation
- **`mutationEngine`**: Intelligent variation generation with musical coherence

---

## 🛠️ Tech Stack

| Category        | Technology                                                                       |
| --------------- | -------------------------------------------------------------------------------- |
| **Framework**   | [Next.js 14+](https://nextjs.org/) (App Router)                                  |
| **Language**    | TypeScript (strict mode)                                                         |
| **Styling**     | [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Backend**     | Next.js API Routes                                                               |
| **AI Services** | OpenAI API (GPT-4, Vision)                                                       |
| **Database**    | Supabase (planned)                                                               |
| **Testing**     | Jest + ts-jest                                                                   |
| **Validation**  | Zod schemas                                                                      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher (LTS recommended)
- **npm** 9.x or higher
- **Git** for version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/suno-forge.git
   cd suno-forge
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory:

   ```bash
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Supabase Configuration (optional, for future features)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Development

**Start the development server:**

```bash
npm run dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)**

**Type checking:**

```bash
npx tsc --noEmit
```

**Run tests:**

```bash
npm test
```

**Run tests in watch mode:**

```bash
npm test -- --watch
```

**Generate test coverage:**

```bash
npm test -- --coverage
```

### Production

**Build for production:**

```bash
npm run build
```

**Start production server:**

```bash
npm start
```

---

## 📁 Project Structure

```
suno-forge/
├── app/                      # Next.js App Router
│   ├── api/                  # Backend API endpoints
│   │   ├── generate/         # Single prompt generation
│   │   ├── mutate/           # Prompt mutation
│   │   ├── batch/            # Batch operations
│   │   └── vision/           # Vision-to-prompt conversion
│   ├── studio/               # Studio mode UI
│   ├── batch/                # Batch generation UI
│   ├── vision/               # Vision mode UI
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
│
├── components/               # React components
│   ├── ui/                   # Primitive UI components (Radix + Tailwind)
│   ├── PromptEditor.tsx      # Main prompt editing interface
│   ├── StyleControls.tsx     # Style configuration panel
│   ├── LyricsEditor.tsx      # Lyrics and structure editor
│   └── BatchPanel.tsx        # Batch operations interface
│
├── lib/                      # Core business logic
│   ├── promptEngine.ts       # Unified prompt assembly
│   ├── styleEngine.ts        # Style and genre management
│   ├── lyricsEngine.ts       # Lyrics and structure handling
│   ├── mutationEngine.ts     # Variation generation
│   ├── visionEngine.ts       # Image-to-prompt conversion
│   └── utils.ts              # Shared utilities
│
├── types/                    # TypeScript type definitions
│   ├── prompt.ts             # Prompt configuration types
│   └── api.ts                # API request/response types
│
├── .agent/                   # AI agent skills and workflows
│   └── skills/               # Specialized development skills
│
├── .planning/                # Project planning and documentation
│   ├── codebase/             # Codebase analysis
│   └── research/             # Research and specifications
│
├── conductor/                # Product planning and guidelines
│   ├── product.md            # Product vision
│   ├── tech-stack.md         # Technical decisions
│   └── workflow.md           # Development workflow
│
└── tests/                    # Test files (colocated with source)
```

---

## 📚 Documentation

### For Developers

- **[AGENTS.md](./AGENTS.md)** - Comprehensive development guidelines, coding standards, and contribution workflows
- **[GEMINI.md](./GEMINI.md)** - High-level project overview and architecture summary
- **[.agent/skills/](/.agent/skills/)** - Specialized skills for AI-assisted development
  - Next.js Development
  - Suno Prompt Engineering
  - Testing with Jest
  - UI Components (Radix + Tailwind)
  - TypeScript Patterns
  - Git Workflow

### For Prompt Engineers

- **[suno-prompting-compendium.md](./suno-prompting-compendium.md)** - Comprehensive guide to Suno prompt engineering
  - Core principles and best practices
  - Style and lyrics field syntax
  - Advanced techniques and workflows
  - Troubleshooting and quality control
  - Reference libraries and templates

### Planning & Architecture

- **[.planning/](./.planning/)** - Detailed project planning documents
  - **[PROJECT.md](./.planning/PROJECT.md)** - Project vision and guidelines
  - **[ROADMAP.md](./.planning/ROADMAP.md)** - Development phases and milestones
  - **[codebase/arch/ARCHITECTURE.md](./.planning/codebase/arch/ARCHITECTURE.md)** - System architecture analysis

---

## 🧪 Testing

The project uses **Jest** with **ts-jest** for unit and integration testing.

**Run all tests:**

```bash
npm test
```

**Watch mode (recommended during development):**

```bash
npm test -- --watch
```

**Coverage report:**

```bash
npm test -- --coverage
```

**Test a specific file:**

```bash
npm test -- promptEngine.test.ts
```

See **[.agent/skills/testing/SKILL.md](./.agent/skills/testing/SKILL.md)** for detailed testing guidelines.

---

## 🤝 Contributing

This project follows strict coding standards and conventions. Before contributing:

1. Read **[AGENTS.md](./AGENTS.md)** for coding standards
2. Review the **[Git Workflow skill](./.agent/skills/git-workflow/SKILL.md)**
3. Ensure all tests pass: `npm test`
4. Run type checking: `npx tsc --noEmit`
5. Follow the commit message conventions (imperative mood)

### Pull Request Checklist

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Type checking passes
- [ ] New features include tests
- [ ] Documentation updated if needed
- [ ] Commit messages are clear and descriptive

---

## 🔐 Security

- **Never commit** `.env.local` or any files containing API keys
- Store all secrets in environment variables
- Review API route inputs for validation
- Follow security best practices outlined in **[AGENTS.md](./AGENTS.md)**

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

## 🙏 Acknowledgments

Built with modern web technologies and designed for music creators who demand precision and control in AI-assisted music generation.

---

**Questions or Issues?** Check the documentation in `.planning/` or `.agent/skills/` for detailed guidance on specific topics.
