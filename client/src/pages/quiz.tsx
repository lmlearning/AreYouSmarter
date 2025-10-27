import { useState, useEffect } from "react";
import { QuizQuestion } from "@/components/quiz-question";
import { ResultsDashboard } from "@/components/results-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";
import { useLocation } from "wouter";
import { sampleQuestions, aiModels } from "@/lib/mockData";
import { Question } from "@shared/schema";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [questions] = useState<Question[]>(sampleQuestions.slice(0, 10));

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const categoryBreakdown = questions.reduce((acc, q, idx) => {
    if (!acc[q.subject]) {
      acc[q.subject] = { correct: 0, total: 0 };
    }
    acc[q.subject].total++;
    if (answers[q.id] === q.correctAnswer) {
      acc[q.subject].correct++;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const aiComparisons = aiModels.map((model) => ({
    name: model.name,
    accuracy: model.accuracy,
    categoryBreakdown: Object.keys(categoryBreakdown).map((cat) => ({
      category: cat,
      score: Math.round(model.accuracy + (Math.random() * 10 - 5)),
    })),
  }));

  useEffect(() => {
    const correctAnswers = Object.entries(answers).filter(
      ([questionId, answer]) => {
        const q = questions.find((qu) => qu.id === questionId);
        return q && answer === q.correctAnswer;
      }
    ).length;
    setScore(correctAnswers);
  }, [answers, questions]);

  if (quizComplete) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <ResultsDashboard
          score={score}
          totalQuestions={questions.length}
          categoryBreakdown={categoryBreakdown}
          aiComparisons={aiComparisons}
          onRetake={() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setAnswers({});
            setQuizComplete(false);
          }}
          onGoHome={() => setLocation("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-home-nav"
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-exit-quiz"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <QuizQuestion
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        subject={currentQuestion.subject}
        difficulty={currentQuestion.difficulty}
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        explanation={currentQuestion.explanation}
        onNext={() => {
          handleNext();
        }}
      />
    </div>
  );
}
