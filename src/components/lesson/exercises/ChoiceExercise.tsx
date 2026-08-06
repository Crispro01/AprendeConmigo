"use client";

import { useState } from "react";
import clsx from "clsx";

type ChoiceExerciseProps = {
  question: string;
  options: string[];
  correctIndex: number;
};

export function ChoiceExercise({
  question,
  options,
  correctIndex,
}: ChoiceExerciseProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === correctIndex;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">{question}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const showCorrect = isSelected && index === correctIndex;
          const showIncorrect = isSelected && index !== correctIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={isSelected}
              className={clsx(
                "min-h-16 rounded-2xl border-2 px-6 py-3 text-xl font-bold transition-colors",
                showCorrect &&
                  "border-success bg-success-soft text-success",
                showIncorrect && "border-retry bg-retry-soft text-retry",
                !isSelected &&
                  "border-border bg-white text-ink hover:bg-brand-soft",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <p
          className={clsx(
            "text-xl font-bold",
            isCorrect ? "text-success" : "text-retry",
          )}
          role="status"
        >
          {isCorrect ? "¡Muy bien! ✅" : "Intenta de nuevo."}
        </p>
      )}
    </div>
  );
}
