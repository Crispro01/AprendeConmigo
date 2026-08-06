import type { Exercise } from "@/lib/schema";
import { PrintableChoiceExercise } from "@/components/lesson/print/PrintableChoiceExercise";
import { PrintableTypeWord } from "@/components/lesson/print/PrintableTypeWord";
import { PrintableMatchPairs } from "@/components/lesson/print/PrintableMatchPairs";

export function PrintableExerciseRenderer({ exercise }: { exercise: Exercise }) {
  switch (exercise.type) {
    case "multiple-choice":
    case "fill-in-the-blank-choice":
      return (
        <PrintableChoiceExercise
          question={exercise.question}
          options={exercise.options}
        />
      );
    case "type-word":
      return <PrintableTypeWord question={exercise.question} />;
    case "match-pairs":
      return (
        <PrintableMatchPairs
          instructions={exercise.instructions}
          pairs={exercise.pairs}
        />
      );
  }
}
