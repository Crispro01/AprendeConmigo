"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { useTextToSpeech, type SpeechRate } from "@/hooks/useTextToSpeech";

type ListenButtonProps = {
  texts: string[];
};

const RATES: { value: SpeechRate; label: string }[] = [
  { value: "lento", label: "Lento" },
  { value: "normal", label: "Normal" },
];

export function ListenButton({ texts }: ListenButtonProps) {
  const {
    isSupported,
    isSpeaking,
    isPaused,
    rate,
    setRate,
    speak,
    pause,
    resume,
    stop,
  } = useTextToSpeech();

  if (!isSupported) {
    return (
      <p className="rounded-2xl border-2 border-border bg-white p-4 text-lg text-ink-soft print:hidden">
        Tu navegador no permite escuchar el texto en voz alta. Pide ayuda a
        alguien para que te lo lea.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-border bg-white p-4 print:hidden">
      {!isSpeaking && (
        <Button onClick={() => speak(texts)} variant="primary">
          🔊 Escuchar
        </Button>
      )}
      {isSpeaking && !isPaused && (
        <Button onClick={pause} variant="secondary">
          ⏸ Pausar
        </Button>
      )}
      {isSpeaking && isPaused && (
        <Button onClick={resume} variant="secondary">
          ▶ Reanudar
        </Button>
      )}
      {isSpeaking && (
        <Button onClick={stop} variant="ghost">
          ⏹ Detener
        </Button>
      )}

      <div
        role="group"
        aria-label="Velocidad de lectura"
        className="flex items-center gap-2 rounded-2xl border-2 border-border p-1"
      >
        {RATES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRate(option.value)}
            aria-pressed={rate === option.value}
            className={clsx(
              "min-h-12 rounded-xl px-4 py-2 text-base font-bold transition-colors",
              rate === option.value
                ? "bg-brand text-white"
                : "bg-transparent text-ink hover:bg-brand-soft",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
