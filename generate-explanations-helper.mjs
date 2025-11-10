import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Read the questions file and extract all questions
const questionsFilePath = './server/data/questions.ts';
const explanationsFilePath = './server/data/ai-explanations.json';

console.log('Loading questions...');

// Load existing explanations if any
let explanations = [];
if (existsSync(explanationsFilePath)) {
  const data = readFileSync(explanationsFilePath, 'utf-8');
  explanations = JSON.parse(data);
  console.log(`Found ${explanations.length} existing explanations`);
}

// Create a Set of question IDs that already have explanations
const explainedIds = new Set(explanations.map(e => e.questionId));

// Parse questions from the TypeScript file
const questionsContent = readFileSync(questionsFilePath, 'utf-8');

// Extract the questions array
const questionsMatch = questionsContent.match(/export const questions: Question\[\] = \[([\s\S]*)\];/);
if (!questionsMatch) {
  console.error('Could not find questions array');
  process.exit(1);
}

// Parse questions by finding complete question objects
const questionsText = questionsMatch[1];
const questionRegex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?subject:\s*"([^"]+)"[\s\S]*?difficulty:\s*"([^"]+)"[\s\S]*?question:\s*"((?:[^"\\]|\\.)*)[\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?explanation:\s*"((?:[^"\\]|\\.)*)"/g;

let questions = [];
let match;
while ((match = questionRegex.exec(questionsText)) !== null) {
  const [_, id, subject, difficulty, question, optionsText, correctAnswer, explanation] = match;

  // Parse options
  const optionsMatches = optionsText.matchAll(/"((?:[^"\\]|\\.)*)"/g);
  const options = Array.from(optionsMatches).map(m => m[1]);

  questions.push({
    id,
    subject,
    difficulty,
    question: question.replace(/\\"/g, '"'),
    options,
    correctAnswer: parseInt(correctAnswer),
    explanation: explanation.replace(/\\"/g, '"')
  });
}

console.log(`Found ${questions.length} questions`);

// Filter to only questions without explanations
const questionsNeedingExplanations = questions.filter(q => !explainedIds.has(q.id));
console.log(`Questions needing explanations: ${questionsNeedingExplanations.length}`);

// Output next question to process
if (questionsNeedingExplanations.length > 0) {
  const nextQuestion = questionsNeedingExplanations[0];
  console.log('\n=== NEXT QUESTION TO PROCESS ===');
  console.log(JSON.stringify(nextQuestion, null, 2));
  console.log('\n=== END QUESTION ===');
  console.log(`\nProgress: ${explainedIds.size}/${questions.length} (${Math.round(explainedIds.size/questions.length*100)}%)`);
} else {
  console.log('\nAll questions have explanations!');
}

// Save function for adding a new explanation
export function saveExplanation(explanation) {
  explanations.push(explanation);
  writeFileSync(explanationsFilePath, JSON.stringify(explanations, null, 2));
  console.log(`Saved explanation for ${explanation.questionId}`);
}
