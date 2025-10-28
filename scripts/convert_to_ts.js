const fs = require('fs');

const data = JSON.parse(fs.readFileSync('mmlu_data.json', 'utf8'));
const questions = data.questions;

// Group by subject to count
const categoryCounts = {};
questions.forEach(q => {
  categoryCounts[q.subject] = (categoryCounts[q.subject] || 0) + 1;
});

// Generate TypeScript file
let ts = `import { Question, Category } from "@shared/schema";\n\n`;

// Categories
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
];

cats.forEach((cat, i) => {
  const count = categoryCounts[cat.id] || 0;
  ts += `  {\n`;
  ts += `    id: "${cat.id}",\n`;
  ts += `    name: "${cat.name}",\n`;
  ts += `    icon: "${cat.icon}",\n`;
  ts += `    description: "${cat.description}",\n`;
  ts += `    questionCount: ${count},\n`;
  ts += `    difficulty: "${cat.difficulty}",\n`;
  ts += `  }${i < cats.length - 1 ? ',' : ''}\n`;
});
ts += `];\n\n`;

// Questions
ts += `export const questions: Question[] = [\n`;
questions.forEach((q, i) => {
  const opts = q.options.map(o => JSON.stringify(o)).join(', ');
  const exp = q.explanation.replace(/"/g, '\\"');
  
  ts += `  {\n`;
  ts += `    id: "${q.id}",\n`;
  ts += `    subject: "${q.subject}",\n`;
  ts += `    difficulty: "${q.difficulty}",\n`;
  ts += `    question: ${JSON.stringify(q.question)},\n`;
  ts += `    options: [${opts}],\n`;
  ts += `    correctAnswer: ${q.correctAnswer},\n`;
  ts += `    explanation: "${exp}",\n`;
  ts += `  }${i < questions.length - 1 ? ',' : ''}\n`;
});
ts += `];\n`;

fs.writeFileSync('../server/data/questions.ts', ts);
console.log(`Generated questions.ts with ${questions.length} questions`);
