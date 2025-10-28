import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiModels } from "./data/ai-models";

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

  const httpServer = createServer(app);
  return httpServer;
}
