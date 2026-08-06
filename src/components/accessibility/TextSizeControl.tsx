"use client";

import clsx from "clsx";
import { TEXT_SIZE_LABELS, type TextSize } from "@/context/TextSizeContext";
import { useTextSize } from "@/hooks/useTextSize";

const SIZES: TextSize[] = ["normal", "large", "xlarge"];

const SIZE_MARKS: Record<TextSize, string> = {
  normal: "A",
  large: "A+",
  xlarge: "A++",
};

export function TextSizeControl() {
  const { size, setSize } = useTextSize();

  return (
    <div
      role="group"
      aria-label="Tamaño de letra"
      className="flex items-center gap-2 rounded-2xl border-2 border-border bg-white p-1"
    >
      {SIZES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setSize(option)}
          aria-pressed={size === option}
          className={clsx(
            "min-h-12 rounded-xl px-4 py-2 text-base font-bold transition-colors",
            size === option
              ? "bg-brand text-white"
              : "bg-transparent text-ink hover:bg-brand-soft",
          )}
        >
          <span aria-hidden="true">{SIZE_MARKS[option]}</span>
          <span className="sr-only"> {TEXT_SIZE_LABELS[option]}</span>
        </button>
      ))}
    </div>
  );
}
