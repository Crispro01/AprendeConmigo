import { notFound } from "next/navigation";
import { getModule, getLessonsForModule } from "@/lib/content";
import { getSection, type SectionId } from "@/lib/sections";
import { LessonListItem } from "@/components/modules/LessonListItem";
import { Button } from "@/components/ui/Button";

type ModuleLessonsPageProps = {
  sectionId: SectionId;
  moduleId: string;
};

export function ModuleLessonsPage({
  sectionId,
  moduleId,
}: ModuleLessonsPageProps) {
  const section = getSection(sectionId)!;
  const module = getModule(sectionId, moduleId);
  if (!module) notFound();
  const lessons = getLessonsForModule(sectionId, moduleId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Button href={`/${sectionId}`} variant="ghost" className="mb-6">
        ⬅ {section.title}
      </Button>
      <h1 className="mb-2 text-4xl font-extrabold">
        <span aria-hidden="true">{module.icon}</span> {module.title}
      </h1>
      <p className="mb-8 text-xl text-ink-soft">{module.description}</p>
      <div className="flex flex-col gap-4">
        {lessons.map((lesson, index) => (
          <LessonListItem
            key={lesson.id}
            sectionId={sectionId}
            moduleId={moduleId}
            lesson={lesson}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
