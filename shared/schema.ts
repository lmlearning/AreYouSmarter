import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Question = {
  id: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type AIModel = {
  name: string;
  accuracy: number;
  color: string;
};

export type QuizSession = {
  id: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  score: number;
  completed: boolean;
  categoryId?: string;
};

export type QuizResult = {
  score: number;
  totalQuestions: number;
  percentage: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  aiComparisons: Array<{
    name: string;
    accuracy: number;
    categoryBreakdown?: { category: string; score: number }[];
  }>;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
};
