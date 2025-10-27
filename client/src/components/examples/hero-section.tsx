import { HeroSection } from "../hero-section";

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onStartQuiz={() => console.log("Start quiz clicked")} 
      onViewLeaderboard={() => console.log("View leaderboard clicked")}
    />
  );
}
