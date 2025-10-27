# Design Guidelines: "Are You Smarter Than an AI"

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from modern quiz platforms (Kahoot, Duolingo) combined with data visualization tools (Observable, Notion dashboards). The design should balance playful gamification with academic credibility, creating an engaging yet authoritative experience for benchmark testing.

**Core Design Principles**:
- Clear information hierarchy to reduce cognitive load during quiz-taking
- Generous spacing to prevent overwhelming the user with dense academic content
- Visual confidence and authority reflecting the serious MMLU benchmark
- Celebratory elements for achievements without compromising professionalism

---

## Typography System

**Font Stack**: 
- Primary: Inter or DM Sans (clean, modern sans-serif via Google Fonts)
- Accent: JetBrains Mono (for scores, statistics, technical data)

**Hierarchy**:
- **Page Titles**: text-4xl to text-5xl, font-bold (Hero section, results page)
- **Section Headers**: text-2xl to text-3xl, font-semibold (Quiz categories, leaderboards)
- **Question Text**: text-xl, font-medium, leading-relaxed (Maximum readability)
- **Answer Options**: text-base, font-normal (Clear, scannable)
- **Metadata/Labels**: text-sm, font-medium, uppercase tracking-wide (Subject tags, difficulty)
- **Micro-copy**: text-xs, font-normal (Hints, tooltips)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Tight spacing: p-2, gap-2 (icon-text pairs, compact lists)
- Standard spacing: p-4, gap-4, m-4 (card padding, element separation)
- Section spacing: py-12 to py-16 (vertical section padding)
- Hero spacing: py-16 to py-24 (landing area)

**Container Widths**:
- Quiz questions: max-w-3xl (optimal reading width for academic content)
- Results dashboard: max-w-6xl (accommodate comparison charts)
- Landing hero: max-w-5xl (centered, focused messaging)

**Grid Patterns**:
- Answer options: Single column stack (mobile-first, no cognitive split)
- AI model comparisons: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Category selection: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
- Fixed top bar with logo, current score indicator, and exit button
- Breadcrumb trail showing question progress (e.g., "Question 5 of 10")
- Category pill showing current subject (e.g., "Physics • Hard")

### Landing/Hero Section
**Layout**: Full-viewport hero (min-h-screen) with centered content
- Bold headline: "Are You Smarter Than an AI?"
- Subheading explaining MMLU benchmark in 1-2 sentences
- Primary CTA button: "Start Quiz" (large, prominent)
- Secondary CTA: "View Leaderboard" or "How It Works"
- Stat cards below hero showing: Total questions attempted globally, Average human score, Best AI model score
- **Hero Image**: Abstract visualization of AI vs human intelligence - neural networks merging with human brain illustration, positioned as background with gradient overlay for text legibility

### Quiz Interface
**Question Card**:
- Elevated card (shadow-lg) containing full question
- Subject tag and difficulty badge at top
- Question number indicator
- Large, readable question text with generous line-height
- Answer options as full-width buttons with clear hover states
- Each option button: Rounded corners (rounded-lg), padding p-4, border treatment
- Progress bar above card showing quiz completion

**Answer Feedback**:
- Immediate visual feedback on selection
- Correct answer highlight with checkmark icon
- Incorrect answer indication with explanation panel
- "Next Question" button appears after selection

### Comparison Dashboard
**AI Model Cards**:
- Card-based layout for each AI model (GPT-4, Claude, Gemini, etc.)
- Model name and logo/icon
- Accuracy percentage in large, bold type (JetBrains Mono font)
- Small chart showing performance across categories
- "View Details" expandable section

**Human vs AI Visualization**:
- Horizontal bar chart comparing scores
- Human score prominently featured
- AI models ranked by performance
- Subject-specific breakdown (tabbed or accordion view)

### Results Screen
**Performance Summary**:
- Hero stat: Large score display (e.g., "You scored 78%")
- Percentile ranking against other humans
- Comparison callout: "You beat Claude 3.5 Sonnet but not GPT-4"
- Breakdown by subject category (grid of cards)
- Social sharing buttons
- "Try Again" and "New Category" CTAs

### Category Selection
**Subject Cards**:
- Icon representing subject (science beaker, history scroll, math symbols)
- Subject name and question count
- Difficulty indicator (3-level system)
- Brief description (1 sentence)
- Card hover effect suggesting interactivity

### Supporting Elements
**Badges & Pills**:
- Subject tags: Rounded-full pills with icon + text
- Difficulty: Small badge with dot indicator (Easy/Medium/Hard)
- Achievement badges: After completing categories

**Progress Indicators**:
- Linear progress bar for quiz completion
- Circular progress for time-based questions (if implemented)
- Step indicator for multi-part questions

**Stats Display**:
- Data cards with number + label format
- Use tabular figures (font-feature-settings: "tnum")
- Icon + stat pairs for quick scanning

---

## Animations

**Minimal Animation Strategy**:
- Question transition: Simple fade + slight slide (duration-200)
- Answer selection: Quick scale feedback (scale-95 on click)
- Progress bar: Smooth width transition
- Avoid distracting confetti, explosions, or elaborate celebrations
- Score reveal: Counting animation for numbers (subtle, quick)

---

## Images

**Hero Image**: 
- Placement: Background of hero section with dark gradient overlay
- Description: Abstract visualization showing AI neural network patterns intersecting with human brain synapses, modern digital art style, professional and aspirational
- Treatment: Subtle blur or reduced opacity for text readability

**Subject Category Icons**:
- Use icon library (Heroicons) for subject representations
- Consistent style across all categories

**No other photographic images required** - focus on data visualization and clean interface

---

## Page Structure

**Landing Page**:
1. Hero section with CTA
2. "How It Works" (3-step process with icons)
3. Featured Categories (grid of 6-9 subjects)
4. Global Statistics (quiz attempts, top performers)
5. FAQ accordion
6. Footer with links

**Quiz Page**:
- Persistent top navigation
- Centered question card
- Fixed progress indicator

**Results Page**:
- Score hero section
- Performance breakdown (grid)
- AI comparison visualization
- Action buttons (retake, new category, share)

This design creates an engaging, credible quiz experience that feels like a modern web game while maintaining the academic rigor of the MMLU benchmark.