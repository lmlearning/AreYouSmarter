import { Button } from "@/components/ui/button";
import { Brain, Sparkles, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/AI_human_intelligence_fusion_hero_af90215e.png";

type HeroSectionProps = {
  onStartQuiz: () => void;
  onViewLeaderboard?: () => void;
};

export function HeroSection({ onStartQuiz, onViewLeaderboard }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="h-8 w-8 text-primary" />
          <Sparkles className="h-6 w-6 text-primary" />
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Are You Smarter Than an AI?
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Test your knowledge against leading AI models using real MMLU benchmark questions. 
          Compare your performance with GPT-4, Claude, Gemini, and more.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={onStartQuiz}
            className="text-lg px-8 py-6 h-auto"
            data-testid="button-start-quiz"
          >
            Start Quiz
          </Button>
          {onViewLeaderboard && (
            <Button
              size="lg"
              variant="outline"
              onClick={onViewLeaderboard}
              className="text-lg px-8 py-6 h-auto bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20"
              data-testid="button-view-leaderboard"
            >
              View Leaderboard
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="font-mono text-3xl font-bold text-white">50K+</div>
            </div>
            <div className="text-sm text-white/80">Questions Attempted</div>
          </div>

          <div className="bg-card/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="font-mono text-3xl font-bold text-white">68%</div>
            </div>
            <div className="text-sm text-white/80">Average Human Score</div>
          </div>

          <div className="bg-card/10 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="font-mono text-3xl font-bold text-primary">GPT-4</div>
            </div>
            <div className="text-sm text-white/80">Current AI Leader (86%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
