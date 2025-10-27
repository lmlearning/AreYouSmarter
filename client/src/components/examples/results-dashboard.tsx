import { ResultsDashboard } from "../results-dashboard";

export default function ResultsDashboardExample() {
  return (
    <ResultsDashboard
      score={7}
      totalQuestions={10}
      categoryBreakdown={{
        Physics: { correct: 3, total: 4 },
        History: { correct: 2, total: 3 },
        Mathematics: { correct: 2, total: 3 },
      }}
      aiComparisons={[
        {
          name: "GPT-4",
          accuracy: 86,
          categoryBreakdown: [
            { category: "Physics", score: 92 },
            { category: "History", score: 84 },
            { category: "Mathematics", score: 88 },
          ],
        },
        {
          name: "Claude 3.5 Sonnet",
          accuracy: 82,
          categoryBreakdown: [
            { category: "Physics", score: 85 },
            { category: "History", score: 80 },
            { category: "Mathematics", score: 81 },
          ],
        },
        {
          name: "Gemini Ultra",
          accuracy: 79,
        },
      ]}
      onRetake={() => console.log("Retake quiz")}
      onGoHome={() => console.log("Go home")}
    />
  );
}
