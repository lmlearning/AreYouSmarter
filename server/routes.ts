import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiModels } from "./data/ai-models";
import OpenAI from "openai";

// Lazy-initialize OpenAI client to ensure env vars are loaded first
let openai: OpenAI;
function getOpenAI() {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/quiz/start", async (req, res) => {
    try {
      const { categoryId, numberOfQuestions } = req.body;
      const limit = numberOfQuestions || 10;
      
      let questions;
      if (categoryId) {
        questions = await storage.getQuestionsByCategory(categoryId, limit);
      } else {
        questions = await storage.getRandomQuestions(limit);
      }

      if (questions.length === 0) {
        return res.status(404).json({ error: "No questions found" });
      }

      const session = await storage.createQuizSession(questions, categoryId);
      
      const sanitizedQuestions = session.questions.map(q => ({
        id: q.id,
        subject: q.subject,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options,
      }));

      res.json({
        sessionId: session.id,
        questions: sanitizedQuestions,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to start quiz" });
    }
  });

  app.post("/api/quiz/:sessionId/answer", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { questionId, answer } = req.body;

      if (typeof answer !== "number") {
        return res.status(400).json({ error: "Invalid answer format" });
      }

      const session = await storage.getQuizSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }

      const question = session.questions.find(q => q.id === questionId);
      if (!question) {
        return res.status(400).json({ error: "Question not found in this session" });
      }

      const isCorrect = answer === question.correctAnswer;
      const updatedAnswers = { ...session.answers, [questionId]: answer };
      
      const correctCount = Object.entries(updatedAnswers).filter(([qId, ans]) => {
        const q = session.questions.find(qu => qu.id === qId);
        return q && ans === q.correctAnswer;
      }).length;

      await storage.updateQuizSession(sessionId, {
        answers: updatedAnswers,
        score: correctCount,
      });

      res.json({
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit answer" });
    }
  });

  app.get("/api/quiz/:sessionId/results", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getQuizSession(sessionId);

      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }

      await storage.updateQuizSession(sessionId, { completed: true });

      const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
      
      session.questions.forEach((q) => {
        if (!categoryBreakdown[q.subject]) {
          categoryBreakdown[q.subject] = { correct: 0, total: 0 };
        }
        categoryBreakdown[q.subject].total++;
        
        if (session.answers[q.id] === q.correctAnswer) {
          categoryBreakdown[q.subject].correct++;
        }
      });

      const percentage = Math.round((session.score / session.questions.length) * 100);

      const aiComparisons = aiModels.map(model => ({
        name: model.name,
        accuracy: model.accuracy,
        categoryBreakdown: Object.keys(categoryBreakdown).map(cat => ({
          category: cat,
          score: Math.round(model.accuracy + (Math.random() * 10 - 5)),
        })),
      }));

      res.json({
        score: session.score,
        totalQuestions: session.questions.length,
        percentage,
        categoryBreakdown,
        aiComparisons,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });

  app.post("/api/explanation/:questionId", async (req, res) => {
    try {
      console.log(`[AI Explanation] Request received for question: ${req.params.questionId}`);
      const { questionId } = req.params;
      const { sessionId } = req.body;

      const session = await storage.getQuizSession(sessionId);
      if (!session) {
        console.log(`[AI Explanation] Session not found: ${sessionId}`);
        return res.status(404).json({ error: "Quiz session not found" });
      }

      const question = session.questions.find(q => q.id === questionId);
      if (!question) {
        console.log(`[AI Explanation] Question not found in session: ${questionId}`);
        return res.status(404).json({ error: "Question not found in session" });
      }

      const cached = await storage.getAIExplanation(questionId);
      if (cached) {
        console.log(`[AI Explanation] Returning cached explanation for: ${questionId}`);
        return res.json(cached);
      }

      console.log(`[AI Explanation] Generating new explanation for: ${questionId}`);
      const correctOption = question.options[question.correctAnswer];
      const incorrectOptions = question.options.filter((_, idx) => idx !== question.correctAnswer);

      const prompt = `You are a world-class educator and subject matter expert. Your goal is to provide an exceptionally clear, insightful, and comprehensive explanation that helps students deeply understand both the correct answer and the underlying concepts.

Question: ${question.question}

Options:
${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}

Correct Answer: ${correctOption}

Please provide an outstanding educational explanation with the following:

1. EXPLANATION (2-3 sentences): Start with a clear, confident statement of why the correct answer is right. Make this immediately understandable and engaging.

2. REASONING (3-4 paragraphs): Provide deep, insightful reasoning that:
   - Explains the fundamental concepts and principles at play
   - Shows the logical thought process a domain expert would use
   - Connects the question to broader understanding in the field
   - Explains WHY the correct answer works, not just THAT it works
   - Addresses why incorrect options might seem plausible but are wrong

3. STEPS (4-6 clear steps): Break down the problem-solving process into concrete, actionable steps that:
   - Start from first principles or what we're given
   - Build logically toward the solution
   - Include key insights or "aha moments" along the way
   - End with the conclusion and validation
   - Each step should be substantive and educational (not just procedural)

Make your explanation:
- Precise and accurate, using domain-appropriate terminology
- Rich with insight - teach concepts, not just the answer
- Engaging and clear enough for someone learning this material
- Comprehensive enough to prevent similar mistakes in the future

Format your response as JSON with these exact fields:
{
  "explanation": "Clear, confident 2-3 sentence overview of why this answer is correct",
  "reasoning": "Deep, insightful 3-4 paragraph analysis covering concepts, logic, why this answer works, and why others don't",
  "steps": ["Step 1: [Substantive step]", "Step 2: [Substantive step]", "Step 3: [Substantive step]", "Step 4: [Substantive step]"]
}`;

      console.log(`[AI Explanation] Calling OpenAI Responses API with GPT-5...`);
      const completion = await getOpenAI().responses.create({
        model: "gpt-5",
        input: [
          {
            role: "user",
            content: prompt
          }
        ],
        reasoning: {
          effort: "high"
        },
        text: {
          verbosity: "high",
          format: {
            type: "json_object"
          }
        }
      });

      console.log(`[AI Explanation] Received response from OpenAI`);
      const response = completion.output_text;
      if (!response) {
        throw new Error("No response from AI");
      }

      const parsed = JSON.parse(response);
      
      const aiExplanation = {
        questionId,
        explanation: parsed.explanation || "No explanation provided",
        reasoning: parsed.reasoning || "No reasoning provided",
        steps: parsed.steps || [],
        generatedAt: new Date().toISOString(),
      };

      await storage.saveAIExplanation(aiExplanation);
      console.log(`[AI Explanation] Explanation saved and returned successfully`);

      res.json(aiExplanation);
    } catch (error) {
      console.error("[AI Explanation] Error:", error);
      if (error instanceof Error) {
        console.error("[AI Explanation] Error message:", error.message);
        console.error("[AI Explanation] Error stack:", error.stack);
      }
      res.status(500).json({ error: "Failed to generate AI explanation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
