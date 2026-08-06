import { Button } from "@/components/ui/Button";
import type { AdjacentLessonRef } from "@/lib/content";
import type { SectionId } from "@/lib/sections";

type LessonNavigationProps = {
  sectionId: SectionId;
  moduleId: string;
  previous: AdjacentLessonRef | null;
  next: AdjacentLessonRef | null;
};

export function LessonNavigation({
  sectionId,
  moduleId,
  previous,
  next,
}: LessonNavigationProps) {
  return (
    <nav
      aria-label="Navegación entre lecciones"
      className="flex flex-col gap-4 sm:flex-row sm:justify-between"
    >
      {previous ? (
        <Button
          href={`/${sectionId}/${previous.moduleId}/${previous.lessonId}`}
          variant="secondary"
          fullWidth
        >
          ⬅ Lección anterior
        </Button>
      ) : (
        <Button href={`/${sectionId}/${moduleId}`} variant="secondary" fullWidth>
          ⬅ Volver al módulo
        </Button>
      )}

      {next ? (
        <Button href={`/${sectionId}/${next.moduleId}/${next.lessonId}`} fullWidth>
          Siguiente lección ➡
        </Button>
      ) : (
        <Button href={`/${sectionId}/${moduleId}`} fullWidth>
          Terminé — volver al módulo ✅
        </Button>
      )}
    </nav>
  );
}
