import { CategoryCard } from "../category-card";
import { Atom, History, Calculator } from "lucide-react";

export default function CategoryCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      <CategoryCard
        name="Physics"
        icon={Atom}
        description="Test your understanding of classical and modern physics concepts"
        questionCount={25}
        difficulty="Hard"
        onClick={() => console.log("Physics clicked")}
      />
      <CategoryCard
        name="History"
        icon={History}
        description="Explore world history from ancient civilizations to modern times"
        questionCount={30}
        difficulty="Medium"
        onClick={() => console.log("History clicked")}
      />
      <CategoryCard
        name="Mathematics"
        icon={Calculator}
        description="Challenge yourself with algebra, geometry, and calculus problems"
        questionCount={20}
        difficulty="Hard"
        onClick={() => console.log("Mathematics clicked")}
      />
    </div>
  );
}
