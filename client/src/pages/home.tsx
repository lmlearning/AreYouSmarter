import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard } from "@/components/category-card";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryIcons } from "@/lib/mockData";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [, setLocation] = useLocation();
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleStartQuiz = () => {
    setLocation(`/quiz?questions=${numberOfQuestions}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    setLocation(`/quiz?category=${categoryId}&questions=${numberOfQuestions}`);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HeroSection onStartQuiz={handleStartQuiz} />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with questions from the MMLU benchmark and see how you compare to the world's most advanced AI models
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Choose a Category</h3>
            <p className="text-sm text-muted-foreground">
              Select from physics, history, math, and more challenging subjects
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Answer Questions</h3>
            <p className="text-sm text-muted-foreground">
              Test your knowledge with real MMLU benchmark questions
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Compare Results</h3>
            <p className="text-sm text-muted-foreground">
              See how you stack up against GPT-4, Claude, and other AI models
            </p>
          </Card>
        </div>

        <div className="mb-12">
          <Card className="p-6 max-w-md mx-auto">
            <Label htmlFor="question-count" className="text-base font-semibold mb-3 block">
              Number of Questions
            </Label>
            <Select value={numberOfQuestions} onValueChange={setNumberOfQuestions}>
              <SelectTrigger id="question-count" data-testid="select-question-count">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Questions</SelectItem>
                <SelectItem value="10">10 Questions</SelectItem>
                <SelectItem value="20">20 Questions</SelectItem>
                <SelectItem value="50">50 Questions</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              Choose how many questions you want to answer in your quiz
            </p>
          </Card>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Challenge</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 h-32 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
                return (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    icon={IconComponent}
                    description={category.description}
                    questionCount={category.questionCount}
                    difficulty={category.difficulty}
                    onClick={() => handleCategorySelect(category.id)}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger data-testid="accordion-what-is-mmlu">
                What is MMLU?
              </AccordionTrigger>
              <AccordionContent>
                MMLU (Massive Multitask Language Understanding) is a benchmark designed to measure knowledge
                across 57 subjects including mathematics, history, computer science, and more. It's widely
                used to evaluate AI models' general knowledge and reasoning abilities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger data-testid="accordion-how-scored">
                How are the questions scored?
              </AccordionTrigger>
              <AccordionContent>
                Each question is scored as correct or incorrect. Your final score is the percentage of
                questions answered correctly, which is then compared to the performance of various AI models
                on the same questions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger data-testid="accordion-ai-comparison">
                How accurate are the AI model comparisons?
              </AccordionTrigger>
              <AccordionContent>
                The AI model scores are based on published benchmark results from official MMLU evaluations.
                These represent the models' performance on the same question set you're answering.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger data-testid="accordion-retake">
                Can I retake the quiz?
              </AccordionTrigger>
              <AccordionContent>
                Yes! You can retake the quiz as many times as you like. Each category has a pool of questions,
                and you'll see different questions each time to keep the challenge fresh.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Are You Smarter Than an AI. Built with MMLU benchmark data.</p>
        </div>
      </footer>
    </div>
  );
}
