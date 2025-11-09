# Local Development Setup Guide

This guide will help you set up "Are You Smarter Than an AI" on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **PostgreSQL** (optional, for persistent storage) - [Download here](https://www.postgresql.org/download/)

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AreYouSmarter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
```

**How to get an OpenAI API key:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

**Note:** The OpenAI API is pay-as-you-go. New accounts get $5 in free credits. AI explanations cost approximately $0.01-0.05 per explanation depending on complexity.

### 4. Run the Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5000**

That's it! You're ready to go! 🎉

---

## Database Setup (Optional)

By default, the app uses **in-memory storage** which means quiz sessions are lost when you restart the server. If you want persistent storage, follow these steps:

### Option 1: Use PostgreSQL Locally

#### Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE areyousmarter;
CREATE USER quizuser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE areyousmarter TO quizuser;
\q
```

#### Update .env File

```bash
DATABASE_URL=postgresql://quizuser:yourpassword@localhost:5432/areyousmarter
```

#### Run Database Migrations

```bash
npm run db:push
```

### Option 2: Use Cloud PostgreSQL (Easier)

Use a free managed PostgreSQL service:

#### Neon (Recommended - Free Tier Available)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Add to `.env`:
   ```bash
   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### Supabase (Alternative)

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the "Connection string" (Transaction Mode)
5. Add to `.env`:
   ```bash
   DATABASE_URL=postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

#### Run Migrations

```bash
npm run db:push
```

---

## Understanding the App Structure

```
AreYouSmarter/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/       # Quiz, Home, Results pages
│   │   ├── components/  # UI components
│   │   └── lib/         # Utilities, theme
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # In-memory storage
│   └── data/
│       ├── questions.ts # 14,042 MMLU questions
│       └── ai-models.ts # AI model benchmark data
├── db/                  # Database schema (Drizzle ORM)
├── scripts/             # Data processing scripts
└── .env                 # Your environment variables
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start development server (port 5000)
npm run build            # Build for production
npm run start            # Run production server
npm run preview          # Preview production build

# Database
npm run db:generate      # Generate migration files
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio (GUI)

# Data Processing (Advanced)
python scripts/download_mmlu.py        # Re-download MMLU dataset
node scripts/convert_to_ts.js          # Convert parquet to TypeScript
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | **Yes** for AI explanations | - | Your OpenAI API key from platform.openai.com |
| `DATABASE_URL` | No | In-memory | PostgreSQL connection string |
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | development | Environment mode |

---

## Features & How They Work

### 1. Quiz Questions
- **14,042 pre-loaded questions** from the MMLU benchmark
- 17 academic categories (Physics, History, Math, etc.)
- All stored in `server/data/questions.ts` (no external API calls)
- Questions are selected randomly or by category

### 2. AI Explanations (Requires OpenAI API Key)
- Uses **GPT-4** (or GPT-5 if available) to generate step-by-step explanations
- **First request:** 30-60 seconds (AI generates explanation)
- **Subsequent requests:** Instant (cached in memory)
- **Cost:** ~$0.01-0.05 per explanation
- **Optional:** App works without API key, explanations just won't generate

### 3. AI Model Comparisons
- Compares your score to GPT-4, Claude 3.5 Sonnet, Gemini Ultra, GPT-3.5
- Benchmark scores are hardcoded from research papers
- No actual AI API calls for comparisons (just static data)

### 4. Storage Options
- **In-Memory (Default):** Sessions lost on server restart, perfect for testing
- **PostgreSQL:** Persistent storage, survives restarts

---

## Troubleshooting

### "Cannot find module '@replit/...'"

This error means the Replit dependencies weren't fully removed. Run:

```bash
npm install
```

### "OpenAI API error: 401 Unauthorized"

Your API key is invalid or missing. Check:
1. `.env` file exists and has `OPENAI_API_KEY=sk-proj-...`
2. The key is correct (no extra spaces)
3. Restart the server after changing `.env`

### "Port 5000 is already in use"

Another app is using port 5000. Either:
1. Stop the other app
2. Change `PORT=5001` in `.env`

### Database Connection Errors

If using PostgreSQL:
1. Verify `DATABASE_URL` is correct
2. Check PostgreSQL is running: `pg_isready`
3. Test connection: `psql $DATABASE_URL`
4. Run migrations: `npm run db:push`

### App Builds But Doesn't Load

1. Check browser console for errors (F12)
2. Verify server is running on http://localhost:5000
3. Try clearing browser cache
4. Check `npm run dev` output for errors

---

## Testing the Setup

### Test 1: Basic App Works
```bash
npm run dev
# Open http://localhost:5000
# Click "Start Quiz" - should load questions
```

### Test 2: AI Explanations (Requires API Key)
```bash
# Take a quiz, answer questions
# Click "Get AI Explanation" button
# Should see step-by-step explanation (may take 30-60s first time)
```

### Test 3: Database (If Configured)
```bash
npm run db:studio
# Opens GUI at http://localhost:4983
# Should see quiz_sessions, questions tables
```

---

## Data Overview

The app includes **14,042 MMLU questions** across these categories:

| Category | # Questions | Difficulty |
|----------|-------------|------------|
| Physics | ~900 | Medium-Hard |
| Mathematics | ~800 | Hard |
| History | ~850 | Medium |
| Computer Science | ~750 | Medium-Hard |
| Biology | ~900 | Medium |
| Chemistry | ~800 | Medium-Hard |
| Literature | ~650 | Medium |
| Philosophy | ~700 | Medium |
| Business | ~600 | Easy-Medium |
| Law | ~850 | Hard |
| Medicine | ~900 | Hard |
| Psychology | ~700 | Medium |
| Geography | ~600 | Easy-Medium |
| Astronomy | ~500 | Medium |
| Engineering | ~750 | Medium-Hard |
| Social Sciences | ~700 | Medium |
| General Knowledge | ~592 | Easy-Medium |

**Total:** 14,042 questions (approximately 300 hours of quiz content!)

---

## OpenAI API Costs

If you're worried about costs, here's the breakdown:

### Cost Per Explanation
- **GPT-4 Turbo:** ~$0.01-0.05 per explanation
- **GPT-3.5 Turbo:** ~$0.001-0.005 per explanation

### Monthly Estimates
- **Light use** (10 explanations/day): ~$3-15/month
- **Medium use** (50 explanations/day): ~$15-75/month
- **Heavy use** (200 explanations/day): ~$60-300/month

### Cost Reduction Tips
1. **Use caching** (already implemented!) - explanations are cached
2. **Switch to GPT-3.5** - edit `server/routes.ts:195` change `"gpt-5"` to `"gpt-3.5-turbo"`
3. **Set rate limits** - limit explanations per user
4. **Make it optional** - users choose when to generate explanations

---

## Next Steps

1. **Customize Questions:** Edit `server/data/questions.ts` or add new categories
2. **Change AI Model:** Edit `server/routes.ts:195` to use different models
3. **Add Authentication:** Implement user accounts (Passport.js already included!)
4. **Deploy to Production:** See deployment options in main README
5. **Add More Features:**
   - Leaderboards
   - Timed quizzes
   - Multiplayer mode
   - Custom quiz creation

---

## Getting Help

- **OpenAI API Issues:** [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **Database Issues:** [https://neon.tech/docs](https://neon.tech/docs) or [https://supabase.com/docs](https://supabase.com/docs)
- **Vite/React Issues:** [https://vitejs.dev](https://vitejs.dev)
- **Node.js Issues:** [https://nodejs.org/docs](https://nodejs.org/docs)

---

## Important Notes

✅ **App works WITHOUT OpenAI API key** - quiz functionality is fully operational, you just won't get AI explanations

✅ **App works WITHOUT database** - uses in-memory storage by default

✅ **No Replit dependency** - runs on any machine with Node.js

✅ **All quiz data is local** - 14,042 questions pre-loaded, no external API calls

✅ **Free to run locally** - only cost is OpenAI API if you want explanations

---

Enjoy building and testing! 🚀
