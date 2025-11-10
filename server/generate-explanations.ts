import { storage } from "./storage";
import type { Question, AIExplanation } from "@shared/schema";

async function generateExplanations() {
  console.log("Starting explanation generation...");

  const allQuestions = await storage.getAllQuestions();
  const existingCount = await storage.getExplanationsCount();

  console.log(`Total questions: ${allQuestions.length}`);
  console.log(`Existing explanations: ${existingCount}`);
  console.log(`Questions remaining: ${allQuestions.length - existingCount}`);

  let generated = 0;
  let skipped = 0;

  for (const question of allQuestions) {
    const existing = await storage.getAIExplanation(question.id);
    if (existing) {
      skipped++;
      continue;
    }

    console.log(`\nProcessing question ${generated + skipped + 1}/${allQuestions.length}: ${question.id}`);
    console.log(`Subject: ${question.subject} | Difficulty: ${question.difficulty}`);
    console.log(`Question: ${question.question.substring(0, 80)}...`);

    // Placeholder - Claude will generate the actual explanations
    const explanation: AIExplanation = {
      questionId: question.id,
      explanation: "PENDING",
      reasoning: "PENDING",
      steps: ["PENDING"],
      generatedAt: new Date().toISOString()
    };

    await storage.saveAIExplanation(explanation);
    generated++;

    if (generated % 10 === 0) {
      console.log(`Progress: ${generated} generated, ${skipped} skipped`);
    }
  }

  console.log(`\nCompleted! Generated: ${generated}, Skipped: ${skipped}`);
}

// Export for external use
export { generateExplanations };

// Can be run directly
if (require.main === module) {
  generateExplanations().catch(console.error);
}
