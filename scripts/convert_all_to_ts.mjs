import fs from 'fs';

const inputFile = process.argv[2] || 'all_mmlu_data.json';
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const questions = data.questions;

// Group by subject to count
const categoryCounts = {};
questions.forEach(q => {
  categoryCounts[q.subject] = (categoryCounts[q.subject] || 0) + 1;
});

console.error("Category counts:", categoryCounts);

// Generate TypeScript file
let ts = `import { Question, Category } from "@shared/schema";\n\n`;

// All categories including new ones
ts += `export const categories: Category[] = [\n`;
const cats = [
  { id: "physics", name: "Physics", icon: "Atom", description: "Test your understanding of classical and modern physics concepts", difficulty: "Hard" },
  { id: "history", name: "History", icon: "History", description: "Explore world history from ancient civilizations to modern times", difficulty: "Medium" },
  { id: "mathematics", name: "Mathematics", icon: "Calculator", description: "Challenge yourself with algebra, geometry, and calculus problems", difficulty: "Hard" },
  { id: "geography", name: "Geography", icon: "Globe", description: "Discover facts about countries, capitals, and natural features", difficulty: "Easy" },
  { id: "biology", name: "Biology", icon: "Dna", description: "Understand living organisms and life processes", difficulty: "Medium" },
  { id: "literature", name: "Literature", icon: "BookOpen", description: "Explore classic and contemporary works of literature", difficulty: "Medium" },
  { id: "chemistry", name: "Chemistry", icon: "Microscope", description: "Master chemical reactions, elements, and compounds", difficulty: "Hard" },
  { id: "philosophy", name: "Philosophy", icon: "Lightbulb", description: "Delve into ethical theories and philosophical thought", difficulty: "Hard" },
  { id: "business", name: "Business", icon: "Briefcase", description: "Test your knowledge of accounting, management, and business ethics", difficulty: "Hard" },
  { id: "law", name: "Law", icon: "Scale", description: "Explore legal principles, international law, and jurisprudence", difficulty: "Hard" },
  { id: "medicine", name: "Medicine", icon: "Stethoscope", description: "Challenge yourself with clinical knowledge and medical sciences", difficulty: "Hard" },
  { id: "psychology", name: "Psychology", icon: "Brain", description: "Understand human behavior and psychological principles", difficulty: "Medium" },
  { id: "computer_science", name: "Computer Science", icon: "Laptop", description: "Test your programming, algorithms, and computer security knowledge", difficulty: "Hard" },
  { id: "astronomy", name: "Astronomy", icon: "Telescope", description: "Explore the universe, stars, and celestial phenomena", difficulty: "Hard" },
  { id: "engineering", name: "Engineering", icon: "Cog", description: "Challenge yourself with electrical engineering principles", difficulty: "Hard" },
  { id: "social_sciences", name: "Social Sciences", icon: "Users", description: "Test your knowledge of economics, politics, and sociology", difficulty: "Medium" },
  { id: "general", name: "General Knowledge", icon: "Book", description: "Miscellaneous topics and global facts", difficulty: "Medium" },
];

cats.forEach((cat, i) => {
  const count = categoryCounts[cat.id] || 0;
  if (count > 0) {  // Only include categories with questions
    ts += `  {\n`;
    ts += `    id: "${cat.id}",\n`;
    ts += `    name: "${cat.name}",\n`;
    ts += `    icon: "${cat.icon}",\n`;
    ts += `    description: "${cat.description}",\n`;
    ts += `    questionCount: ${count},\n`;
    ts += `    difficulty: "${cat.difficulty}",\n`;
    ts += `  },\n`;
  }
});
ts = ts.slice(0, -2) + '\n';  // Remove last comma
ts += `];\n\n`;

// Questions
ts += `export const questions: Question[] = [\n`;
questions.forEach((q, i) => {
  const opts = q.options.map(o => JSON.stringify(o)).join(', ');
  
  ts += `  {\n`;
  ts += `    id: ${JSON.stringify(q.id)},\n`;
  ts += `    subject: ${JSON.stringify(q.subject)},\n`;
  ts += `    difficulty: ${JSON.stringify(q.difficulty)},\n`;
  ts += `    question: ${JSON.stringify(q.question)},\n`;
  ts += `    options: [${opts}],\n`;
  ts += `    correctAnswer: ${q.correctAnswer},\n`;
  ts += `    explanation: ${JSON.stringify(q.explanation)},\n`;
  ts += `  }${i < questions.length - 1 ? ',' : ''}\n`;
});
ts += `];\n`;

console.log(ts);
console.error(`Generated questions.ts with ${questions.length} questions across ${cats.filter(c => categoryCounts[c.id] > 0).length} categories`);
