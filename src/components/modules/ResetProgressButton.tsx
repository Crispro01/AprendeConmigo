"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";

export function ResetProgressButton() {
  const { hydrated, hasProgress, reset } = useProgress();
  const [done, setDone] = useState(false);

  if (!hydrated || !hasProgress) return null;

  if (done) {
    return (
      <p className="mt-6 text-center text-lg text-ink-soft" role="status">
        Tu progreso se borró. La próxima lección que completes empieza de cero.
      </p>
    );
  }

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={() => {
          const confirmado = window.confirm(
            "¿Seguro que quieres borrar tu progreso? Vas a perder todas las lecciones marcadas como completadas en este celular o computadora.",
          );
          if (confirmado) {
            reset();
            setDone(true);
          }
        }}
        className="min-h-12 rounded-xl px-4 py-2 text-lg text-ink-soft underline hover:text-retry"
      >
        Reiniciar mi progreso
      </button>
    </div>
  );
}
