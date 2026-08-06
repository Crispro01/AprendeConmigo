import type { Exercise } from "@/lib/schema";

export function exerciseToSpeechTexts(exercise: Exercise): string[] {
  switch (exercise.type) {
    case "multiple-choice":
    case "fill-in-the-blank-choice":
      return [exercise.question, ...exercise.options];
    case "type-word":
      return [exercise.question];
    case "match-pairs":
      return [
        exercise.instructions,
        ...exercise.pairs.map((p) => p.left),
        ...exercise.pairs.map((p) => p.right),
      ];
  }
}
