import { readFileSync, existsSync } from 'fs';

const questionsFilePath = './server/data/questions.ts';
const explanationsFilePath = './server/data/ai-explanations.json';

// Load existing explanations
let explanations = [];
if (existsSync(explanationsFilePath)) {
  const data = readFileSync(explanationsFilePath, 'utf-8');
  explanations = JSON.parse(data);
}

const explainedIds = new Set(explanations.map(e => e.questionId));

// Parse questions
const questionsContent = readFileSync(questionsFilePath, 'utf-8');
const questionsMatch = questionsContent.match(/export const questions: Question\[\] = \[([\s\S]*)\];/);
const questionsText = questionsMatch[1];
const questionRegex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?subject:\s*"([^"]+)"[\s\S]*?difficulty:\s*"([^"]+)"[\s\S]*?question:\s*"((?:[^"\\]|\\.)*)[\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?explanation:\s*"((?:[^"\\]|\\.)*)"/g;

let questions = [];
let match;
while ((match = questionRegex.exec(questionsText)) !== null) {
  const [_, id, subject, difficulty, question, optionsText, correctAnswer, explanation] = match;
  const optionsMatches = optionsText.matchAll(/"((?:[^"\\]|\\.)*)"/g);
  const options = Array.from(optionsMatches).map(m => m[1]);

  questions.push({
    id,
    subject,
    difficulty,
    question: question.replace(/\\"/g, '"').replace(/\\n/g, ' '),
    options,
    correctAnswer: parseInt(correctAnswer),
    explanation: explanation.replace(/\\"/g, '"')
  });
}

// Get batch size from command line (default 10)
const batchSize = parseInt(process.argv[2]) || 10;

const questionsNeedingExplanations = questions.filter(q => !explainedIds.has(q.id));
const batch = questionsNeedingExplanations.slice(0, batchSize);

console.log(JSON.stringify({
  total: questions.length,
  completed: explainedIds.size,
  remaining: questionsNeedingExplanations.length,
  batch: batch
}, null, 2));
