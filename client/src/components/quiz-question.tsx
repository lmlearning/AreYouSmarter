import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, Sparkles } from "lucide-react";
import { LatexText } from "@/components/latex-text";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AIExplanation } from "@shared/schema";

type QuizQuestionProps = {
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation: string;
  selectedAnswer?: number | null;
  showFeedback?: boolean;
  onAnswerSelect?: (index: number) => void;
  onNext: () => void;
  questionId?: string;
  sessionId?: string;
};

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export function QuizQuestion({
  questionNumber,
  totalQuestions,
  subject,
  difficulty,
  question,
  options,
  correctAnswer,
  explanation,
  selectedAnswer = null,
  showFeedback = false,
  onAnswerSelect,
  onNext,
  questionId,
  sessionId,
}: QuizQuestionProps) {
  const progress = (questionNumber / totalQuestions) * 100;
  const [aiExplanation, setAiExplanation] = useState<AIExplanation | null>(null);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer === null && onAnswerSelect) {
      onAnswerSelect(index);
    }
  };

  const isCorrect = correctAnswer !== undefined && selectedAnswer === correctAnswer;

  const getExplanationMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/explanation/${questionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      if (!response.ok) throw new Error("Failed to get AI explanation");
      return response.json() as Promise<AIExplanation>;
    },
    onSuccess: (data) => {
      setAiExplanation(data);
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{subject}</Badge>
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-2" data-testid="progress-quiz" />
      </div>

      <Card className="p-8">
        <h2 className="text-xl font-medium mb-8 leading-relaxed">
          <LatexText text={question} />
        </h2>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = correctAnswer !== undefined && index === correctAnswer;

            let buttonVariant: "outline" | "default" = "outline";
            let additionalClasses = "";

            if (showFeedback && correctAnswer !== undefined) {
              if (isCorrectOption) {
                additionalClasses = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
              } else if (isSelected && !isCorrectOption) {
                additionalClasses = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              }
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={`w-full justify-start text-left h-auto py-4 px-6 whitespace-normal ${additionalClasses}`}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                data-testid={`button-answer-${index}`}
              >
                <span className="flex-1 break-words">
                  <LatexText text={option} />
                </span>
                {showFeedback && correctAnswer !== undefined && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                )}
                {showFeedback && correctAnswer !== undefined && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                )}
              </Button>
            );
          })}
        </div>

        {showFeedback && correctAnswer !== undefined && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              isCorrect
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}>
              <p className="font-medium mb-2">
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm text-muted-foreground">
                <LatexText text={explanation} />
              </p>
            </div>

            {questionId && sessionId && !aiExplanation && (
              <Button
                onClick={() => getExplanationMutation.mutate()}
                variant="outline"
                className="w-full"
                disabled={getExplanationMutation.isPending}
                data-testid="button-get-ai-explanation"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {getExplanationMutation.isPending ? "Getting AI Explanation..." : "Get AI Explanation"}
              </Button>
            )}

            {aiExplanation && (
              <Card className="p-6 bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    AI Explanation
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Overview</p>
                    <p className="text-muted-foreground">
                      <LatexText text={aiExplanation.explanation} />
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-1">Reasoning</p>
                    <p className="text-muted-foreground">
                      <LatexText text={aiExplanation.reasoning} />
                    </p>
                  </div>

                  {aiExplanation.steps && aiExplanation.steps.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">Step-by-Step</p>
                      <ol className="space-y-2 list-decimal list-inside">
                        {aiExplanation.steps.map((step, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            <LatexText text={step} className="inline" />
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </Card>
            )}

            <Button
              onClick={onNext}
              className="w-full"
              data-testid="button-next-question"
            >
              Next Question
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
