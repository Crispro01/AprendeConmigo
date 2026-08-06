"use client";

import { Button } from "@/components/ui/Button";
import { useProgress } from "@/hooks/useProgress";
import type { SectionId } from "@/lib/sections";

type LessonCompleteButtonProps = {
  sectionId: SectionId;
  moduleId: string;
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
};

export function LessonCompleteButton({
  sectionId,
  moduleId,
  lessonId,
  lessonTitle,
  moduleTitle,
}: LessonCompleteButtonProps) {
  const { hydrated, isComplete, markComplete } = useProgress();
  const done = hydrated && isComplete(sectionId, moduleId, lessonId);

  if (done) {
    return (
      <div
        role="status"
        className="flex min-h-16 items-center gap-3 rounded-2xl border-2 border-success bg-success-soft px-6 py-3 text-xl font-bold text-success"
      >
        <span aria-hidden="true">✅</span>
        Ya completaste esta lección
      </div>
    );
  }

  return (
    <Button
      onClick={() =>
        markComplete(sectionId, moduleId, lessonId, {
          tituloLeccion: lessonTitle,
          tituloModulo: moduleTitle,
        })
      }
      fullWidth
    >
      ✅ Marcar lección como completada
    </Button>
  );
}
