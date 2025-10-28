import { useState, useEffect } from "react";
import { QuizQuestion } from "@/components/quiz-question";
import { ResultsDashboard } from "@/components/results-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Home, X } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuizResult } from "@shared/schema";

type QuizQuestionData = {
  id: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
};

type StartQuizResponse = {
  sessionId: string;
  questions: QuizQuestionData[];
};

type AnswerResponse = {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
};

export default function Quiz() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const categoryId = params.get("category");
  const numberOfQuestions = parseInt(params.get("questions") || "10", 10);
  const { toast } = useToast();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<AnswerResponse | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const startQuizMutation = useMutation({
    mutationFn: async ({ categoryId, numberOfQuestions }: { categoryId: string | null; numberOfQuestions: number }) => {
      const response = await fetch("/api/quiz/start", {
        method: "POST",
        body: JSON.stringify({ categoryId, numberOfQuestions }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to start quiz");
      return response.json() as Promise<StartQuizResponse>;
    },
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setQuestions(data.questions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      setQuizComplete(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive",
      });
      setLocation("/");
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async ({ sessionId, questionId, answer }: { sessionId: string; questionId: string; answer: number }) => {
      const response = await fetch(`/api/quiz/${sessionId}/answer`, {
        method: "POST",
        body: JSON.stringify({ questionId, answer }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to submit answer");
      return response.json() as Promise<AnswerResponse>;
    },
    onSuccess: (data) => {
      setAnswerFeedback(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
      setSelectedAnswer(null);
    },
  });

  const { data: results, refetch: fetchResults } = useQuery({
    queryKey: ["/api/quiz", sessionId, "results"],
    queryFn: async () => {
      if (!sessionId) return null;
      const response = await fetch(`/api/quiz/${sessionId}/results`);
      if (!response.ok) throw new Error("Failed to fetch results");
      return response.json() as Promise<QuizResult>;
    },
    enabled: false,
  });

  useEffect(() => {
    startQuizMutation.mutate({ categoryId, numberOfQuestions });
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null || !sessionId || !currentQuestion) return;
    
    setSelectedAnswer(answer);
    submitAnswerMutation.mutate({
      sessionId,
      questionId: currentQuestion.id,
      answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswerFeedback(null);
    } else {
      fetchResults().then(({ data }) => {
        if (data) {
          setQuizComplete(true);
        } else {
          toast({
            title: "Error",
            description: "Failed to load results. Please try again.",
            variant: "destructive",
          });
        }
      });
    }
  };

  if (startQuizMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete && results) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <ResultsDashboard
          score={results.score}
          totalQuestions={results.totalQuestions}
          categoryBreakdown={results.categoryBreakdown}
          aiComparisons={results.aiComparisons}
          onRetake={() => {
            startQuizMutation.mutate({ categoryId, numberOfQuestions });
          }}
          onGoHome={() => setLocation("/")}
        />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No questions available</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            Go Home
          </Button>
        </div>
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
        correctAnswer={answerFeedback?.correctAnswer}
        explanation={answerFeedback?.explanation ?? ""}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showFeedback={answerFeedback !== null}
        onNext={handleNext}
      />
    </div>
  );
}
