#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Configuration
const BATCH_SIZE = 50;  // Process 50 questions at a time
const START_INDEX = 2825;  // Continue from where we left off
const DATA_FILE = 'scripts/all_mmlu_data_clean.json';
const EXPLANATIONS_FILE = 'server/data/ai-explanations.json';

// Load data
async function loadData() {
  const questionsData = JSON.parse(await readFile(DATA_FILE, 'utf-8'));
  let explanations = [];
  try {
    explanations = JSON.parse(await readFile(EXPLANATIONS_FILE, 'utf-8'));
  } catch (e) {
    console.log('No existing explanations found, starting fresh');
  }
  return { questions: questionsData.questions, explanations };
}

// Save explanations
async function saveExplanations(explanations) {
  await writeFile(EXPLANATIONS_FILE, JSON.stringify(explanations, null, 2), 'utf-8');
  console.log(`Saved ${explanations.length} explanations to ${EXPLANATIONS_FILE}`);
}

// Process a batch
async function processBatch(questions, startIdx, batchSize) {
  const endIdx = Math.min(startIdx + batchSize, questions.length);
  const batch = questions.slice(startIdx, endIdx);

  console.log(`\n${'='.repeat(80)}`);
  console.log(`Processing batch: ${startIdx} to ${endIdx - 1} (${batch.length} questions)`);
  console.log(`${'='.repeat(80)}\n`);

  const newExplanations = [];

  for (let i = 0; i < batch.length; i++) {
    const question = batch[i];
    const globalIdx = startIdx + i;

    console.log(`\n[${globalIdx + 1}/${questions.length}] ${question.id}`);
    console.log(`Subject: ${question.subject} | Difficulty: ${question.difficulty}`);
    console.log(`Q: ${question.question.substring(0, 100)}...`);
    console.log(`Options: ${question.options.map((o, idx) => `[${idx}] ${o.substring(0, 50)}...`).join(' | ')}`);

    // PLACEHOLDER - This is where Claude will add actual explanations
    // For now, we'll mark them for manual review
    const explanation = {
      questionId: question.id,
      explanation: "PENDING_MANUAL_GENERATION",
      reasoning: "PENDING_MANUAL_GENERATION",
      steps: ["PENDING_MANUAL_GENERATION"],
      generatedAt: new Date().toISOString(),
      needsReview: true
    };

    newExplanations.push(explanation);
  }

  return newExplanations;
}

// Main
async function main() {
  const { questions, explanations } = await loadData();

  console.log(`Total questions: ${questions.length}`);
  console.log(`Existing explanations: ${explanations.length}`);
  console.log(`Starting from index: ${START_INDEX}`);

  const newExplanations = await processBatch(questions, START_INDEX, BATCH_SIZE);
  const allExplanations = [...explanations, ...newExplanations];

  await saveExplanations(allExplanations);

  console.log(`\n${'='.repeat(80)}`);
  console.log(`COMPLETE! Generated ${newExplanations.length} new explanations`);
  console.log(`Total explanations: ${allExplanations.length}/${questions.length} (${(allExplanations.length / questions.length * 100).toFixed(2)}%)`);
  console.log(`${'='.repeat(80)}\n`);
}

main().catch(console.error);
