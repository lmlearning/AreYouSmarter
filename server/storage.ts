import { type User, type InsertUser, type QuizSession, type Question, type Category, type AIExplanation } from "@shared/schema";
import { randomUUID } from "crypto";
import { categories, questions as questionBank } from "./data/questions";
import { promises as fs } from "fs";
import { join } from "path";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCategories(): Promise<Category[]>;
  getQuestionsByCategory(categoryId: string, limit?: number): Promise<Question[]>;
  getRandomQuestions(limit: number): Promise<Question[]>;

  createQuizSession(questions: Question[], categoryId?: string): Promise<QuizSession>;
  getQuizSession(sessionId: string): Promise<QuizSession | undefined>;
  updateQuizSession(sessionId: string, session: Partial<QuizSession>): Promise<QuizSession | undefined>;

  getAIExplanation(questionId: string): Promise<AIExplanation | undefined>;
  saveAIExplanation(explanation: AIExplanation): Promise<void>;
  getAllQuestions(): Promise<Question[]>;
  getExplanationsCount(): Promise<number>;
}

const EXPLANATIONS_FILE = join(process.cwd(), "server", "data", "ai-explanations.json");

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizSessions: Map<string, QuizSession>;
  private aiExplanations: Map<string, AIExplanation>;
  private explanationsLoaded: boolean = false;

  constructor() {
    this.users = new Map();
    this.quizSessions = new Map();
    this.aiExplanations = new Map();
  }

  private async loadExplanations(): Promise<void> {
    if (this.explanationsLoaded) return;

    try {
      const data = await fs.readFile(EXPLANATIONS_FILE, "utf-8");
      const explanations: AIExplanation[] = JSON.parse(data);
      explanations.forEach(exp => {
        this.aiExplanations.set(exp.questionId, exp);
      });
      console.log(`[Storage] Loaded ${explanations.length} precomputed AI explanations`);
    } catch (error) {
      // File doesn't exist yet, start fresh
      console.log("[Storage] No precomputed explanations file found, starting fresh");
    }
    this.explanationsLoaded = true;
  }

  private async saveExplanationsToFile(): Promise<void> {
    try {
      const explanations = Array.from(this.aiExplanations.values());
      await fs.writeFile(EXPLANATIONS_FILE, JSON.stringify(explanations, null, 2), "utf-8");
    } catch (error) {
      console.error("[Storage] Failed to save explanations to file:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getQuestionsByCategory(categoryId: string, limit: number = 10): Promise<Question[]> {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];
    
    const categoryQuestions = questionBank.filter(q => 
      q.subject.toLowerCase() === categoryId.toLowerCase()
    );
    
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(limit, categoryQuestions.length));
  }

  async getRandomQuestions(limit: number = 10): Promise<Question[]> {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(limit, questionBank.length));
  }

  async createQuizSession(questions: Question[], categoryId?: string): Promise<QuizSession> {
    const id = randomUUID();
    const session: QuizSession = {
      id,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      completed: false,
      categoryId,
    };
    this.quizSessions.set(id, session);
    return session;
  }

  async getQuizSession(sessionId: string): Promise<QuizSession | undefined> {
    return this.quizSessions.get(sessionId);
  }

  async updateQuizSession(sessionId: string, updates: Partial<QuizSession>): Promise<QuizSession | undefined> {
    const session = this.quizSessions.get(sessionId);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.quizSessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async getAIExplanation(questionId: string): Promise<AIExplanation | undefined> {
    await this.loadExplanations();
    return this.aiExplanations.get(questionId);
  }

  async saveAIExplanation(explanation: AIExplanation): Promise<void> {
    await this.loadExplanations();
    this.aiExplanations.set(explanation.questionId, explanation);
    await this.saveExplanationsToFile();
  }

  async getAllQuestions(): Promise<Question[]> {
    return questionBank;
  }

  async getExplanationsCount(): Promise<number> {
    await this.loadExplanations();
    return this.aiExplanations.size;
  }
}

export const storage = new MemStorage();
