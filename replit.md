# Are You Smarter Than an AI - Quiz Application

## Overview

A quiz application that challenges users to compete against AI models using questions from the MMLU (Massive Multitask Language Understanding) benchmark. Users can take quizzes across various academic categories and compare their performance with leading AI models like GPT-4, Claude, and Gemini.

## Recent Changes

### October 28, 2025 - Full MMLU Dataset Integration & Question Count Selector
- Downloaded and integrated complete MMLU dataset with 3,005 questions from 15 academic subjects
- Added question count selector feature allowing users to choose 5, 10, 20, or 50 questions per quiz
- Updated backend API to accept `numberOfQuestions` parameter (defaults to 10)
- Both category-specific and mixed quizzes support custom question counts
- Created data processing scripts to convert Hugging Face parquet data to TypeScript format

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
- MMLU Dataset: 3,005 questions across 15 subjects (physics, mathematics, history, geography, biology, chemistry, philosophy, literature, formal logic, and more)

**Data Models**
- User accounts (username, password)
- Questions (subject, difficulty, options, correct answer, explanation)
- Quiz sessions (questions, current index, answers, score)
- Categories (name, icon, description, question count)
- AI model comparisons (name, accuracy, category breakdown)

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