import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Target, RotateCcw, Home } from "lucide-react";
import { AIModelCard } from "./ai-model-card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

type ResultsDashboardProps = {
  score: number;
  totalQuestions: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  aiComparisons: Array<{
    name: string;
    accuracy: number;
    categoryBreakdown?: { category: string; score: number }[];
  }>;
  onRetake: () => void;
  onGoHome: () => void;
};

export function ResultsDashboard({
  score,
  totalQuestions,
  categoryBreakdown,
  aiComparisons,
  onRetake,
  onGoHome,
}: ResultsDashboardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const humanRank = aiComparisons.filter((ai) => ai.accuracy < percentage).length + 1;
  const totalModels = aiComparisons.length + 1;

  const chartData = [
    { name: "You", score: percentage, fill: "hsl(var(--primary))" },
    ...aiComparisons.map((ai, idx) => ({
      name: ai.name,
      score: ai.accuracy,
      fill: `hsl(var(--chart-${(idx % 5) + 1}))`,
    })),
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          You scored{" "}
          <span className="text-primary font-mono">{percentage}%</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          {score} out of {totalQuestions} questions correct
        </p>
        <Badge variant="secondary" className="text-base px-4 py-1">
          Rank #{humanRank} of {totalModels}
        </Badge>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Performance Comparison
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Category Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryBreakdown).map(([category, stats]) => {
            const catPercentage = Math.round((stats.correct / stats.total) * 100);
            return (
              <Card key={category} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{category}</h3>
                  <Badge variant="outline" className="font-mono">
                    {catPercentage}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {stats.correct} of {stats.total} correct
                </p>
                <Progress value={catPercentage} className="h-2" />
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">AI Model Comparisons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiComparisons
            .sort((a, b) => b.accuracy - a.accuracy)
            .map((model, idx) => (
              <AIModelCard
                key={model.name}
                name={model.name}
                accuracy={model.accuracy}
                rank={idx + 1}
                categoryBreakdown={model.categoryBreakdown}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" onClick={onRetake} data-testid="button-retake">
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Another Quiz
        </Button>
        <Button size="lg" variant="outline" onClick={onGoHome} data-testid="button-home">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
