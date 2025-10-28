# Are You Smarter Than an AI - Quiz Application

## Overview

A quiz application that challenges users to compete against AI models using questions from the MMLU (Massive Multitask Language Understanding) benchmark. Users can take quizzes across various academic categories and compare their performance with leading AI models like GPT-4, Claude, and Gemini.

## Recent Changes

### October 28, 2025 - AI Explanation Feature with GPT-5 Reasoning
- **NEW: AI Explanation Feature** - Get detailed, step-by-step solutions from GPT-5
  - "Get AI Explanation" button appears after answering any question
  - Uses GPT-5 Responses API with high reasoning effort for expert-level explanations
  - Displays three sections: Overview, Reasoning, and Step-by-Step solution
  - Explanations are cached - first request takes 30-60 seconds, subsequent requests are instant
  - All explanations support LaTeX rendering for mathematical content
  - Error handling with user feedback if generation fails
  - Integrated using Replit AI Integrations (no API key required, charges billed to credits)

### October 28, 2025 - Full MMLU Dataset Integration & Question Count Selector
- **Expanded to 14,042 questions** across **17 MMLU categories** (up from 3,005 questions in 8 categories)
- Added 9 new categories: Business, Law, Medicine, Psychology, Computer Science, Astronomy, Engineering, Social Sciences, General Knowledge
- Question count selector feature allows users to choose 5, 10, 20, or 50 questions per quiz
- Updated backend API to accept `numberOfQuestions` parameter (defaults to 10)
- Both category-specific and mixed quizzes support custom question counts
- Created data processing scripts to convert Hugging Face parquet data to TypeScript format
- **Fixed LaTeX rendering**: Added KaTeX library to properly render mathematical expressions in questions, options, and explanations
  - Added custom LaTeX macros for MMLU-specific commands: `\norm`, `\abs`, `\RR`, `\NN`, `\ZZ`, `\CC`, `\QQ`
  - `\norm{x}` renders as ||x|| with proper double vertical bars
  - All mathematical notation displays correctly without red error text
- **Fixed text overflow**: Answer buttons now properly wrap long text across multiple lines

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React with TypeScript as the primary frontend framework
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (New York style variant)
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom theme system supporting light/dark modes
- KaTeX for rendering LaTeX mathematical expressions

**Design Principles**
- Mobile-first responsive design
- Typography system using Inter/DM Sans for primary text and JetBrains Mono for technical data
- Spacing based on Tailwind units (2, 4, 6, 8, 12, 16)
- Container widths optimized for content type (quiz: max-w-3xl, dashboard: max-w-6xl)
- Elevation system using semi-transparent overlays for hover/active states

**State Management**
- React Query for asynchronous server state
- React Context for theme management
- Local component state for quiz progression and user interactions
- Question count selector state managed via useState on homepage
- Question count persisted across quiz retakes via URL parameters

### Backend Architecture

**Server Framework**
- Express.js on Node.js
- TypeScript for type safety
- Custom Vite middleware integration for development
- HTTP-only session management

**API Design**
- RESTful endpoints under `/api` prefix
- JSON request/response format
- Session-based quiz state tracking
- Request logging middleware with response time tracking
- POST /api/quiz/start accepts `categoryId` (optional) and `numberOfQuestions` (optional, defaults to 10)
- Dynamic quiz length support: 5, 10, 20, or 50 questions per quiz

**Storage Strategy**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) for future database migration
- Question bank and categories loaded from static data files (server/data/questions.ts)
- Quiz sessions stored transiently in memory
- MMLU Dataset: **14,042 questions across 17 categories**:
  - Physics (488), History (930), Mathematics (1,064), Geography (198)
  - Biology (1,515), Literature (171), Chemistry (303), Philosophy (1,841)
  - Business (719), Law (1,763), Medicine (710), Psychology (1,157)
  - Computer Science (412), Astronomy (152), Engineering (145)
  - Social Sciences (1,481), General Knowledge (993)

**Data Models**
- User accounts (username, password)
- Questions (subject, difficulty, options, correct answer, explanation)
- Quiz sessions (questions, current index, answers, score)
- Categories (name, icon, description, question count)
- AI model comparisons (name, accuracy, category breakdown)
- AI explanations (question ID, explanation, reasoning, steps, generated timestamp)

### External Dependencies

**Database**
- PostgreSQL configured via Drizzle ORM
- Neon serverless PostgreSQL adapter for database connectivity
- Database schema defined in shared/schema.ts
- Migrations managed through drizzle-kit (migrations directory)
- Note: Current implementation uses in-memory storage; database connection ready for future persistence

**UI Component Libraries**
- @radix-ui/* packages for primitive components (accordions, dialogs, dropdowns, etc.)
- Recharts for data visualization (bar charts in results dashboard)
- embla-carousel-react for carousel functionality
- lucide-react and react-icons for icon systems

**Form Management**
- React Hook Form for form state
- Zod for schema validation
- @hookform/resolvers for Zod integration
- drizzle-zod for database schema to Zod conversion

**Development Tools**
- @replit/* packages for Replit-specific development features (cartographer, dev banner, error overlay)
- esbuild for server-side bundling in production
- tsx for TypeScript execution in development
- Python 3.11 for data processing scripts (MMLU dataset download and conversion)
- pandas and pyarrow for Parquet file processing

**Third-Party Services**
- Google Fonts for typography (Inter, DM Sans, Architects Daughter, Fira Code, Geist Mono)
- Session storage using connect-pg-simple (configured for PostgreSQL)
- OpenAI GPT-5 Responses API via Replit AI Integrations for generating detailed question explanations with step-by-step reasoning