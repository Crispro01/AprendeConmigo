import type { Exercise } from "@/lib/schema";
import { ChoiceExercise } from "@/components/lesson/exercises/ChoiceExercise";
import { TypeWord } from "@/components/lesson/exercises/TypeWord";
import { MatchPairs } from "@/components/lesson/exercises/MatchPairs";

export function ExerciseRenderer({ exercise }: { exercise: Exercise }) {
  switch (exercise.type) {
    case "multiple-choice":
    case "fill-in-the-blank-choice":
      return (
        <ChoiceExercise
          question={exercise.question}
          options={exercise.options}
          correctIndex={exercise.correctIndex}
        />
      );
    case "type-word":
      return <TypeWord question={exercise.question} answer={exercise.answer} />;
    case "match-pairs":
      return (
        <MatchPairs instructions={exercise.instructions} pairs={exercise.pairs} />
      );
  }
}
