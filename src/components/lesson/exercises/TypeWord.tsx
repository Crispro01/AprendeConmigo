"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

type TypeWordProps = {
  question: string;
  answer: string;
};

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "");
}

export function TypeWord({ question, answer }: TypeWordProps) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = checked && normalize(value) === normalize(answer);

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={inputId} className="text-2xl font-bold">
        {question}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setChecked(false);
        }}
        className="min-h-16 rounded-2xl border-2 border-border bg-white px-6 py-3 text-2xl"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <Button onClick={() => setChecked(true)} variant="secondary">
        Comprobar
      </Button>
      {checked && (
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
