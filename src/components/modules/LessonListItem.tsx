import Link from "next/link";
import { LessonStatusBadge } from "@/components/modules/LessonStatusBadge";
import type { Lesson } from "@/lib/schema";
import type { SectionId } from "@/lib/sections";

type LessonListItemProps = {
  sectionId: SectionId;
  moduleId: string;
  lesson: Lesson;
  index: number;
};

export function LessonListItem({
  sectionId,
  moduleId,
  lesson,
  index,
}: LessonListItemProps) {
  return (
    <Link
      href={`/${sectionId}/${moduleId}/${lesson.id}`}
      className="flex min-h-16 items-center gap-4 rounded-2xl border-2 border-border bg-white px-5 py-4 transition-colors hover:bg-brand-soft"
    >
      <LessonStatusBadge
        sectionId={sectionId}
        moduleId={moduleId}
        lessonId={lesson.id}
      />
      <span className="flex-1 text-xl font-bold">
        {index}. {lesson.title}
      </span>
      {lesson.estimatedMinutes && (
        <span className="text-base text-ink-soft">
          {lesson.estimatedMinutes} min
        </span>
      )}
    </Link>
  );
}
