"use client";

import { useState } from "react";
import clsx from "clsx";

type Pair = { left: string; right: string };

type MatchPairsProps = {
  instructions: string;
  pairs: Pair[];
};

function rotatedOrder(length: number): number[] {
  if (length <= 1) return [0];
  return Array.from({ length }, (_, i) => (i + 1) % length);
}

export function MatchPairs({ instructions, pairs }: MatchPairsProps) {
  const rightOrder = rotatedOrder(pairs.length);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [wrongRight, setWrongRight] = useState<number | null>(null);

  function handleLeftClick(leftIndex: number) {
    if (matched.has(leftIndex)) return;
    setSelectedLeft(leftIndex);
    setWrongRight(null);
  }

  function handleRightClick(pairIndex: number) {
    if (selectedLeft === null || matched.has(pairIndex)) return;
    if (pairIndex === selectedLeft) {
      setMatched((prev) => new Set(prev).add(pairIndex));
      setSelectedLeft(null);
      setWrongRight(null);
    } else {
      setWrongRight(pairIndex);
    }
  }

  const allMatched = matched.size === pairs.length;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">{instructions}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {pairs.map((pair, index) => {
            const isMatched = matched.has(index);
            const isSelected = selectedLeft === index;
            return (
              <button
                key={`left-${index}`}
                type="button"
                disabled={isMatched}
                onClick={() => handleLeftClick(index)}
                className={clsx(
                  "min-h-16 rounded-2xl border-2 px-4 py-3 text-xl font-bold transition-colors",
                  isMatched && "border-success bg-success-soft text-success",
                  !isMatched &&
                    isSelected &&
                    "border-brand bg-brand-soft text-brand",
                  !isMatched &&
                    !isSelected &&
                    "border-border bg-white text-ink hover:bg-brand-soft",
                )}
              >
                {pair.left}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          {rightOrder.map((pairIndex) => {
            const isMatched = matched.has(pairIndex);
            const isWrong = wrongRight === pairIndex;
            return (
              <button
                key={`right-${pairIndex}`}
                type="button"
                disabled={isMatched}
                onClick={() => handleRightClick(pairIndex)}
                className={clsx(
                  "min-h-16 rounded-2xl border-2 px-4 py-3 text-xl font-bold transition-colors",
                  isMatched && "border-success bg-success-soft text-success",
                  !isMatched && isWrong && "border-retry bg-retry-soft text-retry",
                  !isMatched &&
                    !isWrong &&
                    "border-border bg-white text-ink hover:bg-brand-soft",
                )}
              >
                {pairs[pairIndex].right}
              </button>
            );
          })}
        </div>
      </div>
      {wrongRight !== null && !matched.has(wrongRight) && (
        <p className="text-xl font-bold text-retry" role="status">
          Intenta de nuevo.
        </p>
      )}
      {allMatched && (
        <p className="text-xl font-bold text-success" role="status">
          ¡Muy bien! ✅
        </p>
      )}
    </div>
  );
}
