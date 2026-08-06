"use client";

import { useTextToSpeech } from "@/hooks/useTextToSpeech";

type ListenIconButtonProps = {
  texts: string[];
  label: string;
};

export function ListenIconButton({ texts, label }: ListenIconButtonProps) {
  const { isSupported, isSpeaking, speak, stop } = useTextToSpeech();

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={() => (isSpeaking ? stop() : speak(texts))}
      aria-label={isSpeaking ? `Detener lectura de ${label}` : `Escuchar ${label}`}
      className="flex min-h-12 flex-none items-center gap-2 rounded-full border-2 border-brand px-4 py-2 text-lg font-bold text-brand hover:bg-brand-soft print:hidden"
    >
      <span aria-hidden="true">{isSpeaking ? "⏸" : "🔊"}</span>
      <span>{isSpeaking ? "Detener" : "Escuchar"}</span>
    </button>
  );
}
