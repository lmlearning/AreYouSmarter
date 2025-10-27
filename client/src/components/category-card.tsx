import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

type CategoryCardProps = {
  name: string;
  icon: LucideIcon;
  description: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
  onClick: () => void;
};

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export function CategoryCard({
  name,
  icon: Icon,
  description,
  questionCount,
  difficulty,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer hover-elevate active-elevate-2 transition-all"
      onClick={onClick}
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          <div className="text-xs text-muted-foreground">
            {questionCount} questions
          </div>
        </div>
      </div>
    </Card>
  );
}
