"use client";

import { Card } from "@/components/ui/Card";
import { useProgress } from "@/hooks/useProgress";

export function ContinueCard() {
  const { hydrated, data } = useProgress();

  if (!hydrated || !data.ultimaLeccion) return null;

  const { seccion, moduloId, leccionId, tituloLeccion, tituloModulo } =
    data.ultimaLeccion;

  return (
    <Card href={`/${seccion}/${moduloId}/${leccionId}`} className="mb-8">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="text-4xl">
          ▶️
        </span>
        <div>
          <p className="text-lg font-bold text-ink-soft">
            Continuar donde quedé
          </p>
          <p className="text-2xl font-extrabold">{tituloLeccion}</p>
          <p className="text-lg text-ink-soft">{tituloModulo}</p>
        </div>
      </div>
    </Card>
  );
}
