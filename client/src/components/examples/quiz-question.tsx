import { QuizQuestion } from "../quiz-question";

export default function QuizQuestionExample() {
  return (
    <QuizQuestion
      questionNumber={5}
      totalQuestions={10}
      subject="Physics"
      difficulty="Hard"
      question="What is the speed of light in a vacuum?"
      options={[
        "299,792,458 meters per second",
        "300,000,000 meters per second",
        "186,282 miles per second",
        "299,792 kilometers per second",
      ]}
      correctAnswer={0}
      explanation="The speed of light in a vacuum is exactly 299,792,458 meters per second, a fundamental constant in physics."
      onNext={() => console.log("Next question")}
    />
  );
}
