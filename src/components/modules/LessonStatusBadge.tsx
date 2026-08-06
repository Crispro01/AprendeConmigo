"use client";

import { useProgress } from "@/hooks/useProgress";
import type { SectionId } from "@/lib/sections";

type LessonStatusBadgeProps = {
  sectionId: SectionId;
  moduleId: string;
  lessonId: string;
};

export function LessonStatusBadge({
  sectionId,
  moduleId,
  lessonId,
}: LessonStatusBadgeProps) {
  const { isComplete } = useProgress();
  const done = isComplete(sectionId, moduleId, lessonId);

  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-border text-2xl"
    >
      {done ? "✅" : ""}
    </span>
  );
}
