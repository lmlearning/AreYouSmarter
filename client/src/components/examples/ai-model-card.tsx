import { AIModelCard } from "../ai-model-card";

export default function AIModelCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <AIModelCard
        name="GPT-4"
        accuracy={86}
        rank={1}
        categoryBreakdown={[
          { category: "Science", score: 92 },
          { category: "History", score: 84 },
          { category: "Math", score: 88 },
        ]}
      />
      <AIModelCard
        name="Claude 3.5 Sonnet"
        accuracy={82}
        rank={2}
        categoryBreakdown={[
          { category: "Science", score: 85 },
          { category: "History", score: 80 },
          { category: "Math", score: 81 },
        ]}
      />
      <AIModelCard
        name="Gemini Ultra"
        accuracy={79}
        rank={3}
      />
    </div>
  );
}
