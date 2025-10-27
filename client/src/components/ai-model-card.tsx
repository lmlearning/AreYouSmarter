import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SiOpenai, SiGoogle } from "react-icons/si";
import { Sparkles } from "lucide-react";

type AIModelCardProps = {
  name: string;
  accuracy: number;
  rank: number;
  categoryBreakdown?: {
    category: string;
    score: number;
  }[];
};

const modelIcons: Record<string, React.ReactNode> = {
  "GPT-4": <SiOpenai className="h-5 w-5" />,
  "GPT-3.5": <SiOpenai className="h-5 w-5" />,
  "Claude 3.5 Sonnet": <Sparkles className="h-5 w-5" />,
  "Claude 3 Opus": <Sparkles className="h-5 w-5" />,
  "Gemini Pro": <SiGoogle className="h-5 w-5" />,
  "Gemini Ultra": <SiGoogle className="h-5 w-5" />,
};

export function AIModelCard({ name, accuracy, rank, categoryBreakdown }: AIModelCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {modelIcons[name] || <Sparkles className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-xs text-muted-foreground">Rank #{rank}</p>
          </div>
        </div>
        <Badge variant="secondary" className="font-mono font-semibold">
          {accuracy}%
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Accuracy</span>
          <span className="font-medium">{accuracy}%</span>
        </div>
        <Progress value={accuracy} className="h-2" />
      </div>

      {categoryBreakdown && categoryBreakdown.length > 0 && (
        <div className="pt-4 border-t space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Performance by Category
          </p>
          {categoryBreakdown.map((cat) => (
            <div key={cat.category} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{cat.category}</span>
                <span className="font-medium font-mono">{cat.score}%</span>
              </div>
              <Progress value={cat.score} className="h-1" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
